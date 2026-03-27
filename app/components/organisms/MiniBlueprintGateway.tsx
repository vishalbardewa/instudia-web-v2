"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendedCourses } from '../../utils/courseMatcher';
import { IconSearch, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import { IMAGE_LIST } from '../../utils/CourseImageList';

export default function MiniBlueprintGateway() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Clean debouncer mapping typing performance limits
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Execute native matching utilizing array thresholds dynamically extracted from input string boundaries
  const recommendedCourses = getRecommendedCourses(
    debouncedQuery.trim().length > 2 ? debouncedQuery.toLowerCase().split(' ') : [],
    3
  );

  return (
    <section className="w-full bg-[#FAFAFA] py-24 border-y border-neutral-200/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">

        <div className="inline-flex items-center justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full bg-brandpurple/10 border border-brandpurple/20 text-brandpurple font-extrabold text-[13px] tracking-wide flex items-center gap-2 shadow-sm">
            <IconSparkles size={16} /> Career Matching
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1B1C1E] tracking-tight mb-6 leading-[1.1]">
          What is your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandpurple to-fuchsia-500">dream career?</span>
        </h2>
        <p className="text-neutral-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Type your target job title below. Our Blueprint engine will dynamically construct the exact technical curriculum you need to get there instantly.
        </p>

        {/* Input Interactive Gate */}
        <div className="relative max-w-3xl mx-auto z-20 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
            <IconSearch className="text-brandpurple opacity-80" size={26} stroke={2.5} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Software Engineer, Data Scientist, UI Designer..."
            className="w-full pl-16 pr-8 py-5 md:py-6 rounded-2xl md:rounded-3xl border-2 border-neutral-200 focus:border-brandpurple focus:ring-4 focus:ring-brandpurple/10 text-xl font-bold text-[#1B1C1E] placeholder:text-neutral-300 outline-none shadow-xl shadow-neutral-200/50 transition-all bg-white"
          />
        </div>

        {/* Rendering Mapping Intersection */}
        <div className="relative mt-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            {debouncedQuery.trim().length > 2 && recommendedCourses.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left relative z-10"
              >
                {recommendedCourses.map((course: any, idx: number) => (
                  <motion.a
                    key={course.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    href={`/courses/${course.slug}`}
                    className="bg-white rounded-[24px] p-5 border-2 border-neutral-100/80 hover:border-brandpurple/30 hover:shadow-2xl hover:shadow-brandpurple/5 transition-all group flex flex-col h-full"
                  >
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-neutral-100 relative border border-neutral-100">
                      <img
                        src={IMAGE_LIST[`${course.slug}`] || course.image}
                        alt={course.fullTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md shadow-sm text-[#1B1C1E] font-black text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-neutral-100 drop-shadow-sm">
                        {course.category}
                      </div>
                    </div>

                    <h3 className="text-[#1B1C1E] font-extrabold text-xl mb-3 group-hover:text-brandpurple transition-colors leading-snug">
                      {course.fullTitle}
                    </h3>
                    <p className="text-neutral-500 font-medium text-sm line-clamp-2 mb-6 leading-relaxed">
                      {course.courseHightlight || course.courseHighlight}
                    </p>

                    <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between text-brandpurple font-bold text-[15px]">
                      Explore Module <IconArrowRight size={18} stroke={2.5} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-neutral-300 pointer-events-none"
              >
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <IconSearch size={40} className="opacity-40" stroke={2} />
                </div>
                <p className="text-xl font-bold max-w-sm text-neutral-400">Enter a role above to manually trace your custom learning path.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Deep Funnel Extrapolation */}
        <AnimatePresence>
          {debouncedQuery.trim().length > 2 && recommendedCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="mt-16"
            >
              <a href={`/tools/career-blueprint?role=${encodeURIComponent(debouncedQuery)}`} className="inline-flex items-center gap-3 bg-[#1B1C1E] hover:bg-black text-white px-8 py-4 md:py-5 rounded-2xl font-extrabold text-lg transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 group border border-neutral-800">
                Generate Deep Blueprint AI Timeline
                <span className="bg-white/10 p-1.5 rounded-xl group-hover:bg-white/20 transition-colors">
                  <IconArrowRight size={20} stroke={3} />
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
