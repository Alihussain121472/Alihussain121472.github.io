// Single source of truth for Syed Ali Hussain's portfolio data; all components read from here.
import type {
  EducationData,
  ExperienceItem,
  Profile,
  Project,
  ResearchData,
  UsesCategory,
} from "@/types/portfolio";

export const profile: Profile = {
  name: "Syed Ali Hussain",
  roles: ["AI Developer", "Researcher", "Founder"],
  headline: "BS(AI) student, researcher, and founder of NovaBrief Tech",
  bio: "I'm Syed Ali, a BS Artificial Intelligence student at SZABIST Islamabad. I founded NovaBrief Tech, an AI daily briefing platform for students, and I'm a Research Intern at AI-Explain You Science (AIEYS). I build AI agents and automations with n8n and publish research on machine learning for security.",
  site: "https://alihussain121472-github-io.vercel.app",
  avatar: "/assets/images/syed-ali.jpg",
  socials: {
    github: "TODO",
    linkedin: "TODO",
    x: "TODO",
    scholar: "TODO",
    email: "TODO",
  },
};

export const projects: Project[] = [
  {
    slug: "novabrief-tech",
    title: "NovaBrief Tech",
    description: "AI-powered daily intelligence briefing platform for students.",
    link: "https://novabrief.tech",
    tags: ["AI", "Automation", "Next.js"],
    metrics: "TODO",
  },
  {
    slug: "n8n-agents",
    title: "n8n Automation Agents",
    description: "Daily LinkedIn posting agent and email reply agent for NovaBrief Tech.",
    tags: ["n8n", "LLMs", "Automation"],
    metrics: "TODO",
  },
  {
    slug: "brute-force-detection",
    title: "Brute-Force Login Detection",
    description: "Machine learning research published in IJICT.",
    link: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
    tags: ["ML", "Security", "Research"],
  },
  {
    slug: "dha-multan-agent",
    title: "DHA Multan Real Estate AI Agent",
    description: "AI agent for investors and dealers in DHA Multan real estate.",
    status: "In progress",
    tags: ["AI Agents", "Real Estate"],
  },
];

export const research: ResearchData = {
  published: {
    title: "Detection of Brute-Force Login Attempts Using Machine Learning",
    venue: "IJICT, Vol. 9, Issue 1, April 2026",
    doi: "10.31987/ijict.9.1.371",
    url: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
  },
  ongoing: "More papers in progress with Azerbaijan University of Architecture and Construction",
};

export const experience: ExperienceItem[] = [
  {
    role: "Research Intern",
    org: "AI-Explain You Science (AIEYS)",
    start: "15 Oct 2026",
    term: "One year",
  },
];

export const education: EducationData = {
  degree: "BS Artificial Intelligence",
  school: "SZABIST Islamabad",
};

export const certificates: string[] = [
  "Google Skills ML badges",
  "TODO: other certificates from my current portfolio",
];

export const services: string[] = [
  "Website development",
  "AI agents and n8n automation",
];

export const usesData: UsesCategory[] = [
  {
    category: "AI & Automation Stack",
    items: [
      { name: "n8n", detail: "Workflow orchestration for daily LinkedIn and email agents" },
      { name: "LLMs & Prompt Pipelines", detail: "Automated summarization and agentic decision flows" },
      { name: "Python & Scikit-Learn", detail: "Machine learning models for cybersecurity research" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "Next.js & TypeScript", detail: "App Router, Server Components, and strict type safety" },
      { name: "Tailwind CSS", detail: "Minimalist, dark-first design system" },
      { name: "Vercel", detail: "Edge deployment and production hosting" },
    ],
  },
  {
    category: "Hardware & Desk Setup",
    items: [
      { name: "Primary Workstation", detail: "TODO: Add exact laptop/desktop specifications" },
      { name: "Code Editor & Terminal", detail: "TODO: Add preferred editor theme and terminal setup" },
    ],
  },
];
