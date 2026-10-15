"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  SequenceSpec,
  SequenceStep,
  SequenceActor,
  resolveSequenceSpec,
} from "@/app/data/sequencePresets";

interface InteractiveSequenceWidgetProps {
  spec?:
    | SequenceSpec
    | {
        id?: string;
        preset?: string;
        actors?: SequenceActor[];
        steps?: SequenceStep[];
        [key: string]: any;
      };
}

export default function InteractiveSequenceWidget({
  spec: rawSpec,
}: InteractiveSequenceWidgetProps) {
  const spec = useMemo(() => resolveSequenceSpec(rawSpec), [rawSpec]);
  const { actors, steps } = spec;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep: SequenceStep | undefined = steps[currentStepIndex];
  const totalSteps = steps.length;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, spec.autoPlayIntervalMs || 4000);
    } else if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, currentStepIndex, totalSteps, spec.autoPlayIntervalMs]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleGoToStep = useCallback((index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStepIndex >= totalSteps - 1) {
        setCurrentStepIndex(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStepIndex, totalSteps]);

  const handleCopyPayload = useCallback(() => {
    if (!currentStep?.payload) return;
    const textToCopy =
      typeof currentStep.payload === "string"
        ? currentStep.payload
        : JSON.stringify(currentStep.payload, null, 2);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentStep]);

  // ────────────────────────────────────────────────────────────
  // Unified SVG Coordinate Geometry (Prevents any layout drift or clipping)
  // ────────────────────────────────────────────────────────────
  const actorCount = actors.length;
  const viewBoxWidth = 840;
  const boxWidth = 120;
  const boxHeight = 38;
  const topBoxY = 24;

  // Margin and actor horizontal distribution
  const margin = 90;
  const availableWidth = viewBoxWidth - margin * 2;
  const stepX = actorCount > 1 ? availableWidth / (actorCount - 1) : 0;

  const actorPositions = useMemo(() => {
    const map: Record<string, number> = {};
    actors.forEach((actor, idx) => {
      map[actor.id] = margin + idx * stepX;
    });
    return map;
  }, [actors, stepX, margin]);

  // Vertical rhythm
  const messagesStartY = 110;
  const stepRowGap = Math.max(42, Math.min(52, 280 / Math.max(totalSteps, 1)));
  const messagesEndY = messagesStartY + Math.max(totalSteps - 1, 1) * stepRowGap;
  const bottomBoxY = messagesEndY + 54;
  const viewBoxHeight = bottomBoxY + boxHeight + 24;

  const lifelineStartY = topBoxY + boxHeight;
  const lifelineEndY = bottomBoxY;

  const isActorActive = (actorId: string) => {
    if (!currentStep) return false;
    if (currentStep.from === actorId || currentStep.to === actorId) return true;
    if (currentStep.highlightActors?.includes(actorId)) return true;
    return false;
  };

  return (
    <div
      ref={containerRef}
      className="my-14 rounded-2xl border-2 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)] overflow-hidden transition-all select-none"
    >
      {/* ──────────────────────────────────────────────────────────── */}
      {/* Top Banner (Header Title & Playback Controls)                */}
      {/* ──────────────────────────────────────────────────────────── */}
      {spec.title && (
        <div className="border-b-2 border-black bg-black text-white px-5 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-slate-100 truncate">
              {spec.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTogglePlay}
              className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-white/10 hover:bg-[#00E5FF] hover:text-black transition-colors rounded border border-white/20 flex items-center gap-1.5"
              title={isPlaying ? "Pause auto-advance" : "Auto-play sequence"}
            >
              {isPlaying ? (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Auto-Play</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 bg-white/10 hover:bg-white/20 transition-colors rounded border border-white/20 text-slate-300"
              title="Reset to step 1"
            >
              ↺
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Diagram Canvas: Dark Navy Canvas with Unified SVG Geometry   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="relative bg-[#070C16] border-b-2 border-black overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
        {/* Subtle decorative background grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagram Wrapper: min-width prevents mobile squash, max-width centers on ultra-wide */}
        <div className="w-full min-w-[700px] max-w-[960px] mx-auto p-2 sm:p-4">
          <svg
            className="w-full h-auto block select-none pointer-events-auto"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            style={{ aspectRatio: `${viewBoxWidth} / ${viewBoxHeight}` }}
          >
            <defs>
              {/* Cyan Arrow Head for Active Step (pointing right) */}
              <marker
                id="arrow-active"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#38BDF8" />
              </marker>

              {/* Cyan Arrow Head pointing left */}
              <marker
                id="arrow-active-left"
                markerWidth="8"
                markerHeight="8"
                refX="1"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 8 0 L 0 4 L 8 8 z" fill="#38BDF8" />
              </marker>

              {/* Muted Arrow Head for Completed Steps (pointing right) */}
              <marker
                id="arrow-completed"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#475569" />
              </marker>

              {/* Muted Arrow Head pointing left */}
              <marker
                id="arrow-completed-left"
                markerWidth="8"
                markerHeight="8"
                refX="1"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 8 0 L 0 4 L 8 8 z" fill="#475569" />
              </marker>

              {/* Cyan Glow Filter */}
              <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#38BDF8" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* ── 1. Vertical Lifelines (Running precisely between top and bottom boxes) ── */}
            {actors.map((actor) => {
              const x = actorPositions[actor.id] || 0;
              const active = isActorActive(actor.id);
              return (
                <g key={`lifeline-${actor.id}`}>
                  {/* Subtle active glow ribbon behind lifeline */}
                  {active && (
                    <line
                      x1={x}
                      y1={lifelineStartY}
                      x2={x}
                      y2={lifelineEndY}
                      stroke="#0284C7"
                      strokeWidth="6"
                      strokeOpacity="0.22"
                    />
                  )}
                  {/* Lifeline dashed vertical stroke */}
                  <line
                    x1={x}
                    y1={lifelineStartY}
                    x2={x}
                    y2={lifelineEndY}
                    stroke={active ? "#38BDF8" : "#1E293B"}
                    strokeWidth={active ? "1.75" : "1.25"}
                    strokeDasharray="4 4"
                    strokeOpacity={active ? "0.95" : "0.55"}
                    className="transition-colors duration-300"
                  />
                </g>
              );
            })}

            {/* ── 2. Message Arrows & Labels (Cumulative with Active Highlight) ── */}
            {steps.map((step, idx) => {
              // Only render steps up to the current step (progressive reveal)
              if (idx > currentStepIndex) return null;

              const isCurrent = idx === currentStepIndex;
              const y = messagesStartY + idx * stepRowGap;
              const xFrom = actorPositions[step.from] ?? margin;
              const xTo = actorPositions[step.to] ?? margin;
              const isSelf = step.from === step.to || step.type === "self";
              const isRightToLeft = xFrom > xTo;

              // Self-loopback arrow (reasoning or internal execution)
              if (isSelf) {
                const loopsToLeft = xFrom > viewBoxWidth / 2;
                const loopRadius = 44;
                const pathD = loopsToLeft
                  ? `M ${xFrom} ${y - 6} C ${xFrom - loopRadius} ${y - 16}, ${xFrom - loopRadius} ${y + 24}, ${xFrom - 4} ${y + 12}`
                  : `M ${xFrom} ${y - 6} C ${xFrom + loopRadius} ${y - 16}, ${xFrom + loopRadius} ${y + 24}, ${xFrom + 4} ${y + 12}`;

                const labelX = loopsToLeft ? xFrom - loopRadius - 8 : xFrom + loopRadius + 8;
                const textAnchor = loopsToLeft ? "end" : "start";

                return (
                  <g
                    key={`step-arrow-${idx}`}
                    className="cursor-pointer transition-all duration-300 group"
                    onClick={() => handleGoToStep(idx)}
                  >
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isCurrent ? "#38BDF8" : "#475569"}
                      strokeWidth={isCurrent ? "2.25" : "1.5"}
                      strokeDasharray={step.type === "response" ? "4 3" : undefined}
                      markerEnd={
                        isCurrent
                          ? loopsToLeft
                            ? "url(#arrow-active-left)"
                            : "url(#arrow-active)"
                          : loopsToLeft
                          ? "url(#arrow-completed-left)"
                          : "url(#arrow-completed)"
                      }
                      filter={isCurrent ? "url(#cyan-glow)" : undefined}
                    />

                    {/* Step label pill with background to prevent lifeline collision */}
                    <g transform={`translate(${labelX}, ${y})`}>
                      {(() => {
                        const selfLabelWidth = Math.max(step.label.length * 7.2 + 16, 70);
                        const pillX = loopsToLeft ? -selfLabelWidth : 0;
                        const textMidX = loopsToLeft ? -selfLabelWidth / 2 : selfLabelWidth / 2;
                        return (
                          <>
                            <rect
                              x={pillX}
                              y="-10"
                              width={selfLabelWidth}
                              height="18"
                              rx="4"
                              fill="#070C16"
                              stroke={isCurrent ? "#0284C7" : "#1E293B"}
                              strokeWidth={isCurrent ? "1.25" : "0.75"}
                              opacity={isCurrent ? "0.98" : "0.85"}
                            />
                            <text
                              x={textMidX}
                              y="3"
                              textAnchor="middle"
                              fill={isCurrent ? "#38BDF8" : "#94A3B8"}
                              fontSize="11.5"
                              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                              fontWeight={isCurrent ? "700" : "500"}
                              className="transition-colors duration-200"
                            >
                              {step.label}
                            </text>
                          </>
                        );
                      })()}
                    </g>
                  </g>
                );
              }

              // Standard horizontal arrow between two actors
              const startX = isRightToLeft ? xFrom - 6 : xFrom + 6;
              const endX = isRightToLeft ? xTo + 6 : xTo - 6;
              const midX = (xFrom + xTo) / 2;
              const labelWidth = Math.max(step.label.length * 7.4 + 16, 70);

              return (
                <g
                  key={`step-arrow-${idx}`}
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => handleGoToStep(idx)}
                >
                  {/* Invisible wide hit area for effortless clicking */}
                  <line
                    x1={startX}
                    y1={y}
                    x2={endX}
                    y2={y}
                    stroke="transparent"
                    strokeWidth="20"
                  />

                  {/* Message Arrow Line */}
                  <line
                    x1={startX}
                    y1={y}
                    x2={endX}
                    y2={y}
                    stroke={isCurrent ? "#38BDF8" : "#475569"}
                    strokeWidth={isCurrent ? "2.25" : "1.5"}
                    strokeDasharray={step.type === "response" ? "6 4" : undefined}
                    markerEnd={
                      isCurrent
                        ? isRightToLeft
                          ? "url(#arrow-active-left)"
                          : "url(#arrow-active)"
                        : isRightToLeft
                        ? "url(#arrow-completed-left)"
                        : "url(#arrow-completed)"
                    }
                    filter={isCurrent ? "url(#cyan-glow)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Message Label Pill (Centered above arrow) */}
                  <g transform={`translate(${midX}, ${y - 12})`}>
                    <rect
                      x={-(labelWidth / 2)}
                      y="-10"
                      width={labelWidth}
                      height="18"
                      rx="4"
                      fill="#070C16"
                      stroke={isCurrent ? "#0284C7" : "#1E293B"}
                      strokeWidth={isCurrent ? "1.25" : "0.75"}
                      opacity={isCurrent ? "0.98" : "0.85"}
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill={isCurrent ? "#38BDF8" : "#94A3B8"}
                      fontSize="11.5"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                      fontWeight={isCurrent ? "700" : "500"}
                      className="transition-colors duration-200"
                    >
                      {step.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* ── 3. Top Actor Boxes (Rendered natively in SVG — never clipped) ── */}
            {actors.map((actor) => {
              const x = actorPositions[actor.id] || 0;
              const active = isActorActive(actor.id);
              return (
                <g key={`top-actor-${actor.id}`} className="transition-all duration-300">
                  <rect
                    x={x - boxWidth / 2}
                    y={topBoxY}
                    width={boxWidth}
                    height={boxHeight}
                    rx="8"
                    fill={active ? "#0E1E38" : "#0C1220"}
                    stroke={active ? "#38BDF8" : "#1E293B"}
                    strokeWidth={active ? "1.75" : "1"}
                    filter={active ? "url(#cyan-glow)" : undefined}
                  />
                  <text
                    x={x}
                    y={topBoxY + boxHeight / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={active ? "#FFFFFF" : "#CBD5E1"}
                    fontSize="12.5"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                    fontWeight="700"
                    letterSpacing="0.02em"
                  >
                    {actor.label}
                  </text>
                </g>
              );
            })}

            {/* ── 4. Bottom Actor Boxes (Rendered natively in SVG — never clipped) ── */}
            {actors.map((actor) => {
              const x = actorPositions[actor.id] || 0;
              const active = isActorActive(actor.id);
              return (
                <g key={`bottom-actor-${actor.id}`} className="transition-all duration-300">
                  <rect
                    x={x - boxWidth / 2}
                    y={bottomBoxY}
                    width={boxWidth}
                    height={boxHeight}
                    rx="8"
                    fill={active ? "#0E1E38" : "#0C1220"}
                    stroke={active ? "#38BDF8" : "#1E293B"}
                    strokeWidth={active ? "1.75" : "1"}
                    filter={active ? "url(#cyan-glow)" : undefined}
                  />
                  <text
                    x={x}
                    y={bottomBoxY + boxHeight / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={active ? "#FFFFFF" : "#CBD5E1"}
                    fontSize="12.5"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                    fontWeight="700"
                    letterSpacing="0.02em"
                  >
                    {actor.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Bottom Narration / Explanation Card                          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#F8FAFC] border-t-2 border-black p-6 sm:p-8">
        {/* Step Counter & Prev / Next Controls */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-[#0284C7] uppercase">
              STEP {currentStepIndex + 1} OF {totalSteps} · {currentStep?.title || "STEP"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="w-9 h-9 rounded-lg border-2 border-black bg-white hover:bg-[#FFE01B] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center font-bold text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              title="Previous Step (Left Arrow)"
              aria-label="Previous Step"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className="w-9 h-9 rounded-lg border-2 border-black bg-white hover:bg-[#FFE01B] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center font-bold text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              title="Next Step (Right Arrow)"
              aria-label="Next Step"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Narration Description Text */}
        <p className="text-base sm:text-lg text-slate-800 font-sans font-medium leading-relaxed max-w-4xl">
          {currentStep?.description}
        </p>

        {/* Optional Payload / Code Viewer Drawer */}
        {currentStep?.payload && (
          <div className="mt-5">
            <button
              onClick={() => setShowPayload(!showPayload)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-black py-1 px-2.5 bg-slate-200/60 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>{showPayload ? "Hide Payload Schema" : "Inspect Payload Schema"}</span>
            </button>

            {showPayload && (
              <div className="mt-3 relative rounded-lg border-2 border-black bg-[#0F172A] p-4 text-xs font-mono text-slate-200 overflow-x-auto shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700 text-[11px] text-slate-400">
                  <span className="uppercase tracking-widest">{currentStep.payloadLanguage || "json"}</span>
                  <button
                    onClick={handleCopyPayload}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto leading-relaxed max-h-60">
                  <code>
                    {typeof currentStep.payload === "string"
                      ? currentStep.payload
                      : JSON.stringify(currentStep.payload, null, 2)}
                  </code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Stepper Dots Indicator & Quick Jump */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;
              return (
                <button
                  key={`dot-${idx}`}
                  onClick={() => handleGoToStep(idx)}
                  className={`transition-all rounded-full ${
                    isActive
                      ? "w-3 h-3 bg-[#0284C7] ring-4 ring-[#0284C7]/20"
                      : isPassed
                      ? "w-2.5 h-2.5 bg-slate-400 hover:bg-slate-600"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  title={`Jump to step ${idx + 1}: ${step.title}`}
                  aria-label={`Jump to step ${idx + 1}: ${step.title}`}
                />
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 border border-slate-300 bg-white rounded text-[10px] shadow-sm">←</kbd>
            <kbd className="px-1.5 py-0.5 border border-slate-300 bg-white rounded text-[10px] shadow-sm">→</kbd>
            <span>keys to step</span>
          </div>
        </div>
      </div>
    </div>
  );
}
