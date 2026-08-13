import { BRAND_ASSETS, BUSINESS, CONTACT, SITE, SOCIAL_PROFILES } from "@/data/site";
import { FAQ_LP } from "@/data/content";
import { AUDIENCES, SERVICE_AREAS, SERVICES } from "@/data/seo";
import { absoluteUrl, SCHEMA_ID, SITE_URL } from "@/lib/seo/config";
import type { FaqEntry } from "@/types/seo";

type SchemaNode = Record<string, unknown>;

export function organizationSchema(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": SCHEMA_ID.organization,
    name: SITE.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_ASSETS.logo),
      contentUrl: absoluteUrl(BRAND_ASSETS.logo),
    },
    image: absoluteUrl(BRAND_ASSETS.logo),
    description: SITE.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phoneSchema,
        email: CONTACT.email,
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
      },
    ],
  };
}

export function localBusinessSchema(): SchemaNode {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": SCHEMA_ID.localBusiness,
    name: `${SITE.name} ${SITE.city}`,
    url: SITE_URL,
    parentOrganization: { "@id": SCHEMA_ID.organization },
    description: SITE.description,
    image: absoluteUrl(BRAND_ASSETS.logo),
    logo: absoluteUrl(BRAND_ASSETS.logo),
    telephone: CONTACT.phoneSchema,
    email: CONTACT.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: "BRL",
    knowsLanguage: "pt-BR",
    ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    audience: AUDIENCES.map((audience) => ({
      "@type": "Audience",
      audienceType: audience,
    })),
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: service.shortName,
        provider: { "@id": SCHEMA_ID.localBusiness },
        areaServed: BUSINESS.areaServed,
      },
    })),
    ...(BUSINESS.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...BUSINESS.address,
          },
        }
      : {}),
    ...(BUSINESS.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: BUSINESS.geo.latitude,
            longitude: BUSINESS.geo.longitude,
          },
        }
      : {}),
    ...(BUSINESS.openingHours
      ? {
          openingHoursSpecification: BUSINESS.openingHours.map((slot) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: slot.dayOfWeek,
            opens: slot.opens,
            closes: slot.closes,
          })),
        }
      : {}),
    ...(BUSINESS.mapUrl ? { hasMap: BUSINESS.mapUrl } : {}),
  };
}

export function websiteSchema(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_ID.website,
    name: `${SITE.name} ${SITE.city}`,
    url: SITE_URL,
    inLanguage: SITE.locale,
    publisher: { "@id": SCHEMA_ID.organization },
  };
}

export function webPageSchema(params: {
  path: string;
  name: string;
  description: string;
}): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": SCHEMA_ID.webpage(params.path),
    url: absoluteUrl(params.path),
    name: params.name,
    description: params.description,
    inLanguage: SITE.locale,
    isPartOf: { "@id": SCHEMA_ID.website },
    about: { "@id": SCHEMA_ID.localBusiness },
    primaryImageOfPage: absoluteUrl(BRAND_ASSETS.logo),
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; path: string }>): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_ID.breadcrumb(crumbs[crumbs.length - 1]?.path ?? "/"),
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(entries: FaqEntry[] = FAQ_LP): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": SCHEMA_ID.faq,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function serviceCatalogSchema(): SchemaNode {
  return {
    "@type": "ItemList",
    name: `Soluções ${SITE.name} em ${SITE.region}`,
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: service.shortName,
        provider: { "@id": SCHEMA_ID.localBusiness },
        areaServed: BUSINESS.areaServed,
      },
    })),
  };
}

export function buildGraph(nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
