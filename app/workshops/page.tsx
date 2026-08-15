import { Metadata } from "next";
import Script from "next/script";
import WorkshopPhotoGrid from "./WorkshopPhotoGrid";
import WorkshopNav from "./WorkshopNav";

export const metadata: Metadata = {
  title: "Workshops & Events | Skill Programs",
  description:
    "Explore skill development workshops, job fairs, AI seminars and community programs conducted by instudia in Dimapur and Nagaland.",
  alternates: { canonical: "/workshops" },
};

const tagColors: Record<string, string> = {
  Upcoming: "bg-[#FFE01B] text-black font-black border border-black",
  Workshop: "bg-brandpurple/10 text-brandpurple",
  AI: "bg-flourescent/15 text-[#1B1C1E]",
  "Agentic AI": "bg-brandpurple text-white font-bold",
  "Skill Program": "bg-brightyellow/20 text-[#1B1C1E]",
  DABA: "bg-brandpurple/10 text-brandpurple",
  MSME: "bg-redhue/10 text-redhue",
  "Job Fair": "bg-brightyellow/20 text-[#1B1C1E]",
  "Career Guidance": "bg-flourescent/15 text-[#1B1C1E]",
};

const workshops = [
  {
    title: "Agentic AI & Autonomous Systems Workshop",
    subtitle: "2-Day Live Masterclass in Multi-Agent Frameworks & Tool Calling",
    date: "August 28th – 29th, 2026",
    tags: ["Upcoming", "Workshop", "Agentic AI"],
    description:
      "An intensive 2-day hands-on masterclass on building production-ready autonomous AI agents, LLM tool-calling systems, Model Context Protocol (MCP) integrations, and multi-agent coordination pipelines. Participants build practical agentic systems that automate complex workflows end-to-end.",
    highlights:
      "Covers agent loop architectures, tool-calling and function APIs, memory patterns (short/long-term), multi-agent collaboration swarms, error-recovery mechanisms, and real-world deployment for local and global business automations in Nagaland.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face/website-workshop-instudia/ai-institute-workshop/ai-workshop-at-instudia.jpeg?updatedAt=1752486659667",
        caption: "Hands-on interaction building autonomous workflows and AI systems",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM%20(1).jpeg?updatedAt=1752486594279",
        caption: "Deep dive into prompting architectures and agent loops",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.03%20PM.jpeg?updatedAt=1752486594248",
        caption: "Live coding demonstrations with tool-calling frameworks",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM.jpeg?updatedAt=1752486594214",
        caption: "Resource person addressing students on Agentic AI career opportunities",
        wide: true,
      },
    ],
  },
  {
    title: "AI for Productive & Efficient Learning",
    date: "April 5th, 2025",
    tags: ["Workshop", "AI"],
    description:
      "The session focused on how Artificial Intelligence is no longer a distant concept, but a present-day tool reshaping education and professional development. Through real-world examples, interactive discussions, and hands-on demonstrations, participants gained a solid understanding of how AI can be used to personalize learning, automate routine tasks, and enhance productivity.",
    highlights:
      "AI-powered tools can offer personalized learning experiences tailored to individual pace and style, assist with research and project development through intelligent search and analysis, and provide real-time feedback and virtual mentorship, even outside the classroom.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face/website-workshop-instudia/ai-institute-workshop/ai-workshop-at-instudia.jpeg?updatedAt=1752486659667",
        caption: "Interaction with students exploring AI-driven use cases",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM%20(1).jpeg?updatedAt=1752486594279",
        caption: "Discussion on how to make prompting easier",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.03%20PM.jpeg?updatedAt=1752486594248",
        caption: "A snapshot of AI workshop being conducted",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM.jpeg?updatedAt=1752486594214",
        caption: "Resource person addressing students with Career insights",
        wide: true,
      },
    ],
  },
  {
    title: "Unlocking Potential with AI and Career Insights",
    subtitle: "at St. Edmund's Higher Secondary School",
    date: "September 7th, 2024",
    tags: ["Workshop", "AI"],
    description:
      "A workshop was conducted at St. Edmund's Higher Secondary School, Dimapur. The event featured engaging sessions led by experts from instudia, who highlighted the growing significance of AI in reshaping industries and the modern job market. Daniel Changkija, Director of instudia, explained the critical role of AI in modern education and its transformative potential.",
    highlights:
      "Aimed to provide students with insights into new and evolving career paths while highlighting how AI can be utilised to enhance their academic and professional growth.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2107-1_65553879.webp?updatedAt=1727345998353",
        caption: "A day of discovery and growth as students explore AI-driven career paths",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2105-1_65553879.webp?updatedAt=1727345998278",
        caption: "Discussion on how to make a career and develop one's skill",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2104-1_65553879.webp?updatedAt=1727345998170",
        caption: "A snapshot of curious students",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2100-1_65553879.webp?updatedAt=1727413236974",
        caption: "Daniel Changkija addressing students with Career insights",
        wide: true,
      },
    ],
  },
  {
    title: "Youth Upskilling Program",
    subtitle: "in association with Dimapur Ao Baptist Arogo",
    date: "March 1 – July 10, 2024",
    tags: ["Skill Program", "DABA"],
    description:
      "instudia, in collaboration with Dimapur Ao Baptist Arogo, organized a Youth Upskilling Program to equip young individuals with essential digital and professional skills for thriving in the job market. The program focused on enhancing participants' knowledge in IT, communication, and career development.",
    highlights:
      "Hands-on workshops helped participants gain relevant skills directly applicable to career goals through IT, communication tools, and career development strategy sessions.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-3.webp?updatedAt=1727556440957",
        caption: "Students concentrating on the work",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-4.webp?updatedAt=1727556661877",
        caption: "A student being handed their certificate",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-1.webp?updatedAt=1727556440968",
        caption: "Training in progress with instructor",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-group.webp?updatedAt=1728451444454",
        caption: "Group shot at the certificate distribution ceremony",
        wide: true,
      },
    ],
  },
  {
    title: "6 Weeks ESDP Training Program",
    subtitle: "in association with Government of India & Ministry of MSME — Niuland",
    date: "October 30 – December 8, 2023",
    tags: ["Skill Program", "MSME"],
    description:
      "instudia, in partnership with the Government of India and MSME, offered a 6-week Entrepreneurial Skill Development Program in Niuland, covering Computer Basics, Information Technology, and the MS Office Package to prepare participants for success in today's digital workplace.",
    highlights:
      "Targeted at aspiring entrepreneurs, students, and professionals seeking to strengthen their digital skills and improve readiness for a competitive work environment.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland1.webp?updatedAt=1727423463408",
        caption: "Director engaging with students in one of the sessions",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland3.webp?updatedAt=1727423640960",
        caption: "A quick shoot of students after a full day class",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland3_65552583.webp?updatedAt=1727345904268",
        caption: "Group project focusing on topics from the training",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland4.webp?updatedAt=1727423217087",
        caption: "Students after a session on career insights",
        wide: true,
      },
    ],
  },
  {
    title: "JobEx — instudia Job Fair",
    date: "March 11th, 2023",
    tags: ["Job Fair"],
    description:
      "JobEx, a premium job fair organized by instudia, connected over 70 job seekers with top companies from IT, finance, marketing, HR, and more. The event provided a valuable platform where job seekers showcased their skills, interacted with prospective employers, and explored exciting career opportunities — all under one roof.",
    highlights:
      "Over 70 job seekers and 10+ leading companies participated. One-on-one interviews and company briefings were held at instudia's premises in Dimapur.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_1.webp?updatedAt=1727456002083",
        caption: "Candidates awaiting their turns for a one-to-one",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-3.webp?updatedAt=1728451930044",
        caption: "Candidate being interviewed by one of the recruiters",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_2.webp?updatedAt=1727456028615",
        caption: "Another shot of candidates awaiting their turn",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-4.webp?updatedAt=1728451929991",
        caption: "Briefing about the recruiters participating",
        wide: true,
      },
    ],
  },
  {
    title: "Career Guidance at EduFest 2022",
    subtitle: "at Pilgrim Higher Secondary School",
    date: "September 17th, 2022",
    tags: ["Career Guidance"],
    description:
      "instudia participated in EduFest 2022 organized by Pilgrim Higher Secondary School, serving as a platform to enlighten students about the diverse skill sets they can develop through vocational training programs aligned with their personal interests and career goals.",
    highlights:
      "Students were encouraged to have one-on-one interactions with resource persons, gaining firsthand insights into the specific skills and knowledge required for success in IT, Engineering, and more.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim2.webp?updatedAt=1727545806021",
        caption: "Students being curious about the courses",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim1_3:4.webp?updatedAt=1727427228258",
        caption: "Participating schools with their teacher-in-charge",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim3.webp?updatedAt=1727545778807",
        caption: "Director Daniel Changkija interacting with students",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim_3:4.webp?updatedAt=1728450451052",
        caption: "Group of enthusiastic girl students — Girl Power",
        wide: true,
      },
    ],
  },
  {
    title: "Workshop on Photography & Python",
    date: "June 23–24, 2022",
    tags: ["Workshop"],
    description:
      "An engaging two-day workshop on Basic Photography skills and Python programming. Renowned photographer and StudioLagom proprietor Akumyanger L. Jamir led the photography session covering cameras, lenses, composition, and Naga photography culture. Sr. Software Developer Vishal Bardewa led the Python programming session on the second day.",
    highlights:
      "Participants were divided into groups for a timed outdoor shoot, introduced to various photography styles, and walked through Python fundamentals — one of the most versatile programming languages today.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-1.webp?updatedAt=1728451886303",
        caption: "Resource person sharing insights about gear in use",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-3.webp?updatedAt=1728452013442",
        caption: "The session commencing",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-2.webp?updatedAt=1728451956240",
        caption: "Participants taking the camera out for the day",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-4.webp?updatedAt=1728451855375",
        caption: "Presentation time!",
        wide: true,
      },
    ],
  },
];

