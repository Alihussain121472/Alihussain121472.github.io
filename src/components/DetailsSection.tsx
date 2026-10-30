// About section (#about) with first-person intro, dated experience & education, services, direct email button, and profile photo.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import {
  education,
  experience,
  profile,
  services,
} from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function DetailsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <div id="details" className="sr-only" aria-hidden="true" />
      <Reveal>
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="space-y-6 md:col-span-7">
            <div>
              <p className="w-fit rounded bg-canvas px-1 font-mono text-xs font-semibold tracking-wide text-accent">
                About
              </p>
              <h2
                id="about-heading"
                className="type-h2 mt-2 w-fit rounded bg-canvas px-1 text-fg"
              >
                Hi there <span aria-hidden="true">👋🏼</span>
              </h2>
            </div>

            <p className="type-body rounded bg-canvas px-1 text-fg-secondary">
              I am a <strong className="text-fg">{education.degree}</strong>{" "}
              student at{" "}
              <strong className="text-fg">{education.school}</strong>. I founded{" "}
              <a
                href="https://novabrief.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
              >
                NovaBrief Tech
              </a>
              , a daily AI briefing for students. I also work as a{" "}
              <Link
                href="/#research"
                className="font-medium text-accent underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Research Intern at AIEYS
              </Link>{" "}
              on machine learning models and papers. I build AI agents with n8n.
            </p>

            <div className="grid gap-6 pt-2 sm:grid-cols-2">
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

              <div className="card-base flex flex-col justify-between p-5">
                <div>
                  <h3 className="type-h3 text-fg">Services</h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-sm font-medium text-fg-secondary">
                    {services.map((srv) => (
                      <li key={srv}>{srv}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs">
                  <div className="flex items-start gap-2 text-fg-secondary">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{profile.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-fg-muted">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <TodoBadge value={profile.location} label="Location" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <DirectEmailLink className="btn-primary">
                <Mail className="h-4 w-4" />
                <span>Send me an email</span>
              </DirectEmailLink>
            </div>
          </div>

          <div className="md:col-span-5">
            <figure className="card-base overflow-hidden p-4">
              <div className="relative aspect-[4/5] w-full max-w-[1080px] overflow-hidden rounded-lg bg-stage">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} — Portrait`}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-xs font-medium text-fg-muted">
                <span>About Me</span>
                <span className="text-fg-secondary">{profile.name}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
