"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const incentives = [
  {
    name: "Learn job-ready, in-demand skills",
    imageSrc: "/assets/icons/briefcase.svg",
    description:
      "Build skills and put them to the test with assessments designed by software development experts.",
    accent: "bg-brandpurple",
    lightBg: "bg-brandpurple/8",
    border: "border-brandpurple/15",
    tag: "Skills",
  },
  {
    name: "Get an edge with human support",
    imageSrc: "/assets/icons/community.svg",
    description:
      "Work with a mentor, career coach, and more. They have your back and will hold you accountable.",
    accent: "bg-brightyellow",
    lightBg: "bg-brightyellow/10",
    border: "border-brightyellow/20",
    tag: "Mentorship",
  },
  {
    name: "Land a job or make a career switch",
    imageSrc: "/assets/icons/human-check.svg",
    description:
      "Craft a targeted resume, network effectively, and highlight transferable skills to land your ideal role.",
    accent: "bg-flourescent",
    lightBg: "bg-flourescent/8",
    border: "border-flourescent/20",
    tag: "Placement",
  },
];

const Incentives = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        ".incentives-header-reveal",
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

      // 2. Staggered Cards entrance
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".incentive-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gray-50 py-20 sm:py-32 overflow-hidden">
      {/* Soft decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brightyellow/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="incentives-header-reveal text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Why Instudia
          </p>
          <h2 className="incentives-header-reveal text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Built with a <span className="text-brandpurple">growth mindset</span>
          </h2>
          <p className="incentives-header-reveal mt-4 text-base text-gray-500 max-w-2xl mx-auto">
            Everything we do is designed to accelerate your career — from curated skills to hands-on mentorship.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className={`incentive-card relative flex flex-col gap-6 rounded-[2rem] border ${incentive.border} ${incentive.lightBg} bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden group`}
            >
              {/* Top accent bar */}
              <div className={`absolute inset-x-0 top-0 h-1.5 ${incentive.accent} rounded-t-[2rem]`} />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${incentive.accent} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <Image
                  className="w-7 h-7 invert"
                  src={incentive.imageSrc}
                  alt={incentive.name}
                  height={28}
                  width={28}
                />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#1B1C1E] leading-snug">{incentive.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{incentive.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Incentives;
