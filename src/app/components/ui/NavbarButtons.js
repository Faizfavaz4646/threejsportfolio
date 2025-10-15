"use client";
import React from "react";

export default function NavbarButtons(props) {
  const handleClick = (section) => {
    if (props.onClick) props.onClick(section);
  };

  return (
    <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto px-2">
      <button
        className="flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition text-sm sm:text-base md:text-base"
        onClick={() => handleClick("about")}
      >
        About
      </button>

      <button
        className="flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-sm sm:text-base md:text-base"
        onClick={() => handleClick("projects")}
      >
        My Works
      </button>

      <button
        className="flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition text-sm sm:text-base md:text-base"
        onClick={() => handleClick("contact")}
      >
        Contact
      </button>

      <button
        className="flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition text-sm sm:text-base md:text-base"
        onClick={() => handleClick("skills")}
      >
        Skills
      </button>
    </div>
  );
}
