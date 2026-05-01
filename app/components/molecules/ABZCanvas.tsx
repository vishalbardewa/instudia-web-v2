"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMap, IconArrowRight, IconRefresh, IconDownload, IconEdit, IconSparkles, IconLoader2, IconRocket } from '@tabler/icons-react';

export const ABZCanvas = () => {
  const [step, setStep] = useState(0);
  const [planA, setPlanA] = useState('');
  const [planB, setPlanB] = useState('');
  const [planZ, setPlanZ] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{strengths: string, weaknesses: string, actionStep: string} | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('abzCanvas');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStep(parsed.step);
        setPlanA(parsed.planA);
        setPlanB(parsed.planB);
        setPlanZ(parsed.planZ);
        if (parsed.analysis) setAnalysis(parsed.analysis);
      } catch (e) {}
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      localStorage.setItem('abzCanvas', JSON.stringify({ step, planA, planB, planZ, analysis }));
    }
  }, [step, planA, planB, planZ, analysis, isMounted]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const generateCanvas = async () => {
    setStep(4);
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      const res = await fetch('/api/analyze-abz-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planA, planB, planZ }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
        
        // Sync to DB
        let sessionId = localStorage.getItem('careerSessionId');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem('careerSessionId', sessionId);
        }
        fetch('/api/save-career-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, planA, planB, planZ, analysis: data })
        }).catch(e => console.error("Failed to sync canvas to DB", e));
        
      } else {
        setAnalysis({ strengths: "Unable to generate analysis at this time.", weaknesses: "Please try again later or ensure your plan has enough detail.", actionStep: "Try generating the canvas again." });
      }
    } catch (e) {
      console.error(e);
      setAnalysis({ strengths: "Connection timed out.", weaknesses: "The AI analysis server took too long to respond.", actionStep: "Please try generating the canvas again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const STEPS = [
    {
      title: "Plan A: The Ambitious Goal",
      description: "What is your primary, most ambitious career goal right now? What are you actively building towards?",
      placeholder: "e.g., I am learning React.js to become a remote frontend developer for a global tech company.",
      value: planA,
      setter: setPlanA,
      color: "text-brandpurple",
      bg: "bg-brandpurple/10",
      border: "border-brandpurple/20",
      ring: "ring-brandpurple/50"
    },
    {
      title: "Plan B: The Pivot",
      description: "If Plan A doesn't work out, how will you pivot using the skills you just learned?",
      placeholder: "e.g., I will use my coding knowledge and design sense to pivot into Technical Product Management.",
      value: planB,
      setter: setPlanB,
      color: "text-brightyellow",
      bg: "bg-brightyellow/10",
      border: "border-brightyellow/20",
      ring: "ring-brightyellow/50"
    },
    {
      title: "Plan Z: The Lifeboat",
      description: "What is your absolute worst-case scenario safety net that guarantees you won't end up completely stranded?",
      placeholder: "e.g., I will take my English and computer skills to work as a customer support executive while I regroup.",
      value: planZ,
      setter: setPlanZ,
      color: "text-redhue",
      bg: "bg-redhue/10",
      border: "border-redhue/20",
      ring: "ring-redhue/50"
    }
  ];

  if (!isMounted) return <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2.5rem] shadow-sm flex font-jakarta relative w-full overflow-hidden min-h-[500px] animate-pulse" />;

  return (
    <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2.5rem] shadow-sm flex flex-col font-jakarta relative w-full overflow-hidden min-h-[500px]">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brandpurple via-redhue to-brightyellow" />
      
      {/* Intro Step */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 md:p-16 flex flex-col items-center justify-center text-center flex-1 space-y-6"
          >
            <div className="w-20 h-20 bg-neutral-100 rounded-[1.5rem] flex items-center justify-center text-neutral-600 mb-2">
              <IconMap size={40} stroke={1.5} />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1B1C1E]">The A/B/Z Canvas Builder</h3>
            <p className="text-neutral-500 max-w-xl mx-auto font-medium leading-relaxed text-lg">
              Ambitious goals require strong safety nets. Let's explicitly define your Plan A, your Pivot, and your Lifeboat so you can take massive career risks with zero fear.
            </p>
            <button 
              onClick={handleNext}
              className="mt-4 px-10 py-4 bg-[#1B1C1E] text-white rounded-xl font-extrabold hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-neutral-900/10 flex items-center gap-2"
            >
              Start Building <IconArrowRight size={20} stroke={2.5} />
            </button>
          </motion.div>
        )}

        {/* Form Steps */}
        {step > 0 && step <= 3 && (
          <motion.div 
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 md:p-12 flex flex-col flex-1"
          >
            <div className="flex items-center gap-2 mb-10">
              {[1, 2, 3].map((num) => (
                <div key={num} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${num <= step ? STEPS[num-1].bg.replace('/10', '') : 'bg-neutral-100'}`} />
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className={`text-2xl md:text-3xl font-extrabold text-[#1B1C1E] mb-3`}>
                {STEPS[step - 1].title}
              </h3>
              <p className="text-neutral-600 font-medium text-lg leading-relaxed">
                {STEPS[step - 1].description}
              </p>
            </div>

            <div className="flex-1 flex flex-col">
              <textarea
                value={STEPS[step - 1].value}
                onChange={(e) => STEPS[step - 1].setter(e.target.value)}
                placeholder={STEPS[step - 1].placeholder}
                className={`w-full flex-1 min-h-[150px] p-6 rounded-2xl border ${STEPS[step - 1].border} bg-neutral-50 text-[#1B1C1E] font-medium text-lg focus:outline-none focus:ring-2 ${STEPS[step - 1].ring} transition-all resize-none placeholder:text-neutral-400`}
              />
              
              <div className="flex justify-between items-center mt-8">
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-neutral-500 hover:text-[#1B1C1E] font-bold px-6 py-3 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={step === 3 ? generateCanvas : handleNext}
                  disabled={!STEPS[step - 1].value.trim()}
                  className="px-8 py-3.5 bg-[#1B1C1E] text-white rounded-xl font-bold hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
                >
                  {step === 3 ? 'Generate Canvas' : 'Next'} <IconArrowRight size={18} stroke={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Final Canvas Step */}
        {step === 4 && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 flex flex-col items-center flex-1 w-full"
          >
            <div className="w-full max-w-4xl bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm print:shadow-none print:border-none print:p-0 relative overflow-hidden" id="abz-canvas-print">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <IconMap size={200} />
              </div>
              <div className="relative z-10">
                <div className="mb-10 border-b border-neutral-100 pb-6 print:pb-4">
                  <h2 className="text-3xl font-black text-[#1B1C1E] uppercase tracking-tight">My A/B/Z Career Canvas</h2>
                  <p className="text-neutral-500 font-medium mt-1">Generated via Instudia Career Guide</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div className="p-6 bg-brandpurple/5 rounded-2xl border border-brandpurple/10">
                      <h3 className="text-brandpurple font-black text-sm uppercase tracking-widest mb-2">Plan A: The Ambitious Goal</h3>
                      <p className="text-[#1B1C1E] font-semibold text-[15px] leading-relaxed whitespace-pre-wrap">{planA}</p>
                    </div>
                    
                    <div className="p-6 bg-brightyellow/10 rounded-2xl border border-brightyellow/20">
                      <h3 className="text-yellow-600 font-black text-sm uppercase tracking-widest mb-2">Plan B: The Pivot</h3>
                      <p className="text-[#1B1C1E] font-semibold text-[15px] leading-relaxed whitespace-pre-wrap">{planB}</p>
                    </div>
                    
                    <div className="p-6 bg-redhue/5 rounded-2xl border border-redhue/10">
                      <h3 className="text-redhue font-black text-sm uppercase tracking-widest mb-2">Plan Z: The Lifeboat</h3>
                      <p className="text-[#1B1C1E] font-semibold text-[15px] leading-relaxed whitespace-pre-wrap">{planZ}</p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-100 h-full print:hidden">
                    <div className="flex items-center gap-2 text-brandpurple font-black uppercase tracking-widest text-xs mb-6">
                      <IconSparkles size={16} /> AI Plan Analysis
                    </div>
                    
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center h-48 space-y-4">
                        <IconLoader2 className="animate-spin text-brandpurple" size={36} stroke={1.5} />
                        <p className="text-neutral-500 font-medium text-sm animate-pulse">Evaluating your safety nets...</p>
                      </div>
                    ) : analysis ? (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                          <div>
                            <h4 className="font-bold text-[#1B1C1E] text-sm mb-1.5">Strengths</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">{analysis.strengths}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1B1C1E] text-sm mb-1.5">Potential Blind Spots</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">{analysis.weaknesses}</p>
                          </div>
                          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm mt-4">
                            <h4 className="font-bold text-brandpurple text-sm mb-2 flex items-center gap-1.5">
                              <IconArrowRight size={16} /> Your 48-Hour Action Step
                            </h4>
                            <p className="text-[#1B1C1E] font-semibold text-[13px] leading-relaxed">{analysis.actionStep}</p>
                          </div>
                       </motion.div>
                    ) : (
                       <div className="flex flex-col items-center justify-center h-48 text-center">
                         <p className="text-neutral-400 font-medium text-sm">Analysis unavailable.</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 print:hidden w-full">
              <a 
                href={`/tools/career-planner?role=${encodeURIComponent(planA)}`}
                className="px-8 py-3.5 bg-gradient-to-r from-brandpurple to-purple-500 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2 shadow-brandpurple/20 active:scale-95"
              >
                <IconRocket size={18} stroke={2.5} /> Map Roadmap for Plan A
              </a>
              <button 
                onClick={handlePrint}
                className="px-6 py-3.5 bg-[#1B1C1E] text-white rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-md flex items-center gap-2"
              >
                <IconDownload size={18} stroke={2.5} /> Save / Print
              </button>
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-3.5 bg-neutral-100 text-neutral-600 rounded-xl font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <IconEdit size={18} stroke={2.5} /> Edit Plans
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
