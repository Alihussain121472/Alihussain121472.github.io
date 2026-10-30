// Generates robots.txt crawl rules and references the dynamic sitemap URL.
import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${profile.site}/sitemap.xml`,
  };
}
