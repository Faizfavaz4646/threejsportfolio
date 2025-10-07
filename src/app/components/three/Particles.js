"use client";
import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Particles() {
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3); // 5000 particles
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 20; // spread in space
    }
    return positions;
  }, []);

  return (
    <group>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6" // blue
          size={0.05}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
