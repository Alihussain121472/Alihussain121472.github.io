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
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to articles</span>
      </Link>

      <header className="mt-8 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-3 font-mono text-xs text-accent">
          <time dateTime={article.frontmatter.date}>
            {article.frontmatter.date}
          </time>
          <span>·</span>
          <span>{article.frontmatter.readTime}</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          {article.frontmatter.title}
        </h1>

        <p className="mt-4 text-lg text-neutral-300">
          {article.frontmatter.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-neutral-800 bg-neutral-900/70 px-2.5 py-0.5 font-mono text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-6 leading-relaxed text-neutral-300 [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-neutral-100 [&_li]:ml-5 [&_li]:list-decimal [&_p]:text-base [&_strong]:text-neutral-100">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
