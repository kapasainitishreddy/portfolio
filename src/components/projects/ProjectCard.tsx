"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { ArrowIcon } from "@/components/layout/icons";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group surface flex flex-col overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex h-full flex-col text-left"
        aria-label={`Open case study for ${project.name}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ProjectPlaceholder pattern={project.inkPattern} name={project.name} />
          )}
          <div className="absolute right-3 top-3 flex gap-2">
            {project.comingSoon ? (
              <span
                className="font-mono-label rounded-full px-2.5 py-1"
                style={{ background: "var(--color-copper)", color: "var(--color-soft)", letterSpacing: "0.12em" }}
              >
                Coming Soon
              </span>
            ) : (
              <span
                className="font-mono-label rounded-full px-2.5 py-1"
                style={{ background: "color-mix(in srgb, var(--color-ink) 70%, transparent)", letterSpacing: "0.12em" }}
              >
                {project.status}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono-label">{project.category}</p>
          <h3 className="mt-2 font-serif text-2xl text-rice">{project.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-silver">{project.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-1 text-xs text-silver"
                style={{ border: "1px solid color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-sm text-rice">
            View case study
            <ArrowIcon width={15} height={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    </motion.article>
  );
}
