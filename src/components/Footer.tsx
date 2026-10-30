// Site footer with dynamic year and clear readable labels for Uses and Humans.txt.
import React from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-fg-muted sm:flex-row sm:px-6">
        <p>
          &copy; {currentYear} {profile.name}. Built with Next.js &amp;
          TypeScript.
        </p>
        <div className="flex items-center gap-4">
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
