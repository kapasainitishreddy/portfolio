import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InkStrokes({ count = 20 }: { count?: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const times = useRef<number[]>(Array.from({ length: count }, () => Math.random() * 10));

  const strokes = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      rotation: [0, 0, (Math.random() - 0.5) * Math.PI * 0.5] as [number, number, number],
      scale: [0.05 + Math.random() * 0.08, 1 + Math.random() * 3, 0.05] as [number, number, number],
      color: i % 4 === 0 ? "#b8860b" : i % 4 === 1 ? "#8b6914" : i % 4 === 2 ? "#d4a017" : "#1a1a1a",
      opacity: 0.1 + Math.random() * 0.3,
    })),
    [count]
  );

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      times.current[i] += delta * 0.1;
      (mesh.material as THREE.MeshBasicMaterial).opacity =
        strokes[i].opacity * (0.5 + Math.sin(times.current[i]) * 0.5);
    });
  });

  return (
    <>
      {strokes.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={s.position}
          rotation={s.rotation}
          scale={s.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={s.color} transparent opacity={s.opacity} />
        </mesh>
      ))}
    </>
  );
}

function FloatingKanji() {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    time.current += delta * 0.05;
    groupRef.current.rotation.y = Math.sin(time.current) * 0.2;
    groupRef.current.position.y = Math.sin(time.current * 0.7) * 0.5;
  });

  return (
    <group ref={groupRef} position={[4, 0, -3]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, (i - 1) * 1.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshBasicMaterial color="#b8860b" transparent opacity={0.15} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function InkParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.03;
    meshRef.current.rotation.y = time.current;
    meshRef.current.rotation.x = time.current * 0.3;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#b8860b" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function InkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <InkStrokes count={15} />
      <FloatingKanji />
      <InkParticles count={150} />
    </Canvas>
  );
}
