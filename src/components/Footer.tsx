// Sticky auto-hiding footer component with dynamic year and direct social/email links.
"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";
import { DirectEmailLink } from "@/components/DirectEmailLink";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function updateFooterVisibility() {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = currentScrollY + viewportHeight >= docHeight - 64;
      const isScrollingDown = currentScrollY > lastScrollY + 4;

      if (isAtBottom) {
        setIsHidden(false);
      } else if (isScrollingDown || currentScrollY < 160) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY - 12 && currentScrollY > 240) {
        setIsHidden(true);
      }

      lastScrollY = currentScrollY;
    }

    updateFooterVisibility();
    window.addEventListener("scroll", updateFooterVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateFooterVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
    };
  }, []);

  return (
    <footer
      onFocusCapture={() => setIsHidden(false)}
      className={`site-footer border-t border-border bg-surface ${
        isHidden ? "is-hidden" : "is-visible"
      }`}
    >
      <div className="site-footer__inner mx-auto max-w-5xl font-mono text-xs text-fg-muted">
        <p className="site-footer__copy">
          &copy; {currentYear} {profile.name}. Built with Next.js &amp;
          TypeScript.
        </p>

        <div className="site-footer__links">
          <div className="site-footer__socials">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
