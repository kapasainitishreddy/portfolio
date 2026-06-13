"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@/components/layout/icons";

/**
 * Light / dark switch. Works within whichever animated theme is active, so the
 * site offers six total looks. Accessible: a labelled toggle button.
 */
export default function ModeToggle() {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border text-silver transition-colors hover:text-rice"
      style={{ borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon width={16} height={16} /> : <SunIcon width={16} height={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
