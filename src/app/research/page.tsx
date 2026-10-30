// Standalone Research page (/research) with separate Meta/OG/Twitter tags and canonical URL.
import React from "react";
import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
import { ResearchSection } from "@/components/ResearchSection";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Published machine learning security research in IJICT, AIEYS Research Internship, and ongoing preprints by Syed Ali Hussain.",
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: `Research | ${profile.name}`,
    description:
      "Explore Syed Ali Hussain's IJICT published paper on brute-force login detection, AIEYS Research Internship, and preprints.",
    url: "/research",
  },
  twitter: {
    card: "summary_large_image",
    title: `Research | ${profile.name}`,
    description:
      "Machine learning security research in IJICT (97.24% SVM accuracy) and AIEYS Research Internship.",
  },
};

export default function ResearchPage() {
  return (
    <div className="py-8">
      <ResearchSection />
    </div>
  );
}
