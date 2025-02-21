import React from "react";
import Squares from "@/app/components/Backgrounds/Squares/Squares";

const MoreSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Squares Background */}
      <Squares className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-gray-700">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-xl">I am a passionate developer with experience in various technologies...</p>
      </div>
    </div>
  );
};

export default MoreSection;