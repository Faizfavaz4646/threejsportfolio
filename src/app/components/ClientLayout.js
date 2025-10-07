"use client";
import { useState, useEffect } from "react";
import DarkMode from "@/app/components/ui/DarkMode";
import Stars from "@/app/components/ui/Stars";

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Update body class for global CSS if needed
    useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  return (
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white">
      <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
      {darkMode && <Stars />}
      {children}
    </div>
  );
}
