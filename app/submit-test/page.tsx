"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function SubmitTestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-test', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#bcff50', '#ff6bdf', '#444cf7', '#1B1C1E', '#ffffff'] // Instudia brand colors
        });
        
        form.reset();
        setFileName(null);
      } else {
        alert('Big yikes. Error: ' + data.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("It's giving error. Try again later! 😭");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-black font-sans flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(#ff6bdf 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#444cf7] rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#bcff50] rotate-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 transform transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">

          <div className="text-center mb-8">
            <div className="inline-block bg-[#bcff50] text-black font-black uppercase tracking-widest text-sm px-4 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-[-2deg]">
              TEST DROP 📄
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[1.1] mb-4">
              Submit Your <br /><span className="text-[#444cf7] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Work</span>
            </h1>
            <p className="text-lg font-bold text-gray-700 leading-tight">
              Drop your test docs below. Make sure it's the right one, no take-backs! 👀
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-black uppercase mb-2">
                Your Name <span className="text-gray-500 font-normal normal-case">(Who are you?)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border-4 border-black focus:bg-[#f0f0f0] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none font-bold"
                placeholder="Main Character"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-black uppercase mb-2">
                Your Email <span className="text-gray-500 font-normal normal-case">(For the grade drop)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border-4 border-black focus:bg-[#f0f0f0] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none font-bold"
                placeholder="main.character@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-black uppercase mb-2">
                Test / Subject <span className="text-gray-500 font-normal normal-case">(What is this for?)</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-xl border-4 border-black focus:bg-[#f0f0f0] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none font-bold"
                placeholder="Math 101 Midterm..."
              />
            </div>

            <div className="bg-[#444cf7] text-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative">
              <div className="absolute -top-4 -right-4 bg-[#ff6bdf] text-black font-black text-xs px-3 py-1 rounded-full border-2 border-black rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                REQUIRED
              </div>
              <label htmlFor="document" className="block text-lg font-black uppercase mb-3 text-[#bcff50]">
                THE DOC 📎
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-black border-dashed rounded-xl bg-white hover:bg-[#f0f0f0] transition-colors group cursor-pointer relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <input
                  id="document"
                  name="document"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    } else {
                      setFileName(null);
                    }
                  }}
                />
                <div className="space-y-1 text-center relative z-0">
                  <div className="w-16 h-16 bg-[#ff6bdf] rounded-full border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-4 group-hover:-translate-y-1 transition-transform">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex text-sm text-black justify-center font-bold uppercase">
                    <span className="bg-[#bcff50] px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {fileName ? 'Change File' : 'Choose File'}
                    </span>
                  </div>
                  <p className="text-sm text-black font-black mt-3 pt-2">
                    {fileName ? fileName : "* PDF, Word, or Images (Max 4MB)"}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#bcff50] hover:bg-[#a3e639] text-black font-black uppercase text-xl py-4 rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all duration-150 disabled:opacity-70 disabled:active:translate-y-0 disabled:active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-2xl">⏳</span>
                  UPLOADING...
                </>
              ) : (
                "SEND IT 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
