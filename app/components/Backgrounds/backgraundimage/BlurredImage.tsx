import Image from "next/image";
import React, { FC, ReactNode } from "react";
import backgroundImage from "@/public/assets/backgraund.jpeg"; // Update this with the correct path to your image

interface BlurredImageProps {
  children?: ReactNode;
  className?: string; // Add className prop
  
}

const BlurredImage: FC<BlurredImageProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage} // Use the imported image
          alt="Blurred Background"
          layout="fill"
          objectFit="cover"
          className="blur-1xl"
        />
      </div>

      {/* Vertical Line Effect */}
<div
  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.2)_4px,transparent_3px)] bg-[size:40px_100%] opacity-50 pointer-events-none"
/>


      
      {/* Content */}
      <div className="relative z-10 text-white text-3xl font-bold">
        {children}
      </div>
    </div>
  );
};

export default BlurredImage;