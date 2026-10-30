// Hero section (#intro) with role line, value statement, direct email launcher, and Download CV button.
import React from "react";
import { Download, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="intro"
      aria-labelledby="hero-heading"
      className="mx-auto flex max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal>
        <p className="font-mono text-xs font-semibold tracking-wide text-accent">
          {profile.roleLine}
        </p>

        <h1 id="hero-heading" className="type-display mt-4 text-fg">
          {profile.name}
        </h1>

        <p className="type-body mt-6 text-fg-secondary">
          {profile.valueStatement}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <DirectEmailLink className="btn-primary">
            <Mail className="h-4 w-4" />
            <span>Contact me</span>
          </DirectEmailLink>

          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Download className="h-4 w-4 text-accent" />
            <span>Download CV</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
