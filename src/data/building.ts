/**
 * "Currently building" timeline.
 * `phases` is the ordered journey; each active item points at its current phase
 * by index. No completion percentages are used by design.
 */

export const phases = [
  "Research",
  "System Design",
  "Prototype",
  "Testing",
  "Launch",
  "Iteration",
] as const;

export type Phase = (typeof phases)[number];

export interface BuildingItem {
  name: string;
  /** Must match one of `phases`. */
  phase: Phase;
  blurb: string;
}

export const buildingItems: BuildingItem[] = [
  { name: "GovSeal", phase: "Prototype", blurb: "Deployment governance console for AI" },
  { name: "TraceGrid", phase: "System Design", blurb: "LLM evaluation & audit platform" },
  { name: "AI Governance Certification", phase: "Testing", blurb: "Responsible-AI credential in progress" },
  { name: "Embedded copilot rollouts", phase: "Iteration", blurb: "Shipping AI into live customer workflows" },
  { name: "Evaluation harness library", phase: "Research", blurb: "Reusable evals for deployed models" },
];
