export type CrossFunctionalDomain = {
  id: string;
  label: string;
  title: string;
  body: string;
  aiEdge: string;
  proof: string;
};

export const crossFunctionalIntro = {
  eyebrow: "Cross-functional by practice",
  heading: "AI did not make me one job better. It made me useful in more rooms.",
  body:
    "I have worked across HR and recruiting, customer support and CX, operations and data, engineering and integrations, and AI safety and governance. The title changed. The habit did not: understand the workflow, find the expensive friction, and build the thing that removes it.",
  closer:
    "That range matters in forward deployed work because real customer problems rarely respect org charts.",
} as const;

export const crossFunctionalDomains: CrossFunctionalDomain[] = [
  {
    id: "people",
    label: "01 / People",
    title: "HR + recruiting",
    body:
      "Candidate tracking, hiring rounds, reviewer follow-up, communications, sourcing, templates, and the operational details that decide whether a hiring process feels sharp or chaotic.",
    aiEdge:
      "AI helped me turn repetitive coordination into structured workflows while keeping decisions and judgment with people.",
    proof: "Hiring operations, applicant tracking, reviewer coordination, outreach systems",
  },
  {
    id: "customer",
    label: "02 / Customer",
    title: "Support + CX",
    body:
      "Support taught me that the technically correct answer can still be the wrong customer experience. Context, escalation, tone, timing, and evidence all matter.",
    aiEdge:
      "That became the foundation for grounded support copilots, human escalation paths, and customer-facing AI that knows when not to answer.",
    proof: "Support workflows, CX thinking, grounded AI answers, escalation design",
  },
  {
    id: "operations",
    label: "03 / Systems",
    title: "Operations + data",
    body:
      "I have worked where the real product is often a spreadsheet, an inbox, four disconnected tools, and a person remembering what happens next.",
    aiEdge:
      "AI is useful there only after the workflow is mapped. I pair it with normal code, data pipelines, rules, APIs, and measurable operating signals.",
    proof: "Automation, data pipelines, dashboards, workflow mapping, analytics",
  },
  {
    id: "engineering",
    label: "04 / Build",
    title: "Engineering + integrations",
    body:
      "I like the last mile: auth, APIs, permissions, retries, state, observability, and the awkward edge case that turns a demo into a production system.",
    aiEdge:
      "AI accelerated how quickly I could move from unfamiliar domain to working implementation, but integration discipline is what makes the result survive.",
    proof: "Python, TypeScript, APIs, agents, RAG, data systems, production delivery",
  },
  {
    id: "governance",
    label: "05 / Trust",
    title: "AI safety + governance",
    body:
      "Shipping AI creates a second job: proving it still behaves, knowing who can change it, and making failure visible before a customer or auditor finds it first.",
    aiEdge:
      "I work with evaluations, guardrails, human review, auditability, privacy checks, and governance patterns, and I teach undergraduate sessions on jailbreaks, AI safety, and AI governance.",
    proof: "Evals, guardrails, human oversight, audit trails, governance education",
  },
];
