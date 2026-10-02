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
  CloudIcon,
  PaintBrushIcon,
  UsersIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface SterlingServicesViewProps {
  services: ServiceItem[];
  partners: string[];
  faqs: { question: string; answer: string }[];
}

const serviceImages: Record<string, string> = {
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

const humanSummaries: Record<string, string> = {
  "web-software-development":
    "Fast web apps, customer portals, and internal tools built with Next.js and TypeScript. Made to load fast and scale smoothly.",
  "cloud-devops-infrastructure":
    "Reliable cloud infrastructure, automated CI/CD deployments, and 24/7 crash monitoring on AWS and Docker so your systems stay up.",
  "ui-ux-branding":
    "Clean, intuitive interfaces your users will actually enjoy using. Designed in Figma with reusable components and clear developer handoff.",
  "ui-ux-design-systems":
    "Clean, intuitive interfaces your users will actually enjoy using. Designed in Figma with reusable components and clear developer handoff.",
  "corporate-training":
    "Hands-on team workshops in Excel, Power BI, Tally Prime with GST, and modern AI tools using your company's actual daily files.",
  "corporate-tech-training":
    "Hands-on team workshops in Excel, Power BI, Tally Prime with GST, and modern AI tools using your company's actual daily files.",
  "campus-partnerships":
    "Interactive student coding bootcamps, tech seminars, and faculty AI training for schools and colleges across Nagaland.",
  "institutional-erp-software":
    "Interactive student coding bootcamps, tech seminars, and faculty AI training for schools and colleges across Nagaland.",
  "career-services":
    "1-on-1 tech career mentorship: ATS resume rewriting, realistic coding mock interviews, and direct referrals to hiring partners.",
  "campus-bootcamps-hackathons":
    "1-on-1 tech career mentorship: ATS resume rewriting, realistic coding mock interviews, and direct referrals to hiring partners.",
};

const serviceIcons: Record<string, React.ReactNode> = {
  "web-software-development": <CommandLineIcon className="w-5 h-5 text-[#C21BFF]" />,
  "cloud-devops-infrastructure": <CloudIcon className="w-5 h-5 text-[#0752ff]" />,
  "ui-ux-branding": <PaintBrushIcon className="w-5 h-5 text-[#FF1B58]" />,
  "ui-ux-design-systems": <PaintBrushIcon className="w-5 h-5 text-[#FF1B58]" />,
  "corporate-training": <UsersIcon className="w-5 h-5 text-[#056671]" />,
  "corporate-tech-training": <UsersIcon className="w-5 h-5 text-[#056671]" />,
  "campus-partnerships": <AcademicCapIcon className="w-5 h-5 text-[#2b7a14]" />,
  "institutional-erp-software": <BuildingOffice2Icon className="w-5 h-5 text-[#8f58ff]" />,
  "career-services": <SparklesIcon className="w-5 h-5 text-[#8f58ff]" />,
  "campus-bootcamps-hackathons": <AcademicCapIcon className="w-5 h-5 text-[#2b7a14]" />,
};

export default function SterlingServicesView({
  services,
  partners,
  faqs,
}: SterlingServicesViewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [activeApproachStep, setActiveApproachStep] = useState<number>(0);
  const [activeSector, setActiveSector] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const approachSteps = [
    {
      num: "01",
      title: "Figure out what matters",
      subtitle: "Discovery & Blueprint",
      desc: "We sit down with you to understand your real workflow, uncover constraints, and map out exactly what needs to be built.",
      bullets: [
        "Direct workflow and architecture session",
        "Clear scope with fixed milestones",
        "Upfront pricing with zero hidden fees",
      ],
      badge: "Days 1–3",
    },
    {
      num: "02",
      title: "Build in sprints",
      subtitle: "Milestone-Driven Development",
      desc: "We build in two-week cycles using Next.js and clean TypeScript. You get a private link to click around and test updates as we go.",
      bullets: [
        "Fast Next.js and backend engineering",
        "Live staging link updated every 2 weeks",
        "Direct WhatsApp/Slack access to your lead engineer",
      ],
      badge: "Weeks 2–5",
    },
    {
      num: "03",
      title: "Launch and stand by it",
      subtitle: "Deployment & Ongoing Support",
      desc: "We handle domain setup, security checks, and staff onboarding. When it's live, we stay on call with a 30-day warranty to fix any issues.",
      bullets: [
        "Zero-downtime DNS and cloud launch",
        "Hands-on staff onboarding walkthroughs",
        "30-day post-launch warranty included",
      ],
      badge: "Launch & Beyond",
    },
  ];

  const sectors = [
    {
      name: "Higher Education",
      subtitle: "Colleges & Autonomous Institutes",
      desc: "Colleges that want to eliminate paper forms, print marksheets automatically, and give students real tech skills.",
      partners: ["NEISSR", "MGM College", "Immanuel College", "CHSS"],
      stat: "4,000+",
      statLabel: "Students Connected",
    },
    {
      name: "Local Businesses & MSMEs",
      subtitle: "Commerce & Regional Enterprises",
      desc: "Growing companies looking to automate inventory, bill faster with GST, or launch a modern online presence.",
      partners: ["Ministry of MSME Partners", "Regional Distributors", "Retail Brands"],
      stat: "35%",
      statLabel: "Cost Reduction",
    },
    {
      name: "Startups & Founders",
      subtitle: "Tech Products & MVPs",
      desc: "Founders who need a fast, reliable MVP built right the first time without hiring a full in-house tech department.",
      partners: ["Fintech Innovators", "HealthTech Ventures", "SaaS Founders"],
      stat: "< 1.2s",
      statLabel: "Target Load Speed",
    },
    {
      name: "Public Institutions",
      subtitle: "Councils & Foundations",
      desc: "Organizations that need dependable record management, public information portals, and verifiable audit compliance.",
      partners: ["Regional Foundations", "Skill Development Councils", "Educational Trusts"],
      stat: "100%",
      statLabel: "Audit Compliance",
    },
  ];

  return (
    <div className="bg-[#F8F7F5] text-[#121212] font-sans selection:bg-[#C21BFF]/20 selection:text-black antialiased">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (Sterling Executive Agency Aesthetic)
      ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-neutral-200/80">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-xs text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C21BFF]" />
            <span>Digital Engineering &amp; Solutions</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121212] leading-[1.08] mb-6">
            Clear Thinking, <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-normal">
              Production Engineering.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mb-8">
            We build custom web apps, manage cloud infrastructure, and run
            practical tech bootcamps across Northeast India. No fluff, just clean
            code that works.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#services-list"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all group"
            >
              <span>Explore Services</span>
              <ArrowDownIcon className="w-4 h-4 text-neutral-400 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#consultation"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#121212] border border-neutral-300 font-medium text-sm sm:text-base shadow-xs transition-all"
            >
              <span>Talk to an Engineer</span>
              <ArrowRightIcon className="w-4 h-4 text-neutral-500" />
            </a>
          </div>

          {/* Sterling Trust Metric Strip */}
          <div className="w-full pt-8 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-6 text-sm text-neutral-600">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#121212]">15+</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                Partner Colleges &amp; Companies
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#121212]">100%</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                Project-Based Learning
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#121212]">99.9%</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                Cloud Uptime SLA
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-mono font-bold text-neutral-800">
                ISO 9001:2015 Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. STERLING EXECUTIVE MARQUEE TICKER TAPE
      ────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden border-b border-neutral-200/80 bg-white py-4 select-none">
        <div className="flex whitespace-nowrap animate-infinite-scroll items-center gap-10 text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C21BFF]" />
            Clean TypeScript
          </span>
          <span className="text-neutral-300">/</span>
          <span>Next.js Web Apps</span>
          <span className="text-neutral-300">/</span>
          <span>AWS Cloud DevOps</span>
          <span className="text-neutral-300">/</span>
          <span>Campus Portals</span>
          <span className="text-neutral-300">/</span>
          <span>Student Bootcamps</span>
          <span className="text-neutral-300">/</span>
          <span>Fixed Milestone Pricing</span>
          <span className="text-neutral-300">/</span>
          <span>30-Day Launch Warranty</span>
          <span className="text-neutral-300">/</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C21BFF]" />
            Clean TypeScript
          </span>
          <span className="text-neutral-300">/</span>
          <span>Next.js Web Apps</span>
          <span className="text-neutral-300">/</span>
          <span>AWS Cloud DevOps</span>
          <span className="text-neutral-300">/</span>
          <span>Campus Portals</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. CORE SERVICES: STERLING INTERACTIVE EXPANDING ROWS
      ────────────────────────────────────────────────────────── */}
      <section
        id="services-list"
        className="py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              What We Build &amp; Support
            </h2>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Tailored engineering pods delivering modern software, cloud
            reliability, and practical tech training.
          </p>
        </div>

        {/* The Sterling Interactive Expanding List */}
        <div className="divide-y divide-neutral-200/90 border-y border-neutral-200/90 bg-white rounded-3xl shadow-xs overflow-hidden">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const img =
              serviceImages[service.slug] ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
            const icon = serviceIcons[service.slug] || (
              <CommandLineIcon className="w-5 h-5 text-[#121212]" />
            );
            const summary =
              humanSummaries[service.slug] || service.heroTagline;

            return (
              <div
                key={service.slug}
                className={`transition-colors duration-200 ${
                  isExpanded ? "bg-[#FAF9F6]" : "hover:bg-neutral-50/70"
                }`}
              >
                {/* Header Row (Click to toggle/expand) */}
                <button
                  type="button"
                  onClick={() => setExpandedIndex(index)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-6 cursor-pointer focus:outline-hidden"
                >
                  <div className="flex items-center gap-6 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-neutral-400">
                      0{index + 1}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs hidden sm:flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#121212] tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
                        {service.badge} • {service.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline-flex text-xs font-mono font-medium text-neutral-500">
                      {isExpanded ? "Collapse" : "Details"}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border border-neutral-300 bg-white transition-transform duration-300 ${
                        isExpanded ? "rotate-180 bg-neutral-100 border-neutral-300 text-neutral-900" : "text-neutral-700"
                      }`}
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Drawer Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-neutral-200/60">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left Column: High-Res Image Preview */}
                      <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xs bg-neutral-100">
                        <Image
                          src={img}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-neutral-900 text-xs font-mono">
                          <span className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs font-semibold">
                            Typical SLA: 2–6 Weeks
                          </span>
                          <span className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs font-semibold">
                            Senior Lead Pod
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Narrative, Deliverables & SOW Link */}
                      <div className="lg:col-span-7 flex flex-col justify-between h-full">
                        <div>
                          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 font-normal">
                            {summary}
                          </p>

                          <div className="mb-6">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                              What We Deliver
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.capabilities.map((cap, i) => (
                                <div
                                  key={i}
                                  className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-bold text-neutral-900">
                                      {cap.title}
                                    </span>
                                  </div>
                                  <p className="text-xs text-neutral-600 leading-relaxed">
                                    {cap.deliverables.slice(0, 2).join(" • ")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-4 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                            <span>Fixed-Scope SOW</span>
                            <span>•</span>
                            <span>30-Day Post-Launch Warranty</span>
                          </div>

                          <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121212] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
                          >
                            <span>View Full Details &amp; Pricing</span>
                            <ArrowUpRightIcon className="w-4 h-4 text-neutral-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. "THE DIFFERENCE": STERLING COMPARISON MATRIX
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-y border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
              Why Us
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
              Why Clients Choose Us
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              We combine senior engineering discipline with milestone-backed
              transparency—delivering software that actually works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Other Agencies */}
            <div className="rounded-3xl bg-[#FAF9F5] border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-500">
                    Typical Agencies &amp; Freelancers
                  </h3>
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                    Common Pitfalls
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                  Too many projects derail due to hidden fees, junior handoffs,
                  and software that breaks under real traffic.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <XCircleIcon className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span>Vague estimates that balloon over time</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <XCircleIcon className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span>Bloated templates that load slowly and fail audits</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <XCircleIcon className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span>Passed around junior account managers</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <XCircleIcon className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span>Disappearing as soon as the invoice is paid</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-neutral-200 text-xs font-mono text-neutral-400">
                You get left with unmaintained code and technical debt.
              </div>
            </div>

            {/* Column 2: With Instudia */}
            <div className="rounded-3xl bg-white border-2 border-brandpurple/30 p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                  <h3 className="text-xl font-bold text-[#121212] flex items-center gap-2">
                    <span>With instudia</span>
                    <span className="w-2 h-2 rounded-full bg-brandpurple" />
                  </h3>
                  <span className="text-xs font-mono font-bold text-brandpurple uppercase">
                    Our Standard
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                  We write clean TypeScript, test continuously, and keep you
                  updated every step of the way.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#121212]">Fixed prices &amp; dates:</strong>{" "}
                      No surprise hourly bills or scope creep.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#121212]">Sub-second Next.js:</strong>{" "}
                      Fast, secure, and built on modern tech.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#121212]">Direct engineer access:</strong>{" "}
                      You speak directly with the person writing your code.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#121212]">30-day warranty:</strong>{" "}
                      We stay on call after launch to handle any bugs.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-neutral-200 text-xs font-mono text-brandpurple font-semibold">
                You get production software ready for real users.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. "OUR APPROACH": STERLING 3-STEP EXECUTION FRAMEWORK
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
            Process
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
            How We Work With You
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            A simple, milestone-backed process so you always know what is being
            built and when it will launch.
          </p>
        </div>

        {/* 3 Step Interactive / Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approachSteps.map((step, idx) => {
            const isActive = activeApproachStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveApproachStep(idx)}
                className={`rounded-3xl p-8 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-white border-[#121212] shadow-md"
                    : "bg-[#FAF9F5] border-neutral-200/90 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-neutral-400">
                      {step.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-mono text-xs font-bold border border-neutral-200">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#121212] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    {step.bullets.map((b, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-neutral-700"
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-bold text-neutral-400">
                  <span>Phase {step.num}</span>
                  <span className="text-[#C21BFF]">
                    {isActive ? "Active View" : "Click to view"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. "WHO WE WORK BEST WITH": SECTOR SPOTLIGHTS
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-y border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                Clients
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
                Who We Work Best With
              </h2>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
              Clear, reliable solutions tailored to colleges, local companies,
              and fast-moving founders.
            </p>
          </div>

          {/* Sector Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-neutral-200">
            {sectors.map((sec, idx) => {
              const active = activeSector === idx;
              return (
                <button
                  key={sec.name}
                  onClick={() => setActiveSector(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#121212] text-white shadow-xs"
                      : "bg-[#FAF9F5] text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {sec.name}
                </button>
              );
            })}
          </div>

          {/* Active Sector Dossier */}
          <div className="rounded-3xl bg-[#FAF9F5] border border-neutral-200/90 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C21BFF] font-bold">
                  Sector Focus
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-[#121212] mt-1 mb-2">
                  {sectors[activeSector].name}
                </h3>
                <p className="text-sm font-mono text-neutral-500 mb-6">
                  {sectors[activeSector].subtitle}
                </p>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-8">
                  {sectors[activeSector].desc}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
                    Active Deployments &amp; Partners
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sectors[activeSector].partners.map((p, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-800"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 rounded-2xl bg-white border border-neutral-200 p-8 text-center shadow-xs">
                <span className="block text-4xl sm:text-5xl font-black text-[#121212] mb-1">
                  {sectors[activeSector].stat}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  {sectors[activeSector].statLabel}
                </span>
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-bold transition-all"
                  >
                    <span>Request Proposal</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. PROVEN CASE OUTCOMES (Sterling Case Studies Grid)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
              Results
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              Real Projects, Real Outcomes
            </h2>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Real deployments delivering measurable efficiency and reliable daily
            performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Case 1 */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FAF9F5] border border-neutral-200 text-xs font-mono font-bold text-neutral-700">
                  Higher Ed MoU
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Live in Production
                </span>
              </div>

              <div className="my-6">
                <span className="text-3xl sm:text-4xl font-black text-[#121212]">
                  4,000+
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1 font-bold">
                  Students &amp; Faculty Connected
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#121212] mb-2">
                NEISSR &amp; MGM College Academic Portals
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Automated student records, marksheet generation, and digital
                admissions, saving staff hundreds of manual paperwork hours.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Next.js + PostgreSQL</span>
              <span className="font-bold text-[#121212]">Active</span>
            </div>
          </div>

          {/* Case 2 */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FAF9F5] border border-neutral-200 text-xs font-mono font-bold text-neutral-700">
                  Cloud DevOps
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  99.9% Uptime
                </span>
              </div>

              <div className="my-6">
                <span className="text-3xl sm:text-4xl font-black text-[#121212]">
                  35%
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1 font-bold">
                  Monthly Cloud Bill Saved
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#121212] mb-2">
                AWS Cloud Migration &amp; CI/CD Setup
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Moved legacy servers to Docker containers on AWS, cutting monthly
                hosting bills by 35% with zero downtime.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>AWS + Docker + CI/CD</span>
              <span className="font-bold text-[#121212]">Optimized</span>
            </div>
          </div>

          {/* Case 3 */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FAF9F5] border border-neutral-200 text-xs font-mono font-bold text-neutral-700">
                  Team Upskilling
                </span>
                <span className="text-xs font-mono font-bold text-[#C21BFF]">
                  MSME Recognized
                </span>
              </div>

              <div className="my-6">
                <span className="text-3xl sm:text-4xl font-black text-[#121212]">
                  100%
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1 font-bold">
                  Live Code Deployed
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#121212] mb-2">
                Campus Bootcamps &amp; Corporate Workshops
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Practical workshops in Python, Next.js, and Git. Every
                student builds and launches a live deployed application.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Hands-on Bootcamps</span>
              <span className="font-bold text-[#121212]">Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          8. TESTIMONIALS & INSTITUTIONAL PARTNERS
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-y border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
              Feedback
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
              What Our Partners Say
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Real feedback from the college deans and technical founders we
              work with every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="rounded-3xl bg-[#FAF9F5] border border-neutral-200 p-8 flex flex-col justify-between">
              <blockquote className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-8">
                &ldquo;instudia automated our academic administration with a
                system that eliminated manual errors and saved us hundreds of
                hours every semester. Their team was responsive, straightforward,
                and delivered ahead of schedule.&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brandpurple/10 border border-brandpurple/20 text-brandpurple font-mono font-bold flex items-center justify-center text-xs">
                  CA
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">
                    Fr. Dr. C.P. Anto
                  </p>
                  <p className="text-xs text-neutral-500">
                    Principal &amp; Director, NEISSR
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#FAF9F5] border border-neutral-200 p-8 flex flex-col justify-between">
              <blockquote className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-8">
                &ldquo;The coding bootcamp gave our students hands-on,
                production-level coding experience that textbooks alone cannot
                provide. Every student deployed a live project.&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brandpurple/10 border border-brandpurple/20 text-brandpurple font-mono font-bold flex items-center justify-center text-xs">
                  MG
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">
                    Department Chair
                  </p>
                  <p className="text-xs text-neutral-500">
                    MGM College, Dimapur
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#FAF9F5] border border-neutral-200 p-8 flex flex-col justify-between">
              <blockquote className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-8">
                &ldquo;From UI wireframes to Dockerizing our cloud
                infrastructure on AWS, instudia delivered clean code, zero
                downtime, and clear bi-weekly demos throughout the
                project.&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brandpurple/10 border border-brandpurple/20 text-brandpurple font-mono font-bold flex items-center justify-center text-xs">
                  RP
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">
                    Technical Lead
                  </p>
                  <p className="text-xs text-neutral-500">
                    Regional Enterprise Partner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Partner Logos / Badges */}
          <div className="pt-8 border-t border-neutral-200 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6">
              Institutional MoUs &amp; Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {partners.map((p, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-[#FAF9F5] border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          9. FREQUENTLY ASKED QUESTIONS (Sterling Accordion)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
            FAQs
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] mb-4">
            Common Questions
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Need guidance on starting your project or campus partnership?
            Here’s what you need to know.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqIndex((prev) => (prev === index ? null : index))
                  }
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-bold text-[#121212] text-base sm:text-lg hover:text-neutral-900 transition-colors"
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
          10. DUAL-TRACK CONSULTATION & LEAD GENERATION (Sterling CTA)
      ────────────────────────────────────────────────────────── */}
      <section
        id="consultation"
        className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="rounded-3xl bg-white border border-neutral-200/90 text-[#121212] p-8 sm:p-12 lg:p-16 relative shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Sterling Value Pitch & WhatsApp Hotline */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 mb-6 shadow-2xs">
                <span>✦ Start A Project</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-tight mb-6">
                Have a project in mind? Let’s talk through it.
              </h2>

              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                Whether you need a new web platform, a campus bootcamp, or
                advice on your cloud setup, we’re happy to help you figure out the
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
                  href="https://wa.me/918798587779?text=Hello%20instudia%2C%20I%20would%20like%20to%20discuss%20a%20project%20or%20service."
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
                serviceTitle="Instudia Technical Advisory"
                serviceSlug="general-inquiry"
                hideHeader
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          11. BOTTOM RUNNING TICKER
      ────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden border-t border-neutral-200 bg-[#FAF9F5] text-neutral-600 py-4 select-none">
        <div className="flex whitespace-nowrap animate-infinite-scroll items-center gap-8 text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500">
          <span>✦ Clean Code &amp; Solid Systems</span>
          <span className="text-neutral-300">/</span>
          <span>WhatsApp Direct: +91 87985 87779</span>
          <span className="text-neutral-300">/</span>
          <span>Vikiye Center, Dimapur, Nagaland</span>
          <span className="text-neutral-300">/</span>
          <span>Fixed SOW Milestones</span>
          <span className="text-neutral-300">/</span>
          <span>ISO 9001:2015 Verified</span>
          <span className="text-neutral-300">/</span>
          <span>✦ Clean Code &amp; Solid Systems</span>
          <span className="text-neutral-300">/</span>
          <span>WhatsApp Direct: +91 87985 87779</span>
          <span className="text-neutral-300">/</span>
          <span>Vikiye Center, Dimapur, Nagaland</span>
        </div>
      </div>
    </div>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </svg>
  );
}
