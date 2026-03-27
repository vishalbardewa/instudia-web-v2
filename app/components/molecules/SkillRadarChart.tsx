"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  current: number;
  required: number;
}

interface SkillGapChartProps {
  skills: Skill[];
}

export const SkillGapChart = ({ skills }: SkillGapChartProps) => {
  return (
    <div className="bg-white p-6 sm:p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-[#1B1C1E] tracking-tight">Skill Gap Analysis</h3>
      </div>

      <div className="space-y-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="relative group">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#1B1C1E] font-semibold">{skill.name}</span>
              <span className="text-xs text-neutral-500 font-medium">
                Target: {skill.required}%
              </span>
            </div>
            
            {/* Track Background */}
            <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden relative border border-neutral-200/60 shadow-inner">
              
              {/* Target Marker overlay (Indicates the gap) */}
              <div 
                className="absolute top-0 bottom-0 bg-brandpurple/10 border-r-2 border-dashed border-brandpurple/60 z-10" 
                style={{ width: `${skill.required}%` }} 
              />
              
              {/* Current Progress bar */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.current}%` }}
                transition={{ duration: 1.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-brandpurple to-brandpurple/80 rounded-full z-20"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-neutral-100 text-xs text-neutral-600 font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] bg-brandpurple shadow-sm"></div> Current Level
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] border border-dashed border-brandpurple/60 bg-brandpurple/10"></div> Required Level
        </div>
      </div>
    </div>
  );
};
