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
    <Section id="featured-work" label="Selected work">
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>Three examples where the work had to survive real operations.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver">These are the clearest examples of how I discover a workflow, build the working slice, integrate it, and measure whether it actually improved the job.</p>
          </div>
          <p className="font-mono-label">Problem → system → measured change</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {featured.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
