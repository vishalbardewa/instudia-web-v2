"use client";

import React, { useState, useEffect, Suspense, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon as StarSolid,
  SparklesIcon as SparklesSolid,
} from "@heroicons/react/24/solid";
import {
  StarIcon as StarOutline,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ArrowPathIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  COURSE_OPTIONS,
  STUDENT_SMART_TAGS,
  PARENT_SMART_TAGS,
  STUDENT_ISSUE_TAGS,
  PARENT_ISSUE_TAGS,
  generateReviewDraft,
  GOOGLE_REVIEW_URL,
} from "./reviewConstants";
import SearchableCourseSelect from "./SearchableCourseSelect";

const TOTAL_STEPS = 5;

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ReviewFormContent() {
  const searchParams = useSearchParams();

  // Navigation & Step State (1 to 5)
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);

  // 1. Role State: "student" | "parent"
  const initialRoleParam = searchParams.get("role")?.toLowerCase();
  const [role, setRole] = useState<"student" | "parent">(
    initialRoleParam === "parent" ? "parent" : "student"
  );

  // 2. Course Selection State
  const initialCourseParam = searchParams.get("course")?.toLowerCase();
  const matchedCourse = useMemo(() => {
    if (!initialCourseParam) return "";
    const found = COURSE_OPTIONS.find(
      (c) =>
        c.slug.toLowerCase() === initialCourseParam ||
        c.title.toLowerCase().includes(initialCourseParam)
    );
    return found ? found.title : "";
  }, [initialCourseParam]);

  const [selectedCourse, setSelectedCourse] = useState<string>(
    matchedCourse || COURSE_OPTIONS[0].title
  );

  // 3. Rating State (1 to 5) - autofilled from query param or defaults to 5
  const initialRatingParam = searchParams.get("rating") || searchParams.get("stars");
  const parsedRating = initialRatingParam ? parseInt(initialRatingParam, 10) : 5;
  const initialRating =
    !isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5 ? parsedRating : 5;
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // 4. Tags State - pre-populate top 2 smart tags by default so the review draft is immediately rich & specific
  const initialTagsParam = searchParams.get("tags");
  const defaultSmartTags =
    (initialRoleParam === "parent" ? "parent" : "student") === "parent"
      ? [PARENT_SMART_TAGS[0], PARENT_SMART_TAGS[1]]
      : [STUDENT_SMART_TAGS[0], STUDENT_SMART_TAGS[1]];
  const initialTags = initialTagsParam
    ? initialTagsParam.split(",").map((t) => t.trim()).filter(Boolean)
    : defaultSmartTags;
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  // 5. Dynamic draft seed (ensures reviews are different every time)
  const [draftSeed, setDraftSeed] = useState<number>(() =>
    Math.floor(Math.random() * 10000)
  );

  // 6. Review text & manual edit flag - autofilled from param or freshly generated
  const initialTextParam =
    searchParams.get("text") || searchParams.get("feedback") || "";
  const [hasManuallyEdited, setHasManuallyEdited] = useState<boolean>(
    Boolean(initialTextParam)
  );
  const [reviewText, setReviewText] = useState<string>(() => {
    if (initialTextParam) return initialTextParam;
    return generateReviewDraft({
      role: initialRoleParam === "parent" ? "parent" : "student",
      courseTitle: matchedCourse || COURSE_OPTIONS[0].title,
      selectedTags: initialTags,
      rating: initialRating,
      seed: Math.floor(Math.random() * 10000),
    });
  });

  // 7. User Details (prefilled from query params if passed)
  const initialNameParam = searchParams.get("name") || "";
  const initialPhoneParam =
    searchParams.get("phone") || searchParams.get("mobile") || "";
  const initialEmailParam = searchParams.get("email") || "";
  const [name, setName] = useState<string>(initialNameParam);
  const [phone, setPhone] = useState<string>(initialPhoneParam);
  const [email, setEmail] = useState<string>(initialEmailParam);
  const [honeypot, setHoneypot] = useState<string>("");

  // 8. Submission & UI State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Determine active smart tags based on role & rating
  const activeSmartTags = role === "student" ? STUDENT_SMART_TAGS : PARENT_SMART_TAGS;
  const activeIssueTags = role === "student" ? STUDENT_ISSUE_TAGS : PARENT_ISSUE_TAGS;
  const currentTags = rating >= 4 ? activeSmartTags : activeIssueTags;

  // Auto-generate review draft when tags, role, course, or rating change
  useEffect(() => {
    if (!hasManuallyEdited) {
      const generated = generateReviewDraft({
        role,
        courseTitle: selectedCourse,
        selectedTags,
        rating,
        seed: draftSeed,
      });
      setReviewText(generated);
    }
  }, [role, selectedCourse, selectedTags, rating, draftSeed, hasManuallyEdited]);

  // Focus name input when navigating to step 5
  useEffect(() => {
    if (step === 5) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 350);
    }
  }, [step]);

  // Navigation handlers
  const goToNextStep = () => {
    setErrorMessage("");
    if (step === 5) {
      return;
    }
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goToPrevStep = () => {
    setErrorMessage("");
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Tag toggle with automatic fresh seed
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      const nextSeed = draftSeed + 3;
      setDraftSeed(nextSeed);
      const draft = generateReviewDraft({
        role,
        courseTitle: selectedCourse,
        selectedTags: next,
        rating,
        seed: nextSeed,
      });
      setReviewText(draft);
      setHasManuallyEdited(false);
      return next;
    });
  };

  // Shuffle draft to another phrasing
  const handleShuffleDraft = () => {
    const nextSeed = draftSeed + 7;
    setDraftSeed(nextSeed);
    const draft = generateReviewDraft({
      role,
      courseTitle: selectedCourse,
      selectedTags,
      rating,
      seed: nextSeed,
    });
    setReviewText(draft);
    setHasManuallyEdited(false);
  };

  // Reset to auto-generated draft
  const handleRegenerateDraft = () => {
    const draft = generateReviewDraft({
      role,
      courseTitle: selectedCourse,
      selectedTags,
      rating,
      seed: draftSeed,
    });
    setReviewText(draft);
    setHasManuallyEdited(false);
  };

  // Copy to clipboard helper
  const handleCopyReview = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(reviewText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3500);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = reviewText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#C21BFF", "#bcff50", "#ff6bdf", "#444cf7", "#FFE01B", "#1B1C1E"],
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }
  };

  // Role select with auto-advance and smart autofill
  const handleSelectRole = (chosenRole: "student" | "parent") => {
    setRole(chosenRole);
    const newDefaultTags =
      chosenRole === "parent"
        ? [PARENT_SMART_TAGS[0], PARENT_SMART_TAGS[1]]
        : [STUDENT_SMART_TAGS[0], STUDENT_SMART_TAGS[1]];
    setSelectedTags(newDefaultTags);
    setHasManuallyEdited(false);
    setTimeout(() => {
      setDirection(1);
      setStep(2);
    }, 220);
  };

  // Rating select with auto-advance and smart autofill
  const handleSelectRating = (stars: number) => {
    setRating(stars);
    const tagsForRating =
      stars >= 4
        ? role === "student"
          ? [STUDENT_SMART_TAGS[0], STUDENT_SMART_TAGS[1]]
          : [PARENT_SMART_TAGS[0], PARENT_SMART_TAGS[1]]
        : [];
    setSelectedTags(tagsForRating);
    setHasManuallyEdited(false);
    setTimeout(() => {
      setDirection(1);
      setStep(4);
    }, 320);
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (honeypot) return;

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!reviewText.trim()) {
      setErrorMessage("Please write or generate your review text before posting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role,
          course: selectedCourse,
          rating,
          smartTags: selectedTags,
          feedback: reviewText.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit. Please try again.");
      }

      setSubmissionSuccess(true);
      if (rating >= 4) {
        handleCopyReview();
        triggerConfetti();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (submissionSuccess) return;

      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (e.key === "Enter" && !e.shiftKey) {
        if (isInput && target.tagName === "TEXTAREA") return;
        if (step < 5) {
          e.preventDefault();
          goToNextStep();
        }
        return;
      }

      if (!isInput) {
        if (step === 1) {
          if (e.key === "1" || e.key.toLowerCase() === "a") {
            handleSelectRole("student");
          } else if (e.key === "2" || e.key.toLowerCase() === "b") {
            handleSelectRole("parent");
          }
        }

        if (step === 3) {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= 5) {
            handleSelectRating(num);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, submissionSuccess, role, selectedCourse]);

  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* SUCCESS / ROUTING SCREEN */}
      {submissionSuccess ? (
        rating >= 4 ? (
          /* 4–5 STARS: POSITIVE GOOGLE REVIEW CELEBRATION */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border-2 border-neutral-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[4px_4px_0_#1B1C1E] sm:shadow-[8px_8px_0_#1B1C1E] text-center"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#F3E8FF] border-2 border-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[3px_3px_0_#C21BFF] sm:shadow-[4px_4px_0_#C21BFF]">
              <SparklesSolid className="w-8 h-8 sm:w-11 sm:h-11 text-brandpurple" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full mb-2 sm:mb-3">
              Review Ready to Post
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2">
              Thank you, {name.split(" ")[0]}!
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
              Your review text has been copied to your clipboard. Now, simply paste it on Google to share your experience with other students and parents!
            </p>

            {/* Review Text Preview Box */}
            <div
              data-lenis-prevent
              className="relative bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-left mb-5 sm:mb-6 max-h-52 sm:max-h-60 overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 truncate mr-2">
                  Your Review ({selectedCourse})
                </span>
                <button
                  type="button"
                  onClick={handleCopyReview}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandpurple hover:text-brandpurple/80 transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md hover:bg-brandpurple/10 active:scale-95"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-4 h-4" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-neutral-800 text-xs sm:text-sm md:text-base leading-relaxed italic">
                &ldquo;{reviewText}&rdquo;
              </p>
            </div>

            {/* Prominent Google Reviews CTA */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#1B1C1E] hover:bg-neutral-800 text-white font-black text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-neutral-900 shadow-[4px_4px_0_#C21BFF] sm:shadow-[6px_6px_0_#C21BFF] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all mb-4"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Paste &amp; Post on Google Reviews</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </a>

            {/* 3 Step Helper Guide (Responsive Flow) */}
            <div className="pt-3.5 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs text-neutral-500 text-left sm:text-center">
              <span className="flex items-center gap-1.5 sm:justify-center">
                <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Tap button above</span>
              </span>
              <span className="flex items-center gap-1.5 sm:justify-center">
                <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Tap {rating} Star{rating > 1 ? "s" : ""} on Google</span>
              </span>
              <span className="flex items-center gap-1.5 sm:justify-center">
                <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Paste review &amp; Post!</span>
              </span>
            </div>
          </motion.div>
        ) : (
          /* 1–3 STARS: PRIVATE DIRECT LEADERSHIP FEEDBACK (NEVER GOES TO GOOGLE) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border-2 border-neutral-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[4px_4px_0_#1B1C1E] sm:shadow-[8px_8px_0_#1B1C1E] text-center"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-amber-50 border-2 border-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[3px_3px_0_#F59E0B] sm:shadow-[4px_4px_0_#F59E0B]">
              <ShieldCheckIcon className="w-8 h-8 sm:w-11 sm:h-11 text-amber-600" />
            </div>

            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full mb-2 sm:mb-3 border border-amber-300">
              Feedback Sent Privately
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2">
              Thank you for your feedback, {name.split(" ")[0]}
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
              Your feedback has been sent directly to our leadership team. We take every concern seriously and will review your comments to improve our institute.
            </p>

            {/* Private Feedback Preview Box */}
            <div
              data-lenis-prevent
              className="relative bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-left mb-5 sm:mb-6 max-h-52 sm:max-h-60 overflow-y-auto overscroll-contain"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Your Private Message ({selectedCourse})
              </span>
              <p className="text-neutral-800 text-xs sm:text-sm md:text-base leading-relaxed italic">
                &ldquo;{reviewText}&rdquo;
              </p>
            </div>

            {/* Go to Home Action */}
            <div className="mb-4">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1B1C1E] hover:bg-neutral-800 text-white font-black text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-neutral-900 shadow-[4px_4px_0_#1B1C1E] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brandpurple" />
                <span>Go to Home</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-neutral-100 text-center">
              <span className="text-[11px] text-neutral-400">
                Your feedback is 100% confidential and was not submitted to public search listings.
              </span>
            </div>
          </motion.div>
        )
      ) : (
        /* STEPPER CONTAINER (TYPEFORM STYLE) */
        <div className="bg-white border-2 border-neutral-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-[4px_4px_0_#1B1C1E] sm:shadow-[8px_8px_0_#1B1C1E] relative flex flex-col min-h-[460px] sm:min-h-[500px]">
          {/* Honeypot anti-spam field */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* TOP STEPPER NAVIGATION HEADER */}
          <div className="mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between gap-2 mb-3">
              {/* Left: Back Button */}
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
                  Step 01 / 0{TOTAL_STEPS}
                </span>
              )}

              {/* Center: Stepper Dots & Step Count */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (i < step || (step === 1 && i === 2)) {
                          setDirection(i > step ? 1 : -1);
                          setStep(i);
                        }
                      }}
                      disabled={i > step}
                      aria-label={`Go to step ${i}`}
                      className={`transition-all rounded-full ${
                        i === step
                          ? "w-5 sm:w-6 h-2 bg-brandpurple"
                          : i < step
                          ? "w-2 h-2 bg-neutral-900 hover:bg-brandpurple cursor-pointer"
                          : "w-2 h-2 bg-neutral-200 cursor-not-allowed"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-black text-brandpurple hidden sm:inline-block">
                  {progressPercent}%
                </span>
              </div>

              {/* Right: Next & Continue Navigation Button on Top */}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-black text-white bg-[#1B1C1E] hover:bg-neutral-800 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-neutral-900 shadow-[3px_3px_0_#C21BFF] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg bg-[#F3E8FF] text-brandpurple border border-brandpurple/20">
                  Step 5 of 5
                </span>
              )}
            </div>

            {/* Animated Progress Bar */}
            <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brandpurple rounded-full"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* ANIMATED STEP CONTENT */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1: ROLE SELECTION */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F3E8FF] border border-brandpurple/30 text-brandpurple text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
                      <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Step 1 • Your Role
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      Who is leaving this review?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                      Select your role to personalize the review draft.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                    {/* Option A: Student */}
                    <button
                      type="button"
                      onClick={() => handleSelectRole("student")}
                      className={`group p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer relative active:scale-[0.98] ${
                        role === "student"
                          ? "border-neutral-900 bg-[#1B1C1E] text-white shadow-[4px_4px_0_#C21BFF] sm:shadow-[6px_6px_0_#C21BFF]"
                          : "border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-900 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${
                            role === "student"
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-white border-neutral-200 text-brandpurple"
                          }`}
                        >
                          <AcademicCapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span
                          className={`hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                            role === "student"
                              ? "bg-white/20 border-white/30 text-white"
                              : "bg-neutral-200 border-neutral-300 text-neutral-600"
                          }`}
                        >
                          Key: A
                        </span>
                      </div>
                      <h3 className="font-black text-base sm:text-lg mb-0.5 sm:mb-1">
                        Student / Alumni
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          role === "student" ? "text-neutral-300" : "text-neutral-500"
                        }`}
                      >
                        I enrolled and attended classes at instudia Dimapur.
                      </p>
                    </button>

                    {/* Option B: Parent */}
                    <button
                      type="button"
                      onClick={() => handleSelectRole("parent")}
                      className={`group p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer relative active:scale-[0.98] ${
                        role === "parent"
                          ? "border-neutral-900 bg-[#1B1C1E] text-white shadow-[4px_4px_0_#C21BFF] sm:shadow-[6px_6px_0_#C21BFF]"
                          : "border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-900 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${
                            role === "parent"
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-white border-neutral-200 text-brandpurple"
                          }`}
                        >
                          <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span
                          className={`hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                            role === "parent"
                              ? "bg-white/20 border-white/30 text-white"
                              : "bg-neutral-200 border-neutral-300 text-neutral-600"
                          }`}
                        >
                          Key: B
                        </span>
                      </div>
                      <h3 className="font-black text-base sm:text-lg mb-0.5 sm:mb-1">
                        Parent / Guardian
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          role === "parent" ? "text-neutral-300" : "text-neutral-500"
                        }`}
                      >
                        My child completed or is currently taking training at instudia.
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: COURSE SELECTION */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F3E8FF] border border-brandpurple/30 text-brandpurple text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
                      <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Step 2 • Course Catalog
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      Which course or program?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                      Search or choose the program {role === "parent" ? "your child attended" : "you enrolled in"}.
                    </p>
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <SearchableCourseSelect
                      selectedCourse={selectedCourse}
                      onSelectCourse={(courseTitle) => {
                        setSelectedCourse(courseTitle);
                        setHasManuallyEdited(false);
                      }}
                      role={role}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: STAR RATING */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4 sm:space-y-6 text-center"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F3E8FF] border border-brandpurple/30 text-brandpurple text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
                      <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Step 3 • Overall Rating
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      How was your overall experience?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                      Tap a star rating <span className="hidden sm:inline">(or press keys 1 to 5)</span>.
                    </p>
                  </div>

                  <div className="py-2 sm:py-4">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-4 my-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleSelectRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            aria-label={`${star} star rating`}
                            className="p-1 sm:p-2 rounded-xl sm:rounded-2xl transition-transform hover:scale-115 active:scale-90 focus:outline-hidden cursor-pointer"
                          >
                            {isActive ? (
                              <StarSolid className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 drop-shadow-md" />
                            ) : (
                              <StarOutline className="w-10 h-10 sm:w-14 sm:h-14 text-neutral-300 hover:text-amber-300 transition-colors" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                        {rating === 5 && "⭐ Outstanding (5/5)"}
                        {rating === 4 && "⭐ Very Good (4/5)"}
                        {rating === 3 && "Average (3/5)"}
                        {rating === 2 && "Below Expectations (2/5)"}
                        {rating === 1 && "Unsatisfactory (1/5)"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SMART TAGS & REVIEW DRAFT */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F3E8FF] border border-brandpurple/30 text-brandpurple text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
                      <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Step 4 • Review Draft
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      {rating >= 4 ? "What made it great?" : "What influenced your rating?"}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                      Tap highlights to adapt your draft, or edit directly below.
                    </p>
                  </div>

                  {/* SMART TAGS CHIPS */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer active:scale-95 ${
                            isSelected
                              ? "bg-brandpurple text-white border-brandpurple shadow-2xs scale-102"
                              : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100"
                          }`}
                        >
                          {isSelected ? (
                            <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          )}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* REVIEW TEXT AREA */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-600">
                        Your Editable Review Text:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleShuffleDraft}
                          className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-brandpurple hover:text-brandpurple/80 bg-[#F3E8FF] px-2 sm:px-2.5 py-1 rounded-lg border border-brandpurple/20 transition-all hover:bg-brandpurple hover:text-white cursor-pointer active:scale-95 shadow-2xs"
                          title="Generate another unique phrasing"
                        >
                          <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Shuffle</span>
                        </button>

                        {hasManuallyEdited && (
                          <button
                            type="button"
                            onClick={handleRegenerateDraft}
                            className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-neutral-500 hover:text-neutral-800 hover:underline cursor-pointer active:scale-95"
                          >
                            <ArrowPathIcon className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        data-lenis-prevent
                        rows={5}
                        required
                        value={reviewText}
                        onChange={(e) => {
                          setReviewText(e.target.value);
                          setHasManuallyEdited(true);
                        }}
                        placeholder="Share a few lines about your course, mentors, or overall experience..."
                        className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-base sm:text-sm text-neutral-800 leading-relaxed focus:outline-hidden focus:border-brandpurple focus:bg-white transition-all resize-y min-h-[130px] sm:min-h-[140px] overflow-y-auto overscroll-contain"
                      />
                    </div>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-neutral-400 text-right font-mono">
                      {reviewText.length} characters
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: SUBMITTER DETAILS & POST */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F3E8FF] border border-brandpurple/30 text-brandpurple text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
                      <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Step 5 • Final Step
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      {rating >= 4 ? "Who is writing this review?" : "Who is submitting this feedback?"}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                      {rating >= 4
                        ? "Your name will accompany your Google review."
                        : "Your feedback will be delivered directly and privately to instudia leadership."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sentila Jamir"
                        className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-brandpurple focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-700 mb-1">
                        Phone or WhatsApp Number{" "}
                        <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-brandpurple focus:bg-white transition-all"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                        {errorMessage}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 sm:gap-2.5 border-2 bg-[#1B1C1E] hover:bg-neutral-800 text-white border-neutral-900 shadow-[4px_4px_0_#C21BFF] sm:shadow-[6px_6px_0_#C21BFF] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                            <span>{rating >= 4 ? "Preparing your review..." : "Sending your feedback..."}</span>
                          </>
                        ) : rating >= 4 ? (
                          <>
                            <span>Post Review on Google</span>
                            <span className="text-brandpurple">→</span>
                          </>
                        ) : (
                          <>
                            <span>Send Private Feedback to Leadership</span>
                            <span className="text-amber-400">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM STEPPER FOOTER (KEYBOARD TIP ON DESKTOP) */}
          {step < 5 ? (
            <div className="pt-3 sm:pt-4 mt-4 sm:mt-6 border-t border-neutral-100 hidden sm:flex items-center justify-center text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5">
                <span>Tip: Press</span>
                <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-[10px] font-mono font-bold text-neutral-700">
                  Enter ↵
                </kbd>
                <span>to continue</span>
              </span>
            </div>
          ) : (
            <div className="pt-3 mt-4 border-t border-neutral-100 text-center">
              <span className="text-[11px] text-neutral-400 font-medium">
                {rating >= 4
                  ? "Your review will be copied to your clipboard to paste on Google Reviews."
                  : "Your feedback is 100% confidential and sent directly to our leadership team."}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ReviewForm() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-2xl mx-auto bg-white border-2 border-neutral-200 rounded-3xl p-8 text-center animate-pulse min-h-[480px] flex flex-col justify-center">
          <div className="w-12 h-12 bg-neutral-200 rounded-full mx-auto mb-4" />
          <div className="h-6 bg-neutral-200 rounded-md w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-neutral-100 rounded-md w-1/2 mx-auto" />
        </div>
      }
    >
      <ReviewFormContent />
    </Suspense>
  );
}
