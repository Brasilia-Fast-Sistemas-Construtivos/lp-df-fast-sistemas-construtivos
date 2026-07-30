import type { MetadataRoute } from "next";

import { PAGES } from "@/data/seo";
import { absoluteUrl } from "@/lib/seo/config";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
