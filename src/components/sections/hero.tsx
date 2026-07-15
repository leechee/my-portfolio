import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { useAudio } from "@/contexts/audio-context";
import { useMouse } from "@/hooks/use-mouse";
import { trackEvent } from "@/lib/analytics";
import { experiences } from "@/data/experiences";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const { updateSound, playPianoNote } = useAudio();
  const { x, y } = useMouse();

  // Update sound based on mouse position
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      updateSound(x, y, window.innerWidth, window.innerHeight);
    }
  }, [x, y, updateSound]);

  return (
    <section id="hero" className={cn("relative w-full min-h-[100dvh] md:h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 pb-16 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <>
              <div className="">
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start font-thin text-sm ml-3 text-left mb-2",
                      "cursor-default font-display sm:text-base md:text-lg",
                      "text-slate-800 dark:text-white"
                    )}
                  >
                    Hi, my name is
                  </p>
                </BlurIn>
                <BlurIn delay={0.9}>
                  <h1
                    className={cn(
                      "font-thin text-5xl text-slate-800 dark:text-white ml-1 text-left",
                      "cursor-default font-display sm:text-6xl md:text-7xl mb-4"
                    )}
                  >
                    Jason Lee.
                  </h1>
                </BlurIn>
                <BlurIn delay={1.1}>
                  <p
                    className={cn(
                      "md:self-start text-sm ml-3 text-left",
                      "cursor-default sm:text-base md:text-lg max-w-2xl",
                      "text-slate-800 dark:text-white font-[200]",
                      "font-[family-name:var(--font-inter)]"
                    )}
                  >
                    I&apos;m a <span className="font-bold">computational engineering honors </span> and <span className="font-bold">robotics</span> student at <span className="font-bold text-[#f57b18]">UT Austin</span> who is interested in production ML, robot policy learning, and platform engineering.
                  </p>
                </BlurIn>
                <BlurIn delay={1.3}>
                  <p
                    className={cn(
                      "md:self-start text-sm ml-3 text-left mt-3",
                      "cursor-default sm:text-base",
                      "text-slate-600 dark:text-slate-300 font-[family-name:var(--font-inter)] font-normal"
                    )}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-[#f57b18] mr-2 align-middle animate-pulse" />
                    Currently: {experiences[0].role} @ {experiences[0].company}
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <Link
                  href="/assets/Jason_Lee_Resume1.pdf"
                  target="_blank"
                  className="flex-1"
                  onClick={() => trackEvent("Resume Downloaded")}
                >
                  <BoxReveal delay={2} width="100%" >
                    <Button
                      className="flex items-center gap-2 w-full"
                      onMouseEnter={() => playPianoNote("C4")}
                    >
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <Link href={"#contact"}>
                    <Button
                      variant={"outline"}
                      className="block w-full overflow-hidden font-[family-name:var(--font-inter)] font-bold"
                      onMouseEnter={() => playPianoNote("E4")}
                    >
                      Hire Me
                    </Button>
                  </Link>
                  <Link
                    href={config.social.github}
                    target="_blank"
                    onClick={() => trackEvent("GitHub Clicked")}
                    aria-label="Visit GitHub profile"
                  >
                    <Button
                      variant={"outline"}
                      onMouseEnter={() => playPianoNote("G4")}
                      aria-label="GitHub"
                    >
                      <SiGithub size={24} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    onClick={() => trackEvent("LinkedIn Clicked")}
                    aria-label="Visit LinkedIn profile"
                  >
                    <Button
                      variant={"outline"}
                      onMouseEnter={() => playPianoNote("B4")}
                      aria-label="LinkedIn"
                    >
                      <SiLinkedin size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="hidden md:grid col-span-1"></div>
      </div>
      <div className="hidden md:block absolute bottom-28 left-[50%] translate-x-[-50%] text-center px-4 max-w-md">
        <p className="text-sm text-white font-[family-name:var(--font-inter)]">
          Bobby the robot here and I love music. Click the sound icon on the top right to enable a lofi sound-system. Move your mouse and hover over different buttons to play along!
        </p>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
