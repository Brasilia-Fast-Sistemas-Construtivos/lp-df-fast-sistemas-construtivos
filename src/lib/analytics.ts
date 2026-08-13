type DataLayerEvent = Record<string, unknown> & { event: string };

type ConsentState = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushDataLayerEvent(evento: DataLayerEvent): void {
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(evento);
  } catch {
    return;
  }
}

export function updateConsentState(aceito: boolean): void {
  const estado: ConsentState = aceito ? "granted" : "denied";

  try {
    window.gtag?.("consent", "update", {
      ad_storage: estado,
      ad_user_data: estado,
      ad_personalization: estado,
      analytics_storage: estado,
    });
  } catch {
    return;
  }

  pushDataLayerEvent({ event: "consent_state", consent_state: estado });
}
