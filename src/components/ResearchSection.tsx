// Research section (#research) showcasing the published IJICT paper, publication certificate, AIEYS Research Offer Letter, and ongoing papers.
"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  X,
} from "lucide-react";
import { profile, research } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

interface PreviewDoc {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function ResearchSection() {
  const [previewDoc, setPreviewDoc] = useState<PreviewDoc | null>(null);
  const { published, offerLetter, ongoing, ongoingPdfUrl } = research;
  const doiUrl = `https://doi.org/${published.doi}`;

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="mx-auto max-w-5xl border-t border-neutral-800/80 px-6 py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">
              Academic Publications &amp; Appointment
            </p>
            <h2
              id="research-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Research
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            Published · Fellowship · Ongoing
          </span>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* 01. Published Paper + IJICT Publication Certificate */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-accent">
                  <span className="inline-flex items-center gap-2 uppercase">
                    <BookOpen className="h-4 w-4" />
                    <span>01 · Published Paper</span>
                  </span>
                  <span>{published.venue}</span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-100">
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

                {/* Publication Certificate Preview Thumbnail */}
                <div className="mt-6 overflow-hidden rounded-md border border-neutral-800 bg-[#151515]">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewDoc({
                        title: "SZABIST — IJICT ML Research Publication Certificate",
                        subtitle: `${published.venue} · DOI: ${published.doi}`,
                        imageUrl: published.certificateUrl,
                      })
                    }
                    className="group relative block aspect-[16/9] w-full overflow-hidden text-left"
                  >
                    <img
                      src={published.certificateUrl}
                      alt="SZABIST — IJICT ML Research Publication Certificate"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded border border-neutral-700 bg-[#111111]/90 px-3 py-1 font-mono text-xs text-neutral-100 backdrop-blur-sm">
                      <Eye className="h-3.5 w-3.5 text-accent" />
                      <span>Preview Publication Certificate</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={published.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 font-mono text-xs font-bold text-[#111111] transition-opacity hover:opacity-90"
                >
                  <span>Read on IJICT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={published.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-mono text-xs text-neutral-200 transition-colors hover:border-accent hover:text-accent"
                >
                  <FileText className="h-3.5 w-3.5 text-accent" />
                  <span>Full Paper (PDF)</span>
                </a>

                <a
                  href={doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 font-mono text-xs text-neutral-300 transition-colors hover:border-accent hover:text-accent"
                >
                  <span>DOI</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                {isTodo(profile.socials.scholar) ? (
                  <TodoBadge
                    value={profile.socials.scholar}
                    label="Google Scholar"
                  />
                ) : (
                  <a
                    href={profile.socials.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 font-mono text-xs text-neutral-300 transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>Google Scholar</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 02. Research Intern Offer Letter (AIEYS) */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-accent">
                  <span className="inline-flex items-center gap-2 uppercase">
                    <FileCheck2 className="h-4 w-4" />
                    <span>02 · Research Appointment</span>
                  </span>
                  <span>{offerLetter.referenceId}</span>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-100">
                  {offerLetter.title}
                </h3>

                <p className="mt-1 font-mono text-xs text-neutral-400">
                  {offerLetter.org} · Start: {offerLetter.start} ({offerLetter.term})
                </p>

                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  {offerLetter.summary}
                </p>

                <div className="mt-5 overflow-hidden rounded-md border border-neutral-800 bg-[#151515]">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewDoc({
                        title: offerLetter.title,
                        subtitle: `${offerLetter.org} · ${offerLetter.referenceId}`,
                        imageUrl: offerLetter.previewUrl,
                      })
                    }
                    className="group relative block aspect-[16/10] w-full overflow-hidden text-left"
                  >
                    <img
                      src={offerLetter.previewUrl}
                      alt={`${offerLetter.title} — ${offerLetter.org}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded border border-neutral-700 bg-[#111111]/90 px-3 py-1 font-mono text-xs text-neutral-100 backdrop-blur-sm">
                      <Eye className="h-3.5 w-3.5 text-accent" />
                      <span>Preview Offer Letter</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewDoc({
                      title: offerLetter.title,
                      subtitle: `${offerLetter.org} · ${offerLetter.referenceId}`,
                      imageUrl: offerLetter.previewUrl,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-200 transition-colors hover:border-accent hover:text-accent"
                >
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  <span>Inspect Offer Letter</span>
                </button>

                <a
                  href={offerLetter.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 transition-colors hover:text-accent"
                >
                  <span>Original document</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 03. Ongoing Research */}
      <Reveal delay={0.14}>
        <div className="mt-8 rounded-lg border border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
              <Clock className="h-4 w-4" />
              <span>03 · In Progress</span>
            </div>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
              Ongoing Collaboration
            </span>
          </div>

          <p className="mt-3 text-base text-neutral-200">{ongoing}</p>

          {ongoingPdfUrl && (
            <div className="mt-4">
              <a
                href={ongoingPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>
                  View Pre-Print Manuscript: Swarm Intelligence Tuning of PID
                  Position Controllers (PDF)
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </Reveal>

      {/* Lightbox Modal for Research Documents */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-neutral-800 bg-[#111111] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <p className="font-mono text-xs text-accent">
                  {previewDoc.subtitle}
                </p>
                <h3
                  id="research-modal-title"
                  className="mt-1 text-xl font-bold text-neutral-100"
                >
                  {previewDoc.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                aria-label="Close document preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:border-accent hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded border border-neutral-800 bg-neutral-950">
              <img
                src={previewDoc.imageUrl}
                alt={previewDoc.title}
                className="max-h-[68vh] w-full object-contain"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={previewDoc.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-xs font-bold text-[#111111]"
              >
                <span>Open original file</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
