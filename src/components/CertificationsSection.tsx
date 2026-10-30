// Interactive Certifications & Credentials showcase (#certifications) with category filtering and preview modal.
"use client";

import React, { useState } from "react";
import { Award, ExternalLink, Eye, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import type { CertificateItem } from "@/types/portfolio";
import { Reveal } from "@/components/Reveal";

const categories = [
  "All",
  "AI & Computer Science",
  "Research & Conferences",
  "Systems & Web",
] as const;

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null
  );

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="mx-auto max-w-5xl border-t border-neutral-800/80 px-6 py-24"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">
              Verified Credentials
            </p>
            <h2
              id="certifications-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Certifications &amp; Honors
            </h2>
          </div>

          <span className="font-mono text-xs text-neutral-400">
            01 — {String(filtered.length).padStart(2, "0")}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Filter certifications by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-md border px-3.5 py-2 font-mono text-xs transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <Reveal key={cert.id} delay={idx * 0.04}>
              <article className="group flex h-full flex-col justify-between overflow-hidden rounded-lg border border-neutral-800/90 bg-neutral-900/40 transition-colors hover:border-accent/60">
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    aria-label={`Preview ${cert.title} certificate`}
                    className="relative block aspect-[16/10] w-full overflow-hidden border-b border-neutral-800/80 bg-[#151515] text-left"
                  >
                    <img
                      src={cert.previewUrl}
                      alt={`${cert.title} — ${cert.issuer}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded border border-neutral-700/80 bg-[#111111]/85 px-2 py-0.5 font-mono text-xs text-accent backdrop-blur-sm">
                      {num}
                    </span>
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded border border-neutral-700/80 bg-[#111111]/85 px-2.5 py-1 font-mono text-[11px] text-neutral-200 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <Eye className="h-3 w-3 text-accent" />
                      <span>Preview</span>
                    </span>
                  </button>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-neutral-400">
                      <span className="truncate text-accent">{cert.issuer}</span>
                      <span className="shrink-0">{cert.issueDate}</span>
                    </div>

                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-100">
                      {cert.title}
                    </h3>

                    {cert.credentialId && (
                      <p className="mt-1 font-mono text-xs text-neutral-400">
                        {cert.credentialId}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded border border-neutral-800 bg-neutral-900/80 px-2 py-0.5 font-mono text-[11px] text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-800/60 px-5 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-200 transition-colors hover:text-accent"
                  >
                    <Award className="h-3.5 w-3.5 text-accent" />
                    <span>Inspect credential</span>
                  </button>

                  <a
                    href={cert.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${cert.title} image in new tab`}
                    className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 transition-colors hover:text-accent"
                  >
                    <span>Full file</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-neutral-800 bg-[#111111] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <p className="font-mono text-xs text-accent">
                  {selectedCert.issuer} · {selectedCert.issueDate}
                </p>
                <h3
                  id="cert-modal-title"
                  className="mt-1 text-xl font-bold text-neutral-100"
                >
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:border-accent hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded border border-neutral-800 bg-neutral-950">
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
                    className="rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1 font-mono text-xs text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={selectedCert.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-xs font-bold text-[#111111]"
              >
                <span>Open original file</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
