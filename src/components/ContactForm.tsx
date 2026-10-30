// Validated contact form using React Hook Form, Zod, and the Resend Server Action.
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
      className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs font-semibold tracking-wider text-fg-secondary uppercase"
        >
          Your Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          className="mt-2 w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          placeholder="Syed Ali Hussain"
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs font-semibold tracking-wider text-fg-secondary uppercase"
        >
          Your Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          className="mt-2 w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs font-semibold tracking-wider text-fg-secondary uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          placeholder="Tell me about your project, research collaboration, or automation workflow..."
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-lg border px-4 py-3 text-sm font-medium ${
            status.success
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs font-bold tracking-wider text-accent-fg uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        <span>{isSubmitting ? "Sending..." : "Send message"}</span>
      </button>
    </form>
  );
}
