// Articles listing page (/articles) with separate Meta/OG/Twitter tags, canonical URL, and unified cards.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Technical articles on AI agents, n8n workflow automation, and machine learning security by Syed Ali Hussain.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: `Articles | ${profile.name}`,
    description:
      "Read notes by Syed Ali Hussain on building AI agents with n8n, running NovaBrief Tech, and ML security research.",
    url: "/articles",
  },
  twitter: {
    card: "summary_large_image",
    title: `Articles | ${profile.name}`,
    description:
      "Technical writing on n8n AI agents, daily AI briefings for students, and brute-force login detection.",
  },
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs font-semibold tracking-wide text-accent">
        Writing &amp; Notes
      </p>
      <h1 className="type-h1 mt-2 text-fg">Articles</h1>
      <p className="type-body mt-4 text-fg-secondary">
        Notes on building AI agents with n8n, NovaBrief Tech, and machine
        learning research.
      </p>

      <ol className="mt-10 grid gap-6">
        {articles.map((article, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <li key={article.slug}>
              <article className="card-base flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-xs font-medium text-fg-muted">
                    <span className="font-bold text-accent">{num}</span>
                    <span>·</span>
                    <time dateTime={article.date}>{article.date}</time>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="type-h3 text-fg">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-sm leading-relaxed text-fg-secondary">
                    {article.description}
                  </p>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="btn-secondary shrink-0"
                >
                  <span>Read article</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
