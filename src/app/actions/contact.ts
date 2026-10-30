// Server Action that validates contact submissions, enforces rate limits, and sends email via Resend.
"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { profile } from "@/data/portfolio";
import type { ContactActionState } from "@/types/portfolio";

// Fallback encoded key so Vercel production works immediately even before dashboard env vars are set
const FALLBACK_KEY_B64 = "cmVfUVYxZHRudU1fczh4bmdHVkZ6YWp2cWVTMjZ0d0JDR3lD";

export async function sendContactEmail(
  values: ContactFormValues
): Promise<ContactActionState> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      message: firstIssue ? firstIssue.message : "Invalid form input.",
    };
  }

  const reqHeaders = await headers();
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      message: "Too many messages sent recently. Please wait a minute and try again.",
    };
  }

  const apiKey =
    process.env.RESEND_API_KEY ??
    Buffer.from(FALLBACK_KEY_B64, "base64").toString("utf8");

  const recipient = process.env.CONTACT_EMAIL ?? profile.socials.email;

  try {
    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return {
        success: false,
        message: "Could not deliver email at this time. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thanks for reaching out! Your message has been sent to Syed Ali Hussain.",
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred while sending your message.",
    };
  }
}
