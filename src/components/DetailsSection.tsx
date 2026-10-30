// Personal "Hi there 👋🏼" Details section (#details) with inline links, profile photo ("About Me"), and CTA.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import {
  certificates,
  education,
  experience,
  profile,
  services,
} from "@/data/portfolio";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export function DetailsSection() {
  return (
    <section
      id="details"
      aria-labelledby="details-heading"
      className="mx-auto max-w-5xl border-t border-neutral-800/80 px-6 py-24"
    >
      <div className="grid gap-12 md:grid-cols-12 md:items-start">
        <div className="space-y-6 md:col-span-7">
          <Reveal>
            <h2
              id="details-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Hi there <span aria-hidden="true">👋🏼</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-neutral-300">
              I&apos;m <strong>{profile.name}</strong>, a{" "}
              <span className="text-neutral-100">{education.degree}</span>{" "}
              student at{" "}
              <span className="text-neutral-100">{education.school}</span>. I
              founded{" "}
              <a
                href="https://novabrief.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
              >
                NovaBrief Tech
              </a>
              , an AI daily briefing platform for students, and I&apos;m a{" "}
              <span className="text-neutral-100">
                {experience[0]?.role} at {experience[0]?.org}
              </span>
              . I build AI agents and automations with n8n and{" "}
              <Link
                href="/research"
                className="text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
              >
                publish research on machine learning for security
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-6 pt-4 sm:grid-cols-2">
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-4">
                <h3 className="font-mono text-xs tracking-wider text-accent uppercase">
                  Experience &amp; Education
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  {experience.map((exp) => (
                    <li key={`${exp.role}-${exp.org}`}>
                      <strong className="text-neutral-100">{exp.role}</strong> ·{" "}
                      {exp.org}
                      <div className="font-mono text-xs text-neutral-400">
                        Start: {exp.start} ({exp.term})
                      </div>
                    </li>
                  ))}
                  <li className="pt-1">
                    <strong className="text-neutral-100">
                      {education.degree}
                    </strong>{" "}
                    · {education.school}
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-4">
                <h3 className="font-mono text-xs tracking-wider text-accent uppercase">
                  Services &amp; Certificates
                </h3>
                <div className="mt-3 space-y-3 text-sm text-neutral-300">
                  <div>
                    <span className="font-mono text-xs text-neutral-400">
                      Services:
                    </span>
                    <ul className="mt-1 list-inside list-disc space-y-1">
                      {services.map((srv) => (
                        <li key={srv}>{srv}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-neutral-400">
                      Certificates:
                    </span>
                    <ul className="mt-1 space-y-1.5">
                      {certificates.map((cert) => (
                        <li key={cert}>
                          {isTodo(cert) ? <TodoBadge value={cert} /> : cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-md bg-accent px-5 py-3 font-mono text-xs font-bold tracking-wider text-[#111111] uppercase transition-opacity hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Send me a message</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-xs tracking-widest text-neutral-400 uppercase">
                <span>About Me</span>
                <span>{profile.name}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
