"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeArtifactProps = {
  variant: string;
  mode?: "hero" | "project";
  className?: string;
};

const labels: Record<string, string> = {
  "writer-core": "An open-book-inspired 3D system object with a crystalline engineering core.",
  "support-copilot": "A 3D evidence core with orbiting review signals.",
  "ops-pipeline": "A 3D pipeline with connected processing nodes.",
  "onboarding-agent": "A 3D state machine represented by nested frames and a live core.",
  "research-swarm": "A 3D research swarm with a central synthesis object and satellite agents.",
  "governance-stack": "A 3D governance object with layered control rings around a protected core.",
};

export default function ThreeArtifact({
  variant,
  mode = "project",
  className = "",
}: ThreeArtifactProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: any;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      mount.dataset.webgl = "fallback";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(mode === "hero" ? 36 : 38, 1, 0.1, 100);
    camera.position.set(0, mode === "hero" ? 0.05 : 0.1, mode === "hero" ? 6.6 : 6.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const sceneRoot = new THREE.Group();
    scene.add(sceneRoot);

    const ambient = new THREE.HemisphereLight(0xb9dcff, 0x080b10, 1.8);
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3.5, 4.5, 5.5);
    const rim = new THREE.PointLight(0x79baff, 18, 10, 2);
    rim.position.set(-3, 1.5, 3);
    scene.add(ambient, key, rim);

    const metal = new THREE.MeshPhysicalMaterial({
      color: 0x34485c,
      metalness: 0.72,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.16,
    });
    const silver = new THREE.MeshPhysicalMaterial({
      color: 0xb8cad9,
      metalness: 0.62,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x7da9c9,
      metalness: 0.15,
      roughness: 0.16,
      transparent: true,
      opacity: 0.42,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const glow = new THREE.MeshStandardMaterial({
      color: 0xc9e8ff,
      emissive: 0x5eaaf0,
      emissiveIntensity: 1.25,
      metalness: 0.25,
      roughness: 0.18,
    });

    const lineMaterial = () =>
      new THREE.LineBasicMaterial({
        color: 0x9fc8e8,
        transparent: true,
        opacity: 0.36,
      });

    const spinning: Array<{ object: any; x: number; y: number; z: number }> = [];

    const addEdges = (mesh: any, opacity = 0.34) => {
      const material = lineMaterial();
      material.opacity = opacity;
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), material);
      mesh.add(edge);
    };

    const addMesh = (
      geometry: any,
      material: any,
      position: [number, number, number] = [0, 0, 0],
      rotation: [number, number, number] = [0, 0, 0]
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      sceneRoot.add(mesh);
      return mesh;
    };

    const addNode = (x: number, y: number, z: number, scale = 1) =>
      addMesh(new THREE.SphereGeometry(0.105 * scale, 18, 18), glow, [x, y, z]);

    const addLine = (
      from: [number, number, number],
      to: [number, number, number],
      opacity = 0.3
    ) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
      ]);
      const material = lineMaterial();
      material.opacity = opacity;
      const line = new THREE.Line(geometry, material);
      sceneRoot.add(line);
    };

    const addRing = (
      radius: number,
      tube: number,
      rotation: [number, number, number],
      material = glass
    ) =>
      addMesh(new THREE.TorusGeometry(radius, tube, 10, 112), material, [0, 0, 0], rotation);

    if (variant === "writer-core") {
      const left = addMesh(
        new THREE.BoxGeometry(1.65, 2.2, 0.08),
        metal,
        [-0.82, 0, 0],
        [-0.06, 0.48, -0.04]
      );
      const right = addMesh(
        new THREE.BoxGeometry(1.65, 2.2, 0.08),
        metal,
        [0.82, 0, 0],
        [-0.06, -0.48, 0.04]
      );
      addEdges(left, 0.5);
      addEdges(right, 0.5);

      const core = addMesh(new THREE.IcosahedronGeometry(0.62, 2), glow, [0, 0.05, 0.55]);
      addEdges(core, 0.6);
      spinning.push({ object: core, x: 0.0014, y: 0.0022, z: 0.0007 });

      const ringA = addRing(1.25, 0.018, [1.08, 0.18, 0.18], silver);
      const ringB = addRing(1.48, 0.012, [0.55, 0.78, -0.36], glass);
      spinning.push({ object: ringA, x: 0, y: 0.001, z: 0.0015 });
      spinning.push({ object: ringB, x: 0.0009, y: -0.0011, z: 0 });

      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2;
        addNode(
          Math.cos(angle) * 1.62,
          Math.sin(angle) * 0.82,
          -0.15 + Math.sin(angle * 2) * 0.22,
          0.65
        );
      }
    } else if (variant === "ops-pipeline") {
      const pipe = addMesh(
        new THREE.CylinderGeometry(0.09, 0.09, 4.5, 18),
        glass,
        [0, -0.05, 0],
        [0, 0, Math.PI / 2]
      );
      addEdges(pipe, 0.28);

      [-2, -1, 0, 1, 2].forEach((x, index) => {
        const node = addMesh(
          new THREE.OctahedronGeometry(index === 2 ? 0.42 : 0.3, 1),
          index === 2 ? glow : silver,
          [x, index % 2 === 0 ? 0.14 : -0.14, 0]
        );
        addEdges(node, 0.48);
        spinning.push({
          object: node,
          x: 0.001 + index * 0.00015,
          y: 0.0015,
          z: 0.0007,
        });
      });

      addLine([-2.25, 0.7, -0.25], [2.25, 0.7, -0.25], 0.2);
      addLine([-2.25, -0.72, 0.2], [2.25, -0.72, 0.2], 0.14);
    } else if (variant === "onboarding-agent") {
      const outer = addMesh(
        new THREE.BoxGeometry(2.35, 2.35, 2.35),
        glass,
        [0, 0, 0],
        [0.12, 0.35, 0]
      );
      const inner = addMesh(
        new THREE.BoxGeometry(1.45, 1.45, 1.45),
        metal,
        [0, 0, 0],
        [-0.12, -0.2, 0.08]
      );
      addEdges(outer, 0.6);
      addEdges(inner, 0.45);
      const core = addMesh(new THREE.SphereGeometry(0.38, 28, 28), glow);
      spinning.push({ object: outer, x: 0.0008, y: 0.0012, z: 0.0004 });
      spinning.push({ object: inner, x: -0.001, y: -0.0014, z: 0.0005 });
      spinning.push({ object: core, x: 0.0016, y: 0.002, z: 0 });
    } else if (variant === "research-swarm") {
      const core = addMesh(new THREE.DodecahedronGeometry(0.72, 1), metal);
      addEdges(core, 0.56);
      spinning.push({ object: core, x: 0.0011, y: 0.0018, z: 0.0005 });

      for (let i = 0; i < 6; i += 1) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.85;
        const y = Math.sin(angle) * 1.15;
        const z = Math.sin(angle * 2) * 0.35;
        addNode(x, y, z, i === 0 ? 1.2 : 0.9);
        addLine([0, 0, 0], [x, y, z], 0.27);
      }

      const ring = addRing(1.9, 0.012, [1.15, 0.1, 0.18], glass);
      spinning.push({ object: ring, x: 0, y: 0.0007, z: -0.001 });
    } else {
      const core = addMesh(new THREE.OctahedronGeometry(0.78, 2), metal);
      addEdges(core, 0.62);
      const inner = addMesh(new THREE.IcosahedronGeometry(0.34, 1), glow);
      const ringA = addRing(1.35, 0.035, [1.05, 0.12, 0.1], silver);
      const ringB = addRing(1.62, 0.016, [0.16, 1.18, 0.48], glass);

      spinning.push({ object: core, x: 0.0008, y: 0.0014, z: 0.0004 });
      spinning.push({ object: inner, x: -0.0012, y: -0.0018, z: 0.0007 });
      spinning.push({ object: ringA, x: 0.0006, y: 0, z: 0.001 });
      spinning.push({ object: ringB, x: 0, y: -0.0007, z: 0.0005 });

      const points: Array<[number, number, number]> = [
        [-1.75, 0.9, 0.1],
        [1.7, 0.75, -0.2],
        [-1.45, -1.0, -0.1],
        [1.55, -0.95, 0.18],
      ];
      points.forEach(([x, y, z]) => {
        addNode(x, y, z, 0.75);
        addLine([0, 0, 0], [x, y, z], 0.2);
      });
    }

    const grid = new THREE.GridHelper(mode === "hero" ? 7 : 6.5, 18, 0x31506a, 0x18232e);
    grid.position.y = -1.75;
    (grid.material as any).transparent = true;
    (grid.material as any).opacity = 0.13;
    sceneRoot.add(grid);

    sceneRoot.rotation.x = mode === "hero" ? -0.04 : 0.03;
    sceneRoot.rotation.y = mode === "hero" ? -0.08 : 0.12;

    let targetX = 0;
    let targetY = 0;
    let visible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(mount);

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    if (!reducedMotion) {
      renderer.setAnimationLoop(() => {
        if (!visible) return;
        const elapsed = (performance.now() - start) / 1000;

        sceneRoot.rotation.y +=
          (targetX * 0.12 + Math.sin(elapsed * 0.22) * 0.08 - sceneRoot.rotation.y) * 0.035;
        sceneRoot.rotation.x +=
          (-targetY * 0.07 + Math.cos(elapsed * 0.28) * 0.018 - sceneRoot.rotation.x) * 0.035;
        sceneRoot.position.y = Math.sin(elapsed * 0.55) * 0.045;

        spinning.forEach(({ object, x, y, z }) => {
          object.rotation.x += x;
          object.rotation.y += y;
          object.rotation.z += z;
        });

        renderer.render(scene, camera);
      });
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      scene.traverse((object: any) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) {
          object.material.forEach((material: any) => material?.dispose?.());
        } else {
          object.material?.dispose?.();
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [variant, mode]);

  return (
    <div
      className={`three-artifact three-artifact-${mode} ${className}`.trim()}
      role="img"
      aria-label={labels[variant] ?? "Interactive 3D system object."}
    >
      <div className="three-artifact-fallback" aria-hidden="true" />
      <div ref={mountRef} className="three-artifact-mount" />
    </div>
  );
}
