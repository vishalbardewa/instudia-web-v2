"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendedCourses } from '../../utils/courseMatcher';
import { IconArrowRight, IconAnalyze } from '@tabler/icons-react';
import { IMAGE_LIST } from '../../utils/CourseImageList';

// Map structural dictionary references binding directly to exact course dependencies
const SKILLS = [
  { id: 'react', label: 'React.js', color: 'bg-blue-500', pos: { x: -150, y: -110 } },
  { id: 'python', label: 'Python', color: 'bg-yellow-500', pos: { x: 150, y: -130 } },
  { id: 'figma', label: 'Figma', color: 'bg-fuchsia-500', pos: { x: -190, y: 70 } },
  { id: 'aws', label: 'AWS', color: 'bg-orange-500', pos: { x: 170, y: 90 } },
  { id: 'data', label: 'Data Science', color: 'bg-emerald-500', pos: { x: -50, y: 180 } },
  { id: 'tally', label: 'Finance & GST', color: 'bg-red-500', pos: { x: 60, y: -200 } },
];

export default function SkillGraphOrbit() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);

  const activeSkill = hoveredSkill || clickedSkill;

  const recommendedCourses = getRecommendedCourses(
    activeSkill ? [activeSkill] : [], 
    2 // Explicitly constrained to 2 highly visual cards to protect layout sizing
  );

  return (
    <section className="w-full bg-[#FAFAFA] py-24 md:py-32 overflow-hidden border-y border-neutral-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
          
          {/* LEFT PANEL: Orbital Mapping Vectors */}
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] flex items-center justify-center pointer-events-auto scale-[0.65] sm:scale-[0.8] lg:scale-100 origin-center transition-transform">
            
            {/* Ambient Background Glows bounding constraints */}
            <div className="absolute w-[300px] h-[300px] bg-brandpurple/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Central Analysis Core */}
            <div className="absolute w-36 h-36 rounded-full bg-brandpurple/5 flex items-center justify-center border border-brandpurple/20 z-20 shadow-[0_0_80px_rgba(168,85,247,0.1)] backdrop-blur-md">
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brandpurple to-fuchsia-500 flex items-center justify-center text-white shadow-xl">
                 <IconAnalyze size={40} stroke={2.5} className="opacity-100" />
               </div>
            </div>

            {/* Static & Animated Concentric Radials */}
            <div className="absolute w-[280px] h-[280px] rounded-full border border-neutral-200 shadow-sm" />
            <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 80, ease: "linear", repeat: Infinity }}
               className="absolute w-[440px] h-[440px] rounded-full border border-neutral-300 border-dashed transform-gpu" 
            />
            <motion.div 
               animate={{ rotate: -360 }} transition={{ duration: 120, ease: "linear", repeat: Infinity }}
               className="absolute w-[600px] h-[600px] rounded-full border border-neutral-200/60 transform-gpu" 
            />

            {/* Absolute Placed Skill Vector Nodes */}
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.id}
                onHoverStart={() => setHoveredSkill(skill.id)}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => setClickedSkill(clickedSkill === skill.id ? null : skill.id)}
                animate={{ 
                  scale: activeSkill === skill.id ? 1.15 : 1,
                  opacity: activeSkill && activeSkill !== skill.id ? 0.35 : 1
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute z-30 cursor-crosshair transform-gpu"
                style={{ 
                  x: skill.pos.x, 
                  y: skill.pos.y 
                }}
              >
                <div className="relative group">
                  {/* Hue Underglow isolated per node matching its physical category color */}
                  <div className={`absolute inset-0 ${skill.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  <div className={`relative px-6 py-3.5 rounded-full bg-white border flex items-center gap-3 shadow-xl transition-all duration-300 ${activeSkill === skill.id ? 'border-brandpurple shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-2 ring-brandpurple/20' : 'border-neutral-100'} ${clickedSkill === skill.id ? 'ring-2 ring-brandpurple ring-offset-2 ring-offset-[#FAFAFA]' : ''}`}>
                    <div className={`w-3.5 h-3.5 rounded-full ${skill.color} shadow-[0_0_12px_currentColor]`} />
                    <span className="text-[#1B1C1E] font-extrabold text-[15px] whitespace-nowrap">{skill.label}</span>
                  </div>

                  {/* SVG Dash Line rendering physics ties strictly during active state bindings */}
                  <svg className="absolute top-1/2 left-1/2 -z-10 pointer-events-none overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <line x1="0" y1="0" x2={-skill.pos.x} y2={-skill.pos.y} stroke="rgba(168,85,247,0.4)" strokeWidth="2.5" strokeDasharray="5 5" className="animate-[dash_2s_linear_infinite]" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT PANEL: Extracted Heuristic Card Inspectors */}
          <div className="flex flex-col justify-center min-h-[400px] lg:pl-12 relative z-10 w-full">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B1C1E] tracking-tight mb-6 leading-tight">
              The Skill-Graph<br/>Orbit.
            </h2>
            <p className="text-neutral-500 text-[17px] md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
              Hover over any high-demand technical vector in the constellation to forcefully unveil exactly which Instudia certifications command it natively.
            </p>

            <div className="relative h-[340px] sm:h-[320px] lg:h-[300px] w-full max-w-lg">
              
              {/* IDLE MESSAGE PERSISTENT STATE */}
              <motion.div 
                 initial={false}
                 animate={{ opacity: activeSkill ? 0 : 1, filter: activeSkill ? "blur(8px)" : "blur(0px)", scale: activeSkill ? 0.98 : 1 }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className={`absolute inset-0 border-[3px] border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-white/50 transform-gpu ${activeSkill ? 'pointer-events-none' : ''}`}
              >
                  <IconAnalyze size={48} className="text-brandpurple/40 mb-6" stroke={1.5} />
                  <p className="text-neutral-400 font-bold text-lg max-w-xs">
                    Engage with a skill vector on the left to extract the related mapping matrices.
                  </p>
              </motion.div>

              {/* COURSES PERSISTENT BOUNDARY */}
              <motion.div 
                 initial={false}
                 animate={{ opacity: activeSkill ? 1 : 0, filter: activeSkill ? "blur(0px)" : "blur(8px)" }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className={`absolute inset-0 flex flex-col gap-5 w-full transform-gpu ${!activeSkill ? 'pointer-events-none' : ''}`}
              >
                 <div className="text-xs font-black uppercase text-brandpurple tracking-widest mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandpurple animate-pulse" />
                    Intersecting Curriculums
                 </div>
                 {recommendedCourses.slice(0, 2).map((course: any, idx: number) => (
                    <div 
                      key={`${course.slug}-${activeSkill || 'idle'}`} 
                      className="flex-1"
                    >
                      <a href={`/courses/${course.slug}`} className="block h-full bg-white border border-neutral-100 hover:border-brandpurple/30 rounded-[20px] p-4 sm:p-5 flex items-center gap-4 sm:gap-6 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brandpurple to-fuchsia-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                        
                        <div className="w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                          <img 
                            src={IMAGE_LIST[`${course.slug}`] || course.image}
                            alt="" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100"
                          />
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-[#1B1C1E] font-extrabold text-[17px] sm:text-lg leading-tight group-hover:text-brandpurple transition-colors mb-2.5 truncate">
                            {course.fullTitle}
                          </h4>
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-neutral-50 border border-neutral-100 px-2.5 py-1.5 rounded-lg text-[#1B1C1E] drop-shadow-sm">
                            {course.category}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-brandpurple/30 group-hover:bg-brandpurple/5 transition-all">
                           <IconArrowRight size={20} className="text-brandpurple group-hover:-rotate-45 transition-all" stroke={2.5}/>
                        </div>
                      </a>
                    </div>
                 ))}
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
