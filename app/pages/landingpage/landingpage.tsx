import React from "react";
import HeroSection from "@/app/pages/landingpage/herosection";
import { navItems } from "@/lib/navItems";
import { FloatingNav } from "@/app/components/FloatingNavbar";
import AboutSection from "@/app/pages/landingpage/aboutsection";
import MoresSection from "@/app/pages/landingpage/more";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FloatingNav navItems={navItems} />
      <AboutSection />
      <MoresSection />
      
    </div>
  );
};

export default LandingPage;

