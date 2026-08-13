import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Urbanist } from "next/font/google";
import type { ReactNode } from "react";

import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScripts,
} from "@/components/analytics/GoogleTagManager";
import JsonLd from "@/components/seo/JsonLd";
import AppShell from "@/components/layout/AppShell";
import EmotionProvider from "@/components/providers/EmotionProvider";
import { BRAND_COLORS } from "@/data/brand";
import { PAGES } from "@/data/seo";
import { BRAND_ASSETS, SITE } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildGraph, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
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
  creator: SITE.name,
  publisher: SITE.name,
  category: "Construção civil",
  appleWebApp: {
    capable: true,
    title: `${SITE.name} ${SITE.region}`,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  other: {
    "geo.region": "BR-DF",
    "geo.placename": SITE.city,
    "geo.country": "BR",
  },
};

const globalSchema = buildGraph([organizationSchema(), localBusinessSchema(), websiteSchema()]);

const MOTION_FLAG_SCRIPT = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="on"}}catch(e){}`;

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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: MOTION_FLAG_SCRIPT,
          }}
        />
        <GoogleTagManagerScripts />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <EmotionProvider>
          <AppShell>{children}</AppShell>
        </EmotionProvider>
      </body>
    </html>
  );
}
