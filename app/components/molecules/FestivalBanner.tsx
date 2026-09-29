"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { getActiveFestival } from "@/app/utils/festival";
import { FestivalEffectOverlay, FestivalDoodle } from "../atom/FestivalEffects";

/**
 * FestivalBanner renders the active seasonal festival or default workshop announcement.
 * Reads preview date strictly in useEffect to ensure 100% static HTML generation (0 SSR bailouts).
 */
export default function FestivalBanner() {
  const [festivalDate, setFestivalDate] = useState<string | null>(null);

  // Safely read preview query parameter in client effect without triggering SSR bailouts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("festivalDate");
      if (dateParam) {
        setFestivalDate(dateParam);
      }
    }
  }, []);

  const activeFestival = useMemo(() => {
    return getActiveFestival(festivalDate || undefined);
  }, [festivalDate]);

  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (!activeFestival || !activeFestival.effect || activeFestival.effect === "none") {
      setShowEffects(false);
      return;
    }

    if (festivalDate) {
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), 6000);
      return () => clearTimeout(timer);
    }

    const sessionKey = `instudia_festival_${activeFestival.id}_seen`;
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem(sessionKey) : null;

    if (!hasSeen) {
      try {
        sessionStorage.setItem(sessionKey, "true");
      } catch {
        // Ignore storage write errors (e.g. privacy mode)
      }
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), 6000);
      return () => clearTimeout(timer);
    } else {
      setShowEffects(false);
    }
  }, [activeFestival, festivalDate]);

  return (
    <>
      <FestivalEffectOverlay
        effect={activeFestival?.effect}
        active={showEffects}
      />
      <div
        className={clsx(
          "relative flex min-h-[36px] sm:min-h-10 py-1.5 sm:py-2 items-center justify-center px-3 sm:px-6 lg:px-8 print:hidden transition-all duration-500 overflow-hidden border-b border-white/10",
          activeFestival
            ? clsx(activeFestival.colors.bannerBg, activeFestival.colors.bannerText)
            : "bg-[#1b1c1e] text-white"
        )}
      >
        {!activeFestival && (
          <>
            <div className="absolute inset-0 bg-[#1b1c1e] pointer-events-none" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-80 h-10 bg-[#1b1c1e] blur-2xl pointer-events-none" />
          </>
        )}

        {!activeFestival ? (
          <Link
            href="/contact"
            className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-3 text-center group cursor-pointer max-w-full"
          >
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest bg-[#58FF1B]/15 text-[#58FF1B] border border-[#58FF1B]/50 shadow-[0_0_10px_rgba(88,255,27,0.3)] shrink-0 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58FF1B] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58FF1B]" />
              </span>
              <span className="hidden sm:inline">AGENTIC AI // PART 2</span>
              <span className="sm:hidden">PART 2</span>
            </span>

            <span className="text-[11px] sm:text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5">
              <span className="hidden sm:inline">Agentic AI Workshop Part 2 — </span>
              <span>Planning for End of September (Date TBA)</span>
              <span className="font-bold text-[#FFE01B] underline decoration-1 sm:decoration-2 underline-offset-2 group-hover:text-[#58FF1B] transition-colors whitespace-nowrap ml-0.5">
                Enquire ↗
              </span>
            </span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            {activeFestival.bannerText}
            {activeFestival.doodle && <FestivalDoodle type={activeFestival.doodle} />}
          </span>
        )}
      </div>
    </>
  );
}
