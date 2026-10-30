// Standalone Research page (/research) rendering the complete ResearchSection.
import React from "react";
import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
import { ResearchSection } from "@/components/ResearchSection";

export const metadata: Metadata = {
  title: "Research",
  description: `Published machine learning research, AIEYS Research Offer Letter, and ongoing papers by ${profile.name}.`,
};

export default function ResearchPage() {
  return (
    <div className="py-8">
      <ResearchSection />
    </div>
  );
}
