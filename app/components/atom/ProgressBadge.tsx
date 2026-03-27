import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBadgeProps {
  percentage: number;
  label?: string;
}

export const ProgressBadge = ({ percentage, label = "Readiness Score" }: ProgressBadgeProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white ring-1 ring-neutral-950/5 rounded-3xl shadow-lg overflow-hidden">
      <div className="text-sm font-bold text-neutral-500 mb-2 uppercase tracking-wider">{label}</div>
      <div className="text-5xl font-black text-[#1B1C1E]">
        {percentage}%
      </div>
      
      <div className="w-full h-3 bg-neutral-100 rounded-full mt-6 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-brightyellow to-flourescent"
        />
      </div>
      <p className="text-xs text-neutral-500 mt-4 text-center font-medium">
        Keep completing milestones to increase your score.
      </p>
    </div>
  );
};
