/**
 * Skill groups rendered as an interactive network graph.
 * Each group is a major node; each child is a connected capability.
 * Edit freely. Order roughly controls layout around the central hub.
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
    label: "Artificial Intelligence",
    blurb:
      "Designing and evaluating systems built on generative models, agents and retrieval, with attention to quality, safety and local-first privacy.",
    skills: [
      "Generative AI",
      "Large language models",
      "AI agents",
      "Prompt engineering",
      "Model evaluation",
      "Retrieval-augmented generation",
      "Natural language processing",
      "Speech and translation systems",
      "AI workflow automation",
      "Local and privacy-focused AI",
    ],
  },
  {
    id: "data",
    label: "Data Science",
    blurb:
      "Turning raw data into decisions through analysis, modeling, visualization and reliable, automated pipelines.",
    skills: [
      "Python",
      "SQL",
      "Data analysis",
      "Machine learning",
      "Predictive modeling",
      "Data visualization",
      "Statistical analysis",
      "Experimentation",
      "Reporting automation",
      "Data pipelines",
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    blurb:
      "Researching decentralized systems and reading on-chain activity to understand tokens, transactions, trust and identity.",
    skills: [
      "Blockchain fundamentals",
      "Smart-contract concepts",
      "Decentralized applications",
      "On-chain data analysis",
      "Token and transaction analytics",
      "Web3 product research",
      "Decentralized identity concepts",
      "Trust and verification systems",
    ],
  },
  {
    id: "networks",
    label: "Network Analysis",
    blurb:
      "Modeling relationships as graphs to surface communities, influence, anomalies and the hidden structure of complex systems.",
    skills: [
      "Graph theory",
      "Social network analysis",
      "Knowledge graphs",
      "Entity relationships",
      "Community detection",
      "Centrality analysis",
      "Influence mapping",
      "Fraud and anomaly networks",
      "Network visualization",
      "Graph-based intelligence",
    ],
  },
];
