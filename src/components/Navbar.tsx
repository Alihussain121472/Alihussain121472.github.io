// Sticky top navigation with 44px tap targets, direct email app launcher, social links, and theme toggle.
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const externalSocials = [
    { label: "GitHub profile", url: profile.socials.github, Icon: Github },
    { label: "LinkedIn profile", url: profile.socials.linkedin, Icon: Linkedin },
    { label: "X (Twitter) profile", url: profile.socials.x, Icon: Twitter },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border bg-canvas transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/#intro"
          aria-label={`${profile.name} — Home`}
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2.5 font-mono text-sm font-bold tracking-wide text-fg transition-colors hover:text-accent"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent">
            SAH
          </span>
          <span className="hidden md:inline">{profile.name}</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-2 sm:gap-4"
        >
          <ul className="flex flex-wrap items-center gap-1 text-xs font-medium text-fg-secondary sm:gap-2 sm:text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-canvas px-2.5 py-2 text-fg-secondary transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 border-l border-border pl-2 sm:gap-2 sm:pl-4">
            {externalSocials.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn-icon hidden sm:inline-flex"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

            <DirectEmailLink
              ariaLabel="Open email app to message Syed Ali Hussain"
              className="btn-icon"
            >
              <Mail className="h-4 w-4" />
            </DirectEmailLink>
          </div>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
