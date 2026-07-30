import type { MetadataRoute } from "next";

import { BRAND_ASSETS, SITE } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} ${SITE.city}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d01218",
    lang: SITE.locale,
    dir: "ltr",
    categories: ["business", "construction", "shopping"],
    icons: [
      {
        src: BRAND_ASSETS.icon,
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
