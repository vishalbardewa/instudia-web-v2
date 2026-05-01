"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconPuzzle, IconArrowRight, IconRefresh, IconTrophy } from '@tabler/icons-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What type of work environment naturally energizes you?",
    options: [
      { text: "Behind a screen, deep in focus building digital systems.", scores: { tech: 3, edu: 1 } },
      { text: "Out in the field, working hands-on with nature and logistics.", scores: { agri: 3, health: 1 } },
      { text: "Working directly with people, organizing and mentoring.", scores: { edu: 3, health: 2 } },
      { text: "Analyzing history, creating stories, and designing art.", scores: { culture: 3 } },
    ]
  },
  {
    id: 2,
    question: "Which of these local issues frustrates you the most?",
    options: [
      { text: "Slow internet, poor software, and endless paper bureaucracy.", scores: { tech: 3 } },
      { text: "Wasted agricultural potential and our reliance on imports.", scores: { agri: 3 } },
      { text: "The gradual loss of our native languages and traditional arts.", scores: { culture: 3 } },
      { text: "Outdated teaching methods and massive youth unemployment.", scores: { edu: 3 } },
      { text: "Lack of access to basic medical care and mental health stigma.", scores: { health: 3 } },
    ]
  },
  {
    id: 3,
    question: "How do you prefer to tackle a challenge?",
    options: [
      { text: "By building a scalable digital platform or app.", scores: { tech: 3, health: 1 } },
      { text: "By starting a business or optimizing a supply chain.", scores: { agri: 3, tech: 1 } },
      { text: "By creating media, films, or writing compelling narratives.", scores: { culture: 3, edu: 1 } },
      { text: "By directly teaching, counseling, or speaking to others.", scores: { edu: 3, health: 2 } },
    ]
  }
];

const PROFILES = {
  tech: {
    title: "Digital Infrastructure & Tech Literacy",
    description: "You are matched with solving the digital divide. Nagaland desperately needs localized software, better IT infrastructure, and digital literacy to enter the global economy.",
    careers: "Software Engineer, UX/UI Designer, IT Consultant",
    color: "bg-[#1B1C1E]",
    icon: "💻"
  },
  agri: {
    title: "Sustainable Agriculture & Eco-Entrepreneurship",
    description: "You are matched with our agricultural potential. We need innovators to move beyond subsistence farming and build sustainable, profitable export supply chains.",
    careers: "Agri-tech Founder, Supply Chain Manager, Eco-Tourism Operator",
    color: "bg-brandpurple",
    icon: "🌱"
  },
  culture: {
    title: "Preservation of Indigenous Knowledge",
    description: "You are matched with cultural preservation. Our heritage is fading, and we need creative minds to document, modernize, and ethically monetize our traditions for a global audience.",
    careers: "Digital Archivist, Documentary Filmmaker, Cultural Entrepreneur",
    color: "bg-[#1B1C1E]",
    icon: "🏺"
  },
  edu: {
    title: "Accessible Education & Skill Development",
    description: "You are matched with solving youth unemployment. The current education system is failing to teach modern skills, and we need builders to create accessible, relevant learning platforms.",
    careers: "Ed-tech Founder, Curriculum Developer, Career Counselor",
    color: "bg-brandpurple",
    icon: "📚"
  },
  health: {
    title: "Healthcare Logistics & Mental Health",
    description: "You are matched with the healthcare gap. Remote districts lack medical access, and our youth need culturally nuanced mental health support systems.",
    careers: "Telemedicine Founder, Health Logistics Manager, Clinical Psychologist",
    color: "bg-redhue",
    icon: "🏥"
  }
};

