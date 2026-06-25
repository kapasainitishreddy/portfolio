import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.05;
    meshRef.current.rotation.y = time.current;
    meshRef.current.rotation.x = time.current * 0.3;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function NebulaRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.2;
    meshRef.current.rotation.z = time.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <torusGeometry args={[8, 0.5, 16, 100]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.15} wireframe />
    </mesh>
  );
}

function FloatingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    meshRef.current.position.y = position[1] + Math.sin(time.current * 0.5) * 0.5;
    meshRef.current.rotation.x = time.current * 0.3;
    meshRef.current.rotation.y = time.current * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export default function StarField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <Stars count={3000} />
      <NebulaRing />
      <FloatingOrb position={[-4, 2, -3]} color="#a855f7" />
      <FloatingOrb position={[4, -1, -5]} color="#3b82f6" />
      <FloatingOrb position={[0, -3, -2]} color="#f59e0b" />
    </Canvas>
  );
}
