"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already responded
    const cookiePreference = localStorage.getItem('instudia-cookie-consent');
    if (!cookiePreference) {
      // Small delay so it doesn't pop up instantly and shock the user
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('instudia-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('instudia-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:pb-6 pointer-events-none font-jakarta"
        >
          <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 md:p-5 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brandpurple via-redhue to-brightyellow" />
            
            <div className="flex-1 pr-0 md:pr-4">
              <h3 className="text-[15px] font-black text-[#1B1C1E] mb-1 tracking-tight">We value your privacy</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We use strictly necessary cookies to make our site work and optional analytics cookies to improve your experience. 
                <a href="/cookie-policy" className="text-brandpurple font-bold ml-1.5 hover:underline underline-offset-2">
                  Read Policy
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-600 font-bold text-xs hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-[#1B1C1E] text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
