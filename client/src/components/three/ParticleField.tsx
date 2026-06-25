import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  secondaryColor?: string;
  speed?: number;
  spread?: number;
}

function Particles({ count = 2000, color = "#00f5ff", secondaryColor = "#bf00ff", speed = 0.3, spread = 30 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(color);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      const mix = Math.random();
      const c = c1.clone().lerp(c2, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count, color, secondaryColor, spread]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * speed;
    meshRef.current.rotation.y = time.current * 0.05;
    meshRef.current.rotation.x = Math.sin(time.current * 0.03) * 0.1;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx + 1] += Math.sin(time.current + i * 0.01) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingGeometry({ color = "#00f5ff" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    meshRef.current.rotation.x = time.current * 0.3;
    meshRef.current.rotation.y = time.current * 0.5;
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function ParticleField({ count = 2000, color = "#00f5ff", secondaryColor = "#bf00ff", speed = 0.3, spread = 30 }: ParticleFieldProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <Particles count={count} color={color} secondaryColor={secondaryColor} speed={speed} spread={spread} />
      <FloatingGeometry color={color} />
    </Canvas>
  );
}
