import type { ReactNode } from "react";

export function Section({ id, label, children, className = "" }: { id: string; label: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`content-pad mx-auto w-full max-w-7xl py-16 md:py-20 lg:py-24 ${className}`}>
      <p className="font-mono-label mb-4">{label}</p>
      {children}
    </section>
  );
}
