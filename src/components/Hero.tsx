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
      className="mx-auto flex min-h-[82vh] max-w-5xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-32"
    >
      <p className="font-mono text-sm font-semibold tracking-wide text-accent sm:text-base">
        {profile.roleLine}
      </p>

      <h1
        id="hero-heading"
        className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-fg sm:text-6xl lg:text-7xl"
      >
        {profile.name}
      </h1>

      <TypingRole roles={profile.roles} />

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-secondary sm:text-xl lg:text-2xl">
        {profile.valueStatement}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#projects" className="btn-primary px-6 py-3 text-sm">
          <ArrowDown className="h-4 w-4" />
          <span>View projects</span>
        </a>

        <a
          href={profile.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary px-6 py-3 text-sm"
        >
          <Download className="h-4 w-4 text-accent" />
          <span>Download CV</span>
        </a>

        <Link href="/contact" className="btn-secondary px-6 py-3 text-sm">
          <Mail className="h-4 w-4 text-accent" />
          <span>Contact</span>
        </Link>
      </div>
    </section>
  );
}
