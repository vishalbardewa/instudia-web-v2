"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconTargetArrow, 
  IconBook, 
  IconArrowRight, 
  IconBriefcase, 
  IconGlobe, 
  IconMap, 
  IconRocket,
  IconX,
  IconSparkles
} from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import { CareerCapitalQuiz } from '../molecules/CareerCapitalQuiz';
import { ProblemMatcher } from '../molecules/ProblemMatcher';
import { ABZCanvas } from '../molecules/ABZCanvas';
import { CAREER_GUIDE_CONTENT } from '../../data/careerGuideContent';

const MODULES = [
  {
    id: 1,
    title: "Rethinking Success: Beyond the Government Job",
    question: "Why is the traditional path no longer the only (or best) way to succeed in Nagaland?",
    summary: "Move beyond the NPSC. Discover how to evaluate careers based on impact, growth, and personal fit rather than societal prestige.",
    icon: IconTargetArrow,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Find Your Problem: Where Does Nagaland Need You?",
    question: "What are the most pressing, neglected problems in our region that you can help solve?",
    summary: "Explore local problem profiles and learn how to identify issues where you can have an outsized positive impact.",
    icon: IconBook,
    color: "from-emerald-500 to-green-400",
  },
  {
    id: 3,
    title: "Skill Up: Building Your Professional Toolkit",
    question: "How do you build skills and connections that make you highly adaptable and employable anywhere?",
    summary: "Acquire flexible skills (coding, writing, project management) that open doors to remote global work.",
    icon: IconBriefcase,
    color: "from-brandpurple to-purple-400",
  },
  {
    id: 4,
    title: "Borderless Careers: Working from the Hills",
    question: "How can you participate in the global economy without leaving Nagaland?",
    summary: "A practical guide to remote employment, freelancing, and succeeding in the creator economy.",
    icon: IconGlobe,
    color: "from-orange-500 to-yellow-400",
  },
  {
    id: 5,
    title: "Planning for Reality: The A/B/Z Framework",
    question: "How do you plan for ambitious goals while protecting yourself from failure?",
    summary: "Map out an ideal scenario (Plan A), a pivot (Plan B), and a secure safety net (Plan Z).",
    icon: IconMap,
    color: "from-redhue to-red-400",
  },
  {
    id: 6,
    title: "Action Time: Testing Your Hypotheses",
    question: "What low-risk experiments can you run right now to test your career ideas?",
    summary: "Use internships, volunteering, and side projects to validate career paths before committing years of study.",
    icon: IconRocket,
    color: "from-brightyellow to-yellow-400",
  }
];

