import { Metadata } from "next";
import StudyPlannerClient from "../../components/organisms/StudyPlannerClient";

export const metadata: Metadata = {
  title: "Interactive Study Planner | Instudia",
  description: "Generate a personalised, print-ready study planner with time-blocked schedules, Pomodoro sessions, and spaced repetition trackers.",
  alternates: { canonical: "https://www.instudianagaland.com/study-planner" },
};

export default function StudyPlannerPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#1B1C1E] border-b border-neutral-800">
        <div className="absolute inset-0 blur-3xl opacity-40"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center text-white">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#58FF1B] mb-6 px-3 py-1 rounded-full bg-[#58FF1B]/10 border border-[#58FF1B]/20">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58FF1B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58FF1B]"></span>
            </span>
            Study Planner
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Focus on how fast <span className="text-brandpurple">you can master a syllabus</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Add your subjects, set your confidence levels, and instantly generate a comprehensive, print-ready study schedule with Pomodoro blocks and spaced repetition tracking.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-20">
        <StudyPlannerClient />
      </section>
    </main>
  );
}
