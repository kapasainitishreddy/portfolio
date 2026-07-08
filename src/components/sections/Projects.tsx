"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { projects, projectTags, type Project, type ProjectTag } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

type Filter = ProjectTag | "All";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const allProjects = useMemo(() => projects, []);

  const filtered =
    filter === "All"
      ? allProjects
      : allProjects.filter((project) => project.tags.includes(filter));

  const filters: Filter[] = ["All", ...projectTags];

  return (
    <Section id="projects" label="FDE Case Studies & Work">
      <Reveal>
        <div className="max-w-4xl">
          <p className="font-mono-label mb-4 text-copper">EMBED · SHIP · GOVERN</p>
          <h2 className="text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
            Forward deployed work: real problems turned into shipped, governed software.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
            Three anonymized case studies from a confidential freelance engagement — embedding with a
            seed-stage startup as a Forward Deployed Engineer — plus two projects where FDE delivery
            meets AI governance. Client and customer names are withheld; the outcomes are real.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  active
                    ? "text-ink shadow-[0_0_30px_color-mix(in_srgb,var(--color-copper)_25%,transparent)]"
                    : "text-silver hover:-translate-y-0.5 hover:text-rice"
                }`}
                style={
                  active
                    ? { background: "var(--color-soft)" }
                    : { border: "1px solid color-mix(in srgb, var(--color-silver) 22%, transparent)" }
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-silver">No projects in this category yet.</p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
