export interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  location: string;
  period: string;
  blogLink?: string;
}

// Ordered most-recent first; experiences[0] is treated as the current role.
export const experiences: ExperienceItem[] = [
  {
    company: "IBM",
    logo: "/assets/ibm%20logo.png",
    role: "Software Engineering Intern — Agentic AI",
    location: "Austin, TX",
    period: "May 2026 - August 2026",
  },
  {
    company: "Amazon",
    logo: "/assets/amazon_logo.jpg",
    role: "Amazon Robotics Mentee",
    location: "Remote",
    period: "September 2025 - May 2026",
  },
  {
    company: "Samsung",
    logo: "/assets/samsung-logo.png",
    role: "Software Engineering Intern — Platform Engineering",
    location: "Austin, TX",
    period: "May 2025 - August 2025",
  },
  {
    company: "Cross Labs",
    logo: "/assets/cross-labs-logo.jpg",
    role: "AI Research Intern",
    location: "Kyoto, Japan",
    period: "June 2024 - October 2024",
    blogLink: "https://www.crosslabs.org/blog/from-aristotle-to-genetic-algorithms-how-i-learned-neural-networks-in-one-summer",
  },
  {
    company: "Texas Robotics",
    logo: "/assets/texas-robotics-logo.jpg",
    role: "AI Research Assistant",
    location: "Austin, TX",
    period: "January 2024 - May 2024",
  },
];
