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
  { name: "Siraba HQ", phase: "Prototype", blurb: "AI company operating system" },
  { name: "Vakya", phase: "Prototype", blurb: "Real-time language intelligence" },
  { name: "Receipts", phase: "Testing", blurb: "Local-first personal clarity" },
  { name: "Keeply", phase: "Prototype", blurb: "Universal capture and organization" },
  { name: "Un-em", phase: "System Design", blurb: "Natural AI writing assistant" },
  { name: "VibeDesk", phase: "Research", blurb: "Command center for solo builders" },
];
