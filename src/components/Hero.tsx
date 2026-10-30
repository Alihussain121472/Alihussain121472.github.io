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
      className="mx-auto flex min-h-[82vh] max-w-5xl flex-col justify-center px-6 py-24"
    >
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-widest text-neutral-400 uppercase">
          {profile.headline}
        </p>

        <h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </h1>

        <div className="mt-5">
          <RotatingRole roles={profile.roles} />
        </div>

        <div className="mt-10 h-px w-24 bg-accent/60" aria-hidden="true" />

        <div className="mt-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 rounded-md border border-neutral-800 bg-neutral-900/70 px-5 py-3 font-mono text-xs font-medium tracking-wider text-neutral-200 uppercase transition-all hover:border-accent hover:text-accent"
          >
            <span>Scroll to projects</span>
            <ArrowDown className="h-4 w-4 text-accent" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
