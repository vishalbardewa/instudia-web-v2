"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineMilestone {
  year: string;
  title: string;
  location: string;
  tag: string;
  summary: string;
  metric: string;
  metricLabel: string;
  photo: {
    src: string;
    caption: string;
  };
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: "2022",
    title: "The Inception",
    location: "Fellowship Colony, Dimapur",
    tag: "Founding",
    summary:
      "instudia established its home base in Dimapur, launching practice-led programming and vocational cohorts to pioneer career-first tech education in Nagaland.",
    metric: "1st Base",
    metricLabel: "Campus Established",
    photo: {
      src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-1.webp?updatedAt=1728451886303",
      caption: "Inaugural workshop cohort in Dimapur",
    },
  },
  {
    year: "2023",
    title: "MSME & Industry Hiring",
    location: "Niuland & Dimapur",
    tag: "Govt & Industry",
    summary:
      "Partnered with the Ministry of MSME (Govt of India) for a 6-week ESDP program in Niuland and hosted JobEx, connecting 70+ local job seekers directly with regional recruiters.",
    metric: "70+ Placed",
    metricLabel: "Candidates at JobEx",
    photo: {
      src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland1.webp?updatedAt=1727423463408",
      caption: "MSME ESDP session in Niuland",
    },
  },
  {
    year: "2024",
    title: "Community Upskilling",
    location: "Dimapur & Suburbs",
    tag: "Community Impact",
    summary:
      "Collaborated with Dimapur Ao Baptist Arogo (DABA) to upskill youth in IT and workplace computing, alongside future-tech masterclasses across regional schools.",
    metric: "100%",
    metricLabel: "Certified Completion",
    photo: {
      src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-1.webp?updatedAt=1727556440968",
      caption: "DABA youth IT upskilling program",
    },
  },
  {
    year: "2025",
    title: "The AI Literacy Shift",
    location: "instudia AI Lab",
    tag: "AI Revolution",
    summary:
      "Pioneered practical AI literacy in Nagaland, training students and educators to turn modern AI tools into personalized study companions and productivity drivers.",
    metric: "3x Output",
    metricLabel: "Study Productivity Boost",
    photo: {
      src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face/website-workshop-instudia/ai-institute-workshop/ai-workshop-at-instudia.jpeg?updatedAt=1752486659667",
      caption: "Hands-on AI prompting workshop",
    },
  },
  {
    year: "2026",
    title: "Higher Ed & Social Architecture",
    location: "NEISSR & Statewide Campuses",
    tag: "Higher Education",
    summary:
      "Expanded statewide into universities—hosting 'The Social Architect' for BSW/MSW scholars at NEISSR alongside college-wide AI seminars at MGM College, Immanuel College, and CHSS.",
    metric: "22+ Campuses",
    metricLabel: "Institutions Reached",
    photo: {
      src: "https://ik.imagekit.io/oytjocebw/seminars/neissr/neissr-seminar-1.jpeg",
      caption: "NEISSR BSW & MSW seminar in Chümoukedima",
    },
  },
];

export default function HistoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Scrubbing Spine Animation
      gsap.fromTo(
        ".gsap-spine-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );

      // 2. Individual Milestone Reveal Sequences
      const items = gsap.utils.toArray<HTMLElement>(".gsap-timeline-item");
      items.forEach((item) => {
        const node = item.querySelector(".gsap-timeline-node");
        const card = item.querySelector(".gsap-timeline-card");
        const img = item.querySelector(".gsap-timeline-img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (node) {
          tl.fromTo(
            node,
            { scale: 0.6, opacity: 0.3, borderColor: "#e5e5e5" },
            {
              scale: 1,
              opacity: 1,
              borderColor: "#6B21A8",
              duration: 0.45,
              ease: "back.out(2)",
            }
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 0.9,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-white border-t border-neutral-100 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brandpurple mb-3">
            Our Journey &bull; 2022 &rarr; 2026
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            The History of <span className="text-brandpurple">instudia</span>
          </h2>
          <p className="mt-3.5 text-base text-neutral-500 font-normal leading-relaxed">
            Five years of building careers, community partnerships, and technical education in Nagaland.
          </p>
        </div>

        {/* ── GSAP ANIMATED TIMELINE SPINE ── */}
        <div ref={containerRef} className="relative">
          {/* Background Neutral Spine Track */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-px -translate-x-1/2 bg-neutral-200" />

          {/* GSAP Scrubbed Solid Brand Purple Progress Line */}
          <div className="gsap-spine-fill absolute left-6 md:left-1/2 top-4 bottom-8 w-0.5 -translate-x-1/2 bg-brandpurple z-10 origin-top" />

          <div className="space-y-16 sm:space-y-24">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="gsap-timeline-item relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central GSAP Animated Year Node Badge */}
                  <div className="gsap-timeline-node absolute left-6 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-neutral-300 shadow-xs flex items-center justify-center font-bold text-xs text-[#1B1C1E] z-20">
                    {item.year}
                  </div>

                  {/* GSAP Animated Minimalist Card */}
                  <div
                    className={`pl-14 md:pl-0 w-full md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                    }`}
                  >
                    <div className="gsap-timeline-card bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-neutral-300 hover:shadow-md transition-all duration-300">
                      {/* Top Tag & Location */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-brandpurple uppercase tracking-wider bg-brandpurple/5 px-2.5 py-1 rounded-md">
                          {item.tag}
                        </span>
                        <span className="text-xs text-neutral-400 font-medium">
                          {item.location}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1B1C1E] tracking-tight leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-5">
                        {item.summary}
                      </p>

                      {/* Photo Frame with GSAP Smooth Parallax Image */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/70 mb-5">
                        <Image
                          src={item.photo.src}
                          alt={item.photo.caption}
                          fill
                          className="gsap-timeline-img object-cover will-change-transform"
                          sizes="(max-width: 768px) 100vw, 420px"
                          priority={index === 0}
                        />
                      </div>

                      {/* Metric Block */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                        <span className="text-xs text-neutral-500 font-medium">
                          {item.metricLabel}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#1B1C1E] bg-neutral-100 px-3 py-1 rounded-md">
                          {item.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
