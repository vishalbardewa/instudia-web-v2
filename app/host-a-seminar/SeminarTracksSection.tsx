"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeIn } from "../components/atom/FadeIn";

interface Track {
  id: string;
  num: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  targetAudience: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  quote?: string;
}

const TRACKS: Track[] = [
  {
    id: "smart-study-tools",
    num: "01",
    title: "Smart Digital Tools & Smarter Study Habits",
    badge: "Most Popular",
    description:
      "Show students and teachers how everyday modern tools can help summarize textbook chapters, organize revision notes, create self-quizzes, and save hours of routine work — while sharpening their own independent thinking.",
    highlights: [
      "Using smart digital tools to summarize complex topics and create quick revision notes",
      "Using technology as a helpful study buddy without losing critical thinking or originality",
      "Essential digital safety: protecting privacy and fact-checking information",
      "Step-by-step practical examples that students can immediately try on their phone or laptop",
    ],
    targetAudience: "High Schools, Colleges, Universities & Teaching Faculty",
    tags: ["Study Smarter", "Digital Notes", "Time Management", "Safe Tech"],
    imageSrc:
      "https://ik.imagekit.io/oytjocebw/seminars/mgm/director-at-mgm-college.jpeg",
    imageAlt: "Digital Study Tools Seminar at MGM College Dimapur",
    quote: "Technology should make studying simpler and learning more exciting, not confusing.",
  },
  {
    id: "software-engineering",
    num: "02",
    title: "Software Development & Practical Coding",
    badge: "Hands-on Coding",
    description:
      "A friendly, beginner-welcoming introduction to building websites and software. Students learn the logic behind code, write their first programs, and discover what real tech careers look like.",
    highlights: [
      "Python programming made simple with clear, relatable everyday examples",
      "How modern websites work: building simple pages with HTML, CSS, and JavaScript",
      "How to save, organize, and share coding projects with Git and GitHub",
      "Honest, practical guidance on software careers and how to build a portfolio from scratch",
    ],
    targetAudience: "BCA, B.Tech, Computer Science, IT & Curious Beginners",
    tags: ["Python Basics", "Web Development", "Coding Logic", "Real Projects"],
    imageSrc: "/assets/images/programming.jpg",
    imageAlt: "Hands-on Software Development and Coding Workshop",
    quote: "Anyone can learn to code when you start by building things you care about.",
  },
  {
    id: "project-management",
    num: "03",
    title: "Teamwork, Event Planning & Leadership",
    badge: "Student Leadership",
    description:
      "Help student councils, club coordinators, and department teams plan campus events, organize group tasks, and manage projects smoothly without last-minute stress.",
    highlights: [
      "How to plan campus initiatives and break big tasks into manageable weekly steps",
      "Setting up clean, shared digital workspaces using Notion and visual task boards",
      "Healthy team communication, meeting habits, and keeping everyone accountable",
      "Turning creative ideas into organized, well-executed campus projects",
    ],
    targetAudience: "Student Councils, Club Leaders, Management Students & Staff",
    tags: ["Teamwork", "Event Planning", "Notion Boards", "Leadership"],
    imageSrc:
      "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-1.webp?updatedAt=1727556440968",
    imageAlt: "Teamwork and Project Organization Session",
    quote: "Great teams are built on clear communication and simple shared habits.",
  },
  {
    id: "nep-skill-development",
    num: "04",
    title: "Digital Tools & Lesson Planning for Teachers",
    badge: "Faculty Development",
    description:
      "Practical, respectful workshops designed specifically for teachers to create lesson plans, draft question papers, organize classroom materials, and save valuable preparation time.",
    highlights: [
      "Saving hours each week on lesson plans, worksheets, and classroom activities",
      "Creating engaging classroom presentations and revision summaries with ease",
      "Practical ways to introduce 21st-century digital literacy into everyday subjects",
      "Supporting students with varied learning speeds using modern educational resources",
    ],
    targetAudience: "School Principals, College Deans, Head of Departments & Faculty",
    tags: ["Teacher Tools", "Lesson Planning", "NEP 2020", "Classroom Prep"],
    imageSrc:
      "https://morungexpress.com/uploads/2026/06/74218719_1780413507_CHSS.jpg",
    imageAlt: "Teacher Enablement and Digital Literacy Seminar at CHSS",
    quote: "Giving educators back precious time so they can focus on what matters most: mentoring students.",
  },
  {
    id: "custom-bootcamps",
    num: "05",
    title: "Custom Workshops & Tailored Campus Programs",
    badge: "Custom Syllabus",
    description:
      "Tailored workshops designed around your school or college's exact requirements — whether for an annual tech week, a departmental seminar, or an intensive multi-day vacation camp.",
    highlights: [
      "Topics customized for your department (Commerce, Arts, Science, or School)",
      "Flexible duration from a 2-hour interactive talk to a 3-day hands-on camp",
      "Hands-on exercises with co-branded certificates of completion",
      "Dedicated take-home learning guides and student follow-up support",
    ],
    targetAudience: "Colleges, Schools, Youth Organizations & Community Groups",
    tags: ["Custom Topics", "Flexible Duration", "Co-Branded Certificates"],
    imageSrc:
      "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland1.webp?updatedAt=1727423463408",
    imageAlt: "Skill Training Program with Government of India MSME",
    quote: "Co-designed hand-in-hand with your teachers to match your students' exact needs.",
  },
];

