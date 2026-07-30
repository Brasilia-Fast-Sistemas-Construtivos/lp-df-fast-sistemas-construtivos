import { SITE } from "@/data/site";

export function normalizeSiteUrl(raw?: string): string {
  const input = (raw ?? "").trim();
  if (!input) return SITE.url;

  const withProtocol =
    input.startsWith("http://") || input.startsWith("https://") ? input : `https://${input}`;

  return withProtocol.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url);

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

export const SCHEMA_ID = {
  organization: `${SITE_URL}/#organization`,
  localBusiness: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  faq: `${SITE_URL}/#faq`,
} as const;

export const OG_IMAGE = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name} | ${SITE.region}`,
} as const;
