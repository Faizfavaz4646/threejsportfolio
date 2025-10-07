"use client";
import { useState } from "react";
import SceneCanvas from "@/app/components/three/SceneCanvas";
import NavbarButtons from "@/app/components/ui/NavbarButtons";
import AboutSection from "@/app/components/sections/About";
import ContactSection from "@/app/components/sections/Contact"; 

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleButtonClick = (section) => {
    setActiveSection(section);

    if (section === "about") {
      setShowAbout(true); // trigger About section animation
    } else {
      setShowAbout(false);
    }
  };

  const projects = [
    {
      images: [
        "/images/project1/front.png",
        "/images/project1/back.png",
        "/images/project1/top.png",
        "/images/project1/bottum.png",
        "/images/project1/left.png",
        "/images/project1/right.png",
      ],
    },
    {
      images: [
        "/images/project2/front.png",
        "/images/project2/back.png",
        "/images/project2/top.png",
        "/images/project2/bottum.png",
        "/images/project2/left.png",
        "/images/project2/right.png",
      ],
    },
    {
      images: [
        "/images/project3/front.png",
        "/images/project3/back.png",
        "/images/project3/top.png",
        "/images/project3/bottum.png",
        "/images/project3/left.png",
        "/images/project3/right.png",
      ],
    },
  ];

   return (
    <div className="w-screen h-screen relative">
      {/* 3D Canvas */}
      <SceneCanvas activeSection={activeSection} projects={projects} onFaceClick={setModalImage} />

      {/* Modal for project images */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 cursor-pointer"
        >
          <img
            src={modalImage}
            alt="Project Preview"
            className="max-w-lg max-h-[80vh] rounded-lg shadow-xl"
          />
        </div>
      )}

      {/* Navbar buttons */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-6 z-20">
        <NavbarButtons onClick={handleButtonClick} />
      </div>

      {/* About section */}
      {showAbout && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 max-w-xl z-20">
          <AboutSection show={showAbout} />
        </div>
      )}

      {/* Contact section */}
      {activeSection === "contact" && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-20">
          <ContactSection />
        </div>
      )}
    </div>
  );
}