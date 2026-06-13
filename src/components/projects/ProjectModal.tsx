"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { CloseIcon } from "@/components/layout/icons";
import { useInk } from "@/components/ink/InkProvider";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { setPattern } = useInk();
  const panelRef = useRef<HTMLDivElement>(null);

  // reshape the background ink to match the open project
  useEffect(() => {
    if (project) setPattern(project.inkPattern);
    return () => setPattern("default");
  }, [project, setPattern]);

  // escape to close + scroll lock + focus
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ background: "color-mix(in srgb, var(--color-ink) 80%, transparent)", backdropFilter: "blur(6px)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="surface my-8 w-full max-w-3xl overflow-hidden outline-none"
          >
            {/* header media */}
            <div className="relative aspect-[16/9] w-full">
              {project.image ? (
                <Image src={project.image} alt={`${project.name} preview`} fill className="object-cover" />
              ) : (
                <ProjectPlaceholder pattern={project.inkPattern} name={project.name} />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-rice"
                style={{ background: "color-mix(in srgb, var(--color-ink) 65%, transparent)" }}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono-label">{project.category}</span>
                <span
                  className="font-mono-label rounded-full px-2.5 py-1"
                  style={{
                    background: project.comingSoon ? "var(--color-copper)" : "color-mix(in srgb, var(--color-indigo) 60%, transparent)",
                    color: "var(--color-soft)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {project.comingSoon ? "Coming Soon" : project.status}
                </span>
              </div>

              <h2 id="project-modal-title" className="mt-3 font-serif text-4xl text-rice">
                {project.name}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-silver">{project.summary}</p>

              {project.note && (
                <p
                  className="mt-5 rounded-lg p-4 text-sm leading-relaxed text-rice"
                  style={{ background: "color-mix(in srgb, var(--color-copper) 22%, transparent)", border: "1px solid color-mix(in srgb, var(--color-copper) 40%, transparent)" }}
                  role="note"
                >
                  {project.note}
                </p>
              )}

              <dl className="mt-8 space-y-6">
                <Field label="The problem" value={project.problem} />
                <Field label="The solution" value={project.solution} />
                <Field label="My role" value={project.role} />
              </dl>

              <div className="mt-8">
                <p className="font-mono-label mb-3">Key capabilities</p>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-silver">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <p className="font-mono-label mb-3">Relevant skills & technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono-label rounded-full px-3 py-1"
                      style={{ background: "color-mix(in srgb, var(--color-silver) 10%, transparent)", textTransform: "none", letterSpacing: "0.02em" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-5 py-2.5 text-sm text-ink"
                      style={{ background: "var(--color-soft)" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono-label mb-2">{label}</dt>
      <dd className="text-base leading-relaxed text-silver">{value}</dd>
    </div>
  );
}
