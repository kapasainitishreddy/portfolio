"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const library = projects.slice(3);

  return (
    <Section id="projects" label="Project library">
      <Reveal>
        <div className="max-w-3xl">
          <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>More systems, experiments, and reusable infrastructure.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-silver">The broader library covers multi-agent research, text-to-SQL, MCP integrations, evaluation tooling, and AI governance concepts. Open any card for the problem, role, implementation, and current status.</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {library.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
