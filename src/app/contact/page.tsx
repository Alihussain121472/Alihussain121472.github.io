// Contact page (/contact) with validated React Hook Form + Resend Server Action and social links.
import React from "react";
import type { Metadata } from "next";
import { profile, services } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { isTodo, TodoBadge } from "@/components/TodoBadge";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for ${services.join(" and ")}.`,
};

export default function ContactPage() {
  const socialRows = [
    { label: "Email", value: profile.socials.email },
    { label: "GitHub", value: profile.socials.github },
    { label: "LinkedIn", value: profile.socials.linkedin },
    { label: "X (Twitter)", value: profile.socials.x },
    { label: "Google Scholar", value: profile.socials.scholar },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-mono text-xs font-semibold tracking-wide text-accent">
          Say Hello
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
          Available for{" "}
          <strong className="text-fg">{services.join(" & ")}</strong> as well as
          machine learning research collaborations.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>
        </div>

        <aside className="space-y-6 md:col-span-5">
          <Reveal delay={0.12}>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="font-mono text-xs font-bold tracking-wide text-accent">
                Direct Links &amp; Socials
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {socialRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-xs font-medium text-fg-muted">
                      {row.label}
                    </dt>
                    <dd className="max-w-[200px] truncate">
                      {isTodo(row.value) ? (
                        <TodoBadge value={row.value} label={row.label} />
                      ) : (
                        <a
                          href={
                            row.label === "Email"
                              ? `mailto:${row.value}`
                              : row.value
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent underline underline-offset-4"
                        >
                          {row.label === "Email"
                            ? row.value
                            : row.value.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
