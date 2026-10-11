import Link from "next/link";
import WorkshopPhotoGrid from "./WorkshopPhotoGrid";
import WorkshopNav, { YearGroup } from "./WorkshopNav";
import { buildMetadata } from "@/lib/metadata";

import { workshops, type WorkshopItem } from "@/app/data/workshops";
export { workshops };
export type { WorkshopItem };

export const metadata = buildMetadata({
  title: "Workshops & Events | Skill Programs in Dimapur, Nagaland",
  description:
    "Explore skill development workshops, job fairs, AI seminars and community programs conducted by instudia in Dimapur and Nagaland.",
  path: "/workshops",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Skill Development Workshops & AI Seminars at instudia Nagaland",
  keywords: [
    "workshops in Dimapur",
    "AI seminars Nagaland",
    "skill development Dimapur",
    "job fair Nagaland",
    "instudia workshops",
  ],
});

const tagColors: Record<string, string> = {
  Upcoming: "bg-[#FFE01B] text-black font-black border border-black",
  Workshop: "bg-brandpurple/10 text-brandpurple",
  Seminar: "bg-brandpurple text-white font-bold",
  AI: "bg-flourescent/15 text-[#1B1C1E]",
  "Agentic AI": "bg-brandpurple text-white font-bold",
  "Skill Program": "bg-brightyellow/20 text-[#1B1C1E]",
  "School Outreach": "bg-[#C5F442]/30 text-[#1E1B2E] font-semibold border border-black/10",
  "Higher Education": "bg-brandpurple/15 text-[#1E1B2E] font-semibold border border-brandpurple/20",
  "Commerce & Arts": "bg-[#FF7A59]/15 text-[#1E1B2E] font-semibold",
  Education: "bg-brandpurple/10 text-brandpurple",
  DABA: "bg-brandpurple/10 text-brandpurple",
  MSME: "bg-redhue/10 text-redhue",
  "Job Fair": "bg-brightyellow/20 text-[#1B1C1E]",
  "Career Guidance": "bg-flourescent/15 text-[#1B1C1E]",
};

// Stable slug for section ID anchors
const toId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Group workshops by distinct years (in order of appearance)
const distinctYears = Array.from(new Set(workshops.map((w) => w.year)));

const navGroups: YearGroup[] = distinctYears.map((year) => ({
  year,
  items: workshops
    .filter((w) => w.year === year)
    .map((w) => ({
      id: toId(w.title),
      title: w.title,
      date: w.date,
      year: w.year,
    })),
}));

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
        "startDate": w.startDate,
        "endDate": w.endDate || w.startDate,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        ...(w.photos.length > 0 ? { "image": w.photos.map((p) => p.src) } : {}),
        "url": `https://www.instudianagaland.com/workshops#${toId(w.title)}`,
        "location": {
          "@type": "Place",
          "name": w.subtitle
            ? w.subtitle.split("—")[0].replace(/^at\s+/i, "").trim()
            : "instudia, Dimapur",
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
      <script
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
              { value: "15+", label: "Events Conducted" },
              { value: "3,000+", label: "Participants" },
              { value: "22+", label: "Partner Institutions" },
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

          {/* Sticky sidebar nav (Accordion Grouped by Year) */}
          <div className="hidden xl:block sticky top-24 self-start">
            <WorkshopNav groups={navGroups} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-24">
            {workshops.map((w, i) => (
              <article
                key={w.title}
                id={toId(w.title)}
                className="group relative scroll-mt-28"
              >
                {/* Year Anchor when it's the first event of that year */}
                {(i === 0 || workshops[i - 1].year !== w.year) && (
                  <div id={`year-${w.year}`} className="scroll-mt-28" />
                )}

                {i < workshops.length - 1 && (
                  <div className="absolute left-0 top-full w-px h-24 bg-gradient-to-b from-neutral-200 to-transparent hidden lg:block" />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
                  {/* Left: Meta */}
                  <div className="lg:sticky lg:top-28">
                    {/* Index badge + tags */}
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

                    {/* Press Coverage Link if present */}
                    {w.newsLink && (
                      <div className="mt-5">
                        <a
                          href={w.newsLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brandpurple hover:underline bg-brandpurple/5 hover:bg-brandpurple/10 px-3 py-1.5 rounded-lg transition-colors border border-brandpurple/10"
                        >
                          <span>Read full coverage on {w.newsLink.source}</span>
                          <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: Photo grid with lightbox */}
                  <WorkshopPhotoGrid photos={w.photos} eager={i === 0} />
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
                <Link
                  href="/host-a-seminar"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
                >
                  Host instudia at Your School / College
                </Link>
                <a
                  href={`https://wa.me/918798587779?text=${encodeURIComponent(
                    "Hi instudia! I'm interested in attending your upcoming workshops and seminars in Nagaland. 👋"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#20ba5a] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/20"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="https://www.instagram.com/instudia_nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Follow on Instagram
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
