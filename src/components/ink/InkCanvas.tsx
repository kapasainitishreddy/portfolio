"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { inkFragmentShader, inkVertexShader } from "./inkShader";
import { useInk } from "./InkProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { InkPattern } from "@/data/projects";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";

const PATTERN_INDEX: Record<InkPattern, number> = {
  default: 0,
  network: 1,
  waves: 2,
  streams: 3,
  typography: 4,
  ledger: 5,
  graph: 6,
};

function InkPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const { intensity, paused, pattern } = useInk();
  const { mode } = useTheme();
  const tier = usePerformanceTier();

  // live interaction state held in refs to avoid re-renders
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mousePrev = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseVel = useRef(new THREE.Vector2(0, 0));
  const mouseStr = useRef(0);
  const ripple = useRef(new THREE.Vector2(0.5, 0.5));
  const rippleClock = useRef(99);
  const activity = useRef(0);
  const targetPattern = useRef(0);
  const currentPattern = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uMouseStr: { value: 0 },
      uRipple: { value: new THREE.Vector2(0.5, 0.5) },
      uRippleTime: { value: 99 },
      uActivity: { value: 0 },
      uIntensity: { value: 0.6 },
      uPattern: { value: 0 },
      uQuality: { value: 1 },
      uMode: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    targetPattern.current = PATTERN_INDEX[pattern] ?? 0;
  }, [pattern]);

  // pointer + scroll listeners
  useEffect(() => {
    let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;

    const onMove = (x: number, y: number) => {
      mouseTarget.current.set(x / window.innerWidth, 1 - y / window.innerHeight);
      mouseStr.current = 1;
    };
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => {
      ripple.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      rippleClock.current = 0;
      activity.current = Math.min(1, activity.current + 0.4);
    };
    const onLeave = () => (mouseStr.current = 0);
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      activity.current = Math.min(1, activity.current + Math.min(0.5, delta / 400));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    const u = mat.uniforms;

    // pause: freeze time advancement but keep last frame
    const dt = Math.min(delta, 0.05);
    if (!paused) u.uTime.value += dt;

    u.uResolution.value.set(size.width, size.height);
    u.uQuality.value = tier === "high" ? 1 : 0;
    // ease between dark (0) and light (1) palettes
    u.uMode.value = THREE.MathUtils.lerp(u.uMode.value, mode === "light" ? 1 : 0, 0.08);

    // ease pointer + presence, and derive a smoothed velocity for the wake
    mouse.current.lerp(mouseTarget.current, 0.06);
    const vx = (mouse.current.x - mousePrev.current.x) / dt;
    const vy = (mouse.current.y - mousePrev.current.y) / dt;
    mousePrev.current.copy(mouse.current);
    mouseVel.current.x = THREE.MathUtils.lerp(mouseVel.current.x, vx, 0.25);
    mouseVel.current.y = THREE.MathUtils.lerp(mouseVel.current.y, vy, 0.25);
    mouseStr.current = THREE.MathUtils.lerp(mouseStr.current, 0, 0.01);
    u.uMouse.value.copy(mouse.current);
    u.uMouseVel.value.set(
      paused ? 0 : mouseVel.current.x * intensity,
      paused ? 0 : mouseVel.current.y * intensity,
    );
    u.uMouseStr.value = paused ? 0 : mouseStr.current * intensity;

    // ripple
    rippleClock.current += dt;
    u.uRipple.value.copy(ripple.current);
    u.uRippleTime.value = paused ? 99 : rippleClock.current;

    // activity decays toward rest
    activity.current = THREE.MathUtils.lerp(activity.current, 0, 0.02);
    u.uActivity.value = paused ? 0 : activity.current * intensity;

    u.uIntensity.value = THREE.MathUtils.lerp(u.uIntensity.value, paused ? 0.12 : intensity, 0.05);

    // smooth pattern transitions
    currentPattern.current = THREE.MathUtils.lerp(currentPattern.current, targetPattern.current, 0.08);
    u.uPattern.value = currentPattern.current;
  });

  // full-screen triangle/quad in clip space
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={inkVertexShader}
        fragmentShader={inkFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function InkCanvas({ frameloop = "always" }: { frameloop?: "always" | "never" | "demand" }) {
  const tier = usePerformanceTier();
  return (
    <Canvas
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={tier === "high" ? [1, 1.75] : [1, 1]}
      orthographic
      camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
      style={{ width: "100%", height: "100%" }}
      // pause render loop when the tab is hidden to save GPU/battery
      frameloop={frameloop}
    >
      <InkPlane />
    </Canvas>
  );
}
