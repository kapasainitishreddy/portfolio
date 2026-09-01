"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { CloseIcon } from "@/components/layout/icons";
import { withBasePath } from "@/lib/basePath";
import { cleanVisibleCopy } from "@/lib/copy";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [project, onClose]);

  if (!project) return null;
  const name = cleanVisibleCopy(project.name);
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ background: "color-mix(in srgb, var(--color-ink) 84%, transparent)", backdropFilter: "blur(8px)" }} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <motion.div ref={panelRef} tabIndex={-1} initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.32 }} onClick={(event) => event.stopPropagation()} className="surface my-8 w-full max-w-3xl overflow-hidden outline-none">
          <div className="relative aspect-[16/9] w-full">{project.image ? <Image src={withBasePath(project.image)} alt={`${name} preview`} fill className="object-cover" /> : <ProjectPlaceholder pattern={project.inkPattern} name={name} />}<button type="button" onClick={onClose} aria-label="Close case study" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-rice" style={{ background: "color-mix(in srgb, var(--color-ink) 72%, transparent)" }}><CloseIcon /></button></div>
          <div className="p-6 md:p-9">
            <div className="flex flex-wrap items-center gap-3"><span className="font-mono-label">{cleanVisibleCopy(project.category)}</span><span className="font-mono-label rounded-full px-2.5 py-1" style={{ background: "color-mix(in srgb, var(--color-indigo) 60%, transparent)", color: "var(--color-soft)", letterSpacing: "0.1em" }}>{project.comingSoon ? "Coming Soon" : cleanVisibleCopy(project.status)}</span></div>
            <h2 id="project-modal-title" className="mt-3 font-serif text-4xl text-rice">{name}</h2>
            <p className="mt-3 leading-7 text-silver">{cleanVisibleCopy(project.summary)}</p>
            {project.note && <p className="mt-5 rounded-lg border p-4 text-sm leading-6 text-rice" style={{ background: "color-mix(in srgb, var(--color-copper) 16%, transparent)" }}>{cleanVisibleCopy(project.note)}</p>}
            <dl className="mt-8 space-y-6"><Field label="The problem" value={project.problem} /><Field label="The solution" value={project.solution} /><Field label="My role" value={project.role} /></dl>
            <div className="mt-8"><p className="font-mono-label mb-3">Key capabilities</p><ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">{project.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-silver"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />{cleanVisibleCopy(feature)}</li>)}</ul></div>
            <div className="mt-8"><p className="font-mono-label mb-3">Relevant skills & technologies</p><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border px-3 py-1 text-xs text-silver">{cleanVisibleCopy(technology)}</span>)}</div></div>
            {project.links && project.links.length > 0 && <div className="mt-8 flex flex-wrap gap-3">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-sm text-ink" style={{ background: "var(--color-soft)" }}>{cleanVisibleCopy(link.label)}</a>)}</div>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-mono-label mb-2">{label}</dt><dd className="leading-7 text-silver">{cleanVisibleCopy(value)}</dd></div>;
}
