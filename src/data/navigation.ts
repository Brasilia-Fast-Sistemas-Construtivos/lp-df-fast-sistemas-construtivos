export const SECTION_IDS = {
  hero: "inicio",
  comparativo: "por-que-a-seco",
  sistemas: "sistemas",
  processo: "como-trabalhamos",
  obras: "obras",
  faq: "duvidas",
  cobertura: "onde-atendemos",
  cta: "orcamento",
} as const;

export const MENU_LINKS = [
  { href: `#${SECTION_IDS.sistemas}`, label: "Sistemas" },
  { href: `#${SECTION_IDS.comparativo}`, label: "Por que a seco" },
  { href: `#${SECTION_IDS.processo}`, label: "Como trabalhamos" },
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
