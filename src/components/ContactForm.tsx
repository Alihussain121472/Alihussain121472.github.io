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
      className="space-y-6 rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs tracking-wider text-neutral-300 uppercase"
        >
          Your Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          className="mt-2 w-full rounded-md border border-neutral-800 bg-[#111111] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:border-accent focus:outline-none"
          placeholder="Syed Ali Hussain"
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs tracking-wider text-neutral-300 uppercase"
        >
          Your Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          className="mt-2 w-full rounded-md border border-neutral-800 bg-[#111111] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs tracking-wider text-neutral-300 uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 w-full rounded-md border border-neutral-800 bg-[#111111] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:border-accent focus:outline-none"
          placeholder="Tell me about your project, research collaboration, or automation workflow..."
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-md border px-4 py-3 text-sm ${
            status.success
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/40 bg-red-500/10 text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-xs font-bold tracking-wider text-[#111111] uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        <span>{isSubmitting ? "Sending..." : "Send message"}</span>
      </button>
    </form>
  );
}
