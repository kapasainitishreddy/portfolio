export type SkillGroupId = string;

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  blurb: string;
  outcome: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "discover",
    label: "Embed & discover",
    blurb: "Map the real workflow, constraints, systems, users, and success criteria before building the full solution.",
    outcome: "Turns an unclear request into a testable delivery plan.",
    skills: ["Customer discovery", "Requirements mapping", "Workflow design", "Stakeholder communication", "Technical translation", "Rapid prototyping"],
  },
  {
    id: "ai",
    label: "Build AI workflows",
    blurb: "Design LLM and agent workflows that retrieve context, call tools, handle failure, and keep people in control.",
    outcome: "Moves from impressive demo to dependable working loop.",
    skills: ["Python", "FastAPI", "RAG", "Agent orchestration", "Tool calling", "Prompt design", "Model evaluation"],
  },
  {
    id: "integration",
    label: "Integrate data & tools",
    blurb: "Connect AI to the systems a business already uses, including APIs, databases, auth, webhooks, and reporting pipelines.",
    outcome: "Removes manual handoffs and puts output inside the real workflow.",
    skills: ["SQL", "PostgreSQL", "REST APIs", "Webhooks", "Supabase", "Data pipelines", "Power BI", "Automation"],
  },
  {
    id: "governance",
    label: "Evaluate & govern",
    blurb: "Measure quality, surface failure modes, add human approvals, document decisions, and monitor deployed behavior.",
    outcome: "Makes AI behavior reviewable, safer, and easier to operate.",
    skills: ["LLM evaluations", "Human review", "Guardrails", "Monitoring", "Audit logs", "Runbooks", "AI governance", "Root-cause analysis"],
  },
];
