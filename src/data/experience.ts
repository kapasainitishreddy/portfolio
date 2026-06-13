/**
 * Experience timeline. Edit roles and focus areas here.
 * No metrics, dates, awards or achievements are invented; keep it that way.
 */

export interface Role {
  title: string;
  org: string;
  focus: string[];
}

export const experience: Role[] = [
  {
    title: "Business Data Analyst",
    org: "Augmentare Inc.",
    focus: [
      "Business and operational data analysis",
      "Reporting and dashboard development",
      "Workflow improvement",
      "Data-driven decision support",
      "Cross-functional problem solving",
    ],
  },
  {
    title: "AI Model Trainer",
    org: "Outlier AI, Freelance",
    focus: [
      "AI response evaluation",
      "Prompt analysis",
      "Model quality assessment",
      "Reasoning and instruction-following review",
      "Human feedback for AI systems",
    ],
  },
  {
    title: "Market Research Analyst",
    org: "Legitified, Freelance",
    focus: [
      "Market intelligence",
      "Competitor research",
      "Opportunity analysis",
      "Data synthesis",
      "Strategic reporting",
    ],
  },
  {
    title: "GTM Analyst",
    org: "WFO Startup",
    focus: [
      "Go-to-market analysis",
      "Process improvement",
      "Market segmentation",
      "Growth research",
      "Operational analytics",
    ],
  },
  {
    title: "Student Employee",
    org: "Campus Dining, University at Buffalo",
    focus: [
      "Operational support",
      "Team coordination",
      "Customer service",
      "High-volume workflow management",
      "Process reliability",
    ],
  },
];
