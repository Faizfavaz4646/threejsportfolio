"use client";
import React from "react";
import { Text } from "@react-three/drei";

export default function FloatingText() {
  return (
    <group position={[0, 1.5, 0]}>
      {/* Name */}
      <Text
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        lineHeight={1.2}
        textAlign="center"
      >
        Faiz Favaz
      </Text>

      {/* Profession */}
      <Text
        fontSize={0.2}
        color="#60A5FA" // Tailwind blue-400
        anchorX="center"
        anchorY="middle"
        position={[0, -0.4, 0]}
        maxWidth={5}
        lineHeight={1.2}
        textAlign="center"
      >
        Frontend Developer
      </Text>
    </group>
  );
}
