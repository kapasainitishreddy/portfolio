/**
 * Experience timeline aligned with the current resume.
 */

export interface Role {
  title: string;
  org: string;
  focus: string[];
}

export const experience: Role[] = [
  {
    title: "Forward Deployed Engineer (Freelance)",
    org: "Seed-Stage AI Startup · Client confidential | 2024 - Present",
    focus: [
      "Embedded with a small founding team to take their AI product from prototype to production inside real customer environments",
      "Built and integrated LLM-powered workflows against the customer's live data, auth, and internal tools, replacing brittle manual processes",
      "Instrumented evaluations, logging, and human-in-the-loop review so the deployed system stayed accurate, safe, and auditable",
      "Ran weekly feedback loops with end users, shipping iterative improvements and closing the gap between demo and dependable software",
      "Wrote architecture docs, runbooks, and governance controls so the team could operate and extend the system without me",
    ],
  },
  {
    title: "Business Data Analyst",
    org: "Augmentare Inc. | Aug 2024 - Present",
    focus: [
      "Deploy internal data tooling, dashboards, and reporting pipelines that put operational insight directly in front of decision-makers",
      "Integrate data across business and technical systems and translate findings into executive-ready reports and one-pagers",
      "Automate recurring reporting workflows, improving reporting efficiency by 28% and freeing analyst time for higher-value work",
      "Coordinate timelines, source materials, review cycles, and handoffs across cross-functional teams",
      "Apply AI-enabled tooling responsibly for research, drafting, and quality review with human verification in the loop",
    ],
  },
  {
    title: "AI Evaluation & Governance Specialist",
    org: "Outlier AI | Freelance",
    focus: [
      "Evaluated and corrected AI-generated outputs for factual accuracy, safety, reasoning quality, and instruction following",
      "Reviewed 1,800+ model responses and documented 30+ recurring failure modes as structured, actionable feedback",
      "Built the kind of evaluation judgment that underpins responsible AI governance — separating evidence from inference",
      "Supported human-in-the-loop review workflows that keep AI systems accountable and audit-ready",
      "Turned qualitative model behavior into clear, repeatable quality signals for engineering teams",
    ],
  },
  {
    title: "Data Analyst",
    org: "VN Technologies | Jun 2020 - Jan 2023",
    focus: [
      "Built recurring dashboards and data pipelines that reduced analysis turnaround by 30%",
      "Partnered with cross-functional stakeholders to gather requirements, resolve inconsistencies, and manage revisions",
      "Standardized templates, organized source data, and maintained version control across deliverables",
      "Produced client-ready reports, process documentation, and milestone updates for distributed teams",
      "Surfaced trends and recommendations that fed directly into operational decisions",
    ],
  },
];
