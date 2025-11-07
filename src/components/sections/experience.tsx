"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { BlurIn } from "../reveal-animations";

interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  location: string;
  period: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Samsung",
    logo: "/assets/samsung-logo.png",
    role: "Software Engineering Intern | Platform Engineering",
    location: "Austin, TX",
    period: "May 2025 - August 2025",
  },
  {
    company: "Cross Labs",
    logo: "/assets/cross-labs-logo.jpg",
    role: "AI Research Intern",
    location: "Kyoto, Japan",
    period: "June 2024 - October 2024",
  },
  {
    company: "Texas Robotics",
    logo: "/assets/texas-robotics-logo.jpg",
    role: "AI Research Assistant",
    location: "Austin, TX",
    period: "January 2024 - May 2024",
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className={cn("relative w-full min-h-screen py-12 md:py-10 pt-20 md:pt-20 -mb-32")}
    >
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "col-span-1",
            "flex flex-col justify-start items-center md:items-start",
            "px-6 md:px-24 lg:px-40 xl:px-48"
          )}
        >
          {/* Section Title */}
          <BlurIn delay={0.2}>
            <h2
              className={cn(
                "text-4xl md:text-5xl font-thin text-slate-800 dark:text-white mb-16",
                "cursor-default"
              )}
            >
              Experience
            </h2>
          </BlurIn>

          {/* Timeline */}
          <div className="relative w-full max-w-2xl">
            {/* Timeline Line */}
            <div
              className={cn(
                "absolute left-8 top-0 bottom-0 w-[2px]",
                "bg-gradient-to-b from-[#BF5700]/20 via-[#BF5700]/50 to-[#BF5700]/20"
              )}
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <BlurIn key={index} delay={0.4 + index * 0.2}>
                  <div className="relative flex gap-6 items-start group">
                    {/* Logo with Timeline Dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-lg overflow-hidden",
                          "bg-white dark:bg-slate-800",
                          "border-2 border-[#BF5700]/30",
                          "transition-all duration-300",
                          "group-hover:border-[#BF5700] group-hover:scale-110",
                          "shadow-lg"
                        )}
                      >
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      {/* Timeline Dot */}
                      <div
                        className={cn(
                          "absolute -left-[1.85rem] top-1/2 -translate-y-1/2",
                          "w-3 h-3 rounded-full",
                          "bg-[#BF5700]",
                          "ring-4 ring-slate-100 dark:ring-slate-950",
                          "transition-all duration-300",
                          "group-hover:scale-150 group-hover:ring-[#BF5700]/20"
                        )}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3
                        className={cn(
                          "text-xl font-light text-slate-800 dark:text-white",
                          "mb-1"
                        )}
                      >
                        {exp.company}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-slate-600 dark:text-slate-400",
                          "mb-1"
                        )}
                      >
                        {exp.role}
                      </p>
                      <div
                        className={cn(
                          "flex flex-wrap gap-3 text-xs",
                          "text-slate-500 dark:text-slate-500"
                        )}
                      >
                        <span>{exp.location}</span>
                        <span className="text-[#BF5700]">•</span>
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </BlurIn>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Empty for keyboard */}
        <div className="hidden md:block col-span-1"></div>
      </div>
    </section>
  );
};

export default ExperienceSection;
