// Research section (#research) featuring published IJICT paper, AIEYS Research Intern role card, and labeled preprint.
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Eye,
  FileText,
  X,
} from "lucide-react";
import { profile, research } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function ResearchSection() {
  const [showCertModal, setShowCertModal] = useState(false);
  const { published, internship, preprint } = research;
  const doiUrl = `https://doi.org/${published.doi}`;

  useEffect(() => {
    if (!showCertModal) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowCertModal(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCertModal]);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-accent">
              Publications &amp; Internship
            </p>
            <h2 id="research-heading" className="type-h2 mt-2 text-fg">
              Research
            </h2>
            <p className="type-body mt-2 text-fg-secondary">
              My published papers, AIEYS research role, and new studies in
              progress.
            </p>
          </div>
          <span className="font-mono text-xs font-medium text-fg-muted">
            Published · Internship · Preprint
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 01. Published Peer-Reviewed Paper */}
          <div className="lg:col-span-7">
            <article className="card-base flex h-full flex-col justify-between overflow-hidden">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-subtle px-6 py-3.5 font-mono text-xs">
                  <span className="inline-flex items-center gap-2 font-bold text-accent">
                    <BookOpen className="h-4 w-4" />
                    <span>01 · Published Paper</span>
                  </span>
                  <span className="font-medium text-fg-secondary">
                    {published.venue}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="type-h3 text-fg">{published.title}</h3>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <a
                      href={doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-semibold text-accent underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
                    >
                      DOI: {published.doi}
                    </a>
                    <span className="text-fg-muted">·</span>
                    <span className="font-mono text-fg-secondary">
                      SVM Accuracy: 97.24%
                    </span>
                  </div>

                  {/* Fixed-aspect next/image container prevents layout shift */}
                  <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-stage">
                    <Image
                      src={published.certificateUrl}
                      alt="IJICT publication certificate for Detection of Brute-Force Login Attempts Using Machine Learning"
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-contain p-3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border bg-subtle px-6 py-4">
                <a
                  href={published.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Read paper on IJICT</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={published.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="btn-secondary"
                >
                  <Eye className="h-4 w-4 text-accent" />
                  <span>Preview Certificate</span>
                </button>
              </div>
            </article>
          </div>

          {/* 02. Research Intern Role Card (replaces offer-letter image & reference ID) + 03. Preprint */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <article className="card-base flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="inline-flex items-center gap-2 font-bold text-accent">
                    <Briefcase className="h-4 w-4" />
                    <span>02 · Research Internship</span>
                  </span>
                  <span className="chip">{internship.period}</span>
                </div>

                <h3 className="type-h3 mt-4 text-fg">
                  {internship.role} · {internship.org}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {internship.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="text-xs font-medium text-fg-muted">
                  Academic Profiles
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
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
                      <span>Google Scholar Profile</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {isTodo(profile.socials.orcid) && (
                    <TodoBadge value={profile.socials.orcid} label="ORCID" />
                  )}
                </div>
              </div>
            </article>

            {/* 03. Preprint Manuscript */}
            <article className="card-base flex flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-accent">
                    03 · Preprint
                  </span>
                  <span className="chip text-accent">{preprint.label}</span>
                </div>

                <h3 className="type-h3 mt-4 text-fg">{preprint.title}</h3>

                <dl className="mt-3 space-y-2 text-xs text-fg-secondary">
                  <div>
                    <dt className="inline font-mono font-semibold text-fg-muted">
                      Status:{" "}
                    </dt>
                    <dd className="inline">{preprint.status}</dd>
                  </div>
                  <div>
                    <dt className="inline font-mono font-semibold text-fg-muted">
                      Co-authors:{" "}
                    </dt>
                    <dd className="inline">
                      <TodoBadge
                        value={preprint.coAuthors}
                        label="Co-authors"
                      />
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <a
                  href={preprint.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Read Preprint PDF</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </Reveal>

      {showCertModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowCertModal(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs font-semibold text-accent">
                  {published.venue} · DOI: {published.doi}
                </p>
                <h3 id="research-modal-title" className="type-h3 mt-1 text-fg">
                  IJICT Publication Certificate
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                aria-label="Close certificate preview"
                className="btn-icon"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-stage">
              <Image
                src={published.certificateUrl}
                alt="IJICT Publication Certificate"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-contain p-3"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
