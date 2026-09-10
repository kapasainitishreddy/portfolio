/**
 * "Currently building" timeline. Public copy intentionally describes only
 * capability areas while active product identities remain private.
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
  phase: Phase;
  blurb: string;
}

export const buildingItems: BuildingItem[] = [
  { name: "Private governance system", phase: "Prototype", blurb: "Deployment oversight and evaluation workflows for AI" },
  { name: "Private evaluation system", phase: "System Design", blurb: "Inspectable model-quality and audit workflows" },
  { name: "AI governance learning", phase: "Testing", blurb: "Responsible-AI study and applied practice" },
  { name: "Embedded AI workflows", phase: "Iteration", blurb: "Shipping AI into real operating workflows" },
  { name: "Reusable evaluation tooling", phase: "Research", blurb: "Repeatable eval patterns for deployed models" },
];
