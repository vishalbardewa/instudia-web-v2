"use client";

import React, { useState } from "react";
import { CheckCircleIcon, PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface ServiceInquiryFormProps {
  serviceTitle: string;
  serviceSlug: string;
  hideHeader?: boolean;
}

export default function ServiceInquiryForm({
  serviceTitle,
  serviceSlug,
  hideHeader = false,
}: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    timeline: "Standard (1-2 months)",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    // Validate phone
    const cleanPhone = formData.phone.replace(/[\s\-()+]/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number.");
      setLoading(false);
      return;
    }

    try {
      const detailedMessage = `[Service Inquiry: ${serviceTitle}]\nOrganization/Role: ${
        formData.organization || "Individual/Not specified"
      }\nTimeline: ${formData.timeline}\nDetails: ${formData.message}`;

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: cleanPhone,
          email: formData.email,
          courseName: `SERVICE: ${serviceTitle}`,
          message: detailedMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("[ServiceInquiryForm] Submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please connect via WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  const encodedWaMessage = encodeURIComponent(
    `Hello instudia team! I would like to inquire about your "${serviceTitle}" services. Could we discuss availability and next steps?`
  );
  const waUrl = `https://wa.me/918798587779?text=${encodedWaMessage}`;

  return (
    <div id="inquiry-form" className="w-full text-[#121212]">
      {!hideHeader && (
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200 mb-3">
            Direct Technical Scoping
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
            Let&apos;s Discuss Your Project
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Tell us about your requirements for <span className="font-semibold text-neutral-900">{serviceTitle}</span>. We will review your goals and provide a scoped proposal within 24 hours.
          </p>
        </div>
      )}

      {status === "success" ? (
        <div className="text-center py-10 px-6 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-2xs">
          <CheckCircleIcon className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">Inquiry Received</h3>
          <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
            Thank you for reaching out. One of our senior engineers will review your note and get back to you within 24 hours.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-xs"
          >
            <span>Chat Now on WhatsApp</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
            </svg>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                name="name"
                placeholder="e.g. Rachel Jamir"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Phone (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Company / College / Role
              </label>
              <input
                type="text"
                name="organization"
                placeholder="e.g. Tech Corp / MGM College"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Preferred Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
            >
              <option value="Urgent (< 2 weeks)">Urgent (Starts within 2 weeks)</option>
              <option value="Standard (1-2 months)">Standard (1 to 2 months)</option>
              <option value="Long-term / Exploratory">Long-term / Exploratory</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Project Scope / Notes
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us what you're looking to build or achieve..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full rounded-xl bg-white border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#121212] focus:ring-1 focus:ring-[#121212] transition-all text-sm shadow-2xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#121212] hover:bg-black active:scale-[0.99] text-white font-bold tracking-wide text-sm sm:text-base shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <span>Send Project Request</span>
                  <PaperAirplaneIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-neutral-200"></div>
            <span className="flex-shrink mx-4 text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              or connect directly
            </span>
            <div className="flex-grow border-t border-neutral-200"></div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-semibold text-sm transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
            </svg>
            <span>Direct WhatsApp: +91 87985 87779</span>
          </a>
        </form>
      )}
    </div>
  );
}
