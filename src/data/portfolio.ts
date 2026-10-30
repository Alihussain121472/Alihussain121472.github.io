// Single source of truth for Syed Ali Hussain's portfolio data; all components read from here.
import type {
  CertificateItem,
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
    github: "https://github.com/Alihussain121472",
    linkedin: "https://linkedin.com/in/ali-hussain-93a24430a",
    x: "https://x.com/Syedali6160",
    scholar:
      "https://scholar.google.com/scholar?q=Detection+of+Brute-Force+Login+Attempts+Using+Machine+Learning+Syed+Ali+Hussain",
    email: "syedali6160@gmail.com",
  },
};

export const projects: Project[] = [
  {
    slug: "novabrief-tech",
    title: "NovaBrief Tech",
    description: "AI-powered daily intelligence briefing platform for students.",
    link: "https://novabrief.tech",
    tags: ["AI", "Automation", "Next.js"],
    metrics: "Automated morning dispatch · Sub-second Llama 3.3 synthesis",
  },
  {
    slug: "n8n-agents",
    title: "n8n Automation Agents",
    description:
      "Daily LinkedIn posting agent and email reply agent for NovaBrief Tech.",
    tags: ["n8n", "LLMs", "Automation"],
    metrics: "Automated daily LinkedIn publishing & email reply workflows",
  },
  {
    slug: "brute-force-detection",
    title: "Brute-Force Login Detection",
    description: "Machine learning research published in IJICT.",
    link: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
    tags: ["ML", "Security", "Research"],
    metrics: "97.24% SVM classification accuracy · IJICT Vol. 9, Issue 1",
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
    pdfUrl:
      "/assets/papers/Detection-of-Brute-Force-Login-Attempts-Using-Machine-Learning.pdf",
    certificateUrl:
      "/assets/images/certificates/szabist-ijict-ml-research-publication.jpg",
  },
  offerLetter: {
    title: "Research Intern Offer Letter",
    org: "AI-Explain You Science (AIEYS)",
    start: "15 Oct 2026",
    term: "One year",
    referenceId: "Ref: AIEYS-ADMIN-1001",
    previewUrl: "/assets/images/certificates/aieys-research-intern-offer-letter.jpg",
    summary:
      "Official one-year Research Intern appointment at AI-Explain You Science (AIEYS), conducting applied machine learning research and scientific publications.",
  },
  ongoing:
    "More papers in progress with Azerbaijan University of Architecture and Construction",
  ongoingPdfUrl:
    "/assets/papers/Swarm-Intelligence-tuning-of-PID-Position-Controllers-for-a-dual-axis-Solar-tracker.pdf",
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

// Certifications strictly contains course, conference, and technical certificates (Research paper & Research offer letter live in `research`).
export const certifications: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Harvard CS50P: Intro to Programming with Python",
    issuer: "Harvard University (David J. Malan)",
    issueDate: "Aug 2026",
    category: "AI & Computer Science",
    previewUrl: "/assets/images/certificates/harvard-cs50-python.svg",
    skills: ["Object-Oriented Python", "Unit Testing", "Algorithms", "File I/O"],
  },
  {
    id: "cert-2",
    title: "Google / Coursera Crash Course on Python",
    issuer: "Google",
    issueDate: "Nov 2025",
    category: "AI & Computer Science",
    previewUrl: "/assets/images/certificates/google-python-crash-course.jpg",
    skills: ["Python Data Structures", "Automation Scripting", "Modularity"],
  },
  {
    id: "cert-3",
    title: "Cisco Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    issueDate: "Jan 2026",
    category: "AI & Computer Science",
    previewUrl: "/assets/images/certificates/cisco-modern-ai.jpg",
    skills: ["Neural Networks", "Machine Learning Foundations", "AI Ethics"],
  },
  {
    id: "cert-4",
    title: "AIEYS AI-Enhanced Teaching Certificate",
    issuer: "AI-Explain You Science (AIEYS)",
    issueDate: "Apr 2026",
    category: "AI & Computer Science",
    previewUrl: "/assets/images/certificates/aieys-ai-teaching.jpg",
    skills: ["AI Curriculum", "Interactive Instruction", "Mentoring"],
  },
  {
    id: "cert-5",
    title: "Google Technical Support Fundamentals",
    issuer: "Google / Coursera",
    issueDate: "Nov 2025",
    category: "Systems & Web",
    previewUrl: "/assets/images/certificates/google-technical-support-fundamentals.jpg",
    skills: ["TCP/IP Networking", "Linux CLI", "System Troubleshooting"],
  },
  {
    id: "cert-6",
    title: "AIEYS Web Developer Internship Certificate",
    issuer: "AI-Explain You Science (AIEYS)",
    issueDate: "Apr 2026",
    category: "Systems & Web",
    previewUrl: "/assets/images/certificates/aieys-web-developer-internship.jpg",
    skills: ["Frontend Architecture", "Responsive UI", "API Integration"],
  },
  {
    id: "cert-7",
    title: "AI Conference in Germany — Certificate",
    issuer: "AIEYS & European Scientific Forum",
    issueDate: "Sep 2026",
    category: "Conferences & Honors",
    previewUrl: "/assets/images/certificates/Certificate of AI Confrence in Germany .jpeg",
    skills: ["International Conference", "Generative AI", "Scientific Presentation"],
  },
  {
    id: "cert-8",
    title: "AI Conference in Germany — Participation",
    issuer: "AIEYS & European Scientific Forum",
    issueDate: "Sep 2026",
    category: "Conferences & Honors",
    previewUrl:
      "/assets/images/certificates/Certificate of participation in AI Confrence in Germany.jpeg",
    skills: ["AI Symposium", "Academic Networking", "Research Exchange"],
  },
  {
    id: "cert-9",
    title: "City Science College Achievement Certificate",
    issuer: "City Science College",
    issueDate: "2024",
    category: "Conferences & Honors",
    previewUrl: "/assets/images/certificates/city-science-college-achievement.jpg",
    skills: ["Academic Excellence", "STEM Foundations"],
  },
];

export const certificates: string[] = [
  "Google Skills ML badges",
  ...certifications.map((c) => `${c.title} (${c.issuer})`),
];

export const services: string[] = [
  "Website development",
  "AI agents and n8n automation",
];

export const usesData: UsesCategory[] = [
  {
    category: "AI & Automation Stack",
    items: [
      {
        name: "n8n",
        detail: "Workflow orchestration for daily LinkedIn and email agents",
      },
      {
        name: "Llama 3.3 (Groq LPU) & Gemini",
        detail: "Automated summarization and agentic decision flows",
      },
      {
        name: "Python & Scikit-Learn",
        detail: "SVM, Gaussian Naive Bayes, and PCA for security research",
      },
    ],
  },
  {
    category: "Web Development",
    items: [
      {
        name: "Next.js & TypeScript",
        detail: "App Router, Server Components, and strict type safety",
      },
      {
        name: "Tailwind CSS & Framer Motion",
        detail: "Minimalist, dark-first design system with accessible motion",
      },
      {
        name: "PostgreSQL & Vercel",
        detail: "Relational storage, Resend email delivery, and edge deployment",
      },
    ],
  },
  {
    category: "Development Environment",
    items: [
      {
        name: "Editor & Shell",
        detail: "VS Code · PowerShell · Git & GitHub CLI",
      },
      {
        name: "Languages & Runtimes",
        detail: "TypeScript · Python 3 · Node.js · SQL",
      },
    ],
  },
];
