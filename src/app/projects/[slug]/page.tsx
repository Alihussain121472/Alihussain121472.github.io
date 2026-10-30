// Dynamic project detail page (/projects/[slug]) rendering project metadata and MDX content.
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { getProjectMdxBySlug } from "@/lib/mdx";
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
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const mdxEntry = getProjectMdxBySlug(slug);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs font-medium text-fg-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to projects</span>
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex items-center gap-3 font-mono text-sm font-semibold text-accent">
          <span>Project {num}</span>
          {project.status && (
            <span className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 text-xs">
              {project.status}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg">
          {project.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-fg-secondary">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
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
              <TodoBadge value={project.metrics} label="Project Metrics" />
            ) : (
              <span className="font-mono text-xs font-medium text-accent">
                {project.metrics}
              </span>
            ))}

          {project.link && !isTodo(project.link) && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-auto"
            >
              <span>Visit live link</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 space-y-6 leading-relaxed text-fg-secondary [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_p]:text-base [&_strong]:text-fg">
        {mdxEntry ? (
          <MDXRemote source={mdxEntry.content} />
        ) : (
          <p>{project.description}</p>
        )}
      </div>
    </article>
  );
}
