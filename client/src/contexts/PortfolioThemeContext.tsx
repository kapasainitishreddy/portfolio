import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PortfolioTheme = "cyberpunk" | "space" | "ink" | "terminal";

interface ThemeConfig {
  id: PortfolioTheme;
  label: string;
  icon: string;
  tagline: string;
  accentColor: string;
  bgColor: string;
}

export const THEMES: ThemeConfig[] = [
  { id: "cyberpunk", label: "CYBER", icon: "⬡", tagline: "Neon Grid", accentColor: "#00f5ff", bgColor: "#020408" },
  { id: "space", label: "SPACE", icon: "◎", tagline: "Cosmic Void", accentColor: "#a855f7", bgColor: "#030014" },
  { id: "ink", label: "INK", icon: "◈", tagline: "Suminagashi", accentColor: "#b8860b", bgColor: "#0a0a0a" },
  { id: "terminal", label: "TERM", icon: ">_", tagline: "CLI Interface", accentColor: "#00ff41", bgColor: "#0a0f0a" },
];

interface PortfolioThemeState {
  theme: PortfolioTheme;
  setTheme: (t: PortfolioTheme) => void;
  config: ThemeConfig;
}

const PortfolioThemeContext = createContext<PortfolioThemeState | null>(null);
const STORAGE_KEY = "snrk_portfolio_theme";

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<PortfolioTheme>("cyberpunk");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as PortfolioTheme | null;
    if (saved && THEMES.find((t) => t.id === saved)) {
      setThemeState(saved);
    }
  }, []);

  const setTheme = (next: PortfolioTheme) => {
    setThemeState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  const config = THEMES.find((t) => t.id === theme)!;

  return (
    <PortfolioThemeContext.Provider value={{ theme, setTheme, config }}>
      {children}
    </PortfolioThemeContext.Provider>
  );
}

export function usePortfolioTheme(): PortfolioThemeState {
  const ctx = useContext(PortfolioThemeContext);
  if (!ctx) return { theme: "cyberpunk", setTheme: () => {}, config: THEMES[0] };
  return ctx;
}
