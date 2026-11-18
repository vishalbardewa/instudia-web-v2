"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { COURSE_OPTIONS } from "./reviewConstants";

interface SearchableCourseSelectProps {
  selectedCourse: string;
  onSelectCourse: (courseTitle: string) => void;
  role: "student" | "parent";
}

const CATEGORY_FILTERS = [
  "All",
  "Computer Applications",
  "Coding & AI",
  "Accounting & Finance",
  "Data & Analytics",
  "Design & Creative",
  "Professional & IT",
];

function getCategoryColor(category: string) {
  switch (category) {
    case "Coding & AI":
      return {
        dot: "bg-purple-500",
        badge: "bg-purple-50 text-purple-700 border-purple-200",
      };
    case "Computer Applications":
      return {
        dot: "bg-amber-500",
        badge: "bg-amber-50 text-amber-800 border-amber-200",
      };
    case "Accounting & Finance":
      return {
        dot: "bg-emerald-500",
        badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      };
    case "Data & Analytics":
      return {
        dot: "bg-blue-500",
        badge: "bg-blue-50 text-blue-800 border-blue-200",
      };
    case "Design & Creative":
      return {
        dot: "bg-pink-500",
        badge: "bg-pink-50 text-pink-700 border-pink-200",
      };
    case "Professional & IT":
      return {
        dot: "bg-indigo-500",
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
      };
    default:
      return {
        dot: "bg-neutral-400",
        badge: "bg-neutral-100 text-neutral-700 border-neutral-200",
      };
  }
}

export default function SearchableCourseSelect({
  selectedCourse,
  onSelectCourse,
  role,
}: SearchableCourseSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Match the currently selected option object
  const currentOption = useMemo(() => {
    return (
      COURSE_OPTIONS.find((c) => c.title === selectedCourse) || {
        slug: "custom",
        title: selectedCourse || "Select Course",
        category: "General",
      }
    );
  }, [selectedCourse]);

  // Filter courses by search query + category
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COURSE_OPTIONS.filter((course) => {
      if (activeCategory !== "All" && course.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = `${course.title} ${course.slug} ${course.category}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, activeCategory]);

  const selectCourse = (title: string) => {
    onSelectCourse(title);
  };

  const currentColor = getCategoryColor(currentOption.category);

  return (
    <div className="w-full">
      {/* CURRENT SELECTION BADGE (RESPONSIVE HEADER) */}
      <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-[11px] sm:text-xs font-bold text-neutral-500 shrink-0">Selected:</span>
          <span className="text-xs sm:text-sm font-black text-neutral-900 truncate">
            {currentOption.title}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold border uppercase tracking-wider shrink-0 ${currentColor.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${currentColor.dot}`} />
          <span>{currentOption.category}</span>
        </span>
      </div>

      {/* SEARCHABLE COURSE IN-FLOW CONTAINER */}
      <div className="w-full bg-white border-2 border-neutral-900 rounded-xl sm:rounded-2xl shadow-[3px_3px_0_#1B1C1E] sm:shadow-[6px_6px_0_#1B1C1E] overflow-hidden">
        {/* SEARCH HEADER */}
        <div className="p-2 sm:p-3 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course or skill (e.g. Python, Tally)..."
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 bg-white border border-neutral-300 rounded-xl text-base sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-brandpurple focus:ring-2 focus:ring-brandpurple/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 flex items-center justify-center text-xs cursor-pointer"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* CATEGORY FILTER TABS (TOUCH-SWIPABLE ON MOBILE) */}
          <div
            data-lenis-prevent
            className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-2 sm:mt-2.5 touch-pan-x brutalist-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all shrink-0 cursor-pointer active:scale-95 ${isActive
                      ? "bg-[#1B1C1E] text-white shadow-2xs"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* SCROLLABLE COURSE LIST (RESPONSIVE HEIGHT & TOUCH PADDING) */}
        <div
          data-lenis-prevent
          className="max-h-48 sm:max-h-56 md:max-h-60 overflow-y-auto divide-y divide-neutral-100 overscroll-contain"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => {
              const isSelected = selectedCourse === c.title;
              const catColor = getCategoryColor(c.category);

              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => selectCourse(c.title)}
                  className={`w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 transition-colors cursor-pointer min-h-[44px] active:bg-neutral-100 ${isSelected
                      ? "bg-brandpurple/10 text-brandpurple"
                      : "hover:bg-neutral-50 text-neutral-800"
                    }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-bold border uppercase tracking-wider ${catColor.badge}`}
                      >
                        <span className={`w-1 h-1 rounded-full ${catColor.dot}`} />
                        {c.category}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm font-bold truncate leading-snug ${isSelected ? "text-brandpurple font-black" : "text-[#1B1C1E]"
                        }`}
                    >
                      {c.title}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-brandpurple text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <CheckIcon className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-5 text-center">
              <p className="text-xs font-bold text-neutral-500 mb-2">
                No courses found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => selectCourse("Other / General Experience at instudia")}
                className="inline-flex items-center gap-1.5 text-xs font-black text-brandpurple hover:underline cursor-pointer"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                Select &ldquo;Other / General Experience&rdquo;
              </button>
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="px-3 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-500">
          <span>{filteredCourses.length} courses</span>
          <button
            type="button"
            onClick={() => selectCourse("Other / General Experience at instudia")}
            className="text-neutral-700 hover:text-brandpurple font-bold cursor-pointer"
          >
            General Experience →
          </button>
        </div>
      </div>
    </div>
  );
}
