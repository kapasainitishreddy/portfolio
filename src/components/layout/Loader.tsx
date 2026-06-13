"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

const SEEN_KEY = "snrk_intro_seen";

export default function Loader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const seen = typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY);
    if (seen) return;
    setShow(true);
    const dur = reduced ? 900 : 3200;
    const timer = setTimeout(() => dismiss(), dur);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setShow(false);
  }

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--color-ink)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          role="status"
          aria-label="Loading"
        >
          {/* expanding suminagashi ink rings */}
          {!reduced && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full border"
                  style={{ borderColor: "color-mix(in srgb, var(--color-silver) 30%, transparent)" }}
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{
                    width: ["0vmax", `${30 + i * 18}vmax`],
                    height: ["0vmax", `${30 + i * 18}vmax`],
                    opacity: [0, 0.5 - i * 0.1, 0],
                  }}
                  transition={{ duration: 2.4, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
              <motion.span
                className="absolute rounded-full"
                style={{ background: "var(--color-indigo)" }}
                initial={{ width: 14, height: 14, opacity: 1 }}
                animate={{ width: ["14px", "60vmax"], height: ["14px", "60vmax"], opacity: [1, 0] }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}

          <motion.div
            className="relative z-10 px-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.9, duration: 0.9 }}
          >
            <h1
              className="font-serif text-rice"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3.6rem)", letterSpacing: "0.04em" }}
            >
              {site.name.toUpperCase()}
            </h1>
            <p className="font-mono-label mt-4">{site.tagline}</p>
          </motion.div>

          <button
            onClick={dismiss}
            className="font-mono-label absolute bottom-8 right-8 z-10 px-3 py-2 transition-opacity hover:opacity-100"
            style={{ opacity: 0.6 }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
