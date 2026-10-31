// Dedicated Services ("Available for") section (#services) placed between Projects and Research.
import React from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { profile, services } from "@/data/portfolio";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-5xl border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wide text-accent">
            Services
          </p>
          <h2 id="services-heading" className="type-h2 mt-2 text-fg">
            Available for
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-fg-muted">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span>{profile.location}</span>
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service}
            className="card-base flex items-start gap-3 p-5"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-sm font-semibold text-fg">{service}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2.5 text-sm text-fg-secondary">
          <Sparkles className="h-4 w-4 shrink-0 text-accent" />
          <span>{profile.availability}</span>
        </div>
        <Link href="/contact" className="btn-secondary">
          <span>Get in touch</span>
        </Link>
      </div>
    </section>
  );
}
