import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { AppConfig } from "../_utils/AppConfig";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { BreadcrumbSchema } from "../components/SchemaOrg/BreadcrumbSchema";
import { staff } from "../data/staff";
import HistoryTimeline from "./HistoryTimeline";

export const metadata = buildMetadata({
  title: "About Us — Tech & Skill Institute in Dimapur",
  description:
    "Learn about instudia — Nagaland's career-first tech institute. Meet our team, our mission, and see how we've helped 500+ students build IT careers.",
  path: "/about",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "About instudia — Tech & Skill Institute in Dimapur",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: "https://www.instudianagaland.com/about",
  logo: "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
  image: "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
  name: "instudia",
  description:
    "Nagaland's career-first tech institute in Dimapur, empowering students to upskill and build careers in IT, design, and finance.",
  email: "instudia.nagaland@gmail.com",
  telephone: "+91-8798-587779",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
    addressLocality: "Dimapur",
    addressCountry: "IN",
    addressRegion: "Nagaland",
    postalCode: "797112",
  },
};

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "10,000+", label: "Hours of Training" },
  { value: "98%", label: "Completion Rate" },
  { value: "20+", label: "Combined YOE" },
];

const values = [
  {
    name: "Impart",
    icon: "📚",
    description:
      "We strive to impart cutting-edge knowledge and skills, fostering a culture of continuous learning. Our commitment is to equip individuals with the expertise needed for success in the dynamic tech landscape.",
  },
  {
    name: "Inspirit",
    icon: "✨",
    description:
      "We aspire to inspirit the youth, igniting a passion for innovation and excellence. Through mentorship and a supportive community, we kindle the flames of creativity, enabling individuals to exceed their own expectations.",
  },
  {
    name: "Impact",
    icon: "🚀",
    description:
      "Our ultimate goal is to empower individuals to make a meaningful impact on society. We believe our trained professionals can contribute to a better future, driving positive change in Nagaland and beyond.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: canonicalFor("/") },
          { name: "About Us", url: canonicalFor("/about") },
        ]}
      />
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-100 pt-24 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
              About instudia
            </p>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
              Nagaland's{" "}
              <span className="text-brandpurple">Career-First</span>{" "}
              Tech Institute
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl">
              A specialized learning platform nestled in Dimapur, Nagaland.
              We empower students and tech professionals — guiding them to elevate their skill sets and propel their careers to new heights.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
              >
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right photo mosaic */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&h=528&q=80"
                alt="instudia team discussion"
                className="w-full h-full object-cover"
                width={400}
                height={528}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&auto=format&fit=crop&h=300&q=80"
                  alt="Student learning"
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="rounded-2xl bg-brandpurple p-5 flex flex-col justify-end text-white">
                <p className="text-3xl font-black">500+</p>
                <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mt-1">
                  Students Trained
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section className="border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-black text-[#1B1C1E]">{s.value}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Our Mission
          </p>
          <h2 className="text-4xl font-black text-[#1B1C1E] leading-tight">
            Bridging the skills gap in{" "}
            <span className="text-brandpurple">Nagaland</span>
          </h2>
          <p className="mt-6 text-gray-500 leading-relaxed">
            Our mission is to empower Nagaland's youth to become self-sufficient through reskilling and IT job opportunities. instudia bridges the skills gap, unlocking career potential by offering focused training that prepares students to meet the demands of a competitive job market.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            We equip learners with the technical and creative skills needed to adapt to rapid changes in technology and industry. By emphasizing both skilling and reskilling, we help students thrive locally and nationally.
          </p>
        </div>

        {/* Mission image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="instudia mission — team learning together"
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-extrabold uppercase tracking-widest text-white/80">
              Dimapur, Nagaland
            </p>
            <p className="text-lg font-black text-white mt-1">
              Building careers, one skill at a time
            </p>
          </div>
        </div>
      </section>

      {/* ── 3i Values ────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-3">
              Our Framework
            </p>
            <h2 className="text-4xl font-black text-[#1B1C1E]">
              The 3<span className="text-brandpurple">i</span>'s of instudia
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Our vision is defined by a three-pillar framework that shapes everything we do — from curriculum design to community events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.name}
                className="bg-white rounded-3xl p-8 border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl">{v.icon}</span>
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span className="text-[10px] font-black text-brandpurple/40">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-black text-[#1B1C1E]">{v.name}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History Timeline ─────────────────────────────── */}
      <HistoryTimeline />

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-3">
            Our People
          </p>
          <h2 className="text-4xl font-black text-[#1B1C1E]">
            Meet the team
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            A diverse team of educators and industry experts dedicated to empowering learners and shaping the future of skill development in Nagaland.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((member) => (
            <Link
              key={member.slug}
              href={`/card/${member.slug}`}
              className="group relative bg-white rounded-3xl border border-neutral-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-3xl bg-brandpurple/0 group-hover:bg-brandpurple/3 transition-colors duration-300 pointer-events-none" />

              {/* <div className="relative overflow-hidden rounded-2xl h-52 bg-gray-100"> */}
              {/* <Image
                  src={member.photo ?? "/placeholder.png"}
                  alt={`${member.name} — ${member.designation} at instudia`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                /> */}
              {/* Dept badge */}
              {/* <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    {member.department}
                  </span>
                </div> */}
              {/* </div> */}

              <div className="mt-4">
                <p className="font-black text-[#1B1C1E] text-base leading-tight">
                  {member.name}
                </p>
                <p className="text-xs font-semibold text-brandpurple mt-0.5">
                  {member.designation}
                </p>
                {member.bio && (
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* View card link */}
              <div className="mt-3 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-300 group-hover:text-brandpurple transition-colors">
                <span>View card</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Workplace philosophy ─────────────────────────── */}
      <section className="bg-gray-50 border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Bento grid of stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-brandpurple p-6 flex flex-col justify-end aspect-square">
              <p className="text-4xl font-black text-white">20+</p>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mt-1">
                Combined Years of Experience
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="instudia team"
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="instudia classroom"
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
            </div>
            <div className="rounded-3xl bg-flourescent p-6 flex flex-col justify-end aspect-square">
              <p className="text-4xl font-black text-[#1B1C1E]">1</p>
              <p className="text-xs font-semibold text-[#1B1C1E]/60 uppercase tracking-widest mt-1">
                Home Campus in Dimapur
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
              Our Workplace
            </p>
            <h2 className="text-4xl font-black text-[#1B1C1E] leading-tight">
              Work that enriches lives and drives{" "}
              <span className="text-brandpurple">meaningful change</span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              We see work as more than a job — it's a space to grow, create, and impact the world. Together, we shape a workplace that enriches lives and creates pathways to success for every student who walks through our doors.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "100+", l: "Community Members" },
                { v: "7+", l: "Events Conducted" },
                { v: "3", l: "Core Disciplines" },
                { v: "98%", l: "Completion Rate" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white border border-neutral-100 p-4">
                  <p className="text-2xl font-black text-[#1B1C1E]">{s.v}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-6 my-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-flourescent via-redhue via-brandpurple to-brightyellow p-[3px] shadow-lg">
          <div className="rounded-[calc(2.5rem-3px)] bg-white px-8 py-14 text-center lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Join instudia
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E]">
                Ready to build your career?
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Explore our courses and take the first step towards a future-proof career in tech, design, or finance.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
