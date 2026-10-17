"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const COLORS = ["#FF1B58", "#FFE01B", "#C21BFF", "#58FF1B", "#3B82F6", "#F97316"];
const EGG_COLORS = ["#FFD700", "#FF69B4", "#7FFFD4", "#9370DB", "#FFA07A"];

interface ParticleData {
  id: number;
  color: string;
  shape: "circle" | "rect";
  left: number;
  duration: number;
  delay: number;
}

export const Confetti = ({ count = 40 }: { count?: number }) => {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const items: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        color: COLORS[i % COLORS.length],
        shape: i % 2 === 0 ? "circle" : "rect",
        left: Math.floor(Math.random() * 96) + 2,
        duration: +(Math.random() * 1.5 + 2.5).toFixed(2),
        delay: +(Math.random() * 2.2).toFixed(2),
      });
    }
    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: p.shape === "circle" ? "8px" : "10px",
            height: p.shape === "circle" ? "8px" : "6px",
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animation: `instudiaFestivalFall ${p.duration}s linear ${p.delay}s forwards`,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export const Snowfall = ({ count = 40 }: { count?: number }) => {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const items: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        color: "#FFFFFF",
        shape: "circle",
        left: Math.floor(Math.random() * 96) + 2,
        duration: +(Math.random() * 2 + 3).toFixed(2),
        delay: +(Math.random() * 2.2).toFixed(2),
      });
    }
    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: "8px",
            height: "8px",
            backgroundColor: p.color,
            borderRadius: "50%",
            animation: `instudiaFestivalFall ${p.duration}s linear ${p.delay}s forwards`,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export const GlowEffects = () => (
  <div
    className="absolute top-0 left-0 w-full h-2.5 pointer-events-none"
    style={{
      boxShadow: "0 0 20px 10px rgba(255, 224, 27, 0.3)",
      animation: "instudiaFestivalGlow 4.5s ease-in-out forwards",
      opacity: 0,
    }}
  />
);

const DOODLE_ICONS: Record<string, JSX.Element> = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C12.21,20 19,15.22 19,13C19,11.5 18.5,10.03 17,8Z" />
    </svg>
  ),
  splash: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M10,21C7,21 3,18 3,11C3,9.5 4,8 5,7.2C4.5,5.8 4.6,4.3 5.4,3.2C6.2,2.1 7.5,1.5 8.9,1.6C9.1,1.6 9.3,1.6 9.5,1.7C10.7,0.6 12.3,0 14,0C17.3,0 20,2.7 20,6C20,7.3 19.6,8.4 18.8,9.4C19.6,10.2 20,11.3 20,12.5C20,14.6 18.2,16.3 16,16.4C15.3,18.8 13.5,21 10,21Z" />
    </svg>
  ),
  drum: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2A10,3 0 0,0 2,5V19A10,3 0 0,0 12,22A10,3 0 0,0 22,19V5A10,3 0 0,0 12,2Z" />
    </svg>
  ),
  spear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M21,3L3,21M18,3L21,6M15,6L18,9M12,9L15,12M9,12L12,15M6,15L9,18M3,18L6,21" />
    </svg>
  ),
  pookalam: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2L14.4,6.6L19,7.2L15.6,10.6L16.4,15.4L12,13.1L7.6,15.4L8.4,10.6L5,7.2L9.6,6.6L12,2Z" />
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2C12,2 9,6 9,10C9,14 12,18 12,18C12,18 15,14 15,10C15,6 12,2 12,2Z" />
      <path d="M12,4C12,4 16,8 16,12C16,16 12,20 12,20C12,20 8,16 8,12C8,8 12,4 12,4Z" opacity="0.6" />
    </svg>
  ),
  lamp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2C12,2 9,5 9,8C9,11 12,13 12,13C12,13 15,11 15,8C15,5 12,2 12,2Z" />
      <path d="M4,15C4,15 4,21 12,21C20,21 20,15 12,15C4,15 4,15 4,15Z" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
      <path d="M12,1V3M12,21V23M23,12H21M3,12H1M19.8,4.2L18.4,5.6M5.6,18.4L4.2,19.8M19.8,19.8L18.4,18.4M5.6,5.6L4.2,4.2" />
    </svg>
  ),
  bird: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M21,5C21,5 18,2 14,2C10,2 7,5 7,5C7,5 4,5 2,7C0,9 0,12 2,14C4,16 7,16 7,16C7,16 10,19 14,19C18,19 21,16 21,16V5Z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2L14.5,8.5H21L16,12.5L18.5,19L12,15L5.5,19L8,12.5L3,8.5H9.5L12,2Z" />
    </svg>
  ),
  egg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12,2C8.69,2 6,6.48 6,12C6,17.52 8.69,22 12,22C15.31,22 18,17.52 18,12C18,6.48 15.31,2 12,2Z" />
    </svg>
  ),
};

interface EggData {
  id: number;
  color: string;
  left: number;
  duration: number;
  delay: number;
}

