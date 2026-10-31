// Dynamically generates sitemap.xml for all pages, projects, certifications, and articles.
import type { MetadataRoute } from "next";
import { articles, profile, projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/certifications",
    "/research",
    "/articles",
    "/contact",
    "/uses",
    "/humans.txt",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${profile.site}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${profile.site}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${profile.site}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
