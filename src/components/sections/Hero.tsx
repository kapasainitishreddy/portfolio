"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { hero, site } from "@/data/site";
import { ArrowIcon } from "@/components/layout/icons";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

export default function Hero() {
  const reduced = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="content-pad mx-auto w-full max-w-7xl pb-14 pt-24 md:pb-18 md:pt-28 lg:pb-20 lg:pt-20">
      <div className="hero-layout">
        <motion.div className="hero-copy" initial="hidden" animate="visible" transition={{ staggerChildren: reduced ? 0 : 0.07 }}>
          <motion.p variants={item} className="font-mono-label hero-status" style={{ color: "var(--color-copper)" }}>
            {hero.status}
          </motion.p>
          <motion.h1 variants={item} className="hero-headline text-rice">
            Engineer with heart of a <span>Writer.</span>
          </motion.h1>
          <motion.p variants={item} className="hero-supporting text-silver">{hero.supporting}</motion.p>
          <motion.p variants={item} className="hero-identity text-rice">{hero.identity}</motion.p>
          <motion.ul variants={item} className="hero-capabilities" aria-label="Core capabilities">
            {hero.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </motion.ul>
          <motion.div variants={item} className="hero-actions">
            {hero.actions.map((action) => (
              <a key={action.label} href={action.href} className={action.kind === "primary" ? "portfolio-cta portfolio-cta--primary" : "portfolio-cta"}>
                {action.label}<ArrowIcon width={14} height={14} aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduced ? 0 : 0.18 }}
          className="hero-media"
        >
          <figure className="hero-portrait surface">
            <div className="hero-portrait__frame">
              <div className="hero-portrait__fallback" aria-hidden={!imageFailed}>
                <span>{site.initials}</span>
                <p>{site.name}</p>
                <small>Engineer · Product builder · Writer</small>
              </div>
              {!imageFailed && (
                <img
                  src={site.portraitUrl}
                  alt="Sai Nitish Reddy Kapa"
                  loading="eager"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                  className="hero-portrait__image"
                />
              )}
              <div className="hero-portrait__edge" aria-hidden="true" />
            </div>
            <figcaption className="hero-portrait__caption">
              <span>{site.shortName}</span>
              <span>AI systems · Products · Stories</span>
            </figcaption>
          </figure>

          <div className="hero-proof" aria-label="Selected evidence">
            {hero.proof.map((proof) => (
              <div key={proof.label} className="hero-proof__item">
                <strong>{proof.value}</strong>
                <p>{proof.label}</p>
                <small>{proof.detail}</small>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
