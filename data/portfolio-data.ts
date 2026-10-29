// ==============================================================================
// SYED ALI HUSSAIN PORTFOLIO DATA REPOSITORY
// High-Contrast, Typography-First Next.js 15 Application
// ==============================================================================

import {
  Project,
  HeroMetric,
  ResearchPaper,
  CredentialItem,
  DoiIdentifier,
} from '@/types/portfolio';

export const HERO_METRICS: readonly HeroMetric[] = [
  {
    id: 'flagship-systems',
    value: '3 Flagship Systems',
    label: 'Production AI & Web Deployments',
    detail: 'Shipped across SaaS digest, geospatial intelligence & desktop AI',
  },
  {
    id: 'svm-accuracy',
    value: '97.24% Accuracy',
    label: 'Peer-Reviewed ML Research',
    detail: 'SVM brute-force detection paper in IJICT (Vol. 9, No. 1)',
  },
  {
    id: 'credentials',
    value: '9 Verified Credentials',
    label: 'Engineering & Research Honors',
    detail: 'Harvard CS50P, Google, Cisco & AIEYS Research Fellowship',
  },
  {
    id: 'academic-track',
    value: '2025–29 BSc AI',
    label: 'SZABIST University, Islamabad',
    detail: 'Deep Learning, Applied ML & Autonomous Agent Systems',
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: 'novabrief',
    spotlightIndex: '01',
    title: 'NovaBrief Tech',
    kicker: 'Autonomous Morning Digest & AI Synthesis Engine',
    description:
      'A daily digest that gathers top AI news and student programs. It uses Llama 3.3 on Groq to write quick summaries and sends a morning email to readers.',
    categories: ['Live Web Platforms', 'AI & Agent Workflows'],
    stack: [
      'Python',
      'Flask',
      'PostgreSQL',
      'Llama 3.3',
      'Groq API',
      'APScheduler',
      'Resend / SMTP',
    ],
    featuredMetric: 'Sub-second LPU synthesis · Automated morning dispatch',
    liveUrl: 'https://novabrief.tech',
    liveLabel: 'Inspect novabrief.tech ↗',
    githubUrl: 'https://github.com/Alihussain121472/News-Agent',
    pipelineSteps: [
      {
        id: 'nb-1',
        label: 'Ingest Feeds',
        detail: 'Scheduled cron ingestion from curated tech, AI & grant sources',
        tech: 'APScheduler · Python',
      },
      {
        id: 'nb-2',
        label: 'Groq LPU Synthesis',
        detail: 'Llama 3.3 70B zero-shot deduplication & concise analytical summarization',
        tech: 'Llama 3.3 · Groq API',
      },
      {
        id: 'nb-3',
        label: 'Relational Archive',
        detail: 'Structured edition indexing, subscriber status & audit logs in PostgreSQL',
        tech: 'PostgreSQL · SQLAlchemy',
      },
      {
        id: 'nb-4',
        label: 'Morning Dispatch',
        detail: 'Automated HTML digest transmission with resilient SMTP/Resend failover',
        tech: 'Resend API · SMTP',
      },
    ],
    caseStudy: {
      problem:
        'AI news and student opportunities are dispersed across hundreds of disparate RSS feeds, press releases, and forums. For students and researchers, manually tracking breakthroughs consumes hours and leads to missed deadlines.',
      solutionArchitecture:
        'Engineered an autonomous backend pipeline in Python and Flask that orchestrates scheduled multi-feed ingestion, leverages Llama 3.3 via Groq for sub-second summarization, indexes stories in PostgreSQL, and delivers formatted briefs via Resend every morning.',
      executionPipeline: [
        'Ingestion & Validation: APScheduler activates automated crawlers fetching daily RSS and API feeds at configured intervals.',
        'Groq LPU Synthesis: An inference pipeline invokes Llama 3.3 on Groq LPUs for rapid, deterministic summarization and thematic grouping.',
        'Relational Archival: Normalized PostgreSQL schemas maintain subscriber state, edition histories, and delivery metrics.',
        'Automated Delivery: Configurable email worker handles template rendering and high-deliverability dispatch via Resend API and SMTP fallback.',
      ],
      verifiableOutcomes: [
        'Deterministic daily morning execution with zero manual intervention required.',
        'Sub-second text synthesis turnaround utilizing Groq LPU inference hardware.',
        'Reliable transactional email routing with complete subscriber opt-out compliance.',
      ],
      architectureNotes:
        'Designed with strict separation between feed crawlers, LLM inference workers, and transactional email dispatchers for linear horizontal scaling.',
    },
  },
  {
    id: 'araknet',
    spotlightIndex: '02',
    title: 'Araknet.tech Business Agent',
    kicker: 'Autonomous Multi-Provider Lead Routing & CRM Studio',
    description:
      'Find local businesses, check their web presence, and draft outreach emails. It queries three map APIs with automatic failover and saves leads in MongoDB.',
    categories: ['Live Web Platforms', 'AI & Agent Workflows'],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'MongoDB Atlas',
      'Google Places API',
      'SerpAPI',
      'OpenStreetMap',
    ],
    featuredMetric: '3-Way API failover · Human-reviewed proposal generation',
    liveUrl: 'https://araknet.tech',
    liveLabel: 'Inspect araknet.tech ↗',
    githubUrl: 'https://github.com/Alihussain121472/araknet-leads',
    pipelineSteps: [
      {
        id: 'ak-1',
        label: 'Parameter Query',
        detail: 'Target city, industry vertical, and search radius parameterized by user',
        tech: 'TypeScript · Next.js',
      },
      {
        id: 'ak-2',
        label: '3-Way Failover Router',
        detail: 'Waterfall dispatcher: Google Places → SerpAPI → OpenStreetMap fallback',
        tech: 'Places · SerpAPI · OSM',
      },
      {
        id: 'ak-3',
        label: 'Lead CRM Enrichment',
        detail: 'Contact extraction, rating scoring, note tracking & MongoDB Atlas storage',
        tech: 'MongoDB Atlas · Mongoose',
      },
      {
        id: 'ak-4',
        label: 'Proposal Studio',
        detail: 'Contextual draft generation requiring human sign-off before client contact',
        tech: 'Template Engine · CSV/JSON Export',
      },
    ],
    caseStudy: {
      problem:
        'Freelancers and agency operators waste substantial hours manually browsing map listings, copying company details, and dealing with provider rate limits or incomplete business profiles.',
      solutionArchitecture:
        'Built a resilient Next.js + TypeScript application featuring an automated 3-way failover search broker (Google Places → SerpAPI → OpenStreetMap). Results are normalized into MongoDB Atlas with tagging, export tools, and an integrated proposal workbench.',
      executionPipeline: [
        'Search Orchestration: User specifies geographic focus and industry category with customized radius constraints.',
        'Resilient Broker: Waterfall routing executes requests against Google Places, gracefully catching quota thresholds to query SerpAPI and OSM.',
        'Data Normalization: Cleansed records are indexed in MongoDB Atlas with verification badges and customizable pipeline stages.',
        'Human-in-the-Loop Studio: Generates structured outreach messages from validated templates, requiring deliberate user review before sending.',
      ],
      verifiableOutcomes: [
        'Zero downtime across search queries through 3-tier provider redundancy.',
        'Exportable lead cohorts in validated CSV and JSON schemas for downstream tooling.',
        'Elimination of hallucinated outreach through mandatory human sign-off.',
      ],
      architectureNotes:
        'The failover router inspects HTTP status codes and error payloads dynamically to switch provider endpoints within 250ms of a quota signal.',
    },
  },
  {
    id: 'my-mentore',
    spotlightIndex: '03',
    title: 'MY Mentore',
    kicker: 'Desktop Personal Study Ecosystem & Contextual AI Tutor',
    description:
      'A Windows desktop app that organizes daily study goals, quizzes, and coding labs in one place. It runs on a local SQLite core with an inline Gemini tutor.',
    categories: ['Desktop Apps', 'AI & Agent Workflows'],
    stack: [
      'Electron',
      'React',
      'Vite',
      'TypeScript',
      'Express',
      'SQLite',
      'Gemini API',
    ],
    featuredMetric: 'Local-first SQLite core · Context-aware Socratic tutor',
    liveUrl: 'mailto:syedali6160@gmail.com?subject=MY%20Mentore%20Desktop%20Demo%20Request',
    liveLabel: 'Request Windows Demo ↗',
    pipelineSteps: [
      {
        id: 'mm-1',
        label: 'Study Hub Interface',
        detail: 'Unified curriculum timeline, interactive quizzes & step-by-step labs',
        tech: 'Electron · React · Vite',
      },
      {
        id: 'mm-2',
        label: 'Local Express Engine',
        detail: 'Embedded Node.js server managing background tasks and IPC channels',
        tech: 'Express · Node.js IPC',
      },
      {
        id: 'mm-3',
        label: 'SQLite Data Core',
        detail: 'Zero-latency local persistence for flashcards, notes & progress analytics',
        tech: 'SQLite · Better-SQLite3',
      },
      {
        id: 'mm-4',
        label: 'Contextual Gemini Tutor',
        detail: 'Dynamic system prompt ingestion providing tailored explanations & hints',
        tech: 'Google Gemini API',
      },
    ],
    caseStudy: {
      problem:
        'Students navigating intensive technical subjects suffer from context switching between video lectures, code editors, flashcard software, and separate AI chat windows, leading to fragmented learning retention.',
      solutionArchitecture:
        'Created a self-contained Windows desktop application with Electron, React, and an embedded Express server. Learner data is stored securely in a local SQLite file, while the Google Gemini API is bound directly to the active lesson context for inline assistance.',
      executionPipeline: [
        'Curriculum Setup: Learners outline weekly goals, syllabus checkpoints, and daily time budgets.',
        'Offline-First Persistence: Local SQLite database tracks study sessions, quiz accuracy, and notes with zero cloud dependence.',
        'Contextual Assistance: Gemini API helper receives the current lesson topic, question attempt history, and student code snippet to deliver Socratic guidance.',
        'Adaptive Mastery: Local scoring algorithm tracks weak conceptual areas and surfaces targeted review exercises automatically.',
      ],
      verifiableOutcomes: [
        'Full offline availability for curriculum navigation and note taking.',
        'Zero manual copy-pasting required to give the AI mentor lesson context.',
        'Distraction-free standalone application environment on Windows.',
      ],
      architectureNotes:
        'Built with an isolated Electron IPC bridge to prevent untrusted renderers from accessing the file system or executing raw database queries.',
    },
  },
] as const;

