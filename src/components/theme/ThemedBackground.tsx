"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";

const SuminagashiBackground = dynamic(() => import("@/components/suminagashi/SuminagashiBackground"), { ssr: false });
const CalligraphyBackground = dynamic(() => import("@/components/calligraphy/CalligraphyBackground"), { ssr: false });
const SamuraiBackground = dynamic(() => import("@/components/samurai/SamuraiBackground"), { ssr: false });

export default function ThemedBackground() {
  const { theme } = useTheme();
  return (
    <div className={`theme-bg theme-bg--${theme}`} aria-hidden role="presentation">
      {theme === "ink" ? <SuminagashiBackground /> : theme === "calligraphy" ? <CalligraphyBackground /> : <SamuraiBackground />}
      <div className={`theme-veil theme-veil--${theme}`} />
    </div>
  );
}
