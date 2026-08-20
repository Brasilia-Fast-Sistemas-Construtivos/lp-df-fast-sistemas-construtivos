import {
  ATENDIMENTO_POR_INTERESSE,
  CIDADE_PADRAO,
  ESTADO_FORA_DO_DF,
  ESTADO_PADRAO,
  ETAPAS_DA_OBRA,
  FAIXAS_METRAGEM,
  INTERESSE_MATERIAL,
  LABEL_POR_INTERESSE,
  LIMITE_DESCRICAO,
  OPCOES_INTERESSE,
  REGIAO_FORA_DO_DF,
  REGIOES_OPTIONS,
  RESPOSTAS_SIM_NAO,
  SISTEMAS_EM_USO,
  TIPOS_DE_OBRA,
  VALOR_NAO_INFORMADO,
} from "@/data/content";
import { LEAD_WEBHOOK_TIMEOUT_MS, LEAD_WEBHOOK_URL } from "@/data/integrations";
import { ATTRIBUTION_KEYS } from "@/lib/attribution";
import { validarEmail, validarNome, validarTelefone } from "@/lib/formatters";

const REGIOES_ACEITAS: string[] = REGIOES_OPTIONS.map((opcao) => opcao.value);
const TIPOS_ACEITOS: string[] = TIPOS_DE_OBRA.map((opcao) => opcao.value);
const METRAGENS_ACEITAS: string[] = FAIXAS_METRAGEM.map((opcao) => opcao.value);
const RESPOSTAS_ACEITAS: string[] = RESPOSTAS_SIM_NAO.map((opcao) => opcao.value);
const INTERESSES_ACEITOS: string[] = OPCOES_INTERESSE.map((opcao) => opcao.value);
const ETAPAS_ACEITAS: string[] = ETAPAS_DA_OBRA.map((opcao) => opcao.value);
const SISTEMAS_ACEITOS: string[] = SISTEMAS_EM_USO.map((opcao) => opcao.value);

const LIMITE = {
  nome: 120,
  telefone: 40,
  email: 160,
  regiao: 80,
  opcao: 60,
  descricao: LIMITE_DESCRICAO,
  origin: 80,
  referrer: 1000,
  parametro: 200,
} as const;

function texto(valor: unknown, limite: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, limite) : "";
}

function urlSegura(valor: string): string {
  if (!valor) return "";
  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function parametrosDeAtribuicao(corpo: Record<string, unknown>): Record<string, string> {
  const parametros: Record<string, string> = {};
  ATTRIBUTION_KEYS.forEach((chave) => {
    const valor = texto(corpo[chave], LIMITE.parametro);
    if (valor) parametros[chave] = valor;
  });
  return parametros;
}

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;

  try {
    corpo = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ erro: "Corpo da requisição inválido." }, { status: 400 });
  }

  const interesse = texto(corpo.interesse, LIMITE.opcao);
  const nome = texto(corpo.nome, LIMITE.nome);
  const telefone = texto(corpo.telefone, LIMITE.telefone);
  const email = texto(corpo.email, LIMITE.email);
  const regiao = texto(corpo.regiao, LIMITE.regiao);
  const tipoObra = texto(corpo.tipoObra, LIMITE.opcao);
  const metragemEstimada = texto(corpo.metragemEstimada, LIMITE.opcao);
  const temProjeto = texto(corpo.temProjeto, LIMITE.opcao);
  const temLocal = texto(corpo.temLocal, LIMITE.opcao);
  const etapaObra = texto(corpo.etapaObra, LIMITE.opcao);
  const sistemaEmUso = texto(corpo.sistemaEmUso, LIMITE.opcao);

  const camposInvalidos: string[] = [];
  if (!INTERESSES_ACEITOS.includes(interesse)) camposInvalidos.push("interesse");
  if (validarNome(nome)) camposInvalidos.push("nome");
  if (validarTelefone(telefone)) camposInvalidos.push("telefone");
  if (validarEmail(email)) camposInvalidos.push("email");
  if (!REGIOES_ACEITAS.includes(regiao)) camposInvalidos.push("regiao");

  const fluxoDeMaterial = interesse === INTERESSE_MATERIAL;

  if (fluxoDeMaterial) {
    if (!ETAPAS_ACEITAS.includes(etapaObra)) camposInvalidos.push("etapaObra");
    if (!SISTEMAS_ACEITOS.includes(sistemaEmUso)) camposInvalidos.push("sistemaEmUso");
  } else {
    if (!TIPOS_ACEITOS.includes(tipoObra)) camposInvalidos.push("tipoObra");
    if (!METRAGENS_ACEITAS.includes(metragemEstimada)) camposInvalidos.push("metragemEstimada");
    if (!RESPOSTAS_ACEITAS.includes(temProjeto)) camposInvalidos.push("temProjeto");
    if (!RESPOSTAS_ACEITAS.includes(temLocal)) camposInvalidos.push("temLocal");
  }

  if (camposInvalidos.length > 0) {
    return Response.json({ camposInvalidos }, { status: 400 });
  }

  const referrer =
    urlSegura(texto(corpo.referrer, LIMITE.referrer)) ||
    urlSegura(texto(request.headers.get("referer"), LIMITE.referrer));

  const foraDoDistritoFederal = regiao === REGIAO_FORA_DO_DF;

  const lead = {
    nome,
    telefone,
    email,
    estado: foraDoDistritoFederal ? ESTADO_FORA_DO_DF : ESTADO_PADRAO,
    cidade: foraDoDistritoFederal ? REGIAO_FORA_DO_DF : CIDADE_PADRAO,
    tipoObra: fluxoDeMaterial ? VALOR_NAO_INFORMADO : tipoObra,
    metragemEstimada: fluxoDeMaterial ? VALOR_NAO_INFORMADO : metragemEstimada,
    temProjeto: fluxoDeMaterial ? VALOR_NAO_INFORMADO : temProjeto,
    temLocal: fluxoDeMaterial ? VALOR_NAO_INFORMADO : temLocal,
    etapaObra: fluxoDeMaterial ? etapaObra : VALOR_NAO_INFORMADO,
    sistemaEmUso: fluxoDeMaterial ? sistemaEmUso : VALOR_NAO_INFORMADO,
    descricao: texto(corpo.descricao, LIMITE.descricao),
    referrer,
    regiao,
    interesse,
    interesseLabel: LABEL_POR_INTERESSE[interesse],
    atendimento: ATENDIMENTO_POR_INTERESSE[interesse],
    origin: texto(corpo.origin, LIMITE.origin),
    ...parametrosDeAtribuicao(corpo),
  };

  try {
    const resposta = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(LEAD_WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!resposta.ok) {
      return Response.json({ erro: "Automação recusou o envio." }, { status: 502 });
    }
  } catch {
    return Response.json({ erro: "Automação indisponível." }, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
