// Strict TypeScript interfaces for portfolio data, case-study projects, research, articles, and certifications.

export interface SocialLinks {
  github: string;
  linkedin: string;
  x: string;
  scholar: string;
  orcid: string;
  email: string;
}

export interface Profile {
  name: string;
  roles: string[];
  roleLine: string;
  valueStatement: string;
  intro: string;
  introLines: [string, string];
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  location: string;
  availability: string;
  cvUrl: string;
  site: string;
  avatar: string;
  socials: SocialLinks;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  problem: string;
  role: string;
  stack: string[];
  howItWorks: [string, string, string];
  results: string;
  previewImage: string;
  previewAlt: string;
  architectureNodes: [string, string, string];
  link?: string;
  linkLabel?: string;
  status?: string;
  tags: string[];
  metrics?: string;
}

export interface PublishedPaper {
  title: string;
  authors: string[];
  venue: string;
  datePublished: string;
  doi: string;
  url: string;
  pdfUrl: string;
  certificateUrl: string;
}

export interface ResearchInternship {
  role: string;
  org: string;
  period: string;
  summary: string;
  previewUrl: string;
}

export interface PreprintManuscript {
  title: string;
  label: string;
  status: string;
  coAuthors: string;
  pdfUrl: string;
}

export interface ResearchData {
  published: PublishedPaper;
  internship: ResearchInternship;
  preprint: PreprintManuscript;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  summary: string;
}

export interface EducationData {
  degree: string;
  school: string;
  period: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  sortDate: string;
  defaultVisible: boolean;
  previewUrl: string;
  secondaryPreviewUrl?: string;
  verifyUrl?: string;
  skills: string[];
}

export interface UsesCategory {
  category: string;
  items: { name: string; detail: string }[];
}

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface ArticleItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: ArticleSection[];
  externalLink?: { label: string; url: string };
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactActionState {
  success: boolean;
  message: string;
}
