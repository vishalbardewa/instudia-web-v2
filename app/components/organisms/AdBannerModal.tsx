"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const AdBannerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const hasSeenBanner = sessionStorage.getItem('instudia-ad-banner-seen');
    if (!hasSeenBanner) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem('instudia-ad-banner-seen', 'true');
    setIsOpen(false);
  };

  const ROADBLOCKS = [
    { id: 1, text: "I don't know what skills are in demand." },
    { id: 2, text: "I have the skills, but need a better resume." },
    { id: 3, text: "I want to pivot to a completely new industry." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 font-jakarta">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-neutral-200"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black p-1.5 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="relative w-full bg-[#1B1C1E] flex flex-col items-center justify-center py-10 px-6 border-b-[6px] border-brandpurple">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#1B1C1E] text-[10px] font-black uppercase tracking-widest rounded-md mb-3">
                <SparklesIcon className="w-3 h-3 text-brandpurple" /> Fast Track
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Unlock Your Next Move
              </h2>
            </div>

            <div className="p-6 md:p-8 bg-white relative min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <p className="text-[#1B1C1E] font-extrabold text-lg text-center mb-6">
                      What is your biggest career roadblock right now?
                    </p>
                    <div className="space-y-3">
                      {ROADBLOCKS.map((block) => (
                        <button
                          key={block.id}
                          onClick={() => {
                            setSelectedOption(block.id);
                            setTimeout(() => setStep(2), 350);
                          }}
                          className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all group flex items-center justify-between
                            ${selectedOption === block.id 
                              ? "border-brandpurple bg-brandpurple/5 text-brandpurple scale-[0.98]" 
                              : "border-neutral-100 bg-white text-neutral-600 hover:border-brandpurple/30 hover:bg-neutral-50"
                            }
                          `}
                        >
                          <span className="text-sm">{block.text}</span>
                          <ChevronRightIcon className={`w-5 h-5 transition-transform ${selectedOption === block.id ? "text-brandpurple translate-x-1" : "text-neutral-300 group-hover:text-brandpurple group-hover:translate-x-1"}`} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-brandpurple/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brandpurple/20">
                      <SparklesIcon className="w-8 h-8 text-brandpurple" />
                    </div>
                    <h3 className="text-xl font-black text-[#1B1C1E] mb-3">We have exactly what you need.</h3>
                    <p className="text-sm text-neutral-500 mb-8 leading-relaxed px-4">
                      {selectedOption === 1 && "Our Career Guide will analyze your personality and instantly match you with high-demand industries."}
                      {selectedOption === 2 && "Our ATS Resume Scanner will benchmark your CV against industry standards and fix the critical flaws."}
                      {selectedOption === 3 && "Use the A/B/Z Career Canvas to safely map out your pivot without risking your current stability."}
                    </p>
                    
                    <Link 
                      href={selectedOption === 2 ? "/tools/ats-analyzer" : "/tools/career-guide"} 
                      onClick={close} 
                      className="block w-full px-6 py-4 bg-[#1B1C1E] text-white rounded-xl font-black hover:bg-neutral-800 transition-colors active:scale-95 text-center"
                    >
                      Launch Your Tool
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {step === 1 && (
                <button 
                  onClick={close} 
                  className="w-full text-center mt-6 text-[11px] text-neutral-400 font-bold hover:text-neutral-600 transition-colors uppercase tracking-widest"
                >
                  No thanks, maybe later
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
