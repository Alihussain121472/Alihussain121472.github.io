// Centralized portfolio data, case-study content, research metadata, and sorted certifications.
import type {
  ArticleItem,
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
  roles: ["AI Developer", "Researcher", "Founder of NovaBrief Tech"],
  roleLine: "AI Developer · Researcher · Founder of NovaBrief Tech",
  valueStatement:
    "I build AI agents and n8n workflows. I also train machine learning models for cyber safety.",
  intro:
    "I am a BS in AI student at SZABIST Islamabad and the founder of NovaBrief Tech, a daily AI briefing for students. I also work as a Research Intern at AIEYS on machine learning models and papers, and I build AI agents with n8n.",
  introLines: [
    "I am a BS in AI student at SZABIST Islamabad and the founder of NovaBrief Tech, a daily AI briefing for students.",
    "I also work as a Research Intern at AIEYS on machine learning models and papers, and I build AI agents with n8n.",
  ],
  metaDescription:
    "Syed Ali Hussain — AI Developer · Researcher · Founder of NovaBrief Tech. Building AI agents with n8n and published ML security research.",
  ogDescription:
    "Syed Ali Hussain — AI Developer · Researcher · Founder of NovaBrief Tech. Portfolio of AI agents, n8n workflows, and ML research.",
  twitterDescription:
    "Syed Ali Hussain — AI Developer · Researcher · Founder of NovaBrief Tech.",
  location: "Islamabad, Pakistan · Remote", // TODO: confirm relocation preference
  availability:
    "I am open to new work. I build websites, AI agents with n8n, and joint machine learning studies.",
  cvUrl: "/assets/cv/Syed_Ali_Hussain_Resume.pdf", // TODO: replace with latest resume PDF if updated
  site: "https://alihussain121472-github-io.vercel.app",
  avatar: "/assets/images/syed-ali.jpg",
  socials: {
    github: "https://github.com/Alihussain121472",
    linkedin: "https://linkedin.com/in/ali-hussain-93a24430a",
    x: "https://x.com/Syedali6160",
    scholar: "TODO: add Google Scholar profile URL", // TODO: supply Google Scholar profile URL
    orcid: "TODO: add ORCID profile URL", // TODO: supply ORCID profile URL
    email: "syedali6160@gmail.com",
  },
};

