"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AccreditationItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  badge: string;
  color: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
}

const ACCREDITATIONS: AccreditationItem[] = [
  {
    id: "iso",
    code: "ISO 9001:2015",
    title: "ISO 9001:2015",
    subtitle: "Global Quality Management",
    category: "International Standard",
    description: "Audited quality benchmark for curriculum delivery, practical software lab training, and student outcomes.",
    badge: "Certified QMS",
    color: "#1b1c1e",
    logo: "/assets/images/iso-logo.webp",
    logoAlt: "ISO 9001:2015 Certified Computer Training Institute in Dimapur, Nagaland",
    logoWidth: 140,
    logoHeight: 140,
    logoClassName: "max-h-16 sm:max-h-18 w-auto object-contain",
  },
  {
    id: "niact",
    code: "NIACT ACADEMIC HUB",
    title: "NIACT Partner",
    subtitle: "National IT Training Portal",
    category: "Diploma Authority",
    description: "National Institute for Advanced Computer Technology curriculum partner providing recognized diploma programs.",
    badge: "Authorized IT Center",
    color: "#1b1c1e",
    logo: "/assets/images/niact.webp",
    logoAlt: "National Institute for Advanced Computer Technology Training Partner",
    logoWidth: 160,
    logoHeight: 70,
    logoClassName: "max-h-12 sm:max-h-14 w-auto object-contain",
  },
  {
    id: "msme",
    code: "GOVT. OF INDIA",
    title: "Govt. MSME",
    subtitle: "Ministry of MSME Enterprise",
    category: "Govt. Recognition",
    description: "UDYAM registered skill development center fostering youth employment and digital literacy in Nagaland.",
    badge: "UDYAM Registered",
    color: "#1b1c1e",
    logo: "/assets/images/msme-logo.webp",
    logoAlt: "Ministry of MSME Certified Skill Training Programs in Nagaland",
    logoWidth: 150,
    logoHeight: 90,
    logoClassName: "max-h-14 sm:max-h-16 w-auto object-contain",
  },
  {
    id: "tally",
    code: "TALLY ACADEMY",
    title: "Tally Certified",
    subtitle: "Official Learning Partner (TIL)",
    category: "Financial Tech",
    description: "Official learning and assessment hub for Tally Prime, GST compliance, and computerized business accounting.",
    badge: "Authorized TIL",
    color: "#1b1c1e",
    logo: "https://ik.imagekit.io/oytjocebw/tally.png",
    logoAlt: "Tally Certified Computer Institute in Dimapur, Nagaland",
    logoWidth: 150,
    logoHeight: 80,
    logoClassName: "max-h-12 sm:max-h-14 w-auto object-contain",
  },
];

