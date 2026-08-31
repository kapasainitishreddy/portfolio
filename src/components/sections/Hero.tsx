"use client";

import { motion } from "framer-motion";
import { hero } from "@/data/site";
import { ArrowIcon } from "@/components/layout/icons";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

export default function Hero() {
  const reduced = useReducedMotion();
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="home" className="portfolio-hero-shell content-pad mx-auto w-full max-w-[1500px] pt-28">
      <div className="portfolio-hero">
        <motion.div className="portfolio-hero__copy" variants={container} initial="hidden" animate="visible">
          <motion.h1 variants={item} className="portfolio-hero__title text-rice">
            {hero.headline}
          </motion.h1>

          <motion.p variants={item} className="portfolio-hero__support text-silver">
            {hero.supporting[0]}
          </motion.p>

          <motion.div variants={item} className="portfolio-hero__actions">
            {hero.actions.map((action) => {
              const primary = action.kind === "primary";
              return (
                <a
                  key={action.label}
                  href={action.href}
                  {...("external" in action && action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={primary ? "portfolio-button portfolio-button--primary" : "portfolio-button"}
                >
                  {action.label}
                  <ArrowIcon width={15} height={15} aria-hidden="true" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="portfolio-hero__visual"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="portfolio-hero__sun" />
          <div className="portfolio-hero__swirl portfolio-hero__swirl--one" />
          <div className="portfolio-hero__swirl portfolio-hero__swirl--two" />
          <div className="portfolio-hero__horizon" />
          <span className="portfolio-hero__kanji">流れ</span>
          <div className="portfolio-hero__theme-copy">
            <span>Suminagashi</span>
            <span>Shodō</span>
            <span>Bushidō</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="portfolio-identities"
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42 }}
      >
        {hero.identities.map((identity, index) => (
          <div key={identity.title} className="portfolio-identity">
            <span className="portfolio-identity__number">0{index + 1}</span>
            <div>
              <h2>{identity.title}</h2>
              <p>{identity.body}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
