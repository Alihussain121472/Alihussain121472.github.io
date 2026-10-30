// Dynamic article reader page (/articles/[slug]) rendering validated MDX content.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.date,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 font-mono text-xs font-medium text-fg-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to articles</span>
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex items-center gap-3 font-mono text-xs font-semibold text-accent">
          <time dateTime={article.frontmatter.date}>
            {article.frontmatter.date}
          </time>
          <span>·</span>
          <span>{article.frontmatter.readTime}</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-5xl">
          {article.frontmatter.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-fg-secondary">
          {article.frontmatter.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-fg-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-6 leading-relaxed text-fg-secondary [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-decimal [&_p]:text-base [&_strong]:text-fg">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
