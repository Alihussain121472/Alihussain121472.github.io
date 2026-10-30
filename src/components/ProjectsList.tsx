// Featured numbered projects section (#projects) with unified cards, chips, and case-study links.
import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function ProjectsList() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="w-fit rounded bg-canvas px-1 font-mono text-xs font-semibold tracking-wide text-accent">
              Case Studies
            </p>
            <h2
              id="projects-heading"
              className="type-h2 mt-2 w-fit rounded bg-canvas px-1 text-fg"
            >
              Projects
            </h2>
          </div>
          <span className="w-fit rounded bg-canvas px-1 font-mono text-xs font-medium text-fg-muted">
            01 — {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-6">
          {projects.map((project, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <li key={project.slug}>
                <article className="card-base p-6 sm:p-8">
                  <div className="grid gap-6 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-2">
                      <span className="font-mono text-2xl font-bold text-accent">
                        {num}
                      </span>
                    </div>

                    <div className="space-y-4 md:col-span-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="type-h3 text-fg">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="transition-colors hover:text-accent focus-visible:text-accent"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        {project.status && (
                          <span className="chip text-accent">
                            {project.status}
                          </span>
                        )}
                      </div>

                      <p className="type-body text-fg-secondary">
                        {project.description}
                      </p>

                      <p className="text-sm text-fg-muted">
                        <strong className="font-medium text-fg-secondary">
                          Role:
                        </strong>{" "}
                        {project.role}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                        {project.metrics &&
                          (isTodo(project.metrics) ? (
                            <TodoBadge
                              value={project.metrics}
                              label="Metrics"
                            />
                          ) : (
                            <span className="chip text-accent">
                              {project.metrics}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:justify-end">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn-secondary"
                      >
                        <span>Read case study</span>
                        <ArrowRight className="h-4 w-4 text-accent" />
                      </Link>

                      {project.link && !isTodo(project.link) && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            project.linkLabel ?? `Open ${project.title}`
                          }
                          className="btn-icon"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
