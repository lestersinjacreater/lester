"use client";

import React, { useEffect, useState } from "react";
import BlurredImage from "@/app/components/Backgrounds/backgraundimage/BlurredImage";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background */}
      <BlurredImage className="-z-10" />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-gray-500 flex flex-col items-center space-y-8">
        <div className="text-5xl font-bold mb-4 text-white">
          Welcome to My Portfolio
        </div>

        {/* Image Section */}
        <div className="w-1/2 h-1/2">
          <img
            src="/assets/hero-image.jpg" // Make sure this path is correct
            alt="Hero Image"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Description */}
        <div className="text-xl text-white">
          Showcasing my projects and skills
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
