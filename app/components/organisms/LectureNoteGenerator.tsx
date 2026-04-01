"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconLoader2, IconFileUpload, IconSchool, IconBook, IconCircleCheck, IconInfoCircle, IconClipboardCopy, IconPrinter, IconQuote } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface Pillar {
  title: string;
  content: string;
}

interface LectureNotesData {
  title: string;
  intro: string;
  pillars: Pillar[];
  cheatSheet: string;
  discussion: string;
}

const INDIAN_GRADES = [
  "Class 1-5 (Primary)",
  "Class 6-8 (Middle School)",
  "Class 9-10 (Secondary)",
  "Class 11-12 (Higher Secondary)",
  "Undergraduate (Degree)",
  "Postgraduate (Masters)",
  "Competitive Exams (UPSC/JEE/NEET)",
];

export const LectureNoteGenerator = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetGrade, setTargetGrade] = useState(INDIAN_GRADES[3]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<LectureNotesData | null>(null);
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
      setErrorMsg("Please provide some source material to generate the lecture notes.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-lecture-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceText, targetGrade }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate notes.");

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while generating the notes. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!result) return;
    const content = `
# ${result.title}
## Intro
${result.intro}

## Pillars
${result.pillars.map(p => `### ${p.title}\n${p.content}`).join('\n\n')}

## Cheat Sheet
${result.cheatSheet}

