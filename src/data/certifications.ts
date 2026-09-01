/**
 * Professional certifications and credentials.
 */

export interface Certification {
  title: string;
  issuer: string;
  credential: string;
  url?: string;
  date?: string;
}

export const certifications: Certification[] = [
  {
    title: "Forward Deployed Engineer",
    issuer: "Educative",
    credential: "Certified · Specialized Track",
    url: "https://www.educative.io",
  },
  {
    title: "AI Governance",
    issuer: "In progress",
    credential: "Responsible AI & AI Governance · Currently training",
    date: "Expected 2026",
  },
  {
    title: "Google IT Support Professional Certificate",
    issuer: "Google",
    credential: "Professional Certificate",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
  },
];
