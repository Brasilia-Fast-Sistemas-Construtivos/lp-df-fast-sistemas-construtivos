"use client";

import { useEffect } from "react";

import { captureAttribution, getAttribution, type Attribution } from "@/lib/attribution";

function isHttpUrl(url: URL) {
  return url.protocol === "http:" || url.protocol === "https:";
}

function mergePersisted(into: URLSearchParams, persisted: Attribution) {
  let changed = false;
  Object.entries(persisted).forEach(([key, value]) => {
    if (!into.get(key)) {
      into.set(key, value);
      changed = true;
    }
  });
  return changed;
}

function ensureCurrentUrlHasPersisted(persisted: Attribution) {
  if (typeof window === "undefined") return;
  if (!Object.keys(persisted).length) return;

  const current = new URL(window.location.href);
  if (!isHttpUrl(current)) return;
  if (!mergePersisted(current.searchParams, persisted)) return;

  window.history.replaceState(window.history.state, "", current.toString());
}

function updateAnchorHref(anchor: HTMLAnchorElement, persisted: Attribution) {
  if (!Object.keys(persisted).length) return;
  if (anchor.hasAttribute("data-no-utm")) return;

  const rawHref = anchor.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#")) return;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }

  if (!isHttpUrl(url)) return;
  if (!mergePersisted(url.searchParams, persisted)) return;

  anchor.href = url.toString();
}

export default function UtmPersist() {
  useEffect(() => {
    captureAttribution();
    ensureCurrentUrlHasPersisted(getAttribution());
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor || anchor.download) return;

      updateAnchorHref(anchor, getAttribution());
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
