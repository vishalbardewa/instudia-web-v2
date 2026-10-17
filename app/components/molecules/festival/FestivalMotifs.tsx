"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FestivalThemeKey } from "@/app/utils/festival";

interface MotifProps {
  theme: FestivalThemeKey;
  className?: string;
}

// ==========================================
// 1. DURGA PUJA MOTIFS
// ==========================================

const DurgaPujaLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const lotusRef = useRef<SVGGElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const petalsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rotating alpona halo
      if (haloRef.current) {
        gsap.to(haloRef.current, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 24,
          repeat: -1,
          ease: "none",
        });
      }

      // Gentle lotus breathing / bloom sway
      if (lotusRef.current) {
        gsap.to(lotusRef.current, {
          scale: 1.08,
          rotation: 2.5,
          transformOrigin: "center bottom",
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Kash phool petal drift
      if (petalsRef.current) {
        gsap.to(petalsRef.current.children, {
          y: -4,
          opacity: 0.9,
          stagger: {
            each: 0.3,
            repeat: -1,
            yoyo: true,
          },
          duration: 1.8,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,224,27,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Decorative Alpona Halo */}
      <circle
        ref={haloRef}
        cx="19"
        cy="19"
        r="17"
        stroke="#FFE01B"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.6"
      />
      {/* Kash phool petals / divine aura */}
      <g ref={petalsRef}>
        <circle cx="10" cy="9" r="1.2" fill="#FFE01B" opacity="0.4" />
        <circle cx="28" cy="8" r="1.5" fill="#FFFFFF" opacity="0.5" />
        <circle cx="31" cy="24" r="1" fill="#FFE01B" opacity="0.3" />
      </g>
      {/* Sacred Blooming Lotus */}
      <g ref={lotusRef} id="lotus-bloom">
        {/* Outer petals */}
        <path
          d="M19 8C19 8 13 14 11 20C9.5 24.5 12 28 15 28C17 28 19 25 19 25C19 25 21 28 23 28C26 28 28.5 24.5 27 20C25 14 19 8 19 8Z"
          fill="url(#durgaLotusGradOuter)"
        />
        {/* Center petal */}
        <path
          d="M19 6C19 6 15 12 15 18C15 22 17 25 19 26C21 25 23 22 23 18C23 12 19 6 19 6Z"
          fill="url(#durgaLotusGradInner)"
        />
        {/* Core golden bindu */}
        <circle cx="19" cy="18" r="2" fill="#FFE01B" />
        {/* Lotus base pod */}
        <path
          d="M13 27C16 29 22 29 25 27C23 30 15 30 13 27Z"
          fill="#FFB800"
        />
      </g>
      <defs>
        <linearGradient id="durgaLotusGradOuter" x1="19" y1="8" x2="19" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1B58" />
          <stop offset="1" stopColor="#990024" />
        </linearGradient>
        <linearGradient id="durgaLotusGradInner" x1="19" y1="6" x2="19" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE01B" />
          <stop offset="0.6" stopColor="#FF1B58" />
          <stop offset="1" stopColor="#D91E48" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DurgaPujaRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const drumRef = useRef<SVGGElement>(null);
  const sticksRef = useRef<SVGGElement>(null);
  const featherRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rhythmic Dhak drum beat tilt
      if (drumRef.current) {
        gsap.to(drumRef.current, {
          rotation: 4,
          transformOrigin: "center center",
          duration: 0.65,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Drumsticks bouncing in sync
      if (sticksRef.current) {
        gsap.to(sticksRef.current, {
          rotation: -7,
          transformOrigin: "bottom right",
          duration: 0.32,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Kash phool plume wave
      if (featherRef.current) {
        gsap.to(featherRef.current, {
          rotation: 12,
          transformOrigin: "bottom left",
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,224,27,0.45)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Kash Phool Feather Plume */}
      <path
        ref={featherRef}
        d="M26 12C31 7 35 4 37 2C35 6 34 11 31 16C29 19 27 16 26 12Z"
        fill="#FFFFFF"
        opacity="0.85"
      />
      {/* Traditional Dhak Drum Body */}
      <g ref={drumRef}>
        <ellipse cx="18" cy="11" rx="9" ry="3.5" fill="#FFE01B" stroke="#B45309" strokeWidth="1" />
        <path
          d="M9 11C9 11 9 27 18 28C27 27 27 11 27 11L27 25C27 29 9 29 9 25V11Z"
          fill="url(#dhakBodyGrad)"
        />
        {/* Tension cords criss-crossing */}
        <path
          d="M9 11L18 28M27 11L18 28M13 12L22 28M23 12L14 28"
          stroke="#FFE01B"
          strokeWidth="0.8"
          strokeOpacity="0.75"
        />
        <ellipse cx="18" cy="27" rx="8" ry="3" fill="#D97706" />
      </g>
      {/* Drumsticks */}
      <g ref={sticksRef}>
        <line x1="5" y1="6" x2="16" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="4" x2="20" y2="10" stroke="#FFE01B" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <defs>
        <linearGradient id="dhakBodyGrad" x1="9" y1="11" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B45309" />
          <stop offset="0.5" stopColor="#D97706" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ==========================================
// 2. DIWALI MOTIFS
// ==========================================

const DiwaliLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const innerFlameRef = useRef<SVGPathElement>(null);
  const auraRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Natural organic flame flicker
      if (flameRef.current) {
        gsap.to(flameRef.current, {
          scaleY: 1.18,
          scaleX: 0.92,
          rotation: 4,
          transformOrigin: "center bottom",
          duration: 0.22,
          repeat: -1,
          yoyo: true,
          ease: "rough({strength: 1, points: 10, template: power0.none})",
        });
      }

      if (innerFlameRef.current) {
        gsap.to(innerFlameRef.current, {
          scaleY: 1.25,
          scaleX: 0.88,
          rotation: -3,
          transformOrigin: "center bottom",
          duration: 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Warm pulsating halo
      if (auraRef.current) {
        gsap.to(auraRef.current, {
          scale: 1.35,
          opacity: 0.65,
          transformOrigin: "center center",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(255,184,0,0.6)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Radiant Flame Aura */}
      <circle
        ref={auraRef}
        cx="19"
        cy="14"
        r="11"
        fill="url(#diwaliAuraGrad)"
        opacity="0.35"
      />
      {/* Terracotta Diya Bowl */}
      <g id="diya-base">
        <path
          d="M6 22C6 22 9 31 19 31C29 31 32 22 32 22C32 22 28 25 19 25C10 25 6 22 6 22Z"
          fill="url(#diwaliBowlGrad)"
        />
        {/* Diya Rim */}
        <ellipse cx="19" cy="22" rx="13" ry="3.5" fill="#B45309" stroke="#FFE01B" strokeWidth="0.8" />
        {/* Golden oil pool */}
        <ellipse cx="19" cy="22" rx="10" ry="2.2" fill="#D97706" />
      </g>
      {/* Outer Flame */}
      <path
        ref={flameRef}
        d="M19 4C19 4 14 11 14 16C14 19 16.5 21 19 21C21.5 21 24 19 24 16C24 11 19 4 19 4Z"
        fill="url(#diwaliFlameOuter)"
      />
      {/* Inner Pure White/Gold Core */}
      <path
        ref={innerFlameRef}
        d="M19 8C19 8 16 13 16 16C16 18 17.5 19.5 19 19.5C20.5 19.5 22 18 22 16C22 13 19 8 19 8Z"
        fill="url(#diwaliFlameInner)"
      />
      <defs>
        <radialGradient id="diwaliAuraGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFE01B" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FF1B58" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diwaliBowlGrad" x1="19" y1="22" x2="19" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="diwaliFlameOuter" x1="19" y1="4" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE01B" />
          <stop offset="0.6" stopColor="#FF6B00" />
          <stop offset="1" stopColor="#FF1B58" />
        </linearGradient>
        <linearGradient id="diwaliFlameInner" x1="19" y1="8" x2="19" y2="19.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#FFF176" />
          <stop offset="1" stopColor="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DiwaliRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const sparklerRef = useRef<SVGGElement>(null);
  const raysRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Continuously spinning sparkle rays
      if (raysRef.current) {
        gsap.to(raysRef.current, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 8,
          repeat: -1,
          ease: "none",
        });
      }

      // Sparkler burst twinkling
      if (sparklerRef.current) {
        gsap.to(sparklerRef.current.children, {
          scale: 1.35,
          opacity: 1,
          transformOrigin: "center center",
          stagger: {
            each: 0.12,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.45,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(255,224,27,0.7)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rotating Light Rays */}
      <g ref={raysRef} id="sparkler-rays">
        <line x1="19" y1="3" x2="19" y2="9" stroke="#FFE01B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="29" x2="19" y2="35" stroke="#FFE01B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="19" x2="9" y2="19" stroke="#FFE01B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="29" y1="19" x2="35" y2="19" stroke="#FFE01B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7.7" y1="7.7" x2="12" y2="12" stroke="#FF6B00" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="26" y1="26" x2="30.3" y2="30.3" stroke="#FF6B00" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30.3" y1="7.7" x2="26" y2="12" stroke="#FF6B00" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12" y1="26" x2="7.7" y2="30.3" stroke="#FF6B00" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* Central Starburst Sparkler */}
      <g ref={sparklerRef} id="sparkler-stars">
        <circle cx="19" cy="19" r="4.5" fill="#FFFFFF" />
        <circle cx="19" cy="19" r="6" fill="#FFE01B" opacity="0.6" />
        <circle cx="13" cy="15" r="1.5" fill="#FFE01B" />
        <circle cx="25" cy="14" r="1.8" fill="#FF8C00" />
        <circle cx="23" cy="24" r="1.4" fill="#FFE01B" />
        <circle cx="14" cy="23" r="1.6" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

// ==========================================
// 3. HORNBILL FESTIVAL MOTIFS (Hornbill Bird & Naga Shawl)
// ==========================================

const HornbillLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const birdRef = useRef<SVGGElement>(null);
  const sashRef = useRef<SVGGElement>(null);
  const beakGlowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Majestic hornbill breathing sway
      if (birdRef.current) {
        gsap.to(birdRef.current, {
          y: -2.2,
          rotation: 2,
          transformOrigin: "bottom center",
          duration: 2.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Woven shawl sash drape flutter
      if (sashRef.current) {
        gsap.to(sashRef.current, {
          rotation: 3,
          skewX: -2,
          transformOrigin: "top left",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (beakGlowRef.current) {
        gsap.to(beakGlowRef.current, {
          opacity: 1,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,42,42,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={birdRef}>
        {/* Crown Casque (Majestic upper beak of Hornbill) */}
        <path
          d="M10 14C13 8 23 5 32 7C29 11 25 14 19 14H10Z"
          fill="url(#casqueGrad)"
        />
        {/* Massive curved Great Hornbill Beak */}
        <path
          d="M10 14C18 14 28 17 34 22C28 25 17 24 10 21V14Z"
          fill="url(#beakGrad)"
        />
        <path
          ref={beakGlowRef}
          d="M16 15C22 15 28 17 32 20C26 21 20 20 16 18V15Z"
          fill="#FFE01B"
          opacity="0.6"
        />
        {/* Bird Head & Black Plumage */}
        <path
          d="M11 11C7 11 5 15 5 21C5 27 8 32 14 32C14 26 12 21 11 11Z"
          fill="#1C1917"
          stroke="#EF4444"
          strokeWidth="0.8"
        />
        {/* Eye with ruby ring */}
        <circle cx="9" cy="18" r="2.5" fill="#EF4444" />
        <circle cx="9" cy="18" r="1.2" fill="#000000" />
        {/* Red & yellow feather accent */}
        <path d="M4 22L1 28M4 24L2 31" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />

        {/* Draped Miniature Naga Shawl Sash around neck */}
        <g ref={sashRef}>
          <path
            d="M8 25C11 23 15 25 17 28L15 34C13 31 10 30 7 32L8 25Z"
            fill="#DC2626"
            stroke="#17181A"
            strokeWidth="0.6"
          />
          {/* Authentic Naga black and white woven pinstripes */}
          <path d="M9 26L8 31" stroke="#17181A" strokeWidth="1" />
          <path d="M11 25L10 32" stroke="#FFFFFF" strokeWidth="0.8" />
          <path d="M14 27L13 33" stroke="#FFE01B" strokeWidth="0.6" />
        </g>
      </g>
      <defs>
        <linearGradient id="casqueGrad" x1="10" y1="5" x2="32" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="0.6" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FFE01B" />
        </linearGradient>
        <linearGradient id="beakGrad" x1="10" y1="14" x2="34" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.7" stopColor="#FFE01B" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HornbillRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const shawlRef = useRef<SVGGElement>(null);
  const tasselsRef = useRef<SVGGElement>(null);
  const diamondsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Natural draped Naga shawl fabric sway
      if (shawlRef.current) {
        gsap.to(shawlRef.current, {
          rotation: 3.5,
          skewX: 2,
          transformOrigin: "top center",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Woven fringe tassels flutter
      if (tasselsRef.current) {
        gsap.to(tasselsRef.current.children, {
          rotation: -7,
          transformOrigin: "top center",
          stagger: {
            each: 0.08,
            repeat: -1,
            yoyo: true,
          },
          duration: 1.15,
          ease: "power1.inOut",
        });
      }

      // Shimmering diamond lozenge weave
      if (diamondsRef.current) {
        gsap.to(diamondsRef.current.children, {
          fill: "#FFE01B",
          stagger: 0.2,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(220,38,38,0.55)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Wooden suspension rod */}
      <line x1="4" y1="4" x2="34" y2="4" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4" cy="4" r="1.5" fill="#FFE01B" />
      <circle cx="34" cy="4" r="1.5" fill="#FFE01B" />

      {/* Folded Draped Ceremonial Naga Shawl Body */}
      <g ref={shawlRef}>
        {/* Main Shawl Fabric Surface */}
        <path
          d="M7 5H31V28C31 28 26 29 19 28C12 27 7 28 7 28V5Z"
          fill="#18181B"
          stroke="#000000"
          strokeWidth="0.8"
        />

        {/* Traditional Bold Red Central Field */}
        <rect x="7" y="10" width="24" height="13" fill="#DC2626" />

        {/* Authentic White Woven Accent Lines */}
        <line x1="7" y1="9.5" x2="31" y2="9.5" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="7" y1="23.5" x2="31" y2="23.5" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="7" y1="7" x2="31" y2="7" stroke="#FFE01B" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <line x1="7" y1="26" x2="31" y2="26" stroke="#FFE01B" strokeWidth="0.6" strokeDasharray="1.5 1.5" />

        {/* Sacred Naga Woven Diamond Lozenges (Tsungkotepsu / Warrior pattern) */}
        <g ref={diamondsRef}>
          <polygon points="12,16.5 14,14 16,16.5 14,19" fill="#FFFFFF" />
          <polygon points="19,16.5 21,14 23,16.5 21,19" fill="#FFFFFF" />
          <polygon points="26,16.5 28,14 30,16.5 28,19" fill="#FFFFFF" />
          <circle cx="14" cy="16.5" r="0.8" fill="#18181B" />
          <circle cx="21" cy="16.5" r="0.8" fill="#18181B" />
          <circle cx="28" cy="16.5" r="0.8" fill="#18181B" />
        </g>

        {/* Woven Fringe Tassels Hanging at the Bottom */}
        <g ref={tasselsRef}>
          <line x1="8" y1="28" x2="8" y2="35" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="28" x2="11" y2="36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="28" x2="14" y2="35" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="17" y1="28" x2="17" y2="36" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="20" y1="28" x2="20" y2="35" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="23" y1="28" x2="23" y2="36" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="26" y1="28" x2="26" y2="35" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="29" y1="28" x2="29" y2="36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

// ==========================================
// 4. CHRISTMAS MOTIFS
// ==========================================

const ChristmasLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const starRef = useRef<SVGGElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Star of Bethlehem twinkle & flare
      if (starRef.current) {
        gsap.to(starRef.current, {
          scale: 1.15,
          rotation: 5,
          transformOrigin: "center center",
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (haloRef.current) {
        gsap.to(haloRef.current, {
          scale: 1.4,
          opacity: 0.8,
          transformOrigin: "center center",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(255,224,27,0.7)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle ref={haloRef} cx="19" cy="19" r="10" fill="#FFE01B" opacity="0.3" />
      {/* 8-Point Star of Bethlehem */}
      <g ref={starRef}>
        <path
          d="M19 2L21 14L33 19L21 24L19 36L17 24L5 19L17 14L19 2Z"
          fill="url(#bethlehemStarGrad)"
        />
        <path
          d="M19 8L20.5 15.5L28 19L20.5 22.5L19 30L17.5 22.5L10 19L17.5 15.5L19 8Z"
          fill="#FFFFFF"
        />
        <circle cx="19" cy="19" r="2.2" fill="#FFE01B" />
      </g>
      <defs>
        <linearGradient id="bethlehemStarGrad" x1="5" y1="2" x2="33" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#FFE01B" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ChristmasRight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Gentle holiday tree swaying
      if (treeRef.current) {
        gsap.to(treeRef.current, {
          rotation: 3,
          transformOrigin: "bottom center",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center drop-shadow-[0_0_8px_rgba(38,166,154,0.6)]"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={treeRef}
        src="/assets/images/christmas-tree.svg"
        alt="Christmas tree with gifts"
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

// ==========================================
// 5. CHHATH PUJA MOTIFS
// ==========================================

const ChhathPujaLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const sunRaysRef = useRef<SVGGElement>(null);
  const sunDiskRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rotating solar rays
      if (sunRaysRef.current) {
        gsap.to(sunRaysRef.current, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 18,
          repeat: -1,
          ease: "none",
        });
      }

      if (sunDiskRef.current) {
        gsap.to(sunDiskRef.current, {
          scale: 1.1,
          transformOrigin: "center center",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(255,140,0,0.6)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Radiant Sun Deity Rays */}
      <g ref={sunRaysRef}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="19"
            y1="5"
            x2="19"
            y2="10"
            stroke="#FFE01B"
            strokeWidth="1.8"
            strokeLinecap="round"
            transform={`rotate(${deg} 19 19)`}
          />
        ))}
      </g>
      {/* Divine Sun Core */}
      <circle ref={sunDiskRef} cx="19" cy="19" r="8.5" fill="url(#chhathSunGrad)" />
      <circle cx="19" cy="19" r="5.5" fill="#FFE01B" />
      <defs>
        <radialGradient id="chhathSunGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFF176" />
          <stop offset="0.6" stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const ChhathPujaRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const offeringRef = useRef<SVGGElement>(null);
  const flameRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Devotional floating offering sway
      if (offeringRef.current) {
        gsap.to(offeringRef.current, {
          y: -2,
          rotation: -2,
          transformOrigin: "center bottom",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (flameRef.current) {
        gsap.to(flameRef.current, {
          scaleY: 1.25,
          transformOrigin: "center bottom",
          duration: 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,140,0,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={offeringRef}>
        {/* Authentic Green Sugarcane Stalks in Background with Segmented Nodes */}
        {/* Central Stalk */}
        <path d="M18 5 L18 24 L20 24 L20 5 Z" fill="#84CC16" />
        <ellipse cx="19" cy="11" rx="1.5" ry="0.6" fill="#CA8A04" />
        <ellipse cx="19" cy="17" rx="1.5" ry="0.6" fill="#CA8A04" />

        {/* Left Leaning Stalk */}
        <path d="M12 7 L16 24 L17.6 24 L13.6 7 Z" fill="#65A30D" />
        <ellipse cx="13" cy="13" rx="1.3" ry="0.5" transform="rotate(-12 13 13)" fill="#CA8A04" />

        {/* Right Leaning Stalk */}
        <path d="M26 7 L22 24 L20.4 24 L24.4 7 Z" fill="#84CC16" />
        <ellipse cx="25" cy="13" rx="1.3" ry="0.5" transform="rotate(12 25 13)" fill="#CA8A04" />

        {/* Arching Two-Tone Sugarcane Leaves Crown */}
        {/* Left arching leaf */}
        <path d="M18 6 C12 2, 6 4, 3 10 C8 5, 14 5, 18 6 Z" fill="#84CC16" />
        <path d="M18 6 C14 3, 8 4, 3 10 C7 7, 12 6, 18 6 Z" fill="#15803D" />
        {/* Right arching leaf */}
        <path d="M20 6 C26 2, 32 4, 35 10 C30 5, 24 5, 20 6 Z" fill="#84CC16" />
        <path d="M20 6 C24 3, 30 4, 35 10 C31 7, 26 6, 20 6 Z" fill="#15803D" />
        {/* Center tall spear */}
        <path d="M19 6 C18.5 3, 18.5 1, 19 0 C19.5 1, 19.5 3, 19 6 Z" fill="#A3E635" />

        {/* Bamboo Soop / Arghya Platter */}
        <path
          d="M7 21C7 21 12 30 19 30C26 30 31 21 31 21L29 25C26 31 12 31 9 25L7 21Z"
          fill="#D97706"
          stroke="#FFE01B"
          strokeWidth="1"
        />
        {/* Sacred Diya sitting in Soop */}
        <path d="M14 22C14 22 16 26 19 26C22 26 24 22 24 22Z" fill="#B45309" />
        <path
          ref={flameRef}
          d="M19 14C19 14 16.5 18 16.5 20C16.5 21.5 17.5 22 19 22C20.5 22 21.5 21.5 21.5 20C21.5 18 19 14 19 14Z"
          fill="#FFE01B"
        />
        {/* River water ripples below */}
        <path d="M5 33C9 31 13 34 19 32C25 34 29 31 33 33" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// ==========================================
// 6. ULTRA-SPLASHY HOLI MOTIFS (Pichkari & Color Splatter)
// ==========================================

const HoliLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const pichkariRef = useRef<SVGGElement>(null);
  const jetsRef = useRef<SVGGElement>(null);
  const bowlRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Pichkari pump squirt recoil
      if (pichkariRef.current) {
        gsap.to(pichkariRef.current, {
          x: -2,
          rotation: -5,
          transformOrigin: "bottom left",
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Liquid jet squirts bursting outward
      if (jetsRef.current) {
        gsap.to(jetsRef.current.children, {
          scaleX: 1.35,
          scaleY: 1.2,
          transformOrigin: "left center",
          stagger: {
            each: 0.12,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.45,
          ease: "elastic.out(1.2, 0.4)",
        });
      }

      // Gulal bowl gentle sway
      if (bowlRef.current) {
        gsap.to(bowlRef.current, {
          rotation: 3,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_10px_rgba(255,27,88,0.65)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Traditional Metal Pichkari (Color Water Jet Gun) */}
      <g ref={pichkariRef}>
        <rect x="4" y="24" width="16" height="5" rx="1.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
        <rect x="2" y="25" width="2" height="3" fill="#FFE01B" />
        <line x1="20" y1="26.5" x2="25" y2="26.5" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="25" cy="26.5" r="1.5" fill="#FFE01B" />
      </g>

      {/* Pressurized Liquid Color Squirts */}
      <g ref={jetsRef}>
        <path d="M25 26C28 22 34 20 37 18" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 26.5C29 25 35 24 38 25" stroke="#FF1B58" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 27C28 29 34 32 37 34" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="35" cy="14" r="1.8" fill="#FFE01B" />
        <circle cx="38" cy="20" r="1.5" fill="#EC4899" />
        <circle cx="36" cy="30" r="2" fill="#06B6D4" />
      </g>

      {/* Overflowing Gulal Powder Bowl */}
      <g ref={bowlRef}>
        <path d="M6 16C6 16 8 22 14 22C20 22 22 16 22 16Z" fill="#B45309" />
        <ellipse cx="14" cy="15" rx="7" ry="2.5" fill="#FF1B58" />
        <ellipse cx="14" cy="13.5" rx="4.5" ry="2" fill="#FFE01B" />
      </g>
    </svg>
  );
};

const HoliRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const splashRef = useRef<SVGGElement>(null);
  const dropletsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Elastic pulsating multi-color impact splash
      if (splashRef.current) {
        gsap.to(splashRef.current, {
          scale: 1.25,
          rotation: -12,
          transformOrigin: "center center",
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "elastic.out(1.2, 0.4)",
        });
      }

      // Outer satellite splatter droplets throwing outward
      if (dropletsRef.current) {
        gsap.to(dropletsRef.current.children, {
          scale: 1.35,
          stagger: {
            each: 0.08,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.6,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_12px_rgba(255,224,27,0.7)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dynamic Multi-layered Liquid Splat */}
      <g ref={splashRef}>
        {/* Layer 1: Radiant Yellow Outer Splat */}
        <path
          d="M19 8C24 4 31 7 33 13C35 19 31 22 35 27C39 32 35 37 29 36C23 35 21 38 16 36C11 34 5 32 5 25C5 18 10 20 12 14C14 8 14 12 19 8Z"
          fill="#FFE01B"
        />

        {/* Layer 2: Electric Pink Inner Core Burst */}
        <path
          d="M19 12C22 10 27 12 28 16C29 20 26 22 28 26C30 30 26 33 22 31C18 29 17 31 14 29C11 27 8 24 9 20C10 16 13 18 14 14C15 10 16 14 19 12Z"
          fill="#FF1B58"
        />

        {/* Layer 3: Neon Cyan Fluid Epicenter */}
        <ellipse cx="19" cy="20" rx="4.5" ry="4" fill="#06B6D4" />
      </g>

      {/* Outward Exploding Satellite Droplets & Splatters */}
      <g ref={dropletsRef}>
        <circle cx="34" cy="8" r="2.2" fill="#22C55E" />
        <circle cx="37" cy="22" r="2.5" fill="#9333EA" />
        <circle cx="31" cy="35" r="2" fill="#F97316" />
        <circle cx="10" cy="37" r="2.5" fill="#06B6D4" />
        <circle cx="2" cy="22" r="2.2" fill="#FF1B58" />
        <circle cx="6" cy="8" r="2.6" fill="#FFE01B" />
        <circle cx="19" cy="2" r="2.4" fill="#EC4899" />
      </g>
    </svg>
  );
};

// ==========================================
// 7. HARVEST & HERITAGE MOTIFS (Bihu, Moatsu, Tuluni, Onam)
// ==========================================

const HarvestLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const grainRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Swaying golden wheat / paddy harvest sheaf
      if (grainRef.current) {
        gsap.to(grainRef.current, {
          rotation: 6,
          transformOrigin: "bottom center",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,224,27,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={grainRef}>
        {/* Center Stalk */}
        <line x1="19" y1="33" x2="19" y2="7" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
        {/* Golden Grains of Paddy */}
        <ellipse cx="15" cy="10" rx="3.5" ry="1.8" transform="rotate(-30 15 10)" fill="#FFE01B" />
        <ellipse cx="23" cy="10" rx="3.5" ry="1.8" transform="rotate(30 23 10)" fill="#FFE01B" />
        <ellipse cx="14" cy="16" rx="3.5" ry="1.8" transform="rotate(-30 14 16)" fill="#F59E0B" />
        <ellipse cx="24" cy="16" rx="3.5" ry="1.8" transform="rotate(30 24 16)" fill="#F59E0B" />
        <ellipse cx="15" cy="22" rx="3.5" ry="1.8" transform="rotate(-30 15 22)" fill="#FFE01B" />
        <ellipse cx="23" cy="22" rx="3.5" ry="1.8" transform="rotate(30 23 22)" fill="#FFE01B" />
        <ellipse cx="19" cy="6" rx="2" ry="3.5" fill="#FFE01B" />
      </g>
    </svg>
  );
};

const HarvestRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const dholRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rhythmic folk dhol drum beat
      if (dholRef.current) {
        gsap.to(dholRef.current, {
          rotation: -5,
          scale: 1.05,
          transformOrigin: "center center",
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(255,224,27,0.4)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={dholRef}>
        {/* Barrel Dhol Drum */}
        <ellipse cx="19" cy="19" rx="13" ry="8" fill="#B45309" stroke="#FFE01B" strokeWidth="1" />
        <line x1="6" y1="19" x2="32" y2="19" stroke="#78350F" strokeWidth="1.2" />
        {/* Left & Right Drum Heads */}
        <ellipse cx="6" cy="19" rx="2.5" ry="7" fill="#FFE01B" stroke="#B45309" strokeWidth="1" />
        <ellipse cx="32" cy="19" rx="2.5" ry="7" fill="#FFE01B" stroke="#B45309" strokeWidth="1" />
        {/* Drumstick */}
        <line x1="28" y1="9" x2="33" y2="17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// ==========================================
// 8. SPRING & EASTER MOTIFS (Good Friday, Easter)
// ==========================================

const SpringLeft = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const branchRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Peaceful olive branch sway
      if (branchRef.current) {
        gsap.to(branchRef.current, {
          rotation: 4,
          transformOrigin: "bottom left",
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={branchRef}>
        {/* Olive Branch Stem */}
        <path d="M6 32C10 24 16 16 28 8" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" />
        {/* Delicate Leaves */}
        <ellipse cx="14" cy="20" rx="4" ry="2" transform="rotate(-40 14 20)" fill="#22C55E" />
        <ellipse cx="19" cy="16" rx="4" ry="2" transform="rotate(40 19 16)" fill="#86EFAC" />
        <ellipse cx="23" cy="12" rx="4" ry="2" transform="rotate(-30 23 12)" fill="#22C55E" />
        <ellipse cx="28" cy="8" rx="4" ry="2" transform="rotate(20 28 8)" fill="#86EFAC" />
        {/* Dewdrop sparkles */}
        <circle cx="21" cy="14" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

const SpringRight = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const eggRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cheerful Easter egg rocking
      if (eggRef.current) {
        gsap.to(eggRef.current, {
          rotation: -5,
          scale: 1.06,
          transformOrigin: "center bottom",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 38 38"
      className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 overflow-visible drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g ref={eggRef}>
        {/* Decorated Easter Egg */}
        <path
          d="M19 4C13.5 4 9 12 9 22C9 28 13.5 32 19 32C24.5 32 29 28 29 22C29 12 24.5 4 19 4Z"
          fill="url(#easterEggGrad)"
        />
        {/* Zigzag ribbon pattern */}
        <path
          d="M10 20L13 17L16 20L19 17L22 20L25 17L28 20"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M11 25L14 23L17 25L20 23L23 25L26 23"
          stroke="#FFE01B"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="15" cy="12" r="1.5" fill="#FFE01B" />
        <circle cx="23" cy="12" r="1.5" fill="#FFFFFF" />
      </g>
      <defs>
        <linearGradient id="easterEggGrad" x1="9" y1="4" x2="29" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="0.5" stopColor="#C084FC" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ==========================================
// EXPORTED COMPONENT WRAPPERS
// ==========================================

export const FestivalMotifLeft: React.FC<MotifProps> = ({ theme }) => {
  switch (theme) {
    case "durga-puja":
      return <DurgaPujaLeft />;
    case "diwali":
      return <DiwaliLeft />;
    case "hornbill":
      return <HornbillLeft />;
    case "christmas":
      return <ChristmasLeft />;
    case "chhath-puja":
      return <ChhathPujaLeft />;
    case "holi":
      return <HoliLeft />;
    case "harvest":
      return <HarvestLeft />;
    case "spring":
      return <SpringLeft />;
    default:
      return <DurgaPujaLeft />;
  }
};

export const FestivalMotifRight: React.FC<MotifProps> = ({ theme }) => {
  switch (theme) {
    case "durga-puja":
      return <DurgaPujaRight />;
    case "diwali":
      return <DiwaliRight />;
    case "hornbill":
      return <HornbillRight />;
    case "christmas":
      return <ChristmasRight />;
    case "chhath-puja":
      return <ChhathPujaRight />;
    case "holi":
      return <HoliRight />;
    case "harvest":
      return <HarvestRight />;
    case "spring":
      return <SpringRight />;
    default:
      return <DurgaPujaRight />;
  }
};
