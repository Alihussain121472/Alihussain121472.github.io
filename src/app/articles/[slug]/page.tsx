// Article detail page (/articles/[slug]) with separate Meta/OG/Twitter tags, canonical URL, and fluid typography.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Reveal } from "@/components/Reveal";

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
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.frontmatter.title,
      description: `Read "${article.frontmatter.title}" (${article.frontmatter.readTime}) by Syed Ali Hussain.`,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <Link
          href="/articles"
          className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-medium text-fg-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to articles</span>
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold text-accent">
            <time dateTime={article.frontmatter.date}>
              {article.frontmatter.date}
            </time>
            <span>·</span>
            <span>{article.frontmatter.readTime}</span>
          </div>

          <h1 className="type-h1 mt-3 text-fg">{article.frontmatter.title}</h1>

          <p className="type-body mt-4 text-fg-secondary">
            {article.frontmatter.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {article.frontmatter.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 space-y-6 leading-relaxed text-fg-secondary [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-decimal [&_p]:text-base [&_strong]:text-fg">
          <MDXRemote source={article.content} />
        </div>
      </Reveal>
    </article>
  );
}
