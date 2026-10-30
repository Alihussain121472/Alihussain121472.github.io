// Dynamically generates sitemap.xml for all pages, projects, and MDX articles.
import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/portfolio";
import { getAllArticles } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
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

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map(
    (article) => ({
      url: `${profile.site}/articles/${article.slug}`,
      lastModified: new Date(article.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
