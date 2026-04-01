"use client";
import { useState, useEffect } from "react";
import { IconHome, IconUser } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from "../organisms/FloatingNav";
import Footer from "../organisms/Footer";
import NavigationWithDropdown from "../organisms/NavigationWithDropdown";
import WhatsAppWidget from "../atom/WhatsAppWidget";
import SearchModal from "../atom/SearchModal";
import { slugs } from "@/app/routes";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import Link from "next/link";

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
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

export default function PrimaryLayout({ children }: any) {
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
      <p className="flex h-10 items-center justify-center bg-black px-4 text-xs md:text-sm font-medium text-white sm:px-6 lg:px-8 print:hidden">
        <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.1 rounded-md text-[9px] font-bold uppercase tracking-wider text-black bg-white border border-neutral-200 shadow-sm gap-1.5 mr-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandpurple" />
          </span>
          New
        </span>
        We’ve built something just for you— <span className="underline hover:text-brandpurple"><Link href="/tools">take a look!</Link></span>
      </p>
      <div className="flex sticky z-50 top-0 w-full h-full print:hidden">
        <div className="w-1/4 h-[0.625rem] bg-[#58FF1B]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#FF1B58]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#C21BFF]"></div>
        <div className="w-1/4 h-[0.625rem] bg-[#FFE01B]"></div>
      </div>
      <div className="print:hidden">
        <FloatingNav navItems={navItems} />
        <NavigationWithDropdown navigation={longNavigation} onSearch={() => setSearchOpen(true)} />
      </div>
      {children}
      <div className="print:hidden">
        <WhatsAppWidget />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        <Footer />
      </div>
    </>
  );
}
