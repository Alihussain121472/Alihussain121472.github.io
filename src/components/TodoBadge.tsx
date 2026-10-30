// Renders a clearly marked placeholder badge whenever a data field is set to TODO.
import React from "react";

interface TodoBadgeProps {
  value: string;
  label?: string;
}

export function isTodo(value: string | undefined): boolean {
  if (!value) return false;
  return value.trim().toUpperCase().startsWith("TODO");
}

export function TodoBadge({ value, label }: TodoBadgeProps) {
  const display =
    value.trim().toUpperCase() === "TODO"
      ? label
        ? `TODO: ${label}`
        : "TODO"
      : value;

  return (
    <span
      className="inline-flex items-center rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-600 dark:text-amber-300"
      title="Placeholder — update in src/data/portfolio.ts"
    >
      [{display}]
    </span>
  );
}
