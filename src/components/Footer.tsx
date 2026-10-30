// Site footer with dynamic year, direct email/social icons, and readable links for Uses and Humans.txt.
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 font-mono text-xs text-fg-muted sm:flex-row sm:px-6">
        <p>
          &copy; {currentYear} {profile.name}. Built with Next.js &amp;
          TypeScript.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="btn-icon"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="btn-icon"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) profile"
            className="btn-icon"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <DirectEmailLink
            ariaLabel="Open email app to message Syed Ali Hussain"
            className="btn-icon"
          >
            <Mail className="h-4 w-4" />
          </DirectEmailLink>

          <Link
            href="/uses"
            className="inline-flex min-h-[44px] items-center px-2 font-medium text-fg-secondary transition-colors hover:text-accent"
          >
            Uses
          </Link>
          <Link
            href="/humans.txt"
            className="inline-flex min-h-[44px] items-center px-2 font-medium text-fg-secondary transition-colors hover:text-accent"
          >
            Humans.txt
          </Link>
        </div>
      </div>
    </footer>
  );
}
