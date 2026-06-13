"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "ink" | "calligraphy" | "samurai";

export const THEMES: { id: Theme; label: string; tagline: string }[] = [
  { id: "ink", label: "Suminagashi", tagline: "Floating ink" },
  { id: "calligraphy", label: "Shodō", tagline: "Living brush" },
  { id: "samurai", label: "Bushidō", tagline: "Katana cuts" },
];

const STORAGE_KEY = "snrk_theme";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("ink");

  // restore persisted choice
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Theme | null;
    if (saved === "ink" || saved === "calligraphy" || saved === "samurai") {
      setThemeState(saved);
    }
  }, []);

  // reflect on <html data-theme> so CSS variables can swap accents
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures */
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "ink", setTheme: () => {} };
  return ctx;
}
