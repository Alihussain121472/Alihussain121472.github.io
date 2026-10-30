// Research section (#research) showcasing the published IJICT paper, publication certificate, AIEYS Research Offer Letter, and ongoing papers.
"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!previewDoc) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPreviewDoc(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewDoc]);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-20 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-accent">
              Academic Publications &amp; Appointment
            </p>
            <h2
              id="research-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-fg"
            >
              Research
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-secondary">
              Peer-reviewed machine learning research, official AIEYS research
              appointment, and ongoing international collaborations.
            </p>
          </div>
          <span className="font-mono text-xs font-medium text-fg-muted">
            Published · Fellowship · Ongoing
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* 01. Published Paper + IJICT Publication Certificate */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-subtle/40 px-5 py-3.5 font-mono text-xs sm:px-6">
                  <span className="inline-flex items-center gap-2 font-bold text-accent">
                    <BookOpen className="h-4 w-4" />
                    <span>01 · Published Paper</span>
                  </span>
                  <span className="font-medium text-fg-secondary">
                    {published.venue}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    {published.title}
                  </h3>

                  <p className="mt-2 font-mono text-xs text-fg-muted">
                    DOI:{" "}
                    <a
                      href={doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-fg-secondary underline decoration-accent/60 underline-offset-4 hover:text-accent"
                    >
                      {published.doi}
                    </a>
                  </p>

                  {/* Matted Publication Certificate Stage */}
                  <div className="mt-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-stage p-3 sm:p-4">
                    <img
                      src={published.certificateUrl}
                      alt="SZABIST — IJICT ML Research Publication Certificate"
                      loading="lazy"
                      className="max-h-full max-w-full rounded object-contain shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border bg-subtle/40 px-5 py-4 sm:px-6">
                <a
                  href={published.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Read on IJICT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    setPreviewDoc({
                      title:
                        "SZABIST — IJICT ML Research Publication Certificate",
                      subtitle: `${published.venue} · DOI: ${published.doi}`,
                      imageUrl: published.certificateUrl,
                    })
                  }
                  className="btn-secondary"
                >
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  <span>Preview Certificate</span>
                </button>

                <a
                  href={published.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FileText className="h-3.5 w-3.5 text-accent" />
                  <span>Full Paper (PDF)</span>
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
                    className="btn-secondary"
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
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-subtle/40 px-5 py-3.5 font-mono text-xs sm:px-6">
                  <span className="inline-flex items-center gap-2 font-bold text-accent">
                    <FileCheck2 className="h-4 w-4" />
                    <span>02 · Research Appointment</span>
                  </span>
                  <span className="font-medium text-fg-muted">
                    {offerLetter.referenceId}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    {offerLetter.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs font-medium text-accent">
                    {offerLetter.org} · Start: {offerLetter.start} (
                    {offerLetter.term})
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                    {offerLetter.summary}
                  </p>

                  {/* Matted Offer Letter Stage */}
                  <div className="mt-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-stage p-3 sm:p-4">
                    <img
                      src={offerLetter.previewUrl}
                      alt={`${offerLetter.title} — ${offerLetter.org}`}
                      loading="lazy"
                      className="max-h-full max-w-full rounded object-contain shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-subtle/40 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewDoc({
                      title: offerLetter.title,
                      subtitle: `${offerLetter.org} · ${offerLetter.referenceId}`,
                      imageUrl: offerLetter.previewUrl,
                    })
                  }
                  className="btn-secondary"
                >
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  <span>Inspect Offer Letter</span>
                </button>

                <a
                  href={offerLetter.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open original offer letter file"
                  className="btn-icon"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 03. Ongoing Research */}
      <Reveal delay={0.14}>
        <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-accent">
              <Clock className="h-4 w-4" />
              <span>03 · In Progress</span>
            </div>
            <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-0.5 font-mono text-xs font-medium text-accent">
              Ongoing Collaboration
            </span>
          </div>

          <p className="mt-3 text-base font-medium text-fg">{ongoing}</p>

          {ongoingPdfUrl && (
            <div className="mt-4">
              <a
                href={ongoingPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs font-semibold text-accent">
                  {previewDoc.subtitle}
                </p>
                <h3
                  id="research-modal-title"
                  className="mt-1 text-xl font-bold text-fg"
                >
                  {previewDoc.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                aria-label="Close document preview"
                className="btn-icon"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-border bg-stage p-3 sm:p-4">
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
                className="btn-primary"
              >
                <span>Open Original File</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
