const config = {
  title: "Jason Lee | Software Engineer",
  description: {
    long: "Explore the portfolio of Jason Lee, a computational engineering honors and robotics student at UT Austin. Specializing in AI development, full-stack engineering, and turning innovative ideas into features people use and enjoy.",
    short:
      "Portfolio of Jason Lee, a computational engineering and robotics student at UT Austin specializing in AI and full-stack development.",
  },
  keywords: [
    "Jason Lee",
    "portfolio",
    "software engineer",
    "AI developer",
    "computational engineering",
    "robotics",
    "UT Austin",
    "machine learning",
    "full-stack developer",
    "web development",
    "React",
    "Next.js",
    "PyTorch",
    "CUDA",
  ],
  author: "Jason Lee",
  email: "jasomslee@gmail.com",
  site: "https://yoursite.com",

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
