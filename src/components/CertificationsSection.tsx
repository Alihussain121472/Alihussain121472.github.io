// Interactive Certifications & Honors showcase (#certifications) with unified type scale and buttons.
"use client";

import React, { useEffect, useState } from "react";
import { Award, CheckCircle2, ExternalLink, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import type { CertificateItem } from "@/types/portfolio";
import { Reveal } from "@/components/Reveal";

const categories = [
  "All",
  "AI & Computer Science",
  "Systems & Web",
  "Conferences & Honors",
] as const;

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
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

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-20 sm:px-6 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-accent">
              Verified Credentials
            </p>
            <h2
              id="certifications-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-fg"
            >
              Certifications &amp; Honors
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-secondary">
              Course badges and honors in Python code, modern AI, web apps, and
              global tech events.
            </p>
          </div>

          <span className="font-mono text-xs font-medium text-fg-muted">
            Showing 01 — {String(filtered.length).padStart(2, "0")}
          </span>
        </div>

        {/* Category Filter Tabs using shared button system */}
        <div
          role="tablist"
          aria-label="Filter certifications by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All"
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={isActive ? "btn-primary" : "btn-secondary"}
              >
                <span>
                  {cat} ({count})
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Responsive 2-Column Editorial Card Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {filtered.map((cert, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <Reveal key={cert.id} delay={idx * 0.04}>
              <article className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-md">
                <div>
                  {/* Card Top Metadata Bar (minimum 12px text-xs) */}
                  <div className="flex items-center justify-between gap-2 px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-md border border-border bg-subtle px-2 font-mono text-xs font-bold text-accent">
                        {num}
                      </span>
                      <span className="rounded-md bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-fg-secondary">
                        {cert.category}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-medium text-fg-muted">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Uncropped Matted Document Stage */}
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-y border-border bg-stage p-3 sm:p-4">
                    <img
                      src={cert.previewUrl}
                      alt={`${cert.title} issued by ${cert.issuer}`}
                      loading="lazy"
                      className="max-h-full max-w-full rounded object-contain shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Card Body: Issuer, Title, Skills */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{cert.issuer}</span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-fg">
                      {cert.title}
                    </h3>

                    {cert.credentialId && (
                      <p className="mt-1 font-mono text-xs text-fg-muted">
                        {cert.credentialId}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-fg-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action Bar */}
                <div className="flex items-center justify-between gap-4 border-t border-border bg-subtle px-5 py-3.5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="btn-secondary"
                  >
                    <Award className="h-4 w-4 text-accent" />
                    <span>Preview Certificate</span>
                  </button>

                  <a
                    href={cert.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${cert.title} original file in new tab`}
                    className="btn-icon"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Accessible Full-Screen Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs font-semibold text-accent">
                  {selectedCert.issuer} · {selectedCert.issueDate}
                </p>
                <h3
                  id="cert-modal-title"
                  className="mt-1 text-xl font-bold text-fg"
                >
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

            <div className="mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-border bg-stage p-3 sm:p-4">
              <img
                src={selectedCert.previewUrl}
                alt={selectedCert.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-fg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={selectedCert.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Open Original File</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
