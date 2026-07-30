import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Urbanist } from "next/font/google";
import type { ReactNode } from "react";

import JsonLd from "@/components/seo/JsonLd";
import EmotionProvider from "@/components/providers/EmotionProvider";
import { BRAND_COLORS } from "@/data/brand";
import { PAGES } from "@/data/seo";
import { BRAND_ASSETS, SITE } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildGraph, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-urbanist",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const homePage = PAGES[0];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: BRAND_COLORS.brand,
};

export const metadata: Metadata = {
  ...buildMetadata({
    path: homePage.path,
    title: `${homePage.title} | ${SITE.name}`,
    description: homePage.description,
  }),
  title: {
    default: `${homePage.title} | ${SITE.name}`,
    template: `%s | ${SITE.name} ${SITE.region}`,
  },
  icons: {
    icon: [{ url: BRAND_ASSETS.icon, type: "image/svg+xml" }],
    shortcut: [BRAND_ASSETS.icon],
    apple: [BRAND_ASSETS.icon],
  },
  manifest: "/manifest.webmanifest",
  authors: [{ name: SITE.name, url: SITE.institutionalUrl }],
  publisher: SITE.name,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "geo.region": "BR-DF",
    "geo.placename": "Brasília",
  },
};

const globalSchema = buildGraph([organizationSchema(), localBusinessSchema(), websiteSchema()]);

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={SITE.locale}
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${urbanist.variable} ${manrope.variable}`}
    >
      <head>
        <JsonLd schema={globalSchema} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body>
        <EmotionProvider>
          <div className="app-shell">
            <main className="app-main">{children}</main>
          </div>
        </EmotionProvider>
      </body>
    </html>
  );
}
