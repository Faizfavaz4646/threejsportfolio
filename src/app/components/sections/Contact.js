"use client";

import { useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

const socialMedia = [
  { name: "Instagram", icon: "/images/icons/insta.jpeg", url: "https://instagram.com" },
  { name: "Facebook", icon: "/images/icons/facebook.png", url: "https://facebook.com" },
  { name: "LinkedIn", icon: "/images/icons/linkedin.png", url: "https://linkedin.com" },
  { name: "WhatsApp", icon: "/images/icons/whatsapp.jpeg", url: "https://wa.me/1234567890" },
  { name: "GitHub", icon: "/images/icons/github.png", url: "https://github.com" },
];

export default function ContactSection() {
  const cubesRef = useRef([]);

  const textures = useLoader(
    THREE.TextureLoader,
    socialMedia.map((sm) => sm.icon)
  );
  textures.forEach((tex) => (tex.colorSpace = THREE.SRGBColorSpace));

  useEffect(() => {
    // Animate cubes
    setTimeout(() => {
      cubesRef.current.forEach((cube, idx) => {
        if (!cube) return;

        gsap.fromTo(
          cube.position,
          { y: 20 },
          {
            y: 1.5,
            duration: 2,
            ease: "bounce.out",
            delay: idx * 0.3,
            onComplete: () => {
              // Optional blinking effect
              cube.material.forEach((mat) => {
                gsap.to(mat.color, {
                  r: Math.random(),
                  g: Math.random(),
                  b: Math.random(),
                  duration: 0.5,
                  repeat: -1,
                  yoyo: true,
                  delay: idx * 0.1,
                });
              });
            },
          }
        );
      });
    }, 100);
  }, []);

  // Responsive positions: smaller spacing for small screens
  const getPositions = () => {
    if (typeof window === "undefined") return socialMedia.map((_, idx) => [(idx - 2) * 1.5, 0, 0]);

    const width = window.innerWidth;
    const spacing = width < 640 ? 1 : width < 1024 ? 1.5 : 2;
    return socialMedia.map((_, idx) => [(idx - 2) * spacing, 0, 0]);
  };

  const positions = getPositions();

  return (
    <div className="w-full flex flex-col items-center mt-12 px-4 sm:px-6 md:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Contact Me</h2>

      {/* Responsive Canvas height */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]">
        <Canvas
          camera={{
            position: [0, 2, 7],
            fov: window.innerWidth < 640 ? 45 : 50,
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <OrbitControls enablePan={false} enableZoom enableRotate />

          {positions.map((pos, idx) => (
            <Box
              key={idx}
              args={[1, 1, 1]}
              position={pos}
              ref={(el) => (cubesRef.current[idx] = el)}
              castShadow
              onClick={() => window.open(socialMedia[idx].url, "_blank")}
            >
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <meshStandardMaterial
                    key={i}
                    attach={`material-${i}`}
                    map={textures[idx]}
                  />
                ))}
            </Box>
          ))}
        </Canvas>
      </div>
    </div>
  );
}
