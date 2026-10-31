// Server Action that validates contact submissions, enforces rate limits, and sends email via Resend REST API.
"use server";

import { headers } from "next/headers";
import { profile } from "@/data/portfolio";
import type { ContactActionState, ContactFormValues } from "@/types/portfolio";

const FALLBACK_KEY_B64 = "cmVfUVYxZHRudU1fczh4bmdHVkZ6YWp2cWVTMjZ0d0JDR3lD";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

export async function sendContactEmail(
  values: ContactFormValues
): Promise<ContactActionState> {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 80) {
    return { success: false, message: "Name must be between 2 and 80 characters." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (message.length < 10 || message.length > 2000) {
    return {
      success: false,
      message: "Message must be between 10 and 2000 characters.",
    };
  }

  const reqHeaders = await headers();
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  if (isRateLimited(ip)) {
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
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [recipient],
        reply_to: email,
        subject: `Portfolio Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Could not deliver email at this time. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Thanks for reaching out! Your message has been sent to Syed Ali Hussain.",
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred while sending your message.",
    };
  }
}
