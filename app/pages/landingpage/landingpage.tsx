import React from "react";
import HeroSection from "@/app/pages/landingpage/herosection";
import { navItems } from "@/lib/navItems";
import { FloatingNav } from "@/app/components/FloatingNavbar";
import AboutSection from "@/app/pages/landingpage/aboutsection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FloatingNav navItems={navItems} />
      <AboutSection />
      
    </div>
  );
};

export default LandingPage;

