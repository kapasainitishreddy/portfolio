/**
 * Skill groups rendered as an interactive network graph.
 */

export type SkillGroupId = "ai" | "data" | "blockchain" | "networks";

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  blurb: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Governance Communication",
    blurb:
      "Using AI tools responsibly to research, summarize, edit, and communicate complex technical and policy-oriented material with human review.",
    skills: [
      "Responsible generative AI",
      "AI governance communication",
      "Prompt engineering",
      "Research summarization",
      "Content evaluation",
      "Factual verification",
      "Audience adaptation",
      "AI safety interest",
      "Human-in-the-loop review",
      "Technical translation",
    ],
  },
  {
    id: "data",
    label: "Analytics & Reporting",
    blurb:
      "Turning engagement, workflow, and operational data into dashboards, performance reports, recommendations, and clear decision support.",
    skills: [
      "Power BI",
      "Excel",
      "Google Analytics concepts",
      "Performance reporting",
      "Engagement metrics",
      "Data visualization",
      "Python",
      "SQL",
      "Reporting automation",
      "Insight development",
    ],
  },
  {
    id: "blockchain",
    label: "Digital Publishing",
    blurb:
      "Producing accurate, accessible content across websites, newsletters, reports, presentations, social media, and branded materials.",
    skills: [
      "WordPress",
      "Mailchimp",
      "Canva",
      "Digital publishing",
      "Newsletter production",
      "Social media content",
      "Report formatting",
      "Presentation design",
      "Proofreading and editing",
      "Brand consistency",
    ],
  },
  {
    id: "networks",
    label: "Communications Operations",
    blurb:
      "Coordinating people, content, timelines, approvals, and assets across concurrent projects in remote and cross-functional environments.",
    skills: [
      "Publication workflows",
      "Content calendars",
      "Campaign coordination",
      "Stakeholder follow-up",
      "Editorial review",
      "Deadline management",
      "Version control",
      "Event communications",
      "Remote collaboration",
      "Document production",
    ],
  },
];
