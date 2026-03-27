"use client";

import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
  date: string;
}

export default function WorkshopNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="hidden xl:flex flex-col gap-1 w-56 flex-shrink-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-400 mb-3 px-3">
        Jump to
      </p>
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`group flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
              isActive
                ? "bg-brandpurple/8 text-brandpurple"
                : "text-gray-400 hover:text-[#1B1C1E] hover:bg-gray-50"
            }`}
          >
            {/* Index dot */}
            <span
              className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                isActive ? "bg-brandpurple" : "bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
            <div className="min-w-0">
              <p
                className={`text-xs font-bold leading-snug truncate transition-colors ${
                  isActive ? "text-brandpurple" : ""
                }`}
              >
                {item.title}
              </p>
              <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate">
                {item.date}
              </p>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
