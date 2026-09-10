"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MathUtils, type Group } from "three";

const sectionIds = [
  "home",
  "ask-nitish",
  "featured-work",
  "private-builds",
  "novels",
  "ai-universe",
  "ai-safety",
  "experience",
  "about",
  "contact",
] as const;

function Scene({ activeIndex, reduced }: { activeIndex: number; reduced: boolean }) {
  const group = useRef<Group>(null);
  const phaseRef = useRef(0);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;

    const time = state.clock.elapsedTime;
    const targetX = ((activeIndex % 4) - 1.5) * 0.34;
    const targetY = ((activeIndex % 3) - 1) * 0.22;
    const targetPhase = (activeIndex % 5) * 0.37;
    const targetScale = 1 + (activeIndex % 3) * 0.035;

    phaseRef.current = MathUtils.damp(phaseRef.current, targetPhase, 2.4, delta);
    const phase = phaseRef.current;

    group.current.position.x = MathUtils.damp(group.current.position.x, targetX, 1.8, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, targetY, 1.8, delta);
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      phase * 0.35 + Math.sin(time * 0.09) * 0.04,
      2.1,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      Math.sin(time * 0.18 + phase) * 0.16,
      2.4,
      delta,
    );
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      Math.cos(time * 0.12 + phase) * 0.08,
      2.4,
      delta,
    );

    const nextScale = MathUtils.damp(group.current.scale.x, targetScale, 2.2, delta);
    group.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={group}>
      <mesh position={[-1.65, 0.5, -0.7]} rotation={[0.3, 0.4, 0]} scale={0.86}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#c79a72" wireframe transparent opacity={0.13} />
      </mesh>

      <mesh position={[1.485, -0.45, -1.2]} rotation={[1.05, 0.1, 0.2]}>
        <torusGeometry args={[1.08, 0.018, 8, 96]} />
        <meshBasicMaterial color="#d9d7d2" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0.45, 1.55, -2]} rotation={[0.2, 0, 0.35]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color="#9ea3aa" wireframe transparent opacity={0.09} />
      </mesh>

      <mesh position={[-0.4, -1.7, -2.3]} rotation={[1.4, 0, 0]}>
        <torusKnotGeometry args={[0.58, 0.012, 96, 8, 2, 3]} />
        <meshBasicMaterial color="#c79a72" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function PortfolioThreeLayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = sectionIds
      .map((id, index) => ({ index, element: document.getElementById(id) }))
      .filter((entry): entry is { index: number; element: HTMLElement } => Boolean(entry.element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const nextIndex = sectionIds.indexOf(visible.target.id as (typeof sectionIds)[number]);
        if (nextIndex >= 0) setActiveIndex(nextIndex);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.01, 0.18, 0.42] },
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (reduceMotion) {
    return (
      <div className="portfolio-three-layer" aria-hidden="true" role="presentation">
        <div className="portfolio-three-layer__fallback" />
      </div>
    );
  }

  return (
    <div className="portfolio-three-layer" aria-hidden="true" role="presentation">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 44 }}
        dpr={[1, 1.25]}
        frameloop="always"
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        fallback={<div className="portfolio-three-layer__fallback" />}
      >
        <Scene activeIndex={activeIndex} reduced={false} />
      </Canvas>
    </div>
  );
}
