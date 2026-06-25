import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MatrixRain({ count = 60 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 12 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      speeds[i] = 0.5 + Math.random() * 2;
    }
    return { positions, speeds };
  }, [count]);

  const posRef = useRef(positions.slice());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;

    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i] * delta * 2;
      if (pos[i * 3 + 1] < -8) {
        pos[i * 3 + 1] = 12;
        pos[i * 3] = (Math.random() - 0.5) * 20;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00ff41" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function DataGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.1;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.04 + Math.sin(time.current) * 0.02;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[30, 20, 20, 15]} />
      <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

function ScanLine() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.5;
    meshRef.current.position.y = 6 - ((time.current % 4) / 4) * 14;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + Math.sin(time.current * 5) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <planeGeometry args={[30, 0.05]} />
      <meshBasicMaterial color="#00ff41" transparent opacity={0.08} />
    </mesh>
  );
}

function TerminalCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.3;
    meshRef.current.rotation.x = time.current;
    meshRef.current.rotation.y = time.current * 0.7;
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[5, 0, -3]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function TerminalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <MatrixRain count={80} />
      <DataGrid />
      <ScanLine />
      <TerminalCube />
    </Canvas>
  );
}
