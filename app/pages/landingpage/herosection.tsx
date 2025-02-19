"use client";

import React, { useEffect, useState } from "react";
import ShapeBlur from "@/app/components/Backgrounds/ShapeBlur/ShapeBlur";
import BlurredImage from "@/app/components/Backgrounds/backgraundimage/BlurredImage";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Blurred Image at the very back */}
      <BlurredImage className="absolute inset-0 z-0" />

      {/* ShapeBlur in the middle */}
      {isClient && <ShapeBlur className="absolute inset-0 z-10" />}

      {/* Hero Section content on top
      <div className="relative z-20 text-center text-gray-500">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl mb-8">Showcasing my projects and skills</p>
        <button className="px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-700">
          Get Started
        </button>
      </div> */}
    </div>
  );
};

export default HeroSection;