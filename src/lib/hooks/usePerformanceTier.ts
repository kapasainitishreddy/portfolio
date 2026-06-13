"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "high" | "low";

/**
 * Cheap heuristic device-performance detection used to scale shader resolution
 * and animation complexity. Errs toward "low" on mobile and small core counts.
 */
export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("high");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const smallScreen = window.innerWidth < 768;

    const isLow = cores <= 4 || memory <= 4 || (coarsePointer && smallScreen);
    setTier(isLow ? "low" : "high");
  }, []);

  return tier;
}
