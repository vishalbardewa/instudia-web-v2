"use client";

import { useState, useEffect } from "react";
import { IconHome, IconUser, IconMap } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from "../organisms/FloatingNav";
import Footer from "../organisms/Footer";
import NavigationWithDropdown from "../organisms/NavigationWithDropdown";
import { slugs } from "@/app/routes";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import FestivalBanner from "../molecules/FestivalBanner";
import ClientWidgets from "../atom/ClientWidgets";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome fill="black" className="h-6 w-6 text-black dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser fill="black" className="h-6 w-6 text-black dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage fill="black" className="h-6 w-6 text-black dark:text-white" />,
  },
  {
    name: "Student Success Suite",
    link: "/tools",
    icon: <IconHome fill="black" className="h-6 w-6 text-black dark:text-white" />,
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
          href: `/courses/${slugs.FULLSTACK_WEB_DEVELOPMENT}`,
          imageSrc:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop",
          imageAlt: "Learn Fullstack development in Dimapur",
        },
        // {
        //   name: "Frontend Development",
        //   href: `/courses/${slugs.FRONTEND}`,
        //   imageSrc:
        //     "https://images.unsplash.com/photo-1552960504-34e1e1be3f53?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   imageAlt: "Learn Frontend development in Dimapur.",
        // },
        {
          name: "Explore all courses",
          href: `/courses`,
          imageSrc:
            IMAGE_LIST['diploma-in-computer-applications'],
          imageAlt: "Learn Frontend development in Dimapur.",
        },
      ],
      sections: [
        {
          id: "short-term",
          name: "Short Term Courses",
          items: [
            { name: "Diploma in Computer Applications (DCA)", href: `/courses/${slugs.DCA}` },
            {
              name: "Post Graduate Diploma in Computer Applications(PGDCA)",
              href: `/courses/${slugs.PGDCA}`,
            },
            { name: "UI/UX Designing", href: `/courses/${slugs.UIUX_DESIGN}` },
            { name: "Advanced Excel", href: `/courses/${slugs.ADVANCED_EXCEL}` },
            { name: "Tally with GST", href: `/courses/${slugs.GST}` },
            { name: "Hardware & Networking", href: `/courses/${slugs.HARDWARE_NETWORKING}` },
          ],
        },
        {
          id: "programming",
          name: "Programming Foundation",
          items: [
            // { name: "Javascript", href: `/courses/${slugs.PYTHON}` },
            { name: "Python", href: `/courses/${slugs.PYTHON}` }
            // { name: "Rust", href: "#" },
            // { name: "C", href: "#" },
            // { name: "C++", href: "#" },
          ],
        },
        {
          id: "professional",
          name: "Professional",
          items: [
            { name: "Frontend Development", href: `/courses/${slugs.FRONTEND}` },
            { name: "Backend Development", href: `/courses/${slugs.BACKEND}` },
            { name: "Buisnesss Intelligence using PowerBI", href: `/courses/${slugs.BUSINESS_INTELLIGENCE}` },
            { name: "Project Management", href: `/courses/${slugs.PROJECT_MANAGEMENT}` },
            { name: "Mobile App Development", href: `/courses/${slugs.MOBILE_APP_DEVELOPMENT}` },
            { name: "DevOps", href: `/courses/${slugs.DEVOPS}` },
            { name: "Retail Management", href: `/courses/${slugs.RETAIL_MANAGEMENT}` },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About", href: "/about" },
    { name: "Workshops", href: "/workshops" },
    { name: "Contact", href: "/contact" },
    { name: "Tools", href: "/tools", isNew: true },
  ],
};
export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <FestivalBanner />
      <div className="flex w-full print:hidden">
        <div className="w-1/4 h-1 bg-[#58FF1B]"></div>
        <div className="w-1/4 h-1 bg-[#FF1B58]"></div>
        <div className="w-1/4 h-1 bg-[#C21BFF]"></div>
        <div className="w-1/4 h-1 bg-[#FFE01B]"></div>
      </div>
      <div className="print:hidden">
        <FloatingNav navItems={navItems} />
        <NavigationWithDropdown navigation={longNavigation} onSearch={() => setSearchOpen(true)} />
      </div>
      {children}
      <div className="print:hidden">
        <Footer />
        <ClientWidgets searchOpen={searchOpen} onCloseSearch={() => setSearchOpen(false)} />
      </div>
    </>
  );
}
