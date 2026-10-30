// Animated rotating role line for the Hero section, respecting prefers-reduced-motion.
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingRoleProps {
  roles: string[];
}

export function RotatingRole({ roles }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || roles.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [roles.length, shouldReduceMotion]);

  const currentRole = roles[index] ?? roles[0] ?? "";

  return (
    <div className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
      <span className="text-neutral-500 dark:text-neutral-400">+</span>
      <span className="relative inline-flex min-w-[12ch] items-center">
        {shouldReduceMotion ? (
          <span className="text-accent">{roles.join(" / ")}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-accent"
            >
              {currentRole}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </div>
  );
}