export default function SeminarTracksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance tabs every 7 seconds if not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TRACKS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeTrack = TRACKS[activeIndex];

  return (
    <section id="capabilities" className="border-t border-neutral-200/80 bg-[#FAFAFA] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Workshop Topics &amp; Tracks
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.1]">
              Practical Skills &amp; Real Learning — <br />
              <span className="text-brandpurple">Built for Everyday Classrooms.</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            Choose from our most requested campus sessions or let us tailor a program around your students, teachers, and academic calendar.
          </p>
        </FadeIn>

        {/* Autoplay / Interactive Tabs Grid */}
        <FadeIn
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Numbered Interactive Tab List */}
          <div className="lg:col-span-5 space-y-3">
            {TRACKS.map((track, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                    isActive
                      ? "bg-white shadow-xl shadow-black/5 border border-neutral-200"
                      : "bg-transparent hover:bg-white/60 border border-transparent"
                  }`}
                >
                  {/* Active Progress Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-brandpurple animate-pulse" />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <span
                      className={`text-sm font-black transition-colors ${
                        isActive ? "text-brandpurple" : "text-neutral-400 group-hover:text-neutral-700"
                      }`}
                    >
                      {track.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className={`text-base font-black tracking-tight transition-colors ${
                            isActive ? "text-[#1B1C1E]" : "text-neutral-700 group-hover:text-neutral-900"
                          }`}
                        >
                          {track.title}
                        </h3>
                      </div>

                      {isActive && (
                        <div className="mt-3 space-y-3 animate-fade-in">
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            {track.description}
                          </p>

                          <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-brandpurple block mb-1.5">
                              What Students &amp; Teachers Learn:
                            </span>
                            <ul className="space-y-1 text-xs text-neutral-700">
                              {track.highlights.slice(0, 3).map((h) => (
                                <li key={h} className="flex items-start gap-1.5">
                                  <span className="text-brandpurple font-bold mt-0.5">•</span>
                                  <span className="leading-snug">{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl shadow-black/5 overflow-hidden">
              {/* Category chip + index header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brandpurple animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#1B1C1E]">
                    {activeTrack.badge}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400">
                  Topic {activeTrack.num} of 05
                </span>
              </div>

              {/* Title & Quote */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] tracking-tight leading-snug mb-3">
                {activeTrack.title}
              </h3>

              {activeTrack.quote && (
                <p className="text-sm font-semibold italic text-brandpurple mb-6">
                  "{activeTrack.quote}"
                </p>
              )}

              {/* Visual Container */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-6 group">
                <Image
                  src={activeTrack.imageSrc}
                  alt={activeTrack.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-bold text-white/90">
                    Live Campus Session — {activeTrack.imageAlt}
                  </p>
                </div>
              </div>

              {/* Audience & Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                <div>
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Recommended For
                  </p>
                  <p className="text-xs font-bold text-neutral-800">
                    {activeTrack.targetAudience}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeTrack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("instudia-select-track", {
                          detail: { track: activeTrack.title },
                        })
                      );
                      const el = document.getElementById("booking-form");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-brandpurple px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-brandpurple/20 hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                >
                  <span>Book This Session</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
