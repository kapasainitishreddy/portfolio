import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";

const reasons = [
  { title: "I can move between the customer and the code", body: "I am comfortable clarifying a vague workflow with stakeholders, then dropping into Python, SQL, APIs, agent behavior, debugging, and delivery details without losing the business objective." },
  { title: "I treat proof as part of the product", body: "I use working demos, measurable outcomes, evaluations, logs, tests, and acceptance criteria so progress is visible and claims can be checked." },
  { title: "I leave systems operable", body: "I care about runbooks, review points, failure handling, auditability, and handoff. A system is not finished if only the person who built it can understand or operate it." },
];

export default function WhyHireMe() {
  return (
    <Section id="why-hire-me" label="Why this combination matters">
      <Reveal><h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>Useful in the room where requirements, users, and implementation collide.</h2></Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {reasons.map((reason, index) => <Reveal key={reason.title} delay={index * 0.04}><article className="capability-card h-full p-6 md:p-7"><span className="font-mono-label" style={{ color: "var(--color-copper)" }}>0{index + 1}</span><h3 className="mt-3 font-serif text-2xl text-rice">{reason.title}</h3><p className="mt-3 leading-7 text-silver">{reason.body}</p></article></Reveal>)}
      </div>
    </Section>
  );
}
