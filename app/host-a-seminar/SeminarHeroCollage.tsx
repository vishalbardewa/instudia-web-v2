"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CollageImage {
  id: string;
  src: string;
  alt: string;
  location: string;
  source: string;
}

type LayoutPreset = "top-hero" | "left-pillar" | "right-pillar" | "bottom-hero";

const LAYOUT_PRESETS: LayoutPreset[] = [
  "top-hero",
  "left-pillar",
  "right-pillar",
  "bottom-hero",
];

const COLLAGE_IMAGES: CollageImage[] = [
  {
    id: "mgm-college",
    src: "https://ik.imagekit.io/oytjocebw/seminars/mgm/director-at-mgm-college.jpeg",
    alt: "MGM College Seminar on Modern Learning & Digital Tools",
    location: "MGM College, Dimapur",
    source: "Campus Session",
  },
  {
    id: "immanuel-college",
    src: "https://ik.imagekit.io/oytjocebw/seminars/immanuel/seminar-day.jpeg",
    alt: "Immanuel College Practical Seminar",
    location: "Immanuel College",
    source: "Nagaland Tribune",
  },
  {
    id: "spring-blossoms",
    src: "https://ik.imagekit.io/oytjocebw/seminars/spring-blossoms-academy/audience-spring-blossoms.jpeg",
    alt: "Spring Blossoms Academy Campus Assembly",
    location: "Spring Blossoms",
    source: "School Outreach",
  },
  {
    id: "chss-dimapur",
    src: "https://morungexpress.com/uploads/2026/06/74218719_1780413507_CHSS.jpg",
    alt: "Christian Higher Secondary School Seminar",
    location: "CHSS, Dimapur",
    source: "The Morung Express",
  },
  {
    id: "lewis-academy",
    src: "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/lewis-academy-group-shot.jpeg",
    alt: "Lewis Academy Seminar on Digital Skills",
    location: "Lewis Academy",
    source: "Nagaland Post",
  },
  {
    id: "beanstalk-school",
    src: "https://ik.imagekit.io/oytjocebw/seminars/beanstalk/resource-person-ai-3.jpeg",
    alt: "Beanstalk School Interactive Workshop",
    location: "Beanstalk School",
    source: "Nagaland Tribune",
  },
];

