"use client";

import { useEffect, useState } from "react";
import MatchCard, { Fixture } from "../molecules/MatchCard";
import { motion, AnimatePresence } from "framer-motion";

export default function FifaFixturesWidget() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function fetchFixtures() {
      try {
        const res = await fetch("/api/fixtures");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFixtures(data);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFixtures();
  }, []);

  const today = new Date();
  const dates = [
    new Date(today),
    new Date(today.setDate(today.getDate() + 1)),
    new Date(today.setDate(today.getDate() + 1)), // Now this is +2 from original today
  ];

  // Group fixtures by date
  const groupedFixtures = dates.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    return fixtures.filter(f => f.fixture.date.startsWith(dateStr));
  });

  const tabLabels = ["Today", "Tomorrow", dates[2].toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })];

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto h-48 bg-white/5 backdrop-blur-md rounded-3xl animate-pulse flex items-center justify-center border border-white/10">
        <div className="text-white/50">Loading fixtures...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-lg rounded-3xl p-5 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 blur-2xl -z-10 rounded-full"></div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-xl">🏆</span> FIFA World Cup 2026
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 rounded-full p-1 mb-6 relative">
        {tabLabels.map((label, index) => (
          <button
            key={label}
            onClick={() => setActiveTab(index)}
            className={`flex-1 text-sm py-2 px-4 rounded-full transition-all relative z-10 font-medium ${
              activeTab === index ? "text-black" : "text-slate-300 hover:text-white"
            }`}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-[#FFE01B] rounded-full -z-10 shadow-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {label}
          </button>
        ))}
      </div>

      {/* Fixtures List */}
      <div className="relative min-h-[120px] max-h-[320px] overflow-y-auto pr-2 widget-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 pb-2"
          >
            {groupedFixtures[activeTab].length > 0 ? (
              groupedFixtures[activeTab].map((fixture, idx) => (
                <MatchCard key={fixture.fixture.id || idx} data={fixture} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[120px] text-slate-400">
                <p className="text-sm">No matches scheduled</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
