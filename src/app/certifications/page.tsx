// Standalone Certifications page (/certifications) with separate Meta/OG/Twitter tags and canonical URL.
import React from "react";
import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
import { CertificationsSection } from "@/components/CertificationsSection";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications in Python, modern AI, web development, and international conferences earned by Syed Ali Hussain.",
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: `Certifications | ${profile.name}`,
    description:
      "Coursework and conference certificates in Python (Harvard CS50P, Google), Modern AI (Cisco), and AIEYS.",
    url: "/certifications",
  },
  twitter: {
    card: "summary_large_image",
    title: `Certifications | ${profile.name}`,
    description:
      "Python, AI, web development, and European AI conference certifications by Syed Ali Hussain.",
  },
};

export default function CertificationsPage() {
  return (
    <div className="py-8">
      <CertificationsSection />
    </div>
  );
}
