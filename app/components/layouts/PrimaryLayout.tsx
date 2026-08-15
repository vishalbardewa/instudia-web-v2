"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IconHome, IconUser, IconMap } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from "../organisms/FloatingNav";
import Footer from "../organisms/Footer";
import NavigationWithDropdown from "../organisms/NavigationWithDropdown";
import WhatsAppWidget from "../atom/WhatsAppWidget";
import SearchModal from "../atom/SearchModal";
import MasterclassModal from "../organisms/MasterclassModal";
import { slugs } from "@/app/routes";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import Link from "next/link";
import { CookieBanner } from "../molecules/CookieBanner";
import { getActiveFestival } from "@/app/utils/festival";
import { Confetti, Snowfall, GlowEffects, FestivalDoodle, EasterEggs } from "../atom/FestivalEffects";
import AiBotsAnimation from "../atom/AiBotsAnimation";
import { clsx } from "clsx";

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
    <Suspense fallback={null}>
      <FestivalLayoutContent 
        navItems={navItems} 
        longNavigation={longNavigation} 
        searchOpen={searchOpen} 
        setSearchOpen={setSearchOpen}
      >
        {children}
      </FestivalLayoutContent>
    </Suspense>
  );
}

function FestivalLayoutContent({ 
  children, 
  navItems, 
  longNavigation, 
  searchOpen, 
  setSearchOpen 
}: any) {
  const searchParams = useSearchParams();
  const festivalDate = searchParams?.get("festivalDate");

  const activeFestival = useMemo(() => {
    return getActiveFestival(festivalDate || undefined);
  }, [festivalDate]);

  return (
    <>
      {activeFestival?.effect === "confetti" && <Confetti />}
      {activeFestival?.effect === "snowfall" && <Snowfall />}
      {activeFestival?.effect === "lights" && <GlowEffects />}
      {activeFestival?.effect === "easter-eggs" && <EasterEggs />}
      <div 
        className={clsx(
          "relative flex min-h-10 py-1.5 items-center justify-center px-4 text-xs sm:text-sm font-medium sm:px-6 lg:px-8 print:hidden transition-all duration-500 overflow-hidden border-b border-white/10",
          activeFestival 
            ? clsx(activeFestival.colors.bannerBg, activeFestival.colors.bannerText)
            : "bg-[#0c0d12] text-white"
        )}
      >
        {/* Futuristic Cyber Neon Glow Backing */}
        {!activeFestival && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C21BFF]/15 via-[#58FF1B]/10 to-[#C21BFF]/15 opacity-80 pointer-events-none" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-80 h-10 bg-[#C21BFF]/30 blur-2xl pointer-events-none" />
          </>
        )}

        {!activeFestival ? (
          <a
            href="https://agentic-ai.instudianagaland.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-center group cursor-pointer"
          >
            {/* Terminal Style AI Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-[#58FF1B]/15 text-[#58FF1B] border border-[#58FF1B]/50 shadow-[0_0_10px_rgba(88,255,27,0.3)] shrink-0 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58FF1B] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58FF1B]" />
              </span>
              AI AGENTS // 28-29 AUG
            </span>

            {/* Headline with Cyber / Neon Highlight */}
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-200 group-hover:text-white transition-colors truncate">
              Agentic AI & Autonomous Systems Workshop —{" "}
              <span className="font-bold text-[#FFE01B] underline decoration-2 underline-offset-2 group-hover:text-[#58FF1B] transition-colors inline-flex items-center gap-1">
                Explore & Register ↗
              </span>
            </span>
          </a>
        ) : (
          <span className="flex items-center gap-2">
            {activeFestival.bannerText}
            {activeFestival.doodle && <FestivalDoodle type={activeFestival.doodle} />}
          </span>
        )}
      </div>
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
        <AiBotsAnimation />
        <WhatsAppWidget />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        <MasterclassModal />
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}
