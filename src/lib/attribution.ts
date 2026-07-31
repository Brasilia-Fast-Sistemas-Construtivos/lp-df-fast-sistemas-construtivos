const STORAGE_KEY = "fast:attr:v1";
const CONSENT_KEY = "cookie_consent_choice";
const TTL_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "igshid",
  "gad_source",
  "gad_campaignid",
] as const;

const CLICK_IDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "gad_campaignid",
  "gad_source",
];

const PAID_MEDIUMS = [
  "cpc",
  "ppc",
  "paid",
  "paidsearch",
  "paid_search",
  "paid_social",
  "paidsocial",
  "display",
  "cpm",
];

export type Attribution = Record<string, string>;
type StoredAttribution = Attribution & { expires_at?: string };

function consentGranted(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function isPaid(attr: Attribution | null): boolean {
  if (!attr) return false;
  if (CLICK_IDS.some((key) => attr[key])) return true;
  return PAID_MEDIUMS.includes(String(attr.utm_medium || "").toLowerCase());
}

function hasOriginData(attr: Attribution | null): boolean {
  return !!attr && PARAM_KEYS.some((key) => attr[key]);
}

function readFromUrl(): Attribution {
  const out: Attribution = {};
  try {
    const params = new URLSearchParams(window.location.search);
    PARAM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) out[key] = value;
    });
    out.page_url = window.location.href;
    out.captured_at = new Date().toISOString();
  } catch {
    return out;
  }
  return out;
}

function parseValid(raw: string | null): StoredAttribution | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (parsed.expires_at && new Date(parsed.expires_at) < new Date()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readStored(): StoredAttribution | null {
  try {
    const local = parseValid(window.localStorage.getItem(STORAGE_KEY));
    if (local) return local;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    return null;
  }
  try {
    const session = parseValid(window.sessionStorage.getItem(STORAGE_KEY));
    if (session) return session;
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    return null;
  }
  return null;
}

function writeStored(attr: Attribution): void {
  const copy: StoredAttribution = { ...attr };
  copy.expires_at = new Date(Date.now() + TTL_DAYS * DAY_MS).toISOString();
  const raw = JSON.stringify(copy);
  try {
    if (consentGranted()) {
      window.localStorage.setItem(STORAGE_KEY, raw);
      window.sessionStorage.removeItem(STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(STORAGE_KEY, raw);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    return;
  }
}

export function captureAttribution(): StoredAttribution | null {
  const current = readFromUrl();
  const stored = readStored();
  let next: Attribution | null;

  if (!hasOriginData(current)) {
    next = stored;
  } else if (isPaid(current)) {
    next = current;
  } else if (stored && isPaid(stored)) {
    next = stored;
  } else {
    next = current;
  }

  if (hasOriginData(next)) writeStored(next as Attribution);
  return (next as StoredAttribution) || null;
}

export function getAttribution(): Attribution {
  const attr = readStored() || captureAttribution() || readFromUrl();
  const out: Attribution = {};
  if (attr) {
    PARAM_KEYS.forEach((key) => {
      if (attr[key]) out[key] = attr[key];
    });
  }
  return out;
}

export function promoteAttributionToLocal(): void {
  try {
    const session = parseValid(window.sessionStorage.getItem(STORAGE_KEY));
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    return;
  }
}

export function appendAttribution(url: string): string {
  if (typeof window === "undefined") return url;
  const persisted = getAttribution();
  if (!Object.keys(persisted).length) return url;

  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return url;
    Object.entries(persisted).forEach(([key, value]) => {
      if (!parsed.searchParams.get(key)) parsed.searchParams.set(key, value);
    });
    return parsed.toString();
  } catch {
    return url;
  }
}

export const CONSENT_STORAGE_KEY = CONSENT_KEY;
