"use client";

import { useState } from "react";
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

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  const filters: Filter[] = ["All", ...projectTags];

  return (
    <Section id="projects" label="Selected Projects">
      <Reveal>
        <h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
          Products built as connected systems, from research to working prototypes.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  active ? "text-ink" : "text-silver hover:text-rice"
                }`}
                style={
                  active
                    ? { background: "var(--color-soft)" }
                    : { border: "1px solid color-mix(in srgb, var(--color-silver) 22%, transparent)" }
                }
              >
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
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
