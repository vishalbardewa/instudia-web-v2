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

      if (badge) {
        heroTl.fromTo(
          badge,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45 }
        );
      }

      if (title) {
        heroTl.fromTo(
          title,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.2'
        );
      }

      if (desc) {
        heroTl.fromTo(
          desc,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.3'
        );
      }

      if (truthBadges && truthBadges.length > 0) {
        heroTl.fromTo(
          truthBadges,
          { opacity: 0, y: 10, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power2.out',
          },
          '-=0.25'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-white border-b border-neutral-200 pt-24 pb-12 md:pt-30 md:pb-16 font-jakarta"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="hero-badge inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-600 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-4">
          <span className="h-2 w-2 rounded-full bg-brandpurple" />
          Hardware Consultation • Dimapur, Nagaland
        </div>

        {/* Punchy, Decisive Headline */}
        <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 mx-auto leading-tight">
          Find the right laptop or PC for your studies in 10 seconds.
        </h1>

        {/* Short, direct subtext */}
        <p className="hero-description mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium">
          No shopkeeper sales tricks, no 8GB soldered RAM traps. Select your focus and get our exact recommended configuration with current street pricing.
        </p>

        {/* 3 Clear Verification Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-neutral-700">
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-300">
            <IconAlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            No 8GB Soldered RAM
          </span>
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-300">
            <IconCpu className="w-3.5 h-3.5 text-brandpurple shrink-0" />
            100% sRGB Screen Verified
          </span>
          <span className="hero-truth-badge inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-300">
            <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Dimapur Inverter Safe
          </span>
        </div>
      </div>
    </section>
  );
}
