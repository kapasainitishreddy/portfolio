"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { ArrowIcon } from "@/components/layout/icons";
import { withBasePath } from "@/lib/basePath";
import { cleanVisibleCopy } from "@/lib/copy";

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const name = cleanVisibleCopy(project.name);
  return (
    <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38 }} className="group surface flex flex-col overflow-hidden">
      <button type="button" onClick={() => onOpen(project)} className="flex h-full flex-col text-left" aria-label={`Open case study for ${name}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {project.image ? <Image src={withBasePath(project.image)} alt={`${name} preview`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /> : <ProjectPlaceholder pattern={project.inkPattern} name={name} />}
          <div className="absolute right-3 top-3"><span className="font-mono-label rounded-full px-2.5 py-1" style={{ background: project.comingSoon ? "var(--color-copper)" : "color-mix(in srgb, var(--color-ink) 78%, transparent)", color: "var(--color-soft)", letterSpacing: "0.1em" }}>{project.comingSoon ? "Coming Soon" : cleanVisibleCopy(project.status)}</span></div>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="font-mono-label">{cleanVisibleCopy(project.category)}</p>
          <h3 className="mt-2 font-serif text-2xl text-rice">{name}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-silver">{cleanVisibleCopy(project.summary)}</p>
          <div className="mt-4 flex flex-wrap gap-2">{project.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border px-2.5 py-1 text-xs text-silver">{cleanVisibleCopy(tag)}</span>)}</div>
          <span className="mt-5 inline-flex items-center gap-2 text-sm text-rice">View case study <ArrowIcon width={14} height={14} className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </button>
    </motion.article>
  );
}
