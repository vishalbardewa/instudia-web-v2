import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CoskaHero() {
  return (
    <section className="relative w-full bg-[#F7F7F8] text-neutral-950 overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-24 font-sans antialiased border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= 1. TOP STATUS & BADGE ROW ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Philosophy Tag */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <span>✴</span>
            <span>Learn by building</span>
          </div>
        </div>

        {/* ================= 2. SIGNATURE COSKA DISPLAY HEADLINE ================= */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-[2.6rem] leading-[0.96] sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black uppercase tracking-[-0.035em] text-neutral-950">
            <span className="text-neutral-950">Skill is the only</span>{" "}
            <span className="text-neutral-400"><span className="text-[#58FF1B]">✴</span> unfair advantage</span>
            <br />
            <span className="text-neutral-400"><span className="text-[#FF1B58]">✦</span> Real-world</span>{" "}
            <span className="text-neutral-950">tech careers</span>
            <br />
            <span className="text-neutral-950">in Nagaland</span>{" "}
            <span className="text-neutral-400"><span className="text-[#C21BFF]">•</span> built to scale</span>
          </h1>
        </div>

        {/* ================= 3. COSKA 3-CARD SHOWCASE GALLERY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">

          {/* Card 1: Practical Labs & Student Community */}
          <div className="group relative rounded-[2rem] overflow-hidden bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] aspect-[4/3] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/images/hero-students.webp"
                alt="Hands-on youth tech skill development and computer lab training at instudia"
                fill
                priority
                fetchPriority="high"
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle gradient scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10 self-start">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-neutral-900 border border-white/40 shadow-sm">
                01 / Practical Labs
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-white">
              <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                Real Project Building
              </p>
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                Authentic collaborative lab environment.
              </h2>
            </div>
          </div>

          {/* Card 2: Industry Curriculum & Coding */}
          <div className="group relative rounded-[2rem] overflow-hidden bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] aspect-[4/3] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/images/programming1.jpg"
                alt="Computer programming, web development and practical software courses in Nagaland"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10 self-start">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-neutral-900 border border-white/40 shadow-sm">
                02 / In-Demand Stack
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-white">
              <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                19+ Verified Courses
              </p>
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                Web, Python, DCA, Tally & GST mastery.
              </h2>
            </div>
          </div>

          {/* Card 3: Career Mentorship & Mission */}
          <div className="group relative rounded-[2rem] overflow-hidden bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] aspect-[4/3] sm:aspect-[4/5] md:aspect-[3/4] flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/images/students-mission.webp"
                alt="Instudia career mentorship, interview preparation and student outcomes"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10 self-start">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-neutral-900 border border-white/40 shadow-sm">
                03 / Career Ready
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-white">
              <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                Outcome Focused
              </p>
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                One-to-one mentorship & interview prep.
              </h2>
            </div>
          </div>

        </div>

        {/* ================= 4. EDITORIAL NARRATIVE & PILL ACTIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-4">

          {/* Left: Authoritative Editorial Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-neutral-900 font-medium leading-relaxed">
              Based in Dimapur, we are completely obsessed with assisting students and professionals in Nagaland to build real-world tech careers. Purpose guides everything we teach—work that is practical, intentional, and built to last.
            </p>
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
              All of our collaborations are full-funnel engagements with faculty that we wholeheartedly support. Our sole goal is to promote practical skill mastery, resume building, and verified industry employment.
            </p>
          </div>

          {/* Right: Coska Pill Button Cluster */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Primary Action Button */}
            <Link
              href="/courses"
              prefetch={false}
              className="inline-flex items-center justify-between px-8 py-4 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-all duration-300 shadow-sm group"
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                Explore 19+ Courses
              </span>
              <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </Link>

            {/* AI Workshop Pill */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-between px-8 py-4 rounded-full bg-white text-neutral-950 border border-neutral-300 hover:border-neutral-950 transition-all duration-300 shadow-sm group"
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  AI Workshop Part 2 (End Sept · TBA)
                </span>
              </span>
              <span className="text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </Link>

            {/* Contact Pill */}
            <a
              href="https://tally.so/r/wvebpA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-8 py-4 rounded-full bg-neutral-200/70 hover:bg-neutral-300/80 text-neutral-800 transition-all duration-300 group"
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                Contact Admissions
              </span>
              <span className="text-neutral-500 group-hover:text-neutral-950 group-hover:translate-x-0.5 transition-transform duration-300">
                ↗
              </span>
            </a>
          </div>

        </div>

        {/* ================= 5. COSKA-STYLE ACCREDITATIONS & AFFILIATIONS STRIP ================= */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-black/[0.08]">
          <div className="flex items-center gap-2 mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <span>✴</span>
            <span>Accredited & Recognized by Esteemed Institutes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center">

            {/* ISO */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all duration-300 group">
              <div className="h-16 sm:h-20 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/assets/images/iso-logo.webp"
                  alt="ISO Certified Computer Institute in Dimapur, Nagaland"
                  width={140}
                  height={140}
                  unoptimized
                  className="max-h-16 sm:max-h-18 w-auto object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors">
                ISO 9001:2015
              </span>
            </div>

            {/* NIACT */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all duration-300 group">
              <div className="h-16 sm:h-20 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/assets/images/niact.webp"
                  alt="National Institute for Advanced Computer Technology Training"
                  width={160}
                  height={70}
                  unoptimized
                  className="max-h-12 sm:max-h-14 w-auto object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors">
                NIACT Partner
              </span>
            </div>

            {/* MSME */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all duration-300 group">
              <div className="h-16 sm:h-20 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/assets/images/msme-logo.webp"
                  alt="MSME Certified Skill Training Programs in Nagaland"
                  width={150}
                  height={90}
                  unoptimized
                  className="max-h-14 sm:max-h-16 w-auto object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors">
                Govt. MSME
              </span>
            </div>

            {/* Tally */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all duration-300 group">
              <div className="h-16 sm:h-20 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="https://ik.imagekit.io/oytjocebw/tally.png"
                  alt="Tally Certified Institute in Dimapur, Nagaland"
                  width={150}
                  height={80}
                  unoptimized
                  className="max-h-12 sm:max-h-14 w-auto object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors">
                Tally Certified
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
