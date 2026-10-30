// Standalone Certifications page (/certifications) displaying all verified credentials and previews.
import React from "react";
import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
import { CertificationsSection } from "@/components/CertificationsSection";

export const metadata: Metadata = {
  title: "Certifications",
  description: `Verified AI, machine learning, Python, and research certifications earned by ${profile.name}.`,
};

export default function CertificationsPage() {
  return (
    <div className="py-8">
      <CertificationsSection />
    </div>
  );
}
