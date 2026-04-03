"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COLORS = ["#FF1B58", "#FFE01B", "#C21BFF", "#58FF1B", "#3B82F6", "#F97316"];
const EGG_COLORS = ["#FFD700", "#FF69B4", "#7FFFD4", "#9370DB", "#FFA07A"];

interface ParticleProps {
  color: string;
  shape: "circle" | "rect";
}

const Particle = ({ color, shape }: ParticleProps) => (
  <motion.div
    initial={{ 
      y: -20, 
      x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0, 
      opacity: 0,
      rotate: 0 
    }}
    animate={{ 
      y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
      opacity: [0, 1, 1, 0],
      rotate: 360
    }}
    transition={{ 
      duration: Math.random() * 2 + 3,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 5
    }}
    style={{
      position: "fixed",
      top: 0,
      zIndex: 9999,
      width: shape === "circle" ? "8px" : "10px",
      height: shape === "circle" ? "8px" : "6px",
      backgroundColor: color,
      borderRadius: shape === "circle" ? "50%" : "2px",
      pointerEvents: "none",
    }}
  />
);

export const Confetti = ({ count = 50 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Particle 
          key={i} 
          color={COLORS[i % COLORS.length]} 
          shape={Math.random() > 0.5 ? "circle" : "rect"} 
        />
      ))}
    </>
  );
};

export const Snowfall = ({ count = 50 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Particle 
          key={i} 
          color="#FFFFFF" 
          shape="circle" 
        />
      ))}
    </>
  );
};

export const GlowEffects = () => (
  <motion.div
    initial={{ opacity: 0.2 }}
    animate={{ opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "10px",
      boxShadow: "0 0 20px 10px rgba(255, 224, 27, 0.3)",
      zIndex: 49,
      pointerEvents: "none",
    }}
  />
);

const DOODLE_ICONS: Record<string, JSX.Element> = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C12.21,20 19,15.22 19,13C19,11.5 18.5,10.03 17,8Z" />
    </svg>
  ),
  splash: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M10,21C7,21 3,18 3,11C3,9.5 4,8 5,7.2C4.5,5.8 4.6,4.3 5.4,3.2C6.2,2.1 7.5,1.5 8.9,1.6C9.1,1.6 9.3,1.6 9.5,1.7C10.7,0.6 12.3,0 14,0C17.3,0 20,2.7 20,6C20,7.3 19.6,8.4 18.8,9.4C19.6,10.2 20,11.3 20,12.5C20,14.6 18.2,16.3 16,16.4C15.3,18.8 13.5,21 10,21Z" />
    </svg>
  ),
  drum: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2A10,3 0 0,0 2,5V19A10,3 0 0,0 12,22A10,3 0 0,0 22,19V5A10,3 0 0,0 12,2Z" />
    </svg>
  ),
  spear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M21,3L3,21M18,3L21,6M15,6L18,9M12,9L15,12M9,12L12,15M6,15L9,18M3,18L6,21" />
    </svg>
  ),
  pookalam: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2L14.4,6.6L19,7.2L15.6,10.6L16.4,15.4L12,13.1L7.6,15.4L8.4,10.6L5,7.2L9.6,6.6L12,2Z" />
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2C12,2 9,6 9,10C9,14 12,18 12,18C12,18 15,14 15,10C15,6 12,2 12,2Z" />
      <path d="M12,4C12,4 16,8 16,12C16,16 12,20 12,20C12,20 8,16 8,12C8,8 12,4 12,4Z" opacity="0.6" />
    </svg>
  ),
  lamp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2C12,2 9,5 9,8C9,11 12,13 12,13C12,13 15,11 15,8C15,5 12,2 12,2Z" />
      <path d="M4,15C4,15 4,21 12,21C20,21 20,15 12,15C4,15 4,15 4,15Z" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
      <path d="M12,1V3M12,21V23M23,12H21M3,12H1M19.8,4.2L18.4,5.6M5.6,18.4L4.2,19.8M19.8,19.8L18.4,18.4M5.6,5.6L4.2,4.2" />
    </svg>
  ),
  bird: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M21,5C21,5 18,2 14,2C10,2 7,5 7,5C7,5 4,5 2,7C0,9 0,12 2,14C4,16 7,16 7,16C7,16 10,19 14,19C18,19 21,16 21,16V5Z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2L14.5,8.5H21L16,12.5L18.5,19L12,15L5.5,19L8,12.5L3,8.5H9.5L12,2Z" />
    </svg>
  ),
  egg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12,2C8.69,2 6,6.48 6,12C6,17.52 8.69,22 12,22C15.31,22 18,17.52 18,12C18,6.48 15.31,2 12,2Z" />
    </svg>
  ),
};

export const EasterEggs = ({ count = 20 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -50, 
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000), 
            opacity: 0,
            rotate: 0,
            scale: 0.8
          }}
          animate={{ 
            y: (typeof window !== "undefined" ? window.innerHeight : 1000) + 100,
            opacity: [0, 1, 1, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: 1
          }}
          transition={{ 
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8
          }}
          style={{
            position: "fixed",
            top: 0,
            zIndex: 9999,
            color: EGG_COLORS[i % EGG_COLORS.length],
            pointerEvents: "none",
          }}
        >
          {DOODLE_ICONS.egg}
        </motion.div>
      ))}
    </>
  );
};

export const FestivalDoodle = ({ type }: { type: string }) => {
  const icon = DOODLE_ICONS[type] || DOODLE_ICONS.star;

  return (
    <motion.span
      animate={{ 
        y: [0, -5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1] 
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="inline-block ml-2 pointer-events-none"
    >
      {icon}
    </motion.span>
  );
};
