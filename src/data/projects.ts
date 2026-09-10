export type ProjectTag =
  | "AI"
  | "Governance"
  | "Deployment"
  | "Integration"
  | "Data"
  | "Product"
  | "Platform"
  | "Privacy";

export type InkPattern =
  | "network"
  | "waves"
  | "streams"
  | "typography"
  | "ledger"
  | "graph"
  | "default";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectOutcome {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  comingSoon?: boolean;
  tags: ProjectTag[];
  inkPattern: InkPattern;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  technologies: string[];
  image?: string;
  links?: ProjectLink[];
  note?: string;
  jobTitle?: string;
  jobPeriod?: string;
  outcomes?: ProjectOutcome[];
  shipped?: string[];
  controls?: string[];
}

/**
 * Named product/project data is intentionally not published in the current
 * portfolio. Active product work is described through anonymized capability
 * and case-study surfaces while it is being developed and scaled.
 */
export const projects: Project[] = [];