export const ProblemMatcher = () => {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ tech: 0, agri: 0, culture: 0, edu: 0, health: 0 });
  const [completed, setCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('problemMatcher');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStarted(parsed.started);
        setCurrentIdx(parsed.currentIdx);
        setScores(parsed.scores);
        setCompleted(parsed.completed);
      } catch (e) {}
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      localStorage.setItem('problemMatcher', JSON.stringify({ started, currentIdx, scores, completed }));
    }
  }, [started, currentIdx, scores, completed, isMounted]);

  React.useEffect(() => {
    if (completed && isMounted) {
      let sessionId = localStorage.getItem('careerSessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('careerSessionId', sessionId);
      }
      // Determine match object
      const winningKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b) as keyof typeof PROFILES;
      fetch('/api/save-career-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, problemMatch: PROFILES[winningKey].title })
      }).catch(e => console.error(e));
    }
  }, [completed, scores, isMounted]);

  const handleAnswer = (optionScores: Record<string, number | undefined>) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(key => {
      const score = optionScores[key];
      if (score !== undefined) {
        newScores[key as keyof typeof scores] += score;
      }
    });
    setScores(newScores);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetMatcher = () => {
    setStarted(false);
    setCompleted(false);
    setCurrentIdx(0);
    setScores({ tech: 0, agri: 0, culture: 0, edu: 0, health: 0 });
  };

  // Find the highest scoring profile
  const winningProfileKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b) as keyof typeof PROFILES;
  const match = PROFILES[winningProfileKey];

  if (!isMounted) return <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] shadow-sm flex font-jakarta relative h-[400px] w-full animate-pulse" />;

  return (
    <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] shadow-sm flex flex-col font-jakarta relative h-full w-full overflow-hidden min-h-[400px]">
      <div className="absolute top-0 left-0 w-full h-[6px] bg-redhue" />
      
      {!started && !completed && (
        <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center flex-1 space-y-6">
          <div className="w-16 h-16 bg-redhue/10 rounded-2xl flex items-center justify-center text-redhue mb-2">
            <IconPuzzle size={32} />
          </div>
          <h3 className="text-2xl font-extrabold text-[#1B1C1E]">The Problem Matcher</h3>
          <p className="text-neutral-500 max-w-sm mx-auto font-medium leading-relaxed">
            Stop looking for your passion. Tell us how you work, and we'll match you with a pressing, neglected problem in Nagaland that desperately needs your help.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="px-8 py-3.5 bg-[#1B1C1E] text-white rounded-xl font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
          >
            Find My Problem
          </button>
        </div>
      )}

      {started && !completed && (
        <div className="p-8 md:p-10 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-8">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= currentIdx ? 'bg-redhue' : 'bg-neutral-100'}`} />
            ))}
          </div>
          
          <div className="mb-8">
            <div className="text-redhue font-black text-xs uppercase tracking-widest mb-3">
              Question {currentIdx + 1} of {QUESTIONS.length}
            </div>
            <h3 className="text-xl font-extrabold text-[#1B1C1E] leading-snug">
              {QUESTIONS[currentIdx].question}
            </h3>
          </div>

          <div className="space-y-3 mt-auto">
            {QUESTIONS[currentIdx].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.scores)}
                className="w-full text-left p-4 rounded-xl border border-neutral-200 bg-white hover:border-redhue/50 hover:bg-redhue/5 font-bold text-[#1B1C1E] transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
              >
                <span>{opt.text}</span>
                <IconArrowRight size={20} className="text-redhue opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {completed && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 md:p-10 flex flex-col items-center justify-center text-center flex-1 space-y-6"
        >
          <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl ${match.color} text-white shadow-md mb-2`}>
            {match.icon}
          </div>
          <div className="text-redhue font-black text-xs uppercase tracking-widest">Your Impact Match</div>
          <h3 className="text-2xl font-extrabold text-[#1B1C1E] leading-tight">
            {match.title}
          </h3>
          <p className="text-[15px] text-neutral-600 font-medium max-w-sm mx-auto leading-relaxed">
            {match.description}
          </p>
          
          <div className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-xl text-left mt-2">
            <h4 className="font-bold text-[#1B1C1E] text-xs uppercase tracking-wide flex items-center gap-2 mb-2">
              <IconTrophy size={16} className="text-brightyellow" /> Career Paths
            </h4>
            <p className="text-neutral-600 font-medium text-sm">{match.careers}</p>
          </div>

          <button onClick={resetMatcher} className="text-neutral-500 hover:text-[#1B1C1E] font-bold text-sm inline-flex items-center gap-1 transition-colors mt-2">
            <IconRefresh size={16} /> Try Different Answers
          </button>
        </motion.div>
      )}
    </div>
  );
};
