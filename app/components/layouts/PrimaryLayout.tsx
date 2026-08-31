"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { IconHome, IconUser, IconMap } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from "../organisms/FloatingNav";
import Footer from "../organisms/Footer";
import NavigationWithDropdown from "../organisms/NavigationWithDropdown";
import { slugs } from "@/app/routes";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import Link from "next/link";
import { getActiveFestival } from "@/app/utils/festival";
import { clsx } from "clsx";

// Deferred non-critical client widgets (loaded after FCP and main render)
const WhatsAppWidget = dynamic(() => import("../atom/WhatsAppWidget"), { ssr: false });
const SearchModal = dynamic(() => import("../atom/SearchModal"), { ssr: false });
const MasterclassModal = dynamic(() => import("../organisms/MasterclassModal"), { ssr: false });
const CookieBanner = dynamic(() => import("../molecules/CookieBanner").then((m) => m.CookieBanner), { ssr: false });
import { FestivalEffectOverlay, FestivalDoodle } from "../atom/FestivalEffects";

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

  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (!activeFestival || !activeFestival.effect || activeFestival.effect === "none") {
      setShowEffects(false);
      return;
    }

    // Always trigger when explicitly previewing via query parameter
    if (festivalDate) {
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), 6000);
      return () => clearTimeout(timer);
    }

    // Play once per browser session
    const sessionKey = `instudia_festival_${activeFestival.id}_seen`;
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem(sessionKey) : null;

    if (!hasSeen) {
      try {
        sessionStorage.setItem(sessionKey, "true");
      } catch {
        // Ignore storage write errors (e.g., privacy mode / disabled storage)
      }
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), 6000);
      return () => clearTimeout(timer);
    } else {
      setShowEffects(false);
    }
  }, [activeFestival, festivalDate]);

  return (
    <>
      <FestivalEffectOverlay
        effect={activeFestival?.effect}
        active={showEffects}
      />
      <div
        className={clsx(
          "relative flex min-h-[36px] sm:min-h-10 py-1.5 sm:py-2 items-center justify-center px-3 sm:px-6 lg:px-8 print:hidden transition-all duration-500 overflow-hidden border-b border-white/10",
          activeFestival
            ? clsx(activeFestival.colors.bannerBg, activeFestival.colors.bannerText)
            : "bg-[#1b1c1e] text-white"
        )}
      >
        {/* Futuristic Cyber Neon Glow Backing */}
        {!activeFestival && (
          <>
            <div className="absolute inset-0 bg-[#1b1c1e] pointer-events-none" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-80 h-10 bg-[#1b1c1e] blur-2xl pointer-events-none" />
          </>
        )}

        {!activeFestival ? (
          <Link
            href="/contact"
            className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-3 text-center group cursor-pointer max-w-full"
          >
            {/* Terminal Style AI Badge */}
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest bg-[#58FF1B]/15 text-[#58FF1B] border border-[#58FF1B]/50 shadow-[0_0_10px_rgba(88,255,27,0.3)] shrink-0 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58FF1B] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58FF1B]" />
              </span>
              <span className="hidden sm:inline">AGENTIC AI // PART 2</span>
              <span className="sm:hidden">PART 2</span>
            </span>

            {/* Headline with Cyber / Neon Highlight */}
            <span className="text-[11px] sm:text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5">
              <span className="hidden sm:inline">Agentic AI Workshop Part 2 — </span>
              <span>Planning for End of September (Date TBA)</span>
              <span className="font-bold text-[#FFE01B] underline decoration-1 sm:decoration-2 underline-offset-2 group-hover:text-[#58FF1B] transition-colors whitespace-nowrap ml-0.5">
                Enquire ↗
              </span>
            </span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            {activeFestival.bannerText}
            {activeFestival.doodle && <FestivalDoodle type={activeFestival.doodle} />}
          </span>
        )}
      </div>
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
        <WhatsAppWidget />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        <MasterclassModal />
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}
