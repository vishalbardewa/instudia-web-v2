"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/app/data/servicesData";
import ServiceInquiryForm from "./ServiceInquiryForm";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  ChevronDownIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  CommandLineIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface SterlingServiceDetailViewProps {
  service: ServiceItem;
}

const serviceHeroImages: Record<string, string> = {
  "web-software-development":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  "cloud-devops-infrastructure":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  "ui-ux-branding":
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
  "ui-ux-design-systems":
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
  "corporate-training":
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  "corporate-tech-training":
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  "campus-partnerships":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  "institutional-erp-software":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  "career-services":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  "campus-bootcamps-hackathons":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
};

export default function SterlingServiceDetailView({
  service,
}: SterlingServiceDetailViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroImage =
    serviceHeroImages[service.slug] ||
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";

  const waLeadUrl = `https://wa.me/918798587779?text=${encodeURIComponent(
    `Hello instudia team! I would like to discuss a project scope for: ${service.title}.`
  )}`;

  return (
    <div className="bg-[#F8F7F5] text-[#121212] font-sans selection:bg-[#C21BFF]/20 selection:text-black antialiased">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (Sterling Executive Detail Hero)
      ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-neutral-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Actions */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-xs text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C21BFF]" />
              <span>{service.badge}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500">{service.category}</span>
            </div>

            {/* Display Title */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#121212] leading-[1.08] mb-6">
              {service.title}
            </h1>

            {/* Tagline Subtitle */}
            <p className="text-xl sm:text-2xl font-medium text-neutral-800 leading-snug mb-4">
              {service.heroTagline}
            </p>

            {/* In-depth Narrative */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-8">
              {service.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#consultation"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all group"
              >
                <span>Request a Proposal</span>
                <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={waLeadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#121212] border border-neutral-300 font-medium text-sm sm:text-base shadow-xs transition-all"
              >
                <span>Chat on WhatsApp</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </a>
            </div>

            {/* Trust Accreditation Strip */}
            <div className="pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <ShieldCheckIcon className="w-4 h-4 text-neutral-900" />
                ISO 9001:2015 Verified
              </span>
              <span className="flex items-center gap-1.5 text-neutral-700">
                <BuildingOffice2Icon className="w-4 h-4 text-neutral-900" />
                Govt MSME Registered
              </span>
              <span className="flex items-center gap-1.5 text-neutral-700">
                <AcademicCapIcon className="w-4 h-4 text-neutral-900" />
                15+ Partner Colleges
              </span>
            </div>
          </div>

          {/* Right Column: Hero Image Preview & Key Specs Card */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-white border border-neutral-200 mb-6">
              <Image
                src={heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-neutral-900 text-xs font-mono">
                <span className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-200 font-bold shadow-xs">
                  Dedicated Senior Pod
                </span>
                <span className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-200 font-bold shadow-xs">
                  Fixed SOW
                </span>
              </div>
            </div>

            {/* Metric Counters Grid */}
            <div className="grid grid-cols-2 gap-3">
              {service.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#121212] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE CHALLENGE (Sterling Problem Resolution Cards)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-neutral-200">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                Common Obstacles
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
                Where Traditional Approaches Fall Short
              </h2>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
              Most projects suffer from hidden costs, junior handoffs, or rigid software that creates more friction than it solves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.problemsSolved.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FAF9F5] border border-neutral-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-neutral-400">
                      0{idx + 1}
                    </span>
                    <XCircleIcon className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121212] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-200/60 text-xs font-mono text-[#C21BFF] font-bold">
                  How we solve this
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. CORE CAPABILITIES & DELIVERABLES (Sterling Dossier)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              What We Deliver
            </h2>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Everything we build is delivered with complete source code ownership and full documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-[#121212]">
                    {cap.title}
                  </h3>
                  {cap.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FAF9F5] border border-neutral-200 text-neutral-800">
                      {cap.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                  {cap.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-neutral-100">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                    Included Deliverables:
                  </p>
                  {cap.deliverables.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                    >
                      <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Phase-Milestone Audited</span>
                <span className="text-[#C21BFF] font-bold">Production Ready</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. 4-PHASE EXECUTION ROADMAP (Clean Light Container)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-y border-neutral-200/80 bg-white text-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#C21BFF] font-bold mb-2">
                Process
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
                How We Deliver It
              </h2>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
              You get a private staging link, regular demos, and full visibility into every sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAF9F5] border border-neutral-200/90 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-black text-[#C21BFF]">
                      {step.step}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-700 bg-white border border-neutral-200 px-2.5 py-1 rounded-full">
                      <ClockIcon className="w-3.5 h-3.5 text-neutral-500" />
                      {step.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#121212] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200 text-xs font-mono text-neutral-400">
                  Sprint Milestone Sign-off
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. PRODUCTION TECH STACK (Categorized Framework Chips)
      ────────────────────────────────────────────────────────── */}
      {service.techStack && (
        <section className="py-20 px-6 sm:px-8 border-b border-neutral-200/80 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                Tech Stack
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
                Tools &amp; Infrastructure We Use
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200"
                >
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-800 shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────
          6. ENGAGEMENT MODELS & SOW TIERS (Sterling Tiers)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
            Pricing &amp; Options
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
            Pricing &amp; Engagement Options
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Choose the engagement model that best fits your timeline and goals. No surprise hourly bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.engagementModels.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-10 rounded-3xl bg-white border flex flex-col justify-between transition-all ${
                tier.popular
                  ? "border-brandpurple shadow-lg ring-2 ring-brandpurple/10 scale-[1.02] relative"
                  : "border-neutral-200 shadow-xs hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-brandpurple text-white shadow-2xs">
                  {tier.badge || "Recommended"}
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold text-[#121212] mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs font-mono font-bold text-[#C21BFF] uppercase mb-4">
                  {tier.tag}
                </p>
                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-neutral-100 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                    >
                      <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#consultation"
                className={`w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-center transition-all ${
                  tier.popular
                    ? "bg-[#121212] text-white hover:bg-black shadow-sm"
                    : "bg-[#FAF9F5] border border-neutral-300 text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. CASE STUDY SPOTLIGHT (Sterling Outcome Spotlight)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-y border-neutral-200/80 bg-white">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#FAF9F5] border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
              Verified Case Study: {service.caseStudyNote.client}
            </p>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#121212] tracking-tight mb-4">
            {service.caseStudyNote.headline}
          </h3>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            {service.caseStudyNote.impact}
          </p>
          <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Client Outcome Confirmed</span>
            <span className="text-[#121212] font-bold">100% Production SLA</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          8. FREQUENTLY ASKED QUESTIONS (Sterling Accordion)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
            FAQs
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
            Common Questions
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Direct answers on timelines, pricing, and how we partner with you.
          </p>
        </div>

        <div className="space-y-4">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
                  }
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-bold text-[#121212] text-base sm:text-lg hover:text-black transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brandpurple/10 text-brandpurple" : "text-neutral-600"
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-neutral-600 text-sm sm:text-base leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          9. DUAL-TRACK CONSULTATION BLOCK (Sterling CTA)
      ────────────────────────────────────────────────────────── */}
      <section
        id="consultation"
        className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="rounded-3xl bg-white border border-neutral-200/90 text-[#121212] p-8 sm:p-12 lg:p-16 relative shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Scope Pitch & WhatsApp Hotline */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 mb-6 shadow-2xs">
                <span>✦ Start A Project</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-tight mb-6">
                Have a project in mind? Let’s talk through it.
              </h2>

              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                Whether you need a new web application, a campus bootcamp, or
                advice on your cloud infrastructure, we’re happy to discuss the
                best path forward.
              </p>

              {/* Guarantees Checklist */}
              <div className="space-y-3.5 mb-10">
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Direct communication with a senior engineer</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Fixed-price quote with clear deliverables</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>NDA protected from the first conversation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>30-day warranty included with every build</span>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
                  Direct Inquiries &amp; WhatsApp
                </p>
                <a
                  href={waLeadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-[#121212] hover:text-[#C21BFF] transition-colors flex items-center gap-2 mb-1"
                >
                  <span>+91 87985 87779</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    WhatsApp Online
                  </span>
                </a>
                <p className="text-xs text-neutral-500">
                  Headquarters: Vikiye Center, Dimapur, Nagaland
                </p>
              </div>
            </div>

            {/* Right Column: Embedded Project Scoping Form */}
            <div className="lg:col-span-7 bg-[#FAF9F5] rounded-2xl p-6 sm:p-10 border border-neutral-200/90 shadow-2xs">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#121212]">
                  Tell us what you&apos;re building
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Leave a note below. A senior engineer will review your note and
                  get back to you within 24 hours.
                </p>
              </div>

              <ServiceInquiryForm
                serviceTitle={service.title}
                serviceSlug={service.slug}
                hideHeader
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          10. CONTEXTUAL INTERNAL LINKING (Courses & Student Tools)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-t border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-1">
                Internal Ecosystem
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121212]">
                Related Courses &amp; Developer Tools
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-xs font-mono font-bold text-[#C21BFF] hover:underline"
            >
              View All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.relatedCourses.map((c, idx) => (
              <Link
                key={idx}
                href={`/courses/${c.slug}`}
                className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200 hover:border-[#121212] hover:bg-white transition-all group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                    Certified Program
                  </span>
                  <h3 className="font-bold text-[#121212] group-hover:text-black transition-colors text-base mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-xs font-mono font-bold text-[#121212]">
                  <span>Explore Curriculum</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {service.relatedTools.map((t, idx) => (
              <Link
                key={idx}
                href={`/tools/${t.slug}`}
                className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200 hover:border-[#121212] hover:bg-white transition-all group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2 block">
                    Developer Tool
                  </span>
                  <h3 className="font-bold text-[#121212] group-hover:text-black transition-colors text-base mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
                  <span>Launch Tool</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          11. RUNNING MARQUEE TICKER TAPE
      ────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden border-t border-neutral-200 bg-[#FAF9F5] text-neutral-600 py-4 select-none">
        <div className="flex whitespace-nowrap animate-infinite-scroll items-center gap-8 text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500">
          <span>✦ {service.title}</span>
          <span className="text-neutral-300">/</span>
          <span>Fixed SOW Milestones</span>
          <span className="text-neutral-300">/</span>
          <span>30-Day Post-Launch Warranty</span>
          <span className="text-neutral-300">/</span>
          <span>WhatsApp Direct: +91 87985 87779</span>
          <span className="text-neutral-300">/</span>
          <span>Dimapur, Nagaland</span>
          <span className="text-neutral-300">/</span>
          <span>✦ {service.title}</span>
          <span className="text-neutral-300">/</span>
          <span>Fixed SOW Milestones</span>
          <span className="text-neutral-300">/</span>
          <span>30-Day Post-Launch Warranty</span>
        </div>
      </div>
    </div>
  );
}
