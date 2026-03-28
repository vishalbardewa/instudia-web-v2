"use client";

import React, { useState } from 'react';
import { IconCheck, IconLock, IconCode } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export type MilestoneStatus = 'completed' | 'current' | 'locked';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  estimatedHours: number;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export const MilestoneTimeline = ({ milestones }: MilestoneTimelineProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Calculate the index of the first locked item to stop the progress bar line
  const firstLockedIndex = milestones.findIndex(m => m.status === 'locked');
  const progressPercentage = firstLockedIndex === -1 
    ? 100 
    : (firstLockedIndex / (milestones.length - 1)) * 100;

  return (
    <div className="w-full py-10 font-jakarta">
      <div className="relative max-w-5xl mx-auto">
        
        {/* Desktop Central Line */}
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1.5 bg-neutral-100 -translate-x-1/2 rounded-full z-0 overflow-hidden shadow-inner">
          <div 
            className="absolute top-0 w-full bg-gradient-to-b from-brandpurple to-flourescent rounded-full transition-[height] duration-1000 ease-out h-[var(--milestone-progress)]" 
            style={{ "--milestone-progress": `${progressPercentage}%` } as React.CSSProperties} 
          />
        </div>

        {/* Mobile Left Line */}
        <div className="md:hidden absolute left-7 top-8 bottom-8 w-1.5 bg-neutral-100 rounded-full z-0 overflow-hidden shadow-inner">
           <div 
            className="absolute top-0 w-full bg-gradient-to-b from-brandpurple to-flourescent rounded-full transition-[height] duration-1000 ease-out h-[var(--milestone-progress)]" 
            style={{ "--milestone-progress": `${progressPercentage}%` } as React.CSSProperties} 
          />
        </div>

        <div className="space-y-6 md:space-y-0 relative z-10 w-full">
          {milestones.map((milestone, index) => {
            const isCompleted = milestone.status === 'completed';
            const isCurrent = milestone.status === 'current';
            const isLocked = milestone.status === 'locked';
            
            // Alternating pattern for desktop layout (roadmap.sh style)
            const isEven = index % 2 === 0;
            const isHovered = hoveredNode === milestone.id;

            return (
              <div 
                key={milestone.id} 
                className={cn(
                  "relative flex items-center md:justify-center w-full pl-20 md:pl-0 group md:min-h-[220px]",
                  // No specific row-reverse needed because we use rigid flex placement
                )}
                onMouseEnter={() => setHoveredNode(milestone.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                
                {/* Connector line (Desktop) */}
                <div className={cn(
                  "hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[3px] z-0 transition-colors duration-300",
                  isEven ? "right-[calc(50%+1.25rem)]" : "left-[calc(50%+1.25rem)]",
                  isCompleted || isCurrent ? "bg-brandpurple" : "bg-neutral-200"
                )} />

                {/* Left side card space (Desktop) */}
                <div className="hidden md:flex flex-1 justify-end pr-8">
                  {isEven && (
                    <RoadmapCard milestone={milestone} isHovered={isHovered} align="right" />
                  )}
                </div>

                {/* Central Node */}
                <div 
                  className={cn(
                    "absolute md:static left-[18px] flex items-center justify-center w-12 h-12 rounded-full border-[4px] z-10 transition-all duration-500 shrink-0 cursor-pointer shadow-sm mx-4",
                    isCompleted ? "bg-brandpurple border-brandpurple text-white shadow-[0_0_20px_rgba(194,27,255,0.4)] scale-110" : 
                    isCurrent ? "bg-white border-brandpurple/40 ring-[6px] ring-brandpurple/20 text-brandpurple scale-125" : 
                    "bg-neutral-50 text-neutral-400 border-neutral-300 hover:border-brandpurple/50 hover:text-brandpurple hover:scale-110"
                  )}
                >
                  {isCompleted && <IconCheck size={24} stroke={3} />}
                  {isCurrent && <div className="w-3.5 h-3.5 rounded-full bg-brandpurple animate-ping"></div>}
                  {isLocked && <IconLock size={18} />}
                </div>

                {/* Right side card space (Desktop) */}
                <div className="hidden md:flex flex-1 justify-start pl-8">
                  {!isEven && (
                    <RoadmapCard milestone={milestone} isHovered={isHovered} align="left" />
                  )}
                </div>

                {/* Mobile Card (Visible only on mobile) */}
                <div className="md:hidden w-full pb-6 pt-2">
                   <RoadmapCard milestone={milestone} isHovered={isHovered} align="left" />
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Sub-component for the interactive item box
function RoadmapCard({ milestone, isHovered, align }: { milestone: Milestone, isHovered: boolean, align: 'left' | 'right' }) {
  const isCompleted = milestone.status === 'completed';
  const isCurrent = milestone.status === 'current';
  
  return (
    <div 
      className={cn(
        "w-full max-w-sm p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer relative overflow-hidden",
        align === 'right' ? "md:text-right" : "md:text-left",
        isCompleted ? "bg-white border-neutral-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brandpurple/50" : 
        isCurrent ? "bg-white border-brandpurple shadow-[0_4px_30px_rgba(194,27,255,0.15)] ring-1 ring-brandpurple/20 transform md:scale-105" : 
        "bg-neutral-50/80 border-neutral-200 opacity-80 hover:opacity-100 hover:bg-white hover:shadow-md"
      )}
    >
      {/* Decorative background flair for current milestone */}
      {isCurrent && (
        <div className={cn(
          "absolute -top-10 w-24 h-24 bg-brightyellow/30 blur-[40px] rounded-full pointer-events-none",
          align === 'right' ? "-left-10" : "-right-10"
        )} />
      )}

      <div className={cn(
        "flex flex-col gap-1.5 mb-3 relative z-10",
        align === 'right' ? "md:items-end" : "md:items-start"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          align === 'right' ? "md:flex-row-reverse" : "md:flex-row"
        )}>
          <span className={cn(
            "text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest rounded-md w-fit shadow-sm",
            isCompleted ? "bg-brandpurple/10 text-brandpurple border border-brandpurple/20" :
            isCurrent ? "bg-brightyellow/20 text-yellow-700 border border-yellow-500/30" :
            "bg-neutral-200 text-neutral-600 border border-neutral-300"
          )}>
            {milestone.status}
          </span>
          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
            ~{milestone.estimatedHours} hrs
          </span>
        </div>
        
        <h4 className={cn(
          "font-extrabold text-xl tracking-tight leading-snug mt-3",
          isCompleted ? "text-[#1B1C1E]" : isCurrent ? "text-brandpurple" : "text-neutral-500"
        )}>
          {milestone.title}
        </h4>
      </div>
      
      <p className={cn(
        "text-sm leading-relaxed transition-all duration-300",
        isCurrent ? "text-neutral-700" : "text-neutral-500 line-clamp-2",
        isHovered && "line-clamp-none text-neutral-700"
      )}>
        {milestone.description}
      </p>

      {/* Interactive Expandable Action Bottom Area */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out",
        isHovered || isCurrent ? "max-h-24 opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
      )}>
        {isCurrent ? (
          <button className="w-full py-3 bg-brandpurple hover:bg-[#a116d4] text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2">
            <IconCode size={18} />
            Start This Milestone
          </button>
        ) : (
          <button className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-all uppercase tracking-wider">
            {isCompleted ? "Review Material" : "View Syllabus"}
          </button>
        )}
      </div>
    </div>
  );
}
