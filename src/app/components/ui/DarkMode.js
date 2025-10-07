"use client";
import { useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-5 right-5 z-50 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
