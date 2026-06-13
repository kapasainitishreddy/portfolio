"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

// Calligraphy: content soaks in like ink bleeding into paper.
const inkBleed: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 14 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// Samurai: the section is sliced open along a blade line, then settles.
const bladeCut: Variants = {
  hidden: { opacity: 0, clipPath: "inset(48% 0 48% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0% 0)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Calm, theme-aware scroll reveal. Ink fades up, Shodō bleeds in, Bushidō cuts
 * open. Reduced-motion visitors get the content instantly with no transform.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  className,
  as = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Ink theme respects any custom variants a caller passed; the other themes
  // apply their signature reveal for a cohesive feel.
  const resolved = theme === "calligraphy" ? inkBleed : theme === "samurai" ? bladeCut : variants;

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
