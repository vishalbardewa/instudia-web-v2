"use client";

import { useState, useEffect } from "react";
import { IconHome, IconUser, IconMap, IconBriefcase, IconBook } from "@tabler/icons-react";
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
    name: "Courses",
    link: "/courses",
    icon: <IconBook fill="black" className="h-6 w-6 text-black dark:text-white" />,
  },
  {
    name: "Services",
    link: "/services",
    icon: <IconBriefcase fill="black" className="h-6 w-6 text-black dark:text-white" />,
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
    name: "Tools",
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
            { name: "Python", href: `/courses/${slugs.PYTHON}` }
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
    {
      id: "services",
      name: "Services",
      featured: [
        {
          name: "Web & Software Development",
          href: "/services/web-software-development",
          imageSrc:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
          imageAlt: "Custom software and web development in Dimapur",
        },
        {
          name: "Explore All Services",
          href: "/services",
          imageSrc:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
          imageAlt: "instudia technology and enterprise solutions",
        },
      ],
      sections: [
        {
          id: "engineering-cloud",
          name: "Engineering & Cloud",
          items: [
            { name: "Custom Web & Software Dev", href: "/services/web-software-development" },
            { name: "Cloud & DevOps Infrastructure", href: "/services/cloud-devops-infrastructure" },
            { name: "UI/UX Design & Branding", href: "/services/ui-ux-branding" },
          ],
        },
        {
          id: "enterprise-campus",
          name: "Enterprise & Campuses",
          items: [
            { name: "Corporate Workforce Training", href: "/services/corporate-training" },
            { name: "Campus Bootcamps & Partnerships", href: "/services/campus-partnerships" },
            { name: "Career Acceleration Mentorship", href: "/services/career-services" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About", href: "/about" },
    { name: "Workshops", href: "/workshops" },
    { name: "Contact", href: "/contact" },
    { name: "Tools", href: "/tools" },
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
