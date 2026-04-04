"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BrutalistButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  accentColor?: string;
  shadowColor?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrutalistButton({
  text,
  href,
  onClick,
  className = "",
  accentColor = "bg-white",
  shadowColor = "rgba(0,0,0,1)",
  size = "md",
}: BrutalistButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-3 text-xs",
    md: "px-10 py-5 text-sm",
    lg: "px-14 py-7 text-lg",
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.02, x: -4, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex border-2 border-black ${accentColor} 
        ${sizeClasses[size]} font-black uppercase tracking-[0.2em] 
        shadow-[4px_4px_0px_0px_${shadowColor}] 
        hover:shadow-[8px_8px_0px_0px_${shadowColor}] 
        transition-all duration-200 cursor-pointer text-black text-center justify-center items-center gap-4
        ${className}
      `.replace(/\s+/g, " ")}
    >
      {text}
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} target={href.startsWith("http") ? "_blank" : "_self"} className="inline-block no-underline">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block p-0 bg-transparent border-none">
      {content}
    </button>
  );
}
