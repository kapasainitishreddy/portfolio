import { ArrowIcon } from "@/components/layout/icons";

export default function ProjectPreview({ projectId }: { projectId: string }) {
  if (projectId === "fde-support-copilot") return <SupportCopilotPreview />;
  if (projectId === "fde-data-pipeline") return <DataPipelinePreview />;
  if (projectId === "fde-onboarding-agent") return <OnboardingAgentPreview />;
  return null;
}

function SupportCopilotPreview() {
  return (
    <div className="project-preview project-preview--support" aria-hidden="true">
      <div className="project-preview__windowbar">
        <span />
        <span />
        <span />
        <small>Support Copilot</small>
      </div>
      <div className="project-preview__support-grid">
        <div className="project-preview__bot-mark">AI</div>
        <div className="project-preview__bubble">
          <strong>Grounded answer</strong>
          <p>Here is the setup path based on your workspace docs.</p>
          <span className="project-preview__citation">↗ Source · Help Center</span>
        </div>
      </div>
      <div className="project-preview__handoff">
        <span className="project-preview__status-dot" />
        Human review available
        <span className="project-preview__handoff-action">Escalate</span>
      </div>
    </div>
  );
}

function DataPipelinePreview() {
  const stages = [
    ["01", "Sources"],
    ["02", "Transform"],
    ["03", "Validate"],
    ["04", "Dashboard"],
  ] as const;

  return (
    <div className="project-preview project-preview--pipeline" aria-hidden="true">
      <div className="project-preview__pipeline-head">
        <span>Production pipeline</span>
        <span className="project-preview__healthy">● Healthy</span>
      </div>
      <div className="project-preview__pipeline-flow">
        {stages.map(([number, label], index) => (
          <div className="project-preview__pipeline-step" key={label}>
            <span className="project-preview__pipeline-number">{number}</span>
            <strong>{label}</strong>
            <small>{index === 2 ? "checks passed" : index === 3 ? "live" : "synced"}</small>
            {index < stages.length - 1 && <ArrowIcon className="project-preview__pipeline-arrow" width={14} height={14} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingAgentPreview() {
  return (
    <div className="project-preview project-preview--onboarding" aria-hidden="true">
      <div className="project-preview__steps">
        <div className="project-preview__step project-preview__step--done"><span>✓</span><p><strong>Workspace</strong><small>Connected</small></p></div>
        <div className="project-preview__step project-preview__step--done"><span>✓</span><p><strong>Preferences</strong><small>Validated</small></p></div>
        <div className="project-preview__step project-preview__step--active"><span>3</span><p><strong>Provision</strong><small>Needs approval</small></p></div>
      </div>
      <div className="project-preview__guide">
        <span className="project-preview__agent-label">Agent</span>
        <p>I have everything needed. A person approves the final provisioning step.</p>
        <span className="project-preview__approval">Human approval required</span>
      </div>
    </div>
  );
}