## Discussion Prompts
${result.discussion}
    `.trim();
    navigator.clipboard.writeText(content);
    alert("Markdown notes copied to clipboard!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 font-jakarta pb-32 print:p-0 print:m-0">

      <div className="text-center mb-16 relative print:hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brandpurple/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1C1E] tracking-tight mb-5">
          Pedagogical <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandpurple to-brightyellow">Assistant</span>
        </h1>
        <p className="text-neutral-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Transform any text into structured, high-retention lecture notes. We simplify jargon, build analogies, and suggest visual cues—perfect for live teacher presentations.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isGenerating && !result && (
          <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border-2 border-neutral-100 shadow-sm focus-within:border-brandpurple/50 transition-all flex flex-col hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3 text-brandpurple">
                  <div className="p-2.5 bg-brandpurple/10 rounded-xl"><IconBook size={24} /></div>
                  <h3 className="font-extrabold text-xl text-[#1B1C1E]">Input Material</h3>
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
                className={`w-full h-64 md:h-80 resize-none outline-none text-[15px] leading-relaxed font-medium bg-transparent transition-all ${isUploading ? 'opacity-30' : 'opacity-100 text-neutral-600'}`}
                placeholder="Paste the source material here. The AI will transform it into guided notes..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="bg-neutral-50 rounded-[2rem] p-6 md:p-8 border border-neutral-100">
              <div className="flex items-center gap-3 text-[#1B1C1E] mb-6">
                <div className="p-2.5 bg-brightyellow/20 rounded-xl"><IconSchool size={24} /></div>
                <h3 className="font-extrabold text-xl">Target Standard</h3>
              </div>
              <div className="flex flex-wrap gap-3 max-w-full">
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
            </div>

            {errorMsg && <p className="text-red-500 text-center font-bold px-6 py-3 bg-red-50 border border-red-100 rounded-xl w-fit mx-auto">{errorMsg}</p>}

            <div className="flex justify-center pt-4 w-full">
              <button
                onClick={handleGenerate}
                className="w-full sm:w-auto px-8 md:px-12 py-5 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-[1.25rem] font-extrabold text-lg md:text-xl shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Generate Guided Notes
              </button>
            </div>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 space-y-8">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
              <IconLoader2 size={72} className="text-brandpurple" stroke={1.5} />
            </motion.div>
            <div className="text-3xl font-extrabold text-[#1B1C1E] flex items-center text-center px-4">
              Transforming Complex Content
              <span className="inline-flex w-6 text-left ml-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
              </span>
            </div>
            <p className="text-neutral-500 font-medium text-lg text-center max-w-md leading-relaxed px-6">
              Simplifying jargon, crafting analogies, and organizing into the 'Rule of Three'.
            </p>
          </motion.div>
        )}

        {!isGenerating && result && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 print:hidden overflow-hidden">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#1B1C1E] mb-2 break-words leading-tight">{result.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-brandpurple/10 text-brandpurple rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap">{targetGrade}</span>
                  <span className="px-3 py-1 bg-brightyellow/10 text-yellow-700 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap">Teacher's Guide</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-brandpurple/10 hover:bg-brandpurple/20 text-brandpurple rounded-xl font-bold transition-all text-sm"
                >
                  <IconPrinter size={18} /> Print Handbook
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1B1C1E] rounded-xl font-bold transition-all text-sm"
                >
                  <IconClipboardCopy size={18} /> Copy Markdown
                </button>
                <button
                  onClick={() => { setResult(null); }}
                  className="px-6 py-3 bg-[#1B1C1E] text-white hover:bg-neutral-800 rounded-xl font-bold transition-all text-sm"
                >
                  Start New
                </button>
              </div>
            </div>

            {/* HandBook Response Design */}
            <div className="bg-white border-2 border-neutral-100 rounded-[2.5rem] p-8 md:p-14 md:pl-20 shadow-sm print:p-0 print:border-0 print:shadow-none font-jakarta relative overflow-hidden transition-all hover:shadow-md">

              {/* Notebook Spine Margin Decoration */}
              <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-brandpurple/20 print:hidden" />
              <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-neutral-100 print:hidden" />

              <div className="hidden print:block text-center border-b-2 border-black pb-8 mb-12">
                <h1 className="text-3xl font-black uppercase mb-2">Teacher's Guided Presentation Notes</h1>
                <p className="text-lg font-bold">{result.title}</p>
                <p className="text-xs mt-1 uppercase tracking-widest text-neutral-500 text-center">{targetGrade}</p>
              </div>

              {/* Hook Section */}
              <section className="mb-20">
                <div className="flex items-center gap-3 text-brandpurple mb-6 print:text-black">
                  <div className="p-3 bg-brandpurple/5 rounded-2xl print:bg-transparent"><IconQuote size={28} /></div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">The Hook & Engagement</h3>
                </div>
                <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-xl prose-p:text-neutral-800 border-l-4 border-brandpurple/10 pl-8 ml-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {result.intro}
                  </ReactMarkdown>
                </div>
              </section>

              {/* Rule of Three (Pillars) Vertical Stack */}
              <div className="space-y-20 mb-20">
                <div className="flex flex-col gap-2 mb-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-brandpurple print:text-black">The Rule of Three (Core Pillars)</h3>
                  <div className="w-20 h-1.5 bg-brandpurple rounded-full" />
                </div>

                <div className="space-y-16">
                  {result.pillars.map((pillar, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-14 -top-4 text-7xl font-black text-brandpurple opacity-[0.03] select-none group-hover:opacity-[0.06] transition-opacity print:hidden">
                        0{idx + 1}
                      </div>
                      <div className="flex items-baseline gap-4 mb-6">
                        <span className="text-sm font-black text-brandpurple bg-brandpurple/10 px-3 py-1 rounded-lg print:border print:border-black">PILLAR 0{idx + 1}</span>
                        <h4 className="text-2xl font-extrabold text-[#1B1C1E]">{pillar.title}</h4>
                      </div>
                      <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed text-lg break-words overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {pillar.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cheat Sheet (Analogy) CALLOUT box */}
              <section className="bg-brightyellow/5 p-10 rounded-[2.5rem] border border-brightyellow/20 print:bg-white print:border-2 print:border-black print:rounded-none relative overflow-hidden mb-16">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brightyellow/10 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />
                <div className="flex items-center gap-4 text-yellow-800 mb-8 print:text-black">
                  <div className="p-3 bg-brightyellow/20 rounded-2xl print:bg-transparent"><IconInfoCircle size={28} /></div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Teacher's Cheat Sheet (Analogies & FAQs)</h3>
                </div>
                <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed text-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {result.cheatSheet}
                  </ReactMarkdown>
                </div>
              </section>

              {/* Discussion Prompts Block - High Contrast */}
              <section className="bg-[#1B1C1E] text-white p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all print:bg-white print:text-black print:border-2 print:border-black print:rounded-none">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-brandpurple/20 rounded-2xl print:bg-transparent"><IconSchool size={28} className="text-brightyellow print:text-black" /></div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Student Discussion Prompts</h3>
                </div>
                <div className="prose prose-invert max-w-none text-lg leading-relaxed print:prose-neutral">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {result.discussion}
                  </ReactMarkdown>
                </div>
              </section>

              <div className="hidden print:block mt-16 pt-8 border-t border-dotted border-neutral-300 text-center text-[10px] text-neutral-400">
                Generated via Instudia Pedagogical Assistant - For Teacher Presentation Guidance Only
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pb-20 print:hidden text-center">
              <div className="w-12 h-1 bg-brandpurple/20 rounded-full" />
              <p className="text-sm font-black text-neutral-400 uppercase tracking-widest italic">Teaching Made Effortless</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
