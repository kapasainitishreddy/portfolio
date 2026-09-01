export type StartupCaseLevel = "Foundational" | "Workflow" | "Production" | "Regulated" | "Agentic" | "Multi-client" | "Advanced";

export interface StartupCaseStudy {
  id: string;
  level: StartupCaseLevel;
  domain: string;
  title: string;
  clientContext: string;
  problem: string;
  discovery: string;
  build: string;
  controls: string[];
  proof: string[];
  technologies: string[];
}

export const startupCaseStudies: StartupCaseStudy[] = [
  {
    id: "support-chatbot",
    level: "Foundational",
    domain: "Chatbot",
    title: "Support chatbot grounded in a startup knowledge base",
    clientContext: "An early-stage software team needed a first useful AI layer for repetitive support questions without letting a model invent policy or product details.",
    problem: "The team had scattered help content and repeated the same answers manually. A generic chatbot was fast to demo but too risky to put in front of customers because it could answer beyond the approved source material.",
    discovery: "I separated questions that could be answered from approved documentation from questions that required account context, judgment, or a human decision.",
    build: "I built a retrieval-backed chatbot that searched only approved content, returned source context, and routed unsupported questions to a person instead of guessing.",
    controls: ["Approved-source retrieval", "Fallback when evidence is missing", "Human escalation", "Conversation logging", "Prompt and source versioning"],
    proof: ["Working end-to-end support flow", "Answers trace back to approved content", "Unsupported questions have an explicit human path"],
    technologies: ["Python", "RAG", "Vector search", "LLM API", "Web chat UI"],
  },
  {
    id: "ai-workflow-automation",
    level: "Workflow",
    domain: "AI Workflow",
    title: "AI workflow that turns intake into reviewed action",
    clientContext: "A startup team had a repetitive intake process that crossed forms, email, internal notes, and a CRM-style system.",
    problem: "People were copying information between tools, classifying requests manually, drafting responses, and then updating a system of record. The difficult part was not generation. It was preserving context and making each handoff reliable.",
    discovery: "I mapped the workflow into deterministic steps, AI-assisted steps, approval points, and system updates. That made it clear where an LLM helped and where normal code was safer.",
    build: "I implemented a pipeline that normalized intake, classified it, enriched it with internal context, drafted the next action, paused for review when needed, and then wrote the approved result back to the operating system.",
    controls: ["Schema validation", "Deterministic rules before LLM calls", "Approval gates", "Retry and exception handling", "Structured audit events"],
    proof: ["One traceable workflow instead of disconnected manual handoffs", "Every AI-assisted step has a defined input and output", "Failures route to an exception path instead of disappearing"],
    technologies: ["Python", "FastAPI", "Webhooks", "REST APIs", "PostgreSQL", "LLM orchestration"],
  },
  {
    id: "financial-ops-reconciliation",
    level: "Regulated",
    domain: "Financial",
    title: "Financial operations reconciliation with AI-assisted exception review",
    clientContext: "A finance-oriented workflow needed to reconcile records from multiple sources and reduce the time spent investigating mismatches without allowing AI to make irreversible financial decisions.",
    problem: "Most records matched using normal rules, but exceptions consumed analyst time because the reason for a mismatch was spread across transaction data, notes, and external references.",
    discovery: "I kept accounting logic deterministic and used AI only where unstructured context had to be summarized or compared. High-risk actions stayed outside the model entirely.",
    build: "I created a reconciliation pipeline that matched records with explicit rules, isolated exceptions, assembled evidence for each exception, and used an AI review layer to summarize likely causes for a human analyst.",
    controls: ["Read-only AI access", "Deterministic reconciliation rules", "Human approval for all financial actions", "Evidence attached to every exception", "Audit-ready decision log"],
    proof: ["Rules and AI responsibilities are clearly separated", "Analysts see the evidence before accepting a suggestion", "No model output can directly move money or alter a financial record"],
    technologies: ["Python", "SQL", "Pandas", "PostgreSQL", "LLM summarization", "Audit logging"],
  },
  {
    id: "tool-using-agent",
    level: "Agentic",
    domain: "AI Agent",
    title: "Tool-using agent for customer and operations tasks",
    clientContext: "A startup wanted an assistant that could do more than answer questions. It needed to look up records, create drafts, update internal systems, and coordinate tasks across APIs.",
    problem: "A tool-calling demo worked, but production required permission boundaries, predictable tool schemas, confirmations, retries, and protection against duplicate or unsafe actions.",
    discovery: "I treated every tool call as an integration contract rather than a magic agent capability. Each action got explicit permissions, validation, idempotency rules, and a clear confirmation policy.",
    build: "I implemented an agent loop with scoped tools for retrieval, CRM-style updates, ticket actions, and internal APIs. The agent could plan and propose actions, while risky writes required explicit confirmation.",
    controls: ["Per-tool permissions", "Input validation", "Idempotency keys", "Confirmation for risky writes", "Tool-call logs", "Timeout and retry policy"],
    proof: ["Agent actions are inspectable as individual tool calls", "Unsafe or ambiguous writes stop for confirmation", "Repeated requests do not create duplicate side effects"],
    technologies: ["Python", "FastAPI", "Tool calling", "REST APIs", "Webhooks", "PostgreSQL"],
  },
  {
    id: "customer-onboarding-agent",
    level: "Production",
    domain: "Onboarding",
    title: "Customer onboarding agent with validation and escalation",
    clientContext: "A startup onboarding flow had many repeated steps but also client-specific exceptions that made a fully autonomous bot unsafe.",
    problem: "Customers missed setup steps, the team chased missing information manually, and edge cases created long email threads before a customer could use the product.",
    discovery: "I shadowed the sequence as a state machine: required information, validation, provisioning, confirmation, and exception handling. That let the automation progress safely without pretending every client was identical.",
    build: "I built a guided onboarding agent that collected structured inputs, validated them, triggered allowed provisioning steps, and escalated exceptions with the full context already assembled.",
    controls: ["State-machine progression", "Input validation", "Human escalation", "Provisioning confirmation", "Client-specific exception rules"],
    proof: ["The system knows the current onboarding state", "Missing or invalid inputs cannot silently advance", "Escalations include the history and evidence needed by the human reviewer"],
    technologies: ["LLM agent", "Python", "REST APIs", "Webhooks", "State management", "Next.js"],
  },
  {
    id: "multi-client-assistant-platform",
    level: "Multi-client",
    domain: "Multi-client",
    title: "One AI assistant core adapted across multiple startup clients",
    clientContext: "Different clients wanted similar AI capabilities but had different knowledge sources, workflows, permissions, terminology, and systems of record.",
    problem: "Copying the codebase for every client would have created prompt drift, inconsistent fixes, duplicated integrations, and a maintenance problem after the first few deployments.",
    discovery: "I separated the stable product core from the things that truly varied by client: connectors, knowledge sources, prompts, policy, evaluation sets, feature flags, and approval rules.",
    build: "I structured the system around tenant configuration and adapter interfaces so each client could get different behavior without forking the orchestration engine. Shared fixes landed once, while client-specific logic stayed isolated.",
    controls: ["Tenant-scoped configuration", "Client-specific connector adapters", "Separate knowledge indexes", "Per-client evaluation suites", "Feature flags", "Permission isolation"],
    proof: ["Shared orchestration code does not contain client names", "Client differences live in configuration or adapters", "A core bug fix can be shipped without manually patching every client fork"],
    technologies: ["TypeScript", "Python", "PostgreSQL", "Adapter pattern", "Feature flags", "RAG", "API integrations"],
  },
  {
    id: "multi-agent-research-ops",
    level: "Advanced",
    domain: "Multi-agent",
    title: "Multi-agent research and operations workflow with verification",
    clientContext: "A more advanced workflow required collecting evidence from multiple sources, checking claims, and producing a structured result rather than trusting one long model call.",
    problem: "Single-agent answers became difficult to inspect when the task mixed planning, retrieval, comparison, verification, and synthesis. Failures were hard to locate because every step was hidden inside one response.",
    discovery: "I decomposed the task by responsibility rather than creating agents for style. Planning, evidence gathering, verification, and synthesis each had a distinct input, output, and stopping condition.",
    build: "I created an orchestrated flow where a planner decomposed the request, specialist workers gathered evidence, a verifier checked support and contradictions, and a synthesizer produced the final brief with traces retained.",
    controls: ["Role-specific tool access", "Step budgets", "Evidence requirements", "Verifier pass before synthesis", "Trace logging", "Failure and timeout handling"],
    proof: ["Each conclusion can be traced to gathered evidence", "Agent failures are localized to a stage", "The workflow can stop when evidence is insufficient instead of manufacturing certainty"],
    technologies: ["LangGraph-style orchestration", "Python", "Vector retrieval", "Tool calling", "Evaluation harness", "Structured outputs"],
  },
  {
    id: "analytics-assistant",
    level: "Advanced",
    domain: "Analytics",
    title: "Natural-language analytics assistant with safe SQL execution",
    clientContext: "Business users needed faster answers from operational data without giving an LLM unrestricted database access or hiding the generated query from analysts.",
    problem: "A plain text-to-SQL demo could generate plausible but incorrect queries and made it hard for a reviewer to understand how the answer was produced.",
    discovery: "I designed the workflow around schema grounding, read-only execution, validation, query visibility, and clear failure states rather than treating SQL generation as a one-shot prompt.",
    build: "I built an assistant that grounded itself in the approved schema, generated a query, checked it against safety rules, executed it read-only, and returned both the answer and the SQL used to produce it.",
    controls: ["Read-only database role", "Schema grounding", "SQL validation", "Query shown to reviewer", "Result-size limits", "Failure explanation"],
    proof: ["Every answer includes the query used", "Destructive statements are blocked", "Users can distinguish a database result from model explanation"],
    technologies: ["Python", "SQL", "PostgreSQL", "Schema retrieval", "LLM", "Validation rules"],
  },
];

export const startupCaseStudyNote =
  "Client names are withheld. These case studies explain anonymized delivery patterns from startup and client work. Numeric outcomes are shown only where they are already measured and supported elsewhere in this portfolio.";
