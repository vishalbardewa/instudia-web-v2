"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AiBotsAnimationProps {
  workshopUrl?: string;
}

// Active till the end of 29th August 2026 (IST)
const WORKSHOP_EXPIRY_TIMESTAMP = new Date("2026-08-29T23:59:59+05:30").getTime();

// Sub-agents that travel into the open space and POP into confetti bursts at the end of their path
const POPPING_AGENTS = [
  {
    id: "tool-caller",
    name: "⚡ TOOL_CALLER",
    color: "#58FF1B",
    path: {
      x: [0, 30, 55],
      y: [0, -40, -75],
      scale: [0.2, 1, 1, 1.3, 0],
      opacity: [0, 1, 1, 1, 0],
    },
    confettiX: 55,
    confettiY: -75,
    duration: 2.5,
    delay: 0,
    particles: [
      { dx: -18, dy: -18, color: "#58FF1B", size: 6, shape: "circle" },
      { dx: 18, dy: -16, color: "#FFE01B", size: 7, shape: "rect" },
      { dx: -20, dy: 10, color: "#00F0FF", size: 5, shape: "square" },
      { dx: 22, dy: 12, color: "#58FF1B", size: 6, shape: "circle" },
      { dx: 0, dy: -24, color: "#FF1B58", size: 7, shape: "rect" },
      { dx: -14, dy: -22, color: "#FFE01B", size: 5, shape: "circle" },
      { dx: 16, dy: -22, color: "#00F0FF", size: 6, shape: "square" },
    ],
  },
  {
    id: "swarm-sync",
    name: "🤖 SWARM_SYNC",
    color: "#FFE01B",
    path: {
      x: [0, -35, -70],
      y: [0, -50, -90],
      scale: [0.2, 1, 1, 1.3, 0],
      opacity: [0, 1, 1, 1, 0],
    },
    confettiX: -70,
    confettiY: -90,
    duration: 2.8,
    delay: 0.6,
    particles: [
      { dx: -20, dy: -16, color: "#FFE01B", size: 6, shape: "rect" },
      { dx: 16, dy: -18, color: "#C21BFF", size: 7, shape: "circle" },
      { dx: -18, dy: 12, color: "#FF1B58", size: 5, shape: "square" },
      { dx: 20, dy: 14, color: "#FFE01B", size: 6, shape: "circle" },
      { dx: 0, dy: -22, color: "#58FF1B", size: 7, shape: "rect" },
      { dx: -12, dy: -24, color: "#C21BFF", size: 5, shape: "square" },
      { dx: 14, dy: -22, color: "#FF1B58", size: 6, shape: "circle" },
    ],
  },
  {
    id: "planner",
    name: "🧠 PLANNER.AI",
    color: "#C21BFF",
    path: {
      x: [0, -20, -15],
      y: [0, -60, -125],
      scale: [0.2, 1, 1, 1.3, 0],
      opacity: [0, 1, 1, 1, 0],
    },
    confettiX: -15,
    confettiY: -125,
    duration: 2.7,
    delay: 1.2,
    particles: [
      { dx: -16, dy: -18, color: "#C21BFF", size: 6, shape: "circle" },
      { dx: 18, dy: -16, color: "#00F0FF", size: 7, shape: "rect" },
      { dx: -22, dy: 10, color: "#58FF1B", size: 5, shape: "square" },
      { dx: 20, dy: 12, color: "#C21BFF", size: 6, shape: "circle" },
      { dx: 0, dy: -24, color: "#FFE01B", size: 7, shape: "rect" },
      { dx: -14, dy: -20, color: "#00F0FF", size: 5, shape: "square" },
      { dx: 15, dy: -22, color: "#FFE01B", size: 6, shape: "circle" },
    ],
  },
  {
    id: "evaluator",
    name: "✓ VERIFIED",
    color: "#00F0FF",
    path: {
      x: [0, 35, 60],
      y: [0, -70, -135],
      scale: [0.2, 1, 1, 1.3, 0],
      opacity: [0, 1, 1, 1, 0],
    },
    confettiX: 60,
    confettiY: -135,
    duration: 2.9,
    delay: 1.8,
    particles: [
      { dx: -18, dy: -16, color: "#00F0FF", size: 6, shape: "circle" },
      { dx: 16, dy: -18, color: "#58FF1B", size: 7, shape: "rect" },
      { dx: -20, dy: 12, color: "#FFE01B", size: 5, shape: "square" },
      { dx: 20, dy: 10, color: "#FF1B58", size: 6, shape: "circle" },
      { dx: 0, dy: -24, color: "#00F0FF", size: 7, shape: "rect" },
      { dx: 14, dy: -20, color: "#C21BFF", size: 5, shape: "square" },
    ],
  },
];

