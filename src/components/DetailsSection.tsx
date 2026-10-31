// Short About section (#about) with profile photo, professional 2-line intro, and dated experience/education.
import React from "react";
import Image from "next/image";
import { education, experience, profile } from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";

export function DetailsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="space-y-6 md:col-span-7">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-accent">
              Profile
            </p>
            <h2 id="about-heading" className="type-h2 mt-2 text-fg">
              About
            </h2>
          </div>

          <div className="space-y-3">
            <p className="type-body text-fg-secondary">
              {profile.introLines[0]}
            </p>
            <p className="type-body text-fg-secondary">
              {profile.introLines[1]}
            </p>
          </div>

          <div className="card-base p-5">
            <h3 className="type-h3 text-fg">Experience &amp; Education</h3>
            <ul className="mt-4 space-y-4 text-sm text-fg-secondary">
              {experience.map((exp) => (
                <li key={`${exp.role}-${exp.org}`}>
                  <div className="font-semibold text-fg">
                    {exp.role} · {exp.org}
                  </div>
                  <div className="font-mono text-xs text-accent">
                    {exp.period}
                  </div>
                  <p className="mt-1 text-xs text-fg-secondary">
                    {exp.summary}
                  </p>
                </li>
              ))}
              <li className="border-t border-border pt-3">
                <div className="font-semibold text-fg">
                  {education.degree} at {education.school}.
                </div>
                <div className="mt-1">
                  {isTodo(education.period) ? (
                    <TodoBadge
                      value={education.period}
                      label="Education Dates"
                    />
                  ) : (
                    <span className="font-mono text-xs text-fg-muted">
                      {education.period}
                    </span>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-5">
          <figure className="card-base overflow-hidden p-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-stage">
              <Image
                src={profile.avatar}
                alt={`${profile.name} — Portrait`}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-xs font-medium text-fg-muted">
              <span>{profile.name}</span>
              <span className="text-fg-secondary">{education.school}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
