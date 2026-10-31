// Contact section (#contact) at the bottom of the home page with direct email app launcher and contact form link.
import React from "react";
import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";

export function ContactBand() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-band-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <div id="contact-band" className="sr-only" aria-hidden="true" />
      <div className="card-base flex flex-col justify-between gap-8 p-6 sm:p-10 md:flex-row md:items-center">
        <div className="space-y-3">
          <p className="font-mono text-xs font-semibold tracking-wide text-accent">
            Contact
          </p>
          <h2 id="contact-band-heading" className="type-h2 text-fg">
            Let&apos;s work together
          </h2>
          <p className="type-body text-fg-secondary">{profile.availability}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <DirectEmailLink className="btn-primary">
            <Mail className="h-4 w-4" />
            <span>Send me an email</span>
          </DirectEmailLink>

          <Link href="/contact" className="btn-secondary">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span>Use contact form</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
