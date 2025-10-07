"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";


export default function Stars() {
  const pointsRef = useRef();

  // Create 200 random points in 3D space
  const positions = new Float32Array(200 * 3).map(() => (Math.random() - 0.5) * 20);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.001; // slow rotation
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}