export const RESEARCH_PAPERS: readonly ResearchPaper[] = [
  {
    id: 'ijict-brute-force',
    title: 'Detection of Brute-force Login Attempts Using Machine Learning',
    authors:
      'Zaigham Abbas · Syed Ali Hussain · Basheer Ahmad · Muhammad Usman · Mushaf Ali · Fatima Zahra Ouariach · Soufiane Ouariach',
    venue:
      'Iraqi Journal of Information and Communication Technology (IJICT), Vol. 9, No. 1, pp. 44–56 (2026)',
    status: 'Published',
    doi: '10.31987/ijict.9.1.371' as DoiIdentifier,
    metricHighlight: '97.24% SVM Accuracy · Open Access (CC BY 4.0)',
    pdfUrl:
      '/assets/papers/Detection-of-Brute-Force-Login-Attempts-Using-Machine-Learning.pdf',
    abstract:
      'We tested SVM and Naive Bayes models to detect brute-force login attacks in system logs. SVM achieved 97.24% accuracy on raw data and 96.55% with PCA. PCA also helped Naive Bayes improve from 87.93% to 91.03% accuracy.',
    keyFindings: [
      'SVM achieved 97.24% detection accuracy on raw authentication telemetry.',
      'Principal Component Analysis reduced feature dimensionality while preserving 96.55% SVM precision.',
      'Gaussian Naïve Bayes demonstrated a 3.10% accuracy boost (87.93% → 91.03%) following PCA variance alignment.',
    ],
    citations: {
      apa: 'Abbas, Z., Hussain, S. A., Ahmad, B., Usman, M., Ali, M., Ouariach, F. Z., & Ouariach, S. (2026). Detection of Brute-force Login Attempts Using Machine Learning. Iraqi Journal of Information and Communication Technology, 9(1), 44–56. https://doi.org/10.31987/ijict.9.1.371',
      ieee: 'Z. Abbas, S. A. Hussain, B. Ahmad, M. Usman, M. Ali, F. Z. Ouariach, and S. Ouariach, "Detection of Brute-force Login Attempts Using Machine Learning," Iraqi Journal of Information and Communication Technology, vol. 9, no. 1, pp. 44–56, Apr. 2026, doi: 10.31987/ijict.9.1.371.',
      bibtex: `@article{abbas2026detection,
  author = {Abbas, Zaigham and Hussain, Syed Ali and Ahmad, Basheer and Usman, Muhammad and Ali, Mushaf and Ouariach, Fatima Zahra and Ouariach, Soufiane},
  title = {Detection of Brute-force Login Attempts Using Machine Learning},
  journal = {Iraqi Journal of Information and Communication Technology},
  volume = {9},
  number = {1},
  pages = {44--56},
  year = {2026},
  doi = {10.31987/ijict.9.1.371},
  url = {https://doi.org/10.31987/ijict.9.1.371}
}`,
    },
  },
  {
    id: 'swarm-pid-tracker',
    title:
      'Swarm Intelligence Tuning of PID Position Controllers for a Dual-Axis Solar Tracker: A Statistical Comparison of Particle Swarm Optimization, the Firefly Algorithm and Cuckoo Search',
    authors:
      'Tauqeer Ahmad · Zaigham Abbas · Muhammad Zeeshan · Syed Ali Hussain',
    venue:
      'Collaborative Research with Azerbaijan University of Architecture and Construction (Peer-Review Pipeline)',
    status: 'Upcoming',
    metricHighlight: 'Manuscript Completed · Peer-Review Pipeline',
    pdfUrl:
      '/assets/papers/Swarm-Intelligence-tuning-of-PID-Position-Controllers-for-a-dual-axis-Solar-tracker.pdf',
    abstract:
      'We test three swarm methods (PSO, Firefly, and Cuckoo Search) to tune solar panel motors. The paper measures tracking speed and power output during daylight shifts.',
    keyFindings: [
      'Compared three swarm methods to improve motor tracking on solar panels.',
      'Significant reduction in PID steady-state tracking error and settling overshoot.',
      'Complete pre-print manuscript prepared and submitted to international peer-reviewed journal.',
    ],
    citations: {
      apa: 'Ahmad, T., Abbas, Z., Zeeshan, M., & Hussain, S. A. (2026). Swarm Intelligence Tuning of PID Position Controllers for a Dual-Axis Solar Tracker: A Statistical Comparison of Particle Swarm Optimization, the Firefly Algorithm and Cuckoo Search. Azerbaijan University of Architecture and Construction (Manuscript under review).',
      ieee: 'T. Ahmad, Z. Abbas, M. Zeeshan, and S. A. Hussain, "Swarm Intelligence Tuning of PID Position Controllers for a Dual-Axis Solar Tracker: A Statistical Comparison of Particle Swarm Optimization, the Firefly Algorithm and Cuckoo Search," Manuscript submitted for publication, 2026.',
      bibtex: `@article{ahmad2026swarm,
  author = {Ahmad, Tauqeer and Abbas, Zaigham and Zeeshan, Muhammad and Hussain, Syed Ali},
  title = {Swarm Intelligence Tuning of PID Position Controllers for a Dual-Axis Solar Tracker: A Statistical Comparison of Particle Swarm Optimization, the Firefly Algorithm and Cuckoo Search},
  journal = {Azerbaijan University of Architecture and Construction Collaboration},
  year = {2026},
  note = {Manuscript under peer review}
}`,
    },
  },
] as const;

