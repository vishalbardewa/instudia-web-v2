"use client";

import { useState, useEffect } from "react";
import SeminarDateCalendar from "./SeminarDateCalendar";

interface HostSeminarFormProps {
  selectedTrack?: string;
  selectedFormat?: string;
}

const INSTITUTION_TYPES = [
  "College / University",
  "Higher Secondary / School",
  "Youth / Community Org",
  "Government / MSME",
  "Other",
];

const TRACK_OPTIONS = [
  {
    id: "smart-study-tools",
    title: "Smart Digital Tools & Smarter Study Habits",
    badge: "Study Habits",
    desc: "Chapter summaries, revision notes, safe technology habits",
  },
  {
    id: "software-engineering",
    title: "Software Development & Practical Coding",
    badge: "Coding Basics",
    desc: "Python fundamentals, web development, GitHub projects",
  },
  {
    id: "project-management",
    title: "Teamwork, Event Planning & Leadership",
    badge: "Student Councils",
    desc: "Campus event organization, Notion workspaces, teamwork",
  },
  {
    id: "nep-skill-development",
    title: "Digital Tools & Lesson Planning for Teachers",
    badge: "Faculty Training",
    desc: "Lesson prep, worksheet generation, classroom presentation tools",
  },
  {
    id: "custom-bootcamps",
    title: "Custom Workshops & Tailored Campus Programs",
    badge: "Custom Agenda",
    desc: "Tailored to your specific department, symposium, or camp",
  },
];

const DELIVERY_FORMATS = [
  {
    value: "Half-Day Interactive Session (2-3 Hours)",
    title: "Half-Day Interactive",
    duration: "2 - 3 Hours",
    tagline: "Auditorium Talk & Relatable Demos",
  },
  {
    value: "Full-Day Practical Workshop (5-6 Hours)",
    title: "Full-Day Workshop",
    duration: "5 - 6 Hours",
    tagline: "Hands-on Practice & Guided Exercises",
  },
  {
    value: "Multi-Day Intensive Workshop (2-5 Days)",
    title: "Multi-Day Intensive",
    duration: "2 - 5 Days",
    tagline: "Project Building & Certificates",
  },
  {
    value: "Year-Round Campus Partnership",
    title: "Campus Partnership",
    duration: "Semester / Year",
    tagline: "Continuous Student & Teacher Mentorship",
  },
];

const AUDIENCE_SIZES = [
  "50 - 100",
  "100 - 250",
  "250 - 500",
  "500+ Auditorium",
  "Faculty Group (< 50)",
];

const STEPS = [
  { id: 1, label: "Format & Topic", short: "01. Session" },
  { id: 2, label: "Institution & Contact", short: "02. Contact" },
  { id: 3, label: "Schedule & Details", short: "03. Schedule" },
  { id: 4, label: "Review & Confirm", short: "04. Preview" },
];

