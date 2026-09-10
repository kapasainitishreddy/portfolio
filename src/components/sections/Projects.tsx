"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { ArrowIcon, GitHubIcon } from "@/components/layout/icons";
import { githubProjects } from "@/data/githubProjects";

export default function Projects() {
  return (
    <Section id="projects" label="Public GitHub work">
      <Reveal>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Open the code</p>
            <h2 className="mt-3 text-rice" style={{ fontSize: "clamp(2.25rem, 4.7vw, 4.4rem)", lineHeight: 0.98 }}>
              Public repositories you can actually inspect.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver md:text-lg">
              These are public GitHub repositories, not concept cards. The descriptions below are limited to capabilities visible in each repository, its README, or package metadata.
            </p>
          </div>
          <div className="rounded-2xl border px-4 py-3 text-sm leading-6 text-silver" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 12%, transparent)", background: "color-mix(in srgb, var(--color-charcoal) 32%, transparent)" }}>
            Private repos are intentionally not presented as clickable proof.
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {githubProjects.map((project, index) => (
          <Reveal key={project.href} delay={Math.min(index * 0.03, 0.12)}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="surface flex h-full flex-col p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono-label">github.com/kapasainitishreddy/{project.repo}</p>
                  <h3 className="mt-2 font-serif text-3xl font-normal text-rice">{project.name}</h3>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-rice" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 14%, transparent)", background: "color-mix(in srgb, var(--color-charcoal) 34%, transparent)" }} aria-hidden="true">
                  <GitHubIcon width={18} height={18} />
                </span>
              </div>

              <p className="mt-4 leading-7 text-silver">{project.summary}</p>

              <div className="mt-6 border-t pt-5" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 11%, transparent)" }}>
                <p className="font-mono-label">Verified in the repo</p>
                <ul className="mt-3 space-y-2.5">
                  {project.evidence.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-silver">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border px-2.5 py-1 text-xs text-silver">{item}</span>
                ))}
              </div>

              {project.boundary && (
                <p className="mt-5 rounded-xl border p-3 text-xs leading-5 text-silver" style={{ borderColor: "color-mix(in srgb, var(--color-copper) 16%, transparent)", background: "color-mix(in srgb, var(--color-copper) 5%, transparent)" }}>
                  {project.boundary}
                </p>
              )}

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full border px-4 py-2.5 text-sm text-rice transition-transform hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ borderColor: "color-mix(in srgb, var(--color-copper) 28%, transparent)" }}
              >
                View repository <ArrowIcon width={14} height={14} />
              </a>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
