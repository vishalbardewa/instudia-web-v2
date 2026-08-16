"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
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
          duration: 0.4,
          ease: "easeInOut"
        }}
        className={cn(
          "flex max-w-[92vw] sm:max-w-fit fixed top-10 inset-x-0 mx-auto border-2 border-black rounded-full bg-white z-[5000] px-4 sm:pl-8 sm:pr-2 py-2 items-center justify-center space-x-3 sm:space-x-4 shadow-lg",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            prefetch={false}
            className={cn(
              "relative items-center flex space-x-1 text-black font-medium min-h-[44px] px-1 sm:px-2"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <Link
          href="/courses"
          prefetch={false}
          className="border text-sm font-medium relative text-white bg-black px-4 py-2 rounded-full min-h-[36px] flex items-center justify-center hover:bg-brandpurple transition-colors"
        >
          <span>Courses</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
