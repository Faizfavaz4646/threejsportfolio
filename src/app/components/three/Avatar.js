"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

// ✅ Avatar Component
export default function Avatar({ activeSection }) {
  const group = useRef();

  // ✅ Load GLB Models
  const idleGLB = useGLTF("/models/ImageToStl.com_Idle.glb");
  const waveGLB = useGLTF("/models/ImageToStl.com_Waving+Gesture.glb");
  const walkingGLB = useGLTF("/models/ImageToStl.com_Start+Walking.glb");
  const pointingGLB = useGLTF("/models/ImageToStl.com_Pointing.glb");
  const sittingGLB = useGLTF("/models/ImageToStl.com_Sitting+Idle.glb");
  const talkingGLB = useGLTF("/models/ImageToStl.com_Talking.glb");
  const danceGLB = useGLTF("/models/Dance.glb");

  // ✅ Extract Animations
  const idleActions = useAnimations(idleGLB.animations, group);
  const waveActions = useAnimations(waveGLB.animations, group);
  const walkingActions = useAnimations(walkingGLB.animations, group);
  const pointingActions = useAnimations(pointingGLB.animations, group);
  const sittingActions = useAnimations(sittingGLB.animations, group);
  const talkingActions = useAnimations(talkingGLB.animations, group);
  const danceActions = useAnimations(danceGLB.animations, group);

  const [currentGLB, setCurrentGLB] = useState("idle");
  const [currentAnim, setCurrentAnim] = useState("idle");
  const [position, setPosition] = useState(0);
  const [scale, setScale] = useState(1);

  // ✅ Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.6);
      else if (width < 1024) setScale(0.8);
      else setScale(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Idle ➜ Wave loop
  useEffect(() => {
    if (currentGLB !== "idle") return;
    const idleName = Object.keys(idleActions.actions)[0];
    const waveName = Object.keys(waveActions.actions)[0];

    idleActions.actions[idleName]?.reset().fadeIn(0.3).play();

    const waveTimer = setTimeout(() => {
      setCurrentGLB("wave");
      setCurrentAnim(waveName);
    }, 1000);

    const resetTimer = setTimeout(() => {
      setCurrentGLB("idle");
      setCurrentAnim(idleName);
    }, 5000);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(resetTimer);
    };
  }, [currentGLB]);

  // ✅ Handle section-based avatar animations
  useEffect(() => {
    let targetGLB = "idle";
    let targetAnim = Object.keys(idleActions.actions)[0];
    let targetX = 0;

    switch (activeSection) {
      case "about":
        targetGLB = "talking";
        targetAnim = Object.keys(talkingActions.actions)[0];
        targetX = -1.5;
        break;
      case "projects":
        targetGLB = "pointing";
        targetAnim = Object.keys(pointingActions.actions)[0];
        targetX = 1.5;
        break;
      case "skills":
        targetGLB = "dance";
        targetAnim = Object.keys(danceActions.actions)[0];
        targetX = 0;
        break;
      case "contact":
        targetGLB = "sitting";
        targetAnim = Object.keys(sittingActions.actions)[0];
        targetX = 0;
        break;
      default:
        break;
    }

    // Responsive position adjustment
    const width = window.innerWidth;
    if (width < 640) targetX *= 0.6;
    else if (width < 1024) targetX *= 0.8;

    // Smooth walking transition
    if (position !== targetX) {
      setCurrentGLB("walking");
      setCurrentAnim(Object.keys(walkingActions.actions)[0]);

      const duration = 3;
      const start = position;
      const end = targetX;
      const startTime = performance.now();

      const walkFrame = (time) => {
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        setPosition(start + (end - start) * progress);
        if (progress < 1) requestAnimationFrame(walkFrame);
        else {
          setCurrentGLB(targetGLB);
          setCurrentAnim(targetAnim);
        }
      };
      requestAnimationFrame(walkFrame);
    } else {
      setCurrentGLB(targetGLB);
      setCurrentAnim(targetAnim);
    }
  }, [activeSection]);

  // ✅ Animation handler
  useEffect(() => {
    let actions;
    switch (currentGLB) {
      case "wave":
        actions = waveActions.actions;
        break;
      case "walking":
        actions = walkingActions.actions;
        break;
      case "pointing":
        actions = pointingActions.actions;
        break;
      case "sitting":
        actions = sittingActions.actions;
        break;
      case "talking":
        actions = talkingActions.actions;
        break;
      case "dance":
        actions = danceActions.actions;
        break;
      default:
        actions = idleActions.actions;
    }

    if (!actions || !currentAnim) return;
    Object.values(actions).forEach((a) => a.stop && a.stop());
    actions[currentAnim]?.reset().fadeIn(0.3).play();
  }, [currentGLB, currentAnim]);

  // ✅ Scene selector
  const getScene = () => {
    switch (currentGLB) {
      case "wave":
        return waveGLB.scene;
      case "walking":
        return walkingGLB.scene;
      case "pointing":
        return pointingGLB.scene;
      case "sitting":
        return sittingGLB.scene;
      case "talking":
        return talkingGLB.scene;
      case "dance":
        return danceGLB.scene;
      default:
        return idleGLB.scene;
    }
  };

  return (
    <Suspense fallback={null}>
      <primitive
        ref={group}
        object={getScene()}
        position={[position, -0.5, 0]}
        scale={[scale, scale, scale]}
      />
    </Suspense>
  );
}

// ✅ Preload models for instant avatar switching
useGLTF.preload("/models/ImageToStl.com_Idle.glb");
useGLTF.preload("/models/ImageToStl.com_Waving+Gesture.glb");
useGLTF.preload("/models/ImageToStl.com_Start+Walking.glb");
useGLTF.preload("/models/ImageToStl.com_Pointing.glb");
useGLTF.preload("/models/ImageToStl.com_Sitting+Idle.glb");
useGLTF.preload("/models/ImageToStl.com_Talking.glb");
useGLTF.preload("/models/Dance.glb");
