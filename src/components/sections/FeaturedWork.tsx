"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

export default function FeaturedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.slice(0, 3);

  return (
    <Section id="featured-work" label="Forward-deployed work">
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>
              The job, system, and measured result are visible up front.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver">
              Client names stay confidential, but the role, time period, implementation scope, stack, and measured outcomes stay concrete. Open a card for the workflow, controls, and what actually shipped.
            </p>
          </div>
          <p className="font-mono-label">Role → build → measured outcome</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {featured.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
