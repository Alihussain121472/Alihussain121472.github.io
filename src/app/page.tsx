// Home page ordered as Hero → short About → Projects → Services ("Available for") → Research → Certifications → Contact.
import React from "react";
import { Hero } from "@/components/Hero";
import { DetailsSection } from "@/components/DetailsSection";
import { ProjectsList } from "@/components/ProjectsList";
import { ServicesSection } from "@/components/ServicesSection";
import { ResearchSection } from "@/components/ResearchSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactBand } from "@/components/ContactBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DetailsSection />
      <ProjectsList />
      <ServicesSection />
      <ResearchSection />
      <CertificationsSection />
      <ContactBand />
    </>
  );
}
