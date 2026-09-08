export type SystemStep = {
  kind: "Signal" | "Rules" | "AI" | "Human" | "System";
  title: string;
  body: string;
};

export type FlagshipCaseStudy = {
  id: string;
  short: string;
  domain: string;
  title: string;
  oneLiner: string;
  problem: string;
  discovery: string;
  systemAnatomy: SystemStep[];
  controls: string[];
  proof: string[];
  whyNotEverything: string;
  stack: string[];
};

export const flagshipCaseStudies: FlagshipCaseStudy[] = [
  {
    id: "support-copilot",
    short: "Support Copilot",
    domain: "Support + CX",
    title: "From impressive chatbot demo to support system people could trust",
    oneLiner: "Ground the answer, show the evidence, escalate the ambiguity.",
    problem:
      "A seed-stage team had a promising LLM support prototype, but it was disconnected from the real knowledge base, ticket flow, and approval process. Agents still handled repetitive work manually, while a confident hallucination could become a customer-facing mistake.",
    discovery:
      "The hard boundary was not model quality. It was deciding what could be answered from approved evidence, what needed account context, and what should stop for a person.",
    systemAnatomy: [
      { kind: "Signal", title: "Incoming ticket", body: "Classify the request and collect the customer context already available in the support system." },
      { kind: "Rules", title: "Evidence gate", body: "Search only approved help content and reject unsupported paths before generation." },
      { kind: "AI", title: "Grounded draft", body: "Generate a concise answer from retrieved evidence and attach citations for review." },
      { kind: "Human", title: "Approval or escalation", body: "Edge cases and customer-facing sends stay reviewable instead of silently autonomous." },
      { kind: "System", title: "Evaluation trail", body: "Log retrieval, answer, decision, and outcome so quality can be measured over time." },
    ],
    controls: ["Approved-source retrieval", "Human approval", "Unsupported-question fallback", "Interaction logging", "Prompt and source versioning"],
    proof: ["~60% faster first response on covered ticket types", "~45% of routine tickets resolved with copilot-drafted answers", "Prototype to production in under 4 weeks"],
    whyNotEverything:
      "Because customer support contains policy, account state, exceptions, and emotion. The model was good at drafting from evidence. It was not allowed to invent evidence, change policy, or decide when an unusual customer situation was safe to automate.",
    stack: ["Python", "RAG", "PostgreSQL", "LLM orchestration", "Ticketing API", "Next.js"],
  },
  {
    id: "ops-pipeline",
    short: "Ops Pipeline",
    domain: "Operations + Data",
    title: "Replace the Monday spreadsheet ritual with a system that updates itself",
    oneLiner: "Automate the plumbing first. Add AI only where unstructured context earns it.",
    problem:
      "A founding team spent hours every week pulling numbers from four disconnected tools into a spreadsheet. Reports were late, fragile, and stale by the time someone opened them.",
    discovery:
      "The biggest value came from boring reliability: source contracts, reconciliation rules, failure alerts, and a shared definition of the metrics the team actually used to make decisions.",
    systemAnatomy: [
      { kind: "Signal", title: "Four live sources", body: "Ingest the operating data on schedule instead of relying on manual exports." },
      { kind: "Rules", title: "Normalize + reconcile", body: "Use explicit deterministic transformations for joins, validation, and business logic." },
      { kind: "AI", title: "Explain exceptions", body: "Use AI only when unstructured notes or context need summarizing, not for core arithmetic." },
      { kind: "System", title: "Live dashboard", body: "Surface current metrics and threshold alerts in one operating view." },
      { kind: "Human", title: "Runbook ownership", body: "Document failure paths and hand the system back to the team so it is not founder-dependent." },
    ],
    controls: ["Schema validation", "Deterministic reconciliation", "Failure alerts", "Idempotent scheduled jobs", "Runbooks"],
    proof: ["~20 analyst-hours/week of manual reporting removed", "Reporting latency moved from weekly to near real-time", "99.5% pipeline uptime across the engagement"],
    whyNotEverything:
      "Because numbers should not become probabilistic just because an LLM is available. The model can help explain messy context. The source-of-truth math, transformations, and alerts stay deterministic and testable.",
    stack: ["Python", "SQL", "PostgreSQL", "Supabase", "Power BI", "Scheduled jobs"],
  },
  {
    id: "onboarding-agent",
    short: "Onboarding Agent",
    domain: "CX + Agent Automation",
    title: "Turn a three-week onboarding scramble into a guided four-day flow",
    oneLiner: "Autonomy where the state is clear. Humans where the exception is not.",
    problem:
      "Customer onboarding depended on email threads, missed setup steps, and a founder manually chasing every account. The process did not scale and slow setup threatened early customer momentum.",
    discovery:
      "Shadowing real onboardings showed a state machine hiding inside the chaos: collect required information, validate it, provision allowed resources, confirm success, and escalate anything that does not fit the expected path.",
    systemAnatomy: [
      { kind: "Signal", title: "Customer state", body: "Know what has been completed, what is missing, and what the next valid step is." },
      { kind: "Rules", title: "Validation layer", body: "Block incomplete or invalid inputs before they can advance the workflow." },
      { kind: "AI", title: "Guidance + context", body: "Explain next steps conversationally and assemble context when an exception needs review." },
      { kind: "System", title: "Provisioning APIs", body: "Trigger only explicitly allowed product setup actions with confirmation and retry handling." },
      { kind: "Human", title: "Exception gate", body: "Anything ambiguous or irreversible stops with the full history prepared for a person." },
    ],
    controls: ["State-machine progression", "Input validation", "Human escalation", "Provisioning confirmation", "Exception rules"],
    proof: ["Onboarding time reduced from ~3 weeks to ~4 days", "Founder freed from ~90% of manual onboarding steps", "Zero irreversible actions without human approval"],
    whyNotEverything:
      "Because onboarding mixes routine steps with customer-specific exceptions. A fully autonomous agent would hide uncertainty. The better system makes uncertainty explicit, then hands the unusual case to someone with all the context already assembled.",
    stack: ["LLM agents", "Python", "REST APIs", "Webhooks", "Next.js", "State management"],
  },
  {
    id: "research-swarm",
    short: "Research Swarm",
    domain: "Multi-Agent Research",
    title: "Split research by responsibility so every conclusion has somewhere to point",
    oneLiner: "More agents is not the feature. Inspectable responsibility is.",
    problem:
      "A single long model call became difficult to trust when research required planning, retrieval, comparison, contradiction checks, and synthesis across multiple sources.",
    discovery:
      "The useful decomposition was by responsibility, not personality. Planning, evidence gathering, verification, and synthesis each needed a clear input, output, budget, and stop condition.",
    systemAnatomy: [
      { kind: "AI", title: "Planner", body: "Break the question into evidence-seeking tasks with explicit completion criteria." },
      { kind: "System", title: "Specialist tools", body: "Give workers narrow access to retrieval, search, code, or internal data instead of one giant tool box." },
      { kind: "AI", title: "Evidence workers", body: "Gather claims and source material in structured outputs rather than prose blobs." },
      { kind: "Rules", title: "Verifier pass", body: "Require support, flag contradictions, and stop when evidence is insufficient." },
      { kind: "Human", title: "Inspectable brief", body: "Return the cited synthesis with the trace available for review instead of hiding the process." },
    ],
    controls: ["Role-scoped tools", "Step budgets", "Evidence requirements", "Verifier gate", "Trace logging", "Timeout handling"],
    proof: ["Every conclusion maps back to gathered evidence", "Failures localize to a stage instead of one opaque answer", "Workflow can stop when evidence is insufficient"],
    whyNotEverything:
      "Because adding agents can multiply noise just as easily as capability. Planning, verification, and stopping rules matter more than agent count. The system should be able to say 'not enough evidence' without being punished for honesty.",
    stack: ["Python", "LangGraph-style orchestration", "Tool calling", "Vector retrieval", "Structured outputs", "Evaluation harness"],
  },
  {
    id: "governance-stack",
    short: "Governance Stack",
    domain: "AI Safety + Governance",
    title: "Make the AI system explainable to the team that has to own the risk",
    oneLiner: "Governance is not a PDF after launch. It is instrumentation inside the product loop.",
    problem:
      "Fast-moving teams can ship an AI feature before they have a reliable inventory of use cases, risk ownership, evaluation status, approvals, or a trace of what changed when behavior drifts.",
    discovery:
      "Governance becomes useful when it attaches to operating events: a new use case, a model or prompt change, a failed evaluation, a human approval, a privacy concern, or a production incident.",
    systemAnatomy: [
      { kind: "Signal", title: "Use-case registry", body: "Record purpose, data, owner, model, deployment state, and review cadence before the system becomes invisible infrastructure." },
      { kind: "Rules", title: "Risk tiering", body: "Apply explicit governance criteria and review requirements instead of asking a model to decide whether it is risky." },
      { kind: "AI", title: "Evaluation support", body: "Use models to help classify behavior, summarize traces, or surface anomalies while retaining inspectable evidence." },
      { kind: "Human", title: "Approval points", body: "High-risk changes and exceptions stay attributable to named human decisions." },
      { kind: "System", title: "Audit trail", body: "Keep evaluations, changes, approvals, and incidents linked so accountability is reconstructable later." },
    ],
    controls: ["Risk tiering", "Evaluation gates", "Human approvals", "Audit trail", "Review cadence", "Privacy checks"],
    proof: ["Designed around NIST AI RMF / EU AI Act-style risk categories", "Evaluation and approval state is inspectable", "Changes can be traced to evidence and ownership rather than memory"],
    whyNotEverything:
      "Because the model is one of the things being governed. It can assist with review, but it should not be the final authority on its own risk, permissions, or compliance posture.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Evaluation harness", "Risk rules", "Audit logging"],
  },
];

export const flagshipNote =
  "Client names are withheld where required. Numeric outcomes appear only where they are already measured and supported in the portfolio. The point is not the number of AI calls. It is the system design around them.";
