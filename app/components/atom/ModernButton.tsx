"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ModernButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function ModernButton({
  text,
  href,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
}: ModernButtonProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-[#1B1C1E] text-white shadow-lg shadow-black/10 hover:bg-neutral-800",
    secondary: "bg-brandpurple text-white shadow-lg shadow-brandpurple/20 hover:bg-brandpurple/90",
    outline: "bg-white border-2 border-[#1B1C1E] text-[#1B1C1E] hover:bg-neutral-50",
  };

  const commonClasses = `
    inline-flex items-center justify-center gap-3 
    rounded-full font-extrabold tracking-tight 
    transition-all duration-200 cursor-pointer 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${className}
  `.replace(/\s+/g, " ");

  const Icon = () => (
    <svg 
      suppressHydrationWarning 
      className="w-5 h-5 flex-shrink-0 whitespace-nowrap" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );

  // If not mounted, render the original structure (div-wrapped in anchor/button) to match the stale server cache
  if (!mounted) {
    const fallbackContent = (
      <div className={commonClasses}>
        {text}
        <Icon />
      </div>
    );

    if (href) {
      return (
        <a href={href} className="inline-block no-underline">
          {fallbackContent}
        </a>
      );
    }

    return (
      <button type="button" className="inline-block p-0 bg-transparent border-none">
        {fallbackContent}
      </button>
    );
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        
        if (targetId === "enquiry") {
          const formContainer = document.getElementById("enquiry-form-container");
          if (formContainer) {
            setTimeout(() => {
              formContainer.classList.add("ring-8", "ring-brandpurple/30", "scale-[1.02]", "z-10");
              
              // Focus the Full Name input
              const nameInput = document.getElementById("enq-name");
              if (nameInput) {
                nameInput.focus();
              }
              
              setTimeout(() => {
                formContainer.classList.remove("ring-8", "ring-brandpurple/30", "scale-[1.02]", "z-10");
              }, 1500);
            }, 600);
          }
        }
      }
    }
  };

  if (href) {
    const isFragment = href.startsWith("#");
    
    return (
      <Link 
        href={href} 
        target={href.startsWith("http") ? "_blank" : "_self"} 
        className="inline-block no-underline"
        onClick={isFragment ? handleLinkClick : undefined}
      >
        <motion.span
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={commonClasses}
        >
          {text}
          <Icon />
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={commonClasses}
    >
      {text}
      <Icon />
    </motion.button>
  );
}
