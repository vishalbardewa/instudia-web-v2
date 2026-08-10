"use client";

import React, { useState } from "react";

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
type Tab = "cap" | "api" | "caching" | "quiz" | "latency";

interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const API_DATA = [
  {
    name: "REST",
    transport: "HTTP/1.1 or 2",
    format: "JSON / XML",
    latency: 62,
    throughput: 55,
    complexity: 30,
    bestFor: "Public APIs, CRUD interfaces",
    color: "#4F46E5",
    tag: "Universal",
  },
  {
    name: "gRPC",
    transport: "HTTP/2",
    format: "Protobuf (Binary)",
    latency: 95,
    throughput: 92,
    complexity: 70,
    bestFor: "Internal Microservices, High RPS",
    color: "#059669",
    tag: "High Performance",
  },
  {
    name: "GraphQL",
    transport: "HTTP/1.1 or 2",
    format: "JSON",
    latency: 55,
    throughput: 60,
    complexity: 65,
    bestFor: "Mobile apps, Complex aggregated UI",
    color: "#E11D48",
    tag: "Flexible",
  },
  {
    name: "WebSocket",
    transport: "TCP Upgrade",
    format: "Text / Binary",
    latency: 98,
    throughput: 88,
    complexity: 55,
    bestFor: "Collaboration, Live Tickers",
    color: "#D97706",
    tag: "Real-Time",
  },
];

const CAP_SYSTEMS = [
  {
    name: "PostgreSQL",
    classification: "PC / EC",
    mode: "CP",
    consistency: 95,
    availability: 60,
    desc: "Strong consistency. Rejects writes during partition to protect data integrity.",
    color: "#336791",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "Cassandra",
    classification: "PA / EL",
    mode: "AP",
    consistency: 55,
    availability: 97,
    desc: "Always available. Stays writeable during partitions, reconciles conflicts later.",
    color: "#1287B1",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    name: "DynamoDB",
    classification: "PA / EL",
    mode: "AP",
    consistency: 60,
    availability: 99,
    desc: "Eventual consistency by default. Offers optional strong reads at higher cost.",
    color: "#FF9900",
    tagColor: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Google Spanner",
    classification: "PC / EC",
    mode: "CP",
    consistency: 100,
    availability: 72,
    desc: "External consistency via TrueTime (atomic clocks + GPS). Blocks on Commit Wait.",
    color: "#4285F4",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "etcd / Zookeeper",
    classification: "PC / EC",
    mode: "CP",
    consistency: 98,
    availability: 55,
    desc: "Strict leader-based consensus (Raft/ZAB). Used for distributed config & locking.",
    color: "#326CE5",
    tagColor: "bg-indigo-100 text-indigo-800",
  },
];

