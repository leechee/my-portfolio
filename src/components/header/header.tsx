"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import { useAudio } from "@/contexts/audio-context";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { playPianoNote } = useAudio();

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in"
      )}
      style={{
        background: "transparent",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0,
        duration: 0.8,
      }}
    >
      <div className="flex items-center justify-center w-full">
        <nav className="flex items-center gap-12 text-sm font-light font-[family-name:var(--font-inter)]">
          <Link
            href="/#about"
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            onMouseEnter={() => playPianoNote("C4")}
          >
            About
          </Link>
          <Link
            href="/#experience"
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            onMouseEnter={() => playPianoNote("D4")}
          >
            Experience
          </Link>
          <Link
            href="/#projects"
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            onMouseEnter={() => playPianoNote("E4")}
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            onMouseEnter={() => playPianoNote("F4")}
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
