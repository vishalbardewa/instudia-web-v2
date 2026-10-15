"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface IStatItem {
  value: string;
  label: string;
  tag: string;
  description: string;
  accentGlyph: string;
  accentColor: string;
}

export const defaultStats: IStatItem[] = [
  {
    value: "2021",
    label: "Founded in Dimapur",
    tag: "Origin",
    description: "Pioneering structured, practical tech education in Nagaland since day one.",
    accentGlyph: "✦",
    accentColor: "text-brandpurple",
  },
  {
    value: "19+",
    label: "Industry Courses",
    tag: "Curriculum",
    description: "From DCA, Tally & GST to Full-Stack Web Development, Data & Python.",
    accentGlyph: "✴",
    accentColor: "text-[#58FF1B]",
  },
  {
    value: "16+",
    label: "Years Faculty Experience",
    tag: "Mentorship",
    description: "Mentored directly by senior engineers and certified industry professionals.",
    accentGlyph: "•",
    accentColor: "text-[#FF1B58]",
  },
  {
    value: "1,000+",
    label: "Careers Accelerated",
    tag: "Outcomes",
    description: "Hands-on projects, personalized resume reviews, and verified placement support.",
    accentGlyph: "✦",
    accentColor: "text-brightyellow",
  },
];

interface IStatsProps {
  stats?: IStatItem[];
}

export default function Stats({ stats = defaultStats }: IStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statNumbersRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        ".bento-header-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Bento cards stagger depth entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".bento-stat-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Staggered numeric count-up animations
      stats.forEach((stat, index) => {
        const el = statNumbersRef.current[index];
        if (!el) return;

        // Extract numeric part and any formatting/suffix
        const hasComma = stat.value.includes(",");
        const cleanVal = stat.value.replace(/,/g, "");
        const match = cleanVal.match(/^(\d+)(.*)$/);
        if (!match) return;

        const targetNum = parseInt(match[1], 10);
        const suffix = match[2];
        const startVal = targetNum > 1000 ? targetNum - 25 : 0;
        const countObj = { val: startVal };

        gsap.to(countObj, {
          val: targetNum,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (el) {
              const formattedNumber = hasComma
                ? Math.round(countObj.val).toLocaleString()
                : Math.round(countObj.val).toString();
              el.textContent = `${formattedNumber}${suffix}`;
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={containerRef}
      className="relative isolate bg-[#FBFBFC] py-20 sm:py-28 lg:py-32 border-y border-black/[0.06] overflow-hidden"
    >
      {/* Subtle ambient blur */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-brandpurple/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-brightyellow/[0.04] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 sm:pb-14 border-b border-black/[0.06]">
          <div className="max-w-3xl">
            <div className="bento-header-reveal inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
              <span className="text-brandpurple">✦</span>
              <span>Track Record &amp; Impact</span>
            </div>
            <h2 className="bento-header-reveal text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950 leading-[1.06]">
              Trusted by students{" "}
              <span className="text-brandpurple">for quality upskilling</span>
            </h2>
          </div>

          <p className="bento-header-reveal max-w-xl text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            We believe cost and access should never be barriers to technical education.
            Experience structured, high-impact training designed for your schedule with direct mentorship
            and real-world project portfolios.
          </p>
        </div>

        {/* Editorial 4-Card Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-14"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bento-stat-card group relative bg-white rounded-[2rem] border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:border-black/20"
            >
              {/* Top micro-meta */}
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.05]">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  {stat.tag}
                </span>
                <span className={`text-xs font-bold ${stat.accentColor}`}>
                  {stat.accentGlyph}
                </span>
              </div>

              {/* Number and Label block */}
              <div className="py-6 sm:py-8">
                <div
                  ref={(el) => {
                    statNumbersRef.current[i] = el;
                  }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight tabular-nums group-hover:text-brandpurple transition-colors duration-300"
                >
                  {stat.value}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mt-3 leading-snug">
                  {stat.label}
                </h3>
              </div>

              {/* Subtitle / context description */}
              <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed pt-4 border-t border-black/[0.05]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
