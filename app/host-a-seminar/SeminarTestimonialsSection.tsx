"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "../components/atom/FadeIn";

interface PressCase {
  id: string;
  source: string;
  tagline: string;
  headline: string;
  quote: string;
  institution: string;
  speaker: string;
  role: string;
  imageSrc: string;
  newsUrl: string;
}

const PRESS_CASES: PressCase[] = [
  {
    id: "eastern-mirror-mgm",
    source: "Eastern Mirror",
    tagline: "College Learning & Digital Habits",
    headline: "MGM College Dimapur Hosts Seminar on Modern Learning & Digital Tools",
    quote:
      "Instudia conducted practical sessions demonstrating how modern digital tools can assist students with revision notes, chapter summaries, and exam preparation while encouraging deep, independent thinking.",
    institution: "MGM College, Dimapur",
    speaker: "Daniel Changkija & Vishal Bardewa",
    role: "Resource Persons, instudia",
    imageSrc:
      "https://easternmirror-assets.s3.ap-south-1.amazonaws.com/images/2026/07/MGM%20College%20hosts%20seminar%20on%20AI%20in%20education%20sector%20copy-1783178428647.jpg",
    newsUrl:
      "https://www.easternmirrornagaland.com/mgm-college-dimapur-hosts-seminar-on-ai-in-education-sector",
  },
  {
    id: "morung-express-chss",
    source: "The Morung Express",
    tagline: "3-Day Practical School Workshop",
    headline: "CHSS Hosts 3-Day Workshop on Practical Technology for Students",
    quote:
      "The sessions focused on practical digital tools for everyday learning — showing Commerce students how to analyze data and trends, and Arts students how to conduct richer literature and historical research.",
    institution: "Christian Higher Secondary School, Dimapur",
    speaker: "Daniel Changkija & Vishal Bardewa",
    role: "Lead Mentors, instudia",
    imageSrc:
      "https://morungexpress.com/uploads/2026/06/74218719_1780413507_CHSS.jpg",
    newsUrl: "https://morungexpress.com/chss-hosts-seminar-on-ai-integration",
  },
  {
    id: "nagaland-tribune-immanuel",
    source: "Nagaland Tribune",
    tagline: "Student Productivity & Career Skills",
    headline: "Interactive Technology Seminar Held at Immanuel College",
    quote:
      "Director Daniel Changkija encouraged students to build genuine digital confidence right from Dimapur. Technical sessions showed how simple digital tools can eliminate tedious study chores and give students more time to learn deeply.",
    institution: "Immanuel College, Dimapur",
    speaker: "Vishal Bardewa",
    role: "Technical Advisor, instudia",
    imageSrc:
      "https://nagalandtribune.in/wp-content/uploads/2026/06/Seminar-on-Artificial-Intelligence-held-at-Immanuel-College.png",
    newsUrl:
      "https://nagalandtribune.in/seminar-on-artificial-intelligence-held-at-immanuel-college/",
  },
  {
    id: "nagaland-post-lewis",
    source: "Nagaland Post",
    tagline: "Future-Ready Skills for Youth",
    headline: "Seminar on Practical Digital Skills at Lewis Academy",
    quote:
      "Lewis Academy and instudia brought together students and teachers to explore practical digital tools that make learning more engaging and prepare youth for exciting modern career paths.",
    institution: "Lewis Academy, Dimapur",
    speaker: "Daniel Changkija",
    role: "Director, instudia",
    imageSrc:
      "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/lewis-academy-group-shot.jpeg",
    newsUrl: "https://nagalandpost.com/seminar-on-efficient-use-of-ai/",
  },
];

export default function SeminarTestimonialsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentCase = PRESS_CASES[activeTab];

  return (
    <section className="border-t border-neutral-200/80 bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Press Coverage &amp; Case Studies
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.1]">
              Results That Speak <br />
              <span className="text-brandpurple">For Themselves.</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            Every seminar conducted by instudia is documented across leading state newspapers and verified by our partner educational institutions.
          </p>
        </FadeIn>

        {/* Tab Selector Bar */}
        <FadeIn className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {PRESS_CASES.map((item, idx) => {
            const isSelected = idx === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#1B1C1E] text-white border-[#1B1C1E] shadow-lg shadow-black/10"
                    : "bg-[#FAFAFA] text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${
                      isSelected ? "text-brandpurple" : "text-neutral-500"
                    }`}
                  >
                    {item.source}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    0{idx + 1}
                  </span>
                </div>
                <p
                  className={`text-xs font-bold truncate ${
                    isSelected ? "text-white" : "text-neutral-800"
                  }`}
                >
                  {item.institution}
                </p>
              </button>
            );
          })}
        </FadeIn>

        {/* Active Tab Panel */}
        <FadeIn className="rounded-3xl border border-neutral-200 bg-[#FAFAFA] p-8 sm:p-12 shadow-xl shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Quote & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandpurple/10 text-brandpurple text-[11px] font-black uppercase tracking-wider">
                {currentCase.tagline}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] tracking-tight leading-snug">
                {currentCase.headline}
              </h3>

              <blockquote className="text-base sm:text-lg font-medium text-neutral-700 leading-relaxed italic border-l-2 border-brandpurple pl-4">
                "{currentCase.quote}"
              </blockquote>

              <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#1B1C1E]">
                    {currentCase.speaker}
                  </p>
                  <p className="text-xs font-semibold text-neutral-500">
                    {currentCase.role} — {currentCase.institution}
                  </p>
                </div>

                <a
                  href={currentCase.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-[#1B1C1E] border border-neutral-300 shadow-xs hover:bg-neutral-50 transition-colors"
                >
                  <span>Read on {currentCase.source}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right: Real Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-300 shadow-md">
                <Image
                  src={currentCase.imageSrc}
                  alt={currentCase.headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
