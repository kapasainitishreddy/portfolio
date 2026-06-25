import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function HexGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.05 + Math.sin(time.current * 0.5) * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 30, 1, 1);
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <primitive object={geometry} />
      <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

function NeuralNetwork({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const time = useRef(0);

  const { nodes, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      ));
    }

    const connections: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          connections.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    return { nodes, connections };
  }, [count]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x;
      arr[i * 3 + 1] = n.y;
      arr[i * 3 + 2] = n.z;
    });
    return arr;
  }, [nodes, count]);

  const linePositions = useMemo(() => new Float32Array(connections), [connections]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    time.current += delta * 0.2;
    pointsRef.current.rotation.y = time.current;
    linesRef.current.rotation.y = time.current;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#00f5ff" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function FloatingCube({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * speed;
    meshRef.current.rotation.x = time.current;
    meshRef.current.rotation.y = time.current * 0.7;
    meshRef.current.position.y = position[1] + Math.sin(time.current * 0.5) * 0.8;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function MouseTracker() {
  const { camera } = useThree();
  const sphereRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3());

  useFrame(({ mouse }) => {
    if (!sphereRef.current) return;
    targetPos.current.set(mouse.x * 8, mouse.y * 4, 0);
    currentPos.current.lerp(targetPos.current, 0.05);
    sphereRef.current.position.copy(currentPos.current);
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} />
    </mesh>
  );
}

export default function CyberpunkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <NeuralNetwork count={50} />
      <HexGrid />
      <FloatingCube position={[-6, 2, -3]} color="#00f5ff" speed={0.4} />
      <FloatingCube position={[6, -1, -4]} color="#bf00ff" speed={0.3} />
      <FloatingCube position={[0, 3, -5]} color="#ff6b35" speed={0.5} />
      <MouseTracker />
    </Canvas>
  );
}
