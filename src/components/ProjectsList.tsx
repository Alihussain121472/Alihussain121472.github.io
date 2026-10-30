// Numbered projects list (01, 02, 03...) matching kingshuk.me layout with unified type scale and buttons.
import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function ProjectsList() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-20 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="mb-14 flex items-baseline justify-between">
          <h2
            id="projects-heading"
            className="font-mono text-xs font-semibold tracking-wide text-accent"
          >
            Selected Projects
          </h2>
          <span className="font-mono text-xs font-medium text-fg-muted">
            01 — {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      <ol className="divide-y divide-border">
        {projects.map((project, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <li key={project.slug} className="py-12 first:pt-0 last:pb-0">
              <Reveal delay={idx * 0.06}>
                <article className="group grid gap-6 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-2">
                    <span className="font-mono text-3xl font-light text-fg-muted transition-colors group-hover:text-accent">
                      {num}
                    </span>
                  </div>

                  <div className="space-y-4 md:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-fg">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="transition-colors hover:text-accent"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      {project.status && (
                        <span className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <p className="max-w-2xl text-base leading-relaxed text-fg-secondary">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-fg-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.metrics &&
                        (isTodo(project.metrics) ? (
                          <TodoBadge value={project.metrics} label="Metrics" />
                        ) : (
                          <span className="font-mono text-xs font-medium text-accent">
                            {project.metrics}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:col-span-3 md:justify-end">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn-secondary"
                    >
                      <span>View project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    {project.link && !isTodo(project.link) && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} external link`}
                        className="btn-icon"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