export const CREDENTIALS: readonly CredentialItem[] = [
  {
    id: 'cert-1',
    title: 'Research Intern Offer Letter',
    issuer: 'AI-Explain You Science (AIEYS)',
    issueDate: '15 Oct 2026',
    category: 'Research & Conferences',
    previewUrl: '/assets/images/certificates/aieys-research-intern-offer-letter.jpg',
    credentialId: 'Ref: AIEYS-ADMIN-1001',
    skills: ['Applied ML Research', 'AI Scientific Communication', 'Peer Review Assistance'],
  },
  {
    id: 'cert-2',
    title: 'SZABIST — IJICT ML Research Publication',
    issuer: 'Iraqi Journal of ICT & SZABIST',
    issueDate: 'Apr 2026',
    category: 'Research & Conferences',
    previewUrl: '/assets/images/certificates/szabist-ijict-ml-research-publication.jpg',
    credentialId: 'DOI: 10.31987/ijict.9.1.371',
    skills: ['Supervised Learning', 'SVM', 'PCA', 'Cybersecurity Telemetry'],
  },
  {
    id: 'cert-3',
    title: 'AI Conference Participation Certificate, Germany',
    issuer: 'AIEYS & European Scientific Forum',
    issueDate: 'Sep 2026',
    category: 'Research & Conferences',
    previewUrl: '/assets/images/certificates/Certificate of AI Confrence in Germany .jpeg',
    skills: ['International Research', 'Generative AI Systems', 'Scientific Poster'],
  },
  {
    id: 'cert-4',
    title: 'Harvard CS50P: Intro to Programming with Python',
    issuer: 'Harvard University (David J. Malan)',
    issueDate: 'Aug 2026',
    category: 'AI & Computer Science',
    previewUrl: '/assets/images/certificates/harvard-cs50-python.svg',
    skills: ['Object-Oriented Python', 'Unit Testing', 'Algorithmic Complexity', 'File I/O'],
  },
  {
    id: 'cert-5',
    title: 'Google / Coursera Crash Course on Python',
    issuer: 'Google',
    issueDate: 'Nov 2025',
    category: 'AI & Computer Science',
    previewUrl: '/assets/images/certificates/google-python-crash-course.jpg',
    skills: ['Python Data Structures', 'Automation Scripting', 'Software Modularity'],
  },
  {
    id: 'cert-6',
    title: 'Cisco Introduction to Modern AI',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Jan 2026',
    category: 'AI & Computer Science',
    previewUrl: '/assets/images/certificates/cisco-modern-ai.jpg',
    skills: ['Neural Networks', 'Machine Learning Foundations', 'AI Ethics'],
  },
  {
    id: 'cert-7',
    title: 'AIEYS AI-Enhanced Teaching Certificate',
    issuer: 'AI-Explain You Science (AIEYS)',
    issueDate: 'Apr 2026',
    category: 'AI & Computer Science',
    previewUrl: '/assets/images/certificates/aieys-ai-teaching.jpg',
    skills: ['AI Curriculum Development', 'Interactive Instruction', 'Student Mentoring'],
  },
  {
    id: 'cert-8',
    title: 'Google / Coursera Technical Support Fundamentals',
    issuer: 'Google',
    issueDate: 'Nov 2025',
    category: 'Systems & Web',
    previewUrl: '/assets/images/certificates/google-technical-support-fundamentals.jpg',
    skills: ['TCP/IP Networking', 'Linux CLI', 'System Troubleshooting', 'Security Fundamentals'],
  },
  {
    id: 'cert-9',
    title: 'AIEYS Web Developer Internship Certificate',
    issuer: 'AI-Explain You Science (AIEYS)',
    issueDate: 'Apr 2026',
    category: 'Systems & Web',
    previewUrl: '/assets/images/certificates/aieys-web-developer-internship.jpg',
    skills: ['Frontend Architecture', 'Responsive Design', 'API Integration', 'Version Control'],
  },
] as const;

