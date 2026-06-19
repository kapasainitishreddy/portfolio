"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/components/theme/ModeContext";

export default function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const isHireMe = mode === "hire-me";

  return (
    <button
      onClick={toggleMode}
      className="group relative flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-serif text-accent transition-all hover:bg-accent/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ opacity: 0, x: isHireMe ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isHireMe ? 10 : -10 }}
          transition={{ duration: 0.2 }}
        >
          {isHireMe ? "📄 Hire Me" : "🙏 Humble"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
