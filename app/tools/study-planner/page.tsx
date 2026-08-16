import { Metadata } from "next";
import { SITE_URL, canonicalFor } from "@/lib/site";
import StudyPlannerWrapper from "./StudyPlannerWrapper";

export const metadata: Metadata = {
  title: "Interactive Study Planner & Timetable",
  description: "Generate a customized, print-ready weekly study timetable with time-blocked schedules, Pomodoro learning sessions, and exam goal tracking.",
  alternates: { canonical: canonicalFor("/tools/study-planner") },
  metadataBase: new URL(SITE_URL),
};

export default function StudyPlannerPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white border-b border-neutral-200/80">
        {/* Soft Ambient Background Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/50 via-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brandpurple/10 to-purple-300/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-6 px-4 py-1.5 rounded-full bg-brandpurple/10 border border-brandpurple/20 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandpurple"></span>
            </span>
            Study Planner
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#1B1C1E] max-w-4xl mx-auto leading-[1.15]">
            Focus on how fast{" "}
            <span className="bg-gradient-to-r from-[#C21BFF] via-brandpurple to-purple-800 bg-clip-text text-transparent">
              you can master a syllabus
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Add your subjects, set your confidence levels, and instantly generate a comprehensive, print-ready study schedule with Pomodoro blocks and spaced repetition tracking.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-20">
        <StudyPlannerWrapper />
      </section>
    </main>
  );
}
