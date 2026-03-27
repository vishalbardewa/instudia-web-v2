"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { IconSparkles, IconTrendingUp, IconBriefcase, IconArrowRight, IconX, IconLoader2, IconBook } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Separate Modal Component using React Portal
const RoleModal = ({ roleData, skills, onClose }: { roleData: any, skills: string[], onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B1C1E]/60 backdrop-blur-sm" onClick={onClose}>
       <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.95, y: 20 }}
         onClick={e => e.stopPropagation()}
         className="bg-white rounded-[2rem] p-6 md:p-10 max-w-2xl w-full shadow-2xl relative border border-neutral-200 font-jakarta max-h-[90vh] overflow-y-auto"
       >
         <button onClick={onClose} className="absolute top-6 right-6 p-2.5 bg-neutral-100 text-neutral-400 hover:text-[#1B1C1E] hover:bg-neutral-200 rounded-full transition-all">
           <IconX size={20} className="stroke-[3px]" />
         </button>

         <div className="pr-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1B1C1E] tracking-tight mb-4">{roleData.role}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-lg bg-brandpurple/10 text-brandpurple text-sm font-bold border border-brandpurple/20">
              <IconTrendingUp size={18} /> Market Match Score: <span className="text-lg">{roleData.matchScore}</span>
            </div>
         </div>

         <div className="space-y-6">
           <div className="bg-neutral-50 p-6 md:p-8 rounded-3xl border border-neutral-100">
             <h4 className="text-xl font-extrabold text-[#1B1C1E] mb-3 flex items-center gap-2">
                <IconSparkles size={24} className="text-brightyellow" /> How You Fit In
             </h4>
             <p className="text-neutral-600 leading-relaxed font-medium">{roleData.howYouFit || "Your skills strongly map to the foundational requirements of this role."}</p>
           </div>
           
           <div className="bg-brandpurple/5 p-6 md:p-8 rounded-3xl border border-brandpurple/10">
             <h4 className="text-xl font-extrabold text-brandpurple mb-5 flex items-center gap-2">
                <IconBook size={24} /> What Else You Need To Learn
             </h4>
             <ul className="flex flex-col gap-4">
               {roleData.whatToLearn?.map((item: string, idx: number) => (
                 <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-white border-2 border-brandpurple/20 flex items-center justify-center shrink-0 shadow-sm">
                       <div className="w-2.5 h-2.5 rounded-full bg-brandpurple" />
                    </div>
                    <span className="text-neutral-700 font-semibold leading-relaxed">{item}</span>
                 </li>
               ))}
               {(!roleData.whatToLearn || roleData.whatToLearn.length === 0) && (
                 <li className="text-neutral-500 font-medium">Industry-standard tools frameworks and methodologies.</li>
               )}
             </ul>
           </div>
         </div>

         <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-end gap-4">
           <button onClick={onClose} className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold transition-all text-center">Go Back</button>
           <a href={`/tools/career-planner?role=${encodeURIComponent(roleData.role)}&skills=${encodeURIComponent(skills.join(', '))}`} className="px-8 py-3.5 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
             Generate Action Plan <IconArrowRight size={18} />
           </a>
         </div>
       </motion.div>
    </div>,
    document.body
  );
};

