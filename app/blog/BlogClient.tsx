"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { type PostSummary, formatDate } from "../data/types";

const categories = ["All", "Career", "Skills", "Finance", "Technology"];
const BRAND_COLORS = ["#C21BFF", "#FFE01B", "#FF1B58", "#58FF1B"];

// --- Swiss Brutalist Card Architecture (Shared with Carousel) ---
function SwissBrutalistCard({ post, index, isLarge = false }: { post: PostSummary; index: number; isLarge?: boolean }) {
  const isHovered = useMotionValue(0);
  const springHover = useSpring(isHovered, { stiffness: 400, damping: 25 });

  const brandColor = BRAND_COLORS[index % BRAND_COLORS.length];
  const shadowValue = isLarge ? "12px 12px 0px" : "8px 8px 0px";
  const hoverShadowValue = isLarge ? "20px 20px 0px" : "16px 16px 0px";

  const shadowOffset = useTransform(springHover, [0, 1], [`${shadowValue} rgba(0,0,0,1)`, `${hoverShadowValue} ${brandColor}`]);
  const translateHover = useTransform(springHover, [0, 1], ["translate(0px, 0px)", "translate(-4px, -4px)"]);

  return (
    <Link href={`/blog/${post.slug}`} prefetch={false} className={`group block h-full ${isLarge ? 'col-span-full' : ''}`}>
      <motion.div
        onMouseEnter={() => isHovered.set(1)}
        onMouseLeave={() => isHovered.set(0)}
        style={{
          boxShadow: shadowOffset,
          transform: translateHover
        }}
        className={`flex flex-col h-full bg-white border-2 border-black transition-colors duration-300 overflow-hidden relative ${isLarge ? 'lg:flex-row' : ''}`}
      >
        {/* Brutalist Image Vault */}
        <div className={`overflow-hidden relative border-black ${isLarge ? 'lg:w-3/5 lg:border-r-2 aspect-[16/9] lg:aspect-auto' : 'aspect-[16/9] border-b-2'}`}>
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute top-0 right-0 z-30">
            <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-b-2 border-white">
              {post.category.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Swiss Typographic Hub */}
        <div className={`flex flex-col flex-1 p-8 sm:p-10 ${isLarge ? 'lg:justify-center' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-[1px] bg-black" />
            <span className="text-[10px] font-bold text-black uppercase tracking-widest">
              {post.readTime}
            </span>
          </div>

          <h3 className={`${isLarge ? 'text-3xl sm:text-5xl' : 'text-xl sm:text-2xl'} font-black text-black leading-[1] tracking-tight uppercase group-hover:text-[#C21BFF] transition-colors line-clamp-3`}>
            {post.title}
          </h3>

          <p className={`mt-6 text-sm text-black font-medium leading-normal opacity-70 line-clamp-3 ${isLarge ? 'text-lg max-w-xl' : ''}`}>
            {post.excerpt}
          </p>

          <div className="mt-10 pt-6 border-t-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 aspect-square border-2 border-black overflow-hidden bg-neutral-100 rounded-full">
                <img src={post.authorPhoto} alt={post.author} width={40} height={40} loading="lazy" className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-black leading-none uppercase">{post.author}</span>
                <span className="text-[9px] font-bold text-black opacity-50 uppercase tracking-tighter">{post.authorRole || "Elite Faculty"}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-black uppercase tracking-[0.1em]">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function BlogClient({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState("All");

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

  return (
    <div className="relative pb-32">
      {/* Swiss Category Nav */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex gap-3 sm:gap-4 overflow-x-auto brutalist-scrollbar -webkit-overflow-scrolling-touch">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 text-[10px] font-black uppercase tracking-[0.2em] px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-black min-h-[44px] transition-all duration-200 ${cat === active
                ? "bg-black text-white shadow-[3px_3px_0px_#C21BFF] sm:shadow-[4px_4px_0px_#C21BFF]"
                : "bg-white text-black hover:bg-neutral-50 shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-6 inline-block">
              [EMPTY_DATABASE]
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Records Not Found.</h2>
            <button onClick={() => setActive("All")} className="mt-10 border-2 border-black px-10 py-5 bg-white text-xs font-black uppercase tracking-widest shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="space-y-32 py-10 sm:py-20">
            {/* Featured Post Overhaul */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-black text-black uppercase tracking-[0.4em]">
                  {active === "All" ? "FEATURED" : `FEATURED`}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
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
