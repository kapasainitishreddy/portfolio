import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import SkillsGraph from "@/components/skills/SkillsGraph";

export default function Skills() {
  return (
    <Section id="skills" label="Skills & Capabilities">
      <Reveal>
        <h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
          A connected map of how I work across intelligence, data, decentralized systems and graphs.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12">
          <SkillsGraph />
        </div>
      </Reveal>
    </Section>
  );
}