export const TECHNICAL_EXPERTISE = [
  {
    category: 'AI & Large Language Models',
    description: 'Direct model orchestration, structured schema outputs, and multi-agent reasoning.',
    skills: [
      'Llama 3.3 70B',
      'Claude 3.5 Sonnet',
      'Google Gemini Pro',
      'Groq LPU Inference',
      'Prompt Architecture',
      'Function Calling',
      'Agentic Workflows',
    ],
  },
  {
    category: 'Automation & Agent Pipelines',
    description: 'Resilient cron jobs, webhook routing engines, and multi-provider failover routers.',
    skills: [
      'APScheduler',
      'n8n Orchestration',
      'Web Scraping & Parsing',
      'Webhook Architecture',
      'SerpAPI Integration',
      'Google Places API',
      'OpenStreetMap Overpass',
    ],
  },
  {
    category: 'Full-Stack Architecture & Backend',
    description: 'High-performance web backends, typed serverless handlers, and relational/document databases.',
    skills: [
      'Next.js 15 (App Router)',
      'TypeScript (Strict)',
      'React 19',
      'Python',
      'Flask',
      'Node.js & Express',
      'PostgreSQL',
      'MongoDB Atlas',
      'SQLite',
    ],
  },
  {
    category: 'Machine Learning & Applied Math',
    description: 'Supervised classification, dimensionality reduction, and metaheuristic optimization.',
    skills: [
      'Support Vector Machines (SVM)',
      'Gaussian Naïve Bayes (GNB)',
      'Principal Component Analysis (PCA)',
      'Scikit-Learn',
      'Particle Swarm Optimization (PSO)',
      'Firefly Algorithm',
      'Cuckoo Search',
    ],
  },
] as const;

export const EDUCATION = {
  institution: 'SZABIST University, Islamabad',
  degree: 'Bachelor of Science in Artificial Intelligence (BSc AI)',
  period: '2025 – 2029 (Expected)',
  status: 'In Progress',
  focus:
    'Coursework covers AI, neural networks, data structures, and math.',
} as const;

export const EXPERIENCE = [
  {
    role: 'Research & AI Intern',
    organization: 'AI-Explain You Science (AIEYS)',
    period: 'Oct 2026 – Present (1 Year Fellowship)',
    location: 'Remote / Hybrid',
    description:
      'Working with Founder Prof. Dr. Inam Ullah Khan on machine learning research, paper reviews, and AI training programs.',
  },
  {
    role: 'Web Developer Intern',
    organization: 'AI-Explain You Science (AIEYS)',
    period: 'Jan 2026 – Apr 2026',
    location: 'Islamabad, Pakistan',
    description:
      'Engineered accessible responsive components, streamlined web communication assets, and integrated scientific publication catalogs for research dissemination.',
  },
] as const;
