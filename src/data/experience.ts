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
    title: "Business Data Analyst",
    org: "Augmentare Inc. | Aug 2024 - Present",
    focus: [
      "Translate technical and operational findings into concise reports, executive presentations, dashboards, one-pagers, and stakeholder updates",
      "Coordinate timelines, source materials, review cycles, approvals, and handoffs across business and technical teams",
      "Create polished visual assets and presentations using Canva, PowerPoint, Excel, and Power BI",
      "Build recurring performance reports and recommend workflow improvements that increased reporting efficiency by 28%",
      "Use AI-enabled tools responsibly for research summarization, drafting, content refinement, and quality review",
    ],
  },
  {
    title: "Data Analyst",
    org: "VN Technologies | Jun 2020 - Jan 2023",
    focus: [
      "Produced client-ready reports, research summaries, presentations, process documentation, and internal communications",
      "Partnered with cross-functional stakeholders to gather content, resolve inconsistencies, and manage revisions",
      "Built recurring dashboards and surfaced trends that reduced analysis turnaround by 30%",
      "Standardized templates, organized source files, proofread deliverables, and maintained version control",
      "Prepared briefing notes, milestone updates, meeting materials, and post-project summaries for distributed teams",
    ],
  },
  {
    title: "AI Model Trainer",
    org: "Outlier AI | Freelance",
    focus: [
      "Evaluate and edit AI-generated content for factual accuracy, clarity, tone, safety, and audience usefulness",
      "Reviewed more than 1,800 outputs across reasoning, instruction following, and written communication tasks",
      "Documented 30+ recurring quality issues and translated findings into structured feedback",
      "Applied editorial judgment to improve concise, accurate, and audience-appropriate responses",
      "Supported responsible human review of AI-assisted communication workflows",
    ],
  },
  {
    title: "Lead Analyst",
    org: "Legitified | Freelance",
    focus: [
      "Transform market and research data into structured recommendations and decision-ready communications",
      "Develop persuasive narratives, presentations, summaries, and stakeholder-facing materials",
      "Synthesize competitor, audience, and opportunity research into clear strategic insights",
      "Organize complex source material into consistent and reusable communication formats",
      "Balance analytical depth with concise writing for non-technical audiences",
    ],
  },
];
