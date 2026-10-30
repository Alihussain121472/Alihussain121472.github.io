// Home page assembling Hero (#intro), Projects (#projects), Research (#research), Certifications (#certifications), and Details (#details).
import React from "react";
import { Hero } from "@/components/Hero";
import { ProjectsList } from "@/components/ProjectsList";
import { ResearchSection } from "@/components/ResearchSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { DetailsSection } from "@/components/DetailsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsList />
      <ResearchSection />
      <CertificationsSection />
      <DetailsSection />
    </>
  );
}
