"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

const sections = [
  { id: "hero", name: "Hero", threshold: 0.5 },
  { id: "experience", name: "Experience", threshold: 0.5 },
  { id: "projects", name: "Projects", threshold: 0.5 },
  { id: "contact", name: "Contact", threshold: 0.5 },
];

export const useScrollTracking = () => {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !trackedSections.current.has(section.id)) {
              // Track as virtual pageview
              track("Section View", {
                section: section.name,
                path: `/#${section.id}`,
              });

              // Mark section as tracked
              trackedSections.current.add(section.id);

              console.log(`Tracked section: ${section.name}`);
            }
          });
        },
        {
          threshold: section.threshold,
          rootMargin: "0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
};
