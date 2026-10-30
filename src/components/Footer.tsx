// Site footer displaying dynamic copyright year and link to /humans.txt.
import React from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-neutral-400 sm:flex-row">
        <p>
          &copy; {currentYear} {profile.name}. Built with Next.js &amp;
          TypeScript.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/uses"
            className="transition-colors hover:text-accent"
          >
            /uses
          </Link>
          <Link
            href="/humans.txt"
            className="transition-colors hover:text-accent"
          >
            /humans.txt
          </Link>
        </div>
      </div>
    </footer>
  );
}
