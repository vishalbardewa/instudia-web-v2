"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconLoader2, IconFileUpload, IconSchool, IconBook, IconCircleCheck, IconInfoCircle, IconDownload, IconClipboardCopy } from '@tabler/icons-react';

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
  "Others (Specify in text)"
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parse-resume', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to extract text from the file.");
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
      setErrorMsg("Please provide some source material (text or file) to generate the assessment.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const actualGrade = targetGrade === "Others (Specify in text)" ? customGrade : targetGrade;
      const response = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceText, targetGrade: actualGrade }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate assessment.");

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while generating the quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    alert("Quiz JSON copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 font-jakarta pb-32 print:p-0 print:m-0">

      <div className="text-center mb-16 relative print:hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-flourescent/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight mb-5">
          Assessment Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-flourescent to-brandpurple">Specialist</span>
        </h1>
        <p className="text-neutral-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Create high-quality, calibrated assessments for your students. Tailored for the <strong>Indian Education System</strong> with a emphasis on literal comprehension and higher-order application.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isGenerating && !result && (
          <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border-2 border-neutral-100 shadow-sm focus-within:border-flourescent/50 transition-all flex flex-col hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3 text-flourescent">
                  <div className="p-2.5 bg-flourescent/10 rounded-xl"><IconBook size={24} /></div>
                  <h3 className="font-extrabold text-xl text-[#1B1C1E]">Source Material</h3>
                </div>
                <div className="flex gap-4">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-flourescent/10 hover:bg-flourescent/20 text-green-700 text-[13px] font-bold rounded-xl transition-colors">
                    {isUploading ? <IconLoader2 className="animate-spin" size={16} /> : <IconFileUpload size={16} />}
                    {isUploading ? "Reading..." : "Upload PDF/DOCX"}
                    <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} disabled={isUploading || isGenerating} />
                  </label>
                </div>
              </div>
              <textarea
                className={`w-full h-64 md:h-80 resize-none outline-none text-[15px] leading-relaxed font-medium bg-transparent transition-all ${isUploading ? 'opacity-30' : 'opacity-100 text-neutral-600'}`}
                placeholder="Paste the chapter content, lecture notes, or research paper text here..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100">
              <div className="flex items-center gap-3 text-brandpurple mb-6">
                <div className="p-2.5 bg-brandpurple/10 rounded-xl"><IconSchool size={24} /></div>
                <h3 className="font-extrabold text-xl text-[#1B1C1E]">Target Standard</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {INDIAN_GRADES.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setTargetGrade(grade)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 ${targetGrade === grade
                      ? 'bg-[#1B1C1E] text-white border-[#1B1C1E]'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-brandpurple/30'
                      }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
              {targetGrade === "Others (Specify in text)" && (
                <input
                  type="text"
                  className="mt-4 w-full px-5 py-3 rounded-xl border-2 border-neutral-200 outline-none focus:border-brandpurple transition-all"
                  placeholder="e.g. PhD Entrance, SSC Prep, Class 8 ICSE..."
                  value={customGrade}
                  onChange={(e) => setCustomGrade(e.target.value)}
                />
              )}
            </div>

            {errorMsg && <p className="text-red-500 text-center font-bold px-6 py-3 bg-red-50 border border-red-100 rounded-xl w-fit mx-auto shadow-sm">{errorMsg}</p>}

            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerate}
                className="px-12 py-5 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-[1.25rem] font-extrabold text-xl shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
              >
                Launch Assessment Engine
              </button>
            </div>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 space-y-8">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
              <IconLoader2 size={72} className="text-flourescent" stroke={1.5} />
            </motion.div>
            <div className="text-3xl font-extrabold text-[#1B1C1E] flex items-center text-center px-4">
              Designing Higher-Order Questions
              <span className="inline-flex w-6 text-left ml-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
              </span>
            </div>
            <p className="text-neutral-500 font-medium text-lg text-center max-w-md leading-relaxed px-6">
              Calibrating difficulty for {targetGrade}. Analyzing source logic to create distractors and rationales.
            </p>
            <div className="h-1.5 bg-gradient-to-r from-flourescent to-brandpurple rounded-full max-w-[200px] w-full mt-6 shadow-inner animate-pulse" />
          </motion.div>
        )}

        {!isGenerating && result && (
          <>
            {/* Interactive Result View (Screen Only) */}
            <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10 print:hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-3xl font-black text-[#1B1C1E] mb-2">{result.quizTitle}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-flourescent/10 text-green-700 rounded-lg text-xs font-bold uppercase tracking-wider">{targetGrade}</span>
                    <span className="px-3 py-1 bg-brandpurple/10 text-brandpurple rounded-lg text-xs font-bold uppercase tracking-wider">10 Questions</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-flourescent/10 hover:bg-flourescent/20 text-green-700 rounded-xl font-bold transition-all text-sm"
                  >
                    Print Worksheet
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1B1C1E] rounded-xl font-bold transition-all text-sm"
                  >
                    <IconClipboardCopy size={18} /> Copy JSON
                  </button>
                  <button
                    onClick={() => { setResult(null); }}
                    className="px-6 py-3 bg-[#1B1C1E] text-white hover:bg-neutral-800 rounded-xl font-bold transition-all text-sm"
                  >
                    Start New
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                {result.questions.map((q, idx) => (
                  <div key={idx} className="bg-white border-2 border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex items-center gap-2 text-xs font-black uppercase text-neutral-400 tracking-widest">
                          <span className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[#1B1C1E]">{idx + 1}</span>
                          {q.type}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-[#1B1C1E] leading-relaxed mb-6">
                        {q.question}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(q.options).map(([key, value]) => (
                          <div
                            key={key}
                            className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${key === q.correctAnswer
                              ? 'bg-flourescent/5 border-flourescent/30 text-green-800'
                              : 'bg-neutral-50 border-neutral-100 text-neutral-600'
                              }`}
                          >
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${key === q.correctAnswer ? 'bg-flourescent text-white' : 'bg-neutral-200 text-neutral-500'
                              }`}>
                              {key}
                            </span>
                            <span className="font-semibold text-[15px]">{value}</span>
                            {key === q.correctAnswer && <IconCircleCheck size={20} className="ml-auto text-flourescent" />}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                          className="flex items-center gap-2 text-brandpurple font-bold text-sm hover:underline"
                        >
                          <IconInfoCircle size={18} /> {expandedIndex === idx ? "Hide Explanation" : "Reveal Rational & Hint"}
                        </button>
                      </div>

                      <AnimatePresence>
                        {expandedIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 overflow-hidden"
                          >
                            <div className="p-6 bg-neutral-50 rounded-2xl space-y-4 border border-neutral-100">
                              <div>
                                <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] block mb-1">Student Hint</span>
                                <p className="text-neutral-600 text-sm italic">"{q.hint}"</p>
                              </div>
                              <div>
                                <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] block mb-1">Teacher's Rationale</span>
                                <p className="text-neutral-700 text-sm leading-relaxed font-bold">{q.rationale}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Print-Only Worksheet View */}
            <div className="hidden print:block font-serif text-[#1B1C1E] p-4 max-w-4xl mx-auto">
              <div className="text-center border-b-2 border-black pb-8 mb-8">
                <h1 className="text-3xl font-bold uppercase mb-2">ASSESSMENT WORKSHEET</h1>
                <p className="text-sm font-bold">{result.quizTitle}</p>
                <p className="text-xs mt-1 uppercase tracking-widest">{targetGrade}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10 border-b pb-6 text-sm">
                <div>
                  <p className="mb-4"><strong>Student Name:</strong> ____________________________</p>
                  <p><strong>Roll Number:</strong> ______________________________</p>
                </div>
                <div className="text-right">
                  <p className="mb-4"><strong>Date:</strong> ____________________________</p>
                  <p><strong>Maximum Marks:</strong> 10</p>
                </div>
              </div>

              <div className="space-y-8">
                {result.questions.map((q, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex gap-4 mb-4">
                      <span className="font-bold shrink-0">{idx + 1}.</span>
                      <p className="font-medium text-lg leading-snug">{q.question}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 ml-8">
                      {Object.entries(q.options).map(([key, value]) => (
                        <div key={key} className="flex gap-4 items-start">
                          <span className="w-6 h-6 border border-black rounded flex items-center justify-center text-xs font-bold shrink-0">
                            {key}
                          </span>
                          <span className="text-base">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <p className="text-sm font-bold italic">All the best!</p>
              </div>

              <div className="mt-20 pt-8 border-t border-dotted border-gray-400 text-center text-[10px] text-gray-400">
                Generated via Instudia Assessment Design Specialist - For Educational Purposes Only
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