const CACHING_PATTERNS = [
  {
    id: "cache-aside",
    name: "Cache-Aside",
    aka: "Lazy Loading",
    steps: [
      "App checks cache for data",
      "Cache MISS → App reads from DB",
      "App writes data into cache",
      "Future reads hit cache",
    ],
    pros: ["Simple to implement", "Cache only what's used", "Resilient to cache failure"],
    cons: ["First request is slow (cold miss)", "Risk of stale reads after DB update", "Thundering herd on cold start"],
    bestFor: "Read-heavy workloads with tolerable stale data",
    color: "#7C3AED",
  },
  {
    id: "write-through",
    name: "Write-Through",
    aka: "Synchronous Write",
    steps: [
      "App writes to cache",
      "Cache SYNCHRONOUSLY writes to DB",
      "Success returned to app",
      "Reads always hit cache",
    ],
    pros: ["No stale data", "Cache always consistent with DB", "Reads are always fast"],
    cons: ["Higher write latency", "Cache churn if data rarely read", "Write amplification"],
    bestFor: "Systems requiring strong read consistency",
    color: "#059669",
  },
  {
    id: "write-behind",
    name: "Write-Behind",
    aka: "Write-Back",
    steps: [
      "App writes to cache",
      "Cache returns success immediately",
      "Cache ASYNCHRONOUSLY batches writes",
      "DB updated in background",
    ],
    pros: ["Ultra-fast write latency", "Reduces DB write load", "Batch efficiency"],
    cons: ["Data loss risk on cache crash", "Complex error handling", "Eventual DB consistency"],
    bestFor: "High-frequency writes where speed > durability",
    color: "#DC2626",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "In the CAP Theorem, what must a system sacrifice during a network partition?",
    options: [
      "Either Consistency or Availability",
      "Either Latency or Throughput",
      "Either Security or Performance",
      "Either Sharding or Replication",
    ],
    answer: 0,
    explanation:
      "CAP states: during a Partition (P), a system must choose between Consistency (returning the latest write or error) and Availability (non-failing nodes always responding). You cannot have both.",
  },
  {
    q: "Which storage engine provides the highest write throughput, commonly used in Cassandra and RocksDB?",
    options: ["B-Tree", "LSM-Tree", "B+ Tree", "Hash Table"],
    answer: 1,
    explanation:
      "LSM-Trees (Log-Structured Merge-Trees) buffer writes in memory (MemTable) and append to disk (SSTable), enabling ultra-high write throughput. B-Trees do in-place updates, causing higher write amplification.",
  },
  {
    q: "In Raft consensus, what is the minimum number of nodes that must acknowledge a log entry before it's committed?",
    options: ["1 (any single node)", "A simple majority ⌊N/2⌋ + 1", "All N nodes", "2/3 of nodes"],
    answer: 1,
    explanation:
      "Raft requires a quorum majority of ⌊N/2⌋ + 1 nodes to acknowledge an entry before the leader commits it. This ensures at least one node in any future quorum will have the committed entry.",
  },
  {
    q: "Which caching pattern has the highest risk of data loss on a cache crash?",
    options: ["Cache-Aside", "Write-Through", "Write-Behind (Write-Back)", "Read-Through"],
    answer: 2,
    explanation:
      "Write-Behind (Write-Back) caches return success to the app immediately, then asynchronously flush to the DB. If the cache crashes before flushing, those writes are permanently lost.",
  },
  {
    q: "What does gRPC use as its wire format that makes it faster than REST?",
    options: [
      "JSON (minified)",
      "XML with compression",
      "Protocol Buffers (Protobuf) over HTTP/2",
      "MessagePack over HTTP/1.1",
    ],
    answer: 2,
    explanation:
      "gRPC uses Protocol Buffers (Protobuf), a binary serialization format, transported over HTTP/2 (which enables multiplexing and header compression). This combination makes it significantly faster and more compact than REST/JSON.",
  },
  {
    q: "What is the primary problem that Consistent Hashing solves over simple modulo hashing?",
    options: [
      "It reduces memory usage per node",
      "It eliminates the need for a load balancer",
      "Adding/removing nodes only remaps adjacent keys, not the entire dataset",
      "It provides stronger encryption for shard keys",
    ],
    answer: 2,
    explanation:
      "Simple modulo hashing (Hash(key) % N) forces a complete data reshuffle when N changes. Consistent Hashing maps nodes and keys to a virtual ring; adding or removing a node only affects the keys between it and its neighbor.",
  },
  {
    q: "In the 45-minute system design interview framework, when should you calculate capacity math (RPS, storage)?",
    options: [
      "Minutes 0-5 (immediately)",
      "Minutes 5-10 (after clarifying scope)",
      "Minutes 15-30 (during architecture)",
      "Minutes 40-45 (wrap-up)",
    ],
    answer: 1,
    explanation:
      "After the 0-5m clarification phase (agreeing on features and SLAs), you move to capacity math (5-10m): computing RPS, 3-year storage growth, and memory bandwidth. This quantitative validation guides all subsequent design decisions.",
  },
];

const LATENCY_DATA = [
  { label: "L1 Cache Read", ns: 0.5, category: "CPU", color: "#7C3AED" },
  { label: "L2 Cache Read", ns: 7, category: "CPU", color: "#9333EA" },
  { label: "RAM Read", ns: 100, category: "Memory", color: "#2563EB" },
  { label: "NVMe SSD Read", ns: 100_000, category: "Storage", color: "#059669" },
  { label: "Disk Seek (HDD)", ns: 10_000_000, category: "Storage", color: "#D97706" },
  { label: "Network (Same DC)", ns: 500_000, category: "Network", color: "#E11D48" },
  { label: "Network (SF → NYC)", ns: 40_000_000, category: "Network", color: "#DC2626" },
];

