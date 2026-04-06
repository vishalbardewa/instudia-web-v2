"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconLoader2, 
  IconFileUpload, 
  IconSchool, 
  IconBook, 
  IconCircleCheck, 
  IconInfoCircle, 
  IconClipboardCopy, 
  IconPrinter, 
  IconSparkles,
  IconArrowRight
} from '@tabler/icons-react';

interface QuizQuestion {
  type: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  hint: string;
  rationale: string;
}

interface QuizData {
  quizTitle: string;
  questions: QuizQuestion[];
}

const INDIAN_GRADES = [
  "Class 1-5 (Primary)",
  "Class 6-8 (Middle School)",
  "Class 9-10 (Secondary)",
  "Class 11-12 (Higher Secondary)",
  "Undergraduate (Degree)",
  "Postgraduate (Masters)",
  "Competitive Exams (UPSC/JEE/NEET)",
  "Others (Specify)"
];

export const AssessmentDesigner = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetGrade, setTargetGrade] = useState(INDIAN_GRADES[2]);
  const [customGrade, setCustomGrade] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<QuizData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parse-assessment-material', { method: 'POST', body: formData });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to extract text from the file.");
      }
      
      const data = await res.json();
      setSourceText(data.text);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to extract text. Please try pasting manually.");
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!sourceText.trim()) {
      setErrorMsg("Please provide some source material to begin.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setResult(null);
    setIsStreaming(false);
    setShowSuccess(false);

    try {
      const actualGrade = targetGrade === "Others (Specify)" ? customGrade : targetGrade;
      const response = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceText, targetGrade: actualGrade }),
      });

      if (!response.ok) {
        throw new Error(`Server encountered an error (${response.status}). Please try again.`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Stream connection failed.");

      const decoder = new TextDecoder();
      let fullContent = "";

      const extractSection = (content: string, tag: string) => {
        const regex = new RegExp(`\\[${tag}\\]\\n?([\\s\\S]*?)(?=\\n\\[|$)`, 'i');
        return content.match(regex)?.[1]?.trim() || '';
      };

      const extractAllQuestions = (content: string): QuizQuestion[] => {
        const questions: QuizQuestion[] = [];
        const qBlocks = content.split(/\[Q_START\]/i).slice(1);

        for (const block of qBlocks) {
          const rawBlock = block.split(/\[Q_END\]/i)[0];
          const extractFromBlock = (tag: string) => {
            const regex = new RegExp(`\\[${tag}\\]\\n?([\\s\\S]*?)(?=\\n\\[|$)`, 'i');
            return rawBlock.match(regex)?.[1]?.trim() || '';
          };

          const q: QuizQuestion = {
            type: extractFromBlock('TYPE'),
            question: extractFromBlock('QUESTION'),
            options: {
              A: extractFromBlock('OPTIONS_A'),
              B: extractFromBlock('OPTIONS_B'),
              C: extractFromBlock('OPTIONS_C'),
              D: extractFromBlock('OPTIONS_D'),
            },
            correctAnswer: extractFromBlock('CORRECT'),
            hint: extractFromBlock('HINT'),
            rationale: extractFromBlock('RATIONALE'),
          };

          if (q.question) questions.push(q);
        }
        return questions;
      };

      let buffer = "";
      let hasStartedReceiving = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsStreaming(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        let chunkChanged = false;

        for (const line of lines) {
          if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
            try {
              const p = JSON.parse(line.slice(6));
              const content = p.choices?.[0]?.delta?.content;
              if (content) {
                fullContent += content;
                chunkChanged = true;
                if (!hasStartedReceiving) {
                  hasStartedReceiving = true;
                  setIsGenerating(false);
                  setIsStreaming(true);
                }
              }
            } catch { /* Suppress partial JSON errors */ }
          }
        }

        if (chunkChanged) {
          const questions = extractAllQuestions(fullContent);
          setResult({
            quizTitle: extractSection(fullContent, 'TITLE') || "Designing Assessment...",
            questions: questions,
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    alert("Quiz JSON copied to clipboard!");
  };

  const handlePrint = () => window.print();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 font-jakarta pb-32 print:p-0 print:m-0 bg-[#FBFBFF]">
      
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] px-6 py-3 bg-green-600 text-white rounded-2xl shadow-2xl font-bold flex items-center gap-3"
          >
            <div className="bg-white/20 p-1.5 rounded-lg"><IconCircleCheck size={18} /></div>
            Assessment Calibrated Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="text-center mb-16 relative print:hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brandpurple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight mb-5">
          Assessment Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandpurple to-flourescent">Specialist</span>
        </h1>
        <p className="text-neutral-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Create high-quality, calibrated assessments tailored for the <strong>Indian Education System</strong>. We test both literal comprehension and higher-order application.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isGenerating && !result && (
          <motion.div 
            key="input" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="space-y-8"
          >
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-neutral-100 shadow-sm focus-within:border-brandpurple/50 transition-all flex flex-col hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-neutral-50 pb-6">
                <div className="flex items-center gap-3 text-brandpurple">
                  <div className="p-2.5 bg-brandpurple/10 rounded-xl"><IconBook size={24} /></div>
                  <h3 className="font-extrabold text-xl text-[#1B1C1E]">Source Material</h3>
                </div>
                <div className="flex gap-4">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-brandpurple/10 hover:bg-brandpurple/20 text-brandpurple text-[13px] font-bold rounded-xl transition-colors">
                    {isUploading ? <IconLoader2 className="animate-spin" size={16} /> : <IconFileUpload size={16} />}
                    {isUploading ? "Extracting..." : "Upload PDF/DOCX"}
                    <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} disabled={isUploading || isGenerating} />
                  </label>
                </div>
              </div>
              <textarea
                className={`w-full h-80 resize-none outline-none text-[15px] leading-relaxed font-medium bg-transparent transition-all ${isUploading ? 'opacity-30' : 'opacity-100 text-neutral-600'}`}
                placeholder="Paste the chapter content, lecture notes, or research text here. Our AI will transform it into high-fidelity questions..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="bg-neutral-50 rounded-[2.5rem] p-8 border border-neutral-100">
              <div className="flex items-center gap-3 text-brandpurple mb-8">
                <div className="p-2.5 bg-brandpurple/10 rounded-xl"><IconSchool size={24} /></div>
                <h3 className="font-extrabold text-xl text-[#1B1C1E]">Target Standard</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {INDIAN_GRADES.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setTargetGrade(grade)}
                    className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                      targetGrade === grade
                        ? 'bg-[#1B1C1E] text-white border-[#1B1C1E] shadow-xl shadow-black/10'
                        : 'bg-white text-neutral-500 border-neutral-200 hover:border-brandpurple/30'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
              {targetGrade === "Others (Specify)" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-neutral-200 outline-none focus:border-brandpurple transition-all bg-white"
                    placeholder="e.g. UPSC Prelims, PhD Entrance, SSC CGL..."
                    value={customGrade}
                    onChange={(e) => setCustomGrade(e.target.value)}
                  />
                </motion.div>
              )}
            </div>

            {errorMsg && <p className="text-red-500 text-center font-bold px-6 py-3 bg-red-50 border border-red-100 rounded-xl w-fit mx-auto shadow-sm">{errorMsg}</p>}

            <div className="flex justify-center pt-8">
              <button
                onClick={handleGenerate}
                className="px-12 py-6 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-[1.5rem] font-extrabold text-xl shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 group"
              >
                Launch Assessment Engine
                <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {isGenerating && !isStreaming && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 space-y-8">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
              <IconLoader2 size={72} className="text-brandpurple" stroke={1.5} />
            </motion.div>
            <div className="text-3xl font-extrabold text-[#1B1C1E] flex items-center text-center px-4">
              Calibrating Higher-Order Questions
              <span className="inline-flex w-6 text-left ml-1 text-brandpurple">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
              </span>
            </div>
            <p className="text-neutral-500 font-medium text-lg text-center max-w-md leading-relaxed px-6">
              Analyzing logic, crafting distractors, and finalizing rationales for {targetGrade}.
            </p>
          </motion.div>
        )}

        {result && (
          <motion.div 
            key="results" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="space-y-12"
          >
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100 print:hidden relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brandpurple rounded-full" />
              <div>
                <h2 className="text-3xl font-black text-[#1B1C1E] mb-2">{result.quizTitle}</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-brandpurple/10 text-brandpurple rounded-lg text-[10px] font-black uppercase tracking-widest">{targetGrade}</span>
                  <span className="px-3 py-1 bg-flourescent/10 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-widest">{result.questions.length} Questions</span>
                  {isStreaming && (
                    <span className="px-3 py-1 bg-brandpurple text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                      <IconLoader2 size={10} className="animate-spin" /> Live Stream
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-brandpurple/10 hover:bg-brandpurple/20 text-brandpurple rounded-xl font-bold transition-all text-sm">
                  <IconPrinter size={18} /> Print Worksheet
                </button>
                <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1B1C1E] rounded-xl font-bold transition-all text-sm">
                  <IconClipboardCopy size={18} /> Copy JSON
                </button>
                <button onClick={() => setResult(null)} className="px-6 py-3 bg-[#1B1C1E] text-white hover:bg-neutral-800 rounded-xl font-bold transition-all text-sm shadow-xl">
                  Start New
                </button>
              </div>
            </div>

            {/* Questions View */}
            <div className="space-y-8 print:space-y-12">
              <div className="bg-white border-2 border-neutral-100 rounded-[2.5rem] p-10 md:p-14 shadow-sm print:p-0 print:border-0 print:shadow-none font-jakarta relative overflow-hidden transition-all hover:shadow-md">
                
                {/* Notebook spine decoration matching other tools */}
                <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-brandpurple/20 print:hidden" />
                <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-neutral-100 print:hidden" />

                <div className="hidden print:block text-center border-b-2 border-black pb-8 mb-12">
                  <h1 className="text-3xl font-black uppercase mb-2">ASSESSMENT WORKSHEET</h1>
                  <p className="text-lg font-bold">{result.quizTitle}</p>
                  <p className="text-xs mt-1 uppercase tracking-widest text-neutral-500">{targetGrade}</p>
                </div>

                <div className="space-y-16">
                  {result.questions.map((q, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: 0.1 }}
                      className="relative pl-6 md:pl-10"
                    >
                      <div className="flex items-start gap-5 mb-6">
                        <span className="w-10 h-10 rounded-2xl bg-neutral-100 text-[#1B1C1E] flex items-center justify-center font-black text-sm shrink-0">{idx + 1}</span>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brandpurple/60">{q.type}</span>
                          <h4 className="text-xl font-bold text-[#1B1C1E] leading-relaxed">{q.question}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14 group">
                        {Object.entries(q.options).map(([key, value]) => (
                          <div 
                            key={key} 
                            className={`p-5 rounded-[1.5rem] border-2 transition-all flex items-center gap-4 ${
                              key === q.correctAnswer 
                                ? 'bg-flourescent/10 border-flourescent/30 text-green-900 shadow-sm' 
                                : 'bg-neutral-50 border-neutral-100 text-neutral-600'
                            }`}
                          >
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                              key === q.correctAnswer ? 'bg-flourescent text-green-900 border-2 border-green-900/10' : 'bg-neutral-200 text-neutral-500'
                            }`}>
                              {key}
                            </span>
                            <span className="font-bold text-[15px]">{value}</span>
                            {key === q.correctAnswer && <IconCircleCheck size={20} className="ml-auto text-green-600 print:hidden" />}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 ml-14 flex flex-col gap-4 print:hidden">
                        <button 
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                          className="flex items-center gap-2 text-brandpurple/60 hover:text-brandpurple font-black text-xs uppercase tracking-widest transition-colors"
                        >
                          <IconInfoCircle size={16} /> {expandedIndex === idx ? "Hide Logic" : "Reveal Rationale & Hint"}
                        </button>

                        <AnimatePresence>
                          {expandedIndex === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: "auto", opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 bg-brandpurple/5 rounded-[2rem] border border-brandpurple/10 space-y-4">
                                <div>
                                  <span className="text-[9px] font-black uppercase text-brandpurple/50 tracking-[0.2em] block mb-1">Student Hint</span>
                                  <p className="text-neutral-600 text-sm italic leading-relaxed">"{q.hint}"</p>
                                </div>
                                <div className="pt-4 border-t border-brandpurple/5">
                                  <span className="text-[9px] font-black uppercase text-brandpurple/50 tracking-[0.2em] block mb-1">Teacher's Solution Logic</span>
                                  <p className="text-[#1B1C1E] text-sm font-bold leading-relaxed">{q.rationale}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}

                  {isStreaming && (
                    <motion.div 
                      key="streaming-indicator"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="relative pl-6 md:pl-10 pb-8 flex items-center gap-4 text-brandpurple/40"
                    >
                      <span className="w-10 h-10 rounded-2xl bg-neutral-50 flex items-center justify-center shrink-0">
                        <IconLoader2 size={20} className="animate-spin" />
                      </span>
                      <p className="text-sm font-bold animate-pulse">AI is crafting the next question...</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Print Only Name/Roll Number Section */}
              <div className="hidden print:grid grid-cols-2 gap-10 mt-16 text-sm border-t-2 border-black pt-12 font-serif">
                <div className="space-y-6">
                  <p><strong>Candidate Name:</strong> ____________________________</p>
                  <p><strong>Roll/ID Number:</strong> ______________________________</p>
                </div>
                <div className="text-right space-y-6">
                   <p><strong>Date:</strong> ____________________________</p>
                   <p><strong>Obtained Score:</strong> _______ / 10</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pb-20 print:hidden text-center scale-90 opacity-50">
              <IconSparkles size={24} className="text-brandpurple" />
              <p className="text-sm font-black text-neutral-400 uppercase tracking-[0.4em] italic">Redefining Excellence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

