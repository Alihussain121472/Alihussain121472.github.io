// Lightweight validated contact form using native React state (zero external form libraries).
"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import type { ContactActionState } from "@/types/portfolio";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactActionState | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const result = await sendContactEmail({ name, email, message });
    setIsSubmitting(false);
    setStatus(result);

    if (result.success) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card-base space-y-6 p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs font-semibold tracking-wide text-fg-secondary"
        >
          Your Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="Syed Ali Hussain"
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs font-semibold tracking-wide text-fg-secondary"
        >
          Your Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs font-semibold tracking-wide text-fg-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 w-full rounded-xl border border-border bg-canvas p-4 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="Tell me about your website, AI agent, or machine learning research project..."
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.message}
          </p>
        )}
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-border bg-subtle px-4 py-3 text-sm font-medium text-fg"
        >
          {status.message}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        <Send className="h-4 w-4" />
        <span>{isSubmitting ? "Sending..." : "Send message"}</span>
      </button>
    </form>
  );
}