function formatNs(ns: number): string {
  if (ns < 1000) return `${ns} ns`;
  if (ns < 1_000_000) return `${(ns / 1000).toFixed(1)} µs`;
  if (ns < 1_000_000_000) return `${(ns / 1_000_000).toFixed(1)} ms`;
  return `${(ns / 1_000_000_000).toFixed(2)} s`;
}

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function ProgressBar({ value, color, max = 100 }: { value: number; color: string; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── TAB: CAP Theorem ───────────────────────────────────────
function CAPTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const sys = CAP_SYSTEMS.find((s) => s.name === selected);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Click any database to explore its CAP trade-off. In the presence of a network partition, every system must choose between <strong>Consistency</strong> (all nodes see the same data) and <strong>Availability</strong> (every request gets a response).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {CAP_SYSTEMS.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelected(selected === s.name ? null : s.name)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selected === s.name
                ? "border-black shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-sm uppercase tracking-tight">{s.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${s.tagColor}`}>
                {s.mode}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 font-mono">{s.classification}</span>
          </button>
        ))}
      </div>

      {sys && (
        <div className="p-6 rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_#000] animate-in fade-in duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">{sys.name}</h3>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${sys.tagColor}`}>
                PACELC: {sys.classification}
              </span>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ backgroundColor: sys.color }}
            >
              {sys.mode}
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-5 leading-relaxed">{sys.desc}</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Consistency</span>
                <span>{sys.consistency}%</span>
              </div>
              <ProgressBar value={sys.consistency} color="#4F46E5" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Availability</span>
                <span>{sys.availability}%</span>
              </div>
              <ProgressBar value={sys.availability} color="#059669" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Key Insight: PACELC Extension</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          PACELC extends CAP beyond failure scenarios. Even in normal operation (Else), systems trade <strong>Latency vs Consistency</strong>. DynamoDB achieves low latency via eventual consistency. Spanner sacrifices latency for external consistency via Commit Wait.
        </p>
      </div>
    </div>
  );
}

