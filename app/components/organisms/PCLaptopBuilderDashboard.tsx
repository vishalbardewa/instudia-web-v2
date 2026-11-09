"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconDeviceLaptop,
  IconDeviceDesktop,
  IconArrowsLeftRight,
  IconCpu,
  IconBrain,
  IconPalette,
  IconVideo,
  IconCode,
  IconSchool,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconPrinter,
  IconBrandWhatsapp,
  IconShieldCheck,
  IconSparkles,
  IconChevronRight,
  IconAdjustmentsHorizontal,
  IconBolt,
} from '@tabler/icons-react';
import {
  WorkloadDomain,
  FormFactorChoice,
  BudgetTier,
  DOMAIN_PROFILES,
  LAPTOP_CATALOG,
  DESKTOP_BUILDS,
  LAPTOP_VS_DESKTOP_TRADEOFFS,
  SPEC_TWEAKS,
  LaptopModel,
  DesktopBuildSheet,
} from '@/data/hardware-catalog';
import RigSchematic2D from './RigSchematic2D';

export default function PCLaptopBuilderDashboard() {
  // Wizard State
  const [selectedDomain, setSelectedDomain] = useState<WorkloadDomain>('programming');
  const [formFactor, setFormFactor] = useState<FormFactorChoice>('laptop');
  const [selectedTier, setSelectedTier] = useState<BudgetTier>('sweet_spot');
  const [selectedTweaks, setSelectedTweaks] = useState<string[]>([]);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Animation Refs
  const stepsCardRef = useRef<HTMLDivElement>(null);
  const splitViewRef = useRef<HTMLDivElement>(null);
  const compareViewRef = useRef<HTMLDivElement>(null);
  const recCardRef = useRef<HTMLDivElement>(null);

  // Active domain metadata
  const currentDomain = DOMAIN_PROFILES[selectedDomain];

  // Format currency in Indian Rupees
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filtered Laptops matching domain
  const relevantLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((laptop) =>
      laptop.suitableDomains.includes(selectedDomain)
    );
  }, [selectedDomain]);

  // Selected laptop by tier
  const activeLaptop = useMemo(() => {
    const match = relevantLaptops.find((l) => l.tier === selectedTier);
    return match || relevantLaptops[0] || LAPTOP_CATALOG[0];
  }, [relevantLaptops, selectedTier]);

  // Filtered Desktop Builds matching domain
  const relevantDesktops = useMemo(() => {
    const list = DESKTOP_BUILDS.filter((build) =>
      build.targetDomains.includes(selectedDomain)
    );
    return list.length > 0 ? list : DESKTOP_BUILDS;
  }, [selectedDomain]);

  // Selected desktop build by tier
  const activeDesktop = useMemo(() => {
    const match = relevantDesktops.find((d) => d.tier === selectedTier);
    return match || relevantDesktops[0] || DESKTOP_BUILDS[0];
  }, [relevantDesktops, selectedTier]);

  // Calculate tweaks extra cost
  const tweaksExtraCost = useMemo(() => {
    return selectedTweaks.reduce((acc, tweakId) => {
      const tweak = SPEC_TWEAKS.find((t) => t.id === tweakId);
      return acc + (tweak ? tweak.extraPriceInr : 0);
    }, 0);
  }, [selectedTweaks]);

  const toggleTweak = (id: string) => {
    setSelectedTweaks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Domain Icon helper
  const getDomainIcon = (domain: WorkloadDomain) => {
    switch (domain) {
      case 'programming':
        return <IconCode className="w-5 h-5" />;
      case 'design':
        return <IconPalette className="w-5 h-5" />;
      case '3d_video':
        return <IconVideo className="w-5 h-5" />;
      case 'ai_ml':
        return <IconBrain className="w-5 h-5" />;
      case 'general':
        return <IconSchool className="w-5 h-5" />;
    }
  };

  // ScrollTriggered Animations for Dashboard Sections
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Top Steps Card entrance on scroll
      if (stepsCardRef.current) {
        const stepsTl = gsap.timeline({
          scrollTrigger: {
            trigger: stepsCardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        stepsTl.fromTo(
          stepsCardRef.current.querySelector('.steps-header'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

        stepsTl.fromTo(
          stepsCardRef.current.querySelectorAll('.step1-card'),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.25'
        );

        stepsTl.fromTo(
          stepsCardRef.current.querySelector('.step1-alert'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );

        stepsTl.fromTo(
          stepsCardRef.current.querySelectorAll('.step2-card'),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
          },
          '-=0.2'
        );

        stepsTl.fromTo(
          stepsCardRef.current.querySelector('.step3-section'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // 2. Split View entrance on scroll
      if (splitViewRef.current) {
        const splitTl = gsap.timeline({
          scrollTrigger: {
            trigger: splitViewRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        splitTl.fromTo(
          splitViewRef.current.querySelector('.schematic-col'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
        );

        splitTl.fromTo(
          splitViewRef.current.querySelector('.recommendation-card'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.35'
        );

        splitTl.fromTo(
          splitViewRef.current.querySelectorAll('.spec-grid-item'),
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.25'
        );

        splitTl.fromTo(
          splitViewRef.current.querySelector('.customizer-card'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

        splitTl.fromTo(
          splitViewRef.current.querySelector('.desk-card'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // 3. Compare Both Table entrance on scroll
      if (compareViewRef.current) {
        const compareTl = gsap.timeline({
          scrollTrigger: {
            trigger: compareViewRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        compareTl.fromTo(
          compareViewRef.current.querySelector('.compare-header'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

        compareTl.fromTo(
          compareViewRef.current.querySelectorAll('.compare-row'),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    });

    return () => ctx.revert();
  }, [formFactor]);

  // Micro-transition on tier or domain change
  useEffect(() => {
    if (recCardRef.current) {
      gsap.fromTo(
        recCardRef.current,
        { opacity: 0.65, y: 6 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
      );
    }
  }, [selectedDomain, selectedTier, formFactor]);

  // WhatsApp Consultation Message Generator (direct & honest)
  const generateWhatsAppUrl = () => {
    const isDesktop = formFactor === 'desktop';
    const chosenName = isDesktop ? activeDesktop.name : activeLaptop.name;
    const basePrice = isDesktop
      ? activeDesktop.totalWithMonitorInr
      : activeLaptop.approxPriceInr;
    const totalPrice = basePrice + tweaksExtraCost;

    const message = `Hi instudia team! 
I was checking the PC/Laptop Builder tool on your site.

• Course / Focus: ${currentDomain.title}
• Looking for: ${isDesktop ? 'Desktop PC Rig' : 'Laptop'}
• Configuration: ${chosenName} (${selectedTier.toUpperCase()} tier)
• Target Budget: ${formatINR(totalPrice)}
${
  selectedTweaks.length > 0
    ? `• Upgrades added: ${selectedTweaks.join(', ')}\n`
    : ''
}
Can you help verify if local shops in Dimapur have this in stock or if the quoted price is fair?`;

    return `https://wa.me/918798587779?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full font-jakarta text-[#1B1C1E]">
      {/* ── TOP STEP SELECTOR BAR ── */}
      <div
        ref={stepsCardRef}
        className="mb-8 bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm"
      >
        <div className="steps-header flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-brandpurple px-3 py-1 bg-brandpurple/10 rounded-full inline-block mb-2">
              Student Tech Advice
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B1C1E]">
              What You Actually Need to Know Before Spending Money
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Verified Dimapur & Online Street Prices (2026)
          </div>
        </div>

        {/* ── STEP 1: Discipline / Workload ── */}
        <div className="mt-6">
          <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 block">
            Step 1: What will you actually be doing on this machine?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(Object.keys(DOMAIN_PROFILES) as WorkloadDomain[]).map((dom) => {
              const meta = DOMAIN_PROFILES[dom];
              const isSelected = selectedDomain === dom;
              return (
                <button
                  key={dom}
                  type="button"
                  onClick={() => setSelectedDomain(dom)}
                  className={`step1-card text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10 translate-y-[-2px]'
                      : 'border-neutral-100 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
                  }`}
                >
                  <div>
                    <div
                      className={`inline-flex p-2.5 rounded-xl mb-3 ${
                        isSelected
                          ? 'bg-brandpurple text-white'
                          : 'bg-neutral-100 text-gray-700'
                      }`}
                    >
                      {getDomainIcon(dom)}
                    </div>
                    <div className="text-xs font-black tracking-wider uppercase text-gray-400 mb-0.5">
                      {meta.badge}
                    </div>
                    <div className="font-bold text-sm text-[#1B1C1E] leading-snug">
                      {meta.title}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-gray-500 line-clamp-2">
                    {meta.shortDesc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Senior Dev Reality Check */}
          <div className="step1-alert mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#1B1C1E] uppercase tracking-wide">
                Key Apps:
              </span>
              {currentDomain.apps.map((app) => (
                <span
                  key={app}
                  className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md font-semibold text-gray-700 shadow-2xs"
                >
                  {app}
                </span>
              ))}
            </div>
            <div className="text-amber-800 font-medium bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/70 flex items-center gap-1.5">
              <IconAlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span><strong>Mentor warning:</strong> {currentDomain.gotchaNote}</span>
            </div>
          </div>
        </div>

        {/* ── STEP 2: Form Factor Choice ── */}
        <div className="mt-8 pt-8 border-t border-neutral-100">
          <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 block">
            Step 2: Do you need to carry it to college or instudia?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormFactor('laptop')}
              className={`step2-card p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                formFactor === 'laptop'
                  ? 'border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10'
                  : 'border-neutral-100 bg-white hover:border-neutral-200'
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  formFactor === 'laptop'
                    ? 'bg-brandpurple text-white'
                    : 'bg-neutral-100 text-gray-700'
                }`}
              >
                <IconDeviceLaptop className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-[#1B1C1E] text-base">
                  Laptop (Portable)
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Take it to classes, lab sessions, and coffee shops. Built-in battery handles local load shedding with zero interruption.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormFactor('desktop')}
              className={`step2-card p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                formFactor === 'desktop'
                  ? 'border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10'
                  : 'border-neutral-100 bg-white hover:border-neutral-200'
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  formFactor === 'desktop'
                    ? 'bg-brandpurple text-white'
                    : 'bg-neutral-100 text-gray-700'
                }`}
              >
                <IconDeviceDesktop className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-[#1B1C1E] text-base">
                  Custom Desktop PC
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Best value for money. ~50% faster rendering than laptops at the same price, comfortable 24" eye-level screen, and easy to upgrade over 5 years.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormFactor('compare')}
              className={`step2-card p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                formFactor === 'compare'
                  ? 'border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10'
                  : 'border-neutral-100 bg-white hover:border-neutral-200'
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  formFactor === 'compare'
                    ? 'bg-brandpurple text-white'
                    : 'bg-neutral-100 text-gray-700'
                }`}
              >
                <IconArrowsLeftRight className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-[#1B1C1E] text-base">
                  Compare Both (Advisor)
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Torn between the two? See real-world trade-offs covering power cuts, repairability, and budget value.
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── STEP 3: Budget Tiers ── */}
        <div className="step3-section mt-8 pt-8 border-t border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 block">
                Step 3: What is your realistic budget limit?
              </label>
              <span className="text-xs text-gray-500">
                Pick a budget bracket to see what you actually get for your money
              </span>
            </div>

            <div className="inline-flex p-1 bg-neutral-100 rounded-2xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setSelectedTier('budget')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === 'budget'
                    ? 'bg-white text-[#1B1C1E] shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Budget Entry (Under ₹45k)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier('sweet_spot')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  selectedTier === 'sweet_spot'
                    ? 'bg-brandpurple text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <IconSparkles className="w-3.5 h-3.5" />
                Sweet Spot (₹50k-₹75k)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier('future_proof')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === 'future_proof'
                    ? 'bg-white text-[#1B1C1E] shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                High-End / Workstation (₹85k+)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── HEAD-TO-HEAD TRADE-OFF COMPARISON TABLE ── */}
      {formFactor === 'compare' && (
        <div
          ref={compareViewRef}
          className="mb-12 bg-white rounded-3xl border border-neutral-100 p-6 md:p-10 shadow-sm"
        >
          <div className="compare-header max-w-3xl mb-8">
            <span className="text-xs font-black tracking-widest uppercase text-brandpurple px-3 py-1 bg-brandpurple/10 rounded-full inline-block mb-3">
              Honest Comparison
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B1C1E]">
              Laptop or Desktop PC: Which one makes practical sense?
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Here is what we tell students sitting across our desk in Dimapur who are confused about whether to buy a laptop or build a PC.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="py-4 px-4 font-black uppercase text-xs tracking-wider text-gray-400 w-1/4">
                    Real-World Factor
                  </th>
                  <th className="py-4 px-4 font-black uppercase text-xs tracking-wider text-brandpurple w-1/3">
                    Laptop
                  </th>
                  <th className="py-4 px-4 font-black uppercase text-xs tracking-wider text-emerald-600 w-1/3">
                    Custom Desktop PC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {LAPTOP_VS_DESKTOP_TRADEOFFS.map((row, idx) => (
                  <tr key={idx} className="compare-row hover:bg-neutral-50/60 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-extrabold text-[#1B1C1E]">{row.factor}</div>
                      <div className="text-[11px] text-gray-400 mt-1 leading-snug">
                        {row.guidance}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top text-gray-700 bg-brandpurple/[0.02]">
                      {row.laptopVerdict}
                    </td>
                    <td className="py-4 px-4 align-top text-gray-700 bg-emerald-50/[0.2]">
                      {row.desktopVerdict}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600">
              <span className="font-bold text-[#1B1C1E]">Our verdict:</span> If you commute to college or instudia labs, get a <strong>Laptop</strong>. If you work from your home study desk and do heavy 3D or video rendering, build a <strong>Desktop PC with a UPS</strong>.
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setFormFactor('laptop')}
                className="px-4 py-2 bg-brandpurple text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-90"
              >
                Show Laptops
              </button>
              <button
                type="button"
                onClick={() => setFormFactor('desktop')}
                className="px-4 py-2 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 text-xs font-bold rounded-xl shadow-2xs transition-all"
              >
                Show Desktop Builds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SPLIT VIEW: 2D MODEL (LEFT) + HARDWARE ADVICE & ACTIONS (RIGHT) ── */}
      {formFactor !== 'compare' && (
        <div
          ref={splitViewRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* ── LEFT COLUMN: 2D SCHEMATIC MODEL (Sticky on Desktop) ── */}
          <div className="schematic-col lg:col-span-5 lg:sticky lg:top-28">
            <RigSchematic2D
              formFactor={formFactor}
              selectedDomain={selectedDomain}
              activeLaptop={activeLaptop}
              activeDesktop={activeDesktop}
              selectedTweaks={selectedTweaks}
              onToggleTweak={toggleTweak}
            />

            {/* Quick Consultation CTA under model */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-neutral-100 flex items-center justify-between text-xs text-gray-600 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-brandpurple/10 text-brandpurple rounded-lg">
                  <IconShieldCheck className="w-4 h-4" />
                </span>
                <span>Dimapur desk verification is 100% free.</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="font-bold text-[#1B1C1E] underline hover:text-brandpurple"
              >
                View Print Sheet
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN: CONFIGURATION DETAILS & ACTIONS ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {formFactor === 'laptop' ? (
              /* ── LAPTOP DETAIL CARD ── */
              <div
                ref={recCardRef}
                className="recommendation-card bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm relative overflow-hidden"
              >
                {activeLaptop.tier === 'sweet_spot' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    <IconSparkles className="w-3.5 h-3.5" />
                    Recommended Sweet Spot
                  </div>
                )}
                {activeLaptop.tier === 'future_proof' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 text-white font-black text-xs uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    High-End Workstation
                  </div>
                )}
                {activeLaptop.tier === 'budget' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-gray-700 font-black text-xs uppercase tracking-wider rounded-full mb-3 border border-neutral-200">
                    Budget Starting Machine
                  </div>
                )}

                <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">
                  {activeLaptop.brand} • Model SKU: {activeLaptop.modelCode}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B1C1E] mb-2">
                  {activeLaptop.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeLaptop.whyBest}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex flex-wrap items-baseline gap-3 pb-6 border-b border-neutral-100">
                  <span className="text-3xl md:text-4xl font-black text-[#1B1C1E]">
                    {formatINR(activeLaptop.approxPriceInr + tweaksExtraCost)}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    Current street price in India
                  </span>
                  {tweaksExtraCost > 0 && (
                    <span className="text-xs font-bold text-brandpurple bg-brandpurple/10 px-2.5 py-1 rounded-full">
                      +{formatINR(tweaksExtraCost)} custom upgrades
                    </span>
                  )}
                </div>

                {/* Specs Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="spec-grid-item p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5">
                      Processor
                    </div>
                    <div className="font-bold text-[#1B1C1E]">{activeLaptop.specs.cpu}</div>
                  </div>

                  <div className="spec-grid-item p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5 flex justify-between">
                      <span>Memory (RAM)</span>
                      <span className={`font-bold ${activeLaptop.specs.ramExpandable ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {activeLaptop.specs.ramExpandable ? 'Slot Available' : 'Soldered (Non-upgradeable)'}
                      </span>
                    </div>
                    <div className="font-bold text-[#1B1C1E]">{activeLaptop.specs.ram}</div>
                  </div>

                  <div className="spec-grid-item p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5">
                      Graphics
                    </div>
                    <div className="font-bold text-[#1B1C1E]">{activeLaptop.specs.gpu}</div>
                  </div>

                  <div className="spec-grid-item p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5">
                      Storage
                    </div>
                    <div className="font-bold text-[#1B1C1E]">{activeLaptop.specs.storage}</div>
                  </div>

                  <div className="spec-grid-item p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 sm:col-span-2">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5 flex justify-between">
                      <span>Screen Color & Gamut</span>
                      <span className="font-bold text-brandpurple">{activeLaptop.specs.colorGamut}</span>
                    </div>
                    <div className="font-bold text-[#1B1C1E]">{activeLaptop.specs.display}</div>
                  </div>
                </div>

                {/* Honest Gotcha Checklist */}
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <IconAlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
                        What to check before paying at the shop
                      </div>
                      {activeLaptop.gotchaAlerts.map((alert, idx) => (
                        <p key={idx} className="text-xs text-amber-900 leading-relaxed font-medium">
                          {alert}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-100 text-xs">
                  <div>
                    <span className="font-extrabold uppercase tracking-wider text-emerald-600 block mb-2">
                      Why we like this
                    </span>
                    <ul className="space-y-1.5">
                      {activeLaptop.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-extrabold uppercase tracking-wider text-rose-500 block mb-2">
                      The compromises
                    </span>
                    <ul className="space-y-1.5">
                      {activeLaptop.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <IconX className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* ── DESKTOP RIG DETAIL CARD ── */
              <div
                ref={recCardRef}
                className="recommendation-card bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm relative overflow-hidden"
              >
                {activeDesktop.tier === 'sweet_spot' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    <IconSparkles className="w-3.5 h-3.5" />
                    Recommended Sweet Spot Build
                  </div>
                )}
                {activeDesktop.tier === 'future_proof' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 text-white font-black text-xs uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    Heavy Creator Rig
                  </div>
                )}
                {activeDesktop.tier === 'budget' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-gray-700 font-black text-xs uppercase tracking-wider rounded-full mb-3 border border-neutral-200">
                    Budget Starting APU Rig
                  </div>
                )}

                <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">
                  Custom Component Bill of Materials
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B1C1E] mb-2">
                  {activeDesktop.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeDesktop.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex flex-wrap items-baseline gap-6 pb-6 border-b border-neutral-100">
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-[#1B1C1E]">
                      {formatINR(activeDesktop.totalWithMonitorInr + tweaksExtraCost)}
                    </span>
                    <div className="text-xs text-gray-400 font-semibold mt-0.5">
                      Complete Setup (Tower + 24" Color IPS Monitor)
                    </div>
                  </div>
                  <div className="pl-6 border-l border-neutral-200">
                    <span className="text-xl font-bold text-gray-700">
                      {formatINR(activeDesktop.towerPriceInr + tweaksExtraCost)}
                    </span>
                    <div className="text-xs text-gray-400 font-semibold mt-0.5">
                      Tower Only
                    </div>
                  </div>
                </div>

                {/* Itemized Parts List */}
                <div className="mt-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                    Part by Part Pricing
                  </h4>
                  <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden">
                    {activeDesktop.parts.map((part, idx) => (
                      <div
                        key={idx}
                        className="spec-grid-item p-3 bg-white hover:bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-neutral-100 text-gray-600 rounded font-black text-[10px] uppercase w-18 text-center shrink-0">
                            {part.category}
                          </span>
                          <div>
                            <div className="font-bold text-[#1B1C1E]">{part.name}</div>
                            <div className="text-[11px] text-gray-500">{part.specNote}</div>
                          </div>
                        </div>
                        <div className="font-extrabold text-gray-800 shrink-0 sm:text-right pl-2">
                          {formatINR(part.approxPriceInr)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Power & UPS Advice */}
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <IconBolt className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
                        Nagaland Power Reality Check
                      </div>
                      <div className="text-xs text-amber-900 font-bold mb-1">
                        Recommended: {activeDesktop.upsRecommendation.model} (~{formatINR(activeDesktop.upsRecommendation.approxPriceInr)})
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        {activeDesktop.upsRecommendation.whyNeeded}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── SPEC CUSTOMIZER ADD-ONS ── */}
            <div className="customizer-card bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <IconAdjustmentsHorizontal className="w-5 h-5 text-brandpurple" />
                <h4 className="font-extrabold text-[#1B1C1E] text-base">
                  Custom Upgrades & Add-ons
                </h4>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Toggle upgrades to see how they impact your total budget and check the 2D model on the left.
              </p>

              <div className="space-y-3">
                {SPEC_TWEAKS.map((tweak) => {
                  const isChecked = selectedTweaks.includes(tweak.id);
                  return (
                    <label
                      key={tweak.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-brandpurple bg-brandpurple/[0.04]'
                          : 'border-neutral-100 hover:border-neutral-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTweak(tweak.id)}
                        className="mt-1 rounded border-gray-300 text-brandpurple focus:ring-brandpurple"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#1B1C1E] flex justify-between items-center">
                          <span>{tweak.label}</span>
                          <span className="text-brandpurple font-black ml-2">
                            +{formatINR(tweak.extraPriceInr)}
                          </span>
                        </div>
                        <div className="text-gray-500 mt-1 leading-normal text-[11px]">
                          {tweak.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ── LOCAL CONSULTATION ACTION CARD ── */}
            <div className="desk-card bg-white text-neutral-900 rounded-3xl p-6 border border-neutral-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-brandpurple/10 text-brandpurple rounded-xl border border-brandpurple/20">
                  <IconShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-brandpurple">
                    Free Consultation Desk
                  </div>
                  <div className="font-extrabold text-base text-neutral-900">
                    Want an instudia mentor to verify this?
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Send this specification directly to our WhatsApp counselor or print it out and visit us at <strong>Vikiye Center, Fellowship Colony, Dimapur</strong>. We will tell you if local shops have fair pricing or if a part has known issues.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <IconBrandWhatsapp className="w-4 h-4" />
                  Verify on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setShowPrintModal(true)}
                  className="py-3.5 px-5 bg-white hover:bg-neutral-50 text-neutral-900 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-neutral-300 hover:border-neutral-400 shadow-2xs"
                >
                  <IconPrinter className="w-4 h-4" />
                  Print Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Printable Spec Sheet / Consultation Export ── */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-neutral-200">
            <button
              type="button"
              onClick={() => setShowPrintModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-gray-600"
            >
              <IconX className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-neutral-900 pb-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-[#1B1C1E]">instudia</div>
                  <div className="text-xs text-gray-500">
                    Vikiye Center, Fellowship Colony, Dimapur, Nagaland
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold text-[#1B1C1E]">Student Hardware Sheet</div>
                  <div className="text-gray-500">{new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl mb-6 text-xs space-y-1">
              <div><strong>Primary Focus:</strong> {currentDomain.title}</div>
              <div><strong>Form Factor:</strong> {formFactor === 'desktop' ? 'Custom Desktop PC' : 'Laptop'}</div>
              <div><strong>Budget Tier:</strong> {selectedTier.toUpperCase()}</div>
            </div>

            {formFactor === 'laptop' ? (
              <div className="space-y-4 text-xs">
                <div className="font-bold text-base text-[#1B1C1E]">
                  {activeLaptop.name} ({activeLaptop.brand} {activeLaptop.modelCode})
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <div><strong>CPU:</strong> {activeLaptop.specs.cpu}</div>
                  <div><strong>RAM:</strong> {activeLaptop.specs.ram}</div>
                  <div><strong>Storage:</strong> {activeLaptop.specs.storage}</div>
                  <div><strong>GPU:</strong> {activeLaptop.specs.gpu}</div>
                  <div><strong>Display:</strong> {activeLaptop.specs.display}</div>
                  <div><strong>Color Gamut:</strong> {activeLaptop.specs.colorGamut}</div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-[11px]">
                  <strong>Warning before buying:</strong> {activeLaptop.gotchaAlerts[0]}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="font-bold text-base text-[#1B1C1E]">
                  {activeDesktop.name}
                </div>
                <div className="divide-y divide-neutral-100">
                  {activeDesktop.parts.map((p, i) => (
                    <div key={i} className="py-1.5 flex justify-between">
                      <span><strong>{p.category.toUpperCase()}:</strong> {p.name}</span>
                      <span className="font-bold">{formatINR(p.approxPriceInr)}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-[11px]">
                  <strong>Power Advice:</strong> {activeDesktop.upsRecommendation.model} (~{formatINR(activeDesktop.upsRecommendation.approxPriceInr)})
                </div>
              </div>
            )}

            {selectedTweaks.length > 0 && (
              <div className="mt-4 pt-4 border-t border-neutral-200 text-xs">
                <div className="font-bold text-gray-800 mb-1">Selected Upgrades:</div>
                {selectedTweaks.map((id) => {
                  const t = SPEC_TWEAKS.find((item) => item.id === id);
                  return (
                    <div key={id} className="flex justify-between text-gray-600">
                      <span>{t?.label}</span>
                      <span className="font-bold">+{formatINR(t?.extraPriceInr || 0)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 pt-4 border-t-2 border-neutral-900 flex justify-between items-baseline">
              <span className="font-black text-sm uppercase">Estimated Budget</span>
              <span className="text-2xl font-black text-[#1B1C1E]">
                {formatINR(
                  (formFactor === 'desktop'
                    ? activeDesktop.totalWithMonitorInr
                    : activeLaptop.approxPriceInr) + tweaksExtraCost
                )}
              </span>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-brandpurple hover:bg-brandpurple/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <IconPrinter className="w-4 h-4" />
                Print Specification Sheet
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="py-3 px-6 bg-neutral-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-neutral-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