export const projects: Project[] = [
  {
    slug: "novabrief-tech",
    title: "NovaBrief Tech",
    description: "Daily AI briefing for students.",
    image: "/assets/images/projects/novabrief-tech.png", // TODO: replace placeholder at /assets/images/projects/novabrief-tech.png
    metaDescription:
      "Case study on NovaBrief Tech: an automated daily AI briefing for students built with Next.js, PostgreSQL, and Llama 3.3.",
    ogDescription:
      "How I built NovaBrief Tech, a daily AI briefing for students that aggregates and summarizes tech and academic news every morning.",
    twitterDescription:
      "NovaBrief Tech case study — automated daily AI briefing for students using Next.js, Llama 3.3, and Resend.",
    problem:
      "Students struggle to track fast-moving AI developments, tech updates, and academic opportunities across dozens of scattered sources.",
    role: "Founder and Lead Builder. I built the news feed, AI prompts, database, and email system.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Llama 3.3", "Resend"],
    howItWorks: [
      "Scheduled collectors fetch daily tech news, AI updates, and student opportunities from curated feeds.",
      "Llama 3.3 summarizes and groups stories into a concise, consistent format tailored for students.",
      "PostgreSQL archives each edition while Resend delivers the morning email briefing to subscribers.",
    ],
    results: "TODO: add verified subscriber count and open-rate metrics", // TODO: supply verified subscriber count and open-rate metrics
    previewImage: "/assets/images/novabrief-preview.svg",
    previewAlt: "NovaBrief Tech daily AI briefing interface and workflow preview",
    architectureNodes: [
      "Scheduled RSS & News Collectors",
      "Llama 3.3 Summarization Pipeline",
      "PostgreSQL Archive & Resend Dispatch",
    ],
    link: "https://novabrief.tech",
    linkLabel: "Visit NovaBrief Tech",
    tags: ["AI Agents", "Next.js", "Automation"],
    metrics: "TODO: add verified subscriber metrics", // TODO: supply verified subscriber metrics
  },
  {
    slug: "n8n-agents",
    title: "n8n Automation Agents",
    description:
      "Daily LinkedIn posting agent and email reply agent for NovaBrief Tech.",
    image: "/assets/images/projects/n8n-agents.png", // TODO: replace placeholder at /assets/images/projects/n8n-agents.png
    metaDescription:
      "Case study on automated n8n AI agents that draft daily LinkedIn posts and email replies for NovaBrief Tech.",
    ogDescription:
      "Inside the n8n AI agents automating daily LinkedIn publishing and context-aware email replies for NovaBrief Tech.",
    twitterDescription:
      "Building AI agents with n8n for automated daily LinkedIn publishing and email reply workflows.",
    problem:
      "Publishing daily social updates and answering repetitive reader emails manually took hours away from core product and research work.",
    role: "AI Builder. I built and tested the n8n workflows, AI prompts, and app links.",
    stack: ["n8n", "LLMs", "REST APIs", "Webhooks", "JSON Schema"],
    howItWorks: [
      "A scheduled trigger reads the latest NovaBrief Tech edition and extracts key student takeaways.",
      "An LLM node formats a LinkedIn post and drafts context-aware replies for incoming reader emails.",
      "Validation nodes check formatting rules before publishing to LinkedIn and queuing email responses.",
    ],
    results: "TODO: add measured weekly hours saved and post engagement metrics", // TODO: supply measured weekly hours saved
    previewImage: "/assets/images/leads-agent-preview.svg",
    previewAlt: "n8n AI agents workflow diagram for LinkedIn and email automation",
    architectureNodes: [
      "Daily Schedule & Email Triggers",
      "n8n LLM Drafting & Validation Nodes",
      "LinkedIn API & Email Dispatch",
    ],
    tags: ["n8n", "AI Agents", "Automation"],
    metrics: "TODO: add measured time-saved metrics", // TODO: supply measured time-saved metrics
  },
  {
    slug: "brute-force-detection",
    title: "Brute-Force Login Detection",
    description: "Machine learning research published in IJICT.",
    image: "/assets/images/projects/brute-force-detection.png", // TODO: replace placeholder at /assets/images/projects/brute-force-detection.png
    metaDescription:
      "Case study on detecting brute-force login attempts using machine learning, published in IJICT (Vol. 9, Issue 1, April 2026).",
    ogDescription:
      "Peer-reviewed machine learning research in IJICT comparing SVM and Naive Bayes for brute-force login detection.",
    twitterDescription:
      "Published ML security research in IJICT: detecting brute-force login attempts with 97.24% SVM classification accuracy.",
    problem:
      "Automated brute-force login attacks evade static threshold rules, requiring accurate classification of network authentication traffic.",
    role: "Co-Author and ML Researcher. I picked the data features, trained the models, and co-wrote the paper.",
    stack: ["Python", "Scikit-Learn", "SVM", "Gaussian Naive Bayes", "PCA"],
    howItWorks: [
      "Network authentication logs are preprocessed, normalized, and reduced using Principal Component Analysis (PCA).",
      "Support Vector Machine (SVM) and Gaussian Naive Bayes models are trained on labeled login attempt features.",
      "Classifiers are evaluated on precision, recall, F1-score, and accuracy to separate benign logins from attacks.",
    ],
    results:
      "Published in IJICT (Vol. 9, Issue 1, April 2026, DOI: 10.31987/ijict.9.1.371) achieving 97.24% classification accuracy with SVM.",
    previewImage:
      "/assets/images/certificates/szabist-ijict-ml-research-publication.jpg",
    previewAlt: "IJICT publication certificate for brute-force login detection research",
    architectureNodes: [
      "Auth Log Normalization & PCA",
      "SVM & Naive Bayes Training",
      "97.24% Attack Classification",
    ],
    link: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
    linkLabel: "Read paper on IJICT",
    tags: ["Machine Learning", "Security", "Research"],
    metrics: "97.24% SVM accuracy · IJICT Vol. 9, Issue 1",
  },
  {
    slug: "dha-multan-agent",
    title: "DHA Multan Real Estate AI Agent",
    description: "AI agent for investors and dealers in DHA Multan real estate.",
    image: "/assets/images/projects/dha-multan-agent.png", // TODO: replace placeholder at /assets/images/projects/dha-multan-agent.png
    metaDescription:
      "Case study on an AI agent in progress for DHA Multan real estate investors and property dealers.",
    ogDescription:
      "Designing a conversational AI agent to help DHA Multan real estate investors and dealers query sector data and leads.",
    twitterDescription:
      "DHA Multan Real Estate AI Agent — conversational assistant in progress for property investors and dealers.",
    problem:
      "Real estate investors and dealers in DHA Multan need quick, accurate answers on sector pricing, plot inventory, and buyer inquiries.",
    role: "AI Builder. I am building the sector data base, chat agent flow, and dealer lead routing.",
    stack: ["AI Agents", "n8n", "LLMs", "Vector Search", "Next.js"],
    howItWorks: [
      "User inquiries from chat channels are parsed to identify plot sector, budget, and transaction intent.",
      "The AI agent retrieves structured DHA Multan sector information and generates a clear response.",
      "Qualified investor leads are logged and routed directly to dealers for follow-up.",
    ],
    results: "In progress — TODO: add pilot dealer testing metrics once launched", // TODO: supply pilot dealer testing metrics
    previewImage: "/assets/images/dha-agent-preview.svg",
    previewAlt: "DHA Multan Real Estate AI Agent architecture preview",
    architectureNodes: [
      "Investor Inquiry & Intent Parser",
      "DHA Sector Knowledge Retrieval",
      "Automated Dealer Lead Routing",
    ],
    status: "In progress",
    tags: ["AI Agents", "Real Estate", "n8n"],
  },
];

