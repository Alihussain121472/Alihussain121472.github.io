// Site footer displaying dynamic copyright year and link to /humans.txt.
import React from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-fg-muted sm:flex-row sm:px-6">
        <p>
          &copy; {currentYear} {profile.name}. Built with Next.js &amp;
          TypeScript.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/uses"
            className="font-medium text-fg-secondary transition-colors hover:text-accent"
          >
            /uses
          </Link>
          <Link
            href="/humans.txt"
            className="font-medium text-fg-secondary transition-colors hover:text-accent"
          >
            /humans.txt
          </Link>
        </div>
      </div>
    </footer>
  );
}
