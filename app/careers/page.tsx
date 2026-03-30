import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers & Join Our Team in Dimapur",
  description:
    "Join our mission-driven team at instudia. Explore career opportunities for educators, technologists, and creatives in Nagaland.",
  alternates: { canonical: "https://www.instudianagaland.com/careers" },
};

const perks = [
  {
    icon: "🧠",
    title: "Learning-First Culture",
    desc: "Work alongside educators and technologists who believe in continuous growth. Your career development is a priority, not an afterthought.",
  },
  {
    icon: "🌏",
    title: "Real Community Impact",
    desc: "Every course you teach, every system you build directly shapes the career trajectories of hundreds of students across Nagaland.",
  },
  {
    icon: "⚡",
    title: "Modern Work Environment",
    desc: "We use the latest tools — AI-assisted workflows, cloud infrastructure, and modern design systems to keep everything fast and lean.",
  },
  {
    icon: "🤝",
    title: "Collaborative Team",
    desc: "Small, tight-knit team where your ideas actually ship. No bureaucracy — just talented people solving real problems together.",
  },
  {
    icon: "📈",
    title: "Fast Growth",
    desc: "We're expanding rapidly. As we grow, your role grows with us. Early team members shape the culture and direction of the institute.",
  },
  {
    icon: "📍",
    title: "Based in Dimapur",
    desc: "Rooted in the heart of Nagaland. We believe in building something meaningful for our home state before scaling further.",
  },
];

type JobOpening = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  tag: string;
  tagColor: string;
  description: string;
  requirements: string[];
};

const openings: JobOpening[] = [];

const sampleOpenings = [
  {
    id: "it-instructor",
    title: "IT Instructor",
    department: "Academics",
    type: "Full-time",
    location: "Dimapur, Nagaland",
    tag: "Teaching",
    tagColor: "bg-brandpurple/10 text-brandpurple",
    description:
      "Deliver hands-on instruction in programming, web development, and software tools to student cohorts. You'll own curriculum for 1–2 courses and collaborate on learning outcomes.",
    requirements: [
      "2+ years professional experience in software development or IT",
      "Ability to explain technical concepts to beginners clearly",
      "Passion for teaching and mentoring young professionals",
      "Familiarity with tools like VS Code, Git, and modern web stacks",
    ],
  },
  {
    id: "graphic-design-instructor",
    title: "Graphic Design Instructor",
    department: "Academics",
    type: "Full-time",
    location: "Dimapur, Nagaland",
    tag: "Teaching",
    tagColor: "bg-brandpurple/10 text-brandpurple",
    description:
      "Teach Adobe Creative Suite, Canva, and UI/UX design principles to aspiring designers. You'll shape the design curriculum and help students build strong portfolios.",
    requirements: [
      "Proficiency in Illustrator, Photoshop, and Figma or equivalent tools",
      "Portfolio demonstrating professional design work",
      "Experience teaching or training others is a plus",
      "Strong eye for typography, layout, and visual communication",
    ],
  },
  {
    id: "marketing-growth",
    title: "Marketing & Growth Executive",
    department: "Marketing",
    type: "Full-time",
    location: "Dimapur, Nagaland",
    tag: "Marketing",
    tagColor: "bg-flourescent/20 text-green-800",
    description:
      "Own instudia's organic + paid growth strategy across Instagram, WhatsApp, and Google. You'll run campaigns, manage content calendars, and track enrollment metrics.",
    requirements: [
      "Experience managing social media accounts for a brand or business",
      "Basic understanding of Meta Ads, Google Ads, or WhatsApp campaigns",
      "Strong writing and visual communication skills",
      "Data-driven mindset — comfortable reading analytics dashboards",
    ],
  },
  {
    id: "operations-admin",
    title: "Operations & Admin Executive",
    department: "Operations",
    type: "Full-time",
    location: "Dimapur, Nagaland",
    tag: "Operations",
    tagColor: "bg-brightyellow/20 text-yellow-800",
    description:
      "Ensure smooth day-to-day operations of the institute — from student onboarding and batch scheduling to fee management and vendor coordination.",
    requirements: [
      "Organised, detail-oriented, and proactive",
      "Experience using spreadsheets, Google Workspace, or similar tools",
      "Prior experience in admin, front-office, or operations roles preferred",
      "Excellent interpersonal skills — you'll be the first point of contact for students",
    ],
  },
  {
    id: "content-creator",
    title: "Content Creator & Social Media Manager",
    department: "Marketing",
    type: "Part-time / Freelance",
    location: "Remote / Dimapur",
    tag: "Creative",
    tagColor: "bg-redhue/10 text-red-700",
    description:
      "Create compelling reels, carousels, and written content that tells instudia's story on Instagram and LinkedIn. You'll help us grow our organic community.",
    requirements: [
      "Strong visual storytelling skills — experience with CapCut, Premiere, or similar",
      "Understanding of short-form video trends and Instagram algorithm",
      "Can write concise, engaging captions and CTAs",
      "Bonus: experience with educational or EdTech content",
    ],
  },
];