export const research: ResearchData = {
  published: {
    title: "Detection of Brute-Force Login Attempts Using Machine Learning",
    authors: ["Syed Ali Hussain"],
    venue: "IJICT, Vol. 9, Issue 1, April 2026",
    datePublished: "2026-04-01",
    doi: "10.31987/ijict.9.1.371",
    url: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
    pdfUrl:
      "/assets/papers/detection-of-brute-force-login-attempts-using-machine-learning.pdf",
    certificateUrl:
      "/assets/images/certificates/szabist-ijict-ml-research-publication.jpg",
  },
  internship: {
    role: "Research Intern",
    org: "AI-Explain You Science (AIEYS)",
    period: "Oct 2026 – Oct 2027",
    summary:
      "Research Intern at AIEYS (Oct 2026 – Oct 2027), working on machine learning models and new papers.",
    previewUrl:
      "/assets/images/certificates/aieys-research-intern-offer-letter.jpg",
  },
  preprint: {
    title:
      "Swarm Intelligence Tuning of PID Position Controllers for a Dual-Axis Solar Tracker",
    label: "Preprint (not peer reviewed)",
    status:
      "In progress with Azerbaijan University of Architecture and Construction",
    coAuthors: "TODO: add co-author names", // TODO: supply co-author names
    pdfUrl:
      "/assets/papers/swarm-intelligence-tuning-of-pid-position-controllers-for-a-dual-axis-solar-tracker.pdf",
  },
};

export const experience: ExperienceItem[] = [
  {
    role: "Research Intern",
    org: "AI-Explain You Science (AIEYS)",
    period: "Oct 2026 – Oct 2027",
    summary:
      "Research Intern at AIEYS (Oct 2026 – Oct 2027), working on machine learning models and new papers.",
  },
  {
    role: "Founder",
    org: "NovaBrief Tech",
    period: "2026 – Present",
    summary:
      "Built and run a daily AI briefing for students, paired with automated n8n AI agents.",
  },
];

export const education: EducationData = {
  degree: "BS in AI",
  school: "SZABIST Islamabad",
  period: "TODO: add start and end years", // TODO: supply enrollment and expected graduation years
};

// Sorted by date, newest first.
// Default 5 shown: Harvard CS50P, AIEYS Web Internship, AIEYS AI Teaching, Cisco AI, Google Python.
// "Show all" reveals the merged Germany conference card and Google Technical Support Fundamentals.
// City Science College card removed.
export const certifications: CertificateItem[] = [
  {
    id: "cert-germany-ai",
    title: "AI Conference in Germany (Certificate & Participation)",
    issuer: "AIEYS & European Scientific Forum",
    issueDate: "Sep 2026",
    sortDate: "2026-09",
    defaultVisible: false,
    previewUrl: "/assets/images/certificates/ai-conference-germany.jpg",
    secondaryPreviewUrl:
      "/assets/images/certificates/ai-conference-germany-participation.jpg",
    // TODO: add verifyUrl once public credential verification link is available
    skills: ["AI Symposium", "Scientific Presentation", "Research Exchange"],
  },
  {
    id: "cert-cs50p",
    title: "Harvard CS50P: Introduction to Programming with Python",
    issuer: "Harvard University",
    issueDate: "Aug 2026",
    sortDate: "2026-08",
    defaultVisible: true,
    previewUrl: "/assets/images/certificates/harvard-cs50-python.svg",
    // TODO: add verifyUrl once public CS50P verification link is available
    skills: ["Python", "Unit Testing", "Object-Oriented Design"],
  },
  {
    id: "cert-aieys-web",
    title: "Web Developer Internship Certificate",
    issuer: "AI-Explain You Science (AIEYS)",
    issueDate: "Apr 2026",
    sortDate: "2026-04",
    defaultVisible: true,
    previewUrl: "/assets/images/certificates/aieys-web-developer-internship.jpg",
    // TODO: add verifyUrl once public AIEYS verification link is available
    skills: ["Frontend Development", "Responsive UI", "API Integration"],
  },
  {
    id: "cert-aieys-teaching",
    title: "AI-Enhanced Teaching Certificate",
    issuer: "AI-Explain You Science (AIEYS)",
    issueDate: "Apr 2026",
    sortDate: "2026-04",
    defaultVisible: true,
    previewUrl: "/assets/images/certificates/aieys-ai-teaching.jpg",
    // TODO: add verifyUrl once public AIEYS verification link is available
    skills: ["AI Curriculum", "Mentoring"],
  },
  {
    id: "cert-cisco-ai",
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    issueDate: "Jan 2026",
    sortDate: "2026-01",
    defaultVisible: true,
    previewUrl: "/assets/images/certificates/cisco-modern-ai.jpg",
    // TODO: add verifyUrl once public Credly/Cisco verification link is available
    skills: ["Machine Learning Foundations", "Neural Networks", "AI Ethics"],
  },
  {
    id: "cert-google-python",
    title: "Crash Course on Python",
    issuer: "Google / Coursera",
    issueDate: "Nov 2025",
    sortDate: "2025-11",
    defaultVisible: true,
    previewUrl: "/assets/images/certificates/google-python-crash-course.jpg",
    // TODO: add verifyUrl once public Coursera verification link is available
    skills: ["Python Data Structures", "Automation Scripts"],
  },
  {
    id: "cert-google-support",
    title: "Technical Support Fundamentals",
    issuer: "Google / Coursera",
    issueDate: "Nov 2025",
    sortDate: "2025-11",
    defaultVisible: false,
    previewUrl:
      "/assets/images/certificates/google-technical-support-fundamentals.jpg",
    // TODO: add verifyUrl once public Coursera verification link is available
    skills: ["Linux CLI", "Networking", "System Troubleshooting"],
  },
];

