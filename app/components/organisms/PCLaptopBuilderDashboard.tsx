"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconDeviceLaptop,
  IconDeviceDesktop,
  IconCpu,
  IconBrain,
  IconPalette,
  IconVideo,
  IconCode,
  IconSchool,
  IconAlertTriangle,
  IconCheck,
  IconPrinter,
  IconBrandWhatsapp,
  IconShieldCheck,
  IconSparkles,
  IconChevronDown,
  IconAdjustmentsHorizontal,
  IconBolt,
  IconEye,
  IconLayoutGrid,
} from '@tabler/icons-react';
import {
  WorkloadDomain,
  FormFactorChoice,
  BudgetTier,
  DOMAIN_PROFILES,
  LAPTOP_CATALOG,
  DESKTOP_BUILDS,
  SPEC_TWEAKS,
  LaptopModel,
  DesktopBuildSheet,
} from '@/data/hardware-catalog';
import RigSchematic2D from './RigSchematic2D';

export default function PCLaptopBuilderDashboard() {
  // State: Focus Domain & Active Format/Tier
  const [selectedDomain, setSelectedDomain] = useState<WorkloadDomain>('programming');
  const [formFactor, setFormFactor] = useState<FormFactorChoice>('laptop');
  const [selectedTier, setSelectedTier] = useState<BudgetTier>('sweet_spot');
  const [activeTab, setActiveTab] = useState<'summary' | 'schematic'>('summary');
  const [showDeepSpecs, setShowDeepSpecs] = useState<boolean>(false);
  const [selectedTweaks, setSelectedTweaks] = useState<string[]>([]);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Active domain metadata
  const currentDomain = DOMAIN_PROFILES[selectedDomain];

  // Currency formatter
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

  // Setup GSAP entrance and reactive micro-transitions
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Micro-transition on selection change
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0.7, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [selectedDomain, selectedTier, formFactor, activeTab]);

  // WhatsApp link generator
  const generateWhatsAppUrl = () => {
    const isDesktop = formFactor === 'desktop';
    const chosenName = isDesktop ? activeDesktop.name : activeLaptop.name;
    const basePrice = isDesktop
      ? activeDesktop.totalWithMonitorInr
      : activeLaptop.approxPriceInr;
    const totalPrice = basePrice + tweaksExtraCost;

    const message = `Hi instudia team! 
I used the Hardware Builder on your site.

• Course / Focus: ${currentDomain.title}
• Recommended: ${chosenName} (${selectedTier.toUpperCase()} tier)
• Estimated Budget: ${formatINR(totalPrice)}
${
  selectedTweaks.length > 0
    ? `• Upgrades selected: ${selectedTweaks.join(', ')}\n`
    : ''
}
Could an instructor verify if local shops in Dimapur have fair pricing for this?`;

    return `https://wa.me/918798587779?text=${encodeURIComponent(message)}`;
  };

  return (
    <div ref={containerRef} className="w-full font-jakarta text-neutral-900 max-w-4xl mx-auto">
      {/* ── 1. COMPACT 2-ROW INTERACTIVE CHIP SELECTOR (NO CLUTTER) ── */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-neutral-200 shadow-xs mb-8">
        {/* Row 1: Focus Domain */}
        <div className="mb-5">
          <label className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2.5">
            1. Select Your Study Focus / Craft
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'programming', label: 'Programming & Web', icon: <IconCode className="w-4 h-4" /> },
              { id: 'design', label: 'Graphic Design & UI', icon: <IconPalette className="w-4 h-4" /> },
              { id: '3d_video', label: '3D, VFX & Video', icon: <IconVideo className="w-4 h-4" /> },
              { id: 'ai_ml', label: 'AI & Data Science', icon: <IconBrain className="w-4 h-4" /> },
              { id: 'general', label: 'BCA & College Studies', icon: <IconSchool className="w-4 h-4" /> },
            ].map((item) => {
              const isSelected = selectedDomain === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDomain(item.id as WorkloadDomain)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brandpurple text-white shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Budget & Form Factor */}
        <div>
          <label className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2.5">
            2. Choose Budget & Preference
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: 'Laptop: Under ₹45k (Budget)',
                onClick: () => {
                  setFormFactor('laptop');
                  setSelectedTier('budget');
                },
                isActive: formFactor === 'laptop' && selectedTier === 'budget',
                icon: <IconDeviceLaptop className="w-4 h-4" />,
              },
              {
                label: 'Laptop: ₹50k-₹75k (Sweet Spot)',
                onClick: () => {
                  setFormFactor('laptop');
                  setSelectedTier('sweet_spot');
                },
                isActive: formFactor === 'laptop' && selectedTier === 'sweet_spot',
                icon: <IconSparkles className="w-4 h-4 text-amber-500" />,
              },
              {
                label: 'Laptop: ₹90k+ (Pro Workstation)',
                onClick: () => {
                  setFormFactor('laptop');
                  setSelectedTier('future_proof');
                },
                isActive: formFactor === 'laptop' && selectedTier === 'future_proof',
                icon: <IconDeviceLaptop className="w-4 h-4" />,
              },
              {
                label: 'Custom Desktop PC Rig',
                onClick: () => {
                  setFormFactor('desktop');
                  // Keep tier or default to sweet_spot
                },
                isActive: formFactor === 'desktop',
                icon: <IconDeviceDesktop className="w-4 h-4" />,
              },
            ].map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={option.onClick}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  option.isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. DECISIVE VERDICT CARD (CLEAN, PROMINENT, UNCLUTTERED) ── */}
      <div
        ref={cardRef}
        className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-sm relative overflow-hidden"
      >
        {/* Card Header: Category Badge + Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brandpurple/10 text-brandpurple font-black text-[11px] uppercase tracking-wider rounded-full mb-2">
              <IconSparkles className="w-3.5 h-3.5" />
              instudia Verified Best Pick for {currentDomain.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 tracking-tight">
              {formFactor === 'desktop' ? activeDesktop.name : activeLaptop.name}
            </h2>
            <div className="text-xs text-neutral-500 font-medium mt-0.5">
              {formFactor === 'desktop' ? 'Modular Desktop Workstation' : `Model SKU: ${activeLaptop.brand} ${activeLaptop.modelCode}`}
            </div>
          </div>

          {/* Clean Big Price */}
          <div className="sm:text-right shrink-0">
            <div className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              {formatINR(
                (formFactor === 'desktop'
                  ? activeDesktop.totalWithMonitorInr
                  : activeLaptop.approxPriceInr) + tweaksExtraCost
              )}
            </div>
            <div className="text-[11px] text-neutral-400 font-semibold mt-0.5">
              {formFactor === 'desktop' ? 'Complete Rig (Tower + Color Monitor)' : 'Verified Street Price in India'}
            </div>
          </div>
        </div>

        {/* View Switcher Tabs: Summary vs 2D Model */}
        <div className="mt-5 flex gap-2 border-b border-neutral-100 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            <IconLayoutGrid className="w-4 h-4" />
            <span>Why This Machine Wins</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schematic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'schematic'
                ? 'bg-brandpurple text-white shadow-2xs'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            <IconEye className="w-4 h-4" />
            <span>Inspect 2D Hardware Blueprint</span>
          </button>
        </div>

        {/* ── TAB A: DECISIVE 3-BULLET VERDICT (NO TEXT OVERLOAD) ── */}
        {activeTab === 'summary' && (
          <div className="mt-6">
            {/* The 3 Plain-English Reasons That Matter */}
            <div className="space-y-3 mb-6">
              {formFactor === 'laptop' ? (
                <>
                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                      <IconCheck className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        {activeLaptop.specs.ram} ({activeLaptop.specs.ramExpandable ? 'Upgradeable Slot' : 'Integrated'}):
                      </strong>
                      Runs VS Code, Docker emulators, or Photoshop artboards smoothly without freezing or SSD memory paging.
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-purple-100 text-brandpurple rounded-lg shrink-0 mt-0.5">
                      <IconPalette className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        {activeLaptop.specs.display} ({activeLaptop.specs.colorGamut}):
                      </strong>
                      Accurate color calibration ensures your designs and code interfaces look crisp and don't wash out on client phones.
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                      <IconBolt className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        {activeLaptop.specs.batteryWhr} Whr Battery (~{activeLaptop.specs.weightKg} kg):
                      </strong>
                      Lightweight chassis that keeps you working through Dimapur power cuts with zero project interruption.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                      <IconCheck className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        Unmatched Multi-Core Rendering Speed:
                      </strong>
                      Delivers ~50% faster compilation and video render times than any similarly priced laptop.
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-purple-100 text-brandpurple rounded-lg shrink-0 mt-0.5">
                      <IconPalette className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        24" - 27" Eye-Level IPS Color Monitor Included:
                      </strong>
                      100% sRGB color accuracy with ergonomic eye-level posture for 8+ hour coding or design sessions.
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-start gap-3">
                    <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                      <IconBolt className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-950 font-bold block mb-0.5">
                        Includes Dedicated UPS Advisory:
                      </strong>
                      Pairs with {activeDesktop.upsRecommendation.model} to safeguard project files through regional power trips.
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Single Plain-English Buying Alert */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 mb-6 flex items-start gap-3">
              <IconAlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 font-medium leading-relaxed">
                <strong>What to check before paying:</strong>{' '}
                {formFactor === 'laptop'
                  ? activeLaptop.gotchaAlerts[0]
                  : activeDesktop.upsRecommendation.whyNeeded}
              </div>
            </div>

            {/* Decisive Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <IconBrandWhatsapp className="w-4 h-4" />
                Ask an instudia Mentor on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="py-3.5 px-5 bg-white hover:bg-neutral-50 text-neutral-900 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-neutral-300 hover:border-neutral-400 shadow-2xs"
              >
                <IconPrinter className="w-4 h-4" />
                Print Specification Sheet
              </button>
            </div>

            {/* Progressive Disclosure: Technical Specs & Upgrades Accordion */}
            <div className="mt-6 pt-5 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowDeepSpecs(!showDeepSpecs)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
              >
                <IconAdjustmentsHorizontal className="w-4 h-4 text-brandpurple" />
                <span>{showDeepSpecs ? 'Hide' : 'View'} Full Specs & Custom Upgrades</span>
                <IconChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    showDeepSpecs ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showDeepSpecs && (
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-5">
                  {/* Detailed Spec Grid */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Component Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {formFactor === 'laptop' ? (
                        <>
                          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                            <span className="text-[10px] text-neutral-400 font-bold block">CPU</span>
                            <span className="font-semibold text-neutral-900">{activeLaptop.specs.cpu}</span>
                          </div>
                          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                            <span className="text-[10px] text-neutral-400 font-bold block">RAM</span>
                            <span className="font-semibold text-neutral-900">{activeLaptop.specs.ram}</span>
                          </div>
                          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                            <span className="text-[10px] text-neutral-400 font-bold block">Storage</span>
                            <span className="font-semibold text-neutral-900">{activeLaptop.specs.storage}</span>
                          </div>
                          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                            <span className="text-[10px] text-neutral-400 font-bold block">GPU</span>
                            <span className="font-semibold text-neutral-900">{activeLaptop.specs.gpu}</span>
                          </div>
                        </>
                      ) : (
                        activeDesktop.parts.map((part, i) => (
                          <div key={i} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70 flex justify-between">
                            <span className="text-neutral-600 font-medium">{part.category.toUpperCase()}: {part.name}</span>
                            <span className="font-bold text-neutral-900 ml-2">{formatINR(part.approxPriceInr)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Optional Customizer Tweaks */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Optional Upgrades & Add-ons
                    </h4>
                    <div className="space-y-2">
                      {SPEC_TWEAKS.map((tweak) => {
                        const isChecked = selectedTweaks.includes(tweak.id);
                        return (
                          <label
                            key={tweak.id}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                              isChecked
                                ? 'border-brandpurple bg-purple-50/40'
                                : 'border-neutral-200 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleTweak(tweak.id)}
                                className="rounded text-brandpurple focus:ring-brandpurple"
                              />
                              <span className="font-bold text-neutral-900">{tweak.label}</span>
                            </div>
                            <span className="font-extrabold text-brandpurple">
                              +{formatINR(tweak.extraPriceInr)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB B: INTERACTIVE 2D HARDWARE MODEL (INSPECT ON DEMAND) ── */}
        {activeTab === 'schematic' && (
          <div className="mt-6">
            <RigSchematic2D
              formFactor={formFactor === 'desktop' ? 'desktop' : 'laptop'}
              selectedDomain={selectedDomain}
              activeLaptop={activeLaptop}
              activeDesktop={activeDesktop}
              selectedTweaks={selectedTweaks}
              onToggleTweak={toggleTweak}
            />

            <div className="mt-4 flex justify-between items-center text-xs text-neutral-500">
              <span>💡 Tap components directly to test RAM or storage upgrades.</span>
              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className="text-brandpurple font-bold hover:underline"
              >
                Back to Verdict Summary ➔
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. PRINT / SPEC SHEET MODAL ── */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-neutral-200">
            <div className="border-b-2 border-neutral-900 pb-4 mb-5 flex justify-between items-center">
              <div>
                <div className="text-xl font-black text-neutral-950">instudia</div>
                <div className="text-xs text-neutral-500">
                  Vikiye Center, Fellowship Colony, Dimapur
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-neutral-950">Hardware Quote Sheet</div>
                <div className="text-neutral-500">{new Date().toLocaleDateString('en-IN')}</div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl mb-5 text-xs space-y-1">
              <div><strong>Discipline:</strong> {currentDomain.title}</div>
              <div><strong>Machine:</strong> {formFactor === 'desktop' ? activeDesktop.name : `${activeLaptop.name} (${activeLaptop.brand})`}</div>
              <div><strong>Est. Street Budget:</strong> {formatINR((formFactor === 'desktop' ? activeDesktop.totalWithMonitorInr : activeLaptop.approxPriceInr) + tweaksExtraCost)}</div>
            </div>

            <div className="space-y-3 text-xs mb-6">
              {formFactor === 'laptop' ? (
                <div className="grid grid-cols-2 gap-2 text-neutral-700">
                  <div><strong>CPU:</strong> {activeLaptop.specs.cpu}</div>
                  <div><strong>RAM:</strong> {activeLaptop.specs.ram}</div>
                  <div><strong>Storage:</strong> {activeLaptop.specs.storage}</div>
                  <div><strong>Display:</strong> {activeLaptop.specs.display}</div>
                </div>
              ) : (
                activeDesktop.parts.map((p, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-neutral-100">
                    <span>{p.category.toUpperCase()}: {p.name}</span>
                    <span className="font-bold">{formatINR(p.approxPriceInr)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs mb-6">
              <strong>Shop Warning:</strong> {formFactor === 'laptop' ? activeLaptop.gotchaAlerts[0] : activeDesktop.upsRecommendation.whyNeeded}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-brandpurple hover:bg-brandpurple/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <IconPrinter className="w-4 h-4" />
                Print / Save PDF
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="py-3 px-6 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-200"
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
