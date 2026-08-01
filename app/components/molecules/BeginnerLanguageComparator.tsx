"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconStar, IconFlame, IconCurrencyDollar, IconCode, IconAdjustments, IconTrophy } from "@tabler/icons-react";

type CareerGoal = "web" | "data_ai" | "enterprise" | "gamedev";
type Priority = "easiest" | "demand" | "salary";

interface LanguageData {
  id: string;
  name: string;
  badgeColor: string;
  accentBorder: string;
  description: string;
  scores: {
    web: number;
    data_ai: number;
    enterprise: number;
    gamedev: number;
    easiest: number;
    demand: number;
    salary: number;
  };
  highlights: string[];
  bestUse: string;
}

const LANGUAGES: LanguageData[] = [
  {
    id: "python",
    name: "Python",
    badgeColor: "bg-[#FFE01B] text-black",
    accentBorder: "border-[#FFE01B]",
    description: "Designed for clean readability. The global standard for AI, Data Science, and beginner programming.",
    scores: {
      web: 80,
      data_ai: 98,
      enterprise: 82,
      gamedev: 45,
      easiest: 98,
      demand: 95,
      salary: 90,
    },
    highlights: ["Clean syntax (reads like English)", "Dominates Data Science & AI", "Huge global community & ecosystem"],
    bestUse: "Data/AI, Automation, Backend Prototyping",
  },
  {
    id: "javascript",
    name: "JavaScript",
    badgeColor: "bg-[#FFE01B] text-black border border-black",
    accentBorder: "border-[#FFE01B]",
    description: "The native language of web browsers. Essential for building interactive websites and full-stack web applications.",
    scores: {
      web: 99,
      data_ai: 60,
      enterprise: 88,
      gamedev: 65,
      easiest: 85,
      demand: 98,
      salary: 92,
    },
    highlights: ["Runs natively in web browsers", "Full-stack capable with Node.js & React", "Instant visual feedback"],
    bestUse: "Frontend & Full-Stack Web Apps",
  },
  {
    id: "java",
    name: "Java",
    badgeColor: "bg-[#FF1B58] text-white",
    accentBorder: "border-[#FF1B58]",
    description: "Robust, object-oriented language engineered for large enterprise systems and Android development.",
    scores: {
      web: 70,
      data_ai: 72,
      enterprise: 96,
      gamedev: 75,
      easiest: 60,
      demand: 88,
      salary: 85,
    },
    highlights: ["Strict type system prevents bugs", "Battle-tested by Fortune 500 companies", "Powers Android ecosystem"],
    bestUse: "Enterprise Backend & Android Systems",
  },
  {
    id: "cpp",
    name: "C++",
    badgeColor: "bg-[#C21BFF] text-white",
    accentBorder: "border-[#C21BFF]",
    description: "High-performance language providing direct memory control. Powers game engines, operating systems, and AAA games.",
    scores: {
      web: 35,
      data_ai: 80,
      enterprise: 85,
      gamedev: 98,
      easiest: 35,
      demand: 80,
      salary: 96,
    },
    highlights: ["Unrivaled performance & control", "Industry standard for game engines (Unreal)", "High-paying specialized engineering roles"],
    bestUse: "AAA Game Engines & System Performance",
  },
];

const EXPLANATIONS: Record<CareerGoal, Record<Priority, string>> = {
  web: {
    easiest: "For Web Development, JavaScript is essential because browsers only run JS natively, while Python offers the simplest server-side scripting curve.",
    demand: "JavaScript leads in overall job demand across frontend and full-stack web development teams worldwide.",
    salary: "Full-stack JavaScript developers and Python cloud backend engineers command competitive compensation at fast-growing tech firms.",
  },
  data_ai: {
    easiest: "Python is by far the easiest and most intuitive gateway into AI and Data Science thanks to simple English-like syntax and vast libraries.",
    demand: "Python dominates AI, Machine Learning, and Data Engineering recruitment across tech companies.",
    salary: "AI and Machine Learning Engineers proficient in Python rank among the highest-paid technical roles globally.",
  },
  enterprise: {
    easiest: "Python provides a gentle start for backend automation, whereas Java enforces disciplined object-oriented architecture used by large teams.",
    demand: "Java and JavaScript (Node.js) power the core infrastructure of global enterprise corporations.",
    salary: "Enterprise systems architects and backend specialists in Java and C++ command premium executive developer salaries.",
  },
  gamedev: {
    easiest: "JavaScript (web games) and Python (Pygame) offer quick visual feedback for learning game logic before stepping into 3D engines.",
    demand: "C++ is in massive demand across professional game studios for Unreal Engine development.",
    salary: "C++ Graphics Engineers and Game Engine Developers enjoy high salary ceilings due to specialized low-level optimization skills.",
  },
};

