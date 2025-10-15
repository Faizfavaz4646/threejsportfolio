"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Text, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

// URLs for skill logos (replace with your own URLs or local imports)
const skills = [
  { name: "React", img: "/images/skills/react.png" },
  { name: "Next.js", img: "/images/skills/nextjs.jpeg" },
  { name: "Tailwind", img: "/images/skills/tailwind.jpeg" },
  { name: "Three.js", img: "/images/skills/threejs.png" },
  { name: "GSAP", img: "/images/skills/gsap.png" },
  { name: "TypeScript", img: "/images/skills/typescript.png" },
  { name: "Node.js", img: "/images/skills/nodejs.png" },
  { name: "Figma", img: "/images/skills/figma.png" },
];

function SkillSpheres() {
  const groupRef = useRef();

  // Rotate the whole group smoothly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, idx) => {
        const angle = (idx / skills.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const texture = useLoader(TextureLoader, skill.img);

        return (
          <group key={idx} position={[x, 0, z]}>
            <Sphere args={[0.45, 32, 32]}>
              <meshStandardMaterial
                map={texture}             // apply logo texture
                emissive={`hsl(${idx * 45}, 80%, 30%)`}
                emissiveIntensity={0.3}
              />
            </Sphere>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.25}
               color="#000"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsSection() {
  return (
    <div className="w-full h-[700px] flex flex-col items-center mt-20">
      <div className="w-[550px] h-[550px] sm:h-[28rem]">
        <Canvas camera={{ position: [8,17, 10], fov: 30 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
          <SkillSpheres />
        </Canvas>
      </div>
    </div>
  );
}
