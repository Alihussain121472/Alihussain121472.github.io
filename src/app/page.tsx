// Home page assembling Hero (#intro), numbered Projects (#projects), and Details (#details).
import React from "react";
import { Hero } from "@/components/Hero";
import { ProjectsList } from "@/components/ProjectsList";
import { DetailsSection } from "@/components/DetailsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsList />
      <DetailsSection />
    </>
  );
}
