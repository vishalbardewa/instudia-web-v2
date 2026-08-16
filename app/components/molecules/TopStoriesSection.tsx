"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { type PostSummary, formatDate } from "@/app/data/types";

const BRAND_COLORS = ["#C21BFF", "#FFE01B", "#FF1B58", "#58FF1B"];

interface TopStoriesSectionProps {
  posts: PostSummary[];
  title?: string;
  moreHref?: string;
}

export default function TopStoriesSection({
  posts,
  title = "Top stories",
  moreHref = "/blog",
}: TopStoriesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [posts]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-16 sm:my-24">
      {/* Outer Card Container */}
      <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-black/5">
          {/* Left: Icon + Heading */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Custom Styled Article/Clipboard Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-black bg-[#FFE01B] shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight leading-none">
                {title}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mt-1 hidden sm:block">
                Curated Insights & Guides
              </p>
            </div>
          </div>

          {/* Right: Controls + More Button */}
          <div className="flex items-center gap-3">
            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-9 h-9 rounded-full border-2 border-black flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                    : "bg-neutral-100 text-black/30 border-black/20 cursor-not-allowed"
                }`}
              >
                <svg
                  className="w-4 h-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-9 h-9 rounded-full border-2 border-black flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                    : "bg-neutral-100 text-black/30 border-black/20 cursor-not-allowed"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* More Pill Link */}
            <Link
              href={moreHref}
              prefetch={false}
              className="px-5 py-1.5 sm:px-6 sm:py-2 border-2 border-black rounded-full text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              More
            </Link>
          </div>
        </div>

        {/* Horizontal Story Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {posts.map((post, idx) => {
            const brandColor = BRAND_COLORS[idx % BRAND_COLORS.length];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="group flex-shrink-0 w-[190px] sm:w-[220px] md:w-[240px] aspect-[9/13] snap-start block"
              >
                <div
                  className="w-full h-full rounded-2xl border-2 border-black overflow-hidden relative bg-black shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1.5 group-hover:translate-x-0 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Background Image */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="relative z-10 p-3 flex justify-between items-start">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: brandColor }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-4 pt-0">
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight leading-snug line-clamp-3 group-hover:text-[#FFE01B] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[9px] font-bold text-white/60 uppercase tracking-wider">
                      <span>{formatDate(post.date)}</span>
                      <span className="text-white/80 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Scroll Progress Bar Track (Matching Screenshot) */}
        <div className="mt-4 pt-2 flex items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-md h-1.5 bg-neutral-200 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-black rounded-full"
              style={{
                scaleX: smoothProgress,
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
