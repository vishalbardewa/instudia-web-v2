"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AdmissionsCtaBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 sm:my-20 lg:my-28">
      <div
        ref={cardRef}
        className="rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] bg-[#1B1C1E] text-white p-6 sm:p-10 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-brandpurple/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#58FF1B] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-brightyellow">
              Admissions Open
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Ready to build your career in tech?
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm text-neutral-400 leading-relaxed">
            Visit our lab in Dimapur or talk with our counselors to find the ideal batch timing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 relative z-10">
          <Link
            href="/courses"
            className="w-full sm:w-auto text-center px-6 sm:px-7 py-3.5 rounded-xl bg-brandpurple text-white text-xs font-bold uppercase tracking-wider hover:bg-brandpurple/90 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Browse All Courses
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-6 sm:px-7 py-3.5 rounded-xl bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
