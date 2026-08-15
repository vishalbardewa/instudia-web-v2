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

type LayoutPreset =
  | "top-panoramic"
  | "dominant-left"
  | "dominant-right"
  | "split-diagonal"
  | "bottom-panoramic"
  | "asymmetric-cascade";

const LAYOUT_PRESETS: LayoutPreset[] = [
  "top-panoramic",
  "dominant-left",
  "split-diagonal",
  "dominant-right",
  "bottom-panoramic",
  "asymmetric-cascade",
];

const COLLAGE_POOL: CollageImage[] = [
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
  const [images, setImages] = useState<CollageImage[]>(COLLAGE_POOL);
  const [preset, setPreset] = useState<LayoutPreset>("top-panoramic");
  const [isPaused, setIsPaused] = useState(false);
  const presetIndexRef = useRef(0);

  // Dynamic width, height & slot morphing timer every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const runMorph = () => {
      // 1. Advance to the next layout preset with distinct widths and heights
      presetIndexRef.current = (presetIndexRef.current + 1) % LAYOUT_PRESETS.length;
      const nextPreset = LAYOUT_PRESETS[presetIndexRef.current];
      setPreset(nextPreset);

      // 2. Randomly morph image positions or bring in fresh queue photos
      setImages((prev) => {
        const next = [...prev];
        const randomMode = Math.floor(Math.random() * 3);

        if (randomMode === 0) {
          // Promote slot 1 or 2 to the primary featured position
          const targetSlot = Math.random() > 0.5 ? 1 : 2;
          const [promoted] = next.splice(targetSlot, 1);
          return [promoted, ...next];
        } else if (randomMode === 1 && next.length > 3) {
          // Inflow fresh image from queue into an active slot
          const slotToReplace = Math.floor(Math.random() * 3);
          const freshIdx = 3 + Math.floor(Math.random() * (next.length - 3));
          const [fresh] = next.splice(freshIdx, 1);
          const [displaced] = next.splice(slotToReplace, 1, fresh);
          next.push(displaced);
          return next;
        } else {
          // Shuffle visible slots
          const activeThree = next.slice(0, 3);
          const remaining = next.slice(3);
          const shuffled = [...activeThree].sort(() => Math.random() - 0.5);
          if (shuffled[0].id === activeThree[0].id && activeThree.length > 1) {
            const temp = shuffled[0];
            shuffled[0] = shuffled[1];
            shuffled[1] = temp;
          }
          return [...shuffled, ...remaining];
        }
      });
    };

    const interval = setInterval(runMorph, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Click on a smaller card to morph it into the featured slot with a new layout preset
  const handleCardClick = (idx: number) => {
    presetIndexRef.current = (presetIndexRef.current + 1) % LAYOUT_PRESETS.length;
    setPreset(LAYOUT_PRESETS[presetIndexRef.current]);

    if (idx === 0) return;
    setImages((prev) => {
      const next = [...prev];
      const selected = next.splice(idx, 1)[0];
      return [selected, ...next];
    });
  };

  // Continuous slot coordinates with dynamic morphing widths & heights across presets
  const getSlotCoordinates = (slotIndex: number, currentPreset: LayoutPreset) => {
    switch (currentPreset) {
      case "top-panoramic":
        // Slot 0: Full 100% wide banner (height: 56%)
        // Slot 1: Asymmetric 60% width card (height: 40%)
        // Slot 2: Asymmetric 37% width card (height: 40%)
        if (slotIndex === 0) {
          return {
            top: "0%",
            left: "0%",
            width: "100%",
            height: "56%",
            rotate: 0,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "60%",
            left: "0%",
            width: "calc(60% - 6px)",
            height: "40%",
            rotate: -0.8,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "60%",
          left: "calc(60% + 6px)",
          width: "calc(40% - 6px)",
          height: "40%",
          rotate: 0.8,
          scale: 0.98,
          zIndex: 10,
        };

      case "dominant-left":
        // Slot 0: Tall dominant left column (width: 56%, height: 100% full!)
        // Slot 1: Top right horizontal card (width: 42%, height: 47%)
        // Slot 2: Bottom right horizontal card (width: 42%, height: 49%)
        if (slotIndex === 0) {
          return {
            top: "0%",
            left: "0%",
            width: "calc(56% - 6px)",
            height: "100%",
            rotate: -0.5,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "0%",
            left: "calc(56% + 6px)",
            width: "calc(44% - 6px)",
            height: "47%",
            rotate: 0.8,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "51%",
          left: "calc(56% + 6px)",
          width: "calc(44% - 6px)",
          height: "49%",
          rotate: -0.6,
          scale: 0.98,
          zIndex: 10,
        };

      case "split-diagonal":
        // Slot 0: Top left broad block (width: 65%, height: 50%)
        // Slot 1: Top right compact tall block (width: 32%, height: 100%)
        // Slot 2: Bottom left wide block (width: 65%, height: 46%)
        if (slotIndex === 0) {
          return {
            top: "0%",
            left: "0%",
            width: "calc(65% - 6px)",
            height: "50%",
            rotate: 0,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "0%",
            left: "calc(65% + 6px)",
            width: "calc(35% - 6px)",
            height: "100%",
            rotate: 0.6,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "54%",
          left: "0%",
          width: "calc(65% - 6px)",
          height: "46%",
          rotate: -0.6,
          scale: 0.98,
          zIndex: 10,
        };

      case "dominant-right":
        // Slot 0: Tall dominant right column (width: 56%, height: 100% full!)
        // Slot 1: Top left horizontal card (width: 42%, height: 47%)
        // Slot 2: Bottom left horizontal card (width: 42%, height: 49%)
        if (slotIndex === 0) {
          return {
            top: "0%",
            left: "calc(44% + 6px)",
            width: "calc(56% - 6px)",
            height: "100%",
            rotate: 0.5,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "0%",
            left: "0%",
            width: "calc(44% - 6px)",
            height: "47%",
            rotate: -0.8,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "51%",
          left: "0%",
          width: "calc(44% - 6px)",
          height: "49%",
          rotate: 0.6,
          scale: 0.98,
          zIndex: 10,
        };

      case "bottom-panoramic":
        // Slot 0: Full 100% wide bottom featured banner (height: 56%)
        // Slot 1: Top left asymmetric 38% width card (height: 40%)
        // Slot 2: Top right asymmetric 59% width card (height: 40%)
        if (slotIndex === 0) {
          return {
            top: "44%",
            left: "0%",
            width: "100%",
            height: "56%",
            rotate: 0,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "0%",
            left: "0%",
            width: "calc(38% - 6px)",
            height: "40%",
            rotate: -0.8,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "0%",
          left: "calc(38% + 6px)",
          width: "calc(62% - 6px)",
          height: "40%",
          rotate: 0.8,
          scale: 0.98,
          zIndex: 10,
        };

      case "asymmetric-cascade":
      default:
        // Slot 0: Prominent top right block (width: 70%, height: 55%)
        // Slot 1: Full-height left slim banner (width: 27%, height: 100%)
        // Slot 2: Bottom right wide block (width: 70%, height: 41%)
        if (slotIndex === 0) {
          return {
            top: "0%",
            left: "calc(28% + 6px)",
            width: "calc(72% - 6px)",
            height: "55%",
            rotate: 0,
            scale: 1,
            zIndex: 20,
          };
        }
        if (slotIndex === 1) {
          return {
            top: "0%",
            left: "0%",
            width: "calc(28% - 6px)",
            height: "100%",
            rotate: -0.7,
            scale: 0.98,
            zIndex: 10,
          };
        }
        return {
          top: "59%",
          left: "calc(28% + 6px)",
          width: "calc(72% - 6px)",
          height: "41%",
          rotate: 0.6,
          scale: 0.98,
          zIndex: 10,
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
        const coordinates = getSlotCoordinates(idx, preset);

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={coordinates}
            transition={{
              type: "spring",
              stiffness: 125,
              damping: 17,
              mass: 0.85,
            }}
            onClick={() => handleCardClick(idx)}
            className={`absolute rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group cursor-pointer transition-shadow duration-300 hover:shadow-2xl ${
              isFeatured
                ? "shadow-xl border-neutral-300"
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