const values = [
  { label: "Mission-Driven", desc: "We exist to close the skills gap in Nagaland. Every hire must believe in this." },
  { label: "Ownership mindset", desc: "We trust our team. If it's your responsibility, you own it fully." },
  { label: "Feedback loops", desc: "Radical transparency. We give and receive honest feedback to grow faster." },
  { label: "Student-first", desc: "Every decision is filtered through one question: is this good for students?" },
];

export default function CareersPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-100 pt-24 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brandpurple/10 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brandpurple animate-pulse" />
            <span className="text-xs font-extrabold tracking-[0.15em] text-brandpurple uppercase">
              We&apos;re Hiring
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Build careers.{" "}
            <span className="text-brandpurple">Shape futures.</span>
            <br />
            Work at instudia.
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a small, mission-driven team on a big mission — empowering Nagaland&apos;s youth with the skills they need to build real careers. Come help us do that.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
            >
              See Open Positions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick stat bar ─────────────────────────────────── */}
      <section className="border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-wrap justify-center gap-10 sm:gap-20">
          {[
            { v: `${openings.length || "No"}`, l: "Open Positions" },
            { v: "1", l: "Campus in Dimapur" },
            { v: "500+", l: "Students Impacted" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-4xl font-black text-[#1B1C1E]">{s.v}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Culture / Values ───────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-3">
            Who We Are
          </p>
          <h2 className="text-4xl font-black text-[#1B1C1E]">
            Our culture, in plain language
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div
              key={v.label}
              className="flex gap-4 rounded-2xl border border-neutral-100 bg-gray-50 p-5"
            >
              <span className="flex-shrink-0 w-2 rounded-full bg-brandpurple self-stretch" />
              <div>
                <p className="font-black text-[#1B1C1E] text-base">{v.label}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Perks ──────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-3">
              Why instudia
            </p>
            <h2 className="text-4xl font-black text-[#1B1C1E]">
              Why people love working here
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-3xl p-6 border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-2xl">{p.icon}</span>
                <h3 className="font-black text-[#1B1C1E] text-base mt-3 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────────── */}
      <section id="openings" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
        <div className="mb-12">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-3">
            Open Roles
          </p>
          <h2 className="text-4xl font-black text-[#1B1C1E]">
            Current openings
          </h2>
          <p className="mt-3 text-gray-500">
            Don&apos;t see a perfect fit? Drop us your CV at{" "}
            <a
              href="mailto:instudia.nagaland@gmail.com"
              className="text-brandpurple font-semibold hover:underline"
            >
              instudia.nagaland@gmail.com
            </a>{" "}
            — we always want to hear from talented people.
          </p>
        </div>

        <div className="space-y-5">
          {openings.length === 0 ? (
            <p className="text-center text-gray-500">No open positions at the moment. Check back soon!</p>
          ) : (
            openings?.map((job) => (
              <details
                key={job.id}
                className="group rounded-3xl border border-neutral-100 bg-white overflow-hidden hover:border-brandpurple/20 transition-colors"
              >
                <summary className="flex items-center justify-between px-7 py-6 cursor-pointer list-none">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${job.tagColor}`}
                        >
                          {job.tag}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-[#1B1C1E]">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 font-medium">{job.department}</span>
                        <span className="text-gray-200">•</span>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Chevron */}
                  <svg
                    className="w-5 h-5 text-gray-300 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                {/* Expanded body */}
                <div className="px-7 pb-8 border-t border-neutral-100 mt-0 pt-6">
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">{job.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-3">
                      What we&apos;re looking for
                    </p>
                    <ul className="space-y-2">
                      {job.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brandpurple mt-1.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`mailto:instudia.nagaland@gmail.com?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-md shadow-brandpurple/20"
                  >
                    Apply for this role
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </details>
            )))}
        </div>
      </section>

      {/* ── General application CTA ────────────────────────── */}
      <section className="mx-6 mb-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-flourescent via-redhue via-brandpurple to-brightyellow p-[3px] shadow-lg">
          <div className="rounded-[calc(2.5rem-3px)] bg-white px-8 py-14 text-center lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Open Application
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E]">
                Don&apos;t see your role listed?
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                We&apos;re always looking for exceptional people. Send your CV, a short note about yourself, and what you&apos;d like to build with us.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:instudia.nagaland@gmail.com?subject=Open Application — instudia"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
                >
                  Send Open Application
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
