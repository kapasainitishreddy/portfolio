"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { InkPattern } from "@/data/projects";

interface InkState {
  /** 0 = paused/still, 1 = full motion. */
  intensity: number;
  setIntensity: (value: number) => void;
  paused: boolean;
  togglePaused: () => void;
  /** Active ink pattern; set when a project case study opens. */
  pattern: InkPattern;
  setPattern: (pattern: InkPattern) => void;
}

const InkContext = createContext<InkState | null>(null);
const DEFAULT_INK_INTENSITY = 0.82;

export function InkProvider({ children }: { children: React.ReactNode }) {
  // Tuned for a more legible mobile-first wake, using MIT-licensed
  // WebGL fluid demos as interaction reference without importing their solver.
  const [intensity, setIntensity] = useState(DEFAULT_INK_INTENSITY);
  const [paused, setPaused] = useState(false);
  const [pattern, setPattern] = useState<InkPattern>("default");

  const togglePaused = useCallback(() => setPaused((p) => !p), []);

  const value = useMemo(
    () => ({ intensity, setIntensity, paused, togglePaused, pattern, setPattern }),
    [intensity, paused, togglePaused, pattern],
  );

  return <InkContext.Provider value={value}>{children}</InkContext.Provider>;
}

export function useInk(): InkState {
  const ctx = useContext(InkContext);
  if (!ctx) {
    return {
      intensity: DEFAULT_INK_INTENSITY,
      setIntensity: () => {},
      paused: false,
      togglePaused: () => {},
      pattern: "default",
      setPattern: () => {},
    };
  }
  return ctx;
}
