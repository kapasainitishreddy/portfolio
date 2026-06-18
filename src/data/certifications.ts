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
    title: "Google IT Support Professional Certificate",
    issuer: "Google",
    credential: "Professional Certificate",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
  },
  {
    title: "Forward Deployed Engineer",
    issuer: "Educative",
    credential: "Specialized Track",
    url: "https://www.educative.io",
  },
];
