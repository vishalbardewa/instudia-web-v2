"use client";

import { useState, useEffect } from "react";

const SILLY_QUESTIONS = [
  "What color t-shirt was the speaker wearing?",
  "How many fans are there in your classroom?",
  "Did anyone actually understand the last slide? (Yes/No/Maybe)",
  "What's the meaning of life, the universe, and everything?",
  "If you had to describe the seminar in one word, what would it be?",
  "Who was the loudest person in the front row?",
  "Is water wet?",
  "How many times did the speaker say 'umm'?",
  "Pineapple on pizza: Yes or No?",
];

export default function SeminarMaterialPage() {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pick a random question on mount
    setQuestion(
      SILLY_QUESTIONS[Math.floor(Math.random() * SILLY_QUESTIONS.length)]
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !answer) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/seminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, question, answer }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        alert("Big yikes. Something went wrong. 💀");
      }
    } catch (err) {
      console.error(err);
      alert("It's giving error. Try again later! 😭");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-black font-sans flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(#444cf7 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#bcff50] rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#ff6bdf] rotate-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 transform transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">

          {!isAuthenticated ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-block bg-[#bcff50] text-black font-black uppercase tracking-widest text-sm px-4 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-[-2deg]">
                  THE SECRET STASH 📜
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[1.1] mb-4">
                  Unlock the <br /><span className="text-[#ff6bdf] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Seminar Stash</span>
                </h1>
                <p className="text-lg font-bold text-gray-700 leading-tight">
                  Drop your deets to get the sauce. Oh, and pass the vibe check first. ✨
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-black uppercase mb-2">
                    Your Email <span className="text-gray-500 font-normal normal-case">(where we drop the Ws)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-4 border-black focus:bg-[#f0f0f0] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none font-bold"
                    placeholder="main.character@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-black uppercase mb-2">
                    Your Digits 📱
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-4 border-black focus:bg-[#f0f0f0] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none font-bold"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="bg-[#444cf7] text-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative">
                  <div className="absolute -top-4 -right-4 bg-[#ff6bdf] text-black font-black text-xs px-3 py-1 rounded-full border-2 border-black rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    MANDATORY
                  </div>
                  <label htmlFor="security-question" className="block text-lg font-black uppercase mb-3 text-[#bcff50]">
                    VIBE CHECK 🤖
                  </label>
                  <p className="text-base font-bold mb-3">
                    {question || "Loading the tea..."}
                  </p>
                  <input
                    type="text"
                    id="security-question"
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-4 border-black text-black font-bold outline-none focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-y-[4px] focus:translate-x-[4px] transition-all"
                    placeholder="Spill it..."
                  />
                  <p className="text-sm text-white/80 mt-3 font-medium">
                    * FR FR, just type anything. We're just nosey. 👀
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#bcff50] hover:bg-[#a3e639] text-black font-black uppercase text-xl py-4 rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all duration-150 disabled:opacity-70 disabled:active:translate-y-0 disabled:active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin text-2xl">⏳</span>
                      COOKING...
                    </>
                  ) : (
                    "GIMME THE NOTES 🚀"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-[#bcff50] rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6 text-5xl">
                W
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#ff6bdf]">
                Access Granted!
              </h2>
              <p className="font-bold text-lg text-gray-800 mb-8 leading-snug">
                Your vibe check passed with flying colors. <br /> Here's the stash as promised! 🔥
              </p>

              <div className="space-y-4">
                <a
                  href="https://drive.google.com/drive/folders/1v5U1EKN-Iy7F60mitPHi-HhqsDza0iR8?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#444cf7] text-white font-black uppercase py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-150 text-lg"
                >
                  Snag the Slides 📥
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1v5U1EKN-Iy7F60mitPHi-HhqsDza0iR8?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-black font-black uppercase py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-150 text-lg"
                >
                  Peep the PDF 👀
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