// Stable slug for section ID anchors
const toId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function WorkshopsPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "instudia Workshops & Events",
    "itemListElement": workshops.map((w, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Event",
        "name": w.title,
        "description": w.description.slice(0, 200),
        "startDate": w.date,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "instudia, Dimapur",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dimapur",
            "addressRegion": "Nagaland",
            "addressCountry": "IN",
          },
        },
        "organizer": {
          "@type": "Organization",
          "name": "instudia",
          "url": "https://www.instudianagaland.com",
        },
      },
    })),
  };

  return (
    <main className="bg-white">
      <Script
        id="workshops-event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100 pt-24 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Events & Initiatives
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Skill Development{" "}
            <span className="text-brandpurple">Workshops</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Empowering Dimapur's student and professional communities through
            hands-on learning, AI seminars, job fairs, and community skill programs.
          </p>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "7+", label: "Events Conducted" },
              { value: "500+", label: "Participants" },
              { value: "10+", label: "Partner Organisations" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-[#1B1C1E]">{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop list + sticky nav */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex gap-10 items-start">

          {/* Sticky sidebar nav */}
          <div className="hidden xl:block sticky top-24 self-start">
            <WorkshopNav
              items={workshops.map((w) => ({
                id: toId(w.title),
                title: w.title,
                date: w.date,
              }))}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-24">
            {workshops.map((w, i) => (
              <article
                key={w.title}
                id={toId(w.title)}
                className="group relative scroll-mt-28"
              >
                {i < workshops.length - 1 && (
                  <div className="absolute left-0 top-full w-px h-24 bg-gradient-to-b from-neutral-200 to-transparent hidden lg:block" />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
                  {/* Left: Meta */}
                  <div className="lg:sticky lg:top-28">
                    {/* Index badge */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-8 rounded-full bg-brandpurple/10 flex items-center justify-center text-xs font-black text-brandpurple">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {w.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${tagColors[tag] ?? "bg-gray-100 text-gray-500"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] leading-tight">
                      {w.title}
                    </h2>
                    {w.subtitle && (
                      <p className="mt-1 text-sm text-brandpurple font-semibold italic">
                        {w.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{w.date}</span>
                    </div>

                    <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                      {w.description}
                    </p>

                    {/* Highlight callout */}
                    <div className="mt-5 border-l-2 border-brandpurple/30 pl-4">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-1">
                        Key Highlight
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed italic">
                        {w.highlights}
                      </p>
                    </div>
                  </div>

                  {/* Right: Photo grid with lightbox */}
                  <WorkshopPhotoGrid photos={w.photos} />
                </div>

                {/* Divider */}
                {i < workshops.length - 1 && (
                  <div className="mt-20 border-t border-neutral-100" />
                )}
              </article>
            ))}
          </div> {/* end content wrapper */}
        </div> {/* end flex container */}
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-20">
        {/* Gradient border wrapper */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-flourescent via-redhue via-brandpurple to-brightyellow p-[3px] shadow-lg">
          <div className="rounded-[calc(2.5rem-3px)] bg-white px-8 py-14 text-center lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Stay Connected
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E]">
                Want to attend our next event?
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Follow instudia on Instagram and Facebook to be the first to know
                about upcoming workshops, bootcamps, and career events.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/instudia_nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
                >
                  Follow on Instagram
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
