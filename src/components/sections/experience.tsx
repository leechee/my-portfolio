"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlurIn } from "../reveal-animations";
import { useAudio } from "@/contexts/audio-context";
import { experiences } from "@/data/experiences";

const ExperienceSection = () => {
  const { playPianoNote } = useAudio();

  // Map each experience to a different note
  const experienceNotes: ("A4" | "C5" | "D5" | "E5" | "G4")[] = ["A4", "C5", "D5", "E5", "G4"];

  return (
    <section
      id="experience"
      className={cn("relative w-full min-h-screen py-12 md:py-10 pt-6 md:pt-6 mb-12 md:-mb-32 scroll-mt-20")}
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
          <BlurIn delay={0.2} duration={0.5}>
            <h2
              className={cn(
                "text-4xl md:text-5xl font-thin font-display text-slate-800 dark:text-white mb-10",
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
                "bg-gradient-to-b from-[#f57b18]/20 via-[#f57b18]/50 to-[#f57b18]/20"
              )}
            />

            {/* Experience Items */}
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <BlurIn key={index} delay={0.4 + index * 0.2} duration={0.5}>
                  <div className="relative flex gap-6 items-start group">
                    {/* Logo with Timeline Dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-lg overflow-hidden",
                          "bg-white dark:bg-slate-800",
                          "border-2 border-[#f57b18]/30",
                          "transition-all duration-300",
                          "group-hover:border-[#f57b18] group-hover:scale-110",
                          "shadow-lg",
                          "cursor-pointer"
                        )}
                        onMouseEnter={() => playPianoNote(experienceNotes[index])}
                      >
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Timeline Dot */}
                      <div
                        className={cn(
                          "absolute -left-[1.85rem] top-1/2 -translate-y-1/2",
                          "w-3 h-3 rounded-full",
                          "bg-[#f57b18]",
                          "ring-4 ring-slate-100 dark:ring-slate-950",
                          "transition-all duration-300",
                          "group-hover:scale-150 group-hover:ring-[#f57b18]/20"
                        )}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div
                        className={cn(
                          "text-2xl font-light font-display text-slate-800 dark:text-white",
                          "mb-1"
                        )}
                      >
                        {exp.company}
                      </div>
                      <p
                        className={cn(
                          "text-base md:text-base text-white",
                          "mb-2 font-[family-name:var(--font-inter)] font-normal"
                        )}
                      >
                        {exp.role}
                      </p>
                      <div
                        className={cn(
                          "flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3 text-sm md:text-base",
                          "text-white",
                          "font-[family-name:var(--font-inter)] font-normal"
                        )}
                      >
                        <span>{exp.location}</span>
                        <span className="hidden sm:inline text-[#f57b18]">•</span>
                        <span>{exp.period}</span>
                      </div>
                      {exp.blogLink && (
                        <Link
                          href={exp.blogLink}
                          target="_blank"
                          className={cn(
                            "inline-block mt-2 text-sm md:text-base",
                            "text-[#f57b18] hover:text-[#ff8c2e]",
                            "font-[family-name:var(--font-inter)] font-normal",
                            "underline hover:no-underline",
                            "transition-colors duration-200"
                          )}
                        >
                          Read my blog →
                        </Link>
                      )}
                    </div>
                  </div>
                </BlurIn>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Hobbies Section */}
        <div className="hidden md:block col-span-1 px-6 md:px-32 lg:px-48 xl:px-56">
          <BlurIn delay={0.2} duration={0.5}>
            <h2
              className={cn(
                "text-4xl md:text-5xl font-thin font-display text-slate-800 dark:text-white mb-10",
                "cursor-default"
              )}
            >
              Hobbies
            </h2>
          </BlurIn>

          {/* Hobbies List */}
          <ul className="space-y-2 list-disc list-inside">
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              guitar (i&apos;m in a band)
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              marathons
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              volleyball
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              cook (eat)
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              photography
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              video games
            </li>
            <li className="text-base text-white font-[family-name:var(--font-inter)] font-normal">
              video editing
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
