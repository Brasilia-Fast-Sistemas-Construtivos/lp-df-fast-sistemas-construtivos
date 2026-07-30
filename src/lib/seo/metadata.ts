import type { Metadata } from "next";

import { KEYWORDS } from "@/data/seo";
import { SITE } from "@/data/site";
import { absoluteUrl, OG_IMAGE, SITE_URL } from "@/lib/seo/config";

type BuildMetadataParams = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  path,
  title,
  description,
  keywords = KEYWORDS,
  noIndex = false,
}: BuildMetadataParams): Metadata {
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: SITE.name,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      locale: "pt_BR",
      title,
      description,
      images: [
        {
          url: OG_IMAGE.path,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.path],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
