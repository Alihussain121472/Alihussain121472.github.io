// Responsive sticky header component using anchor links (#) for on-page sections.
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, Twitter, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Research", href: "#research" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const externalSocials = [
    { label: "GitHub profile", url: profile.socials.github, Icon: Github },
    { label: "LinkedIn profile", url: profile.socials.linkedin, Icon: Linkedin },
    { label: "X (Twitter) profile", url: profile.socials.x, Icon: Twitter },
  ];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/30 bg-transparent backdrop-blur-md transition-colors">
      <div className="site-header__inner mx-auto max-w-5xl">
        <Link
          href="/#intro"
          aria-label={`${profile.name} — Home`}
          onClick={() => setIsMobileMenuOpen(false)}
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2.5 font-mono text-sm font-bold tracking-wide text-fg transition-colors hover:text-accent"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-transparent font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent">
            SAH
          </span>
          <span className="header-brand-name">{profile.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="site-header__nav">
          <ul className="header-desktop-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  className="header-nav-link inline-flex min-h-[44px] items-center rounded-lg bg-transparent font-medium text-fg-secondary transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="site-header__actions">
            <div className="header-social-group">
              {externalSocials.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <DirectEmailLink
              ariaLabel="Open email app to message Syed Ali Hussain"
              className="btn-icon"
            >
              <Mail className="h-4 w-4" />
            </DirectEmailLink>

            <ThemeToggle />

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="btn-icon header-mobile-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-nav-drawer"
        className={`header-mobile-drawer ${
          isMobileMenuOpen ? "is-open" : ""
        }`}
      >
        <ul className="header-mobile-drawer__list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={`/${item.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm font-medium text-fg-secondary transition-colors hover:bg-subtle hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="header-mobile-drawer__socials">
          {externalSocials.map(({ label, url, Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="btn-icon"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
