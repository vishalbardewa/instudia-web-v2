"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type Post, formatDate } from "../data/types";

const categories = ["All", "Career", "Skills", "Finance", "Technology"];

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    return active === "All" ? posts : posts.filter((p) => p.category === active);
  }, [active, posts]);

  // Latest post as featured (the first one since we are now sorted newest first)
  const featured = filtered[0];
  const rest = filtered.slice(1);

  // Group the "rest" posts by year
  const groupedByYear = useMemo(() => {
    const groups: Record<string, Post[]> = {};
    rest.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return groups;
  }, [rest]);

  // Sorted years (descending)
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {/* ── Category filter ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                cat === active
                  ? "bg-brandpurple text-white shadow-md shadow-brandpurple/20"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-5xl px-6 py-24 text-center text-gray-400">
          <p className="text-4xl mb-4">📭</p>
          <p className="font-black text-xl text-[#1B1C1E]">No posts in this category yet</p>
          <p className="mt-2 text-sm">Check back soon — we publish new articles every week.</p>
          <button
            onClick={() => setActive("All")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all"
          >
            View all posts
          </button>
        </div>
      ) : (
        <>
          {/* ── Featured post ──────────────────────────────────── */}
          <section className="mx-auto max-w-5xl px-6 py-14">
            <p className="text-xs font-extrabold tracking-[0.15em] text-gray-400 uppercase mb-6">
              {active === "All" ? "Latest" : `Latest in ${active}`}
            </p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl border border-neutral-100 bg-gray-50 p-6 hover:border-brandpurple/20 hover:shadow-xl transition-all duration-300">
                <div className="overflow-hidden rounded-2xl aspect-[16/9]">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${featured.categoryColor}`}
                  >
                    {featured.category}
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#1B1C1E] leading-tight group-hover:text-brandpurple transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={featured.authorPhoto}
                      alt={featured.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1B1C1E]">{featured.author}</p>
                      <p className="text-[10px] text-gray-400">
                        {formatDate(featured.date)} · {featured.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* ── Grouped Post Grid ─────────────────────────────────── */}
          {sortedYears.length > 0 && (
            <section className="mx-auto max-w-5xl px-6 pb-20 space-y-24">
              {sortedYears.map((year) => (
                <div key={year} className="space-y-8">
                  {/* Architectural Year Marker */}
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black text-[#1B1C1E] tracking-tight">{year}</h2>
                    <div className="h-[2px] flex-1 bg-neutral-100 rounded-full" />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-neutral-300">Archive Archive</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedByYear[year].map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col rounded-3xl border border-neutral-100 bg-white hover:shadow-xl hover:-translate-y-1 hover:border-brandpurple/20 transition-all duration-300 overflow-hidden"
                      >
                        <div className="overflow-hidden aspect-[16/9] bg-gray-100">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col flex-1 p-5">
                          <span
                            className={`self-start text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${post.categoryColor}`}
                          >
                            {post.category}
                          </span>
                          <h3 className="mt-3 text-base font-black text-[#1B1C1E] leading-snug group-hover:text-brandpurple transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-2.5 pt-4 border-t border-neutral-100">
                            <img
                              src={post.authorPhoto}
                              alt={post.author}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#1B1C1E]">{post.author}</p>
                              <p className="text-[10px] text-gray-400">
                                {formatDate(post.date)} · {post.readTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
}
