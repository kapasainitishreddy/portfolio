"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import InkBackground from "@/components/ink/InkBackground";

// calligraphy + samurai canvases load only when their theme is active
const CalligraphyBackground = dynamic(() => import("@/components/calligraphy/CalligraphyBackground"), {
  ssr: false,
});
const SamuraiBackground = dynamic(() => import("@/components/samurai/SamuraiBackground"), {
  ssr: false,
});

export default function ThemedBackground() {
  const { theme } = useTheme();

  if (theme === "ink") {
    return <InkBackground />;
  }

  if (theme === "samurai") {
    return (
      <div className="ink-bg" aria-hidden role="presentation">
        <SamuraiBackground />
        <div className="samurai-scanlines" />
        <div className="ink-bg__veil samurai-veil" />
      </div>
    );
  }

  return (
    <div className="ink-bg" aria-hidden role="presentation">
      <CalligraphyBackground />
      <div className="ink-bg__veil" />
    </div>
  );
}
