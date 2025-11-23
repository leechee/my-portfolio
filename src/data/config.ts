const config = {
  title: "Jason Lee | Computational Engineering & Robotics Student",
  description: {
    long: "Explore the portfolio of Jason Lee, a computational engineering honors and robotics student at UT Austin interested in production ML and AI systems engineering. Building intelligent systems that solve real-world problems.",
    short:
      "Portfolio of Jason Lee, a computational engineering honors and robotics student at UT Austin interested in production ML and AI systems engineering.",
  },
  keywords: [
    "Jason Lee",
    "portfolio",
    "computational engineering",
    "robotics",
    "UT Austin",
    "production ML",
    "AI systems engineering",
    "machine learning",
    "ML engineering",
    "AI infrastructure",
    "full-stack developer",
    "web development",
    "React",
    "Next.js",
    "PyTorch",
    "CUDA",
  ],
  author: "Jason Lee",
  email: "jasomslee@gmail.com",
  site: "https://jlee.app",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/jason-lee-ut",
    instagram: "",
    facebook: "",
    github: "https://github.com/leechee",
  },
};
export { config };
