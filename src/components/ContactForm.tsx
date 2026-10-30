// Validated contact form with visible keyboard focus rings, 44px tap targets, and Resend Server Action.
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { sendContactEmail } from "@/app/actions/contact";
import type { ContactActionState } from "@/types/portfolio";

export function ContactForm() {
  const [status, setStatus] = useState<ContactActionState | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    const result = await sendContactEmail(values);
    setStatus(result);
    if (result.success) {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="Syed Ali Hussain"
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.name.message}
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
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.email.message}
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
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 w-full rounded-xl border border-border bg-canvas p-4 text-sm text-fg placeholder-fg-muted focus:border-accent"
          placeholder="Tell me about your website, AI agent, or machine learning research project..."
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
            {errors.message.message}
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
