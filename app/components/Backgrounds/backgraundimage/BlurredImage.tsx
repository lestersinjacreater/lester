import Image from "next/image";
import React, { FC } from "react";

const BlurredImage: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 w-full h-screen ${className}`}>
      {/* Background Image */}
      <Image
        src="/assets/background.jpeg" // Use path instead of import
        alt="Blurred Background"
        layout="fill"
        objectFit="cover"
        priority
      />

      {/* Blurred Overlay */}
      <div
        className="absolute inset-0  backdrop-blur-md pointer-events-none"
      />
    </div>
  );
};

export default BlurredImage;
