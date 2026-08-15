"use client";

import { useState, useEffect } from "react";

const WA_NUMBER = "918798587779";
const WA_MESSAGE = encodeURIComponent(
  "Hi instudia! I'd like to know more about your courses and upcoming batches. 👋"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// Hidden till the end of 29th August 2026 (IST) to showcase the Agentic AI Bot
const WORKSHOP_EXPIRY_TIMESTAMP = new Date("2026-08-29T23:59:59+05:30").getTime();

export default function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isWorkshopPeriod, setIsWorkshopPeriod] = useState(true);

  // Slide in after 2s (only when workshop period has concluded)
  useEffect(() => {
    setMounted(true);
    const active = Date.now() <= WORKSHOP_EXPIRY_TIMESTAMP;
    setIsWorkshopPeriod(active);

    if (!active) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!mounted || isWorkshopPeriod) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Tooltip / bubble */}
      {tooltipOpen && (
        <div className="animate-fade-in mb-1 max-w-[220px] rounded-2xl rounded-br-sm bg-white shadow-xl border border-neutral-100 px-4 py-3 text-sm text-gray-700 leading-snug">
          <p className="font-bold text-[#1B1C1E] mb-0.5">Chat with us 👋</p>
          <p className="text-xs text-gray-500">
            Ask about courses, batches & fees. We reply fast!
          </p>
          {/* WhatsApp-style tail */}
          <span className="absolute bottom-0 right-4 translate-y-full border-l-[10px] border-l-transparent border-t-[10px] border-t-white" />
        </div>
      )}

      {/* Main FAB */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        onClick={() => setTooltipOpen(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 active:scale-95 transition-all duration-200"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-0" />

        {/* WhatsApp icon */}
        <svg
          className="w-7 h-7 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
