"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type PostSummary, formatDate } from "../../data/types";
import { Container } from "../atom/Container";
import { getOptimizedThumbnail } from "../../utils/thumbnailOptimizer";

// --- Authoritative Brand Palette ---
const BRAND_COLORS = ["#C21BFF", "#FFE01B", "#FF1B58", "#58FF1B"];

// --- Swiss Brutalist Card Architecture ---
function SwissBrutalistCard({ post, index }: { post: PostSummary; index: number }) {
  const brandColor = BRAND_COLORS[index % BRAND_COLORS.length];

  return (
    <div className="carousel-card flex-shrink-0 w-[85vw] sm:w-[480px] snap-start py-12 px-4">
      <Link href={`/blog/${post.slug}`} prefetch={false} className="block h-full group">
        <div
          style={{ "--card-brand": brandColor } as React.CSSProperties}
          className="flex flex-col h-full bg-white border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_var(--card-brand)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 ease-out overflow-hidden relative"
        >
          {/* Brutalist Image Vault */}
          <div className="overflow-hidden aspect-[16/9] relative border-b-2 border-black">
            <img
              src={getOptimizedThumbnail(post.coverImage)}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Technical Index Label */}
            <div className="absolute top-0 right-0 z-30">
              <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-b-2 border-white">
                {post.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Swiss Typographic Hub */}
          <div className="flex flex-col flex-1 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 h-[1px] bg-black" />
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">
                {post.readTime}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black leading-[1] tracking-tight uppercase group-hover:text-brandpurple transition-colors line-clamp-3">
              {post.title}
            </h3>

            <p className="mt-6 text-sm text-black font-medium leading-normal line-clamp-3 flex-1 opacity-70">
              {post.excerpt}
            </p>

            {/* Brutalist Metadata Footer */}
            <div className="mt-10 pt-6 border-t-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 aspect-square border-2 border-black overflow-hidden bg-neutral-100 rounded-full">
                  <img
                    src={post.authorPhoto}
                    alt={post.author}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-black leading-none uppercase">
                    {post.author}
                  </span>
                  <span className="text-[9px] font-bold text-black opacity-50 uppercase tracking-tighter">
                    {post.authorRole || "Elite Faculty"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-black uppercase tracking-[0.1em]">
                  {formatDate(post.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// --- Rigid Brutalist Button ---
function RigidButton({
  children,
  onClick,
  direction,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  direction: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-16 h-16 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_#FF1B58] hover:bg-neutral-50 active:scale-95 transition-all duration-200 ${
        direction === "left" ? "hover:-translate-x-1" : "hover:translate-x-1"
      }`}
    >
      {children}
    </button>
  );
}

// --- Swiss International Header Architecture ---
const SwissHeader = ({
  showLeftArrow,
  showRightArrow,
  handleScroll,
}: {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  handleScroll: (d: "left" | "right") => void;
}) => (
  <div className="relative mb-12 sm:mb-20 px-4 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
      <div className="lg:col-span-7">
        <div className="carousel-header-badge flex items-center gap-4 mb-10">
          <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
            Latest
          </span>
          <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
            Knowledge section
          </p>
        </div>

        <h2 className="carousel-header-title text-5xl sm:text-7xl lg:text-[10rem] font-black tracking-[-0.04em] text-black leading-[0.8] uppercase flex flex-col">
          <span>instudia</span>
          <span className="text-white [-webkit-text-stroke:4px_black]" style={{ paintOrder: "stroke fill" }}>
            Blogs.
          </span>
        </h2>
      </div>

      <div className="lg:col-span-5 lg:mb-4 lg:text-right flex flex-col items-end gap-10">
        <p className="text-sm font-bold text-black leading-tight max-w-sm ml-auto uppercase opacity-80">
          Degrees show where you have been.<br /> Skills show where you are going.
        </p>

        <div className="flex items-center gap-10 w-full lg:w-auto">
          {/* Desktop Navigation Hub */}
          <div className="hidden lg:flex items-center gap-4">
            <div className={`transition-opacity duration-200 ${showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <RigidButton onClick={() => handleScroll("left")} direction="left" label="Scroll blog posts left">
                <svg className="w-8 h-8 rotate-180" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RigidButton>
            </div>
            <div className={`transition-opacity duration-200 ${showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <RigidButton onClick={() => handleScroll("right")} direction="right" label="Scroll blog posts right">
                <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RigidButton>
            </div>
          </div>

          <Link
            href="/blog"
            className="flex-1 lg:flex-none inline-flex border-2 border-black px-10 py-5 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_#C21BFF] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4 w-full">
              Browse All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function BlogCarousel({ posts }: { posts: PostSummary[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollCheck = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 20);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
      }
    };

    const el = scrollRef.current;
    if (el) {
      handleScrollCheck();
      el.addEventListener("scroll", handleScrollCheck, { passive: true });
    }
    return () => el?.removeEventListener("scroll", handleScrollCheck);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header badge entrance
      gsap.fromTo(
        ".carousel-header-badge",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Header title entrance
      gsap.fromTo(
        ".carousel-header-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Carousel cards stagger entrance
      if (scrollRef.current) {
        const cards = scrollRef.current.querySelectorAll(".carousel-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  return (
    <section ref={sectionRef} data-no-reveal="true" className="relative mt-24 sm:mt-32 lg:mt-40 py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#FAFAFA]">
      {/* Swiss Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        <SwissHeader
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          handleScroll={handleScroll}
        />

        {/* Mobile/Tablet Navigation Row */}
        <div className="flex lg:hidden items-center justify-between mb-12 px-4">
          <div className="flex items-center gap-4">
            <div className={`transition-opacity duration-200 ${showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <RigidButton onClick={() => handleScroll("left")} direction="left" label="Scroll blog posts left">
                <svg className="w-8 h-8 rotate-180" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RigidButton>
            </div>
            <div className={`transition-opacity duration-200 ${showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <RigidButton onClick={() => handleScroll("right")} direction="right" label="Scroll blog posts right">
                <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RigidButton>
            </div>
          </div>
          <div className="h-[2px] flex-1 mx-8 bg-black/10 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-black transition-transform duration-100 ease-out origin-left"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>
      </Container>

      {/* Cinematic Horizontal Vault */}
      <div
        ref={scrollRef}
        className="flex gap-10 sm:gap-16 overflow-x-auto brutalist-scrollbar snap-x snap-mandatory px-[calc(max(1.5rem,(100vw-80rem)/2))] pb-16 relative z-10 cursor-grab active:cursor-grabbing"
      >
        {posts.map((post, index) => (
          <SwissBrutalistCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* Swiss Index Hub - Desktop Focused */}
      <Container className="relative z-10 hidden lg:block">
        <div className="flex items-center gap-16 px-6 sm:px-0">
          <div className="flex-1 h-1 bg-black/10 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-black transition-transform duration-100 ease-out origin-left"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-2 h-2 border-[1px] border-black ${i === 1 ? "bg-black" : "bg-transparent"}`} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
