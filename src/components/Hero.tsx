// Minimalist Hero section (#intro) with large name, animated rotating role, and scroll button.
import React from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { RotatingRole } from "@/components/RotatingRole";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="intro"
      aria-labelledby="hero-heading"
      className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24"
    >
      <Reveal>
        <p className="mb-4 font-mono text-xs font-semibold tracking-widest text-fg-muted uppercase">
          {profile.headline}
        </p>

        <h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight text-fg sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </h1>

        <div className="mt-5">
          <RotatingRole roles={profile.roles} />
        </div>

        <div className="mt-10 h-0.5 w-24 bg-accent" aria-hidden="true" />

        <div className="mt-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-3 font-mono text-xs font-semibold tracking-wider text-fg uppercase shadow-sm transition-all hover:border-accent hover:text-accent"
          >
            <span>Scroll to projects</span>
            <ArrowDown className="h-4 w-4 text-accent" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
