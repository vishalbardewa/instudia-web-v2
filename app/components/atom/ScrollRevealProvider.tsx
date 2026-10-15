"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProviderProps {
  children: React.ReactNode;
}

export default function ScrollRevealProvider({ children }: ScrollRevealProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Respect accessibility settings for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    // Small delay ensures Next.js has mounted new DOM elements on navigation
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const selector = [
          "main section:not([data-no-reveal]) h1:not([data-no-reveal])",
          "main section:not([data-no-reveal]) h2:not([data-no-reveal])",
          "main section:not([data-no-reveal]) h3:not([data-no-reveal])",
          "main article:not([data-no-reveal]) h1:not([data-no-reveal])",
          "main article:not([data-no-reveal]) h2:not([data-no-reveal])",
          "main article:not([data-no-reveal]) h3:not([data-no-reveal])",
          "main .prose p",
          "main .prose figure",
          "main .prose blockquote",
          "main .prose .table-container",
          ".reveal-on-scroll",
          ".blog-card",
          ".archive-card",
          ".course-card",
          ".service-card",
        ].join(", ");

        const allCandidates = Array.from(document.querySelectorAll<HTMLElement>(selector));

        // Filter out elements within excluded parent wrappers (navigation, footers, custom GSAP heroes)
        const validElements = allCandidates.filter((el) => {
          if (el.closest("[data-no-reveal]")) return false;
          if (el.closest("header, nav, footer, [role='navigation'], .floating-nav")) return false;
          return true;
        });

        if (validElements.length === 0) return;

        // Set initial subtle starting state
        gsap.set(validElements, {
          opacity: 0,
          y: 24,
        });

        // Batch entrance on scroll:
        // Elements in the initial viewport immediately trigger on load.
        // Elements below the fold reveal once as the user scrolls into them.
        ScrollTrigger.batch(validElements, {
          interval: 0.08,
          batchMax: 5,
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });

        ScrollTrigger.refresh();
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
