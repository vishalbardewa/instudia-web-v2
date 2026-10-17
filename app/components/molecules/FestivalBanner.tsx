"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import gsap from "gsap";
import {
  getActiveFestival,
  getFestivalById,
  FESTIVALS_2026,
  Festival,
} from "@/app/utils/festival";
import { FestivalEffectOverlay } from "../atom/FestivalEffects";
import { FestivalMotifLeft, FestivalMotifRight } from "./festival/FestivalMotifs";

/**
 * FestivalBanner renders the active seasonal festival or default workshop announcement.
 * Enhanced with GSAP animations, bespoke festive motifs, aurora gradients, and a dev switcher.
 */
export default function FestivalBanner() {
  const [festivalDate, setFestivalDate] = useState<string | null>(null);
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);
  const [showDevSwitcher, setShowDevSwitcher] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Safely read preview query parameters in client effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("festivalDate");
      const festivalParam = params.get("festival");
      const previewParam = params.get("preview");

      if (dateParam) setFestivalDate(dateParam);
      if (festivalParam) setSelectedFestivalId(festivalParam);
      if (process.env.NODE_ENV !== "production" || previewParam !== null || dateParam || festivalParam) {
        setShowDevSwitcher(true);
      }
    }
  }, []);

  // Determine active festival (manual dev selection overrides date match)
  const activeFestival: Festival | null = useMemo(() => {
    if (selectedFestivalId === "none") return null;
    if (selectedFestivalId) {
      return getFestivalById(selectedFestivalId);
    }
    return getActiveFestival(festivalDate || undefined);
  }, [selectedFestivalId, festivalDate]);

  // Handle seasonal full-screen effects timing
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (!activeFestival || !activeFestival.effect || activeFestival.effect === "none") {
      setShowEffects(false);
      return;
    }

    const isAmbient = ["christmas-tree", "diwali-diyas", "sugarcane", "color-splash"].includes(activeFestival.effect);

    if (festivalDate || selectedFestivalId) {
      setShowEffects(true);
      // Give single-pass animation ample time to enter, dwell, and exit once (12s)
      const timer = setTimeout(() => setShowEffects(false), isAmbient ? 12000 : 8000);
      return () => clearTimeout(timer);
    }

    const sessionKey = `instudia_festival_${activeFestival.id}_seen`;
    const hasSeen =
      typeof window !== "undefined"
        ? localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey)
        : null;

    if (!hasSeen) {
      try {
        sessionStorage.setItem(sessionKey, "true");
        localStorage.setItem(sessionKey, "true");
      } catch {
        // Ignore storage write errors (e.g. incognito mode)
      }
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), isAmbient ? 12000 : 8000);
      return () => clearTimeout(timer);
    } else {
      setShowEffects(false);
    }
  }, [activeFestival, festivalDate, selectedFestivalId]);

  // GSAP light-sweep sheen & entrance animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Periodic specular light sweep across the banner
      if (sheenRef.current) {
        gsap.fromTo(
          sheenRef.current,
          { x: "-150%" },
          {
            x: "250%",
            duration: 2.2,
            repeat: -1,
            repeatDelay: 5.5,
            ease: "power2.inOut",
          }
        );
      }

      // Smooth content reveal when banner or festival changes
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
        );
      }

      // Subtle breathing pulse on the CTA pill
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          scale: 1.03,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, [activeFestival?.id]);

  return (
    <>
      <FestivalEffectOverlay
        effect={activeFestival?.effect}
        active={showEffects}
      />

      <div
        ref={bannerRef}
        className={clsx(
          "relative flex min-h-[38px] sm:min-h-11 py-1 sm:py-1.5 items-center justify-center px-3 sm:px-6 lg:px-8 print:hidden transition-all duration-700 overflow-hidden border-b shadow-sm",
          activeFestival
            ? clsx(activeFestival.colors.bannerBg, activeFestival.colors.bannerText, "border-white/15")
            : "bg-[#141517] text-white border-white/10"
        )}
      >
        {/* Animated Light Sweep Sheen */}
        <div
          ref={sheenRef}
          aria-hidden="true"
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] pointer-events-none"
        />

        {/* Subtle Ambient Radial Glow */}
        {activeFestival && (
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-12 blur-2xl pointer-events-none opacity-40"
            style={{ backgroundColor: activeFestival.colors.accentGlow }}
          />
        )}

        {/* Authentic Naga Shawl Geometric Woven Ribbon Accent for Hornbill */}
        {activeFestival?.themeKey === "hornbill" && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none opacity-90 shadow-sm"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #DC2626 0px,
                #DC2626 12px,
                #FFFFFF 12px,
                #FFFFFF 14px,
                #18181B 14px,
                #18181B 26px,
                #FFFFFF 26px,
                #FFFFFF 28px
              )`,
            }}
          />
        )}

        {/* Soft Ambient Holi Gulal Mist Aura */}
        {activeFestival?.themeKey === "holi" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-pink-500/15 via-yellow-400/20 to-blue-500/15 blur-sm opacity-80"
          />
        )}

        {/* DEFAULT ADMISSIONS BANNER (When no festival is active) */}
        {!activeFestival ? (
          <Link
            href="/courses"
            className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-3 text-center group cursor-pointer max-w-full"
          >
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest bg-[#58FF1B]/15 text-[#58FF1B] border border-[#58FF1B]/50 shadow-[0_0_10px_rgba(88,255,27,0.3)] shrink-0 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58FF1B] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58FF1B]" />
              </span>
              <span className="hidden sm:inline">ADMISSIONS OPEN // 2026</span>
              <span className="sm:hidden">ADMISSIONS</span>
            </span>

            <span className="text-[11px] sm:text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 truncate sm:overflow-visible">
              <span className="hidden sm:inline">Admissions Open for New Batches — </span>
              <span className="hidden sm:inline">Practical Tech &amp; Coding Programs in Dimapur</span>
              <span className="sm:hidden">New Batches Now Enrolling &mdash;</span>
              <span className="font-bold text-[#FFE01B] underline decoration-1 sm:decoration-2 underline-offset-2 group-hover:text-[#58FF1B] transition-colors whitespace-nowrap ml-0.5">
                Explore &rarr;
              </span>
            </span>
          </Link>
        ) : (
          /* FESTIVAL BANNER WITH BESPOKE GSAP FLANKING MOTIFS & HYBRID CTA */
          <div
            ref={contentRef}
            className="relative z-10 flex items-center justify-center w-full max-w-6xl mx-auto gap-2 sm:gap-3.5 lg:gap-5 px-1"
          >
            {/* Left Flanking Festive Motif */}
            <div className="flex items-center shrink-0">
              <FestivalMotifLeft theme={activeFestival.themeKey} />
            </div>

            {/* Centered Festive Greeting & Action */}
            <div className="flex items-center flex-wrap sm:flex-nowrap justify-center gap-1.5 sm:gap-3 text-center min-w-0">
              {/* Full Greeting on Tablet/Desktop */}
              <span className="hidden sm:inline text-xs sm:text-sm font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {activeFestival.bannerText}
              </span>

              {/* Concise Greeting on Mobile to prevent tall header wrapping */}
              <span className="sm:hidden text-[11px] font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] truncate max-w-[210px]">
                {activeFestival.shortGreeting || activeFestival.bannerText}
              </span>

              {/* Festive Call To Action Pill */}
              <Link
                ref={ctaRef}
                href={activeFestival.ctaHref || "/courses"}
                className={clsx(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-tight transition-all duration-300 border shadow-sm group hover:scale-105 shrink-0 whitespace-nowrap",
                  activeFestival.colors.pillBg,
                  activeFestival.colors.pillText,
                  activeFestival.colors.pillBorder
                )}
              >
                <span>{activeFestival.ctaText || "Explore &rarr;"}</span>
              </Link>
            </div>

            {/* Right Flanking Festive Motif */}
            <div className="hidden sm:flex items-center shrink-0">
              <FestivalMotifRight theme={activeFestival.themeKey} />
            </div>
          </div>
        )}
      </div>

      {/* EPHEMERAL DEV FESTIVAL SWITCHER (Floating bottom-right badge for instant live preview) */}
      {showDevSwitcher && (
        <div className="fixed bottom-4 right-4 z-[99999] font-sans text-xs print:hidden">
          {isSwitcherOpen ? (
            <div className="bg-[#141517]/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-3 w-64 text-white max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="font-bold text-[11px] uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span>✨</span> Festival Previewer
                </span>
                <button
                  type="button"
                  onClick={() => setIsSwitcherOpen(false)}
                  className="text-white/60 hover:text-white text-xs px-1.5 py-0.5 rounded hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Effects Controller Action Bar */}
              {activeFestival?.effect && activeFestival.effect !== "none" && (
                <div className="pb-2 mb-2 border-b border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-white/70">Effect: <span className="text-amber-300 font-mono">{activeFestival.effect}</span></span>
                  <button
                    type="button"
                    onClick={() => setShowEffects((prev) => !prev)}
                    className={clsx(
                      "px-2 py-0.5 rounded font-semibold transition-colors",
                      showEffects ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/30" : "bg-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    {showEffects ? "● Active" : "○ Replay"}
                  </button>
                </div>
              )}

              <div className="overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedFestivalId(null)}
                  className={clsx(
                    "w-full text-left px-2 py-1.5 rounded text-[11px] transition-colors flex items-center justify-between",
                    selectedFestivalId === null
                      ? "bg-amber-400/20 text-amber-300 font-semibold"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  <span>Auto (By Calendar Date)</span>
                  {selectedFestivalId === null && <span className="text-[10px]">● Active</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFestivalId("none")}
                  className={clsx(
                    "w-full text-left px-2 py-1.5 rounded text-[11px] transition-colors flex items-center justify-between",
                    selectedFestivalId === "none"
                      ? "bg-emerald-400/20 text-emerald-300 font-semibold"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  <span>Default Admissions Banner</span>
                  {selectedFestivalId === "none" && <span className="text-[10px]">●</span>}
                </button>

                <div className="pt-1 pb-0.5 text-[9px] uppercase tracking-wider text-white/40 font-mono">
                  All Festivals ({FESTIVALS_2026.length})
                </div>

                {FESTIVALS_2026.map((f) => {
                  const isSelected = (selectedFestivalId === f.id) || (selectedFestivalId === null && activeFestival?.id === f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFestivalId(f.id)}
                      className={clsx(
                        "w-full text-left px-2 py-1 rounded text-[11px] transition-colors flex items-center justify-between",
                        isSelected
                          ? "bg-amber-400/20 text-amber-300 font-semibold"
                          : "text-white/80 hover:bg-white/10"
                      )}
                    >
                      <span className="truncate">{f.name}</span>
                      <span className="text-[9px] text-white/50 shrink-0 ml-1">
                        {f.startDate.slice(5)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(true)}
              className="bg-[#1b1c1e]/90 hover:bg-[#1b1c1e] text-white border border-amber-400/40 hover:border-amber-400/80 rounded-full px-3 py-1.5 shadow-xl backdrop-blur-md flex items-center gap-2 transition-all duration-200 hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-[11px] font-semibold text-amber-200">
                Festivals: <span className="text-white font-normal">{activeFestival?.name || "Admissions"}</span>
              </span>
              <span className="text-white/40 text-[10px]">▲</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