export default function CoskaHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const xWrapperTo = useRef<((value: number) => void) | null>(null);
  const yWrapperTo = useRef<((value: number) => void) | null>(null);
  const xTextTo = useRef<((value: number) => void) | null>(null);
  const yTextTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Top philosophy tag entrance
      tl.fromTo(
        ".hero-philosophy-tag",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // 2a. Desktop 3D Perspective Line Reveal (gsap.com signature)
      tl.fromTo(
        ".hero-headline-desktop .hero-headline-word",
        {
          y: "125%",
          opacity: 0,
          rotateX: 35,
          transformOrigin: "50% 100% -30px",
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: "power4.out",
          onComplete: () => {
            gsap.set(".hero-headline-desktop .hero-headline-line", { overflow: "visible" });
          },
        },
        "-=0.25"
      );

      // 2b. Mobile Clean Line Stagger Entrance
      tl.fromTo(
        ".hero-headline-mobile .hero-headline-line-mob",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
        },
        "<"
      );

      // 3. Kinetic pop & spin on embedded flairs (both desktop & mobile)
      tl.fromTo(
        ".hero-flair-windmill, .hero-flair-windmill-mob",
        { scale: 0, rotation: -360, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.05, ease: "back.out(2.2)" },
        "-=0.7"
      );

      tl.fromTo(
        ".hero-glyph-star",
        { scale: 0, rotation: -270, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(2.5)" },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-glyph-diamond",
        { scale: 0, rotation: 45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.85, ease: "back.out(3)" },
        "-=0.7"
      );

      tl.fromTo(
        ".hero-flair-bolt",
        { scale: 0, y: -20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "back.out(2)" },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-flair-circles",
        { scale: 0, rotation: 180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.95, ease: "back.out(2)" },
        "-=0.65"
      );



      // 4. CTA button and its orbital flairs
      tl.fromTo(
        ".gsap-btn-container",
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // 5. Showcase cards gallery
      tl.fromTo(
        ".hero-showcase-gallery",
        { opacity: 0, y: 36, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out" },
        "-=0.45"
      );

      // 6. Editorial narrative
      tl.fromTo(
        ".hero-footer-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        "-=0.3"
      );

      // Idle continuous floating animation on the orbital flairs around the CTA button
      gsap.to(".orbit-flair-1", {
        y: -5,
        rotation: 12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-flair-2", {
        y: 6,
        rotation: -15,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-flair-3", {
        x: -4,
        y: 4,
        rotation: 20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-flair-4", {
        x: 5,
        y: -4,
        rotation: -18,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle continuous idle rotation on windmill flair
      gsap.to(".hero-flair-windmill-svg", {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      // Continuous ambient breathing & rotation animation on the diamond flair
      gsap.to(".hero-glyph-diamond", {
        scale: 1.25,
        rotation: 45,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous ambient rotation on star glyph
      gsap.to(".hero-glyph-star", {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });

      // Continuous gentle pulse on dot glyph
      gsap.to(".hero-glyph-dot", {
        scale: 1.35,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ScrollTrigger Parallax Scrub on Hero Exit (desktop only for buttery 120fps touch scroll)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (sectionRef.current) {
          gsap.to(".hero-headline-container", {
            yPercent: -12,
            opacity: 0.85,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });

          gsap.to(".hero-showcase-gallery", {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      });

      // Smooth 120fps continuous quickTo interpolators for magnetic CTA button & secondary text parallax
      if (buttonWrapperRef.current) {
        xWrapperTo.current = gsap.quickTo(buttonWrapperRef.current, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        yWrapperTo.current = gsap.quickTo(buttonWrapperRef.current, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
      }

      if (buttonTextRef.current) {
        xTextTo.current = gsap.quickTo(buttonTextRef.current, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        yTextTo.current = gsap.quickTo(buttonTextRef.current, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
      }

      // 7. Dedicated Accreditation Section Entrance via ScrollTrigger
      const accSection = document.querySelector(".hero-accreditation-section");
      if (accSection) {
        gsap.fromTo(
          ".accreditation-header",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: accSection,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          ".accreditation-card",
          {
            opacity: 0,
            y: 44,
            scale: 0.94,
            rotateX: 12,
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: accSection,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Gallery scroll listener to update mobile active indicator pill
  const handleGalleryScroll = () => {
    const container = galleryScrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.82;
    if (cardWidth <= 0) return;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveSlide(Math.min(Math.max(index, 0), 2));
  };

  const scrollToSlide = (index: number) => {
    const container = galleryScrollRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // 3D Mouse Parallax over cards
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length < 3) return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalized coordinates from -0.5 to 0.5
    const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

    // Card 1 subtle offset
    gsap.to(cards[0], {
      x: xNorm * -16,
      y: yNorm * -12,
      rotateY: xNorm * 3,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Card 2 slight lift
    gsap.to(cards[1], {
      x: 0,
      y: yNorm * 8,
      scale: 1 + Math.abs(xNorm) * 0.015,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Card 3 subtle offset
    gsap.to(cards[2], {
      x: xNorm * 16,
      y: yNorm * -12,
      rotateY: xNorm * -3,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.to(cards, {
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // Magnetic button tracking (ultra-smooth 120fps continuous interpolation with quickTo)
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (!buttonAreaRef.current) return;
    const rect = buttonAreaRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    xWrapperTo.current?.(x * 0.16);
    yWrapperTo.current?.(y * 0.16);

    xTextTo.current?.(x * 0.06);
    yTextTo.current?.(y * 0.06);
  };

  const handleButtonMouseLeave = () => {
    xWrapperTo.current?.(0);
    yWrapperTo.current?.(0);
    xTextTo.current?.(0);
    yTextTo.current?.(0);
  };

  // 3D Card Hover Tilt Micro-Interactions for Accreditation Cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const xPct = x / (rect.width / 2);
    const yPct = y / (rect.height / 2);

    gsap.to(card, {
      rotateX: -yPct * 7,
      rotateY: xPct * 7,
      transformPerspective: 900,
      y: -6,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // Interactive glyph hover & tap handlers (gsap.com signature)
  const handleStarHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotation: "+=360",
      scale: 1.25,
      duration: 0.65,
      ease: "back.out(2)",
      onComplete: () => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  const handleDiamondHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.45,
      rotation: "+=180",
      duration: 0.55,
      ease: "back.out(2)",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });
  };

  const handleDotHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.5,
      duration: 0.35,
      ease: "back.out(3)",
      onComplete: () => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  const handleWindmillHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotation: "+=180",
      scale: 1.2,
      duration: 0.6,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#F7F7F8] text-neutral-950 overflow-hidden pt-6 sm:pt-12 pb-14 sm:pb-24 font-sans antialiased border-b border-black/[0.06]"
    >
      {/* Background ambient subtle mesh dots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-brandgreen/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. TOP PHILOSOPHY BADGE */}
        <div className="hero-philosophy-tag flex items-center gap-2 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <span>✴</span>
            <span>Learn by building</span>
          </div>
        </div>

        {/* 2a. DESKTOP / LAPTOP HEADLINE (Signature 4-Line Locked GSAP Display) */}
        <div ref={headlineRef} className="hidden lg:block hero-headline-desktop mb-12 sm:mb-14 overflow-hidden [perspective:1000px]">
          <h1 className="text-[clamp(5.2rem,4.8vw,5.3rem)] leading-[0.88] font-black uppercase tracking-[-0.035em] flex flex-col gap-1 text-neutral-950">

            {/* Line 1: SKILL IS THE ONLY [Windmill] ✴ UNFAIR */}
            <div className="hero-headline-line overflow-hidden py-2 -my-2">
              <div className="hero-headline-word flex items-center gap-x-4 whitespace-nowrap will-change-transform">
                <span className="text-neutral-950">Skill is the only</span>

                {/* GSAP Windmill Flair */}
                <span
                  onMouseEnter={handleWindmillHover}
                  className="hero-flair-windmill inline-flex items-center justify-center cursor-pointer select-none origin-center w-10 h-10 -my-2"
                  title="Interactive windmill flair"
                >
                  <svg
                    viewBox="0 0 137 135"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hero-flair-windmill-svg w-full h-full drop-shadow-[0_2px_8px_rgba(255,135,9,0.3)]"
                  >
                    <path
                      d="M84.1148 67.3453H136.194C136.637 67.3453 137 67.7028 137 68.1397V134.043C137 134.484 136.633 134.845 136.186 134.841C99.0222 134.416 68.9737 104.827 68.502 68.2191V134.206C68.502 134.643 68.1392 135 67.6958 135H0.814284C0.366822 135 -2.06673e-05 134.639 0.00401052 134.198C0.439379 97.2879 30.9354 67.5042 68.498 67.5002H0.806238C0.362807 67.5002 0 67.1427 0 66.7057V0.802561C0 0.361644 0.366822 0.000171863 0.814284 0.00414409C37.9778 0.429172 68.0263 30.0183 68.498 66.6263V0.794617C68.498 0.357672 68.8608 0.000171819 69.3042 0.000171819H136.186C136.633 0.000171819 137 0.361644 136.996 0.802561C136.621 32.4969 114.079 58.94 83.9334 65.7802C83.0022 65.9907 83.1594 67.3453 84.1189 67.3453H84.1148Z"
                      fill="url(#paint_hero_windmill_desktop)"
                    />
                    <defs>
                      <linearGradient id="paint_hero_windmill_desktop" x1="-76.68" y1="-15.62" x2="165.68" y2="81.01" gradientUnits="userSpaceOnUse">
                        <stop offset="0.43" stopColor="#FF8709" />
                        <stop offset="0.79" stopColor="#F7BDF8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>

                <span className="text-neutral-400 inline-flex items-baseline gap-2.5">
                  <span
                    onMouseEnter={handleStarHover}
                    className="hero-glyph-star text-[#58FF1B] text-[0.8em] inline-flex items-center justify-center cursor-pointer select-none origin-center drop-shadow-[0_0_8px_rgba(88,255,27,0.5)] px-1 leading-none align-middle will-change-transform"
                    title="Interactive glyph"
                  >
                    ✴
                  </span>
                  <span>unfair</span>
                </span>
              </div>
            </div>

            {/* Line 2: ADVANTAGE ✦ REAL-WORLD */}
            <div className="hero-headline-line overflow-hidden py-2 -my-2">
              <div className="hero-headline-word flex items-baseline gap-x-4 whitespace-nowrap will-change-transform">
                <span className="text-neutral-400">advantage</span>
                <span className="text-neutral-400 inline-flex items-baseline gap-2.5">
                  <span
                    onMouseEnter={handleDiamondHover}
                    className="hero-glyph-diamond text-[#FF1B58] text-[0.72em] inline-flex items-center justify-center cursor-pointer select-none origin-center drop-shadow-[0_0_12px_rgba(255,27,88,0.6)] px-1.5 py-1 -my-1 leading-none align-middle will-change-transform"
                    title="Interactive glyph"
                  >
                    ✦
                  </span>
                  <span>Real-world</span>
                </span>
              </div>
            </div>

            {/* Line 3: TECH CAREERS IN NAGALAND [Lightning Bolt] */}
            <div className="hero-headline-line overflow-hidden py-2 -my-2">
              <div className="hero-headline-word flex items-center gap-x-4 whitespace-nowrap will-change-transform">
                <span className="text-neutral-950">tech careers in Nagaland</span>

                {/* GSAP Lightning Bolt Flair */}
                <span
                  className="hero-flair-bolt inline-flex items-center justify-center select-none w-6 h-9 -my-2"
                  title="Electric momentum"
                >
                  <svg
                    viewBox="0 0 134 229"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_2px_8px_rgba(10,228,72,0.4)]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M102.08 10C103.439 10 104.402 11.3264 103.982 12.6187L79.6746 87.3335C79.2542 88.6259 80.2175 89.9522 81.5765 89.9522H109.983C111.634 89.9522 112.574 91.8401 111.579 93.1577L11.2304 226L40.4408 124.708C40.8095 123.429 39.8499 122.154 38.5191 122.154H8.82733C7.44727 122.154 6.48193 120.789 6.94147 119.488L45.1353 11.334C45.4176 10.5346 46.1733 10 47.0211 10H102.08Z"
                      fill="#0AE448"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Line 4: • BUILT FOR SKILLS [Quad-Circles Flair] */}
            <div className="hero-headline-line overflow-hidden py-2 -my-2">
              <div className="hero-headline-word flex items-center gap-x-4 whitespace-nowrap will-change-transform">
                <span className="text-neutral-400 inline-flex items-baseline gap-3.5">
                  <span
                    onMouseEnter={handleDotHover}
                    className="hero-glyph-dot text-[#C21BFF] text-[0.85em] leading-none self-center inline-flex items-center justify-center cursor-pointer select-none origin-center drop-shadow-[0_0_8px_rgba(194,27,255,0.5)] px-1 align-middle will-change-transform"
                    title="Interactive glyph"
                  >
                    •
                  </span>
                  <span>built for skills</span>
                </span>

                {/* GSAP Quad-Circles Flair */}
                <span
                  className="hero-flair-circles inline-flex items-center justify-center select-none w-7 h-7 -my-2"
                  title="Geometric perfection"
                >
                  <svg
                    viewBox="0 0 156 156"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_2px_8px_rgba(225,147,255,0.4)]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M45.9341 76.316C43.4159 76.8454 40.8068 77.1236 38.1333 77.1236C17.0729 77.1236 0 59.8589 0 38.5618C0 17.2647 17.0729 0 38.1333 0C59.1938 0 76.2666 17.2647 76.2666 38.5618C76.2666 40.3457 76.1469 42.1013 75.915 43.8209H80.0849C79.853 42.1013 79.7332 40.3457 79.7332 38.5618C79.7332 17.2647 96.8061 0 117.867 0C138.927 0 156 17.2647 156 38.5618C156 59.8589 138.927 77.1236 117.867 77.1236C115.499 77.1236 113.182 76.9054 110.934 76.4879V79.5128C113.182 79.0953 115.499 78.8771 117.867 78.8771C138.927 78.8771 156 96.1418 156 117.439C156 138.736 138.927 156.001 117.867 156.001C96.8064 156.001 79.7335 138.736 79.7335 117.439C79.7335 114.736 80.0086 112.097 80.5319 109.551H75.6376C76.0508 111.825 76.2667 114.169 76.2667 116.564C76.2667 137.861 59.1938 155.126 38.1334 155.126C17.0729 155.126 6.30037e-05 137.861 6.30037e-05 116.564C6.30037e-05 95.2671 17.0729 78.0024 38.1334 78.0024C40.8068 78.0024 43.416 78.2806 45.9341 78.8099V76.316Z"
                      fill="url(#paint_hero_circles_desktop)"
                    />
                    <defs>
                      <radialGradient id="paint_hero_circles_desktop" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48.0022 111.876) rotate(-90) scale(122.883)">
                        <stop stopColor="#E193FF" />
                        <stop offset="0.67" stopColor="#8E78DA" />
                        <stop offset="1" stopColor="#DFC7E8" />
                      </radialGradient>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>

          </h1>
        </div>

        {/* 2b. MOBILE / TABLET HEADLINE (Clean, Purpose-Built Portrait Layout) */}
        <div className="block lg:hidden hero-headline-mobile mb-8">
          <h1 className="text-[clamp(2.1rem,6.8vw,2.6rem)] sm:text-[2.9rem] leading-[1.08] font-black uppercase tracking-[-0.035em] text-neutral-950 flex flex-col gap-1.5">

            {/* Line 1: Skill is the only [Windmill] */}
            <div className="hero-headline-line-mob flex items-center gap-2 will-change-transform">
              <span className="text-neutral-950">Skill is the only</span>
              <span
                onClick={handleWindmillHover}
                onMouseEnter={handleWindmillHover}
                className="hero-flair-windmill-mob inline-flex items-center justify-center cursor-pointer select-none origin-center w-7 h-7 sm:w-9 sm:h-9 active:scale-90 transition-transform shrink-0"
                title="Interactive windmill flair"
              >
                <svg
                  viewBox="0 0 137 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-flair-windmill-svg w-full h-full drop-shadow-[0_2px_8px_rgba(255,135,9,0.3)]"
                >
                  <path
                    d="M84.1148 67.3453H136.194C136.637 67.3453 137 67.7028 137 68.1397V134.043C137 134.484 136.633 134.841 136.186 134.841C99.0222 134.416 68.9737 104.827 68.502 68.2191V134.206C68.502 134.643 68.1392 135 67.6958 135H0.814284C0.366822 135 -2.06673e-05 134.639 0.00401052 134.198C0.439379 97.2879 30.9354 67.5042 68.498 67.5002H0.806238C0.362807 67.5002 0 67.1427 0 66.7057V0.802561C0 0.361644 0.366822 0.000171863 0.814284 0.00414409C37.9778 0.429172 68.0263 30.0183 68.498 66.6263V0.794617C68.498 0.357672 68.8608 0.000171819 69.3042 0.000171819H136.186C136.633 0.000171819 137 0.361644 136.996 0.802561C136.621 32.4969 114.079 58.94 83.9334 65.7802C83.0022 65.9907 83.1594 67.3453 84.1189 67.3453H84.1148Z"
                    fill="url(#paint_hero_windmill_mob)"
                  />
                  <defs>
                    <linearGradient id="paint_hero_windmill_mob" x1="-76.68" y1="-15.62" x2="165.68" y2="81.01" gradientUnits="userSpaceOnUse">
                      <stop offset="0.43" stopColor="#FF8709" />
                      <stop offset="0.79" stopColor="#F7BDF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>

            {/* Line 2: ✴ unfair advantage */}
            <div className="hero-headline-line-mob flex items-center gap-1.5 text-neutral-400 will-change-transform">
              <span
                onClick={handleStarHover}
                onMouseEnter={handleStarHover}
                className="hero-glyph-star text-[#58FF1B] text-[0.8em] inline-flex items-center justify-center cursor-pointer select-none drop-shadow-[0_0_8px_rgba(88,255,27,0.5)] active:scale-90"
              >
                ✴
              </span>
              <span>unfair advantage</span>
            </div>

            {/* Line 3: ✦ Real-world tech */}
            <div className="hero-headline-line-mob flex items-center gap-1.5 text-neutral-400 will-change-transform">
              <span
                onClick={handleDiamondHover}
                onMouseEnter={handleDiamondHover}
                className="hero-glyph-diamond text-[#FF1B58] text-[0.72em] inline-flex items-center justify-center cursor-pointer select-none drop-shadow-[0_0_12px_rgba(255,27,88,0.6)] active:scale-90"
              >
                ✦
              </span>
              <span>Real-world tech</span>
            </div>

            {/* Line 4: careers in Nagaland ⚡ */}
            <div className="hero-headline-line-mob flex items-center gap-1.5 will-change-transform">
              <span className="text-neutral-950">careers in Nagaland</span>
              <span className="hero-flair-bolt inline-flex items-center justify-center select-none w-4 h-6 sm:w-5 sm:h-7 shrink-0">
                <svg
                  viewBox="0 0 134 229"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_2px_8px_rgba(10,228,72,0.4)]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M102.08 10C103.439 10 104.402 11.3264 103.982 12.6187L79.6746 87.3335C79.2542 88.6259 80.2175 89.9522 81.5765 89.9522H109.983C111.634 89.9522 112.574 91.8401 111.579 93.1577L11.2304 226L40.4408 124.708C40.8095 123.429 39.8499 122.154 38.5191 122.154H8.82733C7.44727 122.154 6.48193 120.789 6.94147 119.488L45.1353 11.334C45.4176 10.5346 46.1733 10 47.0211 10H102.08Z"
                    fill="#0AE448"
                  />
                </svg>
              </span>
            </div>

            {/* Line 5: • built for skills [Quad-Circles Flair] */}
            <div className="hero-headline-line-mob flex items-center gap-2 text-neutral-400 will-change-transform">
              <span
                onClick={handleDotHover}
                onMouseEnter={handleDotHover}
                className="hero-glyph-dot text-[#C21BFF] text-[0.85em] inline-flex items-center justify-center cursor-pointer select-none drop-shadow-[0_0_8px_rgba(194,27,255,0.5)] active:scale-90"
              >
                •
              </span>
              <span>built for skills</span>
              <span
                className="hero-flair-circles inline-flex items-center justify-center select-none w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                title="Geometric perfection"
              >
                <svg
                  viewBox="0 0 156 156"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_2px_8px_rgba(225,147,255,0.4)]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.9341 76.316C43.4159 76.8454 40.8068 77.1236 38.1333 77.1236C17.0729 77.1236 0 59.8589 0 38.5618C0 17.2647 17.0729 0 38.1333 0C59.1938 0 76.2666 17.2647 76.2666 38.5618C76.2666 40.3457 76.1469 42.1013 75.915 43.8209H80.0849C79.853 42.1013 79.7332 40.3457 79.7332 38.5618C79.7332 17.2647 96.8061 0 117.867 0C138.927 0 156 17.2647 156 38.5618C156 59.8589 138.927 77.1236 117.867 77.1236C115.499 77.1236 113.182 76.9054 110.934 76.4879V79.5128C113.182 79.0953 115.499 78.8771 117.867 78.8771C138.927 78.8771 156 96.1418 156 117.439C156 138.736 138.927 156.001 117.867 156.001C96.8064 156.001 79.7335 138.736 79.7335 117.439C79.7335 114.736 80.0086 112.097 80.5319 109.551H75.6376C76.0508 111.825 76.2667 114.169 76.2667 116.564C76.2667 137.861 59.1938 155.126 38.1334 155.126C17.0729 155.126 6.30037e-05 137.861 6.30037e-05 116.564C6.30037e-05 95.2671 17.0729 78.0024 38.1334 78.0024C40.8068 78.0024 43.416 78.2806 45.9341 78.8099V76.316Z"
                    fill="url(#paint_hero_circles_mob)"
                  />
                  <defs>
                    <radialGradient id="paint_hero_circles_mob" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48.0022 111.876) rotate(-90) scale(122.883)">
                      <stop stopColor="#E193FF" />
                      <stop offset="0.67" stopColor="#8E78DA" />
                      <stop offset="1" stopColor="#DFC7E8" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </div>

          </h1>
        </div>

        {/* 3. SIGNATURE GSAP CTA BUTTON COMPONENT (WITH FLOATING ORBITAL FLAIRS) */}
        <div className="gsap-btn-container mb-10 sm:mb-16 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-6">

          {/* Left: Interactive Button Area with Stationary Coordinate Reference */}
          <div
            ref={buttonAreaRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="relative inline-flex items-center justify-center p-1 sm:p-6 sm:-m-6 w-full sm:w-auto"
          >
            {/* Magnetic Pill Wrapper */}
            <div
              ref={buttonWrapperRef}
              className="relative inline-flex items-center justify-center will-change-transform transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] w-full sm:w-auto"
            >
              {/* Orbital Flair 1: Mini Windmill (Top-Left) */}
              <div className="orbit-flair-1 absolute -top-1.5 -left-1 sm:-top-3.5 sm:-left-3.5 w-4 h-4 sm:w-6 sm:h-6 pointer-events-none z-20">
                <svg viewBox="0 0 62 63" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,186,226,0.4)]">
                  <path
                    d="m34.246 27.525 10.197-13.201a.26.26 0 0 1 .362-.047L61.76 27.372a.26.26 0 0 1 .046.366c-7.386 9.336-20.882 11.074-30.391 3.919l16.975 13.112c.112.087.133.25.046.362L35.34 62.085a.26.26 0 0 1-.365.046c-9.41-7.444-11.1-21.093-3.746-30.616l-13.255 17.16a.259.259 0 0 1-.362.046L.658 35.626a.26.26 0 0 1-.046-.365c7.386-9.337 20.881-11.074 30.391-3.92l-16.935-13.08a.259.259 0 0 1-.047-.363L27.117.944a.26.26 0 0 1 .365-.046c8.08 6.393 10.469 17.361 6.326 26.362-.129.278.25.508.439.264l-.001.001Z"
                    fill="#00BAE2"
                  />
                </svg>
              </div>

              {/* Orbital Flair 2: Mini Circles (Top-Right) */}
              <div className="orbit-flair-2 absolute -top-1.5 -right-1 sm:-top-3.5 sm:-right-3 w-3.5 h-3.5 sm:w-5 sm:h-5 pointer-events-none z-20">
                <svg viewBox="0 0 23 23" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(255,135,9,0.4)]">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.959 10.053a4.368 4.368 0 0 1-.889-.17c-2.327-.7-3.64-3.174-2.933-5.527C4.845 2.002 7.305.662 9.632 1.36c2.327.7 3.64 3.174 2.933 5.528-.06.197-.131.387-.214.57l.46.138c.032-.198.078-.396.137-.593.707-2.353 3.167-3.694 5.494-2.995 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995a4.377 4.377 0 0 1-.745-.3l-.1.333c.261.029.525.082.786.16 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995-2.327-.7-3.64-3.175-2.933-5.528a4.51 4.51 0 0 1 .35-.845l-.54-.163c-.03.265-.085.531-.164.796-.708 2.353-3.168 3.694-5.495 2.994-2.327-.7-3.64-3.174-2.933-5.527.708-2.354 3.168-3.694 5.495-2.995.295.089.574.206.835.349l.083-.276Z"
                    fill="#FF8709"
                  />
                </svg>
              </div>

              {/* Orbital Flair 3: Mini Square (Bottom-Left) */}
              <div className="orbit-flair-3 absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none z-20">
                <svg viewBox="0 0 19 19" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(255,150,249,0.4)]">
                  <path
                    d="M.27 7.683a1 1 0 0 1 .372-1.364L10.995.409a1 1 0 0 1 1.364.373l5.91 10.352a1 1 0 0 1-.373 1.365l-10.353 5.91a1 1 0 0 1-1.364-.373L.27 7.683Z"
                    fill="#FF96F9"
                  />
                </svg>
              </div>

              {/* Orbital Flair 4: Mini Star (Bottom-Right) */}
              <div className="orbit-flair-4 absolute -bottom-1.5 -right-1 sm:-bottom-2.5 sm:-right-2.5 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none z-20">
                <svg viewBox="0 0 18 18" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(10,228,72,0.4)]">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m6.324 7.326-4.936-.849a1.078 1.078 0 0 0-.374 2.124l4.93.887-4.091 2.89a1.078 1.078 0 0 0 1.238 1.766l4.112-2.858-.849 4.936a1.078 1.078 0 0 0 2.124.374l.887-4.93 2.89 4.09a1.078 1.078 0 0 0 1.766-1.238l-2.858-4.111 4.936.848a1.078 1.078 0 0 0 .374-2.124l-4.93-.887 4.09-2.89a1.078 1.078 0 0 0-1.238-1.766l-4.111 2.858.848-4.935a1.078 1.078 0 0 0-2.124-.374l-.886 4.93-2.89-4.091a1.078 1.078 0 0 0-1.766 1.238l2.858 4.112Z"
                    fill="#0AE448"
                  />
                </svg>
              </div>

              {/* The Main Pill Button */}
              <Link
                href="/courses"
                prefetch={false}
                className="group relative inline-flex items-center justify-center px-3 sm:px-8 py-3 sm:py-4.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-900 font-bold text-[11px] sm:text-sm tracking-tight shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-300 select-none w-full sm:w-auto min-h-[46px] sm:min-h-[48px] text-center"
              >
                <span
                  ref={buttonTextRef}
                  className="relative z-10 inline-block uppercase tracking-wider text-[11px] sm:text-sm font-bold will-change-transform transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] antialiased select-none pointer-events-none whitespace-nowrap"
                >
                  Explore Courses
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Secondary Actions */}
          <div className="flex items-center w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all font-semibold text-[11px] sm:text-xs uppercase tracking-wider shadow-xs w-full sm:w-auto min-h-[46px] sm:min-h-[48px] text-center whitespace-nowrap"
            >
              <span>Free Counseling</span>
              <span className="text-xs">&rarr;</span>
            </Link>
          </div>

        </div>

        {/* 4. 3-CARD SHOWCASE GALLERY (RESPONSIVE SNAP REEL ON MOBILE, 3-COL ON DESKTOP) */}
        <div className="hero-showcase-gallery mb-12 sm:mb-18">
          <div
            ref={galleryScrollRef}
            onScroll={handleGalleryScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 no-scrollbar [perspective:1200px]"
          >

            {/* Card 1: Practical Labs & Student Community */}
            <div
              ref={(el) => {
                cardsRef.current[0] = el;
              }}
              className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-neutral-900 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-w-[82vw] sm:min-w-[60vw] md:min-w-0 snap-center aspect-[16/11] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] will-change-transform shrink-0 md:shrink"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/images/hero-students.webp"
                  alt="Hands-on youth tech skill development and computer lab training at instudia"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 82vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                  Lab Immersion
                </span>
                <span className="w-2 h-2 rounded-full bg-[#58FF1B] animate-pulse" />
              </div>

              <div className="relative z-10 text-white">
                <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                  Collaborative
                </p>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold leading-tight text-white">
                  Authentic lab environment for hands-on software training.
                </h3>
              </div>
            </div>

            {/* Card 2: Industry Curriculum & Coding */}
            <div
              ref={(el) => {
                cardsRef.current[1] = el;
              }}
              className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-neutral-900 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-w-[82vw] sm:min-w-[60vw] md:min-w-0 snap-center aspect-[16/11] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] will-change-transform shrink-0 md:shrink"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/images/programming1.jpg"
                  alt="Computer programming, web development and practical software courses in Nagaland"
                  fill
                  sizes="(max-width: 768px) 82vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                  Curriculum
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF8709] animate-pulse" />
              </div>

              <div className="relative z-10 text-white">
                <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                  Real-World Stack
                </p>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold leading-tight text-white">
                  Web, Python, DCA, Tally &amp; GST mastery.
                </h3>
              </div>
            </div>

            {/* Card 3: Career Mentorship & Mission */}
            <div
              ref={(el) => {
                cardsRef.current[2] = el;
              }}
              className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-neutral-900 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-w-[82vw] sm:min-w-[60vw] md:min-w-0 snap-center aspect-[16/11] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] will-change-transform shrink-0 md:shrink"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/images/students-mission.webp"
                  alt="Instudia career mentorship, interview preparation and student outcomes"
                  fill
                  sizes="(max-width: 768px) 82vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                  Career Hub
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00BAE2] animate-pulse" />
              </div>

              <div className="relative z-10 text-white">
                <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                  Outcome Focused
                </p>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold leading-tight text-white">
                  One-to-one mentorship &amp; interview prep.
                </h3>
              </div>
            </div>

          </div>

          {/* Mobile pagination / track indicators */}
          <div className="flex md:hidden items-center justify-center gap-2 pt-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* 5. EDITORIAL NARRATIVE & STATS SUMMARY */}
        <div className="hero-footer-item grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start py-4 mb-10 sm:mb-14 border-t border-black/[0.06] pt-8 sm:pt-10">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-lg md:text-xl text-neutral-900 font-medium leading-relaxed">
              Based in Dimapur, we are completely obsessed with assisting students and professionals in Nagaland to build real-world tech careers. Purpose guides everything we teach—work that is practical, intentional, and built to last.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
              All of our collaborations are full-funnel engagements with faculty that we wholeheartedly support. Our sole goal is to promote practical skill mastery, resume building, and verified industry employment.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5">
            <Link
              href="/courses"
              prefetch={false}
              className="inline-flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-all duration-300 font-bold text-xs uppercase tracking-wider group shadow-sm min-h-[46px] sm:min-h-[48px]"
            >
              <span>Explore 19+ Courses</span>
              <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </Link>

            <a
              href="https://tally.so/r/wvebpA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-neutral-200/70 hover:bg-neutral-300/80 text-neutral-800 transition-all duration-300 font-bold text-xs uppercase tracking-wider group min-h-[46px] sm:min-h-[48px]"
            >
              <span>Contact Admissions</span>
              <span className="text-neutral-500 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* 7. SIGNATURE ACCREDITATION & RECOGNITION SHOWCASE */}
        <div className="hero-accreditation-section mt-10 sm:mt-24 pt-8 sm:pt-16 border-t border-black/[0.08] relative">

          {/* Header Row */}
          <div className="accreditation-header flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <div className="max-w-2xl">

              {/* Title */}
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-950 mb-2 leading-tight">
                Accredited &amp; Recognized{" "}
                <span className="text-neutral-400 font-light block sm:inline">
                  by Esteemed Institutes
                </span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Academic programs, vocational certifications, and student coursework at instudia are formally verified and audited under national and international quality frameworks.
              </p>
            </div>
          </div>

          {/* Cards Grid: 2x2 on Mobile, 4-col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {ACCREDITATIONS.map((item) => (
              <div
                key={item.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="accreditation-card group relative flex flex-col justify-between rounded-xl sm:rounded-3xl bg-white/95 border border-black/[0.08] hover:border-black/30 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden will-change-transform [transform-style:preserve-3d]"
              >
                {/* Logo Pod Stage */}
                <div className="relative h-20 sm:h-32 w-full mb-2.5 sm:mb-5 rounded-lg sm:rounded-2xl bg-neutral-50/90 border border-black/[0.04] group-hover:border-black/[0.08] group-hover:bg-white flex items-center justify-center p-2 sm:p-4 transition-all duration-500 overflow-hidden shadow-inner-xs">
                  {/* Microdot Matrix Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:12px_12px] opacity-70 pointer-events-none" />

                  {/* Interactive light sheen on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                  <div className="relative z-10 w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-500 ease-out">
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      width={item.logoWidth}
                      height={item.logoHeight}
                      unoptimized={item.logo.startsWith("http")}
                      className="max-h-11 sm:max-h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Information Copy */}
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <div className="flex items-center mb-0.5 sm:hidden">
                    <span
                      className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full"
                      style={{ color: item.color, backgroundColor: `${item.color}15` }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-lg font-bold text-neutral-950 tracking-tight group-hover:text-black transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 font-mono line-clamp-1">
                    {item.subtitle}
                  </span>
                  <p className="hidden sm:block text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

