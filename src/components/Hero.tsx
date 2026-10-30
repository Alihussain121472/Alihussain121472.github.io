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
      className="mx-auto flex min-h-[78vh] max-w-5xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24"
    >
      <Reveal>
        <p className="mb-4 font-mono text-xs font-semibold tracking-wide text-fg-muted">
          {profile.headline}
        </p>

        <h1
          id="hero-heading"
          className="text-5xl font-bold tracking-tight text-fg"
        >
          {profile.name}
        </h1>

        <div className="mt-5">
          <RotatingRole roles={profile.roles} />
        </div>

        <div className="mt-10 h-0.5 w-24 bg-accent" aria-hidden="true" />

        <div className="mt-12">
          <a href="#projects" className="btn-secondary">
            <span>Scroll to projects</span>
            <ArrowDown className="h-4 w-4 text-accent" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
