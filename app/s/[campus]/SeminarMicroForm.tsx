"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { trackSeminarSubmission } from "@/app/utils/pixelTracking";
import { generateAndDownloadCertificate } from "@/app/utils/certificateGenerator";

interface SeminarMicroFormProps {
  campusSlug: string;
  campusName: string;
  date: string;
  topic: string;
  courseOptions: string[];
}

const RATING_LABELS: Record<number, string> = {
  1: "Needs improvement",
  2: "Okay",
  3: "Good session",
  4: "Great session!",
  5: "Loved it!",
};

function formatReadableDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SeminarMicroForm({
  campusSlug,
  campusName,
  date,
  topic,
  courseOptions,
}: SeminarMicroFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [courseInterest, setCourseInterest] = useState("");
  const [feedback, setFeedback] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alreadySubmittedNotice, setAlreadySubmittedNotice] = useState(false);
  const [completedData, setCompletedData] = useState<{
    certificateId: string;
    studentName: string;
  } | null>(null);

  const storageKey = `instudia_cert_${campusSlug.toLowerCase()}_${date}_${topic.trim().toLowerCase()}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.certificateId && parsed?.studentName) {
          setCompletedData(parsed);
          setAlreadySubmittedNotice(true);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, [storageKey]);

  const activeRating = hoveredRating ?? rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/seminar-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          rating,
          courseInterest,
          feedback,
          campus: campusName,
          campusSlug,
          date,
          topic,
          website,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrorMsg(result.message || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const isDuplicate = Boolean(result.alreadySubmitted);

      // 1. Fire Meta & Google Pixels only on fresh submissions (no double-counting)
      if (!isDuplicate) {
        trackSeminarSubmission({
          campus: campusName,
          topic,
          date,
          courseInterest,
          rating,
        });
      }

      // 2. Auto-trigger PDF certificate download (uses original Certificate ID if duplicate)
      const certId = result.certificateId || "INS-2026-CERT";
      const resolvedName = (result.name || name).trim();
      await generateAndDownloadCertificate({
        studentName: resolvedName,
        campus: result.campus || campusName,
        topic: result.topic || topic,
        date: result.date || date,
        certificateId: certId,
      });

      const certRecord = {
        certificateId: certId,
        studentName: resolvedName,
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(certRecord));
      } catch {
        // Ignore storage write errors
      }

      setAlreadySubmittedNotice(isDuplicate);
      setCompletedData(certRecord);
    } catch (err) {
      console.error("[SeminarMicroForm] Submit failed:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedownload = async () => {
    if (!completedData) return;
    await generateAndDownloadCertificate({
      studentName: completedData.studentName,
      campus: campusName,
      topic,
      date,
      certificateId: completedData.certificateId,
    });
  };

  return (
    <main className="min-h-screen bg-[#1E1B2E] text-white flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white font-black text-sm">
              i
            </span>
            <span>instudia</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium text-indigo-200">
            <AcademicCapIcon className="h-3.5 w-3.5 text-amber-400" />
            Instant Certificate
          </span>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white text-slate-900 shadow-2xl overflow-hidden border border-white/10">
          {/* Auto-tagged Seminar Context Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white">
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 mb-1">
              Seminar Session Verified
            </p>
            <h1 className="text-lg sm:text-xl font-bold leading-snug">
              {topic}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-indigo-100">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPinIcon className="h-4 w-4 text-amber-300 shrink-0" />
                {campusName}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CalendarDaysIcon className="h-4 w-4 text-amber-300 shrink-0" />
                {formatReadableDate(date)}
              </span>
            </div>
          </div>

          {!completedData ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {errorMsg && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  How was today&apos;s seminar?
                </label>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = star <= activeRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                          aria-label={`Rate ${star} out of 5`}
                          className="p-1 transition-transform active:scale-90 focus:outline-none"
                        >
                          {filled ? (
                            <StarIcon className="h-7 w-7 text-amber-400" />
                          ) : (
                            <StarOutlineIcon className="h-7 w-7 text-slate-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-semibold text-indigo-600">
                    {RATING_LABELS[activeRating]}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Full Name{" "}
                  <span className="font-normal text-slate-500 text-xs">
                    (printed on your certificate)
                  </span>
                </label>
                <input
                  id="student-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Imkongakum Jamir"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="student-email"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-phone"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    WhatsApp / Phone
                  </label>
                  <input
                    id="student-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98620 XXXXX"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Course / Skill Interest */}
              <div>
                <label
                  htmlFor="course-interest"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Skill or Course You&apos;re Interested In{" "}
                  <span className="font-normal text-slate-500 text-xs">
                    (optional)
                  </span>
                </label>
                <select
                  id="course-interest"
                  value={courseInterest}
                  onChange={(e) => setCourseInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                >
                  <option value="">Just exploring / Not sure yet</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Feedback */}
              <div>
                <label
                  htmlFor="student-feedback"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Key Takeaway or Feedback{" "}
                  <span className="font-normal text-slate-500 text-xs">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="student-feedback"
                  rows={2}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What did you find most useful today?"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Generating Certificate...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 text-amber-300" />
                    Submit Feedback &amp; Download Certificate
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 sm:p-8 text-center space-y-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircleIcon className="h-9 w-9" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {alreadySubmittedNotice
                    ? "Certificate Already Issued"
                    : "Certificate Downloaded!"}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600">
                  {alreadySubmittedNotice ? (
                    <>
                      Welcome back,{" "}
                      <span className="font-semibold text-slate-900">
                        {completedData.studentName}
                      </span>
                      . A certificate for{" "}
                      <span className="font-medium text-slate-800">{topic}</span>{" "}
                      was already generated for your email/phone. You can
                      re-download your original copy below.
                    </>
                  ) : (
                    <>
                      Thank you,{" "}
                      <span className="font-semibold text-slate-900">
                        {completedData.studentName}
                      </span>
                      . Your participation certificate for{" "}
                      <span className="font-medium text-slate-800">{topic}</span>{" "}
                      has been saved to your device.
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-600">
                Certificate ID:{" "}
                <span className="font-mono font-bold text-slate-900">
                  {completedData.certificateId}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleRedownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-3 text-sm font-bold text-white transition cursor-pointer"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Download Again
                </button>
                <Link
                  href="/courses"
                  className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Powered by{" "}
          <Link href="/" className="text-indigo-300 hover:underline font-medium">
            instudia
          </Link>{" "}
          • Dimapur, Nagaland
        </p>
      </div>
    </main>
  );
}

