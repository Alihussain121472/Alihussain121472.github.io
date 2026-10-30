// Sticky top navigation bar with logo (#intro), primary links, social icons, and theme toggle.
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { isTodo } from "@/components/TodoBadge";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Details", href: "/#details" },
  { label: "Research", href: "/research" },
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
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#111111]/85 backdrop-blur-md transition-colors dark:border-neutral-800/80 dark:bg-[#111111]/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/#intro"
          aria-label={`${profile.name} — Back to intro`}
          className="group inline-flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase transition-colors hover:text-accent"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded border border-neutral-700 bg-neutral-900 font-mono text-xs text-accent transition-colors group-hover:border-accent">
            SAH
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-5">
          <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-300 sm:gap-6">
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

          <div className="hidden items-center gap-2 border-l border-neutral-800 pl-4 md:flex">
            {socialEntries.map(({ key, url, Icon }) =>
              isTodo(url) ? (
                <span
                  key={key}
                  title={`${key}: TODO (update in src/data/portfolio.ts)`}
                  aria-label={`${key} link placeholder (TODO)`}
                  className="inline-flex h-8 w-8 cursor-not-allowed items-center justify-center rounded text-neutral-500 opacity-60"
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded text-neutral-400 transition-colors hover:text-accent"
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
