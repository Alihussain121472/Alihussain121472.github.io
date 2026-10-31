// Zero-dependency typewriter specialty rotator with WCAG-compliant accent color and reduced-motion support.
"use client";

import React, { useEffect, useState } from "react";

interface TypingRoleProps {
  roles: string[];
}

export function TypingRole({ roles }: TypingRoleProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(roles[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || roles.length === 0) return;

    const currentWord = roles[roleIndex] ?? "";
    let timeoutMs = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentWord.length) {
      timeoutMs = 1800;
    } else if (isDeleting && charIndex === 0) {
      timeoutMs = 250;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setCharIndex((c) => c + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, reducedMotion, roleIndex, roles]);

  if (roles.length === 0) return null;

  const currentWord = roles[roleIndex] ?? roles[0] ?? "";
  const visibleText = reducedMotion
    ? (roles[0] ?? "")
    : currentWord.slice(0, charIndex);

  return (
    <p className="type-h2 mt-3 flex min-h-[1.4em] items-center gap-2.5 font-semibold tracking-tight">
      <span className="sr-only">{roles.join(", ")}</span>
      <span
        aria-hidden="true"
        className="font-mono font-bold text-fg-secondary select-none"
      >
        +
      </span>
      <span aria-hidden="true" className="font-mono text-accent">
        {visibleText}
        <span className="ml-1 inline-block h-[1.05em] w-[2.5px] translate-y-[0.12em] animate-pulse bg-accent" />
      </span>
    </p>
  );
}
