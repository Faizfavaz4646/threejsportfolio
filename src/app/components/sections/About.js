"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AboutSection({ show }) {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  const lines = [
    "Hi, I'm ✨ Faiz Favaz ✨",
    "I am a Frontend Developer.",
    "I love building interactive web applications.",
    "I focus on clean UI/UX and scalable code.",
    "I'm constantly learning and exploring new technologies.",
    "I enjoy solving complex problems and optimizing performance.",
    "I like to experiment with 3D web animations and visual effects.",
    "I aim to create applications that are both functional and visually appealing.",
    "Collaboration and continuous improvement are key principles for me"
  ];

  useEffect(() => {
    if (!show) return;

    const tl = gsap.timeline();

    // Animate lines into view with stagger
    tl.fromTo(
      linesRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", stagger: 0.25 }
    );

    // After initial animation, move all lines slightly to the right
    tl.to(containerRef.current, {
      x: 50, // move 50px to the right (adjust as needed)
      duration: 1,
      ease: "power2.inOut",
      delay: 0.2
    });
  }, [show]);

  return (
    <div
      ref={containerRef}
      className="mt-8 flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 text-center px-4 sm:px-6 md:px-12 lg:px-24 max-w-4xl mx-auto"
    >
      {lines.map((line, idx) => (
        <p
          key={idx}
          ref={(el) => (linesRef.current[idx] = el)}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold opacity-0 leading-relaxed"
        >
          {line}
        </p>
      ))}
    </div>
  );
}
