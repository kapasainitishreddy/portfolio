"use client";

import { whyHireMe } from "@/data/personality";
import Reveal from "@/components/layout/Reveal";
import ModeToggle from "./ModeToggle";
import { useMode } from "@/components/theme/ModeContext";

export default function WhyHireMe() {
  const { mode } = useMode();
  const content = mode === "hire-me" ? whyHireMe.hireMeMode : whyHireMe.humble;

  return (
    <section id="why-hire-me" className="space-y-12">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif text-rice">{content.heading}</h2>
            <p className="max-w-2xl text-silver">{content.intro}</p>
          </div>
          <ModeToggle />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {content.traits.map((trait, idx) => (
          <Reveal key={trait.title} delay={idx * 0.08}>
            <div className="group rounded-lg border border-charcoal bg-charcoal/40 p-6 transition-all hover:border-accent hover:bg-charcoal/60">
              <h3 className="font-serif text-lg text-rice group-hover:text-soft transition-colors mb-2">
                {trait.title}
              </h3>
              <p className="text-sm text-silver/80 group-hover:text-silver">{trait.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
