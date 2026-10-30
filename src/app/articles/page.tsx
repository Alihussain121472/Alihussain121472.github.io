// Articles listing page (/articles) displaying Zod-validated MDX articles from /content/articles.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { getAllArticles } from "@/lib/mdx";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Articles",
  description: `Technical articles on AI agents, n8n automation, and machine learning security by ${profile.name}.`,
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Writing &amp; Notes
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-300">
          Notes on building AI automation workflows with n8n, NovaBrief Tech,
          and machine learning research.
        </p>
      </Reveal>

      <ol className="mt-14 divide-y divide-neutral-800/80">
        {articles.map((article, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <li key={article.slug} className="py-10 first:pt-0 last:pb-0">
              <Reveal delay={idx * 0.06}>
                <article className="group flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                      <span className="text-accent">{num}</span>
                      <span>·</span>
                      <time dateTime={article.frontmatter.date}>
                        {article.frontmatter.date}
                      </time>
                      <span>·</span>
                      <span>{article.frontmatter.readTime}</span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="transition-colors group-hover:text-accent"
                      >
                        {article.frontmatter.title}
                      </Link>
                    </h2>

                    <p className="max-w-2xl text-sm text-neutral-300">
                      {article.frontmatter.description}
                    </p>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-accent"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
