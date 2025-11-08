import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo, liveLabel, repoLabel, hideLive }: { live: string; repo?: string; liveLabel?: string; repoLabel?: string; hideLive?: boolean }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {!hideLive && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            {liveLabel || "Visit Website"}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            {repoLabel || "Github"}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  redis: {
    title: "Redis",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  unreal: {
    title: "Unreal Engine",
    bg: "black",
    fg: "white",
    icon: <span>UE5</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "twilight",
    category: "2D Platformer Video Game",
    title: "Twilight",
    src: "/assets/Beginning.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.unreal],
      backend: [],
    },
    live: "https://github.com/leechee/Twilight",
    github: "https://github.com/leechee/Twilight",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Twilight is an ambitious 2D platformer built in Unreal Engine 5, drawing heavy inspiration from Hollow Knight's atmospheric design and precise movement mechanics. This project showcases advanced game development techniques including custom character controllers, AI behavior systems, and dynamic combat mechanics.
          </TypographyP>
          <ProjectsLinks repo={this.github} live={this.live} hideLive={true} />
          <TypographyH3 className="my-4 mt-8">Movement System</TypographyH3>
          <p className="font-mono mb-2">
            The character controller features smooth, responsive movement with advanced mechanics including double jumps, wall sliding, and dash abilities. Every input is carefully tuned to provide precise control and satisfying feedback, essential for challenging platforming sections.
          </p>
          <div className="my-4">
            <video
              controls
              className="w-full rounded-lg"
              src="/assets/twilight_demo.mov"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <TypographyH3 className="my-4 mt-8">Combat & AI</TypographyH3>
          <p className="font-mono mb-2">
            Enemies utilize behavior trees and state machines to create engaging combat encounters. The AI system includes patrol patterns, aggro detection, attack patterns, and dynamic reactions to player actions. Each enemy type has unique behaviors that require different strategies to overcome.
          </p>
          <TypographyH3 className="my-4 mt-8">Visual Design</TypographyH3>
          <p className="font-mono mb-2">
            The game features a dark, atmospheric aesthetic with hand-crafted environments and particle effects. Lighting and post-processing effects create an immersive underground world filled with mystery and danger. Every visual element is designed to enhance the melancholic yet beautiful atmosphere.
          </p>
          <TypographyH3 className="my-4 mt-8">Technical Features</TypographyH3>
          <p className="font-mono mb-2">
            Built entirely in Unreal Engine 5, the project leverages Blueprint visual scripting for rapid prototyping and C++ for performance-critical systems. The game includes custom animation systems, collision handling, checkpoint systems, and a robust save/load mechanism.
          </p>
        </div>
      );
    },
  },
  {
    id: "echoes-of-the-unknown",
    category: "UFO Sightings Analysis API",
    title: "Echoes of the Unknown",
    src: "/assets/ufo.avif",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.redis, PROJECT_SKILLS.docker],
    },
    live: "https://drive.google.com/file/d/1_cpsFN0a9iym6oAORxQHsI0QYchdqp10/view",
    github: "https://github.com/leechee/Echoes-of-the-Unknown",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Echoes of the Unknown is a comprehensive Flask-based REST API designed to analyze and query a massive dataset of over 80,000 UFO sightings. This microservices architecture project demonstrates scalable data processing, caching strategies, and containerized deployment.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} liveLabel="Project Writeup" />
          <TypographyH3 className="my-4 mt-8">Microservices Architecture</TypographyH3>
          <p className="font-mono mb-2">
            The application is built using a microservices pattern with separate Flask services handling different aspects of data processing and analysis. Each service is independently deployable and scalable, communicating through well-defined REST endpoints. This architecture ensures high availability and easy maintenance.
          </p>
          <TypographyH3 className="my-4 mt-8">Data Processing Pipeline</TypographyH3>
          <p className="font-mono mb-2">
            The system processes 80,000+ UFO sighting records with advanced querying capabilities including geographic filtering, temporal analysis, and pattern recognition. Redis is used as a high-performance caching layer to dramatically improve response times for frequently accessed data. The API supports complex queries for state-based searches, date range filtering, and statistical aggregations.
          </p>
          <TypographyH3 className="my-4 mt-8">Deployment & Testing</TypographyH3>
          <p className="font-mono mb-2">
            The entire application stack is containerized using Docker and Docker Compose, enabling consistent deployment across different environments. Comprehensive unit tests ensure data integrity and API reliability. The system includes automated data ingestion, validation, and error handling to maintain high data quality standards.
          </p>
        </div>
      );
    },
  },
  {
    id: "iris-flower-classification",
    category: "Machine Learning Tutorial",
    title: "Iris Flower Classifcation Tutorial",
    src: "/assets/iris tutorial.png",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    live: "https://github.com/leechee/Iris-Flower-Classification-Tutorial/blob/main/iris_classification.ipynb",
    github: "https://github.com/leechee/Iris-Flower-Classification-Tutorial",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            This was my internship project in Kyoto at an AI research lab used to teach future interns and developers new to AI the basics of neural networks. It's an educational deep dive into machine learning fundamentals through a hand-coded neural network implementation. This tutorial builds a classification model from scratch without high-level ML libraries, providing clear insights into how neural networks actually work under the hood.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} liveLabel="View Notebook" />
          <TypographyH3 className="my-4 mt-8">Hand-Coded Neural Network</TypographyH3>
          <p className="font-mono mb-2">
            Rather than relying on TensorFlow or PyTorch, this project implements a neural network entirely from scratch using NumPy. You'll see exactly how forward propagation, backpropagation, gradient descent, and weight updates work at the mathematical level. This approach demystifies the "black box" of machine learning.
          </p>
          <TypographyH3 className="my-4 mt-8">Fisher's Iris Dataset</TypographyH3>
          <p className="font-mono mb-2">
            Using the classic Iris flower dataset, the tutorial demonstrates multi-class classification by predicting flower species based on sepal and petal measurements. The dataset is perfect for learning because it's small enough to understand completely but complex enough to require real machine learning techniques.
          </p>
          <TypographyH3 className="my-4 mt-8">Comprehensive Analysis</TypographyH3>
          <p className="font-mono mb-2">
            The notebook includes detailed data exploration, visualization of decision boundaries, performance metrics, and analysis of model behavior. You'll learn about training/testing splits, accuracy metrics, confusion matrices, and how to interpret model predictions.
          </p>
          <TypographyH3 className="my-4 mt-8">Educational Focus</TypographyH3>
          <p className="font-mono mb-2">
            Every step is thoroughly documented with explanations of the mathematical concepts, code implementation details, and practical considerations. This makes it an ideal resource for anyone wanting to truly understand neural networks rather than just using them as pre-built tools.
          </p>
        </div>
      );
    },
  },
  {
    id: "my-portfolio",
    category: "Portfolio Website",
    title: "My Portfolio",
    src: "/assets/myportfolio.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    live: "https://github.com/leechee/my-portfolio",
    github: "https://github.com/leechee/my-portfolio",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A modern, interactive portfolio website built with Next.js 14 and cutting-edge web technologies. Features a stunning 3D robot companion that follows your cursor, smooth scrolling animations, and a comprehensive showcase of projects and experience.
          </TypographyP>
          <ProjectsLinks repo={this.github} live={this.live} hideLive={true} />
          <TypographyH3 className="my-4 mt-8">Interactive 3D Robot</TypographyH3>
          <p className="font-mono mb-2">
            The centerpiece of the portfolio is an interactive 3D robot model created with Spline and seamlessly integrated into the Next.js application. The robot dynamically follows your cursor movements, creating an engaging and playful user experience. This demonstrates advanced 3D web integration and real-time interaction handling.
          </p>
          <TypographyH3 className="my-4 mt-8">Smooth Scrolling & Animations</TypographyH3>
          <p className="font-mono mb-2">
            Powered by Framer Motion and Aceternity UI, the site features buttery-smooth scroll animations, parallax effects, and micro-interactions throughout. Every section transition is carefully choreographed to guide the user's attention and create a memorable browsing experience.
          </p>
          <TypographyH3 className="my-4 mt-8">Modern Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Built with TypeScript for type safety, Next.js 14 for optimal performance, and styled with Tailwind CSS and ShadCN UI components. The combination ensures fast load times, excellent SEO, and a beautiful, consistent design system throughout the site.
          </p>
          <TypographyH3 className="my-4 mt-8">Experience Timeline</TypographyH3>
          <p className="font-mono mb-2">
            Features a comprehensive work experience timeline, skills showcase, and detailed project breakdowns. The portfolio effectively communicates technical expertise while maintaining an engaging, personality-driven presentation that stands out from typical developer portfolios.
          </p>
        </div>
      );
    },
  },
];
export default projects;
