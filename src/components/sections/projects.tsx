"use client";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useAudio } from "@/contexts/audio-context";
import { trackEvent } from "@/lib/analytics";

const ProjectsSection = () => {
  const { playPianoNote } = useAudio();

  // Array of notes for each project (cycling through pleasant notes)
  const projectNotes: ("C4" | "D4" | "E4" | "G4" | "A4" | "B4" | "C5" | "D5")[] =
    ["C4", "D4", "E4", "G4", "A4", "B4", "C5", "D5"];

  return (
    <section id="projects" className="relative z-[5] max-w-7xl mx-auto pb-20 min-h-screen flex flex-col scroll-mt-24">
      <h2
        className={cn(
          "text-4xl text-center md:text-7xl pt-10",
          "text-black dark:text-white"
        )}
      >
        <Link href={"#projects"}>
          Projects
        </Link>
      </h2>
      <div className="mb-12 md:mb-96"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2 pb-12">
        {projects.map((project, index) => (
          <Modall
            key={project.src}
            project={project}
            note={projectNotes[index % projectNotes.length]}
            onHover={playPianoNote}
          />
        ))}
      </div>
    </section>
  );
};
const Modall = ({
  project,
  note,
  onHover,
}: {
  project: Project;
  note: "C4" | "D4" | "E4" | "G4" | "A4" | "B4" | "C5" | "D5";
  onHover: (note: "C4" | "D4" | "E4" | "F4" | "G4" | "A4" | "B4" | "C5" | "D5" | "E5") => void;
}) => {
  return (
    <div
      className="flex items-start justify-center"
      onMouseEnter={() => onHover(note)}
      onClick={() => trackEvent("Project Viewed", { project: project.title })}
    >
      <Modal>
        <ModalTrigger className="bg-transparent flex flex-col group/modal-btn w-full">
          <div
            className={cn(
              "relative w-full h-auto overflow-hidden",
              project.id === "my-portfolio" && "border border-white/30"
            )}
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="w-full h-full hover:scale-[1.05] transition-all object-cover"
              src={project.src}
              alt={project.title}
              width={600}
              height={400}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col items-start mt-3 px-2">
            <div className="text-xl text-left text-black dark:text-white font-medium">
              {project.title}
            </div>
            <div className="text-base md:text-base text-white mt-1 font-[family-name:var(--font-inter)] font-normal">
              {project.category}
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          {/* <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            {project.id !== "twilight" && project.id !== "my-portfolio" && (
              <Link href={project.live} target="_blank">
                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                  Visit
                </button>
              </Link>
            )}
          </ModalFooter> */}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      {project.content}
    </>
  );
};
