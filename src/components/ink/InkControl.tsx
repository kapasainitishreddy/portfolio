"use client";

import { useState } from "react";
import { useInk } from "./InkProvider";
import { PauseIcon, PlayIcon, WaveIcon } from "@/components/layout/icons";

/**
 * Ink-intensity control: an accessible slider plus a pause toggle so visitors
 * can calm or stop the moving ink entirely.
 */
export default function InkControl() {
  const { intensity, setIntensity, paused, togglePaused } = useInk();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Ink controls"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full border text-silver transition-colors hover:text-rice"
        style={{ borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
      >
        <WaveIcon />
      </button>

      {open && (
        <div
          className="surface absolute right-0 top-11 z-50 w-56 p-4"
          role="dialog"
          aria-label="Ink controls"
        >
          <div className="font-mono-label mb-3">Ink intensity</div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            aria-label="Ink intensity"
            className="w-full accent-[var(--color-indigo)]"
            disabled={paused}
          />
          <button
            type="button"
            onClick={togglePaused}
            aria-pressed={paused}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)]"
            style={{ borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
          >
            {paused ? <PlayIcon width={16} height={16} /> : <PauseIcon width={16} height={16} />}
            {paused ? "Resume ink" : "Pause ink"}
          </button>
        </div>
      )}
    </div>
  );
}
