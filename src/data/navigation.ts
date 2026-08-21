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
  { href: `#${SECTION_IDS.produtos}`, label: "Produtos" },
  { href: `#${SECTION_IDS.steelConecta}`, label: "Steel Conecta" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Sistemas" },
  { href: `#${SECTION_IDS.processo}`, label: "Como comprar" },
  { href: `#${SECTION_IDS.obras}`, label: "Obras" },
  { href: `#${SECTION_IDS.faq}`, label: "Dúvidas" },
] as const;

export const FOOTER_SOLUCOES = [
  { href: `#${SECTION_IDS.sistemas}`, label: "Drywall" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Steel Frame" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Forro" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Divisória" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Piso Vinílico" },
  { href: `#${SECTION_IDS.sistemas}`, label: "Revestimento" },
] as const;

export const POLITICAS_LINKS = [
  { href: "/politicas/privacidade", label: "Privacidade" },
  { href: "/politicas/cookies", label: "Cookies" },
  { href: "/politicas/lgpd", label: "LGPD" },
  { href: "/politicas/termos", label: "Termos de uso" },
  { href: "/politicas/seguranca", label: "Segurança" },
] as const;