export const EasterEggs = ({ count = 16 }: { count?: number }) => {
  const [eggs, setEggs] = useState<EggData[]>([]);

  useEffect(() => {
    const items: EggData[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        color: EGG_COLORS[i % EGG_COLORS.length],
        left: Math.floor(Math.random() * 94) + 3,
        duration: +(Math.random() * 2 + 2.5).toFixed(2),
        delay: +(Math.random() * 2).toFixed(2),
      });
    }
    setEggs(items);
  }, [count]);

  if (eggs.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {eggs.map((e) => (
        <div
          key={e.id}
          style={{
            position: "absolute",
            top: "-30px",
            left: `${e.left}%`,
            color: e.color,
            animation: `instudiaFestivalFall ${e.duration}s ease-in-out ${e.delay}s forwards`,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {DOODLE_ICONS.egg}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// AUTHENTIC HOLI GULAL POWDER BURST (CANVAS 2D)
// ==========================================

interface GulalColor {
  r: number;
  g: number;
  b: number;
  hex: string;
}

const AUTHENTIC_GULAL_COLORS: GulalColor[] = [
  { r: 244, g: 63, b: 94, hex: "#F43F5E" },   // Gulabi (Vibrant Rose Pink)
  { r: 245, g: 158, b: 11, hex: "#F59E0B" },  // Haldi / Peela (Golden Marigold)
  { r: 59, g: 130, b: 246, hex: "#3B82F6" },  // Krishna Neelam (Sky Indigo)
  { r: 34, g: 197, b: 94, hex: "#22C55E" },   // Basanti (Fresh Spring Green)
  { r: 249, g: 115, b: 22, hex: "#F97316" },  // Palash (Saffron Orange)
  { r: 168, g: 85, b: 247, hex: "#A855F7" },  // Baingani (Orchid Violet)
  { r: 236, g: 72, b: 153, hex: "#EC4899" },  // Deep Magenta
];

interface PowderPuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  color: GulalColor;
  alpha: number;
  decay: number;
}

interface DustGrain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: GulalColor;
  alpha: number;
  drag: number;
  gravity: number;
  life: number;
  decay: number;
}

export const HoliScreenSplash = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const puffs: PowderPuff[] = [];
    const grains: DustGrain[] = [];

    // Function to create an authentic burst of dry Gulal powder
    const triggerGulalBurst = (originX: number, originY: number, color?: GulalColor, strength = 1) => {
      const selectedColor = color || AUTHENTIC_GULAL_COLORS[Math.floor(Math.random() * AUTHENTIC_GULAL_COLORS.length)];

      // 1. Billowing Powder Smoke Puffs (Soft radial gradients)
      const puffCount = Math.floor(6 * strength) + 4;
      for (let i = 0; i < puffCount; i++) {
        const angle = (Math.PI * 2 * i) / puffCount + (Math.random() - 0.5) * 0.5;
        const speed = (Math.random() * 2.5 + 1.2) * strength;
        puffs.push({
          x: originX + (Math.random() - 0.5) * 15,
          y: originY + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8, // subtle upward throw drift
          radius: Math.random() * 25 + 20,
          maxRadius: (Math.random() * 50 + 60) * strength,
          color: selectedColor,
          alpha: 0.55,
          decay: Math.random() * 0.007 + 0.005,
        });
      }

      // 2. Fine Airborne Powder Dust Grains (Abir micro-particles)
      const grainCount = Math.floor(90 * strength) + 40;
      for (let i = 0; i < grainCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 9 + 2) * strength;
        grains.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (Math.random() * 2.5 + 1.2), // ballistic upward arc
          size: Math.random() * 2.2 + 0.9,
          color: selectedColor,
          alpha: Math.random() * 0.4 + 0.6,
          drag: 0.945, // authentic powder air-resistance deceleration
          gravity: 0.045, // gentle settling
          life: 1.0,
          decay: Math.random() * 0.012 + 0.008,
        });
      }
    };

    // Initial celebratory sequence of authentic Gulal throws
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(setTimeout(() => triggerGulalBurst(width * 0.2, height * 0.35, AUTHENTIC_GULAL_COLORS[0], 1.2), 100));
    timeouts.push(setTimeout(() => triggerGulalBurst(width * 0.8, height * 0.28, AUTHENTIC_GULAL_COLORS[1], 1.2), 350));
    timeouts.push(setTimeout(() => triggerGulalBurst(width * 0.5, height * 0.48, AUTHENTIC_GULAL_COLORS[2], 1.3), 650));
    timeouts.push(setTimeout(() => triggerGulalBurst(width * 0.28, height * 0.72, AUTHENTIC_GULAL_COLORS[3], 1.1), 950));
    timeouts.push(setTimeout(() => triggerGulalBurst(width * 0.75, height * 0.68, AUTHENTIC_GULAL_COLORS[4], 1.2), 1250));

    // Interactive Tap / Click to throw Gulal!
    const handlePointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Primary powder throw
      triggerGulalBurst(x, y, undefined, 1.3);

      // Complementary small secondary puff
      setTimeout(() => {
        triggerGulalBurst(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40, undefined, 0.7);
      }, 120);
    };

    window.addEventListener("pointerdown", handlePointerDown);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // Main 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update billowing powder clouds
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.radius += (p.maxRadius - p.radius) * 0.04;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          puffs.splice(i, 1);
          continue;
        }

        // Soft radial gradient simulating authentic dry pigment smoke
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.75})`);
        grad.addColorStop(0.45, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw and update fine airborne powder dust grains
      for (let i = grains.length - 1; i >= 0; i--) {
        const g = grains[i];
        g.x += g.vx;
        g.y += g.vy;
        g.vx *= g.drag;
        g.vy *= g.drag;
        g.vy += g.gravity;
        g.alpha -= g.decay;

        if (g.alpha <= 0) {
          grains.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, ${g.alpha})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      timeouts.forEach(clearTimeout);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ mixBlendMode: "multiply", filter: "contrast(1.15) saturate(1.2)" }}
      />

      {/* Floating Cultural Toast */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-[10000] px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-2.5 animate-pulse">
        <span className="text-base sm:text-lg">✨</span>
        <span className="bg-gradient-to-r from-pink-300 via-yellow-200 to-cyan-300 bg-clip-text text-transparent font-extrabold tracking-tight">
          Happy Holi! Tap anywhere to throw authentic gulal colors
        </span>
      </div>
    </div>
  );
};

// ==========================================
// CHHATH PUJA SUGARCANE PEEKING COMPONENT (GSAP)
// ==========================================

export const ChhathSugarcanePeeking = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to([clusterRef.current, badgeRef.current], { opacity: 1, duration: 0.6 });
        return;
      }

      // Idle arching sugarcane leaves swaying gently in the riverbank breeze
      if (leavesRef.current) {
        gsap.to(leavesRef.current, {
          rotation: 4,
          transformOrigin: "bottom right",
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Idle sacred earthen Diya flame flicker at the river ghat
      if (flameRef.current) {
        gsap.to(flameRef.current, {
          scaleY: 1.25,
          scaleX: 0.9,
          rotation: 3,
          transformOrigin: "center bottom",
          duration: 0.22,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Idle sacred dawn Surya aura pulsing
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.75,
          transformOrigin: "center center",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Master Timeline: Entry -> Dwell -> Exit (Plays just once)
      const masterTl = gsap.timeline();

      // 1. Entry Phase: Sugarcane peeks in from the edge of the screen, badge fades & scales in
      masterTl
        .fromTo(
          clusterRef.current,
          { x: "115%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 1.5, ease: "power3.out" },
          0
        )
        .fromTo(
          badgeRef.current,
          { scale: 0.8, opacity: 0, y: 25 },
          { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.5)" },
          0.3
        );

      // 2. Dwell Phase (celebration at screen edge for ~7 seconds)
      masterTl.to({}, { duration: 7 });

      // 3. Exit Phase: Badge floats up & fades, Sugarcane slides gracefully back out off the edge
      masterTl
        .to(badgeRef.current, {
          scale: 0.9,
          opacity: 0,
          y: -20,
          duration: 0.7,
          ease: "power2.in",
        })
        .to(
          clusterRef.current,
          { x: "115%", opacity: 0, duration: 1.2, ease: "power3.in" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden select-none"
    >
      {/* Floating Sacred Chhath Ghat Badge */}
      <div
        ref={badgeRef}
        className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-[10000] px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-white text-xs sm:text-sm font-bold shadow-[0_4px_30px_rgba(245,158,11,0.35)] flex items-center gap-2.5"
      >
        <span className="text-base sm:text-lg">☀️</span>
        <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent font-extrabold tracking-tight">
          Blessed Chhath Puja! Sacred Sugarcane &amp; Surya Arghya
        </span>
      </div>

      {/* SUGARCANE CLUSTER PEEKING AT THE EDGE OF THE SCREEN */}
      <div
        ref={clusterRef}
        className="fixed bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-[360px] sm:h-[480px] md:h-[580px] pointer-events-none flex items-end justify-end filter drop-shadow-[0_6px_25px_rgba(0,0,0,0.45)] translate-x-4 sm:translate-x-6"
      >
        <svg
          viewBox="0 0 240 460"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sugarcane Stalk Cylindrical Shading (Lime highlight to rich olive green) */}
            <linearGradient id="scStalkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#BEF264" />
              <stop offset="25%" stopColor="#84CC16" />
              <stop offset="70%" stopColor="#65A30D" />
              <stop offset="100%" stopColor="#3F6212" />
            </linearGradient>

            {/* Sugarcane Node Joint Ring Gradient */}
            <linearGradient id="scNodeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="35%" stopColor="#A3E635" />
              <stop offset="75%" stopColor="#65A30D" />
              <stop offset="100%" stopColor="#365314" />
            </linearGradient>

            {/* Leaf Light Face Gradient */}
            <linearGradient id="scLeafLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="50%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#65A30D" />
            </linearGradient>

            {/* Leaf Dark Face Gradient (Underfold) */}
            <linearGradient id="scLeafDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="50%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#14532D" />
            </linearGradient>

            {/* Sacred Dawn Surya Sunrise Glow */}
            <radialGradient id="sugarcaneSunGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#EA580C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Group shifted to hug the screen edge */}
          <g transform="translate(35, 0)">
            {/* Sacred Morning Surya Sunrise Glow behind fronds */}
            <circle
            ref={glowRef}
            cx="140"
            cy="150"
            r="85"
            fill="url(#sugarcaneSunGlow)"
            opacity="0.4"
          />

          {/* ================= 1. BASE GRASSY TURF ================= */}
          <g id="sugarcane-turf-base">
            <ellipse cx="120" cy="442" rx="60" ry="12" fill="#365314" />
            <ellipse cx="120" cy="440" rx="54" ry="9" fill="#4D7C0F" />
            <polygon points="90,442 96,418 102,442" fill="#365314" />
            <polygon points="104,442 112,408 116,442" fill="#4D7C0F" />
            <polygon points="126,442 133,405 138,442" fill="#365314" />
            <polygon points="138,442 146,420 152,442" fill="#4D7C0F" />
          </g>

          {/* ================= 2. BACKGROUND DEPTH LEAVES (Behind Stalks) ================= */}
          <g id="sugarcane-backdrop-leaves">
            {/* Deep left backdrop frond */}
            <path d="M95 240 C55 160 38 120 22 175 C38 135 72 175 98 240 Z" fill="#14532D" />
            {/* Deep right backdrop frond */}
            <path d="M140 230 C180 150 200 115 218 165 C198 125 162 165 138 230 Z" fill="#14532D" />
            {/* High center-left spear silhouette */}
            <path d="M110 160 C88 80 82 40 74 25 C86 50 104 90 115 160 Z" fill="#166534" />
            {/* High center-right spear silhouette */}
            <path d="M130 160 C152 80 158 40 166 25 C154 50 136 90 125 160 Z" fill="#166534" />
          </g>

          {/* ================= 3. THREE FRESH GREEN CANE STALKS ================= */}

          {/* --- LEFT STALK (Leaning outward to the left) --- */}
          <g id="sugarcane-stalk-left">
            {/* Segment 1: Ground to Node 1 */}
            <path d="M88 375 L102 440 L116 440 L102 375 Z" fill="url(#scStalkGrad)" />
            {/* Node 1 */}
            <ellipse cx="95" cy="375" rx="8" ry="3" transform="rotate(-10 95 375)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Small Lower Leaf Sprout emerging from Node 1 */}
            <path d="M90 380 C82 360, 72 350, 68 335 C75 350, 85 365, 94 372 Z" fill="#65A30D" />
            <path d="M90 380 C85 365, 78 355, 68 335 C72 355, 82 370, 92 378 Z" fill="#84CC16" />

            {/* Segment 2: Node 1 to Node 2 */}
            <path d="M78 305 L88 375 L102 375 L91 305 Z" fill="url(#scStalkGrad)" />
            {/* Node 2 */}
            <ellipse cx="84.5" cy="305" rx="7.5" ry="2.6" transform="rotate(-10 84.5 305)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Segment 3: Node 2 to Node 3 */}
            <path d="M70 245 L78 305 L91 305 L82 245 Z" fill="url(#scStalkGrad)" />
            {/* Node 3 */}
            <ellipse cx="76" cy="245" rx="7" ry="2.4" transform="rotate(-10 76 245)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Upper Stalk Segment into Canopy */}
            <path d="M64 195 L70 245 L82 245 L76 195 Z" fill="url(#scStalkGrad)" />
          </g>

          {/* --- RIGHT STALK (Upright with slight right tilt) --- */}
          <g id="sugarcane-stalk-right">
            {/* Segment 1: Ground to Node 1 */}
            <path d="M130 360 L125 440 L139 440 L144 360 Z" fill="url(#scStalkGrad)" />
            {/* Node 1 */}
            <ellipse cx="137" cy="360" rx="8" ry="2.8" transform="rotate(5 137 360)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Small Lower Leaf Sprout emerging from Node 1 */}
            <path d="M142 365 C148 348, 154 338, 162 320 C156 338, 149 352, 144 362 Z" fill="#65A30D" />
            <path d="M142 365 C150 350, 156 340, 162 320 C154 340, 147 355, 143 363 Z" fill="#84CC16" />

            {/* Segment 2: Node 1 to Node 2 */}
            <path d="M134 290 L130 360 L144 360 L147 290 Z" fill="url(#scStalkGrad)" />
            {/* Node 2 */}
            <ellipse cx="140.5" cy="290" rx="7.5" ry="2.6" transform="rotate(5 140.5 290)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Segment 3: Node 2 to Node 3 */}
            <path d="M137 230 L134 290 L147 290 L149 230 Z" fill="url(#scStalkGrad)" />
            {/* Node 3 */}
            <ellipse cx="143" cy="230" rx="7" ry="2.4" transform="rotate(5 143 230)" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Upper Stalk Segment into Canopy */}
            <path d="M139 175 L137 230 L149 230 L150 175 Z" fill="url(#scStalkGrad)" />
          </g>

          {/* --- CENTRAL STALK (Tallest, straight in the middle) --- */}
          <g id="sugarcane-stalk-center">
            {/* Segment 1: Ground to Node 1 */}
            <path d="M112 355 L112 440 L128 440 L128 355 Z" fill="url(#scStalkGrad)" />
            {/* Sacred Kalawa thread tied neatly around the central stalk */}
            <rect x="111" y="395" width="18" height="6" fill="#DC2626" rx="1" />
            <line x1="111" y1="398" x2="129" y2="398" stroke="#FFE01B" strokeWidth="1.5" />
            {/* Node 1 */}
            <ellipse cx="120" cy="355" rx="9" ry="3" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Segment 2: Node 1 to Node 2 */}
            <path d="M112.5 270 L112 355 L128 355 L127.5 270 Z" fill="url(#scStalkGrad)" />
            {/* Node 2 */}
            <ellipse cx="120" cy="270" rx="8.5" ry="2.8" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Segment 3: Node 2 to Node 3 */}
            <path d="M113 195 L112.5 270 L127.5 270 L127 195 Z" fill="url(#scStalkGrad)" />
            {/* Node 3 */}
            <ellipse cx="120" cy="195" rx="8" ry="2.6" fill="url(#scNodeGrad)" stroke="#365314" strokeWidth="0.8" />

            {/* Top Segment into Canopy */}
            <path d="M114 140 L113 195 L127 195 L126 140 Z" fill="url(#scStalkGrad)" />
          </g>

          {/* ================= 4. LUSH ARCHING TWO-TONE FOLIAGE (Swaying Canopy) ================= */}
          <g ref={leavesRef} id="sugarcane-leaves-canopy">
            {/* Left Mid Droop Leaf (emerging from left Node 3) */}
            <g id="mid-left-leaf">
              {/* Underside fold */}
              <path d="M76 245 C64 210, 48 195, 38 275 C45 220, 62 205, 76 245 Z" fill="url(#scLeafDark)" />
              {/* Upper face */}
              <path d="M76 245 C58 200, 48 185, 38 275 C52 210, 68 200, 76 245 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Right Mid Droop Leaf (emerging from right Node 3) */}
            <g id="mid-right-leaf">
              {/* Underside fold */}
              <path d="M143 230 C155 195, 185 185, 208 265 C195 210, 165 200, 143 230 Z" fill="url(#scLeafDark)" />
              {/* Upper face */}
              <path d="M143 230 C165 185, 190 175, 208 265 C185 205, 155 195, 143 230 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Front Center Ribbon Leaf (Arching forward and left over the central stalk) */}
            <g id="front-center-ribbon-leaf">
              {/* Underside fold */}
              <path d="M120 195 C124 148, 104 135, 68 245 C86 165, 106 150, 120 195 Z" fill="url(#scLeafDark)" />
              {/* Upper lime face */}
              <path d="M120 195 C112 150, 98 135, 68 245 C92 175, 108 165, 120 195 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Far Left Cascading Frond (Large sweeping arch) */}
            <g id="crown-far-left-frond">
              {/* Underside fold */}
              <path d="M115 140 C85 85, 45 95, 18 180 C35 110, 75 90, 115 140 Z" fill="url(#scLeafDark)" />
              {/* Upper face */}
              <path d="M115 140 C75 75, 40 95, 18 180 C38 105, 80 80, 115 140 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Far Right Cascading Frond (Large sweeping arch) */}
            <g id="crown-far-right-frond">
              {/* Underside fold */}
              <path d="M125 140 C155 80, 195 90, 222 185 C205 110, 165 85, 125 140 Z" fill="url(#scLeafDark)" />
              {/* Upper face */}
              <path d="M125 140 C165 70, 200 90, 222 185 C202 105, 160 75, 125 140 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Inner Left Arching Spear */}
            <g id="inner-left-spear">
              <path d="M116 140 C95 70, 85 45, 82 70 C86 48, 102 80, 116 140 Z" fill="url(#scLeafDark)" />
              <path d="M116 140 C98 60, 88 38, 82 70 C88 45, 105 75, 116 140 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Inner Right Arching Spear */}
            <g id="inner-right-spear">
              <path d="M124 140 C145 65, 155 40, 158 65 C154 45, 138 75, 124 140 Z" fill="url(#scLeafDark)" />
              <path d="M124 140 C142 55, 152 32, 158 65 C152 42, 135 70, 124 140 Z" fill="url(#scLeafLight)" />
            </g>

            {/* Tall Center Spear (The highest sharp vertical frond) */}
            <g id="tall-center-spear">
              <path d="M120 140 C118 70, 118 35, 120 15 C121 40, 122 80, 120 140 Z" fill="url(#scLeafDark)" />
              <path d="M120 140 C119 65, 119 30, 120 15 C122 35, 124 75, 120 140 Z" fill="url(#scLeafLight)" />
            </g>
          </g>

          {/* ================= 5. SACRED CHHATH ARGHYA DIYA AT THE RIVER GHAT ================= */}
          <g id="arghya-diya-base">
            {/* Bamboo Soop accent platter */}
            <ellipse cx="75" cy="442" rx="32" ry="9" fill="#B45309" stroke="#FFE01B" strokeWidth="1.2" />
            <path d="M50 440 C62 450, 90 450, 100 440" stroke="#FDE047" strokeWidth="1.5" />

            {/* Sacred Terracotta Earthen Diya */}
            <path d="M64 437 C64 437, 69 443, 75 443 C81 443, 86 437, 86 437 Z" fill="#78350F" />
            <ellipse cx="75" cy="437" rx="10" ry="3" fill="#D97706" />

            {/* Sacred Diya Flame */}
            <path
              ref={flameRef}
              d="M75 422 C75 422, 70 430, 70 434 C70 436, 72 437, 75 437 C78 437, 80 436, 80 434 C80 430, 75 422, 75 422 Z"
              fill="#FFE01B"
            />
            <circle cx="75" cy="434" r="2" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  </div>
);
};

// ==========================================
// DIWALI BOTTOM LIT DIYAS COMPONENT (GSAP)
// ==========================================

export const DiwaliBottomDiyas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flamesRef = useRef<SVGGElement[]>([]);
  const aurasRef = useRef<SVGCircleElement[]>([]);
  const embersRef = useRef<SVGSVGElement>(null);

  // 7 Diyas distributed across the bottom of the viewport
  const diyas = [
    { id: 1, scale: 0.95, offset: -2 },
    { id: 2, scale: 1.05, offset: 0 },
    { id: 3, scale: 1.15, offset: 3 },
    { id: 4, scale: 1.25, offset: 5 }, // Centerpiece Diya
    { id: 5, scale: 1.15, offset: 3 },
    { id: 6, scale: 1.05, offset: 0 },
    { id: 7, scale: 0.95, offset: -2 },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.6 });
        return;
      }

      // 1. Master Timeline: Diyas rise gracefully, dwell, then exit smoothly (Plays just once)
      if (containerRef.current) {
        const masterTl = gsap.timeline();
        masterTl
          .fromTo(
            containerRef.current,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.4, ease: "power2.out" }
          )
          .to({}, { duration: 7 })
          .to(
            containerRef.current,
            { y: 35, opacity: 0, duration: 1.2, ease: "power2.in" }
          );
      }

      // 2. Organic flickering flames with independent, non-synchronized timings
      flamesRef.current.forEach((flame, index) => {
        if (!flame) return;
        const dur = 0.18 + (index % 3) * 0.05;
        gsap.to(flame, {
          scaleY: 1.22,
          scaleX: 0.9,
          rotation: (index % 2 === 0 ? 3.5 : -3.5),
          transformOrigin: "center bottom",
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 3. Warm pulsating golden flame halos
      aurasRef.current.forEach((aura, index) => {
        if (!aura) return;
        gsap.to(aura, {
          scale: 1.35,
          opacity: 0.8,
          transformOrigin: "center center",
          duration: 1.2 + (index % 3) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 4. Rising golden sparkler embers floating into the night sky
      if (embersRef.current) {
        gsap.to(embersRef.current.children, {
          y: -45,
          opacity: 0,
          scale: 0.5,
          stagger: {
            each: 0.25,
            repeat: -1,
          },
          duration: 2.2,
          ease: "power1.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 z-[9990] pointer-events-none select-none flex flex-col items-center justify-end"
    >
      {/* Floating Shubh Deepawali Badge */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-[10000] px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-white text-xs sm:text-sm font-bold shadow-[0_4px_25px_rgba(255,184,0,0.35)] flex items-center gap-2.5 animate-pulse">
        <span className="text-base sm:text-lg">🪔</span>
        <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-300 bg-clip-text text-transparent font-extrabold tracking-tight">
          Happy Diwali! May your home be blessed with eternal light
        </span>
      </div>

      {/* Warm Ambient Floor Light Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-amber-500/25 via-orange-500/10 to-transparent pointer-events-none" />

      {/* Row of Lit Traditional Terracotta Diyas along the bottom */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 pb-1 flex items-end justify-between sm:justify-around filter drop-shadow-[0_0_12px_rgba(255,184,0,0.6)]">
        {diyas.map((d, index) => (
          <div
            key={d.id}
            className={`flex flex-col items-center shrink-0 ${index === 0 || index === 6 ? "hidden sm:flex" : ""}`}
            style={{
              transform: `scale(${d.scale}) translateY(${-d.offset}px)`,
            }}
          >
            <svg
              viewBox="0 0 54 46"
              className="w-12 h-10 sm:w-14 sm:h-12 overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Warm Radiating Flame Aura */}
              <circle
                ref={(el) => {
                  if (el) aurasRef.current[index] = el;
                }}
                cx="27"
                cy="18"
                r="16"
                fill="url(#diwaliFloorAura)"
                opacity="0.5"
              />

              {/* Handcrafted Terracotta Diya Bowl */}
              <g id="earthen-diya-bowl">
                {/* Clay Bowl Body */}
                <path
                  d="M9 29C9 29 13 41 27 41C41 41 45 29 45 29C45 29 39 33 27 33C15 33 9 29 9 29Z"
                  fill="url(#clayBowlGrad)"
                />
                {/* Diya Rim */}
                <ellipse cx="27" cy="29" rx="18" ry="4.5" fill="#B45309" stroke="#FFE01B" strokeWidth="0.8" />
                {/* Golden Ghee / Mustard Oil Pool */}
                <ellipse cx="27" cy="29" rx="14" ry="3" fill="#D97706" />
                {/* Decorative etched rim dots */}
                <circle cx="16" cy="29" r="0.8" fill="#FFE01B" />
                <circle cx="21" cy="30" r="0.8" fill="#FFE01B" />
                <circle cx="27" cy="30.5" r="0.9" fill="#FFE01B" />
                <circle cx="33" cy="30" r="0.8" fill="#FFE01B" />
                <circle cx="38" cy="29" r="0.8" fill="#FFE01B" />
              </g>

              {/* Sacred Teardrop Flickering Flame */}
              <g
                ref={(el) => {
                  if (el) flamesRef.current[index] = el;
                }}
                id="diya-flame"
              >
                {/* Outer Saffron/Amber Flame */}
                <path
                  d="M27 4C27 4 19 14 19 21C19 25 22.5 28 27 28C31.5 28 35 25 35 21C35 14 27 4 27 4Z"
                  fill="url(#diwaliFloorFlameOuter)"
                />
                {/* Inner Pure Gold & White Hot Core */}
                <path
                  d="M27 10C27 10 22.5 17 22.5 21C22.5 23.5 24.5 25.5 27 25.5C29.5 25.5 31.5 23.5 31.5 21C31.5 17 27 10 27 10Z"
                  fill="url(#diwaliFloorFlameInner)"
                />
                <circle cx="27" cy="22" r="1.8" fill="#FFFFFF" />
              </g>

              {/* Gradients */}
              <defs>
                <radialGradient id="diwaliFloorAura" cx="0.5" cy="0.5" r="0.5">
                  <stop stopColor="#FFE01B" stopOpacity="0.85" />
                  <stop offset="0.6" stopColor="#FF6B00" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#FF1B58" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="clayBowlGrad" x1="27" y1="29" x2="27" y2="41" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D97706" />
                  <stop offset="0.5" stopColor="#B45309" />
                  <stop offset="1" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="diwaliFloorFlameOuter" x1="27" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFE01B" />
                  <stop offset="0.6" stopColor="#FF6B00" />
                  <stop offset="1" stopColor="#FF1B58" />
                </linearGradient>
                <linearGradient id="diwaliFloorFlameInner" x1="27" y1="10" x2="27" y2="25.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.6" stopColor="#FFF176" />
                  <stop offset="1" stopColor="#FFB800" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Rising Golden Embers / Sparkles */}
      <svg
        ref={embersRef}
        viewBox="0 0 800 60"
        className="w-full h-14 pointer-events-none absolute bottom-8 left-0 right-0 overflow-visible"
        fill="none"
      >
        <circle cx="120" cy="50" r="1.5" fill="#FFE01B" opacity="0.8" />
        <circle cx="240" cy="52" r="2" fill="#FFAA00" opacity="0.85" />
        <circle cx="380" cy="48" r="1.8" fill="#FFFFFF" opacity="0.9" />
        <circle cx="420" cy="50" r="2.2" fill="#FFE01B" opacity="0.85" />
        <circle cx="560" cy="52" r="1.6" fill="#FFAA00" opacity="0.8" />
        <circle cx="680" cy="48" r="2" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};

// ==========================================
// CHRISTMAS TREE & GIFTS SLIDE-IN COMPONENT (GSAP)
// ==========================================

export const ChristmasTreeSlideIn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const treeSwayRef = useRef<HTMLDivElement>(null);
  const treeImgRef = useRef<HTMLImageElement>(null);
  const starTopperRef = useRef<SVGGElement>(null);
  const fairyLightsRef = useRef<SVGGElement>(null);
  const centerMessageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleTreeClick = useCallback(() => {
    if (treeImgRef.current) {
      gsap.to(treeImgRef.current, {
        scale: 1.08,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
    if (starTopperRef.current) {
      gsap.to(starTopperRef.current, {
        scale: 1.8,
        rotation: 45,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "back.out(2)",
      });
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.to([centerMessageRef.current, treeContainerRef.current], {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to([treeContainerRef.current, centerMessageRef.current], { opacity: 1, duration: 0.6 });
        return;
      }

      // Idle gentle tree sway
      if (treeSwayRef.current) {
        gsap.to(treeSwayRef.current, {
          rotation: 1.8,
          transformOrigin: "bottom right",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Idle golden star topper twinkle
      if (starTopperRef.current) {
        gsap.to(starTopperRef.current, {
          scale: 1.25,
          opacity: 1,
          transformOrigin: "center center",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Idle fairy lights blink
      if (fairyLightsRef.current) {
        gsap.to(fairyLightsRef.current.children, {
          scale: 1.4,
          opacity: 1,
          stagger: {
            each: 0.18,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.6,
          ease: "sine.inOut",
        });
      }

      // Master Timeline: Entry -> Dwell -> Exit (Plays just once)
      const masterTl = gsap.timeline({
        onComplete: () => {
          setIsDismissed(true);
        },
      });
      timelineRef.current = masterTl;

      // 1. Entry Phase (Tree slides in from bottom-right, Message scales into center)
      masterTl
        .fromTo(
          treeContainerRef.current,
          { x: "120%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 1.5, ease: "power3.out" },
          0
        )
        .fromTo(
          centerMessageRef.current,
          { scale: 0.75, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.5)" },
          0.3
        );

      // 2. Dwell Phase (Center message and tree celebrate for ~7 seconds)
      masterTl.to({}, { duration: 7 });

      // 3. Exit Phase (Center message floats up and fades, Tree slides back out)
      masterTl
        .to(centerMessageRef.current, {
          scale: 0.85,
          opacity: 0,
          y: -25,
          duration: 0.7,
          ease: "power2.in",
        })
        .to(
          treeContainerRef.current,
          { x: "120%", opacity: 0, duration: 1.2, ease: "power3.in" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="contents">
      {/* 1. CENTER SCREEN FESTIVE MESSAGE CARD */}
      {!isDismissed && (
        <div
          ref={centerMessageRef}
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center p-4"
        >
          <div className="relative pointer-events-auto max-w-sm sm:max-w-md w-full mx-auto p-6 sm:p-8 rounded-3xl bg-black/85 sm:bg-[#021f12]/90 backdrop-blur-2xl border border-emerald-400/40 shadow-[0_0_60px_rgba(34,197,94,0.35),0_25px_60px_rgba(0,0,0,0.8)] text-center flex flex-col items-center gap-3">
            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
              aria-label="Dismiss greeting"
            >
              ✕
            </button>

            {/* Festive Ring Icon */}
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(52,211,153,0.5)]">
              🎄
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-200 bg-clip-text text-transparent">
              Merry Christmas!
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-xs">
              Wishing you and your family warmth, joy, peace, and holiday cheer.
            </p>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] sm:text-xs text-amber-200 font-semibold tracking-wide uppercase">
              ✨ Happy Holidays &amp; New Year ✨
            </div>
          </div>
        </div>
      )}

      {/* 2. CHRISTMAS TREE SLIDING IN AT BOTTOM-RIGHT EDGE */}
      <div
        ref={treeContainerRef}
        className="fixed bottom-0 right-0 sm:right-2 md:right-4 z-[9997] pointer-events-auto cursor-pointer select-none filter drop-shadow-[0_8px_30px_rgba(38,166,154,0.45)] drop-shadow-[0_4px_16px_rgba(255,183,77,0.35)]"
        onClick={handleTreeClick}
        title="Click the Christmas tree and presents to celebrate!"
      >
        <div ref={treeSwayRef} className="relative w-44 sm:w-60 md:w-72 lg:w-80 h-auto">
          {/* Soft Radial Ambient Christmas Aura behind tree & gifts */}
          <div className="absolute inset-0 -bottom-4 bg-gradient-radial from-emerald-500/20 via-amber-400/10 to-transparent blur-2xl pointer-events-none rounded-full" />

          {/* User-Provided Christmas Tree with Gifts SVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={treeImgRef}
            src="/assets/images/christmas-tree.svg"
            alt="Festive Christmas tree with wrapped gifts"
            className="w-full h-auto block drop-shadow-md select-none pointer-events-auto hover:brightness-105 transition-all"
            draggable={false}
          />

          {/* Dynamic Overlaid Fairy Lights & Star Topper */}
          <svg
            viewBox="0 0 741 864"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Star Topper Overlay on top tip of the tree (x: 223, y: 0) */}
            <g ref={starTopperRef} id="tree-star-topper" transform="translate(223, 10)">
              <circle cx="0" cy="0" r="14" fill="#FFE01B" opacity="0.3" filter="blur(4px)" />
              <polygon
                points="0,-16 4,-5 15,-5 6,3 10,14 0,7 -10,14 -6,3 -15,-5 -4,-5"
                fill="#FFE01B"
                stroke="#FFF"
                strokeWidth="1.2"
              />
              <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
            </g>

            {/* Twinkling Colorful Fairy Lights across the tree tiers */}
            <g ref={fairyLightsRef} id="tree-fairy-lights">
              <circle cx="170" cy="180" r="4.5" fill="#FF1B58" opacity="0.85" filter="drop-shadow(0 0 4px #FF1B58)" />
              <circle cx="280" cy="175" r="4.5" fill="#FFE01B" opacity="0.85" filter="drop-shadow(0 0 4px #FFE01B)" />
              <circle cx="140" cy="310" r="5" fill="#38BDF8" opacity="0.85" filter="drop-shadow(0 0 4px #38BDF8)" />
              <circle cx="230" cy="270" r="5" fill="#A855F7" opacity="0.85" filter="drop-shadow(0 0 4px #A855F7)" />
              <circle cx="310" cy="300" r="5" fill="#F97316" opacity="0.85" filter="drop-shadow(0 0 4px #F97316)" />
              <circle cx="95" cy="460" r="5.5" fill="#FFE01B" opacity="0.85" filter="drop-shadow(0 0 4px #FFE01B)" />
              <circle cx="210" cy="440" r="5.5" fill="#FF1B58" opacity="0.85" filter="drop-shadow(0 0 4px #FF1B58)" />
              <circle cx="340" cy="450" r="5.5" fill="#38BDF8" opacity="0.85" filter="drop-shadow(0 0 4px #38BDF8)" />
              <circle cx="60" cy="620" r="6" fill="#A855F7" opacity="0.85" filter="drop-shadow(0 0 4px #A855F7)" />
              <circle cx="180" cy="600" r="6" fill="#F97316" opacity="0.85" filter="drop-shadow(0 0 4px #F97316)" />
              <circle cx="390" cy="610" r="6" fill="#FFE01B" opacity="0.85" filter="drop-shadow(0 0 4px #FFE01B)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const FestivalEffectOverlay = ({ effect, active = true }: { effect?: string; active?: boolean }) => {
  if (!active || !effect || effect === "none") {
    return <div aria-hidden="true" style={{ display: "none" }} />;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      <style>{`
        @keyframes instudiaFestivalFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes instudiaFestivalGlow {
          0%, 100% {
            opacity: 0;
          }
          20%, 75% {
            opacity: 0.4;
          }
        }
        @keyframes instudiaFestivalDoodle {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-3px) rotate(4deg) scale(1.1);
          }
        }
      `}</style>
      {effect === "christmas-tree" && (
        <>
          <Snowfall count={35} />
          <ChristmasTreeSlideIn />
        </>
      )}
      {effect === "diwali-diyas" && <DiwaliBottomDiyas />}
      {effect === "sugarcane" && <ChhathSugarcanePeeking />}
      {effect === "color-splash" && <HoliScreenSplash />}
      {effect === "confetti" && <Confetti />}
      {effect === "snowfall" && <Snowfall />}
      {effect === "lights" && <GlowEffects />}
      {effect === "easter-eggs" && <EasterEggs />}
    </div>
  );
};

export const FestivalDoodle = ({ type }: { type: string }) => {
  const icon = DOODLE_ICONS[type] || DOODLE_ICONS.star;

  return (
    <span
      className="inline-block ml-2 pointer-events-none align-middle"
      style={{
        animation: "instudiaFestivalDoodle 3s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes instudiaFestivalDoodle {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-3px) rotate(4deg) scale(1.1);
          }
        }
      `}</style>
      {icon}
    </span>
  );
};
