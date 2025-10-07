"use client";

import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export default function ProjectsSection({ show, projects, onFaceClick }) {
  const cubesRef = useRef([]);

  // Flatten all images
  const imagePaths = projects.flatMap(p => p.images);

  // Load textures
  const textures = useLoader(THREE.TextureLoader, imagePaths);

  textures.forEach(tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });

  // Auto-rotate cubes
  useFrame(() => {
    if (!show) return;
    cubesRef.current.forEach(cube => {
      if (!cube) return;
      cube.rotation.y += 0.01;
    });
  });

  // Drop animation
  useEffect(() => {
    if (!show) return;
    cubesRef.current.forEach((cube, idx) => {
      if (!cube) return;
      gsap.fromTo(
        cube.position,
        { y: 5 },
        { y: idx < 2 ? 2 : 0, duration: 1, delay: idx * 0.3, ease: "bounce.out" }
      );
    });
  }, [show]);

  const positions = [
    [-1.5, 0, 1],
    [1.5, 0, 1],
    [-1.5, 0, -1],
    [1.5, 0, -1],
  ];

  return positions.map((pos, idx) => {
    const cubeImages = projects[idx]?.images || [];
    const startIndex = idx * 6;
    const faceTextures = textures.slice(startIndex, startIndex + 6);

    return (
      <Box
        key={idx}
        args={[1, 1, 1]}
        position={pos}
        ref={el => (cubesRef.current[idx] = el)}
        castShadow
        onPointerDown={e => {
          e.stopPropagation();
          if (!cubeImages.length) return;
          const faceNumber = Math.floor(e.faceIndex / 2);
          onFaceClick(cubeImages[faceNumber]);
        }}
      >
        {faceTextures.map((tex, i) => (
          <meshStandardMaterial key={i} attach={`material-${i}`} map={tex} />
        ))}
      </Box>
    );
  });
}
