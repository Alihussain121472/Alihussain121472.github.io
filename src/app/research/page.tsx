// Research page (/research) showcasing published IJICT paper with DOI, Google Scholar status, and ongoing work.
import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { profile, research } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research",
  description: `Published machine learning research and ongoing papers by ${profile.name}.`,
};

export default function ResearchPage() {
  const { published, ongoing } = research;
  const doiUrl = `https://doi.org/${published.doi}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Academic Publications
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Research
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-300">
          Peer-reviewed research on machine learning for security and ongoing
          international academic collaborations.
        </p>
      </Reveal>

      <section aria-labelledby="published-heading" className="mt-14">
        <Reveal delay={0.06}>
          <h2
            id="published-heading"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase"
          >
            <BookOpen className="h-4 w-4 text-accent" />
            <span>Published Paper</span>
          </h2>

          <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
            <span className="font-mono text-xs text-accent">
              {published.venue}
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-100">
              {published.title}
            </h3>

            <p className="mt-3 font-mono text-xs text-neutral-400">
              DOI:{" "}
              <a
                href={doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 underline decoration-accent/50 underline-offset-4 hover:text-accent"
              >
                {published.doi}
              </a>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={published.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-mono text-xs font-bold text-[#111111] transition-opacity hover:opacity-90"
              >
                <span>Read on IJICT</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-mono text-xs text-neutral-200 transition-colors hover:border-accent hover:text-accent"
              >
                <span>DOI Resolver</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {isTodo(profile.socials.scholar) ? (
                <div className="inline-flex items-center gap-2 text-xs text-neutral-400">
                  <span className="font-mono">Google Scholar:</span>
                  <TodoBadge
                    value={profile.socials.scholar}
                    label="Google Scholar URL"
                  />
                </div>
              ) : (
                <a
                  href={profile.socials.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-mono text-xs text-neutral-200 transition-colors hover:border-accent hover:text-accent"
                >
                  <span>Google Scholar</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="ongoing-heading" className="mt-14">
        <Reveal delay={0.12}>
          <h2
            id="ongoing-heading"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase"
          >
            <Clock className="h-4 w-4 text-accent" />
            <span>In Progress</span>
          </h2>

          <ul className="mt-4 space-y-4">
            <li className="rounded-lg border border-neutral-800/80 bg-neutral-900/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent">
                  Ongoing Collaboration
                </span>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                  In progress
                </span>
              </div>
              <p className="mt-2 text-base text-neutral-200">{ongoing}</p>
            </li>
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
