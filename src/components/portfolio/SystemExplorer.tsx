"use client";

import { useState } from "react";
import { flagshipCaseStudies } from "@/data/flagshipCaseStudies";

export default function SystemExplorer() {
  const [activeId, setActiveId] = useState(flagshipCaseStudies[0].id);
  const activeIndex = flagshipCaseStudies.findIndex((item) => item.id === activeId);
  const active = flagshipCaseStudies[activeIndex] ?? flagshipCaseStudies[0];

  const handleKeys = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? flagshipCaseStudies.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + flagshipCaseStudies.length) % flagshipCaseStudies.length;
    setActiveId(flagshipCaseStudies[next].id);
    document.getElementById(`system-project-${flagshipCaseStudies[next].id}`)?.focus();
  };

  return (
    <section className="systems section-rule" id="systems">
      <div className="shell section-pad explorer-shell">
        <header className="explorer-heading">
          <div>
            <p className="section-index">03 / System Explorer</p>
            <h2>See how the systems connect.</h2>
          </div>
          <p>Different problems share the same operating principles: clear inputs, visible decisions, and outcomes a team can own.</p>
        </header>

        <div className="explorer-console">
          <div className="explorer-project-list" role="tablist" aria-label="Portfolio systems" aria-orientation="vertical">
            {flagshipCaseStudies.map((project, index) => (
              <button
                key={project.id}
                id={`system-project-${project.id}`}
                type="button"
                role="tab"
                aria-selected={active.id === project.id}
                aria-controls="system-inspector"
                tabIndex={active.id === project.id ? 0 : -1}
                onClick={() => setActiveId(project.id)}
                onKeyDown={(event) => handleKeys(event, index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.short}</strong>
                <small>{project.oneLiner}</small>
              </button>
            ))}
          </div>

          <div className="system-assembly" aria-label="Five portfolio projects connected through shared operating principles">
            <svg className="assembly-lines" viewBox="0 0 600 500" aria-hidden="true">
              <circle cx="300" cy="250" r="166" />
              <circle cx="300" cy="250" r="116" />
              <path d="M300 250L300 50M300 250L528 168M300 250L450 430M300 250L150 430M300 250L72 168" />
              <path d="M300 50C405 85 475 115 528 168M528 168C530 270 502 372 450 430M450 430C348 480 252 480 150 430M150 430C98 340 76 258 72 168M72 168C128 97 209 60 300 50" />
            </svg>
            <div className="assembly-core"><span>SHARED METHOD</span><strong>Build<br />with evidence</strong><i /></div>
            {flagshipCaseStudies.map((project, index) => (
              <button
                className={`assembly-node assembly-node-${index + 1}${active.id === project.id ? " is-active" : ""}`}
                key={project.id}
                type="button"
                onClick={() => setActiveId(project.id)}
                aria-label={`Inspect ${project.short}`}
                aria-pressed={active.id === project.id}
              >
                <i aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.short}</strong>
              </button>
            ))}
          </div>

          <article className="domain-inspector" id="system-inspector" role="tabpanel" aria-labelledby={`system-project-${active.id}`}>
            <p className="section-index">Selected system / {String(activeIndex + 1).padStart(2, "0")}</p>
            <h3>{active.short}</h3>
            <p>{active.oneLiner}</p>
            <h4>Evidence</h4>
            <ul>{active.proof.map((item) => <li key={item}>{item}</li>)}</ul>
            <h4>System controls</h4>
            <ul>{active.controls.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="inspector-tech">{active.stack.join(" · ")}</p>
          </article>
        </div>

        <div className="assembly-legend"><span><i /> People stay in control</span><span><i /> Evidence remains inspectable</span><span><i /> Outcomes stay measurable</span></div>
      </div>
    </section>
  );
}
