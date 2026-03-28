"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ATSScorecard } from '../molecules/ATSScorecard';
import { ATSChecklist } from '../molecules/ATSChecklist';
import { IconLoader2, IconFileUpload, IconBriefcase, IconFileText } from '@tabler/icons-react';

export const ATSAnalyzer = () => {
  const [jdText, setJdText] = useState('');
  const [cvText, setCvText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      if (!res.ok) throw new Error(data.error || "Failed to remotely extract text from the file.");
      setCvText(data.text);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to extract string text from document.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input to allow re-uploads of same file identically
    }
  };

  const handleAnalyze = async () => {
    if (!jdText.trim() || !cvText.trim()) {
      setErrorMsg("Please paste both your raw Resume text and the Job Description text to run the scan.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // Absolute 120-second timeout for extreme prompt inference limits

    try {
      const response = await fetch('/api/analyze-ats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, jdText }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e: any) {
        throw new Error(`Production HTTP Crash (${response.status}): ${responseText.substring(0, 150)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Production API Error object: ${JSON.stringify(data)}`);
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      if (err.name === 'AbortError') {
        setErrorMsg("The AI engine took too long to read your document (Timeout). Please try again.");
      } else {
        setErrorMsg(err.message || "An error occurred during ATS analysis.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 font-jakarta pb-32">

      <div className="text-center mb-16 relative">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brandpurple/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight mb-5">
          ATS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandpurple to-brightyellow">Compatibility</span> Scanner
        </h1>
        <p className="text-neutral-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Bypass the automated filters. Paste your Resume and the target Job Description below. Our intelligent engine simulates standard ATS parse-ability algorithms to evaluate keyword density and structural gaps.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAnalyzing && !result && (
          <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-white rounded-[2rem] p-8 border-2 border-neutral-100 shadow-sm focus-within:border-brandpurple/50 transition-all flex flex-col hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-brandpurple">
                    <div className="p-2.5 bg-brandpurple/10 rounded-xl"><IconFileUpload size={24} /></div>
                    <h3 className="font-extrabold text-xl text-[#1B1C1E]">Raw Resume Text</h3>
                  </div>
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-brandpurple/10 hover:bg-brandpurple/20 text-brandpurple text-[13px] font-bold rounded-xl transition-colors">
                    {isUploading ? <IconLoader2 className="animate-spin" size={16} /> : <IconFileText size={16} />}
                    {isUploading ? "Extracting..." : "Upload PDF/DOCX"}
                    <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} disabled={isUploading || isAnalyzing} />
                  </label>
                </div>
                <textarea
                  className={`w-full h-80 md:h-[450px] resize-none outline-none text-[15px] leading-relaxed font-medium bg-transparent transition-all ${isUploading ? 'opacity-30' : 'opacity-100 text-neutral-600'}`}
                  placeholder="Copy and paste the raw text of your entire Resume / CV here... Ensure section headings like 'Work Experience' or 'Education' are included."
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  disabled={isUploading}
                />
              </div>

              <div className="bg-white rounded-[2rem] p-8 border-2 border-neutral-100 shadow-sm focus-within:border-brightyellow/70 transition-all flex flex-col hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-yellow-600">
                    <div className="p-2.5 bg-brightyellow/20 rounded-xl"><IconBriefcase size={24} /></div>
                    <h3 className="font-extrabold text-xl text-[#1B1C1E]">Target Job Description</h3>
                  </div>
                </div>
                <textarea
                  className="w-full h-80 md:h-[450px] resize-none outline-none text-[15px] leading-relaxed text-neutral-600 font-medium bg-transparent"
                  placeholder="Paste the complete job description here. Our engine extracts the exact technical stack and soft skill dependencies from this input."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
              </div>

            </div>

            {errorMsg && <p className="text-red-500 text-center font-bold px-6 py-3 bg-red-50 border border-red-100 rounded-xl w-fit mx-auto shadow-sm">{errorMsg}</p>}

            <div className="flex justify-center pt-8 border-t border-neutral-100 mt-12">
              <button
                onClick={handleAnalyze}
                className="px-12 py-5 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-[1.25rem] font-extrabold text-xl shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                Run ATS Scan
              </button>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 space-y-8">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
              <IconLoader2 size={72} className="text-brandpurple" stroke={1.5} />
            </motion.div>
            <div className="text-3xl font-extrabold text-[#1B1C1E] flex items-center">
              Simulating Scanner Parameters
              <span className="inline-flex w-6 text-left ml-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
              </span>
            </div>
            <p className="text-neutral-500 font-medium text-lg text-center max-w-md leading-relaxed">Cross-referencing your CV against the JD extracting structural parse-ability and semantic keyword density vectors. Please be patient this may take a while.</p>
            <div className="-mt-2">
              <p className='font-light text-neutral-500 text-sm text-center max-w-md leading-relaxed'>Please be patient this may take a while.</p>
              <p className="text-neutral-500 italic font-light text-sm text-center max-w-md leading-relaxed mt-1">This is a heavy process and may take a while. Incase of failure please try again.</p>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-brightyellow to-brandpurple rounded-full max-w-[200px] w-full mt-6 shadow-inner animate-pulse" />
          </motion.div>
        )}

        {!isAnalyzing && result && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full pt-4">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
              <h2 className="text-2xl font-extrabold text-[#1B1C1E]">Scan Results</h2>
              <button
                onClick={() => { setCvText(''); setJdText(''); setResult(null); }}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#1B1C1E] rounded-xl font-bold transition-all text-sm"
              >
                Start Fresh
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

              {/* Iterative Resume Editor */}
              <div className="xl:col-span-1 bg-white border-2 border-neutral-100 rounded-[2rem] p-6 shadow-sm sticky top-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-2 text-[#1B1C1E]">
                    <IconFileUpload size={20} className="text-brandpurple" />
                    <h3 className="font-extrabold text-lg">Update Resume</h3>
                  </div>
                  <label className="cursor-pointer p-2 bg-neutral-100 hover:bg-brandpurple/10 hover:text-brandpurple text-neutral-500 rounded-[10px] transition-colors" title="Upload new document formatting">
                    {isUploading ? <IconLoader2 className="animate-spin" size={18} /> : <IconFileText size={18} />}
                    <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} disabled={isUploading || isAnalyzing} />
                  </label>
                </div>
                <p className="text-xs text-neutral-400 font-medium mb-3">Tweak your resume text manually or upload a new file below. Rescan instantly to verify.</p>
                <textarea
                  className={`w-full h-80 xl:h-[650px] resize-none outline-none text-[13px] leading-relaxed font-medium bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 focus:border-brandpurple/50 transition-all ${isUploading ? 'opacity-30' : 'opacity-100 text-neutral-600'}`}
                  placeholder="Iterate and modify your Resume text here..."
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  disabled={isUploading}
                />
                <button
                  onClick={handleAnalyze}
                  className="w-full mt-4 px-6 py-4 bg-[#1B1C1E] hover:bg-[#1B1C1F] text-white rounded-xl font-bold shadow-lg shadow-[#1B1C1E]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Rescan Document
                </button>
              </div>

              {/* Actionable Scorecard Visuals */}
              <div className="xl:col-span-2 space-y-8">
                <ATSScorecard data={result} />
                <ATSChecklist keywordMatch={result.keywordMatch} actionableFeedback={result.actionableFeedback} />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
