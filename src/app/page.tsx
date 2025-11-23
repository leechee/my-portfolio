"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import ExperienceSection from "@/components/sections/experience";
import Image from "next/image";

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-white dark:bg-[#000000]")}>
          {/* Desktop background - Spline 3D robot */}
          <div className="hidden md:block top-0 z-0 fixed w-full h-screen">
            <AnimatedBackground />
          </div>
          {/* Mobile background - Static image */}
          <div className="md:hidden top-0 z-0 fixed w-full h-screen">
            <Image
              src="/assets/mobilebackground.avif"
              alt="Mobile background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <HeroSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
