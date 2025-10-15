"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import CubeIntro from "./CubeIntro";
import Avatar from "./Avatar";
import ProjectsSection from "../sections/ProjectsSection";
import Particles from "./Particles";
import Lights from "./Lights";
import { OrbitControls } from "@react-three/drei";

export default function SceneCanvas({ activeSection, projects, onFaceClick }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 7], fov: 50 }}
      className="w-full h-full relative z-0"
    >
      <Suspense fallback={null}>
        <Lights />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <ambientLight intensity={0.7} />
        <Particles />

        {!introFinished && <CubeIntro onFinished={() => setIntroFinished(true)} />}

        {introFinished && (
          <>
            <Avatar activeSection={activeSection} />
            {activeSection === "projects" && (
              <ProjectsSection show={true} projects={projects} onFaceClick={onFaceClick} />
            )}
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} target={[0, 0.5, 0]} />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}
