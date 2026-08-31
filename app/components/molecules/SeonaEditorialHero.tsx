import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SeonaEditorialHero() {
  return (
    <section className="relative w-full bg-white text-[#1E1B2E] overflow-hidden pt-12 sm:pt-16 pb-24 sm:pb-32 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. TOP HEADER ROW ================= */}
        <div className="flex flex-col gap-5 mb-8">
          
          {/* Small Chartreuse Pill Tag */}
          <div className="inline-flex self-start">
            <span className="bg-[#C5F442] text-[#1E1B2E] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-black/10 shadow-sm">
              Learn by building
            </span>
          </div>

          {/* Title & Right Intro Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left: Large Serif Title */}
            <div className="lg:col-span-7">
              <h1
                className="text-4xl sm:text-6xl lg:text-[4.2rem] text-[#1E1B2E] font-normal tracking-tight leading-[1.08]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Skill is the only unfair advantage.
              </h1>
            </div>

            {/* Right: Intro Paragraph */}
            <div className="lg:col-span-5 lg:text-right">
              <p
                className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed max-w-sm ml-auto"
              >
                We are completely obsessed with assisting students and professionals in Nagaland to build real-world tech careers.
              </p>
            </div>
          </div>

        </div>

        {/* ================= 2. MAIN HERO BANNER CARD ================= */}
        <div
          className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-[#E5EEF9] overflow-visible my-8 p-4 sm:p-8 pt-8 sm:pt-12 min-h-[320px] sm:min-h-[420px] md:min-h-[460px] flex items-end justify-center border border-black/5 shadow-sm"
        >
          
          {/* Left Chartreuse Dot-Matrix Shape */}
          <div className="absolute left-4 sm:left-10 top-8 sm:top-12 w-44 sm:w-64 h-52 sm:h-64 bg-[#C5F442] rounded-2xl overflow-hidden -z-0">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
                backgroundSize: "8px 8px",
              }}
            />
          </div>

          {/* Top-Right Hand-Drawn Sun Doodle */}
          <div
            className="absolute top-5 right-6 sm:right-12 pointer-events-none z-10 animate-[spin_45s_linear_infinite]"
          >
            <svg className="w-10 sm:w-14 h-10 sm:h-14 text-[#1E1B2E]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="32" cy="32" r="10" />
              <line x1="32" y1="8" x2="32" y2="16" />
              <line x1="32" y1="48" x2="32" y2="56" />
              <line x1="8" y1="32" x2="16" y2="32" />
              <line x1="48" y1="32" x2="56" y2="32" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="43" y1="43" x2="49" y2="49" />
              <line x1="15" y1="49" x2="21" y2="43" />
              <line x1="43" y1="21" x2="49" y2="15" />
            </svg>
          </div>

          {/* Central Authentic Group of Students Photograph */}
          <div className="relative z-10 w-full max-w-3xl flex items-end justify-center">
            <Image
              src="/assets/images/hero-students.webp"
              alt="Hands-on youth tech skill development and computer lab training at instudia"
              width={800}
              height={400}
              priority
              fetchPriority="high"
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="w-full max-h-[320px] sm:max-h-[380px] md:max-h-[420px] object-cover object-top rounded-xl border border-black/10 shadow-md bg-white"
            />
          </div>

          {/* Right Rotated Starburst Sticker */}
          <div
            className="absolute right-3 sm:right-8 bottom-8 sm:bottom-12 z-20 pointer-events-none rotate-[-4deg]"
          >
            <div className="bg-[#C5F442] text-[#1E1B2E] font-black text-[9px] sm:text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1 border border-black/10">
              <span>★</span>
              <span>ALWAYS INNOVATE</span>
            </div>
          </div>

          {/* Bottom-Left Hand-Drawn Animated Cloud Mascot */}
          <div
            className="absolute -left-3 sm:-left-6 -bottom-5 sm:-bottom-6 z-30 pointer-events-none animate-pulse"
          >
            <svg
              className="w-24 sm:w-32 h-16 sm:h-22 drop-shadow-md"
              viewBox="0 0 110 75"
              fill="none"
            >
              {/* Cloud Outline */}
              <path
                d="M25 55 C12 55 8 42 14 32 C12 22 22 16 32 20 C38 10 54 10 62 18 C72 10 88 14 90 26 C100 30 102 44 95 54 C90 58 80 58 75 55 Z"
                fill="#FFFFFF"
                stroke="#1E1B2E"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Big Expressive Cartoon Eyes */}
              <ellipse cx="44" cy="34" rx="4" ry="6" fill="#1E1B2E" />
              <ellipse cx="62" cy="34" rx="4" ry="6" fill="#1E1B2E" />
              <circle cx="45.5" cy="32" r="1.5" fill="#FFFFFF" />
              <circle cx="63.5" cy="32" r="1.5" fill="#FFFFFF" />
              {/* Cute Curved Smile */}
              <path d="M48 44 Q53 49 58 44" stroke="#1E1B2E" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ================= 3. ACTION BUTTONS CLUSTER ================= */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 my-8">
          <Link
            href="/courses"
            prefetch={false}
            className="px-6 sm:px-7 py-3 bg-[#1E1B2E] hover:bg-[#C5F442] text-white hover:text-[#1E1B2E] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            Explore 19+ Courses
          </Link>

          <Link
            href="/contact"
            className="px-5 sm:px-6 py-3 bg-[#C5F442] hover:bg-[#1E1B2E] hover:text-white text-[#1E1B2E] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm group"
          >
            <span className="w-2 h-2 rounded-full bg-[#1E1B2E] group-hover:bg-[#C5F442] animate-pulse" />
            <span>AI Workshop Part 2 (End Sept · TBA)</span>
            <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
          </Link>

          <a
            href="https://tally.so/r/wvebpA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-6 py-3 bg-neutral-100 hover:bg-[#1E1B2E] hover:text-white text-[#1E1B2E] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
          >
            Contact Us
          </a>
        </div>

        {/* ================= 4. LARGE EDITORIAL MANIFESTO QUOTE ================= */}
        <div className="max-w-3xl mx-auto text-center my-16 sm:my-20 px-2">
          <p
            className="text-xl sm:text-2xl md:text-[1.75rem] text-[#2D2342] italic font-normal leading-[1.6]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            We are completely fixated on assisting individuals in Nagaland to build real-world tech careers. All of our collaborations are full-funnel engagements with faculty that we wholeheartedly support. Our sole goal is to promote practical skill mastery and industry employment.
          </p>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-neutral-200" />

      </div>
    </section>
  );
}
