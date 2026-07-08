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
    label: "AI Engineering & Governance",
    blurb:
      "Building, evaluating, and deploying LLM and agent systems with the guardrails, evaluations, and human oversight that keep them accountable in production.",
    skills: [
      "LLM & agent orchestration",
      "Prompt engineering",
      "RAG pipelines",
      "Model evaluation",
      "Human-in-the-loop review",
      "AI governance frameworks",
      "Monitoring & drift detection",
      "Guardrails & policy checks",
      "Responsible AI",
      "Audit & documentation",
    ],
  },
  {
    id: "data",
    label: "Data & Integration Engineering",
    blurb:
      "Wiring AI systems into real customer environments — data sources, APIs, auth, and internal tools — and turning raw data into dependable pipelines and dashboards.",
    skills: [
      "Python",
      "SQL",
      "API integration",
      "Data pipelines",
      "PostgreSQL",
      "Supabase",
      "Power BI",
      "Dashboarding",
      "Reporting automation",
      "Webhooks & connectors",
    ],
  },
  {
    id: "blockchain",
    label: "Deployment & Delivery",
    blurb:
      "Getting a working slice into production early, then iterating from real usage — shipping, deploying, and operating systems in live conditions.",
    skills: [
      "Next.js",
      "TypeScript",
      "Prototyping",
      "CI/CD basics",
      "Netlify / Vercel",
      "Runbooks",
      "Production debugging",
      "Iterative delivery",
      "Feature slicing",
      "Observability",
    ],
  },
  {
    id: "networks",
    label: "Embedded Collaboration",
    blurb:
      "The forward-deployed muscle: sitting with customers, learning their domain, and turning conversations into shipped software across remote, cross-functional teams.",
    skills: [
      "Customer discovery",
      "Requirements gathering",
      "Stakeholder communication",
      "Technical translation",
      "On-site & remote embedding",
      "Feedback loops",
      "Documentation",
      "Cross-functional coordination",
      "Demos & enablement",
      "Deadline management",
    ],
  },
];
