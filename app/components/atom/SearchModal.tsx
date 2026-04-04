"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  excerpt?: string;
  href: string;
  type: "Blog" | "Course";
  category?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const TYPE_STYLES: Record<string, string> = {
  Blog: "bg-brandpurple/10 text-brandpurple",
  Course: "bg-green-100 text-green-700",
};

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setActiveIndex(0);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  // Keyboard navigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown")
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    if (e.key === "ArrowUp") setActiveIndex((i) => Math.max(i - 1, 0));
    if (e.key === "Enter" && results[activeIndex])
      navigate(results[activeIndex].href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[10vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100">
          {/* Search icon */}
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search courses, blog posts…"
            className="flex-1 bg-transparent text-[#1B1C1E] placeholder-gray-400 text-[15px] outline-none"
          />
          {loading && (
            <svg className="w-4 h-4 text-brandpurple animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          <button
            onClick={onClose}
            className="text-xs text-gray-400 border border-neutral-200 rounded px-1.5 py-0.5 hover:bg-gray-50 transition"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[420px] overflow-y-auto divide-y divide-neutral-50">
            {results.map((r, i) => (
              <li key={r.href}>
                <button
                  onClick={() => navigate(r.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full text-left px-5 py-3.5 flex items-start gap-3 transition-colors ${
                    i === activeIndex ? "bg-brandpurple/5" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Type icon */}
                  <span className="mt-0.5 flex-shrink-0 text-gray-400">
                    {r.type === "Blog" ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#1B1C1E] truncate">{r.title}</p>
                    {r.excerpt && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.excerpt}</p>
                    )}
                  </div>
                  <span className={`flex-shrink-0 self-start mt-0.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_STYLES[r.type]}`}>
                    {r.category ?? r.type}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm font-semibold text-gray-500">No results for "{query}"</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for a course name or topic</p>
          </div>
        )}

        {/* Hint row & Quick Access */}
        {results.length === 0 && query.length < 2 && (
          <>
            <div className="px-5 py-6 border-b border-neutral-50">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Quick Access</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Free Masterclass",
                  "Full Stack", 
                  "DCA", 
                  "Python", 
                  "UI/UX Design", 
                  "Tally", 
                  "ATS Scanner"
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      if (term === "Free Masterclass") {
                        router.push("?modal=masterclass");
                        onClose();
                      } else {
                        setQuery(term);
                        inputRef.current?.focus();
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors shadow-sm ${
                      term === "Free Masterclass"
                        ? "bg-brandpurple text-white hover:bg-brandpurple/90 ring-2 ring-brandpurple/30 animate-pulse"
                        : "text-[#1B1C1E] bg-neutral-100 hover:bg-brandpurple hover:text-white"
                    }`}
                  >
                    {term === "Free Masterclass" ? `🎁 ${term}` : term}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 flex gap-4 text-[11px] text-gray-400 bg-neutral-50/50">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>ESC close</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
