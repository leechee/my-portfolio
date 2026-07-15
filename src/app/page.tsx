"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import ExperienceSection from "@/components/sections/experience";
import { useScrollTracking } from "@/hooks/use-scroll-tracking";

const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='250' height='250'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const NOISE_BG = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

function MainPage() {
  // Track scroll depth as virtual pageviews
  useScrollTracking();

  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-white dark:bg-[#0a0a0a]")}>
          {/* Desktop background - Spline 3D robot */}
          <div className="hidden md:block top-0 z-0 fixed w-full h-screen">
            <AnimatedBackground />
          </div>
          {/* Mobile background - dark gradient with a warm glow + grain texture for personality */}
          <div className="md:hidden top-0 z-0 fixed w-full h-screen overflow-hidden bg-gradient-to-b from-black to-[#0a0a0a]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 32%, rgba(245,123,24,0.22), transparent 55%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{ backgroundImage: NOISE_BG }}
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
