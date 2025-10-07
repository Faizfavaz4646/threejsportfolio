"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";


export default function CubeIntro({ onFinished }) {
  const meshRef = useRef();
  const [finished, setFinished] = useState(false);

  // Animation settings
  const startZ = -10;
  const endZ = 0;
  const speed = 0.09;

  useFrame(() => {
    if (!meshRef.current || finished) return;

    //rotation
    meshRef.current.rotation.x += 0.02
    meshRef.current.rotation.y += 0.03

    // Move cube forward
    if (meshRef.current.position.z < endZ) {
      meshRef.current.position.z += speed;
      meshRef.current.scale.x += 0.05;
      meshRef.current.scale.y += 0.05;
      meshRef.current.scale.z += 0.05;
    } else {
      // Fade out
      meshRef.current.material.opacity -= 0.02;

      if (meshRef.current.material.opacity <= 0) {
        setFinished(true);
        if (onFinished) onFinished(); // trigger callback
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, startZ]} scale={[0.2, 0.2, 0.2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" transparent opacity={1} />
    </mesh>
  );
}
