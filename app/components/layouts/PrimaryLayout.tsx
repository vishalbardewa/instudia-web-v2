import React from "react";
import { IconHome, IconUser } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from "../organisms/FloatingNav";
import Footer from "../organisms/Footer";
import NavigationWithDropdown from "../organisms/NavigationWithDropdown";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

const longNavigation = {
  categories: [
    {
      id: "courses",
      name: "Explore Courses",
      featured: [
        {
          name: "Full Stack Development",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          imageAlt: "Learn Fullstack development in Dimapur",
        },
        {
          name: "Frontend Development",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1552960504-34e1e1be3f53?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          imageAlt: "Learn Frontend development in Dimapur.",
        },
      ],
      sections: [
        {
          id: "short-term",
          name: "Short Term Courses",
          items: [
            { name: "Diploma in Computer Applications (DCA)", href: "#" },
            {
              name: "Post Graduate Diploma in Computer Applications(PGDCA)",
              href: "#",
            },
            { name: "UI/UX Designing", href: "#" },
            { name: "Advanced Excel", href: "#" },
            { name: "Tally with GST", href: "#" },
            { name: "Hardware & Networking", href: "#" },
            { name: "Data Structure & Algorithms", href: "#" },
          ],
        },
        {
          id: "programming",
          name: "Programming Foundation",
          items: [
            { name: "Javascript", href: "/courses/javascript" },
            { name: "Python", href: "#" },
            { name: "Rust", href: "#" },
            { name: "C", href: "#" },
            { name: "C++", href: "#" },
          ],
        },
        {
          id: "professional",
          name: "Professional",
          items: [
            { name: "Frontend Development", href: "#" },
            { name: "Backend Development", href: "#" },
            { name: "Database Admin", href: "#" },
            { name: "Project Management", href: "#" },
            { name: "Mobile App Development", href: "#" },
            { name: "DevOps", href: "#" },
            { name: "Retail Management", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About", href: "/about" },
    { name: "Workshops", href: "/workshops" },
    { name: "Contact", href: "#" },
  ],
};

export default function PrimaryLayout({ children }: any) {
  return (
    <>
      <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Enroll now to upskill today!
      </p>
      <div className="flex sticky z-[9999] top-0 w-full h-full">
        <div className="w-1/4 h-[0.625rem] bg-[#58FF1B]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#FF1B58]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#C21BFF]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#FFE01B]"></div>
      </div>
      <FloatingNav navItems={navItems} />
      <NavigationWithDropdown navigation={longNavigation} />
      {children}
      <Footer />
    </>
  );
}