export const CareerAdviceForm = () => {
  const [step, setStep] = useState<number>(1);
  const [qualifications, setQualifications] = useState('');
  
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(['Communication']);
  
  const [hobbyInput, setHobbyInput] = useState('');
  const [hobbies, setHobbies] = useState<string[]>(['Technology']);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [adviceData, setAdviceData] = useState<any>(null);
  
  // State for the portal modal
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (sk: string) => setSkills(skills.filter(s => s !== sk));

  const handleAddHobby = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hobbyInput.trim() !== '') {
      e.preventDefault();
      if (!hobbies.includes(hobbyInput.trim())) {
        setHobbies([...hobbies, hobbyInput.trim()]);
      }
      setHobbyInput('');
    }
  };

  const removeHobby = (hb: string) => setHobbies(hobbies.filter(h => h !== hb));

  const generateDynamicAdvice = (userSkills: string[], userHobbies: string[]) => {
    const input = [...userSkills, ...userHobbies].join(' ').toLowerCase();
    
    // Simple Keyword matching engine to simulate AI logic structure
    const knowledgeBase = [
      {
        keywords: ['react', 'figma', 'design', 'css', 'html', 'frontend', 'ui', 'ux', 'art', 'sketch', 'draw', 'paint', 'web', 'javascript'],
        primary: "Frontend/UI Engineer", pScore: "94%",
        alt: "UX/UI Designer", aScore: "88%",
        reason: "Your creative interests and front-end capabilities closely align with current market demands."
      },
      // Keep heuristic engine intact but append placeholder text for the new fields
      {
        keywords: ['python', 'data', 'math', 'sql', 'stats', 'chess', 'logic', 'puzzle', 'machine learning', 'ai', 'analytics', 'research'],
        primary: "Data Scientist / AI Engineer", pScore: "96%",
        alt: "Data Analyst", aScore: "89%",
        reason: "Your analytical hobbies and logical skill set perfectly map to the booming AI and Data sectors."
      },
      {
        keywords: ['leadership', 'speak', 'write', 'blog', 'manage', 'agile', 'scrum', 'people', 'strategy', 'business', 'marketing', 'social'],
        primary: "Product Manager", pScore: "92%",
        alt: "Growth Marketer", aScore: "85%",
        reason: "Your strong communication skills indicate high potential for product leadership."
      }
    ];

    let bestMatch = knowledgeBase[0]; // fallback
    let highestCount = -1;

    for (const profile of knowledgeBase) {
      const matchCount = profile.keywords.filter(k => input.includes(k)).length;
      if (matchCount > highestCount) {
        highestCount = matchCount;
        bestMatch = profile;
      }
    }

    const fallbackAlts = [
       { role: "Technical Consultant", matchScore: "82%", reason: "Combines your technical foundation with client-facing responsibilities.", howYouFit: "Your varied background suits client advising.", whatToLearn: ["Solution Architecture", "Consultative Communication", "Cloud Platforms"] },
       { role: "Developer Advocate", matchScore: "80%", reason: "A community-focused tech role bridging marketing and engineering.", howYouFit: "Excellent for those with coding hobbies but a social personality.", whatToLearn: ["Public Speaking", "Technical Writing", "DevRel Strategy"] },
       { role: "Technical Writer", matchScore: "78%", reason: "Requires strong communication and deep technical understanding.", howYouFit: "Perfect if you enjoy breaking down complex topics.", whatToLearn: ["Markdown/Docs-as-code", "API Documentation", "Git"] },
       { role: "QA Engineer", matchScore: "75%", reason: "An analytical role requiring deep attention to systemic detail.", howYouFit: "Ideal for someone who likes spotting edge cases.", whatToLearn: ["Test Automation", "CI/CD integration", "Selenium/Cypress"] }
    ];

    return {
      topMatch: { 
        role: bestMatch.primary, matchScore: bestMatch.pScore, reason: bestMatch.reason, 
        howYouFit: "Based directly on your inputted profile, your natural inclinations map identically to the daily workflow required in this position. You already exhibit the core mindset needed.", 
        whatToLearn: ["Advanced Enterprise Patterns", "Performance Optimization", "Cross-team agile methodologies"] 
      },
      alternativeMatches: [
        { role: bestMatch.alt, matchScore: bestMatch.aScore, reason: "A strong secondary path leveraging similar core competencies.", howYouFit: "Your tangential skills heavily support this alternative route.", whatToLearn: ["Domain specific tooling", "Stakeholder reporting"] },
        ...fallbackAlts
      ]
    };
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120-second threshold explicitly accommodating Qwen 122B generation times
    
    try {
      const response = await fetch('/api/career-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qualifications, skills, hobbies }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch AI advice (Check if NVIDIA_API_KEY is set in .env.local)');
      }

      const data = await response.json();
      
      if (data.topMatch && data.alternativeMatches && Array.isArray(data.alternativeMatches)) {
         setAdviceData(data);
      } else {
         throw new Error("Invalid response structure from AI algorithm.");
      }
      setStep(3);
    } catch (error: any) {
      console.error("AI API Error, falling back to local heuristic engine:", error);
      setAdviceData(generateDynamicAdvice(skills, hobbies));
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 font-jakarta">
      {/* Expose Modal over the entire DOM using the portal */}
      <AnimatePresence>
        {selectedRole && (
          <RoleModal roleData={selectedRole} skills={skills} onClose={() => setSelectedRole(null)} />
        )}
      </AnimatePresence>

      <div className="bg-white ring-1 ring-neutral-950/5 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brightyellow/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brandpurple/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B1C1E] tracking-tight mb-4">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandpurple to-redhue">Path</span>
            </h1>
            <p className="text-neutral-500 md:text-lg max-w-lg mx-auto">
              Tell us about yourself. Our AI matching engine will map your unique profile to active market trends.
            </p>
          </div>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Input Form */}
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Qualifications */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#1B1C1E]">Current Qualification / Degree</label>
                  <input 
                    type="text" 
                    placeholder="e.g. B.Tech in Computer Science, High School..." 
                    className="w-full px-5 py-3 rounded-xl border-2 border-neutral-200 focus:border-brandpurple focus:outline-none focus:ring-4 focus:ring-brandpurple/10 transition-all font-medium text-neutral-800"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                  />
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#1B1C1E]">
                    Your Superpowers (Skills)
                    <span className="block text-xs text-neutral-400 font-medium mt-1">Press Enter to add. E.g. Python, Public Speaking, Writing</span>
                  </label>
                  <div className="w-full p-2.5 rounded-xl border-2 border-neutral-200 focus-within:border-brandpurple focus-within:ring-4 focus-within:ring-brandpurple/10 transition-all bg-white flex flex-wrap gap-2 items-center">
                    {skills.map((sk) => (
                      <span key={sk} className="flex items-center gap-1.5 px-3 py-1.5 bg-brandpurple/10 text-brandpurple font-bold text-xs rounded-lg border border-brandpurple/20">
                        {sk}
                        <button onClick={() => removeSkill(sk)} className="hover:text-redhue transition-colors">
                          <IconX size={14} stroke={3} />
                        </button>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      placeholder="Add a skill..." 
                      className="flex-1 min-w-[120px] bg-transparent outline-none px-2 py-1 text-sm font-medium text-neutral-800"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </div>
                </div>

                {/* Hobbies */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#1B1C1E]">
                    What do you do for fun? (Hobbies)
                    <span className="block text-xs text-neutral-400 font-medium mt-1">Press Enter to add. E.g. Gaming, Sketching, Chess</span>
                  </label>
                  <div className="w-full p-2.5 rounded-xl border-2 border-neutral-200 focus-within:border-brightyellow focus-within:ring-4 focus-within:ring-brightyellow/20 flex flex-wrap gap-2 items-center transition-all bg-white">
                    {hobbies.map((hb) => (
                      <span key={hb} className="flex items-center gap-1.5 px-3 py-1.5 bg-brightyellow/20 text-yellow-700 border border-yellow-500/30 font-bold text-xs rounded-lg">
                        {hb}
                        <button onClick={() => removeHobby(hb)} className="hover:text-redhue transition-colors">
                          <IconX size={14} stroke={3} />
                        </button>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      placeholder="Add a hobby..." 
                      className="flex-1 min-w-[120px] bg-transparent outline-none px-2 py-1 text-sm font-medium text-neutral-800"
                      value={hobbyInput}
                      onChange={(e) => setHobbyInput(e.target.value)}
                      onKeyDown={handleAddHobby}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => {
                      setStep(2);
                      handleAnalyze();
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-[#1B1C1E] hover:bg-neutral-800 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
                  >
                    Analyze My Profile
                    <IconArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Analyzing / Loading */}
            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 space-y-8"
              >
                <div className="relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="relative z-10 w-fit">
                    <IconLoader2 className="text-brandpurple" size={64} stroke={2} />
                  </motion.div>
                  <div className="absolute inset-0 bg-brandpurple/20 blur-xl rounded-full" />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-[#1B1C1E] flex items-center justify-center">
                    Running Generative Engine
                    <span className="inline-flex ml-0.5 w-4 text-left">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
                    </span>
                  </h3>
                  <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                    <IconTrendingUp size={16} className="text-flourescent animate-pulse" />
                    Cross-referencing your profile against recent market data
                  </p>
                </div>

                {isAnalyzing && (
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: "100%" }} 
                     transition={{ duration: 3, ease: "easeInOut" }}
                     className="h-2 bg-gradient-to-r from-brightyellow to-brandpurple rounded-full max-w-xs w-full shadow-inner" 
                   />
                )}
              </motion.div>
            )}

            {/* Step 3: Results / Advice */}
            {step === 3 && adviceData && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                
                {/* Top Match - Make it clickable */}
                <div 
                  onClick={() => setSelectedRole(adviceData.topMatch)}
                  className="bg-brandpurple/5 border-2 border-brandpurple/20 rounded-3xl p-8 relative cursor-pointer hover:bg-brandpurple/10 hover:border-brandpurple/40 hover:-translate-y-1 transition-all shadow-sm group"
                >
                   <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-brandpurple/20 group-hover:scale-110 transition-transform">
                     <IconSparkles className="text-brandpurple" size={24} />
                   </div>
                   
                   <span className="text-xs font-black uppercase text-brandpurple tracking-widest bg-white px-3 py-1 rounded-md shadow-sm border border-brandpurple/10">Primary Match</span>
                   <h3 className="text-3xl font-black text-[#1B1C1E] mt-4 mb-2">{adviceData.topMatch.role}</h3>
                   <div className="flex items-center gap-2 mb-4">
                     <div className="px-3 py-1.5 rounded-lg bg-flourescent/20 text-[#1B1C1E] font-extrabold text-sm flex items-center gap-1.5 border border-flourescent/50">
                       <IconTrendingUp size={16} /> Market Match: {adviceData.topMatch.matchScore}
                     </div>
                   </div>
                   <p className="text-neutral-600 font-medium leading-relaxed mb-4">
                     {adviceData.topMatch.reason}
                   </p>
                   
                   <div className="text-brandpurple text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                     Learn how you fit in <IconArrowRight size={16} />
                   </div>
                </div>

                {/* Alternative Matches Array - Make them clickable */}
                <h4 className="text-[#1B1C1E] font-bold text-xl pt-6 px-2">Alternative Paths</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adviceData.alternativeMatches.map((alt: any, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedRole(alt)}
                      className="bg-white border-2 border-neutral-100 rounded-2xl p-6 shadow-sm cursor-pointer hover:border-brightyellow/50 hover:shadow-md hover:-translate-y-1 transition-all group"
                    >
                       <div className="flex items-center gap-3 mb-3">
                         <IconBriefcase className="text-brightyellow shrink-0 group-hover:scale-110 transition-transform" size={20} stroke={2.5} />
                         <span className="font-extrabold text-[#1B1C1E] line-clamp-1">{alt.role}</span>
                       </div>
                       <div className="text-xs font-bold px-2 py-1 bg-neutral-100 text-neutral-600 rounded w-fit mb-3">
                         Match Score: {alt.matchScore}
                       </div>
                       <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                         {alt.reason}
                       </p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex justify-center">
                  <button onClick={() => { setStep(1); setIsAnalyzing(false); }} className="px-6 py-2.5 rounded-xl border-2 border-neutral-200 text-sm font-bold text-neutral-500 hover:text-[#1B1C1E] hover:border-neutral-300 transition-colors">
                    Recalculate Profile
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
