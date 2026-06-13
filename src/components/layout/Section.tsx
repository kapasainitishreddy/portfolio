import Reveal from "./Reveal";

export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`content-pad mx-auto w-full max-w-7xl scroll-mt-24 py-24 md:py-32 ${className}`}
    >
      {label && (
        <Reveal>
          <p className="font-mono-label mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-silver)" }} />
            {label}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
