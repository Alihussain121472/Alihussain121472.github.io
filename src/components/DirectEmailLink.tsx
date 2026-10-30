// Smart email link that opens the native Mail/Gmail app via mailto: and falls back to Gmail Web Compose if no desktop mail client is configured.
"use client";

import React from "react";
import { profile } from "@/data/portfolio";

interface DirectEmailLinkProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  subject?: string;
  body?: string;
}

export function DirectEmailLink({
  children,
  className,
  ariaLabel,
  subject = "Inquiry from your portfolio — Syed Ali Hussain",
  body = "Hi Ali,\n\nI visited your portfolio and would like to get in touch regarding ",
}: DirectEmailLinkProps) {
  const email = profile.socials.email;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodedSubject}&body=${encodedBody}`;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window === "undefined") return;

    // On mobile/tablet devices, the native mailto: href directly launches the Gmail/Mail app.
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      return;
    }

    // On desktop, trigger mailto: first; if the browser does not lose focus to a native email app within 600ms, open Gmail Compose.
    e.preventDefault();
    let appOpened = false;

    const handleBlur = () => {
      appOpened = true;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
      }
    };

    window.addEventListener("blur", handleBlur, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange, {
      once: true,
    });

    window.location.href = mailtoUrl;

    window.setTimeout(() => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!appOpened && document.hasFocus()) {
        window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
      }
    }, 600);
  }

  return (
    <a
      href={mailtoUrl}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
