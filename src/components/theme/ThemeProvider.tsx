"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "ink" | "calligraphy" | "samurai";
export type Mode = "light" | "dark";

export const THEMES: { id: Theme; label: string; tagline: string }[] = [
  { id: "samurai", label: "Bushidō", tagline: "Neon katana — scroll to slash" },
  { id: "ink", label: "Suminagashi", tagline: "Floating ink" },
  { id: "calligraphy", label: "Shodō", tagline: "Living brush" },
];

const THEME_KEY = "snrk_theme";
const MODE_KEY = "snrk_mode";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("samurai");
  const [mode, setModeState] = useState<Mode>("dark");

  // restore persisted choices
  useEffect(() => {
    const savedTheme = (typeof window !== "undefined" && localStorage.getItem(THEME_KEY)) as Theme | null;
    if (savedTheme === "ink" || savedTheme === "calligraphy" || savedTheme === "samurai") {
      setThemeState(savedTheme);
    }
    const savedMode = (typeof window !== "undefined" && localStorage.getItem(MODE_KEY)) as Mode | null;
    if (savedMode === "light" || savedMode === "dark") {
      setModeState(savedMode);
    }
  }, []);

  // reflect on <html> so CSS variables + canvases can read theme/mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore storage failures */
    }
  };

  const setMode = (next: Mode) => {
    setModeState(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* ignore storage failures */
    }
  };

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "samurai", setTheme: () => {}, mode: "dark", setMode: () => {}, toggleMode: () => {} };
  return ctx;
}
