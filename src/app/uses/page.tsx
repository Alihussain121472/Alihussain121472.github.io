// Uses page (/uses) with separate Meta/OG/Twitter tags, canonical URL, and unified cards.
import React from "react";
import type { Metadata } from "next";
import { profile, usesData } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Software stack, n8n AI agent tools, and machine learning setup used by Syed Ali Hussain.",
  alternates: {
    canonical: "/uses",
  },
  openGraph: {
    title: `Uses | ${profile.name}`,
    description:
      "Explore the AI agent tools, web stack, and Python ML libraries used by Syed Ali Hussain.",
    url: "/uses",
  },
  twitter: {
    card: "summary_large_image",
    title: `Uses | ${profile.name}`,
    description:
      "n8n, Llama 3.3, Next.js, TypeScript, and Scikit-Learn setup used by Syed Ali Hussain.",
  },
};

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs font-semibold tracking-wide text-accent">
          Environment &amp; Stack
        </p>
        <h1 className="type-h1 mt-2 text-fg">Uses</h1>
        <p className="type-body mt-4 text-fg-secondary">
          The software, AI agent automation tools, and setup I use to build
          NovaBrief Tech and run machine learning experiments.
        </p>

        <div className="mt-12 space-y-10">
          {usesData.map((group, idx) => (
            <section key={group.category} aria-labelledby={`uses-${idx}`}>
              <h2 id={`uses-${idx}`} className="type-h3 text-fg">
                {group.category}
              </h2>

              <ul className="card-base mt-4 divide-y divide-border">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center"
                  >
                    <span className="font-semibold text-fg">{item.name}</span>
                    <span className="text-sm text-fg-secondary">
                      {isTodo(item.detail) ? (
                        <TodoBadge value={item.detail} />
                      ) : (
                        item.detail
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
    </div>
  );
}
