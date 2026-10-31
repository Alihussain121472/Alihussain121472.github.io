// Project mini case-study page (/projects/[slug]) with Problem, My role, Stack, 3-step How it works, Results, and architecture diagram.
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.metaDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.ogDescription,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.twitterDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/#projects"
        className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-medium text-fg-secondary transition-colors hover:text-accent"
      >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to projects</span>
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold text-accent">
            <span>Case Study {num}</span>
            {project.status && (
              <span className="chip text-accent">{project.status}</span>
            )}
          </div>

          <h1 className="type-h1 mt-3 text-fg">{project.title}</h1>

          <p className="type-body mt-4 text-fg-secondary">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            {project.link && !isTodo(project.link) && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>{project.linkLabel ?? `Visit ${project.title}`}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {/* Structured Mini Case Study Grid: Problem, My role, Stack, Results */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <section className="card-base p-6" aria-labelledby="cs-problem">
            <h2
              id="cs-problem"
              className="font-mono text-xs font-bold tracking-wide text-accent"
            >
              Problem
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
              {project.problem}
            </p>
          </section>

          <section className="card-base p-6" aria-labelledby="cs-role">
            <h2
              id="cs-role"
              className="font-mono text-xs font-bold tracking-wide text-accent"
            >
              My Role
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
              {project.role}
            </p>
          </section>

          <section className="card-base p-6" aria-labelledby="cs-stack">
            <h2
              id="cs-stack"
              className="font-mono text-xs font-bold tracking-wide text-accent"
            >
              Stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="card-base p-6" aria-labelledby="cs-results">
            <h2
              id="cs-results"
              className="font-mono text-xs font-bold tracking-wide text-accent"
            >
              Results
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-fg-secondary">
              {isTodo(project.results) || project.results.includes("TODO") ? (
                <TodoBadge value={project.results} label="Results" />
              ) : (
                <p className="font-medium text-fg">{project.results}</p>
              )}
            </div>
          </section>
        </div>

        {/* How it works (3 steps) */}
        <section
          className="card-base mt-8 p-6 sm:p-8"
          aria-labelledby="cs-how-it-works"
        >
          <h2 id="cs-how-it-works" className="type-h2 text-fg">
            How it works
          </h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {project.howItWorks.map((step, idx) => (
              <li
                key={step}
                className="rounded-xl border border-border bg-subtle p-5"
              >
                <span className="font-mono text-xs font-bold text-accent">
                  Step 0{idx + 1}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Architecture Diagram & Preview Screenshot */}
        <section
          className="card-base mt-8 p-6 sm:p-8"
          aria-labelledby="cs-architecture"
        >
          <h2 id="cs-architecture" className="type-h2 text-fg">
            Architecture &amp; Preview
          </h2>

          <div
            aria-label="System architecture flow"
            className="mt-6 grid items-center gap-4 md:grid-cols-5"
          >
            <div className="rounded-xl border border-border bg-subtle p-4 text-center font-mono text-xs font-semibold text-fg">
              1. {project.architectureNodes[0]}
            </div>
            <div
              className="hidden justify-center text-accent md:flex"
              aria-hidden="true"
            >
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="rounded-xl border border-accent bg-subtle p-4 text-center font-mono text-xs font-semibold text-accent">
              2. {project.architectureNodes[1]}
            </div>
            <div
              className="hidden justify-center text-accent md:flex"
              aria-hidden="true"
            >
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="rounded-xl border border-border bg-subtle p-4 text-center font-mono text-xs font-semibold text-fg">
              3. {project.architectureNodes[2]}
            </div>
          </div>

          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-stage">
            <Image
              src={project.previewImage}
              alt={project.previewAlt}
              fill
              sizes="(max-width: 896px) 100vw, 832px"
              className="object-contain p-4"
            />
          </div>
        </section>
    </article>
  );
}
