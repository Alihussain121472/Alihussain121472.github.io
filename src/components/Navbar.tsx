// Sticky top navigation bar with logo (#intro), primary links, social icons, and theme toggle.
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { isTodo } from "@/components/TodoBadge";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Research", href: "/#research" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Details", href: "/#details" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const socialEntries = [
    { key: "GitHub", url: profile.socials.github, Icon: Github },
    { key: "LinkedIn", url: profile.socials.linkedin, Icon: Linkedin },
    { key: "X", url: profile.socials.x, Icon: Twitter },
    { key: "Google Scholar", url: profile.socials.scholar, Icon: GraduationCap },
    {
      key: "Email",
      url: isTodo(profile.socials.email)
        ? "TODO"
        : `mailto:${profile.socials.email}`,
      Icon: Mail,
    },
  ];

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-border transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
        <Link
          href="/#intro"
          aria-label={`${profile.name} — Back to intro`}
          className="group inline-flex shrink-0 items-center gap-2.5 font-mono text-sm font-bold tracking-wide text-fg transition-colors hover:text-accent"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent">
            SAH
          </span>
          <span className="hidden md:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-3 sm:gap-5">
          <ul className="flex flex-wrap items-center gap-3 text-xs font-medium text-fg-secondary sm:gap-5 sm:text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1.5 border-l border-border pl-4 lg:flex">
            {socialEntries.map(({ key, url, Icon }) =>
              isTodo(url) ? (
                <span
                  key={key}
                  title={`${key}: TODO (update in src/data/portfolio.ts)`}
                  aria-label={`${key} link placeholder (TODO)`}
                  className="btn-icon cursor-not-allowed opacity-60"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ) : (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="btn-icon"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            )}
          </div>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
