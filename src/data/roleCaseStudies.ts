export type EvidenceMetric = {
  value: string;
  label: string;
  detail?: string;
};

export type RoleCaseStudy = {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
  metrics: EvidenceMetric[];
  work: string[];
  outcome: string;
  stack: string[];
  note?: string;
};

export const roleCaseStudies: RoleCaseStudy[] = [
  {
    id: "fde-private",
    role: "Forward Deployed Engineer (Freelance)",
    organization: "Private AI / product work",
    period: "2024 - Present",
    summary:
      "Embedded delivery across AI workflows, data integration, production debugging, evaluation, and customer feedback loops.",
    metrics: [
      { value: "~60%", label: "faster first response", detail: "Covered support workflows" },
      { value: "~20 hrs/week", label: "manual reporting removed", detail: "Production data pipeline" },
      { value: "99.5%", label: "pipeline uptime", detail: "Across the engagement" },
    ],
    work: [
      "Built Python/FastAPI and React/TypeScript workflows connecting LLMs, retrieval, APIs, persistence, logging, and human review.",
      "Added evaluations, approval points, structured logs, retry handling, and runbooks so failures stayed inspectable after handoff.",
      "Worked directly from end-user feedback, turning ambiguous requests into scoped changes, tests, demos, and measurable acceptance criteria.",
    ],
    outcome:
      "The support workflow moved from prototype to production in under four weeks, while the operations pipeline replaced recurring manual reporting with a monitored production system.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "RAG", "APIs", "Evaluation"],
    note: "The client and product identity are intentionally private. Only measurements already documented in the portfolio are shown here.",
  },
  {
    id: "data-automation-private",
    role: "Business Data Analyst",
    organization: "Private data & automation work",
    period: "Aug 2024 - Present",
    summary:
      "Data pipelines, analytics, automation, quality controls, and stakeholder-facing decision support.",
    metrics: [
      { value: "2M", label: "rows in analyzed datasets", detail: "Upper end of recurring workflows" },
      { value: "25+", label: "dashboards, tools, and automations" },
      { value: "65+", label: "stakeholder workflows supported" },
      { value: "28%", label: "reporting-efficiency improvement" },
    ],
    work: [
      "Built Python, SQL, and Pandas workflows for validation, anomaly detection, recurring analysis, and operational reporting.",
      "Defined KPIs, acceptance criteria, test plans, and repeatable data-quality checks before changes were released.",
      "Integrated API and relational data sources while documenting schemas, transformations, assumptions, and exception-handling rules.",
    ],
    outcome:
      "The work turned loosely framed business questions into reproducible analysis and repeatable operational tooling instead of one-off spreadsheet answers.",
    stack: ["Python", "SQL", "Pandas", "APIs", "Relational data", "Dashboards", "Data quality"],
    note: "Employer identity is intentionally anonymized in the public portfolio.",
  },
  {
    id: "outlier",
    role: "AI Model Trainer / Evaluation Analyst",
    organization: "Outlier AI",
    period: "Sep 2024 - Present",
    summary:
      "Hands-on evaluation of reasoning, factuality, coding quality, safety, and instruction adherence in model outputs.",
    metrics: [
      { value: "1,800+", label: "model outputs evaluated" },
      { value: "30+", label: "recurring failure modes documented" },
    ],
    work: [
      "Evaluated model outputs for factual accuracy, reasoning quality, coding and data correctness, safety, relevance, and instruction adherence.",
      "Tested adversarial, ambiguous, and edge-case prompts to surface hallucinations, brittle behavior, and inconsistent reasoning patterns.",
      "Converted recurring failures into reusable rubrics, regression-style checks, reviewer guidance, and evidence-based adjudication notes.",
    ],
    outcome:
      "The work focused on making model quality inspectable and repeatable, not just assigning a score to an isolated response.",
    stack: ["LLM evaluation", "Rubrics", "Safety review", "Python", "SQL", "Regression testing"],
  },
  {
    id: "operations-private",
    role: "Operations Data Analyst",
    organization: "Private operations analytics work",
    period: "Jun 2020 - Jan 2023",
    summary:
      "Operational analytics, data quality, recurring reporting, and cross-functional issue resolution.",
    metrics: [
      { value: "30%", label: "faster analysis turnaround", detail: "Reusable scripts and standardized queries" },
    ],
    work: [
      "Developed SQL and Python pipelines, KPI trackers, recurring reports, and data-quality routines for high-volume operational datasets.",
      "Reconciled multi-source records and investigated conflicting values to improve downstream reporting reliability.",
      "Monitored trends, outliers, and exceptions and converted raw operational data into root-cause findings and next actions.",
    ],
    outcome:
      "Reusable analysis and standardized queries reduced turnaround while making recurring reporting easier to reproduce and maintain.",
    stack: ["SQL", "Python", "KPI reporting", "Data quality", "Operational analytics"],
    note: "Employer identity is intentionally anonymized in the public portfolio.",
  },
];