export default function SeminarHeroCollage() {
  const [images, setImages] = useState<CollageImage[]>(COLLAGE_IMAGES);
  const [presetIndex, setPresetIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activePreset = LAYOUT_PRESETS[presetIndex];

  // Fluid place & dimension morphing timer every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // 1. Advance to next layout preset for dynamic width & height morphing
      setPresetIndex((prev) => (prev + 1) % LAYOUT_PRESETS.length);

      // 2. Rotate image queue smoothly
      setImages((prev) => {
        const [first, second, third, ...rest] = prev;
        // Swap slots: second becomes featured, third becomes slot 1, first becomes slot 2
        return [second, third, first, ...rest];
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Click on a card to morph it into the featured primary slot
  const handleCardClick = (idx: number) => {
    setPresetIndex((prev) => (prev + 1) % LAYOUT_PRESETS.length);
    if (idx === 0) return;

    setImages((prev) => {
      const next = [...prev];
      const selected = next.splice(idx, 1)[0];
      return [selected, ...next];
    });
  };

  // Pure percentage-based slot coordinates (NO calc expressions)
  // This enables Framer Motion to perform GPU-accelerated math interpolation smoothly!
  const getSlotStyle = (slotIndex: number, preset: LayoutPreset) => {
    switch (preset) {
      case "top-hero":
        if (slotIndex === 0) {
          return {
            left: "0%",
            top: "0%",
            width: "100%",
            height: "56%",
            zIndex: 20,
            rotate: 0,
          };
        }
        if (slotIndex === 1) {
          return {
            left: "0%",
            top: "60%",
            width: "48%",
            height: "40%",
            zIndex: 10,
            rotate: -0.8,
          };
        }
        return {
          left: "52%",
          top: "60%",
          width: "48%",
          height: "40%",
          zIndex: 10,
          rotate: 0.8,
        };

      case "left-pillar":
        if (slotIndex === 0) {
          return {
            left: "0%",
            top: "0%",
            width: "52%",
            height: "100%",
            zIndex: 20,
            rotate: -0.5,
          };
        }
        if (slotIndex === 1) {
          return {
            left: "56%",
            top: "0%",
            width: "44%",
            height: "47%",
            zIndex: 10,
            rotate: 0.8,
          };
        }
        return {
          left: "56%",
          top: "53%",
          width: "44%",
          height: "47%",
          zIndex: 10,
          rotate: -0.6,
        };

      case "right-pillar":
        if (slotIndex === 0) {
          return {
            left: "48%",
            top: "0%",
            width: "52%",
            height: "100%",
            zIndex: 20,
            rotate: 0.5,
          };
        }
        if (slotIndex === 1) {
          return {
            left: "0%",
            top: "0%",
            width: "44%",
            height: "47%",
            zIndex: 10,
            rotate: -0.8,
          };
        }
        return {
          left: "0%",
          top: "53%",
          width: "44%",
          height: "47%",
          zIndex: 10,
          rotate: 0.6,
        };

      case "bottom-hero":
      default:
        if (slotIndex === 0) {
          return {
            left: "0%",
            top: "44%",
            width: "100%",
            height: "56%",
            zIndex: 20,
            rotate: 0,
          };
        }
        if (slotIndex === 1) {
          return {
            left: "0%",
            top: "0%",
            width: "48%",
            height: "40%",
            zIndex: 10,
            rotate: -0.8,
          };
        }
        return {
          left: "52%",
          top: "0%",
          width: "48%",
          height: "40%",
          zIndex: 10,
          rotate: 0.8,
        };
    }
  };

  return (
    <div
      className="relative w-full h-[380px] sm:h-[430px] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3 Active Morphing Cards with Dynamic Width & Height Transitions */}
      {images.slice(0, 3).map((item, idx) => {
        const isFeatured = idx === 0;
        const targetStyle = getSlotStyle(idx, activePreset);

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={targetStyle}
            transition={{
              type: "spring",
              stiffness: 115,
              damping: 19,
              mass: 0.85,
            }}
            onClick={() => handleCardClick(idx)}
            className={`absolute rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group cursor-pointer transition-shadow duration-300 hover:shadow-2xl ${
              isFeatured
                ? "shadow-xl border-neutral-300 ring-1 ring-black/5"
                : "hover:border-brandpurple/40"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={isFeatured}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={
                isFeatured
                  ? "(max-width: 1024px) 100vw, 580px"
                  : "(max-width: 1024px) 50vw, 280px"
              }
            />
            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] sm:text-[11px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20 shadow-xs truncate max-w-[75%]">
                {item.location}
              </span>
              {isFeatured && (
                <span className="text-[10px] font-mono text-white/90 hidden sm:inline-block bg-black/40 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                  {item.source}
                </span>
              )}
            </div>

            {/* Hover Tooltip */}
            {!isFeatured && (
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-white/20">
                Click to Morph
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Floating Verified Trust Badge Overlay */}
      <div className="absolute -bottom-3 -left-3 sm:-left-5 rounded-2xl bg-white border-2 border-[#1B1C1E] p-3 shadow-xl shadow-black/10 flex items-center gap-3 z-30 pointer-events-none">
        <div className="w-10 h-10 rounded-xl bg-[#FFE01B] flex items-center justify-center font-black text-black text-base border border-black/20 shrink-0">
          22+
        </div>
        <div>
          <p className="text-xs font-black text-[#1B1C1E] leading-tight">
            Partner Campuses
          </p>
          <p className="text-[10px] font-semibold text-neutral-500">
            Across Nagaland
          </p>
        </div>
      </div>
    </div>
  );
}
