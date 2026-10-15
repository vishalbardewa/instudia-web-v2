"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import {
  MagnifyingGlassIcon,
  ClockIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export interface CourseItemData {
  slug: string;
  category: string;
  fullTitle: string;
  courseHighlight?: string;
  courseHightlight?: string;
  durationMonths?: string;
  inDemand?: boolean;
  qualification?: string;
}

interface Props {
  courses: CourseItemData[];
}

const CATEGORY_TABS = [
  { id: "all", label: "All Courses" },
  { id: "tech", label: "Software & AI" },
  { id: "office", label: "Accounting & DCA" },
  { id: "data", label: "Data & Analytics" },
  { id: "design", label: "Design & UI/UX" },
];

export default function CourseQuickFinder({ courses }: Props) {
  const [activeTab, setActiveTab] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all"); // 'all' | 'short' | 'diploma'
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // 1. Category tab match
      const cat = course.category.toLowerCase();
      const slug = course.slug.toLowerCase();
      const title = course.fullTitle.toLowerCase();

      let matchesTab = true;
      if (activeTab === "tech") {
        matchesTab =
          slug.includes("python") ||
          slug.includes("javascript") ||
          slug.includes("golang") ||
          slug.includes("web") ||
          slug.includes("backend") ||
          slug.includes("frontend") ||
          slug.includes("ai") ||
          slug.includes("devops");
      } else if (activeTab === "office") {
        matchesTab =
          slug.includes("dca") ||
          slug.includes("pgdca") ||
          slug.includes("tally") ||
          slug.includes("gst") ||
          slug.includes("excel");
      } else if (activeTab === "data") {
        matchesTab =
          slug.includes("data") ||
          slug.includes("powerbi") ||
          slug.includes("spss");
      } else if (activeTab === "design") {
        matchesTab = slug.includes("graphic") || slug.includes("ui-ux");
      }

      if (!matchesTab) return false;

      // 2. Duration filter match
      const dur = parseInt(course.durationMonths || "0", 10);
      if (durationFilter === "short" && dur > 3) return false;
      if (durationFilter === "diploma" && dur < 6) return false;

      // 3. Search query match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const textToSearch = `${title} ${course.courseHighlight || ""} ${course.courseHightlight || ""} ${slug}`;
        if (!textToSearch.includes(q)) return false;
      }

      return true;
    });
  }, [courses, activeTab, durationFilter, searchQuery]);

  return (
    <section className="w-full my-12" id="course-finder">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandpurple mb-2">
            Course Catalog &amp; Directory
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Find the right program for your goals
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            Filter 19+ certified offline programs with hands-on lab training in Dimapur.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (e.g. Python, DCA, Tally)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 bg-neutral-50/70 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 pb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-neutral-100 border border-neutral-200/60">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-neutral-950 text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Duration Segment */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-neutral-400 font-medium mr-1 hidden sm:inline">
            Duration:
          </span>
          <button
            onClick={() => setDurationFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all ${
              durationFilter === "all"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            All Durations
          </button>
          <button
            onClick={() => setDurationFilter("short")}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all ${
              durationFilter === "short"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            1–3 Months
          </button>
          <button
            onClick={() => setDurationFilter("diploma")}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all ${
              durationFilter === "diploma"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            6+ Months (Diploma)
          </button>
        </div>
      </div>

      {/* Results grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
          <p className="text-neutral-600 font-semibold text-base mb-2">
            No courses match your active filter.
          </p>
          <p className="text-neutral-400 text-sm mb-4">
            Try adjusting your search query or selecting "All Courses".
          </p>
          <button
            onClick={() => {
              setActiveTab("all");
              setDurationFilter("all");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const courseImg =
              IMAGE_LIST[c.slug] ||
              "https://ik.imagekit.io/dxffek9yf/course-list-page/course-template.png";
            const highlightText = c.courseHighlight || c.courseHightlight || "";
            const waQuery = encodeURIComponent(
              `Hi instudia! I'm interested in the ${c.fullTitle} course. Could you share fee structure and next batch start date?`
            );
            const waLink = `https://wa.me/918798587779?text=${waQuery}`;

            return (
              <article
                key={c.slug}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-neutral-400 transition-all duration-300"
              >
                <div>
                  {/* Top image preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src={courseImg}
                      alt={c.fullTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {c.inDemand && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        In Demand
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {c.category}
                    </span>
                  </div>

                  {/* Title & snippet */}
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-brandpurple transition-colors line-clamp-1">
                    <Link href={`/courses/${c.slug}`}>{c.fullTitle}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {highlightText}
                  </p>

                  {/* Metadata tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                    {c.durationMonths && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 font-medium">
                        <ClockIcon className="w-3.5 h-3.5 text-neutral-500" />
                        {c.durationMonths} {parseInt(c.durationMonths, 10) === 1 ? "Month" : "Months"}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 font-medium">
                      <AcademicCapIcon className="w-3.5 h-3.5 text-neutral-500" />
                      ISO Certificate
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                      Practical Labs
                    </span>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/courses/${c.slug}`}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    View Syllabus ↗
                  </Link>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Inquire on WhatsApp"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-[#25D366] hover:bg-emerald-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
