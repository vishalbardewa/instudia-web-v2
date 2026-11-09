"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IconCpu, IconShieldCheck, IconAlertTriangle } from '@tabler/icons-react';

export default function HardwareHeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const badge = heroRef.current?.querySelector('.hero-badge');
      const title = heroRef.current?.querySelector('.hero-title');
      const desc = heroRef.current?.querySelector('.hero-description');
      const truthBadges = heroRef.current?.querySelectorAll('.hero-truth-badge');

      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Top status badge floats in
      if (badge) {
        heroTl.fromTo(
          badge,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }

      // 2. Strong headline fades in and rises
      if (title) {
        heroTl.fromTo(
          title,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.25'
        );
      }

      // 3. Editorial paragraph reveals
      if (desc) {
        heroTl.fromTo(
          desc,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.35'
        );
      }

      // 4. Staggered truth badges enter
      if (truthBadges && truthBadges.length > 0) {
        heroTl.fromTo(
          truthBadges,
          { opacity: 0, y: 12, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-white border-b border-neutral-200 pt-24 pb-16 md:pt-32 md:pb-20 font-jakarta"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Step 1: Top Badge */}
        <div className="hero-badge inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-700 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-6">
          <span className="h-2 w-2 rounded-full bg-brandpurple" />
          Local Hardware Advisory • Dimapur, Nagaland
        </div>

        {/* Step 2: Main Headline */}
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 max-w-4xl mx-auto leading-[1.12]">
          Don't buy a laptop or PC until you check this.
        </h1>

        {/* Step 3: Description Body */}
        <p className="hero-description mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Every semester, students visit our Dimapur centre having spent ₹40,000 to ₹70,000 on slow laptops with 8GB soldered RAM or washed-out screens that shopkeepers pushed on them to clear old stock. Use this guide to see what hardware actually works for coding, graphic design, and college—and what price you should really pay in 2026.
        </p>

        {/* Step 4: Staggered Practical Truth Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-neutral-800">
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-50 rounded-full border border-neutral-300 shadow-2xs">
            <IconAlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            Never buy 8GB soldered RAM on Windows 11
          </span>
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-50 rounded-full border border-neutral-300 shadow-2xs">
            <IconCpu className="w-4 h-4 text-brandpurple shrink-0" />
            100% sRGB screen check for graphic design
          </span>
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-50 rounded-full border border-neutral-300 shadow-2xs">
            <IconShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            UPS power cut protection for desktop builders
          </span>
        </div>
      </div>
    </section>
  );
}