export const CareerGuideDashboard = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedLessonId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedLessonId]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-jakarta">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-white border border-neutral-200 rounded-[2rem] p-8 md:p-16 shadow-sm overflow-hidden relative">
        <div className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
          <div className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-brightyellow to-brandpurple opacity-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brandpurple/30 bg-brandpurple/5 text-brandpurple text-sm font-bold tracking-wide mb-8 z-10">
          <IconSparkles size={16} />
          The Ultimate Nagaland Career Guide
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight leading-[1.15] z-10 max-w-4xl">
          Build a Career That <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brandpurple to-redhue">
            Actually Matters.
          </span>
        </h1>
        
        <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed z-10">
          Move beyond the NPSC. Discover how to build adaptable career capital, solve pressing local problems, and thrive in the global digital economy right from the hills.
        </p>
        
        <button 
          onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 px-8 py-4 bg-[#1B1C1E] text-white rounded-xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-lg active:scale-95 flex items-center gap-3 z-10"
        >
          Start the Journey <IconArrowRight stroke={2.5} size={20} />
        </button>
      </section>

      {/* Curriculum Grid */}
      <section id="curriculum" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Timeline Tracker */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-32">
          <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brandpurple to-redhue" />
             <h3 className="text-2xl font-extrabold text-[#1B1C1E] tracking-tight">Your Roadmap</h3>
             <p className="text-neutral-500 font-medium text-sm mt-2 mb-8">6 interconnected modules.</p>
             
             <div className="flex flex-col space-y-6 relative pl-2">
               <div className="absolute left-[1.3rem] top-4 bottom-4 w-[2px] bg-neutral-100 z-0 rounded-full" />
               
               {MODULES.map((mod, idx) => {
                  const isActive = expandedModule === mod.id;
                  const isPassed = expandedModule !== null && mod.id < expandedModule;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setExpandedModule(mod.id)}
                      className={`relative z-10 flex items-center gap-6 text-left transition-all duration-300 group ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 z-10 ${isActive ? 'bg-gradient-to-br ' + mod.color + ' ring-4 ring-brandpurple/10' : isPassed ? 'bg-neutral-200' : 'bg-white border-2 border-neutral-200 group-hover:border-neutral-300'}`}>
                         {isActive && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                      </div>
                      <span className={`font-bold text-[15px] ${isActive ? 'text-[#1B1C1E]' : 'text-neutral-500'}`}>
                        {mod.title}
                      </span>
                    </button>
                  )
               })}
             </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="lg:col-span-2 space-y-6">
          {MODULES.map((mod) => {
            const isExpanded = expandedModule === mod.id;
            const Icon = mod.icon;

            return (
              <div 
                key={mod.id}
                className={`bg-white ring-1 rounded-[2rem] overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-brandpurple/30 shadow-md' : 'ring-neutral-950/5 shadow-sm hover:shadow-md'}`}
              >
                <button 
                  className="w-full p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left relative z-10 bg-transparent"
                  onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${mod.color} shadow-sm transition-transform duration-300 ${isExpanded ? 'scale-105' : 'group-hover:scale-105'}`}>
                    <Icon className="text-white w-7 h-7" stroke={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-neutral-400 text-[11px] uppercase tracking-widest font-black">Module {mod.id}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B1C1E] tracking-tight leading-snug">{mod.title}</h2>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-8 sm:px-8 sm:pb-8 relative z-10"
                    >
                      <div className="pl-0 sm:pl-[5rem] space-y-6">
                        <div className="p-5 bg-neutral-50/80 rounded-xl border border-neutral-100 relative overflow-hidden">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${mod.color}`} />
                          <p className="text-[#1B1C1E] font-bold italic text-md leading-relaxed">"{mod.question}"</p>
                        </div>
                        <p className="text-neutral-600 leading-relaxed font-medium text-[15px]">
                          {mod.summary}
                        </p>
                        <div className="pt-4">
                          <button 
                            onClick={() => setSelectedLessonId(mod.id)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1C1E] text-white rounded-xl font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
                          >
                            Read Full Lesson
                            <IconArrowRight size={18} stroke={2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="space-y-8 pt-8">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-extrabold text-[#1B1C1E] tracking-tight mb-2">Put It Into Practice</h2>
           <p className="text-neutral-500 font-medium max-w-2xl mx-auto">Test your assumptions and generate a personalized roadmap using our AI-driven diagnostic tools.</p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="h-full flex">
            <CareerCapitalQuiz />
          </div>
          <div className="h-full flex">
            <ProblemMatcher />
          </div>
        </div>

        <div className="pt-8 w-full">
          <ABZCanvas />
        </div>
      </section>

      {/* FULL LESSON MODAL */}
      <AnimatePresence>
        {selectedLessonId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-neutral-900/40 backdrop-blur-sm"
            onClick={() => setSelectedLessonId(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-[90vh] md:h-[85vh] bg-white rounded-[2rem] ring-1 ring-neutral-950/5 shadow-2xl flex flex-col overflow-hidden relative"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50 z-10 shrink-0">
                <div className="pr-12">
                  <div className="text-brandpurple font-black text-xs uppercase tracking-widest mb-1">Module {selectedLessonId}</div>
                  <h2 className="text-xl md:text-2xl font-black text-[#1B1C1E] leading-tight">{MODULES.find(m => m.id === selectedLessonId)?.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedLessonId(null)}
                  className="p-2.5 bg-white rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-[#1B1C1E] transition-all"
                >
                  <IconX size={20} stroke={2} />
                </button>
              </div>
              
              <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 relative bg-white">
                <div className="max-w-3xl mx-auto text-base sm:text-[17px] text-neutral-600 leading-relaxed font-medium 
                  [&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-[#1B1C1E] [&>h2]:mt-10 [&>h2]:mb-4 
                  [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1B1C1E] [&>h3]:mt-8 [&>h3]:mb-3 
                  [&>ul]:list-none [&>ul]:pl-0 [&>ul]:space-y-3 [&>ul>li]:relative [&>ul>li]:pl-6 
                  [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.6rem] [&>ul>li::before]:w-1.5 [&>ul>li::before]:h-1.5 [&>ul>li::before]:bg-brandpurple [&>ul>li::before]:rounded-full 
                  [&>ul>li>strong]:text-[#1B1C1E] [&>ul>li>strong]:font-extrabold [&>p]:mb-6
                  [&>p>strong]:text-[#1B1C1E] [&>p>em]:text-neutral-500
                ">
                  <ReactMarkdown>{CAREER_GUIDE_CONTENT[selectedLessonId]}</ReactMarkdown>
                </div>
              </div>
              
              <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 flex justify-between items-center shrink-0">
                 <button 
                   onClick={() => setSelectedLessonId(null)}
                   className="text-neutral-500 hover:text-[#1B1C1E] font-bold text-sm transition-colors"
                 >
                   Close
                 </button>
                 {selectedLessonId < MODULES.length && (
                   <button 
                     onClick={() => {
                        setSelectedLessonId(selectedLessonId + 1);
                        setExpandedModule(selectedLessonId + 1);
                     }}
                     className="px-5 py-2.5 bg-[#1B1C1E] text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm shadow-md"
                   >
                     Next Module <IconArrowRight size={16} />
                   </button>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