// ─── TAB: API Comparison ─────────────────────────────────────
function APITab() {
  const [metric, setMetric] = useState<"latency" | "throughput" | "complexity">("latency");
  const metricLabels = { latency: "Latency Score", throughput: "Throughput Score", complexity: "Implementation Complexity" };
  const metricColors: Record<string, string> = { latency: "#059669", throughput: "#4F46E5", complexity: "#DC2626" };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Selecting the right API protocol is a critical architectural decision. Compare the four primary paradigms across key engineering dimensions.
      </p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["latency", "throughput", "complexity"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded transition-all ${
              metric === m ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {metricLabels[m]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {[...API_DATA]
          .sort((a, b) => b[metric] - a[metric])
          .map((api, idx) => (
            <div key={api.name} className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-400 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-black text-gray-300">#{idx + 1}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase">{api.name}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: api.color }}
                    >
                      {api.tag}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500">{api.transport} · {api.format}</span>
                </div>
                <span className="ml-auto text-lg font-black" style={{ color: metricColors[metric] }}>
                  {api[metric]}
                </span>
              </div>
              <ProgressBar value={api[metric]} color={metricColors[metric]} />
              <p className="text-[11px] text-gray-500 mt-2">Best for: {api.bestFor}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

// ─── TAB: Caching Patterns ───────────────────────────────────
function CachingTab() {
  const [active, setActive] = useState("cache-aside");
  const pattern = CACHING_PATTERNS.find((p) => p.id === active)!;

  return (
    <div>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Cache invalidation is one of the hardest problems in computer science. Understanding the trade-offs between these three core patterns is essential for production system design.
      </p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {CACHING_PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded transition-all ${
              active === p.id ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={active === p.id ? { backgroundColor: p.color } : {}}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_#000]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-black text-lg uppercase tracking-tight">{pattern.name}</h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: pattern.color }}>
            {pattern.aka}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-5 italic">Best for: {pattern.bestFor}</p>

        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">How It Works</p>
          <div className="flex flex-col gap-2">
            {pattern.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: pattern.color }}
                >
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <p className="text-[11px] font-black text-green-700 uppercase mb-2">Advantages</p>
            <ul className="space-y-1">
              {pattern.pros.map((p, i) => (
                <li key={i} className="text-xs text-green-800 flex items-start gap-1.5">
                  <span className="text-green-500 font-bold mt-0.5">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-[11px] font-black text-red-700 uppercase mb-2">Trade-offs</p>
            <ul className="space-y-1">
              {pattern.cons.map((c, i) => (
                <li key={i} className="text-xs text-red-800 flex items-start gap-1.5">
                  <span className="text-red-500 font-bold mt-0.5">✗</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: Latency Numbers ────────────────────────────────────
function LatencyTab() {
  const maxLog = Math.log10(40_000_000);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Every senior engineer has these numbers memorized. Latency differences span <strong>8 orders of magnitude</strong> — from sub-nanosecond CPU caches to 40ms cross-country network hops. Understanding these guides every architectural choice.
      </p>
      <div className="space-y-3">
        {LATENCY_DATA.map((item) => {
          const logVal = Math.log10(Math.max(item.ns, 0.1));
          const pct = (logVal / maxLog) * 100;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-32 sm:w-40 flex-shrink-0">
                <p className="text-xs font-bold text-gray-800 leading-tight">{item.label}</p>
                <p
                  className="text-[10px] font-black"
                  style={{ color: item.color }}
                >
                  {formatNs(item.ns)}
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                />
              </div>
              <span className="text-[10px] font-bold w-12 text-right text-gray-500">{item.category}</span>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-gray-400 mt-4 italic">
        * Bar widths are log-scale. A disk seek is literally 20 million times slower than an L1 cache read.
      </p>

      <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
        <p className="text-xs font-black text-indigo-800 uppercase tracking-wide mb-2">Back-of-Envelope Rule</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            ["1 Day", "86,400 sec ≈ 10⁵"],
            ["100M req/day", "≈ 1,200 RPS"],
            ["Peak Traffic", "2x – 5x baseline"],
            ["1M records @ 1KB", "≈ 1 GB storage"],
            ["Network SF→NYC", "≈ 40 ms"],
            ["RAM Read", "≈ 100 ns"],
          ].map(([k, v]) => (
            <div key={k} className="p-2 rounded bg-white border border-indigo-100">
              <p className="text-[10px] font-black text-indigo-600">{k}</p>
              <p className="text-xs font-bold text-indigo-900">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: Knowledge Quiz ─────────────────────────────────────
function QuizTab() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  function handleAnswer(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswered(false);
  }

  if (done) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const grade =
      pct >= 90 ? { label: "Staff Engineer", color: "#7C3AED", msg: "Exceptional. You think at the Staff+ level." }
      : pct >= 70 ? { label: "Senior Engineer", color: "#059669", msg: "Solid grasp. You are ready for senior system design interviews." }
      : pct >= 50 ? { label: "Mid-Level", color: "#D97706", msg: "Good foundation. Review the modules you missed and try again." }
      : { label: "Beginner", color: "#DC2626", msg: "Keep studying! Every expert was once a beginner. Read through the blog again." };

    return (
      <div className="text-center py-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-4"
          style={{ backgroundColor: grade.color }}
        >
          {pct}%
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
          {score}/{QUIZ_QUESTIONS.length} Correct
        </h3>
        <p
          className="text-sm font-bold mb-2"
          style={{ color: grade.color }}
        >
          Level: {grade.label}
        </p>
        <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">{grade.msg}</p>
        <button
          onClick={handleRestart}
          className="px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">
          Question {current + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span className="text-xs font-black text-gray-400">Score: {score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="h-1.5 rounded-full bg-black transition-all duration-500"
          style={{ width: `${((current) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="font-black text-base sm:text-lg text-black mb-6 leading-tight">{q.q}</h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let cls = "border-2 border-gray-200 bg-white text-gray-800 hover:border-gray-400";
          if (answered) {
            if (idx === q.answer) cls = "border-2 border-green-500 bg-green-50 text-green-800";
            else if (idx === selected) cls = "border-2 border-red-400 bg-red-50 text-red-800";
            else cls = "border-2 border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 ${cls} ${!answered ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="font-black mr-2 text-[11px]">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-5">
          <p className="text-xs font-black text-blue-700 uppercase mb-1">
            {selected === q.answer ? "Correct!" : "Not quite —"} Here is why:
          </p>
          <p className="text-xs text-blue-800 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all rounded"
        >
          {current + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Widget
// ────────────────────────────────────────────────────────────
export default function SystemDesignExplorer() {
  const [tab, setTab] = useState<Tab>("cap");

  const tabs: { id: Tab; label: string }[] = [
    { id: "cap", label: "CAP Theorem" },
    { id: "latency", label: "Latency Numbers" },
    { id: "api", label: "API Protocols" },
    { id: "caching", label: "Cache Patterns" },
    { id: "quiz", label: "Test Yourself" },
  ];

  return (
    <div className="my-12 border-2 border-black bg-white shadow-[10px_10px_0px_#C21BFF] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-black p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <h2 className="text-white font-black text-lg sm:text-xl uppercase tracking-tight">
          Interactive System Design Explorer
        </h2>
        <p className="text-white/50 text-xs mt-1">Explore trade-offs, compare protocols, and test your knowledge</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b-2 border-black bg-gray-50">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-4 sm:px-5 py-3 text-[11px] font-black uppercase tracking-widest border-r border-gray-200 transition-all ${
              tab === t.id
                ? "bg-black text-white border-r-black"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-8">
        {tab === "cap" && <CAPTab />}
        {tab === "api" && <APITab />}
        {tab === "caching" && <CachingTab />}
        {tab === "latency" && <LatencyTab />}
        {tab === "quiz" && <QuizTab />}
      </div>
    </div>
  );
}
