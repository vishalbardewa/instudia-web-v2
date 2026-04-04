"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface EnquiryFormProps {
  courseName?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  phone: string;
  email: string;
  courseName: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  courseName?: string;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
        {label} {required && <span className="text-brandpurple">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-5 py-4 rounded-2xl border text-sm font-medium text-[#1B1C1E] placeholder-neutral-300
          bg-white transition-all outline-none
          focus:ring-2 focus:ring-brandpurple/30 focus:border-brandpurple
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-300 ring-2 ring-red-100" : "border-neutral-200 hover:border-neutral-300"}
        `}
      />
      {error && (
        <p className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
          <ExclamationCircleIcon className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm({ courseName = "" }: EnquiryFormProps) {
  const [state, setState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [fields, setFields] = React.useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    courseName,
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validate = (f: FormFields): FormErrors => {
    const e: FormErrors = {};
    if (!f.name.trim()) e.name = "Full name is required.";
    if (!f.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
    if (!f.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
    if (!f.courseName.trim()) e.courseName = "Please specify a course.";
    return e;
  };

  const handleChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (touched[field]) {
      const newErrors = validate({ ...fields, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof FormFields) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, phone: true, email: true, courseName: true };
    setTouched(allTouched);
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setState("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.ok) {
        setState("success");
      } else {
        setErrorMessage(data.message ?? "Something went wrong.");
        setState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  const disabled = state === "submitting";

  return (
    <section className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brandpurple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Copy */}
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-[#1B1C1E] tracking-tighter uppercase leading-[1.05] mb-6"
            >
              Have a<br />
              <span className="text-neutral-200">Question?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-neutral-500 leading-relaxed"
            >
              Our admissions team typically responds within 24 hours. Fill in your details and we'll reach out with everything you need to know.
            </motion.p>

            <div className="mt-10 flex flex-col gap-5">
              {[
                { label: "Admissions", value: "+91 8798 587779" },
                { label: "Email", value: "hello@instudianagaland.com" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-[#1B1C1E]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-8 bg-white rounded-[2.5rem] border border-neutral-100 p-10 lg:p-14 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-brandpurple/10 flex items-center justify-center">
                    <CheckCircleIcon className="w-10 h-10 text-brandpurple" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1B1C1E] tracking-tight mb-2">Enquiry Received!</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mx-auto">
                      Thanks, <strong>{fields.name.split(" ")[0]}</strong>! We'll be in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setState("idle"); setFields({ name: "", phone: "", email: "", courseName, message: "" }); setTouched({}); setErrors({}); }}
                    className="text-xs font-black text-brandpurple uppercase tracking-widest hover:underline"
                  >
                    Submit another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-6"
                >
                  {state === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
                      <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="enq-name"
                      label="Full Name"
                      value={fields.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      error={errors.name}
                      placeholder="e.g. Vishal Bardewa"
                      disabled={disabled}
                      required
                    />
                    <InputField
                      id="enq-phone"
                      label="Phone Number"
                      type="tel"
                      value={fields.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      error={errors.phone}
                      placeholder="e.g. +91 98765 43210"
                      disabled={disabled}
                      required
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="enq-email"
                      label="Email Address"
                      type="email"
                      value={fields.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={errors.email}
                      placeholder="you@example.com"
                      disabled={disabled}
                      required
                    />
                    <InputField
                      id="enq-course"
                      label="Course Interested In"
                      value={fields.courseName}
                      onChange={handleChange("courseName")}
                      onBlur={handleBlur("courseName")}
                      error={errors.courseName}
                      placeholder="e.g. Diploma in Computer Applications"
                      disabled={disabled}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-message" className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
                      Message <span className="text-neutral-300 font-medium normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="enq-message"
                      rows={4}
                      value={fields.message}
                      onChange={handleChange("message")}
                      disabled={disabled}
                      placeholder="Any questions, preferred batch timings, or anything else you'd like us to know..."
                      className="w-full px-5 py-4 rounded-2xl border border-neutral-200 text-sm font-medium text-[#1B1C1E] placeholder-neutral-300 bg-white transition-all outline-none resize-none focus:ring-2 focus:ring-brandpurple/30 focus:border-brandpurple hover:border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={disabled}
                    whileHover={!disabled ? { scale: 1.01, y: -1 } : {}}
                    whileTap={!disabled ? { scale: 0.99 } : {}}
                    className="w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#1B1C1E] text-white font-extrabold tracking-tight text-base shadow-lg shadow-black/10 hover:bg-neutral-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {disabled ? (
                      <>
                        <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    By submitting you agree to be contacted by the instudia admissions team. We respect your privacy and will not share your information.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
