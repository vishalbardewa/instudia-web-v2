"use client";
import { useState, useEffect } from "react";

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
