"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";

const DrawPad = dynamic(() => import("@/components/calligraphy/DrawPad"), { ssr: false });

/**
 * Theme-specific interactive extras layered above content.
 * The Shodō theme gets a floating sumi drawing pad.
 */
export default function ThemeExtras() {
  const { theme } = useTheme();
  if (theme !== "calligraphy") return null;
  return <DrawPad />;
}
