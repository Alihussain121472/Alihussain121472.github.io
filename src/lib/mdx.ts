// Reads MDX files from /content and validates frontmatter with Zod schemas.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type { ArticleFrontmatter, MdxEntry, ProjectFrontmatter } from "@/types/portfolio";

const contentRoot = path.join(process.cwd(), "content");

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()),
  link: z.string().optional(),
  status: z.string().optional(),
  metrics: z.string().optional(),
});

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  readTime: z.string().min(1),
  tags: z.array(z.string()),
});

function readMdxDirectory<T>(
  subDir: string,
  schema: z.ZodType<T>
): MdxEntry<T>[] {
  const dirPath = path.join(contentRoot, subDir);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = schema.parse(data);
    return { slug, frontmatter, content };
  });
}

export function getAllProjectMdx(): MdxEntry<ProjectFrontmatter>[] {
  return readMdxDirectory("projects", projectFrontmatterSchema);
}

export function getProjectMdxBySlug(
  slug: string
): MdxEntry<ProjectFrontmatter> | undefined {
  return getAllProjectMdx().find((item) => item.slug === slug);
}

export function getAllArticles(): MdxEntry<ArticleFrontmatter>[] {
  return readMdxDirectory("articles", articleFrontmatterSchema).sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );
}

export function getArticleBySlug(
  slug: string
): MdxEntry<ArticleFrontmatter> | undefined {
  return getAllArticles().find((item) => item.slug === slug);
}
