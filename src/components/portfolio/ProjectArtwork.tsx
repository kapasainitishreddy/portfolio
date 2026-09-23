import ThreeArtifact from "./ThreeArtifact";

type ProjectArtworkProps = { id: string };

const names: Record<string, string> = {
  "support-copilot": "Support Copilot",
  "ops-pipeline": "Ops Pipeline",
  "onboarding-agent": "Onboarding Agent",
  "research-swarm": "Research Swarm",
  "governance-stack": "Governance Stack",
};

const descriptors: Record<string, string> = {
  "support-copilot": "evidence + human review",
  "ops-pipeline": "ingest + reconcile + deliver",
  "onboarding-agent": "state + orchestration",
  "research-swarm": "agents + synthesis",
  "governance-stack": "controls + auditability",
};

export default function ProjectArtwork({ id }: ProjectArtworkProps) {
  return (
    <figure className="project-artwork three-project-artwork">
      <div className="three-project-stage">
        <ThreeArtifact variant={id} mode="project" />
        <div className="three-project-meta" aria-hidden="true">
          <span>INTERACTIVE SYSTEM STUDY</span>
          <small>{descriptors[id] ?? "system architecture"}</small>
        </div>
      </div>
      <figcaption>
        <span>THREE.JS / 3D</span>
        {names[id] ?? id.replaceAll("-", " ")}
      </figcaption>
    </figure>
  );
}