export default function BeginnerLanguageComparator() {
  const [careerGoal, setCareerGoal] = useState<CareerGoal>("web");
  const [priority, setPriority] = useState<Priority>("easiest");

  // Calculate composite fit score for sorting
  const scoredLanguages = LANGUAGES.map((lang) => {
    const goalScore = lang.scores[careerGoal];
    const priorityScore = lang.scores[priority];
    // Weighted combination: 60% goal fit, 40% priority preference
    const compositeScore = Math.round(goalScore * 0.6 + priorityScore * 0.4);
    return { ...lang, compositeScore, goalScore, priorityScore };
  }).sort((a, b) => b.compositeScore - a.compositeScore);

  const topChoice = scoredLanguages[0];

  return (
    <div className="my-16 border-2 border-black bg-white shadow-[10px_10px_0px_#000] p-6 sm:p-10 font-sans">
      {/* Widget Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest mb-2">
            <IconAdjustments className="w-3.5 h-3.5 text-[#FFE01B]" />
            INTERACTIVE COMPARATOR WIDGET
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-black tracking-tight leading-none">
            Beginner Language Match Matrix
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-black opacity-70 max-w-md">
          Adjust your target career goal and learning priority to find the best language starting line.
        </p>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 bg-[#FAFAFA] p-6 border-2 border-black shadow-[4px_4px_0px_#000]">
        {/* Career Goal Select */}
        <div>
          <label className="block text-xs font-black uppercase text-black tracking-wider mb-3 flex items-center gap-2">
            <IconCode className="w-4 h-4 text-black" />
            1. Select Career Goal:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "web", label: "Web Development" },
              { id: "data_ai", label: "Data & AI" },
              { id: "enterprise", label: "Enterprise / Backend" },
              { id: "gamedev", label: "Game Development" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCareerGoal(item.id as CareerGoal)}
                className={`px-3 py-2.5 text-xs font-black uppercase text-left border-2 border-black transition-all ${
                  careerGoal === item.id
                    ? "bg-black text-white shadow-[3px_3px_0px_#C21BFF]"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Select */}
        <div>
          <label className="block text-xs font-black uppercase text-black tracking-wider mb-3 flex items-center gap-2">
            <IconStar className="w-4 h-4 text-black" />
            2. Select Key Priority:
          </label>
          <div className="flex flex-col gap-2">
            {[
              { id: "easiest", label: "Easiest to Learn", desc: "Minimal syntax complexity & gentle learning curve" },
              { id: "demand", label: "Highest Job Demand", desc: "Maximum available job openings globally" },
              { id: "salary", label: "Highest Salary Potential", desc: "Top compensation for experienced developers" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPriority(item.id as Priority)}
                className={`p-2.5 text-left border-2 border-black transition-all flex items-center justify-between ${
                  priority === item.id
                    ? "bg-[#FFE01B] text-black font-black shadow-[3px_3px_0px_#000]"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                <div>
                  <div className="text-xs font-black uppercase">{item.label}</div>
                  <div className="text-[10px] font-medium opacity-80">{item.desc}</div>
                </div>
                {priority === item.id && <IconCheck className="w-4 h-4 text-black flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Insight Box */}
      <div className="mb-10 p-6 bg-black text-white border-2 border-black shadow-[6px_6px_0px_#C21BFF] relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 border-2 border-white bg-[#C21BFF] text-white font-black flex items-center justify-center text-lg flex-shrink-0 shadow-[2px_2px_0px_#FFF]">
            <IconTrophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#FFE01B] mb-1">
              Top Ranked Match for Selected Criteria
            </div>
            <h4 className="text-xl sm:text-2xl font-black uppercase mb-2">
              #{1} Recommendation: {topChoice.name} ({topChoice.compositeScore}% Match)
            </h4>
            <p className="text-xs sm:text-sm font-medium text-neutral-200 leading-relaxed">
              {EXPLANATIONS[careerGoal][priority]}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison List */}
      <div className="space-y-4">
        <div className="text-xs font-black uppercase tracking-wider text-black opacity-60 mb-2">
          Tiered Rankings for Selected Configuration:
        </div>

        <AnimatePresence mode="popLayout">
          {scoredLanguages.map((lang, index) => {
            const isWinner = index === 0;
            return (
              <motion.div
                key={lang.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`border-2 border-black p-5 sm:p-6 transition-all ${
                  isWinner
                    ? "bg-white shadow-[8px_8px_0px_#FFE01B] ring-2 ring-black"
                    : "bg-neutral-50 shadow-[4px_4px_0px_#000] opacity-90"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 border-2 border-black flex items-center justify-center text-xs font-black ${
                        isWinner ? "bg-black text-white" : "bg-neutral-200 text-black"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-black uppercase text-black">{lang.name}</h4>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black ${lang.badgeColor}`}>
                          {lang.bestUse}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-black/70 mt-1">{lang.description}</p>
                    </div>
                  </div>

                  {/* Score pill */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase text-black/50">Fit Score</div>
                      <div className="text-2xl font-black text-black leading-none">{lang.compositeScore}%</div>
                    </div>
                    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#000]">
                      {lang.compositeScore >= 90 ? "A+" : lang.compositeScore >= 80 ? "A" : lang.compositeScore >= 70 ? "B" : "C"}
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Bars & Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black uppercase text-black">
                      <span>Ease of Learning</span>
                      <span>{lang.scores.easiest}/100</span>
                    </div>
                    <div className="h-2.5 border border-black bg-neutral-200 overflow-hidden">
                      <div className="h-full bg-[#FFE01B]" style={{ width: `${lang.scores.easiest}%` }} />
                    </div>

                    <div className="flex justify-between text-[11px] font-black uppercase text-black pt-1">
                      <span>Job Demand</span>
                      <span>{lang.scores.demand}/100</span>
                    </div>
                    <div className="h-2.5 border border-black bg-neutral-200 overflow-hidden">
                      <div className="h-full bg-[#C21BFF]" style={{ width: `${lang.scores.demand}%` }} />
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-white p-3 border border-black/20 text-xs">
                    <div className="text-[10px] font-black uppercase text-black opacity-60 mb-1.5">Key Highlights:</div>
                    <ul className="space-y-1">
                      {lang.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5 font-medium text-black">
                          <IconCheck className="w-3.5 h-3.5 text-black flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