export default function AiBotsAnimation({
  workshopUrl = "https://agentic-ai.instudianagaland.com/",
}: AiBotsAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [botState, setBotState] = useState<"happy" | "thinking" | "scanning">("happy");
  const autoResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const active = Date.now() <= WORKSHOP_EXPIRY_TIMESTAMP;
    setIsEligible(active);

    // Detect touch / non-hover device
    const isTouch = window.matchMedia("(hover: none)").matches || "ontouchstart" in window;
    setIsTouchDevice(isTouch);

    if (!active) return;

    // Dynamic bot expressions cycle when idle
    const interval = setInterval(() => {
      setBotState((prev) => (prev === "happy" ? "scanning" : prev === "scanning" ? "thinking" : "happy"));
    }, 3800);

    // Tap outside listener for mobile to immediately dismiss
    const handleOutsideTouch = () => {
      setIsHovered(false);
    };

    window.addEventListener("touchstart", handleOutsideTouch, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("touchstart", handleOutsideTouch);
      if (autoResetTimerRef.current) clearTimeout(autoResetTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice) return; // Prevent stuck hover on mobile touch
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
  };

  const handleBotClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isTouchDevice) {
      // On mobile: trigger a finite single celebratory burst for 2.6s, then auto-reset
      setIsHovered(true);
      if (autoResetTimerRef.current) clearTimeout(autoResetTimerRef.current);
      autoResetTimerRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 2600);

      // Open workshop URL in a new tab
      window.open(workshopUrl, "_blank");
    } else {
      window.open(workshopUrl, "_blank");
    }
  };

  if (!mounted || !isEligible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none print:hidden flex flex-col items-end">
      {/* Interactive Sub-Agents popping into confetti in open unobstructed space */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {POPPING_AGENTS.map((agent) => (
              <React.Fragment key={agent.id}>
                {/* 1. Flying Task Badge (Travels smoothly across open space and pops at end) */}
                <motion.div
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  animate={{
                    x: agent.path.x,
                    y: agent.path.y,
                    scale: agent.path.scale,
                    opacity: agent.path.opacity,
                  }}
                  transition={{
                    duration: agent.duration,
                    repeat: isTouchDevice ? 0 : Infinity,
                    delay: agent.delay,
                    times: [0, 0.2, 0.82, 0.93, 1],
                    ease: "easeInOut",
                  }}
                  style={{ bottom: "35px", right: "35px" }}
                  className="absolute pointer-events-none select-none z-30"
                >
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-black font-mono font-black text-[9px] uppercase tracking-wider text-black whitespace-nowrap shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                    style={{
                      backgroundColor: agent.color,
                      boxShadow: `3px 3px 0px rgba(0,0,0,1), 0 0 14px ${agent.color}90`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                    {agent.name}
                  </div>
                </motion.div>

                {/* 2. Confetti Burst Triggered Exactly at the Destination */}
                {agent.particles.map((p, pIdx) => (
                  <motion.div
                    key={`${agent.id}-p-${pIdx}`}
                    initial={{ x: agent.confettiX, y: agent.confettiY, scale: 0, opacity: 0 }}
                    animate={{
                      x: [agent.confettiX, agent.confettiX, agent.confettiX + p.dx * 1.8],
                      y: [agent.confettiY, agent.confettiY, agent.confettiY + p.dy * 1.8],
                      scale: [0, 0, 1.4, 0],
                      opacity: [0, 0, 1, 0],
                      rotate: [0, 0, 180, 360],
                    }}
                    transition={{
                      duration: agent.duration,
                      repeat: isTouchDevice ? 0 : Infinity,
                      delay: agent.delay,
                      times: [0, 0.82, 0.94, 1],
                      ease: "easeOut",
                    }}
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      right: "35px",
                      width: `${p.size}px`,
                      height: p.shape === "rect" ? `${p.size * 1.6}px` : `${p.size}px`,
                      backgroundColor: p.color,
                      borderRadius: p.shape === "circle" ? "50%" : "2px",
                      boxShadow: `0 0 10px ${p.color}`,
                      border: "1px solid black",
                      pointerEvents: "none",
                      zIndex: 35,
                    }}
                  />
                ))}
              </React.Fragment>
            ))}

            {/* Radial Energy Pulse Wave */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.8, 1.6, 2.0], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 1.6, repeat: isTouchDevice ? 1 : Infinity, ease: "easeOut" }}
              className="absolute bottom-2 right-2 w-16 h-16 rounded-3xl border-2 border-[#58FF1B] shadow-[0_0_15px_#58FF1B] pointer-events-none"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Idle Companion Micro Drones */}
      {!isHovered && (
        <>
          <motion.div
            initial={{ x: -100, y: -200, opacity: 0, scale: 0.5 }}
            animate={{
              x: [0, 40, 20, 0],
              y: [-100, -120, -90, -100],
              opacity: [0, 0.8, 0.8, 0.6],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 pointer-events-none"
          >
            <div className="w-4 h-4 rounded-full bg-[#58FF1B] border border-black shadow-[0_0_8px_#58FF1B] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, y: -80, opacity: 0, scale: 0.6 }}
            animate={{
              x: [40, 0, 30, 40],
              y: [-60, -40, -70, -60],
              opacity: [0, 0.9, 0.7, 0.9],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-20 right-8 pointer-events-none"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#C21BFF] border border-black shadow-[0_0_8px_#C21BFF] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
            </div>
          </motion.div>
        </>
      )}

      {/* Main Interactive AI Agent Bot */}
      <div
        className="flex flex-col items-end pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Floating Robot Body */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Explore Agentic AI Workshop"
          initial={{ y: 80, opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{
            y: isHovered ? [0, -6, 0] : [0, -8, 0],
            opacity: 1,
            scale: isHovered ? 1.08 : 1,
            rotate: isHovered ? [0, 3, -3, 0] : [0, 2, -2, 0],
          }}
          transition={{
            y: { duration: isHovered ? 1.2 : 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: isHovered ? 1.8 : 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 0.3, type: "spring", stiffness: 400, damping: 20 },
          }}
          onClick={handleBotClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(workshopUrl, "_blank");
            }
          }}
          className="cursor-pointer group relative select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58FF1B] rounded-2xl"
          title="Agentic AI Workshop · Aug 28–29 (Click to explore)"
        >
          {/* Main Bot Canvas (SVG Neo-Brutalist Cyber Robot) */}
          <div
            className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#151722] border-2 border-black rounded-2xl transition-all flex flex-col items-center justify-center overflow-visible ${
              isHovered
                ? "shadow-[6px_6px_0px_#FFE01B] border-[#58FF1B]"
                : "shadow-[4px_4px_0px_#58FF1B]"
            }`}
          >
            {/* Antenna with Pulsing Beacon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_8px_#58FF1B] ${
                  isHovered ? "bg-[#FFE01B] animate-ping" : "bg-[#58FF1B] animate-pulse"
                }`}
              />
              <div className="w-0.5 h-2 bg-black" />
            </div>

            {/* Glowing Screen / Visor */}
            <div className="w-12 sm:w-14 h-7 sm:h-8 bg-[#0B0C10] rounded-lg border border-white/20 flex items-center justify-center px-1 shadow-inner relative overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse pointer-events-none" />

              {/* Bot Eyes / Visor Display */}
              {isHovered ? (
                /* High-energy Code Execution Visor on Hover/Tap */
                <div className="flex items-center gap-1 font-mono text-[9px] font-black text-[#58FF1B]">
                  <span className="animate-pulse">&gt;</span>
                  <span className="animate-bounce">RUN</span>
                  <span className="w-1 h-3 bg-[#FFE01B] animate-ping" />
                </div>
              ) : (
                <>
                  {botState === "happy" && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#58FF1B] text-xs font-black font-mono animate-bounce">^</span>
                      <span className="text-[#58FF1B] text-[10px] font-black font-mono">_</span>
                      <span className="text-[#58FF1B] text-xs font-black font-mono animate-bounce">^</span>
                    </div>
                  )}
                  {botState === "scanning" && (
                    <div className="w-full flex items-center justify-center">
                      <div className="w-8 h-1 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF] animate-pulse" />
                    </div>
                  )}
                  {botState === "thinking" && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFE01B] animate-ping" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C21BFF] animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#58FF1B] animate-ping" />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bot Body Accents / Badge */}
            <div className="mt-1 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-[#58FF1B] animate-ping" : "bg-[#FFE01B]"}`} />
              <span className="text-[7px] sm:text-[8px] font-black font-mono text-white/80 tracking-widest">
                {isHovered ? "AGENT.AI" : "AI.BOT"}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-[#FFE01B] animate-ping" : "bg-[#C21BFF]"}`} />
            </div>

            {/* Jet Propulsion Hover Particles (Overdrive on Hover) */}
            <div className="absolute -bottom-2.5 flex gap-1.5 items-center justify-center">
              <div
                className={`rounded-full bg-[#58FF1B] shadow-[0_0_10px_#58FF1B] animate-pulse ${
                  isHovered ? "w-2 h-4" : "w-1.5 h-2.5"
                }`}
              />
              <div
                className={`rounded-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF] animate-bounce ${
                  isHovered ? "w-3 h-5" : "w-2 h-3.5"
                }`}
              />
              <div
                className={`rounded-full bg-[#FFE01B] shadow-[0_0_10px_#FFE01B] animate-pulse ${
                  isHovered ? "w-2 h-4" : "w-1.5 h-2.5"
                }`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
