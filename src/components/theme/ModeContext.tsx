"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ViewMode = "humble" | "hire-me";

interface ModeState {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeState | null>(null);
const STORAGE_KEY = "snrk_view_mode";

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("humble");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ViewMode | null;
    if (saved === "humble" || saved === "hire-me") {
      setModeState(saved);
    }
  }, []);

  const setMode = (next: ViewMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleMode = () => setMode(mode === "humble" ? "hire-me" : "humble");

  return <ModeContext.Provider value={{ mode, setMode, toggleMode }}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeState {
  const ctx = useContext(ModeContext);
  if (!ctx) return { mode: "humble", setMode: () => {}, toggleMode: () => {} };
  return ctx;
}
