"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconChartRadar, IconArrowRight, IconRefresh } from '@tabler/icons-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const QUESTIONS = [
  {
    id: 1,
    category: "Hard Skills",
    text: "How comfortable are you with a modern technical or high-leverage skill (e.g., coding, data analysis, advanced design, digital marketing)?",
    options: [
      { text: "I have no experience yet.", value: 10 },
      { text: "I know the basics, but can't build much.", value: 40 },
      { text: "I can comfortably complete small projects.", value: 70 },
      { text: "I am highly proficient and could be hired for this.", value: 100 }
    ]
  },
  {
    id: 2,
    category: "Soft Skills",
    text: "When faced with a completely new, unstructured problem, how do you react?",
    options: [
      { text: "I wait for someone to tell me what to do.", value: 10 },
      { text: "I ask for help immediately.", value: 40 },
      { text: "I try researching it first, then ask for guidance.", value: 70 },
      { text: "I break it down, research heavily, and propose a solution.", value: 100 }
    ]
  },
  {
    id: 3,
    category: "Network",
    text: "If you needed advice on a major career pivot tomorrow, who could you call?",
    options: [
      { text: "Only family and close friends.", value: 10 },
      { text: "My college professors or classmates.", value: 40 },
      { text: "1-2 professionals in the industry I want to join.", value: 70 },
      { text: "A strong network of mentors and industry veterans.", value: 100 }
    ]
  },
  {
    id: 4,
    category: "Portfolio",
    text: "What proof do you have of your abilities outside of your academic degree?",
    options: [
      { text: "Nothing yet, just my degree/grades.", value: 10 },
      { text: "Some small, unfinished class projects.", value: 40 },
      { text: "A decent GitHub, Behance, or personal blog.", value: 70 },
      { text: "A polished portfolio with real-world or high-quality projects.", value: 100 }
    ]
  }
];

export const CareerCapitalQuiz = () => {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({
    "Hard Skills": 0,
    "Soft Skills": 0,
    "Network": 0,
    "Portfolio": 0
  });
  const [completed, setCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('careerCapitalQuiz');
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
      localStorage.setItem('careerCapitalQuiz', JSON.stringify({ started, currentIdx, scores, completed }));
    }
  }, [started, currentIdx, scores, completed, isMounted]);

  React.useEffect(() => {
    if (completed && isMounted) {
      let sessionId = localStorage.getItem('careerSessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('careerSessionId', sessionId);
      }
      fetch('/api/save-career-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, quizScores: scores })
      }).catch(e => console.error(e));
    }
  }, [completed, scores, isMounted]);

  const handleAnswer = (category: string, value: number) => {
    setScores(prev => ({ ...prev, [category]: value }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setCompleted(false);
    setCurrentIdx(0);
    setScores({ "Hard Skills": 0, "Soft Skills": 0, "Network": 0, "Portfolio": 0 });
  };

  const chartData = {
    labels: ['Hard Skills', 'Soft Skills', 'Network', 'Portfolio'],
    datasets: [
      {
        label: 'Your Career Capital',
        data: [scores["Hard Skills"], scores["Soft Skills"], scores["Network"], scores["Portfolio"]],
        backgroundColor: 'rgba(124, 58, 237, 0.2)', // brandpurple with opacity
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(124, 58, 237, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124, 58, 237, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.05)' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        pointLabels: {
          font: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' as const },
          color: '#1B1C1E' // dark text
        },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  // Determine lowest score for action step
  const lowestCategory = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] < scores[b as keyof typeof scores] ? a : b);

  if (!isMounted) return <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] shadow-sm flex font-jakarta relative h-[400px] w-full animate-pulse" />;

  return (
    <div className="bg-white ring-1 ring-neutral-950/5 rounded-[2rem] shadow-sm flex flex-col font-jakarta relative h-full w-full overflow-hidden min-h-[400px]">
      <div className="absolute top-0 left-0 w-full h-[6px] bg-brandpurple" />
      
      {!started && !completed && (
        <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center flex-1 space-y-6">
          <div className="w-16 h-16 bg-brandpurple/10 rounded-2xl flex items-center justify-center text-brandpurple mb-2">
            <IconChartRadar size={32} />
          </div>
          <h3 className="text-2xl font-extrabold text-[#1B1C1E]">Career Capital Assessment</h3>
          <p className="text-neutral-500 max-w-sm mx-auto font-medium leading-relaxed">
            Take this 2-minute diagnostic to map your current transferable skills, network, and portfolio. Discover exactly what you need to build next.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="px-8 py-3.5 bg-[#1B1C1E] text-white rounded-xl font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
          >
            Start Assessment
          </button>
        </div>
      )}

      {started && !completed && (
        <div className="p-8 md:p-10 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-8">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= currentIdx ? 'bg-brandpurple' : 'bg-neutral-100'}`} />
            ))}
          </div>
          
          <div className="mb-8">
            <div className="text-brandpurple font-black text-xs uppercase tracking-widest mb-3">
              Question {currentIdx + 1} of {QUESTIONS.length}
            </div>
            <h3 className="text-xl font-extrabold text-[#1B1C1E] leading-snug">
              {QUESTIONS[currentIdx].text}
            </h3>
          </div>

          <div className="space-y-3 mt-auto">
            {QUESTIONS[currentIdx].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(QUESTIONS[currentIdx].category, opt.value)}
                className="w-full text-left p-4 rounded-xl border border-neutral-200 bg-white hover:border-brandpurple/50 hover:bg-brandpurple/5 font-bold text-[#1B1C1E] transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
              >
                <span>{opt.text}</span>
                <IconArrowRight size={20} className="text-brandpurple opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {completed && (
        <div className="p-8 md:p-10 flex flex-col items-center flex-1">
          <div className="w-full h-56 relative flex items-center justify-center mb-6">
            <Radar data={chartData} options={chartOptions} />
          </div>
          <div className="w-full space-y-5 text-center">
            <h3 className="text-2xl font-extrabold text-[#1B1C1E]">Your Capital Profile</h3>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Based on your answers, your biggest area for growth right now is your <strong className="text-brandpurple">{lowestCategory}</strong>.
            </p>
            
            <div className="p-5 bg-neutral-50 border border-neutral-100 rounded-xl space-y-2 text-left">
              <h4 className="font-bold text-[#1B1C1E] text-xs uppercase tracking-wide">Immediate Action Step:</h4>
              {lowestCategory === "Hard Skills" && <p className="text-neutral-600 text-sm font-medium leading-relaxed">Commit 10 hours this week to learning the basics of a high-leverage skill like Figma, Python, or digital marketing via YouTube.</p>}
              {lowestCategory === "Soft Skills" && <p className="text-neutral-600 text-sm font-medium leading-relaxed">Find an unstructured problem in your life or community and try proposing a detailed, researched solution without asking for help first.</p>}
              {lowestCategory === "Network" && <p className="text-neutral-600 text-sm font-medium leading-relaxed">Send one polite LinkedIn message to a professional in Northeast India whose career you admire. Ask for a 15-minute informational interview.</p>}
              {lowestCategory === "Portfolio" && <p className="text-neutral-600 text-sm font-medium leading-relaxed">Take something you've learned and build a small public project. Write a blog post, design a single webpage, or record a video explaining it.</p>}
            </div>

            <button onClick={resetQuiz} className="text-neutral-500 hover:text-[#1B1C1E] font-bold text-sm inline-flex items-center gap-1 transition-colors mt-2">
              <IconRefresh size={16} /> Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
