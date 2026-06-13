"use client";

import { motion } from "framer-motion";
import { useTheme, THEMES, type Theme } from "./ThemeProvider";
import { InkDropIcon, BrushIcon, KatanaIcon } from "@/components/layout/icons";

const ICONS: Record<Theme, React.ComponentType<{ width?: number; height?: number }>> = {
  ink: InkDropIcon,
  calligraphy: BrushIcon,
  samurai: KatanaIcon,
};

/**
 * Segmented 3-way theme control. Each option is a real, labelled button so the
 * choice is keyboard and screen-reader accessible.
 */
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Visual theme"
      className="relative flex items-center gap-0.5 rounded-full border p-0.5"
      style={{ borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
    >
      {THEMES.map((t) => {
        const Icon = ICONS[t.id];
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme: ${t.tagline}`}
            title={`${t.label} — ${t.tagline}`}
            onClick={() => setTheme(t.id)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{ color: active ? "var(--color-ink)" : "var(--color-silver)" }}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              <Icon width={16} height={16} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
