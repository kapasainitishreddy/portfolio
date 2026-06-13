"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups, type SkillGroup, type SkillGroupId } from "@/data/skills";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

const VIEW_W = 1000;
const VIEW_H = 720;
const HUB = { x: VIEW_W / 2, y: VIEW_H / 2 };

const GROUP_CENTERS: Record<SkillGroupId, { x: number; y: number; spread: [number, number] }> = {
  ai: { x: 270, y: 210, spread: [180, 300] },
  data: { x: 730, y: 210, spread: [-120, 60] },
  blockchain: { x: 270, y: 520, spread: [60, 180] },
  networks: { x: 730, y: 520, spread: [-60, -180] },
};

interface SkillNode {
  group: SkillGroupId;
  label: string;
  x: number;
  y: number;
}

function layout() {
  const skillNodes: SkillNode[] = [];
  for (const g of skillGroups) {
    const center = GROUP_CENTERS[g.id];
    const [a0, a1] = center.spread;
    const n = g.skills.length;
    g.skills.forEach((label, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const angle = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
      const radius = 120 + (i % 2) * 46;
      skillNodes.push({
        group: g.id,
        label,
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
      });
    });
  }
  return skillNodes;
}

export default function SkillsGraph() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<SkillGroupId | null>(null);
  const skillNodes = useMemo(layout, []);
  const activeGroup: SkillGroup | undefined = skillGroups.find((g) => g.id === active);

  const groupColor = (id: SkillGroupId) =>
    id === "ai"
      ? "var(--color-indigo)"
      : id === "data"
        ? "var(--color-silver)"
        : id === "blockchain"
          ? "var(--color-copper)"
          : "var(--color-rice)";

  const dim = (id: SkillGroupId) => active !== null && active !== id;

  return (
    <div>
      {/* Graph (md and up) */}
      <div className="relative hidden md:block">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Interactive network of capabilities. Four hubs (Artificial Intelligence, Data Science, Blockchain and Network Analysis), each connected to their skills."
        >
          {/* hub-to-group spokes */}
          {skillGroups.map((g) => {
            const c = GROUP_CENTERS[g.id];
            return (
              <line
                key={`spoke-${g.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={c.x}
                y2={c.y}
                stroke="color-mix(in srgb, var(--color-silver) 26%, transparent)"
                strokeWidth={1}
                opacity={dim(g.id) ? 0.15 : 0.6}
              />
            );
          })}

          {/* group-to-skill edges */}
          {skillNodes.map((s, i) => {
            const c = GROUP_CENTERS[s.group];
            return (
              <line
                key={`edge-${i}`}
                x1={c.x}
                y1={c.y}
                x2={s.x}
                y2={s.y}
                stroke={groupColor(s.group)}
                strokeWidth={0.8}
                opacity={dim(s.group) ? 0.06 : 0.3}
              />
            );
          })}

          {/* central hub */}
          <circle cx={HUB.x} cy={HUB.y} r={7} fill="var(--color-soft)" />
          <text
            x={HUB.x}
            y={HUB.y - 16}
            textAnchor="middle"
            className="font-mono-label"
            fill="var(--color-silver)"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            CORE
          </text>

          {/* skill nodes */}
          {skillNodes.map((s, i) => (
            <motion.g
              key={`node-${i}`}
              initial={false}
              animate={
                reduced
                  ? {}
                  : { y: [0, (i % 3) - 1, 0] }
              }
              transition={
                reduced ? {} : { duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut" }
              }
              style={{ opacity: dim(s.group) ? 0.2 : 1, transition: "opacity 0.3s" }}
            >
              <circle cx={s.x} cy={s.y} r={3.2} fill={groupColor(s.group)} />
              <text
                x={s.x}
                y={s.y - 8}
                textAnchor="middle"
                fill="var(--color-silver)"
                style={{ fontSize: 12, fontFamily: "var(--font-sans)" }}
              >
                {s.label}
              </text>
            </motion.g>
          ))}

          {/* group hubs (interactive) */}
          {skillGroups.map((g) => {
            const c = GROUP_CENTERS[g.id];
            return (
              <g
                key={`group-${g.id}`}
                tabIndex={0}
                role="button"
                aria-pressed={active === g.id}
                aria-label={`${g.label}. ${g.blurb}`}
                onMouseEnter={() => setActive(g.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(g.id)}
                onBlur={() => setActive(null)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={active === g.id ? 16 : 12}
                  fill={groupColor(g.id)}
                  style={{ transition: "r 0.25s" }}
                />
                <circle cx={c.x} cy={c.y} r={22} fill="transparent" stroke={groupColor(g.id)} strokeOpacity={0.4} />
                <text
                  x={c.x}
                  y={c.y + 40}
                  textAnchor="middle"
                  className="font-serif"
                  fill="var(--color-rice)"
                  style={{ fontSize: 18 }}
                >
                  {g.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* blurb panel */}
        <div className="surface mx-auto mt-6 min-h-[72px] max-w-2xl px-6 py-4 text-center" aria-live="polite">
          {activeGroup ? (
            <>
              <span className="font-serif text-lg text-rice">{activeGroup.label}. </span>
              <span className="text-silver">{activeGroup.blurb}</span>
            </>
          ) : (
            <span className="text-silver">
              Hover or focus a hub to explore each capability and the tools around it.
            </span>
          )}
        </div>
      </div>

      {/* Accessible list / mobile view */}
      <div className="space-y-8 md:hidden">
        {skillGroups.map((g) => (
          <div key={g.id} className="surface p-5">
            <h3 className="font-serif text-xl text-rice">{g.label}</h3>
            <p className="mt-1 text-sm text-silver">{g.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li
                  key={s}
                  className="font-mono-label rounded-full px-3 py-1"
                  style={{ background: "color-mix(in srgb, var(--color-silver) 10%, transparent)", textTransform: "none", letterSpacing: "0.02em" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
