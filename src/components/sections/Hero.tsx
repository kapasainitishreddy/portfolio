"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/data/site";
import { ArrowIcon } from "@/components/layout/icons";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { withBasePath } from "@/lib/basePath";

export default function Hero() {
  const reduced = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="content-pad mx-auto w-full max-w-7xl pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: reduced ? 0 : 0.07 }}>
          <motion.p variants={item} className="font-mono-label" style={{ color: "var(--color-copper)" }}>
            {hero.status}
          </motion.p>
          <motion.h1 variants={item} className="mt-5 max-w-4xl text-rice" style={{ fontSize: "clamp(3rem, 7.2vw, 6.5rem)", lineHeight: 0.96 }}>
            {hero.headline}
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
            {hero.supporting}
          </motion.p>
          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2" aria-label="Core capabilities">
            {hero.capabilities.map((capability) => (
              <li key={capability} className="rounded-full border px-3 py-1.5 text-xs text-rice" style={{ background: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
                {capability}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
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
          transition={{ duration: 0.65, delay: reduced ? 0 : 0.2 }}
          className="space-y-4"
        >
          <figure className="surface overflow-hidden rounded-3xl">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={withBasePath("/profile.webp")}
                alt="Sai Nitish Reddy Kapa smiling outdoors at sunset"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 48%, transparent), transparent)" }}
                aria-hidden="true"
              />
            </div>
            <figcaption className="grid gap-1 px-5 py-4 text-sm sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4">
              <span className="font-medium text-rice">Sai Nitish Reddy Kapa</span>
              <span className="text-silver sm:text-right">Forward deployed AI, data, and integrations</span>
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border" style={{ background: "color-mix(in srgb, var(--color-charcoal) 72%, transparent)" }}>
            {hero.proof.map((proof, index) => (
              <div key={proof.label} className="min-h-36 p-5 md:p-6" style={{ borderRight: index % 2 === 0 ? "1px solid color-mix(in srgb, var(--color-silver) 14%, transparent)" : undefined, borderBottom: index < 2 ? "1px solid color-mix(in srgb, var(--color-silver) 14%, transparent)" : undefined }}>
                <strong className="font-serif text-3xl text-rice md:text-4xl">{proof.value}</strong>
                <p className="mt-2 text-sm font-medium text-rice">{proof.label}</p>
                <p className="mt-1 text-xs leading-5 text-silver">{proof.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
