"use client";
import React from "react";

export default function NavbarButtons(props) {
  // props.onClick is optional
  const handleClick = (section) => {
    if (props.onClick) props.onClick(section);
  };

  return (
    <div className="flex gap-6">
      <button
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        onClick={() => handleClick("about")}
      >
        About
      </button>
      
        <button
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        onClick={() => handleClick("projects")}
      >
        My Works
      </button>

      <button
        className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
        onClick={() => handleClick("contact")}
      >
        Contact
      </button>
    </div>
  );
}
