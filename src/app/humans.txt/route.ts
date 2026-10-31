// Serves /humans.txt dynamically using data from src/data/portfolio.ts.
import { NextResponse } from "next/server";
import { education, experience, profile } from "@/data/portfolio";

export function GET() {
  const body = [
    "/* TEAM */",
    `Name: ${profile.name}`,
    `Roles: ${profile.roleLine}`,
    `Value Statement: ${profile.valueStatement}`,
    `Education: ${education.degree} @ ${education.school}`,
    `Current Role: ${experience[0]?.role ?? "Research Intern"} @ ${experience[0]?.org ?? "AIEYS"}`,
    `Site: ${profile.site}`,
    "",
    "/* SOCIALS */",
    `GitHub: ${profile.socials.github}`,
    `LinkedIn: ${profile.socials.linkedin}`,
    `X: ${profile.socials.x}`,
    `Google Scholar: ${profile.socials.scholar}`,
    `ORCID: ${profile.socials.orcid}`,
    `Email: ${profile.socials.email}`,
    "",
    "/* SITE */",
    "Standards: HTML5, CSS3, WCAG 2.2 AA",
    "Stack: Next.js App Router, TypeScript (Strict), Tailwind CSS, Resend",
    "Hosting: Vercel",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
