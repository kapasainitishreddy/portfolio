"use client";

import { useState } from "react";
import { flagshipCaseStudies, flagshipNote } from "@/data/flagshipCaseStudies";
import { ArrowIcon } from "./icons";
import ProjectArtwork from "./ProjectArtwork";

const roleByProject: Record<string, string> = {
  "support-copilot": "Product, architecture, integration, and deployment",
  "ops-pipeline": "Data architecture, automation, and operational handoff",
  "onboarding-agent": "Workflow discovery, agent design, and integration",
  "research-swarm": "System decomposition, tooling, and evaluation",
  "governance-stack": "Risk modeling, evaluation design, and auditability",
};

export default function SelectedWork() {
  const [activeId, setActiveId] = useState("ops-pipeline");
  const [activeStep, setActiveStep] = useState(0);
  const active = flagshipCaseStudies.find((project) => project.id === activeId) ?? flagshipCaseStudies[0];

  const selectProject = (id: string) => {
    setActiveId(id);
    setActiveStep(0);
  };

  const handleProjectKeys = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % flagshipCaseStudies.length;
    if (event.key === "ArrowUp") next = (index - 1 + flagshipCaseStudies.length) % flagshipCaseStudies.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = flagshipCaseStudies.length - 1;
    selectProject(flagshipCaseStudies[next].id);
    document.getElementById(`project-tab-${flagshipCaseStudies[next].id}`)?.focus();
  };

  return (
    <section className="work section-rule" id="work">
      <div className="shell section-pad">
        <div className="section-intro section-intro-wide">
          <div>
            <p className="section-index">01 / Selected work</p>
            <h2>Systems that made it out of the demo.</h2>
          </div>
          <p>Five real systems, each shaped around the work people needed to get done and the evidence that shows what changed.</p>
        </div>

        <div className="workbench">
          <div className="project-tabs" role="tablist" aria-label="Selected projects" aria-orientation="vertical">
            {flagshipCaseStudies.map((project, index) => (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                type="button"
                role="tab"
                aria-selected={active.id === project.id}
                aria-controls={`project-panel-${project.id}`}
                tabIndex={active.id === project.id ? 0 : -1}
                onClick={() => selectProject(project.id)}
                onKeyDown={(event) => handleProjectKeys(event, index)}
              >
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-tab-copy"><strong>{project.short}</strong><small>{project.domain}</small></span>
                <ArrowIcon />
              </button>
            ))}
          </div>

          <article
            className="project-panel"
            id={`project-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${active.id}`}
          >
            <ProjectArtwork id={active.id} />
            <header className="project-heading">
              <div>
                <p className="section-index">{active.domain}</p>
                <h3>{active.short}</h3>
                <p>{active.oneLiner}</p>
              </div>
              <span className="project-status"><i aria-hidden="true" /> Deployed system</span>
            </header>

            <div className="project-brief">
              <div><h4>Problem</h4><p>{active.problem}</p></div>
              <div><h4>Discovery</h4><p>{active.discovery}</p></div>
              <div><h4>Role</h4><p>{roleByProject[active.id]}</p></div>
            </div>

            <div className="anatomy-block">
              <p className="section-index">System anatomy</p>
              <div className="anatomy-path" role="group" aria-label="System stages">
                {active.systemAnatomy.map((step, index) => (
                  <button
                    type="button"
                    key={`${active.id}-${step.title}`}
                    className="anatomy-step"
                    aria-pressed={activeStep === index}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="anatomy-dot" aria-hidden="true" />
                    <small>{step.kind}</small>
                    <strong>{step.title}</strong>
                  </button>
                ))}
              </div>
              <p className="step-detail" aria-live="polite">{active.systemAnatomy[activeStep].body}</p>
            </div>

            <div className="evidence-grid">
              <div><h4>Controls</h4><ul>{active.controls.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Proof</h4><ul>{active.proof.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>

            <div className="technology-line"><span>Technology</span>{active.stack.join("  ·  ")}</div>
          </article>
        </div>
        <p className="truth-note">{flagshipNote}</p>
      </div>
    </section>
  );
}
