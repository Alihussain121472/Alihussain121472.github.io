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
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to projects</span>
      </Link>

      <header className="mt-8 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-3 font-mono text-sm text-accent">
          <span>Project {num}</span>
          {project.status && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs">
              {project.status}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg text-neutral-300">{project.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-neutral-800 bg-neutral-900/70 px-2.5 py-1 font-mono text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}

          {project.metrics &&
            (isTodo(project.metrics) ? (
              <TodoBadge value={project.metrics} label="Project Metrics" />
            ) : (
              <span className="font-mono text-xs text-accent">
                {project.metrics}
              </span>
            ))}

          {project.link && !isTodo(project.link) && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 font-mono text-xs font-bold text-[#111111] transition-opacity hover:opacity-90"
            >
              <span>Visit live link</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 space-y-6 leading-relaxed text-neutral-300 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-neutral-100 [&_li]:ml-5 [&_li]:list-disc [&_p]:text-base [&_strong]:text-neutral-100">
        {mdxEntry ? (
          <MDXRemote source={mdxEntry.content} />
        ) : (
          <p>{project.description}</p>
        )}
      </div>
    </article>
  );
}
