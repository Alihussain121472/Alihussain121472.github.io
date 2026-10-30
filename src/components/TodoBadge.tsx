// Renders a clearly marked placeholder chip whenever a data field is set to TODO.
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
      className="chip"
      title="Placeholder — update in src/data/portfolio.ts"
    >
      [{display}]
    </span>
  );
}
