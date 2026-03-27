"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendedCourses } from '../../utils/courseMatcher';
import { IconArrowRight, IconPalette, IconCodeAsterix } from '@tabler/icons-react';

export default function ChooseYourPath() {
  const [hoveredPath, setHoveredPath] = useState<'design' | 'code' | null>(null);
  
  // High-performance heuristic mapping resolving category nodes directly into UI grids natively
  const designCourses = getRecommendedCourses(["design", "ui", "ux", "graphic", "editing"], 4);
  const codeCourses = getRecommendedCourses(["react", "python", "backend", "cloud", "aws", "data", "web"], 4);

  return (
    <section className="w-full bg-[#0a0a0c] border-y border-neutral-900 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[85vh] lg:min-h-[750px] w-full items-stretch">
        
        {/* DESIGN PATH */}
        <motion.div 
          onHoverStart={() => setHoveredPath('design')}
          onHoverEnd={() => setHoveredPath(null)}
          animate={{ 
             flex: hoveredPath === 'design' ? 1.6 : hoveredPath === 'code' ? 0.6 : 1 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-center overflow-hidden cursor-crosshair group w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
          
          <div className="relative z-10 p-8 md:p-12 lg:p-20 flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-center w-full min-w-[300px] lg:min-w-[45vw]">
            <motion.div 
               animate={{ scale: hoveredPath === 'design' ? 1.1 : 1, y: hoveredPath === 'design' ? -10 : 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="w-20 h-20 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-orange-500 flex items-center justify-center text-white shadow-2xl shadow-fuchsia-500/30 mb-8"
            >
              <IconPalette size={40} stroke={2} />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-orange-400 transition-all duration-500">
              Design<br/>Your Future
            </h2>
            <p className="text-neutral-400 text-[17px] md:text-xl font-medium max-w-sm group-hover:text-neutral-300 transition-colors leading-relaxed">
              Master UI/UX, Graphic Design, and Video Editing. Build stunning visual experiences.
            </p>

            <AnimatePresence>
              {hoveredPath === 'design' && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-12 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                   {designCourses.slice(0, 2).map((course: any) => (
                     <a key={course.slug} href={`/courses/${course.slug}`} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-2xl p-5 flex flex-col gap-3 transition-colors group/card shadow-xl">
                        <span className="text-white font-extrabold text-[17px] leading-snug group-hover/card:text-fuchsia-300 transition-colors">{course.fullTitle}</span>
                        <div className="mt-auto pt-2 flex items-center justify-between text-fuchsia-400 text-xs font-black uppercase tracking-wider">
                           View Bootcamp <IconArrowRight size={16} className="group-hover/card:-rotate-45 transition-transform" />
                        </div>
                     </a>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CODE PATH */}
        <motion.div 
          onHoverStart={() => setHoveredPath('code')}
          onHoverEnd={() => setHoveredPath(null)}
          animate={{ 
             flex: hoveredPath === 'code' ? 1.6 : hoveredPath === 'design' ? 0.6 : 1 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-center overflow-hidden cursor-crosshair group w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/20 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
          
          <div className="relative z-10 p-8 md:p-12 lg:p-20 flex flex-col items-center lg:items-end text-center lg:text-right h-full justify-center w-full min-w-[300px] lg:min-w-[45vw]">
            <motion.div 
               animate={{ scale: hoveredPath === 'code' ? 1.1 : 1, y: hoveredPath === 'code' ? -10 : 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 mb-8"
            >
              <IconCodeAsterix size={40} stroke={2} />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-l group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500">
              Code<br/>Your Future
            </h2>
            <p className="text-neutral-400 text-[17px] md:text-xl font-medium max-w-sm group-hover:text-neutral-300 transition-colors leading-relaxed">
              Engineer complex systems with Python, React, and strict Cloud infrastructure logic.
            </p>

            <AnimatePresence>
              {hoveredPath === 'code' && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-12 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-5 text-left md:text-right lg:text-left"
                >
                   {codeCourses.slice(0, 2).map((course: any) => (
                     <a key={course.slug} href={`/courses/${course.slug}`} className="bg-[#1a1c23]/60 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#23252e] rounded-2xl p-5 flex flex-col gap-3 transition-colors group/card shadow-xl text-left">
                        <span className="text-white font-extrabold text-[17px] leading-snug group-hover/card:text-emerald-400 transition-colors">{course.fullTitle}</span>
                        <div className="mt-auto pt-2 flex items-center justify-between text-emerald-500 text-xs font-black uppercase tracking-wider">
                           View Bootcamp <IconArrowRight size={16} className="group-hover/card:-rotate-45 transition-transform" />
                        </div>
                     </a>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
