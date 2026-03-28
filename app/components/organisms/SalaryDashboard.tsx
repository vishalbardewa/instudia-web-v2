"use client";

import { useState } from "react";
import { SALARY_INSIGHTS } from "@/app/data/salaries";
import Link from "next/link";

export default function SalaryDashboard() {
  const [activeRole, setActiveRole] = useState(SALARY_INSIGHTS[0].id);
  const [isRemote, setIsRemote] = useState(false);

  const selectedData = SALARY_INSIGHTS.find((s) => s.id === activeRole) || SALARY_INSIGHTS[0];
  const currentStats = isRemote ? selectedData.remote : selectedData.local;

  // Max scale to keep progress bars proportional (Global max is around 180k)
  const MAX_SCALE = 180000;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      
      {/* ── Sidebar: Role Selection ── */}
      <div className="lg:w-1/3 flex-shrink-0">
        <div className="sticky top-28 bg-white rounded-3xl border border-neutral-100 p-3 shadow-lg shadow-gray-100/50">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#1B1C1E] mb-4 px-4 pt-3">
            Select a Role
          </h2>
          <div className="flex flex-col gap-1">
            {SALARY_INSIGHTS.map((role) => {
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-brandpurple text-white shadow-md shadow-brandpurple/20 translate-x-1"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1B1C1E]"
                  }`}
                >
                  {role.role}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Panel: Insights ── */}
      <div className="lg:w-2/3 flex flex-col gap-6">
        
        {/* Header & Toggle */}
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 md:p-10 shadow-lg shadow-gray-100/50">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-black text-[#1B1C1E]">{selectedData.role}</h2>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-lg">
                {selectedData.description}
              </p>
            </div>
            
            {/* Location Toggle */}
            <div className="inline-flex bg-gray-100 p-1.5 rounded-xl self-start flex-shrink-0">
              <button
                onClick={() => setIsRemote(false)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  !isRemote ? "bg-white text-[#1B1C1E] shadow-sm" : "text-gray-500 hover:text-[#1B1C1E]"
                }`}
              >
                Local (Nagaland)
              </button>
              <button
                onClick={() => setIsRemote(true)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  isRemote ? "bg-white text-brandpurple shadow-sm" : "text-gray-500 hover:text-[#1B1C1E]"
                }`}
              >
                Remote (National)
              </button>
            </div>
          </div>

          {/* Salary Bars */}
          <div className="space-y-8">
            {/* Minimum */}
            <div className="group">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-extrabold uppercase tracking-wide text-gray-400 group-hover:text-[#1B1C1E] transition-colors">Starting / Fresher</span>
                <span className="text-xl font-black text-[#1B1C1E]">{formatCurrency(currentStats.min)}<span className="text-sm text-gray-400 font-medium">/mo</span></span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(currentStats.min / MAX_SCALE) * 100}%` }}
                />
              </div>
            </div>

            {/* Average */}
            <div className="group">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-extrabold uppercase tracking-wide text-gray-400 group-hover:text-[#1B1C1E] transition-colors">Average / Mid-Level</span>
                <span className="text-2xl font-black text-brandpurple">{formatCurrency(currentStats.avg)}<span className="text-sm text-gray-400 font-medium">/mo</span></span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brandpurple rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(194,27,255,0.4)]"
                  style={{ width: `${(currentStats.avg / MAX_SCALE) * 100}%` }}
                />
              </div>
            </div>

            {/* Maximum */}
            <div className="group">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-extrabold uppercase tracking-wide text-gray-400 group-hover:text-[#1B1C1E] transition-colors">Peak / Senior</span>
                <span className="text-xl font-black text-[#1B1C1E]">{formatCurrency(currentStats.max)}<span className="text-sm text-gray-400 font-medium whitespace-nowrap">/mo or more</span></span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(currentStats.max / MAX_SCALE) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-xs text-gray-400 italic">
              * Estimates are based on market research and industry standards. Actual salaries vary by company, negotiation skills, and individual expertise.
            </p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-[#1B1C1E] rounded-3xl p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandpurple opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#58FF1B] mb-2">
                Take Action
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                Want to earn this target?
              </h3>
              <p className="text-gray-400 text-sm max-w-sm">
                Get job-ready with our practical, project-based {selectedData.courseName} training.
              </p>
            </div>
            
            <Link 
              href={`/courses/${selectedData.courseSlug}`}
              className="flex-shrink-0 w-full md:w-auto text-center px-8 py-4 bg-brandpurple text-white font-extrabold rounded-2xl hover:bg-brandpurple/90 hover:scale-105 transition-all duration-200 shadow-xl shadow-brandpurple/20"
            >
              Explore Course
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
