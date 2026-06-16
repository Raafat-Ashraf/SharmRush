import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/config";

const pages = ["/", "/activities", "/location", "/gallery", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of pages) {
      const path = page === "/" ? "" : page;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
