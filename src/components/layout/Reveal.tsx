"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

/**
 * Wraps children in a calm scroll reveal. For reduced-motion visitors it renders
 * the content immediately with no transform.
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
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
