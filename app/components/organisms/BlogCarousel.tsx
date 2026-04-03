"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { type Post, formatDate } from "../../data/types";
import { Container } from "../atom/Container";

// --- Authoritative Brand Palette ---
const BRAND_COLORS = ["#C21BFF", "#FFE01B", "#FF1B58", "#58FF1B"];

// --- Swiss Brutalist Card Architecture ---
function SwissBrutalistCard({ post, index }: { post: Post; index: number }) {
  const isHovered = useMotionValue(0);
  const springHover = useSpring(isHovered, { stiffness: 400, damping: 25 });

  const brandColor = BRAND_COLORS[index % BRAND_COLORS.length];

  const shadowOffset = useTransform(springHover, [0, 1], ["8px 8px 0px rgba(0,0,0,1)", `16px 16px 0px ${brandColor}`]);
  const translateHover = useTransform(springHover, [0, 1], ["translate(0px, 0px)", "translate(-4px, -4px)"]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 60 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="flex-shrink-0 w-[85vw] sm:w-[480px] snap-start py-12 px-4"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <motion.div
          onMouseEnter={() => isHovered.set(1)}
          onMouseLeave={() => isHovered.set(0)}
          style={{
            boxShadow: shadowOffset,
            transform: translateHover
          }}
          className="flex flex-col h-full bg-white border-2 border-black transition-colors duration-300 overflow-hidden relative"
        >
          {/* Brutalist Image Vault */}
          <div className="overflow-hidden aspect-[16/9] relative border-b-2 border-black">
            <motion.img
              src={post.coverImage}
              alt={post.title}
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
                {String(index + 1).padStart(2, '0')}
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
                <div className="w-10 h-10 border-2 border-black overflow-hidden bg-neutral-100 rounded-full">
                  <img
                    src={post.authorPhoto}
                    alt={post.author}
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
        </motion.div>
      </Link>
    </motion.div>
  );
}

// --- Swiss International Header Architecture ---
const SwissHeader = ({
  showLeftArrow,
  showRightArrow,
  handleScroll
}: {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  handleScroll: (d: "left" | "right") => void
}) => (
  <div className="relative mb-12 sm:mb-20 px-4 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
            Latest
          </span>
          <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
            Knowledge section
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
          className="text-5xl sm:text-7xl lg:text-[10rem] font-black tracking-[-0.04em] text-black leading-[0.8] uppercase flex flex-col"
        >
          <span>instudia</span>
          <span className="text-white [-webkit-text-stroke:4px_black]" style={{ paintOrder: 'stroke fill' }}>Blogs.</span>
        </motion.h2>
      </div>

      <div className="lg:col-span-5 lg:mb-4 lg:text-right flex flex-col items-end gap-10">
        <p className="text-sm font-bold text-black leading-tight max-w-sm ml-auto uppercase opacity-80">
          Degrees show where you have been.<br /> Skills show where you are going.
        </p>

        <div className="flex items-center gap-10 w-full lg:w-auto">
          {/* Desktop Navigation Hub */}
          <div className="hidden lg:flex items-center gap-4">
            <AnimatePresence mode="popLayout">
              {showLeftArrow && (
                <motion.div key="nav-left" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <RigidButton onClick={() => handleScroll("left")} direction="left">
                    <svg className="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RigidButton>
                </motion.div>
              )}
              {showRightArrow && (
                <motion.div key="nav-right" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <RigidButton onClick={() => handleScroll("right")} direction="right">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RigidButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blog" className="flex-1 lg:flex-none inline-flex border-2 border-black px-10 py-5 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_#C21BFF] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
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

// --- Rigid Brutalist Button ---
function RigidButton({ children, onClick, direction }: { children: React.ReactNode; onClick: () => void; direction: string }) {
  return (
    <motion.button
      key={`brutalist-${direction}`}
      whileHover={{ scale: 1.05, x: direction === "left" ? -2 : 2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_#FF1B58] hover:bg-neutral-50 transition-all duration-200"
    >
      {children}
    </motion.button>
  );
}

export default function BlogCarousel({ posts }: { posts: Post[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

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
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScrollCheck);
    return () => scrollRef.current?.removeEventListener("scroll", handleScrollCheck);
  }, []);

  return (
    <section className="relative mt-24 sm:mt-32 lg:mt-40 py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#FAFAFA]">
      {/* Swiss Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <Container className="relative z-10">
        <SwissHeader
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          handleScroll={handleScroll}
        />

        {/* Mobile/Tablet Navigation Row */}
        <div className="flex lg:hidden items-center justify-between mb-12 px-4">
          <div className="flex items-center gap-4">
            <AnimatePresence mode="popLayout">
              {showLeftArrow && (
                <motion.div key="nav-left-mobile" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <RigidButton onClick={() => handleScroll("left")} direction="left">
                    <svg className="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RigidButton>
                </motion.div>
              )}
              {showRightArrow && (
                <motion.div key="nav-right-mobile" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <RigidButton onClick={() => handleScroll("right")} direction="right">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RigidButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="h-[2px] flex-1 mx-8 bg-black/10 relative overflow-hidden">
            <motion.div style={{ scaleX, originX: 0 }} className="absolute inset-0 bg-black" />
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
            <motion.div
              style={{ scaleX, originX: 0 }}
              className="absolute inset-0 bg-black"
            />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-black uppercase tracking-[0.5em]">
              Index / Records
            </span>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-2 h-2 border-[1px] border-black ${i === 1 ? 'bg-black' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
