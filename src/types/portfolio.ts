// Shared strict TypeScript interfaces for portfolio data, MDX content, and contact forms.

export interface SocialLinks {
  github: string;
  linkedin: string;
  x: string;
  scholar: string;
  email: string;
}

export interface Profile {
  name: string;
  roles: string[];
  headline: string;
  bio: string;
  site: string;
  avatar: string;
  socials: SocialLinks;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  link?: string;
  status?: string;
  tags: string[];
  metrics?: string;
}

export interface PublishedPaper {
  title: string;
  venue: string;
  doi: string;
  url: string;
}

export interface ResearchData {
  published: PublishedPaper;
  ongoing: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  start: string;
  term: string;
}

export interface EducationData {
  degree: string;
  school: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: "AI & Computer Science" | "Research & Conferences" | "Systems & Web";
  previewUrl: string;
  credentialId?: string;
  skills: string[];
}

export interface UsesCategory {
  category: string;
  items: { name: string; detail: string }[];
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  status?: string;
  metrics?: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface MdxEntry<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

export interface ContactActionState {
  success: boolean;
  message: string;
}
