"use client";

import { useState, useMemo } from "react";

interface SeminarDateCalendarProps {
  value: string;
  onChange: (formattedDate: string) => void;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function SeminarDateCalendar({
  value,
  onChange,
}: SeminarDateCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();

  // Allowed selectable years (e.g. current year to +2 years)
  const availableYears = [currentYear, currentYear + 1, currentYear + 2];

  const [viewDate, setViewDate] = useState(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Parse exact selected day/month/year from value to avoid string collision
  const parsedSelection = useMemo(() => {
    if (!value) return null;

    // Pattern 1: Exact date format like "Fri, 21 August 2026" or "21 August 2026"
    // Match day (1-31), month name, and 4-digit year
    const match = value.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthIdx = MONTH_NAMES.findIndex(
        (m) => m.toLowerCase() === match[2].toLowerCase()
      );
      const yr = parseInt(match[3], 10);

      if (monthIdx !== -1 && !isNaN(day) && !isNaN(yr)) {
        return { isExactDay: true, day, month: monthIdx, year: yr };
      }
    }

    return { isExactDay: false };
  }, [value]);

  // Quick preset helper
  const handleQuickPreset = (presetName: string, targetMonthOffset = 1) => {
    const targetDate = new Date(today.getFullYear(), today.getMonth() + targetMonthOffset, 1);
    const monthStr = MONTH_NAMES[targetDate.getMonth()];
    const yearStr = targetDate.getFullYear();
    const formatted = `${presetName} (${monthStr} ${yearStr})`;
    onChange(formatted);
    // Also sync the calendar view to that month/year
    setViewDate(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
  };

  // Month navigation
  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (
      prev.getFullYear() < today.getFullYear() ||
      (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())
    ) {
      return;
    }
    setViewDate(prev);
  };

  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    if (next.getFullYear() > currentYear + 2) return;
    setViewDate(next);
  };

  const handleMonthChange = (newMonth: number) => {
    // If selecting current year and past month, don't allow
    if (year === today.getFullYear() && newMonth < today.getMonth()) {
      return;
    }
    setViewDate(new Date(year, newMonth, 1));
  };

  const handleYearChange = (newYear: number) => {
    let targetMonth = month;
    if (newYear === today.getFullYear() && targetMonth < today.getMonth()) {
      targetMonth = today.getMonth();
    }
    setViewDate(new Date(newYear, targetMonth, 1));
  };

  // Days calculation
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelectDay = (day: number) => {
    const selected = new Date(year, month, day);
    const dayName = selected.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = MONTH_NAMES[month];
    const formatted = `${dayName}, ${day} ${monthName} ${year}`;
    onChange(formatted);
  };

  const isPastMonth =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 sm:p-5 space-y-4">
      {/* Calendar Header with Month & Year Dropdown Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Month Selector Dropdown */}
          <div className="relative">
            <select
              value={month}
              onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
              aria-label="Select Month"
              className="appearance-none font-black text-sm text-[#1B1C1E] bg-white border border-neutral-200 rounded-xl px-3 py-1.5 pr-7 focus:border-brandpurple focus:outline-none cursor-pointer shadow-xs hover:bg-neutral-50 transition-colors"
            >
              {MONTH_NAMES.map((mName, idx) => {
                const isPastInYear =
                  year === today.getFullYear() && idx < today.getMonth();
                return (
                  <option key={mName} value={idx} disabled={isPastInYear}>
                    {mName}
                  </option>
                );
              })}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-neutral-400">
              ▼
            </span>
          </div>

          {/* Year Selector Dropdown */}
          <div className="relative">
            <select
              value={year}
              onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
              aria-label="Select Year"
              className="appearance-none font-mono font-bold text-sm text-[#1B1C1E] bg-white border border-neutral-200 rounded-xl px-3 py-1.5 pr-7 focus:border-brandpurple focus:outline-none cursor-pointer shadow-xs hover:bg-neutral-50 transition-colors"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-neutral-400">
              ▼
            </span>
          </div>
        </div>

        {/* Previous / Next Month Arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isPastMonth}
            className="w-8 h-8 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous Month"
          >
            ←
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            title="Next Month"
          >
            →
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEK_DAYS.map((w) => (
          <div
            key={w}
            className="text-[10px] font-mono font-bold text-neutral-400 uppercase py-1"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Leading empty slots */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 sm:h-9" />
        ))}

        {/* Month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const checkDate = new Date(year, month, dayNum);
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === dayNum;

          const isPastDate =
            checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          // Precise exact day matching to eliminate duplicate selection bug
          const isSelected =
            parsedSelection?.isExactDay &&
            parsedSelection.day === dayNum &&
            parsedSelection.month === month &&
            parsedSelection.year === year;

          return (
            <button
              key={dayNum}
              type="button"
              disabled={isPastDate}
              onClick={() => handleSelectDay(dayNum)}
              className={`h-8 sm:h-9 rounded-xl text-xs font-bold transition-all duration-150 relative flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-brandpurple text-white font-black shadow-md shadow-brandpurple/20 scale-105 z-10 ring-2 ring-brandpurple/20"
                  : isPastDate
                  ? "text-neutral-300 cursor-not-allowed"
                  : isToday
                  ? "bg-white text-[#1B1C1E] border border-brandpurple font-black hover:bg-brandpurple/10"
                  : "bg-white text-[#1B1C1E] border border-neutral-200/60 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              <span>{dayNum}</span>
              {isToday && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-brandpurple absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Month & Flexibility Shortcuts */}
      <div className="pt-2 border-t border-neutral-200/80">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase font-bold text-neutral-400">
            Flexible / Tentative Shortcuts:
          </span>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] font-mono text-neutral-400 hover:text-neutral-700 underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickPreset("Mid of Next Month", 1)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              value.startsWith("Mid of Next Month")
                ? "bg-[#1B1C1E] text-white border-[#1B1C1E]"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-brandpurple hover:text-brandpurple"
            }`}
          >
            Mid of Next Month
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset("Anytime Next Month", 1)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              value.startsWith("Anytime Next Month")
                ? "bg-[#1B1C1E] text-white border-[#1B1C1E]"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-brandpurple hover:text-brandpurple"
            }`}
          >
            Anytime Next Month
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset("Next Quarter Window", 2)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              value.startsWith("Next Quarter Window")
                ? "bg-[#1B1C1E] text-white border-[#1B1C1E]"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-brandpurple hover:text-brandpurple"
            }`}
          >
            Next Quarter
          </button>
        </div>
      </div>

      {/* Selected Date Callout */}
      {value ? (
        <div className="p-2.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-neutral-800">
              Selected: <strong className="text-neutral-950">{value}</strong>
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
            Confirmed
          </span>
        </div>
      ) : (
        <p className="text-[11px] text-neutral-400 italic">
          Click any date above or pick a flexible timeframe shortcut.
        </p>
      )}
    </div>
  );
}
