// Home page ordered as Hero → Projects → About → Research → Certifications → Contact band.
import React from "react";
import { Hero } from "@/components/Hero";
import { ProjectsList } from "@/components/ProjectsList";
import { DetailsSection } from "@/components/DetailsSection";
import { ResearchSection } from "@/components/ResearchSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactBand } from "@/components/ContactBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsList />
      <DetailsSection />
      <ResearchSection />
      <CertificationsSection />
      <ContactBand />
    </>
  );
}
