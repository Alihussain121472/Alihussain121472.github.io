// Hero section (#intro) displaying name, typing specialty line, positioning line, and three primary actions.
import React from "react";
import Link from "next/link";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TypingRole } from "@/components/TypingRole";

export function Hero() {
  return (
    <section
      id="intro"
      aria-labelledby="hero-heading"
      className="mx-auto flex max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24"
    >
      <p className="font-mono text-xs font-semibold tracking-wide text-accent">
        {profile.roleLine}
      </p>

      <h1 id="hero-heading" className="type-display mt-4 text-fg">
        {profile.name}
      </h1>

      <TypingRole roles={profile.roles} />

      <p className="type-body mt-5 text-fg-secondary">
        {profile.valueStatement}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a href="#projects" className="btn-primary">
          <ArrowDown className="h-4 w-4" />
          <span>View projects</span>
        </a>

        <a
          href={profile.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Download className="h-4 w-4 text-accent" />
          <span>Download CV</span>
        </a>

        <Link href="/contact" className="btn-secondary">
          <Mail className="h-4 w-4 text-accent" />
          <span>Contact</span>
        </Link>
      </div>
    </section>
  );
}
