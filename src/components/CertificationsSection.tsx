// Compact Certifications section (#certifications) scaled to ~85% card footprint with 6 newest cards and "View all" toggle.
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Award, ChevronDown, ChevronUp, ExternalLink, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import type { CertificateItem } from "@/types/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null
  );

  useEffect(() => {
    if (!selectedCert) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedCert(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const sorted = [...certifications].sort((a, b) =>
    b.sortDate.localeCompare(a.sortDate)
  );
  const featured = sorted
    .filter((c) => c.group === "featured")
    .slice(0, 6);
  const other = sorted.filter((c) => c.group === "other");

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-accent">
              Coursework &amp; Conferences
            </p>
            <h2 id="certifications-heading" className="type-h2 mt-2 text-fg">
              Certifications
            </h2>
            <p className="type-body mt-2 text-fg-secondary">
              Course badges and honors in Python code, modern AI, web apps, and
              global tech events.
            </p>
          </div>
          <span className="font-mono text-xs font-medium text-fg-muted">
            Showing {featured.length} of {sorted.length} (newest first)
          </span>
        </div>

        {/* ~85% scaled compact certification cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cert) => (
            <article
              key={cert.id}
              className="card-base mx-auto flex w-full max-w-[310px] flex-col justify-between overflow-hidden sm:max-w-none"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden border-b border-border bg-stage">
                  <Image
                    src={cert.previewUrl}
                    alt={`${cert.title} issued by ${cert.issuer}`}
                    fill
                    sizes="(max-width: 640px) 310px, (max-width: 1024px) 45vw, 280px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-fg-muted">
                    <span className="truncate font-medium text-accent">
                      {cert.issuer}
                    </span>
                    <span className="shrink-0">{cert.issueDate}</span>
                  </div>

                  <h3 className="mt-1.5 text-base font-semibold leading-snug text-fg">
                    {cert.title}
                  </h3>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5">
                    {isTodo(cert.verificationUrl) ? (
                      <TodoBadge
                        value={cert.verificationUrl}
                        label="Verification URL"
                      />
                    ) : (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1 font-mono text-xs font-semibold text-accent underline underline-offset-4"
                      >
                        <span>Verify credential</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border bg-subtle px-3.5 py-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="btn-secondary flex-1"
                >
                  <Award className="h-4 w-4 text-accent" />
                  <span>Preview</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All toggle for quiet "Other" group */}
        {other.length > 0 && (
          <div className="mt-7">
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-secondary"
            >
              <span>
                {showAll
                  ? "Hide other certificates"
                  : `View all (${other.length} more in Other)`}
              </span>
              {showAll ? (
                <ChevronUp className="h-4 w-4 text-accent" />
              ) : (
                <ChevronDown className="h-4 w-4 text-accent" />
              )}
            </button>

            {showAll && (
              <div className="mt-5 rounded-xl border border-border bg-surface p-4">
                <h3 className="font-mono text-xs font-bold tracking-wide text-fg-muted">
                  Other (School &amp; Participation Certificates)
                </h3>
                <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {other.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-subtle p-3.5"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-fg">
                          {cert.title}
                        </div>
                        <div className="font-mono text-xs text-fg-muted">
                          {cert.issuer} · {cert.issueDate}
                        </div>
                        <TodoBadge
                          value={cert.verificationUrl}
                          label="Verification URL"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="btn-secondary shrink-0"
                      >
                        <span>Preview</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Reveal>

      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs font-semibold text-accent">
                  {selectedCert.issuer} · {selectedCert.issueDate}
                </p>
                <h3 id="cert-modal-title" className="type-h3 mt-1 text-fg">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="btn-icon"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-stage">
                <Image
                  src={selectedCert.previewUrl}
                  alt={selectedCert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-contain p-3"
                />
              </div>

              {selectedCert.secondaryPreviewUrl && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-stage">
                  <Image
                    src={selectedCert.secondaryPreviewUrl}
                    alt={`${selectedCert.title} — Participation`}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-contain p-3"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
