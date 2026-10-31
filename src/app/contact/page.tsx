// Contact page (/contact) with direct email app launcher, clear social labels, and Resend form.
import React from "react";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { DirectEmailLink } from "@/components/DirectEmailLink";
import { isTodo, TodoBadge } from "@/components/TodoBadge";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Syed Ali Hussain for website development, AI agent and n8n automation projects, and machine learning research collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${profile.name}`,
    description:
      "Start a conversation with Syed Ali Hussain about website development, n8n AI agents, or ML security research.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${profile.name}`,
    description:
      "Get in touch with Syed Ali Hussain for website development, AI agents with n8n, and research collaborations.",
  },
};

export default function ContactPage() {
  const socialRows = [
    {
      label: "Email",
      value: profile.socials.email,
      displayLabel: "Send Email (Open App)",
    },
    {
      label: "GitHub",
      value: profile.socials.github,
      displayLabel: "GitHub (@Alihussain121472)",
    },
    {
      label: "LinkedIn",
      value: profile.socials.linkedin,
      displayLabel: "LinkedIn Profile",
    },
    {
      label: "X (Twitter)",
      value: profile.socials.x,
      displayLabel: "X (@Syedali6160)",
    },
    {
      label: "Google Scholar",
      value: profile.socials.scholar,
      displayLabel: "Google Scholar Profile",
    },
    {
      label: "ORCID",
      value: profile.socials.orcid,
      displayLabel: "ORCID Profile",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs font-semibold tracking-wide text-accent">
          Say Hello
        </p>
        <h1 className="type-h1 mt-2 text-fg">Contact</h1>
        <p className="type-body mt-4 text-fg-secondary">
          {profile.availability}
        </p>

        <div className="mt-6">
          <DirectEmailLink className="btn-primary">
            <Mail className="h-4 w-4" />
            <span>Open Email App ({profile.socials.email})</span>
          </DirectEmailLink>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-6 md:col-span-5">
            <div className="card-base p-6">
              <h2 className="type-h3 text-fg">Profiles &amp; Direct Links</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {socialRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-xs font-medium text-fg-muted">
                      {row.label}
                    </dt>
                    <dd>
                      {isTodo(row.value) ? (
                        <TodoBadge value={row.value} label={row.label} />
                      ) : row.label === "Email" ? (
                        <DirectEmailLink className="inline-flex min-h-[44px] items-center font-medium text-accent underline underline-offset-4">
                          {row.displayLabel}
                        </DirectEmailLink>
                      ) : (
                        <a
                          href={row.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center font-medium text-accent underline underline-offset-4"
                        >
                          {row.displayLabel}
                        </a>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
    </div>
  );
}