export default function HostSeminarForm({
  selectedTrack,
  selectedFormat,
}: HostSeminarFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    institutionName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    institutionType: INSTITUTION_TYPES[0],
    preferredTrack: selectedTrack || TRACK_OPTIONS[0].title,
    deliveryFormat: selectedFormat || DELIVERY_FORMATS[0].value,
    estimatedAudience: AUDIENCE_SIZES[1],
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [highlightNotice, setHighlightNotice] = useState<string | null>(null);

  // Listen to custom events from SeminarFormatsSection or SeminarTracksSection
  useEffect(() => {
    const handleFormatEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ format: string }>;
      if (customEvent.detail?.format) {
        setFormData((prev) => ({
          ...prev,
          deliveryFormat: customEvent.detail.format,
        }));
        setErrors((prev) => ({ ...prev, deliveryFormat: "" }));
        setCurrentStep(1);
        setHighlightNotice(
          `Selected format: ${customEvent.detail.format.split("(")[0].trim()}`
        );
        setTimeout(() => setHighlightNotice(null), 3000);
      }
    };

    const handleTrackEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ track: string }>;
      if (customEvent.detail?.track) {
        setFormData((prev) => ({
          ...prev,
          preferredTrack: customEvent.detail.track,
        }));
        setErrors((prev) => ({ ...prev, preferredTrack: "" }));
        setCurrentStep(1);
        setHighlightNotice(`Selected topic: ${customEvent.detail.track}`);
        setTimeout(() => setHighlightNotice(null), 3000);
      }
    };

    window.addEventListener("instudia-select-format", handleFormatEvent);
    window.addEventListener("instudia-select-track", handleTrackEvent);

    return () => {
      window.removeEventListener("instudia-select-format", handleFormatEvent);
      window.removeEventListener("instudia-select-track", handleTrackEvent);
    };
  }, []);

  // Validation functions
  const validateField = (name: string, value: string): string => {
    const trimmed = (value || "").trim();
    switch (name) {
      case "institutionName":
        if (!trimmed) return "Institution name is required.";
        if (trimmed.length < 3)
          return "Please enter a valid institution name (at least 3 characters).";
        return "";

      case "contactPerson":
        if (!trimmed) return "Coordinator / Contact person name is required.";
        if (trimmed.length < 2)
          return "Please enter a valid name (at least 2 characters).";
        return "";

      case "email":
        if (!trimmed) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
          return "Please enter a valid email address (e.g. name@college.edu.in).";
        }
        return "";

      case "phone": {
        const digits = (value || "").replace(/\D/g, "");
        if (!digits) return "Phone / WhatsApp number is required.";
        if (digits.length !== 10)
          return "Please enter a valid 10-digit phone number.";
        if (!/^[6-9]/.test(digits))
          return "Please enter a valid mobile number starting with 6, 7, 8, or 9.";
        return "";
      }

      case "deliveryFormat":
        if (!value) return "Please select a delivery format.";
        return "";

      case "preferredTrack":
        if (!value) return "Please select a workshop topic.";
        return "";

      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, (formData as any)[field] || "");
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if already touched
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  // Validate all fields in a specific step
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = { ...touched };

    if (stepNumber === 1) {
      const formatErr = validateField(
        "deliveryFormat",
        formData.deliveryFormat
      );
      const trackErr = validateField("preferredTrack", formData.preferredTrack);
      if (formatErr) newErrors.deliveryFormat = formatErr;
      if (trackErr) newErrors.preferredTrack = trackErr;
      newTouched.deliveryFormat = true;
      newTouched.preferredTrack = true;
    }

    if (stepNumber === 2) {
      const instErr = validateField(
        "institutionName",
        formData.institutionName
      );
      const contactErr = validateField(
        "contactPerson",
        formData.contactPerson
      );
      const emailErr = validateField("email", formData.email);
      const phoneErr = validateField("phone", formData.phone);

      if (instErr) newErrors.institutionName = instErr;
      if (contactErr) newErrors.contactPerson = contactErr;
      if (emailErr) newErrors.email = emailErr;
      if (phoneErr) newErrors.phone = phoneErr;

      newTouched.institutionName = true;
      newTouched.contactPerson = true;
      newTouched.email = true;
      newTouched.phone = true;
    }

    setTouched(newTouched);
    setErrors((prev) => ({ ...prev, ...newErrors }));

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleTabClick = (stepId: number) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    } else if (stepId > currentStep) {
      // Validate all intermediate steps before jumping forward
      let isValid = true;
      for (let s = currentStep; s < stepId; s++) {
        if (!validateStep(s)) {
          isValid = false;
          setCurrentStep(s);
          break;
        }
      }
      if (isValid) {
        setCurrentStep(stepId);
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Guard: Validate Step 1 and Step 2 completely
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep(2)) {
      setCurrentStep(2);
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/host-seminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.message ||
            "Failed to submit request. Please try again or reach out on WhatsApp."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "Network error. Please try again or reach out directly on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello instudia team! We would like to schedule an institutional seminar on "${formData.preferredTrack}" (${formData.deliveryFormat}) for ${formData.institutionName || "our institution"}. Could we discuss dates and syllabus?`
  );

  return (
    <div className="relative rounded-3xl bg-white p-6 sm:p-10 shadow-xl shadow-black/5 border border-neutral-200/80">
      {/* Top Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brandpurple animate-pulse" />
            <span>Booking Wizard</span>
          </div>

          <span className="text-xs font-mono text-neutral-400 font-bold">
            Step {currentStep} of 4
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] tracking-tight">
          {currentStep === 4 ? "Review Your Seminar Request" : "Request a Seminar at Your Campus"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed">
          {currentStep === 4
            ? "Please review your session details below before submitting. We will prepare an official proposal within 24 hours."
            : "Complete the quick steps below. You will be able to preview everything before submitting."}
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-3xl bg-emerald-50/80 border border-emerald-200 p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-5 font-black text-3xl shadow-lg shadow-emerald-500/20">
            ✓
          </div>
          <h4 className="text-2xl font-black text-emerald-950 tracking-tight">
            Seminar Request Received!
          </h4>
          <p className="mt-2 text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out for{" "}
            <strong>{formData.institutionName || "your institution"}</strong>. We
            will review your selected session (
            <em>{formData.preferredTrack}</em>) and send an official proposal letter.
          </p>

          {/* Booking Summary Card */}
          <div className="my-6 p-4 rounded-2xl bg-white/90 border border-emerald-200 text-left text-xs space-y-2 max-w-md mx-auto shadow-xs">
            <p className="text-neutral-600">
              <strong className="text-neutral-900">Format:</strong>{" "}
              {formData.deliveryFormat}
            </p>
            <p className="text-neutral-600">
              <strong className="text-neutral-900">Topic:</strong>{" "}
              {formData.preferredTrack}
            </p>
            <p className="text-neutral-600">
              <strong className="text-neutral-900">Coordinator:</strong>{" "}
              {formData.contactPerson} ({formData.phone})
            </p>
            {formData.preferredDate && (
              <p className="text-neutral-600">
                <strong className="text-neutral-900">Target Timeframe:</strong>{" "}
                {formData.preferredDate}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919366904494?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[#1EBE5D] transition-colors"
            >
              <span>Chat with Coordinator on WhatsApp</span>
              <span>↗</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setCurrentStep(1);
                setFormData({
                  institutionName: "",
                  contactPerson: "",
                  designation: "",
                  email: "",
                  phone: "",
                  institutionType: INSTITUTION_TYPES[0],
                  preferredTrack: TRACK_OPTIONS[0].title,
                  deliveryFormat: DELIVERY_FORMATS[0].value,
                  estimatedAudience: AUDIENCE_SIZES[1],
                  preferredDate: "",
                  message: "",
                });
                setErrors({});
                setTouched({});
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep < 4) {
              handleNext();
            } else {
              handleSubmit(e);
            }
          }}
          onKeyDown={(e) => {
            // Prevent accidental submit when pressing Enter on input fields before Preview step
            if (e.key === "Enter" && currentStep < 4) {
              e.preventDefault();
              handleNext();
            }
          }}
          noValidate
          className="space-y-6"
        >
          {/* TABULAR WIZARD STEPPER BAR */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200/80">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleTabClick(step.id)}
                  className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-1 sm:px-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#1B1C1E] text-white shadow-md shadow-black/10"
                      : isPast
                      ? "bg-white text-emerald-800 hover:bg-neutral-50"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-white/50"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono shrink-0 ${
                      isActive
                        ? "bg-brandpurple text-white font-black"
                        : isPast
                        ? "bg-emerald-500 text-white font-bold"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {isPast ? "✓" : step.id}
                  </span>
                  <span className="hidden md:inline truncate">{step.label}</span>
                  <span className="md:hidden text-[11px] truncate">{step.short}</span>
                </button>
              );
            })}
          </div>

          {/* Highlight notice when auto-selected */}
          {highlightNotice && (
            <div className="p-3 rounded-xl bg-brandpurple/10 border border-brandpurple/20 text-xs font-bold text-brandpurple flex items-center gap-2 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brandpurple animate-pulse" />
              <span>{highlightNotice}</span>
            </div>
          )}

          {/* STEP 1: Format & Track Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Delivery Format */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#1B1C1E]">
                    1. Choose Seminar / Workshop Format{" "}
                    <span className="text-brandpurple">*</span>
                  </label>
                  {touched.deliveryFormat && errors.deliveryFormat && (
                    <span className="text-[11px] font-bold text-red-600">
                      {errors.deliveryFormat}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DELIVERY_FORMATS.map((fmt) => {
                    const isSelected = formData.deliveryFormat === fmt.value;
                    return (
                      <button
                        key={fmt.value}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            deliveryFormat: fmt.value,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            deliveryFormat: "",
                          }));
                        }}
                        className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#1B1C1E] shadow-sm ring-2 ring-[#1B1C1E]"
                            : "bg-[#FAFAFA] border-neutral-200 hover:bg-white hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-black text-[#1B1C1E]">
                            {fmt.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                              isSelected
                                ? "bg-[#FFE01B] text-black border border-black font-black"
                                : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            {fmt.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-snug">
                          {fmt.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Workshop Topic */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#1B1C1E]">
                    2. Choose Workshop Topic{" "}
                    <span className="text-brandpurple">*</span>
                  </label>
                  {touched.preferredTrack && errors.preferredTrack && (
                    <span className="text-[11px] font-bold text-red-600">
                      {errors.preferredTrack}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {TRACK_OPTIONS.map((t) => {
                    const isSelected = formData.preferredTrack === t.title;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            preferredTrack: t.title,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            preferredTrack: "",
                          }));
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-start justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-white border-brandpurple shadow-sm ring-2 ring-brandpurple"
                            : "bg-[#FAFAFA] border-neutral-200 hover:bg-white hover:border-neutral-300"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold ${
                                isSelected
                                  ? "bg-brandpurple border-brandpurple text-white"
                                  : "border-neutral-300 bg-white text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                            <span className="text-xs sm:text-sm font-black text-[#1B1C1E]">
                              {t.title}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 pl-6 leading-relaxed">
                            {t.desc}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md hidden sm:inline-block">
                          {t.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Institution & Coordinator Details */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                Where should we visit?
              </p>

              {/* Institution Name */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  School / College / Organization Name{" "}
                  <span className="text-brandpurple">*</span>
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("institutionName")}
                  placeholder="e.g. Your College"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:outline-none transition-all ${
                    touched.institutionName && errors.institutionName
                      ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-neutral-200 bg-[#FAFAFA] focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10"
                  }`}
                />
                {touched.institutionName && errors.institutionName && (
                  <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.institutionName}
                  </p>
                )}
              </div>

              {/* Institution Type */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Institution Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {INSTITUTION_TYPES.map((type) => {
                    const isSelected = formData.institutionType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            institutionType: type,
                          }))
                        }
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-[#1B1C1E] text-white border-[#1B1C1E]"
                            : "bg-[#FAFAFA] text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Coordinator / Contact Person{" "}
                    <span className="text-brandpurple">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    onBlur={() => handleBlur("contactPerson")}
                    placeholder="e.g. Dr. Alem Jamir"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:outline-none transition-all ${
                      touched.contactPerson && errors.contactPerson
                        ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-neutral-200 bg-[#FAFAFA] focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10"
                    }`}
                  />
                  {touched.contactPerson && errors.contactPerson && (
                    <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.contactPerson}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Vice Principal / HOD"
                    className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10 focus:outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Official / Contact Email{" "}
                    <span className="text-brandpurple">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="coordinator@college.edu.in"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-neutral-200 bg-[#FAFAFA] focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10"
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Phone / WhatsApp Number{" "}
                    <span className="text-brandpurple">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const cleaned = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setFormData((prev) => ({ ...prev, phone: cleaned }));
                        if (touched.phone) {
                          const err = validateField("phone", cleaned);
                          setErrors((prev) => ({ ...prev, phone: err }));
                        }
                      }}
                      onBlur={() => handleBlur("phone")}
                      placeholder="98765 43210"
                      className={`w-full rounded-xl border pl-12 pr-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:outline-none transition-all ${
                        touched.phone && errors.phone
                          ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-neutral-200 bg-[#FAFAFA] focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10"
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Audience & Schedule Details */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                Audience &amp; Planning
              </p>

              {/* Audience Size */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  Estimated Attendees / Batch Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCE_SIZES.map((size) => {
                    const isSelected = formData.estimatedAudience === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            estimatedAudience: size,
                          }))
                        }
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-brandpurple text-white border-brandpurple shadow-xs"
                            : "bg-[#FAFAFA] text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Date Calendar */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  Preferred Date or Target Timeframe
                </label>
                <SeminarDateCalendar
                  value={formData.preferredDate}
                  onChange={(dateStr) =>
                    setFormData((prev) => ({ ...prev, preferredDate: dateStr }))
                  }
                />
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Specific Department Focus or Custom Notes (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. Focused on Class 11-12 Commerce, BCA students, or teacher enablement..."
                  className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#1B1C1E] placeholder-neutral-400 focus:border-brandpurple focus:bg-white focus:ring-2 focus:ring-brandpurple/10 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Dedicated Preview State Before Final Submission */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl bg-neutral-50/80 border border-neutral-200 p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">
                      Seminar Request Proposal Summary
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    Ready to Submit
                  </span>
                </div>

                {/* Section 1: Session Details */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[10px] uppercase font-bold">
                    <span>1. Workshop Session</span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-brandpurple hover:underline cursor-pointer"
                    >
                      Edit ✎
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80">
                    <p className="font-black text-[#1B1C1E] text-sm">
                      {formData.preferredTrack}
                    </p>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      Format: <strong className="text-neutral-800">{formData.deliveryFormat}</strong>
                    </p>
                  </div>
                </div>

                {/* Section 2: Institution & Coordinator */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[10px] uppercase font-bold">
                    <span>2. Institution &amp; Coordinator</span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-brandpurple hover:underline cursor-pointer"
                    >
                      Edit ✎
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Institution:</span>
                      <span className="font-bold text-neutral-900">{formData.institutionName}</span>
                      <span className="text-[10px] text-neutral-500 block">({formData.institutionType})</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Coordinator:</span>
                      <span className="font-bold text-neutral-900">{formData.contactPerson}</span>
                      {formData.designation && (
                        <span className="text-[10px] text-neutral-500 block">{formData.designation}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Email:</span>
                      <span className="font-mono text-neutral-800">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Phone / WhatsApp:</span>
                      <span className="font-mono font-bold text-neutral-900">+91 {formData.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Audience & Notes */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[10px] uppercase font-bold">
                    <span>3. Logistics &amp; Custom Notes</span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-brandpurple hover:underline cursor-pointer"
                    >
                      Edit ✎
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 text-xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-neutral-600">
                        <span className="text-neutral-400">Batch Size:</span>{" "}
                        <strong className="text-neutral-900">{formData.estimatedAudience} Students</strong>
                      </p>
                      <p className="text-neutral-600">
                        <span className="text-neutral-400">Target Timeframe:</span>{" "}
                        <strong className="text-neutral-900">
                          {formData.preferredDate || "To be discussed"}
                        </strong>
                      </p>
                    </div>
                    {formData.message && (
                      <div className="pt-2 border-t border-neutral-100">
                        <span className="text-neutral-400 text-[10px] block">Special Requirements:</span>
                        <p className="text-neutral-700 italic mt-0.5">{formData.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submission Error Banner */}
          {status === "error" && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-700 animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* STEP NAVIGATION CONTROLS */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <span>← Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1B1C1E] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-brandpurple transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{currentStep === 3 ? "Review & Preview Request" : "Continue"}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brandpurple px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-brandpurple/20 hover:bg-brandpurple/90 focus:outline-none disabled:opacity-50 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Submitting Official Request...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Submit Request</span>
                    <span>→</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
