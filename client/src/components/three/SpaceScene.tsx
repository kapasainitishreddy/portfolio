import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Galaxy({ count = 5000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 15 + 1;
      const spinAngle = radius * 3;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixRatio = radius / 15;
      const innerColor = new THREE.Color("#f59e0b");
      const outerColor = new THREE.Color("#a855f7");
      const c = innerColor.clone().lerp(outerColor, mixRatio);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.05;
    meshRef.current.rotation.y = time.current;
  });

  return (
    <points ref={meshRef} position={[0, -2, -5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Wormhole() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * 0.3;
    meshRef.current.rotation.z = time.current;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.1 + Math.sin(time.current * 2) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -8]}>
      <torusGeometry args={[3, 0.3, 8, 60]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.15} wireframe />
    </mesh>
  );
}

function SpaceDebris({ count = 30 }: { count?: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const times = useRef<number[]>(Array.from({ length: count }, () => Math.random() * 10));
  const speeds = useRef<number[]>(Array.from({ length: count }, () => 0.2 + Math.random() * 0.5));

  const positions = useMemo(() =>
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number]),
    [count]
  );

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      times.current[i] += delta * speeds.current[i];
      mesh.rotation.x = times.current[i];
      mesh.rotation.y = times.current[i] * 0.7;
      mesh.position.y = positions[i][1] + Math.sin(times.current[i] * 0.3) * 0.5;
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={pos}
        >
          <tetrahedronGeometry args={[0.1 + Math.random() * 0.2, 0]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#3b82f6" : "#f59e0b"}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
}

export default function SpaceScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 70 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <Galaxy count={4000} />
      <Wormhole />
      <SpaceDebris count={25} />
    </Canvas>
  );
}
