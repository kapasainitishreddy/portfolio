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

export function InkProvider({ children }: { children: React.ReactNode }) {
  const [intensity, setIntensity] = useState(0.6);
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
    // Safe fallback so components never crash outside the provider.
    return {
      intensity: 0.6,
      setIntensity: () => {},
      paused: false,
      togglePaused: () => {},
      pattern: "default",
      setPattern: () => {},
    };
  }
  return ctx;
}
