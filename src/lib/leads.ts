import { LEAD_API_ROUTE } from "@/data/integrations";
import { getAttribution } from "@/lib/attribution";

export type LeadPayload = {
  nome: string;
  telefone: string;
  email: string;
  regiao: string;
  tipoObra: string;
  metragemEstimada: string;
  temProjeto: string;
  temLocal: string;
  descricao: string;
  origin: string;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(LEAD_API_ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      referrer: window.location.href,
      ...getAttribution(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Falha ao enviar lead: ${response.status}`);
  }
}
