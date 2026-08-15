"use client";

import { FadeIn, FadeInStagger } from "../components/atom/FadeIn";

export interface EngagementModel {
  num: string;
  title: string;
  subtitle: string;
  duration: string;
  formatValue: string;
  description: string;
  features: string[];
  bestFor: string;
  highlight: boolean;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    num: "01",
    title: "Half-Day Interactive Session",
    subtitle: "Engaging Campus Orientation",
    duration: "2 - 3 Hours",
    formatValue: "Half-Day Interactive Session (2-3 Hours)",
    description:
      "A lively, interactive assembly talk designed to spark curiosity, demystify technology, and show students how to use modern digital tools responsibly.",
    features: [
      "Engaging auditorium presentation tailored to students",
      "Live demonstrations with relatable, everyday examples",
      "Open Q&A where students can ask any question freely",
      "Free take-home digital summary notes for all attendees",
    ],
    bestFor: "School assemblies, college symposiums, and fresher orientation days.",
    highlight: false,
  },
  {
    num: "02",
    title: "Full-Day Practical Workshop",
    subtitle: "Hands-on Learning & Practice",
    duration: "5 - 6 Hours",
    formatValue: "Full-Day Practical Workshop (5-6 Hours)",
    description:
      "An interactive day where students roll up their sleeves, practice with real examples, ask questions, and build their own study systems or projects step-by-step.",
    features: [
      "Includes everything in the Interactive Session",
      "Guided classroom exercises and interactive challenges",
      "Step-by-step templates for studying and note-taking",
      "Personalized feedback from our resource persons",
    ],
    bestFor: "Departmental workshops, student clubs, and computer batches.",
    highlight: true,
  },
  {
    num: "03",
    title: "Multi-Day Intensive Workshop",
    subtitle: "Deep Learning & Project Building",
    duration: "2 - 5 Days",
    formatValue: "Multi-Day Intensive Workshop (2-5 Days)",
    description:
      "A complete skill-building experience where students build tangible mini-projects, collaborate in teams, and receive verified certificates.",
    features: [
      "Structured day-by-day learning curriculum",
      "Guided project work with mentorship support",
      "Co-branded Certificate of Completion for participants",
      "Dedicated sessions for teacher enablement and lesson prep",
    ],
    bestFor: "Faculty Development Programs, vacation camps, and technical clubs.",
    highlight: false,
  },
  {
    num: "04",
    title: "Year-Round Campus Partnership",
    subtitle: "Continuous Student & Teacher Mentorship",
    duration: "Semester / Annual",
    formatValue: "Year-Round Campus Partnership",
    description:
      "An ongoing collaboration where instudia acts as your institution's trusted technology and career mentor throughout the academic year.",
    features: [
      "Regular interactive seminars and guest masterclasses",
      "Career guidance, interview prep, and internship pathways",
      "Practical advice on integrating digital skills into classrooms",
      "Priority invitations to student events and hackathons",
    ],
    bestFor: "Colleges and schools seeking continuous, year-round student growth.",
    highlight: false,
  },
];

export default function SeminarFormatsSection() {
  const handleSelectFormat = (formatValue: string) => {
    // Dispatch custom event for HostSeminarForm
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("instudia-select-format", {
          detail: { format: formatValue },
        })
      );
      // Smoothly scroll to the form
      const el = document.getElementById("booking-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="bg-white py-24 px-6 border-t border-neutral-200/80">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Ways to Collaborate
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.1]">
              Flexible Workshop &amp; <br />
              <span className="text-brandpurple">Seminar Formats</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            Tailored to fit naturally into your school assembly, college symposium, orientation week, or teacher training schedule.
          </p>
        </FadeIn>

        {/* Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ENGAGEMENT_MODELS.map((model) => (
            <FadeIn
              key={model.title}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 border ${
                model.highlight
                  ? "bg-[#1B1C1E] text-white border-[#1B1C1E] shadow-2xl"
                  : "bg-[#FAFAFA] text-[#1B1C1E] border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      model.highlight
                        ? "bg-[#FFE01B] text-black border border-black font-black"
                        : "bg-white text-neutral-700 border border-neutral-200"
                    }`}
                  >
                    {model.duration}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      model.highlight ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    {model.num}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                  {model.title}
                </h3>
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                    model.highlight ? "text-brandpurple" : "text-brandpurple"
                  }`}
                >
                  {model.subtitle}
                </p>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    model.highlight ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {model.description}
                </p>

                {/* Feature Checklist */}
                <div
                  className={`space-y-2.5 pt-4 border-t ${
                    model.highlight ? "border-neutral-800" : "border-neutral-200"
                  }`}
                >
                  <p
                    className={`text-[10px] font-black uppercase tracking-wider ${
                      model.highlight ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    What's Included:
                  </p>
                  <ul className="space-y-2 text-xs">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className={
                            model.highlight
                              ? "text-[#FFE01B] font-bold"
                              : "text-emerald-500 font-bold"
                          }
                        >
                          ✓
                        </span>
                        <span
                          className={
                            model.highlight
                              ? "text-neutral-200"
                              : "text-neutral-700"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  model.highlight ? "border-neutral-800" : "border-neutral-200"
                }`}
              >
                <p
                  className={`text-[11px] italic ${
                    model.highlight ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  <strong
                    className={
                      model.highlight ? "text-white" : "text-neutral-900"
                    }
                  >
                    Best for:
                  </strong>{" "}
                  {model.bestFor}
                </p>

                <button
                  type="button"
                  onClick={() => handleSelectFormat(model.formatValue)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    model.highlight
                      ? "bg-white text-black hover:bg-neutral-200 active:scale-95"
                      : "bg-[#1B1C1E] text-white hover:bg-brandpurple active:scale-95"
                  }`}
                >
                  <span>Select Format</span>
                  <span>→</span>
                </button>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
