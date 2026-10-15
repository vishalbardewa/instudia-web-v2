"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_utils/cn";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollY.getPrevious()!;

      // Use absolute pixel scroll (120px) to determine top of page, ensuring it fades when main nav shows.
      if (scrollY.get() < 120) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const isItemActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed top-4 sm:top-8 inset-x-0 mx-auto z-[5000] flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-fit select-none",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const active = isItemActive(navItem.link);
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              aria-label={navItem.name}
              prefetch={false}
              className="relative flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 transition-transform active:scale-95"
            >
              {/* Mobile: 36px circular micro-pod */}
              <span
                className={cn(
                  "sm:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                  active
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100/90 text-neutral-700 hover:bg-neutral-200 hover:text-black"
                )}
                aria-hidden="true"
              >
                {navItem.icon}
              </span>

              {/* Desktop: clean text badge */}
              <span
                className={cn(
                  "hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200",
                  active
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-700 hover:text-black hover:bg-neutral-100"
                )}
              >
                {navItem.name}
              </span>
            </Link>
          );
        })}

        <Link
          href="/contact"
          prefetch={false}
          aria-label="Enroll or Inquire"
          className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[36px] shadow-xs ml-0.5"
        >
          <span>Enroll</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
