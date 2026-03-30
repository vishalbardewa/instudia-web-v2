"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendedCourses } from '../../utils/courseMatcher';
import { IconArrowRight, IconTerminal2 } from '@tabler/icons-react';
import { IMAGE_LIST } from '../../utils/CourseImageList';

const TARGET_CAREERS = [
  { text: "Artificial Intelligence", queries: ["ai", "generative", "machine learning"] },
  { text: "Full-Stack Web Development", queries: ["react", "html", "node", "backend"] },
  { text: "Cloud Architecture Networks", queries: ["aws", "cloud", "docker", "devops"] },
  { text: "UI/UX Product Design", queries: ["figma", "design", "ui/ux"] },
  { text: "Python Data Science", queries: ["python", "data", "analytics"] },
  { text: "Corporate Financial Accounting", queries: ["tally", "gst", "accounting", "finance"] }
];

export default function CareerTerminal() {
  const [careerIndex, setCareerIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const activeTarget = TARGET_CAREERS[careerIndex];
  // Extract primitive string to avoid unstable object reference in dep array
  const targetText = activeTarget.text;

  // Auto-typing logic mapping specifically to character lengths
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (typedText.length < targetText.length) {
        timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, Math.random() * 50 + 50); // Organic typing simulation speeds
      } else {
        timeout = setTimeout(() => setIsTyping(false), 3000); // Extended pause locking UI
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length - 1));
        }, 30); // Faster aggressive backspacing
      } else {
        setCareerIndex((prev) => (prev + 1) % TARGET_CAREERS.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
    // targetText is a primitive string derived from careerIndex — careerIndex covers all index transitions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText, isTyping, targetText]);

  const recommendedCourses = getRecommendedCourses(activeTarget.queries, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-jakarta">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1B1C1E] tracking-tight">
          What will you build next?
        </h2>
        <p className="mt-4 text-[17px] text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Instudia dynamically constructs localized paths targeting your actual tech ambitions directly into the rigid operational curriculum taught by industry leaders globally.
        </p>
      </div>

      <div className="bg-[#fafafa] rounded-t-[2rem] rounded-b-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-neutral-800/80 overflow-hidden relative shadow-brandpurple/5 transition-all">
        {/* macOS Terminal Header */}
        <div className="bg-[#fafafa] border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between relative">
          <div className="flex gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 border border-red-600/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 border border-green-600/50" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-neutral-500 text-[13px] font-bold opacity-80 flex items-center gap-2">
            <IconTerminal2 size={16} /> <span className="hidden sm:inline">zsh — </span>instudia-ai-core
          </div>
          <div className="text-neutral-600 text-xs font-bold font-mono border border-neutral-700 px-2 py-1 rounded-md">Live</div>
        </div>

        {/* Terminal Body Window */}
        <div className="p-6 sm:p-10 lg:p-16 relative h-[1450px] sm:h-[1250px] md:h-[1050px] lg:h-[720px] flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brandpurple/10 via-transparent to-transparent opacity-40 pointer-events-none" />

          <div className="relative z-10 flex-1 flex flex-col">

            {/* CLI Prompt Frame */}
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono mb-12 lg:mb-16 flex items-center flex-wrap gap-2 sm:gap-3 overflow-hidden text-[#1B1C1E]">
              <span className="text-emerald-500 font-extrabold select-none">➜</span>
              <span className="text-cyan-500 font-extrabold select-none sm:mr-2">~</span>
              <span className="font-bold">I want to master</span>
              
              {/* Highlighted Wrapper Restored */}
              <span className="font-extrabold text-brandpurple bg-brandpurple/10 px-4 py-2 sm:py-2.5 rounded-xl border border-brandpurple/20 flex items-center translate-y-0 mt-2 sm:mt-0 shadow-sm ml-1">
                {typedText}
                <span className="inline-block w-3 sm:w-4 lg:w-5 h-6 sm:h-8 lg:h-10 bg-brandpurple ml-2 animate-[pulse_1s_step-end_infinite] align-middle" />
              </span>
            </div>

            {/* Output Grid Target */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTarget.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr w-full"
              >
                {recommendedCourses.map((course: any, idx: number) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                    className="h-full"
                  >
                    <a
                      href={`/courses/${course.slug}`}
                      className="bg-[#FAFAFA] hover:bg-[#F5F5F5]/80 border border-neutral-800 hover:border-neutral-600 rounded-2xl p-5 transition-all group flex flex-col h-full shadow-lg shadow-black/50"
                    >
                      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-neutral-800">
                        <img
                          src={IMAGE_LIST[`${course.slug}`] || course.image}
                          alt={course.fullTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-matteblack font-extrabold text-lg sm:text-xl mb-3 group-hover:text-brandpurple transition-colors leading-snug">
                          {course.fullTitle}
                        </h3>
                        <p className="text-neutral-500 font-medium text-[13px] sm:text-sm line-clamp-3 mb-6 leading-relaxed">
                          {course.courseHightlight || course.courseHighlight}
                        </p>

                        <div className="mt-auto pt-5 border-t border-neutral-800/80 flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-neutral-900 border-neutral-800 border text-[#fafafa] px-3 py-1.5 rounded-lg">
                            {course.category}
                          </span>
                          <IconArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
