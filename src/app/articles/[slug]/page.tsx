// Article detail page (/articles/[slug]) with separate Meta/OG/Twitter tags, canonical URL, and fluid typography.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/data/portfolio";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: `Read "${article.title}" (${article.readTime}) by Syed Ali Hussain.`,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/articles"
        className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-medium text-fg-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to articles</span>
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <div className="flex items-center gap-3 font-mono text-xs font-semibold text-accent">
          <time dateTime={article.date}>{article.date}</time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="type-h1 mt-3 text-fg">{article.title}</h1>

        <p className="type-body mt-4 text-fg-secondary">
          {article.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-8 leading-relaxed text-fg-secondary">
        {article.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="type-h3 text-fg">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="type-body text-fg-secondary">
                {p}
              </p>
            ))}
            {section.items && (
              <ul className="ml-5 list-disc space-y-2 text-sm text-fg-secondary">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {article.externalLink && (
          <div className="pt-2">
            <a
              href={article.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>{article.externalLink.label}</span>
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
