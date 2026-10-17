"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type PostSummary, formatDate } from "../data/types";
import { getOptimizedThumbnail } from "../utils/thumbnailOptimizer";
import { Container } from "../components/atom/Container";

const BRAND_COLORS = ["#C21BFF", "#FFE01B", "#FF1B58", "#58FF1B"];

// --- Swiss Brutalist Card Architecture ---
function SwissBrutalistCard({
  post,
  index,
  isLarge = false,
}: {
  post: PostSummary;
  index: number;
  isLarge?: boolean;
}) {
  const brandColor = BRAND_COLORS[index % BRAND_COLORS.length];
  const shadowClass = isLarge
    ? "shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_var(--card-brand)]"
    : "shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_var(--card-brand)]";
  const cardIdentifier = "blog-card";

  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={false}
      className={`${cardIdentifier} group block h-full ${isLarge ? "col-span-full" : ""}`}
    >
      <div
        style={{ "--card-brand": brandColor } as React.CSSProperties}
        className={`flex flex-col h-full bg-white border-2 border-black transition-all duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 overflow-hidden relative ${shadowClass} ${
          isLarge ? "lg:flex-row" : ""
        }`}
      >
        {/* Brutalist Image Vault */}
        <div
          className={`overflow-hidden relative border-black ${
            isLarge
              ? "lg:w-3/5 lg:border-r-2 aspect-[16/9] lg:aspect-auto"
              : "aspect-[16/9] border-b-2"
          }`}
        >
          <img
            src={getOptimizedThumbnail(post.coverImage, isLarge ? 1000 : 600)}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute top-0 right-0 z-30">
            <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-b-2 border-white">
              {post.category.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Swiss Typographic Hub */}
        <div className={`flex flex-col flex-1 p-8 sm:p-10 ${isLarge ? "lg:justify-center" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-[1px] bg-black" />
            <span className="text-[10px] font-bold text-black uppercase tracking-widest">
              {post.readTime}
            </span>
          </div>

          <h3
            className={`${
              isLarge ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"
            } font-black text-black leading-[1] tracking-tight uppercase group-hover:text-[#C21BFF] transition-colors line-clamp-3`}
          >
            {post.title}
          </h3>

          <p
            className={`blog-card-excerpt mt-6 text-sm text-black font-medium leading-normal opacity-70 line-clamp-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-black ${
              isLarge ? "text-lg max-w-xl" : ""
            }`}
          >
            {post.excerpt}
          </p>

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
  );
}

export default function BlogClient({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    rawCategories.sort((a, b) => a.localeCompare(b));
    return ["All", ...rawCategories];
  }, [posts]);

  const filtered = useMemo(() => {
    return active === "All" ? posts : posts.filter((p) => p.category === active);
  }, [active, posts]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const groupedByYear = useMemo(() => {
    const groups: Record<string, PostSummary[]> = {};
    rest.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return groups;
  }, [rest]);

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

  // 1. Initial Hero Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const heroBadge = heroRef.current.querySelector(".hero-badge");
    const heroTitle = heroRef.current.querySelector(".hero-title");
    const heroDesc = heroRef.current.querySelector(".hero-description");
    const heroAccentBar = heroRef.current.querySelector(".hero-accent-bar");

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroBadge) {
      heroTl.fromTo(heroBadge, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
    }
    if (heroTitle) {
      heroTl.fromTo(heroTitle, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    }
    if (heroDesc) {
      heroTl.fromTo(
        heroDesc,
        { opacity: 0, y: 16 },
        { opacity: 0.7, y: 0, duration: 0.65 },
        "-=0.35"
      );
    }
    if (heroAccentBar) {
      heroTl.fromTo(
        heroAccentBar,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.4"
      );
    }
  }, []);

  // 2. Coordinated Card and Excerpt Entrance on Load & Category Filter
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current.querySelectorAll(".blog-card");
    const excerpts = containerRef.current.querySelectorAll(".blog-card-excerpt");

    if (cards.length > 0) {
      const cardsTl = gsap.timeline({ defaults: { overwrite: "auto" } });
      cardsTl
        .fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: "power2.out",
          }
        )
        .fromTo(
          excerpts,
          { opacity: 0, y: 8 },
          {
            opacity: 0.7,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }
    ScrollTrigger.refresh();
  }, [active]);

  return (
    <div className="relative pb-32">
      {/* Swiss Archival Hero with Animated Description */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden border-b-2 border-black/5">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="hero-badge flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
                  Latest
                </span>
                <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
                  Knowledge Vault
                </p>
              </div>

              <h1 className="hero-title text-6xl sm:text-[9rem] font-black tracking-[-0.04em] text-black leading-[0.8] uppercase flex flex-col">
                <span>instudia</span>
                <span className="text-white [-webkit-text-stroke:4px_black]" style={{ paintOrder: "stroke fill" }}>
                  blogs.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:mb-4 lg:text-right">
              <p className="hero-description text-sm font-bold text-black leading-tight max-w-sm ml-auto uppercase mb-10 opacity-70">
                Insights to{" "}
                <span className="text-brandpurple underline decoration-2 underline-offset-4">
                  build your career
                </span>
                . Practical guides on tech, design, and regional skills.
              </p>
              <div className="h-[2px] w-full bg-black/10 relative overflow-hidden hidden lg:block">
                <div className="hero-accent-bar absolute inset-0 bg-black w-1/3" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Swiss Category Nav */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex gap-3 sm:gap-4 overflow-x-auto brutalist-scrollbar -webkit-overflow-scrolling-touch">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 text-[10px] font-black uppercase tracking-[0.2em] px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-black min-h-[44px] transition-all duration-200 ${
                cat === active
                  ? "bg-black text-white shadow-[3px_3px_0px_#C21BFF] sm:shadow-[4px_4px_0px_#C21BFF]"
                  : "bg-white text-black hover:bg-neutral-50 shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="mx-auto max-w-6xl px-6">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-6 inline-block">
              [EMPTY_DATABASE]
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Records Not Found.</h2>
            <button
              onClick={() => setActive("All")}
              className="mt-10 border-2 border-black px-10 py-5 bg-white text-xs font-black uppercase tracking-widest shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="space-y-32 py-10 sm:py-20">
            {/* Featured Post Overhaul */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-black text-black uppercase tracking-[0.4em]">
                  {active === "All" ? "FEATURED" : "FEATURED"}
                </span>
                <div className="flex-1 h-1 bg-black/10" />
              </div>
              <SwissBrutalistCard post={featured} index={99} isLarge />
            </section>

            {/* Archive Year Grids */}
            {sortedYears.map((year) => (
              <section key={year} className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                  <div className="md:col-span-8 flex items-baseline gap-6">
                    <h2 className="text-5xl font-black text-black tracking-tighter uppercase leading-none">{year}</h2>
                  </div>
                  <div className="md:col-span-4 h-1 bg-black hidden md:block" />
                </div>

                <div className="archive-year-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                  {groupedByYear[year].map((post, i) => (
                    <SwissBrutalistCard key={post.slug} post={post} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
