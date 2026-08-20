import type { PageSeo, ServiceEntry } from "@/types/seo";

export const SERVICES: ServiceEntry[] = [
  {
    slug: "drywall",
    name: "Drywall em Brasília",
    shortName: "Drywall",
    description:
      "Paredes, forros e divisórias em drywall com material e instalação. Execução rápida, acabamento liso e menos sujeira na obra.",
  },
  {
    slug: "steel-frame",
    name: "Steel Frame em Brasília",
    shortName: "Steel Frame",
    description:
      "Construção a seco em estrutura metálica leve. Obra mais rápida, previsível e com alto desempenho térmico e acústico.",
  },
  {
    slug: "pisos-vinilicos",
    name: "Pisos Vinílicos em Brasília",
    shortName: "Pisos Vinílicos",
    description:
      "Pisos vinílicos em régua e manta para ambientes residenciais, comerciais e corporativos, com instalação especializada.",
  },
  {
    slug: "forros",
    name: "Forros em Brasília",
    shortName: "Forros",
    description:
      "Forros em drywall, PVC, mineral e removíveis, com projeto e instalação para acabamento, acústica e passagem de instalações.",
  },
  {
    slug: "divisorias",
    name: "Divisórias em Brasília",
    shortName: "Divisórias",
    description:
      "Divisórias para escritórios, lojas e ambientes corporativos, com montagem rápida e reconfiguração de layout sem quebra-quebra.",
  },
  {
    slug: "revestimentos",
    name: "Revestimentos em Brasília",
    shortName: "Revestimentos",
    description:
      "Revestimentos internos e de fachada para valorizar o acabamento e proteger a edificação.",
  },
  {
    slug: "sistemas-construtivos-a-seco",
    name: "Sistemas Construtivos a Seco em Brasília",
    shortName: "Sistemas a Seco",
    description:
      "Solução completa em construção a seco: materiais e mão de obra especializada para projetos residenciais, comerciais e corporativos.",
  },
];

export const SERVICOS_DE_EXECUCAO: ServiceEntry[] = [
  {
    slug: "execucao-steel-frame",
    name: "Execução de obra em steel frame em Brasília",
    shortName: "Execução em Steel Frame",
    description:
      "Montagem de estrutura, fechamento e acabamento em steel frame com equipe própria, escopo e prazo fechados em contrato.",
  },
  {
    slug: "execucao-drywall",
    name: "Execução de obra em drywall em Brasília",
    shortName: "Execução em Drywall",
    description:
      "Instalação de paredes, forros e divisórias em drywall com equipe própria e material fornecido pela Fast.",
  },
];

export const SERVICE_AREAS: string[] = [
  "Brasília",
  "Plano Piloto",
  "Asa Sul",
  "Asa Norte",
  "Águas Claras",
  "Taguatinga",
  "Ceilândia",
  "Samambaia",
  "Guará",
  "Vicente Pires",
  "Sudoeste",
  "Octogonal",
  "Lago Sul",
  "Lago Norte",
  "Park Way",
  "Jardim Botânico",
  "Sobradinho",
  "Planaltina",
  "Gama",
  "Santa Maria",
  "São Sebastião",
  "Riacho Fundo",
  "Recanto das Emas",
  "Núcleo Bandeirante",
  "Candangolândia",
  "Cruzeiro",
  "Paranoá",
  "Itapoã",
  "Brazlândia",
  "Arniqueira",
  "Distrito Federal",
  "Entorno do DF",
];

export const AUDIENCES: string[] = ["Residencial", "Comercial", "Corporativo"];

export const KEYWORDS: string[] = [
  "drywall Brasília",
  "steel frame Brasília",
  "drywall DF",
  "steel frame DF",
  "pisos vinílicos Brasília",
  "forro de drywall Brasília",
  "divisórias Brasília",
  "revestimentos Brasília",
  "sistemas construtivos a seco",
  "construção a seco Brasília",
  "loja de drywall Brasília",
  "instalação de drywall Brasília",
  "empresa de steel frame DF",
  "orçamento drywall Brasília",
  "Fast Sistemas Construtivos Brasília",
];

export const PAGES: PageSeo[] = [
  {
    path: "/",
    title: "Drywall, Steel Frame e Sistemas Construtivos a Seco em Brasília",
    description:
      "Drywall, steel frame, pisos vinílicos, forros e divisórias em Brasília e no DF. Material especificado e entregue em cada fase da obra. Peça seu orçamento.",
    changeFrequency: "weekly",
    priority: 1,
  },
];
