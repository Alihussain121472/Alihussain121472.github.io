// Uses page (/uses) listing software stack, AI automation tools, and clearly marked hardware TODOs.
import React from "react";
import type { Metadata } from "next";
import { profile, usesData } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Uses",
  description: `Tools, AI stack, and development setup used by ${profile.name}.`,
};

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Environment &amp; Stack
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Uses
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-300">
          The software, AI automation tools, and setup I use to build NovaBrief
          Tech and run machine learning experiments.
        </p>
      </Reveal>

      <div className="mt-14 space-y-12">
        {usesData.map((group, idx) => (
          <Reveal key={group.category} delay={idx * 0.06}>
            <section aria-labelledby={`uses-${idx}`}>
              <h2
                id={`uses-${idx}`}
                className="font-mono text-xs tracking-widest text-accent uppercase"
              >
                {group.category}
              </h2>

              <ul className="mt-4 divide-y divide-neutral-800/80 rounded-lg border border-neutral-800/80 bg-neutral-900/30">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center"
                  >
                    <span className="font-medium text-neutral-100">
                      {item.name}
                    </span>
                    <span className="text-sm text-neutral-300">
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
          </Reveal>
        ))}
      </div>
    </div>
  );
}
