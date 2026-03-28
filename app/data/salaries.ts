import { slugs } from "../routes";

export type ExperienceLevel = "Junior" | "Mid-Level" | "Senior";

export interface SalaryData {
  id: string;
  role: string;
  description: string;
  courseSlug: string;
  courseName: string;
  local: {
    min: number;
    avg: number;
    max: number;
  };
  remote: {
    min: number;
    avg: number;
    max: number;
  };
}

export const SALARY_INSIGHTS: SalaryData[] = [
  {
    id: "frontend-dev",
    role: "Frontend Developer",
    description: "Build the visual and interactive elements of websites and web applications.",
    courseSlug: slugs.FRONTEND,
    courseName: "Frontend Development",
    local: {
      min: 15000,
      avg: 25000,
      max: 40000,
    },
    remote: {
      min: 35000,
      avg: 60000,
      max: 120000,
    },
  },
  {
    id: "ui-ux",
    role: "UI/UX Designer",
    description: "Design intuitive user experiences and aesthetic interfaces for digital products.",
    courseSlug: slugs.UIUX_DESIGN,
    courseName: "UI/UX Designing",
    local: {
      min: 15000,
      avg: 22000,
      max: 35000,
    },
    remote: {
      min: 30000,
      avg: 55000,
      max: 100000,
    },
  },
  {
    id: "digital-marketing",
    role: "Digital Marketer",
    description: "Drive growth through SEO, social media, paid ads, and content strategy.",
    courseSlug: slugs.DCA, // Fallback to relevant course or general
    courseName: "Digital Marketing & DCA",
    local: {
      min: 12000,
      avg: 20000,
      max: 35000,
    },
    remote: {
      min: 25000,
      avg: 45000,
      max: 90000,
    },
  },
  {
    id: "backend-dev",
    role: "Backend Developer",
    description: "Architect the server-side logic, databases, and APIs that power applications.",
    courseSlug: slugs.BACKEND,
    courseName: "Backend Development",
    local: {
      min: 18000,
      avg: 30000,
      max: 50000,
    },
    remote: {
      min: 40000,
      avg: 75000,
      max: 150000,
    },
  },
  {
    id: "fullstack-dev",
    role: "Fullstack Developer",
    description: "Handle both frontend and backend development for end-to-end solutions.",
    courseSlug: slugs.FULLSTACK_WEB_DEVELOPMENT,
    courseName: "Fullstack Web Development",
    local: {
      min: 20000,
      avg: 35000,
      max: 60000,
    },
    remote: {
      min: 50000,
      avg: 90000,
      max: 180000,
    },
  },
  {
    id: "graphic-design",
    role: "Graphic Designer",
    description: "Create visual concepts, branding, and marketing materials.",
    courseSlug: slugs.GRAPHIC_DESIGN,
    courseName: "Graphic Designing",
    local: {
      min: 10000,
      avg: 18000,
      max: 30000,
    },
    remote: {
      min: 20000,
      avg: 40000,
      max: 80000,
    },
  },
  {
    id: "data-analytics",
    role: "Data Analyst",
    description: "Analyze complex datasets to help businesses make data-driven decisions.",
    courseSlug: slugs.DATA_ANALYTICS,
    courseName: "Data Analytics",
    local: {
      min: 18000,
      avg: 28000,
      max: 45000,
    },
    remote: {
      min: 40000,
      avg: 70000,
      max: 130000,
    },
  },
  {
    id: "networking",
    role: "Hardware & Networking",
    description: "Setup, manage, and troubleshoot IT infrastructure and networks.",
    courseSlug: slugs.HARDWARE_NETWORKING,
    courseName: "Hardware & Networking",
    local: {
      min: 12000,
      avg: 22000,
      max: 35000,
    },
    remote: {
      min: 20000,
      avg: 35000,
      max: 60000, // Remote IT support
    },
  },
];
