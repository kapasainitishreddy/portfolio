"use client";

import { motion } from "framer-motion";
import { hero, site } from "@/data/site";
import { visualMedia } from "@/data/visualMedia";
import { ArrowIcon } from "@/components/layout/icons";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { withBasePath } from "@/lib/basePath";

export default function Hero() {
  const reduced = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="content-pad mx-auto w-full max-w-7xl pb-16 pt-24 md:pt-28 lg:pb-24 lg:pt-16">
      <div className="hero-layout hero-layout--visual">
        <motion.div className="hero-copy" initial="hidden" animate="visible" transition={{ staggerChildren: reduced ? 0 : 0.075 }}>
          <motion.div variants={item} className="hero-kicker">
            <span className="hero-kicker__pulse" aria-hidden="true" />
            <span>AI systems · products · stories</span>
          </motion.div>

          <motion.h1 variants={item} className="hero-headline text-rice">
            Engineer with heart of a <span>Writer.</span>
          </motion.h1>

          <motion.p variants={item} className="hero-supporting text-silver">
            I turn ambiguous workflows into useful AI products, then write fiction about the humans inside the system.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            {hero.actions.slice(0, 2).map((action) => (
              <a key={action.label} href={action.href} className={action.kind === "primary" ? "portfolio-cta portfolio-cta--primary" : "portfolio-cta"}>
                {action.label}<ArrowIcon width={14} height={14} aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          <motion.div variants={item} className="hero-proof-strip" aria-label="Selected evidence">
            {hero.proof.slice(0, 3).map((proof) => (
              <div key={proof.label} className="hero-proof-strip__item">
                <strong>{proof.value}</strong>
                <span>{proof.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="hero-gallery"
          aria-label="Portraits of Sai Nitish"
        >
          <motion.figure
            className="hero-photo hero-photo--primary"
            whileHover={reduced ? undefined : { rotate: -1.25, y: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <img src={visualMedia.portrait} alt="Sai Nitish Reddy Kapa" loading="eager" decoding="async" />
            <figcaption>
              <span>{site.shortName}</span>
              <small>Engineer · Product builder · Writer</small>
            </figcaption>
          </motion.figure>

          <motion.figure
            className="hero-photo hero-photo--secondary"
            whileHover={reduced ? undefined : { rotate: 1.4, y: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <img src={withBasePath(visualMedia.portraitCollage)} alt="Another portrait of Sai Nitish" loading="eager" decoding="async" />
          </motion.figure>

          <div className="hero-availability">
            <span aria-hidden="true" />
            <p>{hero.status}</p>
          </div>

          <div className="hero-gallery__mark" aria-hidden="true">BUILD / WRITE</div>
        </motion.div>
      </div>
    </section>
  );
}
