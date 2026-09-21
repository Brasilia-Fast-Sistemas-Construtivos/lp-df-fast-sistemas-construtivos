export const SECTION_IDS = {
  hero: "inicio",
  obraCompleta: "obra-completa",
  produtos: "produtos",
  steelConecta: "steel-conecta",
  sistemas: "sistemas",
  processo: "como-comprar",
  obras: "obras",
  faq: "duvidas",
  cobertura: "onde-atendemos",
  cta: "orcamento",
} as const;

export const MENU_LINKS = [
  { slug: "produtos", href: `#${SECTION_IDS.produtos}`, label: "Produtos" },
  { slug: "steel-conecta", href: `#${SECTION_IDS.steelConecta}`, label: "Steel Conecta" },
  { slug: "sistemas", href: `#${SECTION_IDS.sistemas}`, label: "Sistemas" },
  { slug: "como-comprar", href: `#${SECTION_IDS.processo}`, label: "Como comprar" },
  { slug: "obras", href: `#${SECTION_IDS.obras}`, label: "Obras" },
  { slug: "duvidas", href: `#${SECTION_IDS.faq}`, label: "Dúvidas" },
] as const;

export const FOOTER_SOLUCOES = [
  { slug: "drywall", href: `#${SECTION_IDS.sistemas}`, label: "Drywall" },
  { slug: "steel-frame", href: `#${SECTION_IDS.sistemas}`, label: "Steel Frame" },
  { slug: "forro", href: `#${SECTION_IDS.sistemas}`, label: "Forro" },
  { slug: "divisoria", href: `#${SECTION_IDS.sistemas}`, label: "Divisória" },
  { slug: "piso-vinilico", href: `#${SECTION_IDS.sistemas}`, label: "Piso Vinílico" },
  { slug: "revestimento", href: `#${SECTION_IDS.sistemas}`, label: "Revestimento" },
] as const;

export const FOOTER_NAVEGACAO = [
  { slug: "produtos", href: `#${SECTION_IDS.produtos}`, label: "Produtos" },
  { slug: "obra-completa", href: `#${SECTION_IDS.obraCompleta}`, label: "Do projeto à conclusão" },
  { slug: "steel-conecta", href: `#${SECTION_IDS.steelConecta}`, label: "Steel Conecta" },
  { slug: "como-comprar", href: `#${SECTION_IDS.processo}`, label: "Como comprar" },
  { slug: "obras", href: `#${SECTION_IDS.obras}`, label: "Obras no DF" },
  { slug: "duvidas", href: `#${SECTION_IDS.faq}`, label: "Dúvidas" },
] as const;

export const POLITICAS_LINKS = [
  { slug: "privacidade", href: "/politicas/privacidade", label: "Privacidade" },
  { slug: "cookies", href: "/politicas/cookies", label: "Cookies" },
  { slug: "lgpd", href: "/politicas/lgpd", label: "LGPD" },
  { slug: "termos", href: "/politicas/termos", label: "Termos de uso" },
  { slug: "seguranca", href: "/politicas/seguranca", label: "Segurança" },
] as const;
