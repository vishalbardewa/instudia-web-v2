"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressBadge } from '../atom/ProgressBadge';
import { MentorCard } from '../molecules/MentorCard';
import { SkillGapChart } from '../molecules/SkillRadarChart';
import { MilestoneTimeline, Milestone } from '../molecules/MilestoneTimeline';
import { IconTargetArrow, IconLoader2 } from '@tabler/icons-react';

const MOCK_SKILLS = [
  { name: 'React.js', current: 75, required: 90 },
  { name: 'TypeScript', current: 50, required: 85 },
  { name: 'System Design', current: 30, required: 70 },
  { name: 'Node.js', current: 65, required: 80 },
];

const MOCK_MENTORS = [
  { name: 'Sarah Drasner', role: 'Senior UX Engineer', company: 'Vercel', imageUrl: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Guillermo Rauch', role: 'CEO / Engineer', company: 'Vercel', imageUrl: 'https://i.pravatar.cc/150?u=rauchg' },
];

const DashboardContent = () => {
  const searchParams = useSearchParams();
  const requestedRole = searchParams?.get('role');
  const requestedSkills = searchParams?.get('skills') || '';
  const wasRequested = !!requestedRole;

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(wasRequested);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const readinessScore = skillGaps.length > 0 ? Math.round(skillGaps.reduce((acc, skill) => {
    const score = Math.min(100, ((Number(skill.current) || 0) / (Number(skill.required) || 1)) * 100);
    return acc + score;
  }, 0) / skillGaps.length) : 0;

  useEffect(() => {
    if (!wasRequested) return;

    const fetchRoadmap = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // Extended limits for multi-stage roadmap payload generation
      setErrorMsg(null);
      try {
        const res = await fetch('/api/generate-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetRole: requestedRole, currentSkills: requestedSkills }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        // Handle object wrapper schema
        if (data.milestones && Array.isArray(data.milestones)) {
          setMilestones(data.milestones);
          if (data.skillGaps && Array.isArray(data.skillGaps)) {
            setSkillGaps(data.skillGaps);
          }
        }
        // Strict array fallback just in case the LLM ignored instructions
        else if (Array.isArray(data) && data.length > 0) {
          setMilestones(data);
        } else {
          throw new Error("Invalid AI schema returned.");
        }
      } catch (err: any) {
        console.error("Frontend generation error:", err);
        if (err.name === 'AbortError') {
          setErrorMsg("Roadmap generation process timed out. Try again.");
        } else {
          setErrorMsg(err.message || "Failed to generate roadmap.");
        }
        setMilestones([]); // Remote error, clearing defaults
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, [requestedRole, requestedSkills, wasRequested]);

  if (!wasRequested) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-8 font-jakarta text-center space-y-6">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-2">
          <IconTargetArrow size={48} className="text-neutral-300" stroke={1.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B1C1E] tracking-tight">No Action Plan Found</h1>
        <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
          You haven't selected a target career role yet. Complete your Career Blueprint first so our AI engine can dynamically generate a custom learning roadmap for you.
        </p>
        <a href="/tools/career-blueprint" className="px-8 py-4 mt-8 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 inline-flex items-center gap-2">
          Create Your Blueprint
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-jakarta">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white border border-neutral-200 rounded-[2rem] p-8 md:p-12 shadow-sm overflow-hidden relative">
        <div className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
          <div className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-brightyellow to-brandpurple opacity-10" />
        </div>

        <div className="flex-1 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brandpurple/30 bg-brandpurple/10 text-brandpurple text-sm font-bold tracking-wide">
            <IconTargetArrow size={18} />
            Target Role: {requestedRole}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight leading-[1.15]">
            Your bridge from <span className="text-neutral-400 line-through decoration-brandpurple/30">undecided</span> <br className="hidden md:block" />to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brandpurple to-redhue">industry ready.</span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
            Follow this customized action plan derived from real-time industry data and our intelligent skill-gap analysis engine.
          </p>
        </div>

        <div className="mt-10 md:mt-0 md:ml-12 w-full max-w-xs md:w-80 shrink-0 z-10">
          <ProgressBadge percentage={isLoading ? 0 : readinessScore} label="Readiness Score" />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* The Action Plan (Roadmap tree) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] p-6 sm:p-10 shadow-sm relative overflow-hidden min-h-[400px]">

            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center pt-32 sm:pt-40 z-20 bg-white/80 backdrop-blur-md rounded-[2rem]">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="mb-6">
                  <IconLoader2 size={64} className="text-brandpurple" stroke={1.5} />
                </motion.div>
                <div className="text-xl font-extrabold text-[#1B1C1E] flex items-center justify-center">
                  Structuring optimal learning path
                  <span className="inline-flex ml-0.5 w-4 text-left">
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
                  </span>
                </div>
                <p className="text-[17px] font-medium text-neutral-500 max-w-md text-center mt-3 leading-relaxed">
                  Our AI is currently cross-referencing your active skills ({requestedSkills}) against {requestedRole} hiring requirements.
                </p>
                <div className="h-1.5 bg-gradient-to-r from-brightyellow to-brandpurple rounded-full max-w-xs w-full mt-6 shadow-inner animate-pulse" />
              </div>
            )}

            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B1C1E] tracking-tight">Your Custom Action Plan</h2>
              <p className="text-neutral-500 mt-2 text-base font-medium">This roadmap was dynamically generated by AI based exactly on your profile.</p>
            </div>

            {!isLoading && errorMsg && (
              <div className="w-full p-8 border-2 border-dashed border-red-200 bg-red-50/50 rounded-2xl text-center">
                <IconTargetArrow className="mx-auto text-red-300 mb-3" size={32} />
                <h3 className="text-xl font-bold text-red-900 mb-2">Generation Failed</h3>
                <p className="text-sm font-medium text-red-600/80 mb-6">{errorMsg}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl transition-all">
                  Retry Generation
                </button>
              </div>
            )}

            {!isLoading && !errorMsg && milestones.length === 0 && (
              <div className="w-full p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-neutral-500 font-bold">No milestones could be generated. Please try adjusting your profile.</p>
              </div>
            )}

            {!isLoading && !errorMsg && milestones.length > 0 && <MilestoneTimeline milestones={milestones} />}
          </div>
        </div>

        {skillGaps.length > 0 && <div className="space-y-8">
          <div className="bg-white ring-1 ring-neutral-950/5 rounded-3xl shadow-sm overflow-hidden">
            <SkillGapChart skills={skillGaps} />
          </div>

          {/* <div className="bg-white ring-1 ring-neutral-950/5 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#1B1C1E] tracking-tight mb-2">Connect with Mentors</h3>
            <p className="text-sm text-neutral-500 mb-6">Alumni who followed a similar path.</p>
            <div className="space-y-3 relative z-10">
              {MOCK_MENTORS.map((mentor, i) => (
                <MentorCard key={i} {...mentor} />
              ))}
            </div>
            <button className="w-full mt-6 py-3 px-4 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-colors duration-200">
              View All Matches
            </button>
          </div> */}
        </div>}

      </section>

    </div>
  );
};

export const CareerPlannerDashboard = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><IconLoader2 className="animate-spin text-brandpurple" size={64} stroke={1.5} /></div>}>
      <DashboardContent />
    </Suspense>
  )
};
