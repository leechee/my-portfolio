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

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto pb-20 min-h-screen flex flex-col scroll-mt-24">
      <h2
        className={cn(
          "text-4xl text-center md:text-7xl pt-2",
          "text-black dark:text-white"
        )}
      >
        <Link href={"#projects"}>
          Projects
        </Link>
      </h2>
      <div className="mb-96"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2 pb-12">
        {projects.map((project, index) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </section>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-start justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex flex-col group/modal-btn w-full">
          <div
            className={cn(
              "relative w-full h-auto rounded-lg overflow-hidden",
              project.id === "my-portfolio" && "border border-white/30"
            )}
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="w-full h-full hover:scale-[1.05] transition-all object-cover"
              src={project.src}
              alt={project.title}
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col items-start mt-3 px-2">
            <div className="text-xl text-left text-black dark:text-white font-medium">
              {project.title}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
