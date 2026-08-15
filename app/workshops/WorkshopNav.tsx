"use client";

import { useState, useEffect } from "react";

export interface WorkshopNavItem {
  id: string;
  title: string;
  date: string;
  year: string;
}

export interface YearGroup {
  year: string;
  items: WorkshopNavItem[];
}

export default function WorkshopNav({ groups }: { groups: YearGroup[] }) {
  // State for which years are expanded in the accordion (default: 2026 open)
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((g, idx) => {
      initial[g.year] = idx === 0;
    });
    return initial;
  });

  const [activeItemId, setActiveItemId] = useState<string>(
    groups[0]?.items[0]?.id ?? ""
  );

  // Toggle year accordion
  const toggleYear = (year: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  // Scroll to year section
  const handleYearClick = (year: string) => {
    // Ensure accordion is open
    setExpandedYears((prev) => ({ ...prev, [year]: true }));
    const el = document.getElementById(`year-${year}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to individual item
  const handleItemClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observe each workshop item
    groups.forEach((group) => {
      group.items.forEach(({ id, year }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveItemId(id);
              // Auto-expand active year accordion if not open
              setExpandedYears((prev) => ({ ...prev, [year]: true }));
            }
          },
          { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      });
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [groups]);

  return (
    <nav className="hidden xl:flex flex-col gap-2 w-64 flex-shrink-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-400 mb-1 px-3">
        Jump to
      </p>

      <div className="space-y-1.5">
        {groups.map((group) => {
          const isExpanded = !!expandedYears[group.year];
          const hasActiveItem = group.items.some((it) => it.id === activeItemId);

          return (
            <div
              key={group.year}
              className={`rounded-2xl transition-all duration-200 border ${
                hasActiveItem
                  ? "bg-brandpurple/[0.03] border-brandpurple/20"
                  : "bg-white border-neutral-100 hover:border-neutral-200"
              }`}
            >
              {/* Year Accordion Header Button */}
              <button
                onClick={() => handleYearClick(group.year)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-left rounded-2xl group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      hasActiveItem ? "bg-brandpurple" : "bg-gray-300 group-hover:bg-brandpurple"
                    }`}
                  />
                  <span
                    className={`text-sm font-black tracking-tight ${
                      hasActiveItem ? "text-brandpurple" : "text-[#1B1C1E]"
                    }`}
                  >
                    {group.year}
                  </span>
                </div>

                <div
                  onClick={(e) => toggleYear(group.year, e)}
                  className="p-1 text-gray-400 hover:text-[#1B1C1E] transition-transform duration-200 cursor-pointer"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Accordion Body: Individual items with previous styling */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-neutral-100/70">
                  {group.items.map((item) => {
                    const isActive = activeItemId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full group flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-200 ${
                          isActive
                            ? "bg-brandpurple/10 text-brandpurple font-semibold"
                            : "text-gray-400 hover:text-[#1B1C1E] hover:bg-gray-50"
                        }`}
                      >
                        {/* Index dot */}
                        <span
                          className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive
                              ? "bg-brandpurple"
                              : "bg-gray-300 group-hover:bg-gray-400"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
