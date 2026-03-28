"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;

    const getTarget = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      return total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    };

    const tick = () => {
      // Lerp: move 12% of the remaining distance each frame (~60fps → smooth)
      current += (target - current) * 0.12;
      if (barRef.current) {
        barRef.current.style.width = `${current}%`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = getTarget();
    };

    target = getTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[4px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-[#1B1C1E] will-change-[width]"
        style={{ width: "0%" }}
      />
    </div>
  );
}
