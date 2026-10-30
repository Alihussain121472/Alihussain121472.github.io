// Home page assembling Hero (#intro), numbered Projects (#projects), Certifications (#certifications), and Details (#details).
import React from "react";
import { Hero } from "@/components/Hero";
import { ProjectsList } from "@/components/ProjectsList";
import { CertificationsSection } from "@/components/CertificationsSection";
import { DetailsSection } from "@/components/DetailsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsList />
      <CertificationsSection />
      <DetailsSection />
    </>
  );
}
