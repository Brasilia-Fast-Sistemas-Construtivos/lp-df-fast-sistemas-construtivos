import { getAttribution } from "@/lib/attribution";

export type LeadPayload = {
  nome: string;
  whatsapp: string;
  tipoObra: string;
  regiao: string;
  metragem: string;
  mensagem: string;
  origin: string;
};

export class LeadEndpointNaoConfigurado extends Error {
  constructor() {
    super("NEXT_PUBLIC_LEAD_ENDPOINT nao configurado");
    this.name = "LeadEndpointNaoConfigurado";
  }
}

export function leadEndpointConfigurado(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_LEAD_ENDPOINT);
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  if (!endpoint) {
    throw new LeadEndpointNaoConfigurado();
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      ...getAttribution(),
      page_url: window.location.href,
      sent_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Falha ao enviar lead: ${response.status}`);
  }
}
