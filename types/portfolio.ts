// ==============================================================================
// SYED ALI HUSSAIN PORTFOLIO — STRICT TYPESCRIPT DOMAIN ARCHITECTURE
// High-Contrast, Typography-First Next.js 15 Application
// ==============================================================================

declare const BrandSymbol: unique symbol;

/**
 * Branded Type utility enabling nominal typing on primitives.
 */
export type Brand<T, B extends string> = T & { readonly [BrandSymbol]: B };

/**
 * Validated Branded Types
 */
export type EmailAddress = Brand<string, 'EmailAddress'>;
export type DoiIdentifier = Brand<string, 'DoiIdentifier'>;

/**
 * Template Literal Types for Navigation Anchors and External Links
 */
export type SectionId =
  | 'hero'
  | 'projects'
  | 'research'
  | 'expertise'
  | 'certifications'
  | 'cv'
  | 'contact';

export type SectionAnchor = `#${SectionId}`;
export type HrefPath = SectionAnchor | `/${string}` | `https://${string}` | `mailto:${string}`;

/**
 * Tri-State Theme
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Discriminated Union Result Monad
 */
export type Result<T, E = Error | string> =
  | { readonly success: true; readonly value: T }
  | { readonly success: false; readonly error: E };

export const Ok = <T>(value: T): Result<T, never> => ({
  success: true,
  value,
});

export const Err = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
});

/**
 * Type Predicates
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isValidEmailAddress(value: string): value is EmailAddress {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}

export function isValidDoi(value: string): value is DoiIdentifier {
  return /^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/.test(value.trim());
}

/**
 * Project Taxonomy & Case Study Types
 */
export type ProjectCategory =
  | 'Live Web Platforms'
  | 'AI & Agent Workflows'
  | 'Desktop Apps';

export interface ArchitecturePipelineStep {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly tech: string;
}

export interface ProjectCaseStudy {
  readonly problem: string;
  readonly solutionArchitecture: string;
  readonly executionPipeline: readonly string[];
  readonly verifiableOutcomes: readonly string[];
  readonly architectureNotes: string;
}

export interface Project {
  readonly id: string;
  readonly spotlightIndex: '01' | '02' | '03';
  readonly title: string;
  readonly kicker: string;
  readonly description: string;
  readonly categories: readonly ProjectCategory[];
  readonly stack: readonly string[];
  readonly pipelineSteps: readonly ArchitecturePipelineStep[];
  readonly liveUrl?: string;
  readonly liveLabel?: string;
  readonly githubUrl?: string;
  readonly caseStudy: ProjectCaseStudy;
  readonly featuredMetric: string;
}

/**
 * Hero Metric Strip Item
 */
export interface HeroMetric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

/**
 * Research Paper & Citations
 */
export type CitationFormat = 'apa' | 'ieee' | 'bibtex';

export interface ResearchPaper {
  readonly id: string;
  readonly title: string;
  readonly authors: string;
  readonly venue: string;
  readonly status: 'Published' | 'Upcoming';
  readonly doi?: DoiIdentifier;
  readonly metricHighlight: string;
  readonly pdfUrl: string;
  readonly abstract: string;
  readonly keyFindings: readonly string[];
  readonly citations: {
    readonly apa: string;
    readonly ieee: string;
    readonly bibtex: string;
  };
}

/**
 * Certification & Credentials
 */
export type CredentialCategory =
  | 'Research & Conferences'
  | 'AI & Computer Science'
  | 'Systems & Web';

export interface CredentialItem {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly issueDate: string;
  readonly category: CredentialCategory;
  readonly previewUrl: string;
  readonly credentialId?: string;
  readonly skills: readonly string[];
}

/**
 * Contact Inquiry Record
 */
export interface ContactInquiry {
  readonly id: string;
  readonly name: string;
  readonly email: EmailAddress;
  readonly subject: string;
  readonly message: string;
  readonly createdAt: string;
}

/**
 * LocalStorage & Backup Sync Vault
 */
export interface PortfolioBackupVault {
  readonly version: '2.0';
  readonly exportedAt: string;
  readonly theme: ThemeMode;
  readonly bookmarkedProjectIds: readonly string[];
  readonly evaluationNotes: Record<string, string>;
  readonly inquiries: readonly ContactInquiry[];
}

/**
 * Backup Validator using Type Predicates
 */
export function parseAndValidateBackup(raw: unknown): Result<PortfolioBackupVault, string> {
  if (!isRecord(raw)) {
    return Err('Invalid backup payload: root must be a JSON object.');
  }

  if (raw.version !== '2.0') {
    return Err('Invalid or unsupported backup format version.');
  }

  const theme = raw.theme;
  if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
    return Err('Invalid theme mode in backup.');
  }

  if (!Array.isArray(raw.bookmarkedProjectIds)) {
    return Err('Invalid bookmarks list in backup.');
  }

  if (!isRecord(raw.evaluationNotes)) {
    return Err('Invalid evaluation notes object.');
  }

  if (!Array.isArray(raw.inquiries)) {
    return Err('Invalid inquiries array.');
  }

  const validatedInquiries: ContactInquiry[] = [];
  for (const item of raw.inquiries) {
    if (!isRecord(item)) {
      return Err('Corrupt inquiry object.');
    }
    if (
      typeof item.id !== 'string' ||
      typeof item.name !== 'string' ||
      typeof item.email !== 'string' ||
      typeof item.subject !== 'string' ||
      typeof item.message !== 'string' ||
      typeof item.createdAt !== 'string'
    ) {
      return Err('Inquiry record has invalid fields.');
    }
    if (!isValidEmailAddress(item.email)) {
      return Err(`Invalid email format in stored inquiry: ${item.email}`);
    }

    validatedInquiries.push({
      id: item.id,
      name: item.name,
      email: item.email,
      subject: item.subject,
      message: item.message,
      createdAt: item.createdAt,
    });
  }

  const vault: PortfolioBackupVault = {
    version: '2.0',
    exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt : new Date().toISOString(),
    theme,
    bookmarkedProjectIds: raw.bookmarkedProjectIds.filter(
      (id): id is string => typeof id === 'string'
    ),
    evaluationNotes: Object.fromEntries(
      Object.entries(raw.evaluationNotes).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string'
      )
    ),
    inquiries: validatedInquiries,
  };

  return Ok(vault);
}
