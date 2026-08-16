"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon, LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function MasterclassModal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});

  const isOpen = searchParams?.get("modal") === "masterclass";

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const close = () => {
    // Remove the ?modal=masterclass from URL
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete("modal");
    router.replace(`?${newParams.toString()}`, { scroll: false });

    // reset form briefly after close animation
    setTimeout(() => {
      setUnlocked(false);
      setErrorMessage("");
      setErrors({});
      setTouched({});
      setForm({ name: "", email: "", phone: "" });
    }, 500);
  };

  const validate = (f: { name: string; email: string; phone: string }) => {
    const e: { name?: string; email?: string; phone?: string } = {};
    if (!f.name.trim()) e.name = "First name is required.";
    if (!f.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
    
    if (!f.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^[0-9]{10}$/.test(f.phone.trim())) e.phone = "Enter a valid 10-digit phone number.";
    
    return e;
  };

  const handleBlur = (field: "name" | "email" | "phone") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setTouched({ name: true, email: true, phone: true });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, leadSource: "Intro to Web Design (30 min)" }),
      });
      const data = await res.json();
      if (res.ok) {
        setUnlocked(true);
      } else {
        setErrorMessage(data.message ?? "Something went wrong.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6" onClick={close}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#FAFAFA] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pb-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background accents */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-brightyellow/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-6 right-6 z-[60] bg-white border border-neutral-200 p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-50 transition-all shadow-sm"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Modal Body */}
        <div className="relative z-10 w-full px-6 md:px-12 pt-12">

          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left Column: Copy */}
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full shadow-sm w-fit mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1B1C1E]">Free Access Open</span>
                  </div>

                  <span className="inline-block text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4">
                    Free 30-Minute Masterclass
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.05] mb-6">
                    Build Your First <span className="text-brandpurple">Modern Website</span>
                  </h1>
                  <p className="text-base text-neutral-500 leading-relaxed font-medium mb-8">
                    Learn the exact framework professional web developers use to build highly-converting landing pages from scratch. No prior experience required.
                  </p>

                  <ul className="space-y-4 mb-4 lg:mb-0">
                    {["HTML & CSS Foundations", "Modern Typography & Layouts", "Publishing it live to the internet"].map((point, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm font-semibold text-[#1B1C1E]">
                        <CheckCircleIcon className="w-5 h-5 text-brandpurple" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Opt-in Form */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-brandpurple/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brightyellow/10 rounded-bl-full pointer-events-none" />

                  <div className="flex items-center gap-2 mb-8">
                    <LockClosedIcon className="w-5 h-5 text-neutral-400" />
                    <span className="text-sm font-extrabold text-neutral-400 uppercase tracking-widest">Unlock Instantly</span>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 relative z-10">
                    {errorMessage && (
                      <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2 border border-red-100">
                        <ExclamationCircleIcon className="w-5 h-5 shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">First Name *</label>
                      <input
                        type="text"
                        className={`w-full px-5 py-3.5 rounded-2xl border text-sm font-medium outline-none transition-all focus:ring-2 disabled:opacity-50
                          ${errors.name ? "border-red-300 ring-2 ring-red-100 focus:border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brandpurple focus:ring-brandpurple/30"}
                        `}
                        placeholder="e.g. Vishal"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (touched.name) setErrors((prev) => ({ ...prev, name: validate({ ...form, name: e.target.value }).name }));
                        }}
                        onBlur={() => handleBlur("name")}
                        disabled={submitting}
                      />
                      {errors.name && (
                        <p className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                          <ExclamationCircleIcon className="w-3 h-3 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Phone Number *</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-sm">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          className={`w-full pl-14 pr-5 py-3.5 rounded-2xl border text-sm font-medium outline-none transition-all focus:ring-2 disabled:opacity-50
                            ${errors.phone ? "border-red-300 ring-2 ring-red-100 focus:border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brandpurple focus:ring-brandpurple/30"}
                          `}
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setForm({ ...form, phone: val });
                            if (touched.phone) setErrors((prev) => ({ ...prev, phone: validate({ ...form, phone: val }).phone }));
                          }}
                          onBlur={() => handleBlur("phone")}
                          disabled={submitting}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                          <ExclamationCircleIcon className="w-3 h-3 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Email Address *</label>
                      <input
                        type="email"
                        className={`w-full px-5 py-3.5 rounded-2xl border text-sm font-medium outline-none transition-all focus:ring-2 disabled:opacity-50
                          ${errors.email ? "border-red-300 ring-2 ring-red-100 focus:border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brandpurple focus:ring-brandpurple/30"}
                        `}
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (touched.email) setErrors((prev) => ({ ...prev, email: validate({ ...form, email: e.target.value }).email }));
                        }}
                        onBlur={() => handleBlur("email")}
                        disabled={submitting}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                          <ExclamationCircleIcon className="w-3 h-3 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-brandpurple text-white rounded-full font-extrabold shadow-lg shadow-brandpurple/20 hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {submitting ? "Unlocking..." : "Join Masterclass Now"}
                    </button>
                    <p className="text-[10px] text-neutral-400 text-center font-medium mt-2">
                      100% Free. We'll email you the link too.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-8">
                  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-green-500 uppercase tracking-widest mb-3 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
                    <CheckCircleIcon className="w-5 h-5" /> Access Unlocked
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-none mb-4">
                    Welcome to the Masterclass
                  </h1>
                  <p className="text-neutral-500 font-medium">Grab some notes. Let's start building.</p>
                </div>

                {/* Video Player Embed */}
                <div className="w-full max-w-4xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-neutral-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/zJSY8tbf_ys?si=oYxWzD_oH-b4A3t1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Upsell CTA */}
                <div className="mt-12 text-center bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-xl max-w-3xl mx-auto mb-4">
                  <h2 className="text-2xl font-black text-[#1B1C1E] mb-3">Want the Full Curriculum?</h2>
                  <p className="text-neutral-500 mb-6 max-w-xl mx-auto text-sm">
                    If you enjoyed this intro, you'll love our comprehensive 3-month Frontend Development certification program.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => { close(); router.push("/courses/fullstack-web-development"); }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B1C1E] text-white rounded-full font-extrabold shadow-lg hover:bg-neutral-800 transition-all hover:-translate-y-0.5 text-sm"
                    >
                      View Full Course Outline
                    </button>
                    <button
                      onClick={() => { close(); router.push("/contact"); }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1B1C1E] border-2 border-[#1B1C1E] rounded-full font-extrabold hover:bg-neutral-50 transition-all hover:-translate-y-0.5 text-sm"
                    >
                      Speak to Advisor
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
