import { Metadata } from "next";
import Link from "next/link";
import { posts } from "../data/posts";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Insights on Careers, Tech & Skills",
  description:
    "Career tips, skill guides, and tech insights from instudia — Nagaland's career-first tech institute in Dimapur.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "instudia Blog — Career, Tech & Skill Insights",
    description:
      "Read practical guides on IT careers, design, accounting, and upskilling from our team in Dimapur.",
    url: "https://www.instudianagaland.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-100 pt-24 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            instudia Blog
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Insights to{" "}
            <span className="text-brandpurple">build your career</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Practical guides on tech careers, in-demand skills, and the tools you need to succeed — from our team in Dimapur.
          </p>
        </div>
      </section>

      {/* ── Interactive filter + posts (client component) ── */}
      <BlogClient posts={posts} />

      {/* ── Newsletter / CTA ───────────────────────────────── */}
      <section className="mx-6 mb-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-flourescent via-redhue via-brandpurple to-brightyellow p-[3px] shadow-lg">
          <div className="rounded-[calc(2.5rem-3px)] bg-white px-8 py-14 text-center lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Stay Updated
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E]">
                Get career insights in your inbox
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                Join 500+ students and professionals who get weekly career tips, course announcements, and skill guides from instudia.
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
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
