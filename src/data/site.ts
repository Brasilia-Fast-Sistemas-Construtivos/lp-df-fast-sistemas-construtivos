import type { BusinessAddress, BusinessGeo, OpeningHours } from "@/types/seo";

export const SITE = {
  name: "Fast Sistemas Construtivos",
  city: "Brasília",
  state: "DF",
  region: "Brasília — DF",
  locale: "pt-BR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://df.fastsistemasconstrutivos.com.br",
  institutionalUrl: "https://www.fastsistemasconstrutivos.com.br",
  description:
    "Soluções completas em drywall, steel frame, pisos vinílicos, forros, divisórias e sistemas construtivos a seco em Brasília. Materiais e mão de obra especializada.",
} as const;

export const CONTACT = {
  email: "franquia.fjsteel@fastdrywall.com.br",
  phoneRaw: "5561998467194",
  phoneDisplay: "(61) 9 9846-7194",
  phoneSchema: "+55-61-99846-7194",
  whatsappUrl: "https://wa.me/5561998467194",
  emailUrl: "mailto:franquia.fjsteel@fastdrywall.com.br",
  phoneUrl: "tel:+5561998467194",
} as const;

export const BRAND_ASSETS = {
  logo: "/brand/logo-fast-sistemas-construtivos.svg",
  logoWhite: "/brand/logo-fast-sistemas-construtivos-white.svg",
  icon: "/brand/icon-fast-sistemas-construtivos.svg",
  iconWhite: "/brand/icon-fast-sistemas-construtivos-white.svg",
} as const;

export const BUSINESS: {
  areaServed: string;
  priceRange: string;
  address: BusinessAddress | null;
  geo: BusinessGeo | null;
  openingHours: OpeningHours[] | null;
  mapUrl: string | null;
} = {
  areaServed: "Brasília, Distrito Federal e entorno",
  priceRange: "$$",
  address: {
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: "BR",
  },
  geo: null,
  openingHours: null,
  mapUrl: null,
};

export const SOCIAL_PROFILES: string[] = [];
