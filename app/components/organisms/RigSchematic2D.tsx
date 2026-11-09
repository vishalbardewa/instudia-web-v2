"use client";

import React, { useState, useMemo } from 'react';
import {
  WorkloadDomain,
  LaptopModel,
  DesktopBuildSheet,
} from '@/data/hardware-catalog';
import {
  IconCpu,
  IconBolt,
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconSparkles,
  IconShieldCheck,
  IconEye,
} from '@tabler/icons-react';

interface RigSchematic2DProps {
  formFactor: 'laptop' | 'desktop';
  selectedDomain: WorkloadDomain;
  activeLaptop: LaptopModel;
  activeDesktop: DesktopBuildSheet;
  selectedTweaks: string[];
  onToggleTweak: (id: string) => void;
}

export default function RigSchematic2D({
  formFactor,
  selectedDomain,
  activeLaptop,
  activeDesktop,
  selectedTweaks,
  onToggleTweak,
}: RigSchematic2DProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const has32GbRam =
    selectedTweaks.includes('ram-32gb') ||
    (formFactor === 'desktop' && activeDesktop.tier !== 'budget');
  const has1TbSsd =
    selectedTweaks.includes('ssd-1tb') ||
    (formFactor === 'desktop' && activeDesktop.tier === 'future_proof') ||
    (formFactor === 'laptop' && activeLaptop.tier === 'future_proof');
  const hasUps =
    selectedTweaks.includes('ups-backup') || formFactor === 'laptop';
  const isColorAccurate =
    formFactor === 'laptop'
      ? activeLaptop.specs.colorGamut.includes('100%') ||
      activeLaptop.specs.colorGamut.includes('DCI-P3')
      : true;

  // Concrete Hardware Status Derivations
  const ramGb = useMemo(() => {
    if (has32GbRam) return 32;
    if (formFactor === 'laptop') {
      return activeLaptop.specs.ram.includes('16GB') ? 16 : 8;
    }
    const desktopRam =
      activeDesktop.parts.find((p) => p.category === 'ram')?.name || '';
    return desktopRam.includes('32GB') ? 32 : 16;
  }, [has32GbRam, formFactor, activeLaptop, activeDesktop]);

  const hasPowerProtection = formFactor === 'laptop' || hasUps;

  return (
    <div className="bg-white text-neutral-900 rounded-3xl p-5 md:p-6 border border-neutral-200 shadow-sm relative font-jakarta">
      {/* Light Technical Drawing Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-3xl"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.4) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Blueprint Header */}
      <div className="relative z-10 pb-5 border-b border-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                Technical Hardware Blueprint
              </span>
            </div>
            <h4 className="text-base font-extrabold text-neutral-950 mt-0.5">
              {formFactor === 'laptop'
                ? 'Laptop Architecture & Expandability'
                : 'Desktop Rig Component Topology'}
              <span className="text-xs font-semibold text-neutral-500 ml-2">
                {formFactor === 'laptop'
                  ? activeLaptop.brand
                  : activeDesktop.name.split(' ')[0]}
              </span>
            </h4>
          </div>
        </div>

        {/* Concrete Hardware Status Indicators (Zero Artificial Percentage Scores) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {/* 1. Memory Headroom Indicator */}
          <div
            className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-colors ${has32GbRam
                ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950'
                : ramGb >= 16
                  ? 'bg-purple-50/70 border-purple-200/80 text-purple-950'
                  : 'bg-amber-50/80 border-amber-200/80 text-amber-950'
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full shrink-0 ${has32GbRam
                  ? 'bg-emerald-600 ring-2 ring-emerald-200'
                  : ramGb >= 16
                    ? 'bg-brandpurple ring-2 ring-purple-200'
                    : 'bg-amber-500 ring-2 ring-amber-200'
                }`}
            />
            <div className="min-w-0">
              <div className="text-[9px] font-black uppercase tracking-wider text-neutral-500 leading-none">
                Memory Headroom
              </div>
              <div className="font-extrabold text-xs text-neutral-950 mt-0.5 truncate">
                {has32GbRam
                  ? '32GB Dual Channel'
                  : ramGb >= 16
                    ? '16GB Safe'
                    : '8GB Constrained'}
              </div>
              <div className="text-[10px] text-neutral-600 font-medium leading-none mt-0.5">
                {has32GbRam
                  ? 'Zero Paging Risk'
                  : ramGb >= 16
                    ? 'Multitasking Ready'
                    : 'Paging on Win 11'}
              </div>
            </div>
          </div>

          {/* 2. Color Accuracy Indicator */}
          <div
            className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-colors ${isColorAccurate
                ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200/80 text-amber-950'
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full shrink-0 ${isColorAccurate
                  ? 'bg-emerald-600 ring-2 ring-emerald-200'
                  : 'bg-amber-500 ring-2 ring-amber-200'
                }`}
            />
            <div className="min-w-0">
              <div className="text-[9px] font-black uppercase tracking-wider text-neutral-500 leading-none">
                Color Accuracy
              </div>
              <div className="font-extrabold text-xs text-neutral-950 mt-0.5 truncate">
                {isColorAccurate ? '100% sRGB / DCI-P3' : '45% NTSC Standard'}
              </div>
              <div className="text-[10px] text-neutral-600 font-medium leading-none mt-0.5">
                {isColorAccurate
                  ? 'Print & Web Safe'
                  : 'Muted Colors (Design Alert)'}
              </div>
            </div>
          </div>

          {/* 3. Power Protection Indicator */}
          <div
            className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-colors ${hasPowerProtection
                ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200/80 text-amber-950'
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full shrink-0 ${hasPowerProtection
                  ? 'bg-emerald-600 ring-2 ring-emerald-200'
                  : 'bg-amber-500 ring-2 ring-amber-200'
                }`}
            />
            <div className="min-w-0">
              <div className="text-[9px] font-black uppercase tracking-wider text-neutral-500 leading-none">
                Power Protection
              </div>
              <div className="font-extrabold text-xs text-neutral-950 mt-0.5 truncate">
                {formFactor === 'laptop'
                  ? `${activeLaptop.specs.batteryWhr} Whr Battery`
                  : hasUps
                    ? 'UPS Line-Interactive'
                    : 'Direct Wall Socket'}
              </div>
              <div className="text-[10px] text-neutral-600 font-medium leading-none mt-0.5">
                {formFactor === 'laptop'
                  ? 'Outage Immune'
                  : hasUps
                    ? '20m Safe Cutoff Buffer'
                    : 'Vulnerable in Dimapur'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2D SCHEMATIC CANVAS (CLEAN LIGHT THEME) ── */}
      <div className="relative z-10 py-5 flex flex-col items-center justify-center">
        {formFactor === 'laptop' ? (
          /* ── LAPTOP LIGHT SCHEMATIC ── */
          <div className="w-full max-w-[400px] select-none">
            {/* Screen Lid */}
            <button
              type="button"
              onClick={() => setActiveHotspot('screen')}
              aria-label="Inspect screen color accuracy and panel specifications"
              aria-pressed={activeHotspot === 'screen'}
              className={`w-full rounded-t-2xl p-3 border-2 cursor-pointer transition-all text-left focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${activeHotspot === 'screen'
                  ? 'border-brandpurple bg-purple-50/40 shadow-sm ring-2 ring-brandpurple/20'
                  : 'border-neutral-300 bg-neutral-100 hover:border-neutral-400'
                }`}
            >
              {/* Display Bezel */}
              <div className="bg-white rounded-xl p-3 border border-neutral-200 flex flex-col justify-between h-34 shadow-2xs">
                <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                  <span>16:10 Anti-Glare IPS</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />{' '}
                    HD Camera
                  </span>
                </div>

                {/* Display Gamut Swatch */}
                <div className="my-auto text-center">
                  <div
                    className={`h-5 rounded-md mb-2 transition-all border ${isColorAccurate
                        ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 border-purple-300 shadow-2xs'
                        : 'bg-gradient-to-r from-amber-200 via-amber-300 to-neutral-300 border-amber-300'
                      }`}
                  />
                  <div className="text-xs font-bold text-neutral-900">
                    {activeLaptop.specs.display.split('(')[0]}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider inline-block px-2.5 py-0.5 rounded-md mt-1 border ${isColorAccurate
                        ? 'bg-purple-50 text-purple-900 border-purple-200'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}
                  >
                    {isColorAccurate
                      ? '100% sRGB / DCI-P3 Color Calibrated'
                      : '45% NTSC Standard (Dull / Inaccurate)'}
                  </span>
                </div>

                <div className="text-[10px] text-neutral-500 text-center font-medium">
                  Tap to see color accuracy advice
                </div>
              </div>
            </button>

            {/* Central Hinge */}
            <div className="w-2/5 h-2 bg-neutral-200 mx-auto rounded-xs border-x border-b border-neutral-300" />

            {/* Laptop Base & Transparent Cutaway */}
            <div className="w-full bg-neutral-100 rounded-b-2xl p-3.5 border-2 border-neutral-300 shadow-xs">
              {/* Motherboard Tray */}
              <div className="bg-white rounded-xl p-3 border border-neutral-200 grid grid-cols-3 gap-2 text-center shadow-2xs">
                {/* CPU Die */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot('cpu')}
                  aria-label="Inspect CPU processor details"
                  aria-pressed={activeHotspot === 'cpu'}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all text-center focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px] flex flex-col items-center justify-center ${activeHotspot === 'cpu'
                      ? 'border-brandpurple bg-purple-50/50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    }`}
                >
                  <IconCpu className="w-5 h-5 text-brandpurple mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-neutral-900 line-clamp-1">
                    {activeLaptop.specs.cpu.split('(')[0]}
                  </div>
                  <div className="text-[9px] text-neutral-500 font-medium">
                    Processor
                  </div>
                </button>

                {/* RAM Slots */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveHotspot('ram');
                    onToggleTweak('ram-32gb');
                  }}
                  aria-label="Toggle 32GB RAM upgrade"
                  aria-pressed={has32GbRam}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all text-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 outline-hidden min-h-[44px] flex flex-col items-center justify-center ${has32GbRam || activeHotspot === 'ram'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    }`}
                >
                  <div className="flex justify-center gap-1 mb-1">
                    <span
                      className={`h-4 w-1.5 rounded-xs ${has32GbRam ? 'bg-emerald-600' : 'bg-brandpurple'
                        }`}
                    />
                    <span
                      className={`h-4 w-1.5 rounded-xs ${has32GbRam ? 'bg-emerald-600' : 'bg-neutral-300'
                        }`}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-neutral-900">
                    {has32GbRam
                      ? '32GB RAM'
                      : activeLaptop.specs.ram.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-bold">
                    {has32GbRam
                      ? 'Dual 16GB'
                      : activeLaptop.specs.ramExpandable
                        ? 'Tap +32GB'
                        : 'Soldered'}
                  </div>
                </button>

                {/* NVMe SSD */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveHotspot('storage');
                    onToggleTweak('ssd-1tb');
                  }}
                  aria-label="Toggle 1TB NVMe SSD upgrade"
                  aria-pressed={has1TbSsd}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all text-center focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-hidden min-h-[44px] flex flex-col items-center justify-center ${has1TbSsd || activeHotspot === 'storage'
                      ? 'border-blue-600 bg-blue-50/60 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    }`}
                >
                  <div className="h-4 w-7 bg-neutral-200 mx-auto mb-1 rounded-xs flex items-center justify-center text-[8px] text-blue-900 font-mono font-bold">
                    NVMe
                  </div>
                  <div className="text-[10px] font-bold text-neutral-900">
                    {has1TbSsd ? '1TB Gen4' : '512GB SSD'}
                  </div>
                  <div className="text-[9px] text-blue-700 font-bold">
                    {has1TbSsd ? 'Upgraded' : 'Tap +1TB'}
                  </div>
                </button>
              </div>

              {/* Integrated Battery Cell */}
              <button
                type="button"
                onClick={() => setActiveHotspot('battery')}
                aria-label="Inspect laptop battery and power cut protection"
                aria-pressed={activeHotspot === 'battery'}
                className="mt-2.5 w-full p-2.5 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-xs cursor-pointer hover:border-neutral-300 shadow-2xs transition-all text-left focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <IconBolt className="w-4 h-4 text-amber-500" />
                  <span className="text-[11px] text-neutral-800 font-semibold">
                    Built-in Battery: {activeLaptop.specs.batteryWhr} Whr
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Power Cut Protected
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* ── DESKTOP PC LIGHT SCHEMATIC ── */
          <div className="w-full max-w-[400px] select-none flex flex-col items-center">
            {/* Monitor Section */}
            <button
              type="button"
              onClick={() => setActiveHotspot('screen')}
              aria-label="Inspect 24 to 27 inch eye-level IPS monitor"
              aria-pressed={activeHotspot === 'screen'}
              className={`w-full bg-white rounded-2xl p-3 border-2 mb-3 cursor-pointer transition-all shadow-xs text-left focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${activeHotspot === 'screen'
                  ? 'border-brandpurple bg-purple-50/40 shadow-sm ring-2 ring-brandpurple/20'
                  : 'border-neutral-300 hover:border-neutral-400'
                }`}
            >
              <div className="h-20 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center justify-center p-2 text-center">
                <div className="text-xs font-bold text-neutral-900">
                  24" - 27" IPS Anti-Glare Eye-Level Monitor
                </div>
                <div className="text-[11px] text-brandpurple font-bold mt-0.5">
                  100% sRGB / 99% DCI-P3 Color Calibrated
                </div>
              </div>
              <div className="w-10 h-2 bg-neutral-300 mx-auto rounded-b-xs" />
              <div className="w-20 h-1 bg-neutral-400 mx-auto rounded-full" />
            </button>

            {/* Mid-Tower Case */}
            <div className="w-full bg-neutral-100 rounded-2xl border-2 border-neutral-300 p-3.5 shadow-xs">
              {/* Motherboard Substrate */}
              <div className="bg-white rounded-xl p-3 border border-neutral-200 space-y-2.5 shadow-2xs">
                {/* CPU Cooler & RAM */}
                <div className="flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveHotspot('cpu')}
                    aria-label="Inspect desktop CPU and cooler"
                    aria-pressed={activeHotspot === 'cpu'}
                    className={`flex-1 p-2 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 text-left focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${activeHotspot === 'cpu'
                        ? 'border-brandpurple bg-purple-50/50'
                        : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center bg-white shrink-0">
                      <IconCpu className="w-4 h-4 text-brandpurple" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-neutral-900 line-clamp-1">
                        {
                          activeDesktop.parts
                            .find((p) => p.category === 'cpu')
                            ?.name.split('(')[0]
                        }
                      </div>
                      <div className="text-[9px] text-neutral-500 font-medium">
                        Air Tower Cooler
                      </div>
                    </div>
                  </button>

                  {/* RAM Sticks */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHotspot('ram');
                      onToggleTweak('ram-32gb');
                    }}
                    aria-label="Toggle 32GB Desktop DDR RAM upgrade"
                    aria-pressed={has32GbRam}
                    className={`p-2 rounded-xl border-2 cursor-pointer transition-all text-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 outline-hidden min-h-[44px] flex flex-col items-center justify-center ${has32GbRam || activeHotspot === 'ram'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-2xs'
                        : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                      }`}
                  >
                    <div className="flex justify-center gap-1 mb-1">
                      <div
                        className={`w-1.5 h-5 rounded-xs ${has32GbRam ? 'bg-emerald-600' : 'bg-brandpurple'
                          }`}
                      />
                      <div
                        className={`w-1.5 h-5 rounded-xs ${has32GbRam ? 'bg-emerald-600' : 'bg-neutral-300'
                          }`}
                      />
                    </div>
                    <div className="text-[9px] font-bold text-neutral-900">
                      {has32GbRam ? '32GB DDR' : '16GB DDR'}
                    </div>
                    <div className="text-[8px] text-emerald-700 font-bold">
                      {has32GbRam ? 'Dual Slot' : 'Tap for 32GB'}
                    </div>
                  </button>
                </div>

                {/* Dedicated PCIe GPU */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot('gpu')}
                  aria-label="Inspect dedicated graphics card"
                  aria-pressed={activeHotspot === 'gpu'}
                  className={`w-full p-2.5 rounded-xl border-2 cursor-pointer transition-all text-left focus-visible:ring-2 focus-visible:ring-brandpurple focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${activeHotspot === 'gpu'
                      ? 'border-brandpurple bg-purple-50/50'
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                    }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-800 font-mono text-[9px] rounded font-bold">
                        PCIe x16
                      </span>
                      <span className="font-bold text-[11px] text-neutral-900">
                        {activeDesktop.parts.find((p) => p.category === 'gpu')
                          ?.name || 'Radeon Vega APU'}
                      </span>
                    </div>
                    <span className="text-[9px] text-brandpurple font-bold">
                      CUDA / Render
                    </span>
                  </div>
                </button>

                {/* Storage & Power Supply */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHotspot('storage');
                      onToggleTweak('ssd-1tb');
                    }}
                    aria-label="Toggle desktop 1TB NVMe storage upgrade"
                    aria-pressed={has1TbSsd}
                    className={`p-2 rounded-xl border-2 cursor-pointer transition-all text-left focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${has1TbSsd || activeHotspot === 'storage'
                        ? 'border-blue-600 bg-blue-50/60 shadow-2xs'
                        : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                      }`}
                  >
                    <div className="text-[10px] font-bold text-neutral-900">
                      {has1TbSsd ? '1TB Gen4 NVMe' : '500GB SSD'}
                    </div>
                    <div className="text-[9px] text-blue-700 font-bold">
                      {has1TbSsd ? 'Upgraded' : 'Tap for 1TB'}
                    </div>
                  </button>

                  <div className="p-2 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col justify-center min-h-[44px]">
                    <div className="text-[10px] font-bold text-neutral-900">
                      {activeDesktop.parts
                        .find((p) => p.category === 'psu')
                        ?.name.split(' ')[2] || '550W'}{' '}
                      80+
                    </div>
                    <div className="text-[9px] text-neutral-500 font-medium">
                      Bronze Certified
                    </div>
                  </div>
                </div>
              </div>

              {/* External UPS Box */}
              <button
                type="button"
                onClick={() => {
                  setActiveHotspot('ups');
                  onToggleTweak('ups-backup');
                }}
                aria-label="Toggle external line-interactive UPS protection"
                aria-pressed={hasUps}
                className={`mt-2.5 w-full p-2.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all text-left focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 outline-hidden min-h-[44px] ${hasUps || activeHotspot === 'ups'
                    ? 'border-amber-500 bg-amber-50/70 shadow-2xs'
                    : 'border-neutral-300 bg-white hover:border-neutral-400'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <IconBolt
                    className={`w-4 h-4 ${hasUps ? 'text-amber-600' : 'text-neutral-400'
                      }`}
                  />
                  <div>
                    <div className="text-[10px] font-bold text-neutral-900">
                      Line-Interactive UPS (
                      {activeDesktop.upsRecommendation.model.split(' ')[2] ||
                        '600VA'}
                      )
                    </div>
                    <div className="text-[9px] text-neutral-600">
                      {hasUps
                        ? 'Protected: 20m safe power cut runtime'
                        : 'Vulnerable to power cuts in Dimapur'}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded border ${hasUps
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                >
                  {hasUps ? 'Connected' : 'Tap to Add'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── INTERACTIVE HOTSPOT EXPLANATION DRAWER ── */}
      <div className="relative z-10 mt-2 pt-3 border-t border-neutral-100">
        <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
          {activeHotspot === 'ram' && (
            <div>
              <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                <IconCheck className="w-4 h-4 text-emerald-600" />
                Senior Dev Note on RAM:
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                Windows 11 takes 4GB idle. If you run Android Studio, Flutter
                emulator, or open 20 Chrome tabs for coding research, 8GB is
                completely choked. <strong>16GB is the bare minimum</strong>, and
                upgrading to 32GB ensures you never suffer memory paging freezes.
              </p>
            </div>
          )}

          {activeHotspot === 'screen' && (
            <div>
              <div className="font-bold text-purple-900 flex items-center gap-1.5 mb-1">
                <IconSparkles className="w-4 h-4 text-brandpurple" />
                Design Mentor Note on Display Gamut:
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                {isColorAccurate
                  ? 'Great choice. A 100% sRGB or DCI-P3 panel ensures colors you pick in Photoshop or Figma match what clients see on high-end smartphones.'
                  : 'Warning: 45% NTSC screens reproduce only 60% of web colors. Logos and photos will look muted on your laptop but oversaturated when viewed on other phones.'}
              </p>
            </div>
          )}

          {activeHotspot === 'ups' && (
            <div>
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <IconAlertTriangle className="w-4 h-4 text-amber-600" />
                Nagaland Power Reality:
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                Dimapur and Kohima power grids drop frequently. A desktop without
                a UPS will shut off instantly, corrupting your active project
                files or operating system registry. An APC/Microtek UPS is
                mandatory for desktops.
              </p>
            </div>
          )}

          {activeHotspot === 'storage' && (
            <div>
              <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                <IconInfoCircle className="w-4 h-4 text-blue-600" />
                Storage Space Advice:
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                512GB fills up quickly once you install Windows, node_modules,
                Android SDKs, and Adobe apps. A 1TB high-speed Gen4 NVMe drive
                gives you peace of mind for the next 3–4 years.
              </p>
            </div>
          )}

          {(!activeHotspot ||
            activeHotspot === 'cpu' ||
            activeHotspot === 'gpu' ||
            activeHotspot === 'battery') && (
              <div className="text-neutral-600 text-[11px] flex items-center justify-between font-medium">
                <span>
                  Interactive blueprint: Click on RAM, Screen, Storage, or UPS to
                  inspect hardware facts.
                </span>
                <span className="font-mono text-[10px] text-neutral-400">
                  Tactile 2D
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