export const services: string[] = [
  "Website development",
  "AI agents and n8n automation",
  "Machine learning research collaborations",
];

export const usesData: UsesCategory[] = [
  {
    category: "AI Agents & Automation",
    items: [
      {
        name: "n8n",
        detail: "Workflow automation for daily LinkedIn and email AI agents",
      },
      {
        name: "Llama 3.3 & Gemini",
        detail: "Consistent summarization and AI agent decision workflows",
      },
      {
        name: "Python & Scikit-Learn",
        detail: "SVM, Gaussian Naive Bayes, and PCA for security research",
      },
    ],
  },
  {
    category: "Web Stack",
    items: [
      {
        name: "Next.js & TypeScript",
        detail: "App Router, Server Components, and strict type checking",
      },
      {
        name: "Tailwind CSS",
        detail: "Accessible design tokens, fluid typography, and responsive layout",
      },
      {
        name: "PostgreSQL, Resend & Vercel",
        detail: "Relational storage, transactional email, and edge hosting",
      },
    ],
  },
];

export const articles: ArticleItem[] = [
  {
    slug: "building-ai-workflows-with-n8n",
    title: "Building AI Agents with n8n for NovaBrief Tech",
    description:
      "How I use n8n and LLMs to automate daily LinkedIn publishing and email replies.",
    date: "2026-04-20",
    readTime: "3 min read",
    tags: ["n8n", "AI Agents", "Automation"],
    sections: [
      {
        heading: "Why Automate Daily Operations?",
        paragraphs: [
          "While building NovaBrief Tech, a daily AI briefing for students, repetitive tasks like social posting and answering common reader emails took time away from core development and research.",
        ],
      },
      {
        heading: "The Two AI Agents",
        items: [
          "Daily LinkedIn Posting Agent: Connects morning briefing outputs to an LLM formatting node in n8n and schedules daily updates.",
          "Email Reply Agent: Reads incoming messages and drafts consistent, context-aware replies for review.",
        ],
      },
    ],
  },
  {
    slug: "machine-learning-for-brute-force-detection",
    title: "Detection of Brute-Force Login Attempts Using Machine Learning",
    description:
      "Notes on our IJICT published research applying machine learning models to detect automated login attacks.",
    date: "2026-04-15",
    readTime: "4 min read",
    tags: ["Machine Learning", "Security", "Research"],
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Credential stuffing and brute-force login attempts remain a persistent threat to web applications and networked systems. Traditional threshold-based lockouts often miss distributed or low-rate attacks.",
        ],
      },
      {
        heading: "Machine Learning Approach",
        paragraphs: [
          "In our paper published in IJICT (Vol. 9, Issue 1, April 2026), we explored supervised machine learning models to classify authentication traffic and distinguish legitimate user logins from automated brute-force attempts.",
        ],
        items: [
          "Paper Title: Detection of Brute-Force Login Attempts Using Machine Learning",
          "DOI: 10.31987/ijict.9.1.371",
          "SVM Classification Accuracy: 97.24%",
        ],
      },
    ],
    externalLink: {
      label: "Read Full Paper on IJICT Archive",
      url: "https://www.ijict.edu.iq/index.php/ijict/article/view/371",
    },
  },
];
