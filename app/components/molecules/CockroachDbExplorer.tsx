"use client";

import React, { useState, useEffect } from "react";

// Types
type Tab = "raft" | "hlc" | "kv" | "physics" | "quiz";

interface NodeState {
  id: number;
  name: string;
  zone: string;
  alive: boolean;
}

interface RangeState {
  id: number;
  name: string;
  keyRange: string;
  sizeMb: number;
  leaderNodeId: number;
  replicas: number[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const INITIAL_NODES: NodeState[] = [
  { id: 1, name: "Node 1", zone: "us-east-1a", alive: true },
  { id: 2, name: "Node 2", zone: "us-east-1b", alive: true },
  { id: 3, name: "Node 3", zone: "us-east-1c", alive: true },
];

const INITIAL_RANGES: RangeState[] = [
  {
    id: 1,
    name: "Range 1 (users)",
    keyRange: "/Table/51/users/000..500",
    sizeMb: 384,
    leaderNodeId: 1,
    replicas: [1, 2, 3],
  },
  {
    id: 2,
    name: "Range 2 (orders)",
    keyRange: "/Table/52/orders/000..500",
    sizeMb: 420,
    leaderNodeId: 2,
    replicas: [1, 2, 3],
  },
  {
    id: 3,
    name: "Range 3 (ledger)",
    keyRange: "/Table/53/ledger/000..500",
    sizeMb: 256,
    leaderNodeId: 3,
    replicas: [1, 2, 3],
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Why can't commodity cloud databases use Google Spanner's commit-wait method with standard NTP?",
    options: [
      "NTP clock drift is typically 100ms-500ms, making mandatory commit wait unacceptably slow for every write",
      "NTP protocol cannot run inside Linux virtual machines",
      "Cloud hypervisors completely disable system clocks for tenant isolation",
      "Commit wait only works with relational joins, not key-value lookups",
    ],
    answer: 0,
    explanation:
      "Spanner waits out the clock uncertainty window on every commit. With atomic clocks and GPS, that window is small (e.g., 7ms). Without atomic hardware, NTP drift can be 200ms-500ms, which would cripple transaction throughput if every write had to wait.",
  },
  {
    question: "In a 3-node CockroachDB cluster, what happens if Node 2 suddenly loses power?",
    options: [
      "The entire database goes into read-only mode until an operator intervenes",
      "Surviving nodes form a 2-out-of-3 quorum, automatically elect new leaders for affected ranges, and continue serving reads and writes",
      "A split-brain condition corrupts recent records across remaining nodes",
      "Transactions abort permanently because Raft requires unanimous consent",
    ],
    answer: 1,
    explanation:
      "Raft consensus only requires a majority quorum (2 of 3 nodes). Node 1 and Node 3 detect missed heartbeats, elect replacement leaders in sub-second time, and continue processing transactions without data loss or human intervention.",
  },
  {
    question: "What triggers a range split in CockroachDB?",
    options: [
      "A database administrator executing an ALTER TABLE SHARD command",
      "A cron job running nightly database defragmentation",
      "A range automatically swelling beyond its target threshold (approximately 512 MB)",
      "When a table exceeds 1,000,000 rows regardless of byte size",
    ],
    answer: 2,
    explanation:
      "CockroachDB automatically and transparently splits contiguous ranges once they cross the default 512 MB boundary. The split is performed in the background as an internal transaction without locking the table.",
  },
  {
    question: "How does a Hybrid Logical Clock (HLC) guarantee causality without specialized hardware clocks?",
    options: [
      "It queries an external centralized timestamp server for every SQL query",
      "It pairs physical time with a logical tick; when a node receives a message with a higher timestamp, it ratchets its clock forward",
      "It forces all servers to halt thread execution until clocks align",
      "It rounds every timestamp to the nearest hour to avoid discrepancy",
    ],
    answer: 1,
    explanation:
      "An HLC timestamp combines physical crystal time and an incrementing logical counter (P, L). When nodes exchange Raft messages, receiving nodes ratchet their logical clock past the sender's timestamp if needed, ensuring cause strictly precedes effect.",
  },
  {
    question: "What is the primary trade-off of running CockroachDB compared to a local PostgreSQL instance?",
    options: [
      "CockroachDB cannot execute SQL queries or connect to standard ORMs",
      "CockroachDB single-query write latencies are higher due to network round-trips for Raft consensus across nodes",
      "CockroachDB does not support ACID transactions",
      "CockroachDB requires application-level manual sharding across tables",
    ],
    answer: 1,
    explanation:
      "PostgreSQL on NVMe writes locally in sub-millisecond time. CockroachDB must send network packets to reach a Raft quorum across nodes or regions, incurring the 'Physics Tax' of network round-trips in exchange for high availability and zero data loss.",
  },
];

export default function CockroachDbExplorer() {
  const [tab, setTab] = useState<Tab>("raft");

  const tabs: { id: Tab; label: string }[] = [
    { id: "raft", label: "Multi-Raft & Failover" },
    { id: "hlc", label: "Time: TrueTime vs HLC" },
    { id: "kv", label: "SQL to Pebble KV" },
    { id: "physics", label: "The Physics Tax" },
    { id: "quiz", label: "Knowledge Check" },
  ];

  return (
    <div className="my-16 border-2 border-black bg-white shadow-[10px_10px_0px_#FFE01B] overflow-hidden">
      {/* Neo-Brutalist Header */}
      <div className="bg-black text-white p-6 border-b-2 border-black">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE01B]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFE01B]">
                Interactive Architecture Lab
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white m-0">
              CockroachDB Distributed Systems Simulator
            </h3>
            <p className="text-xs text-white/70 mt-1 max-w-2xl font-medium">
              Interact with Multi-Raft failover, simulate clock drift without atomic clocks, inspect SQL-to-KV compilation, and calculate the consensus physics tax.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="border border-white/30 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest bg-white/10">
              Zero Emojis
            </span>
            <span className="border border-[#FFE01B] text-[#FFE01B] text-[10px] font-black px-2.5 py-1 uppercase tracking-widest bg-[#FFE01B]/10">
              Live Simulation
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto border-b-2 border-black bg-neutral-100">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-5 py-3.5 text-xs font-black uppercase tracking-wider border-r-2 border-black transition-all ${
              tab === t.id
                ? "bg-[#FFE01B] text-black shadow-[inset_0_-3px_0_#000]"
                : "bg-white text-neutral-600 hover:text-black hover:bg-neutral-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8">
        {tab === "raft" && <RaftChaosTab />}
        {tab === "hlc" && <HlcSimulatorTab />}
        {tab === "kv" && <SqlToKvTab />}
        {tab === "physics" && <PhysicsTaxTab />}
        {tab === "quiz" && <QuizTab />}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TAB 1: Multi-Raft & Chaos Failover
// ────────────────────────────────────────────────────────────
function RaftChaosTab() {
  const [nodes, setNodes] = useState<NodeState[]>(INITIAL_NODES);
  const [ranges, setRanges] = useState<RangeState[]>(INITIAL_RANGES);
  const [logs, setLogs] = useState<string[]>([
    "Cluster initialized: 3 nodes online across 3 availability zones.",
    "Raft consensus healthy: 3 ranges replicated with 2/3 quorum active.",
  ]);
  const [splitEvent, setSplitEvent] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState<"cockroach" | "postgres">("cockroach");

  const aliveCount = nodes.filter((n) => n.alive).length;
  const hasQuorum = aliveCount >= 2;

  const toggleNode = (nodeId: number) => {
    setNodes((prevNodes) => {
      const nextNodes = prevNodes.map((n) => (n.id === nodeId ? { ...n, alive: !n.alive } : n));
      const target = nextNodes.find((n) => n.id === nodeId);
      const isNowDead = !target?.alive;

      if (isNowDead) {
        addLog(`CRITICAL: ${target?.name} (${target?.zone}) went offline! Heartbeats missed.`);

        // Re-elect leaders if the dead node held any
        setRanges((prevRanges) =>
          prevRanges.map((r) => {
            if (r.leaderNodeId === nodeId) {
              const remainingAlive = r.replicas.filter((repId) => {
                const nodeState = nextNodes.find((n) => n.id === repId);
                return nodeState && nodeState.alive;
              });

              if (remainingAlive.length >= 2) {
                const newLeader = remainingAlive[0];
                addLog(
                  `Raft Range #${r.id} (${r.name}): Lost leader Node ${nodeId}. Majority quorum (${remainingAlive.length}/3) elected Node ${newLeader} in 190ms.`
                );
                return { ...r, leaderNodeId: newLeader };
              } else {
                addLog(
                  `Raft Range #${r.id}: Quorum lost (${remainingAlive.length}/3 replicas available). Writes paused to protect against split-brain.`
                );
                return { ...r, leaderNodeId: -1 };
              }
            }
            return r;
          })
        );
      } else {
        addLog(`RECOVERY: ${target?.name} rejoined cluster. Synchronizing Raft logs from peers.`);
      }

      return nextNodes;
    });
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const resetCluster = () => {
    setNodes(INITIAL_NODES);
    setRanges(INITIAL_RANGES);
    setSplitEvent(null);
    setLogs(["Cluster reset: All 3 nodes online and healthy.", "All Raft leaders stabilized."]);
  };

  const triggerRangeSplit = (rangeId: number) => {
    setRanges((prevRanges) =>
      prevRanges.map((r) => {
        if (r.id === rangeId) {
          const newSize = r.sizeMb + 128;
          if (newSize >= 512) {
            setSplitEvent(
              `Range #${r.id} (${r.name}) crossed 512 MB threshold! Automatic split triggered into two 256 MB ranges: [000..250] and [251..500]. Zero downtime.`
            );
            addLog(`AUTOSPLIT: Range #${r.id} hit 512 MB. Engine executed split without table lock.`);
            return { ...r, sizeMb: 256, keyRange: `${r.keyRange.split("/")[1] || "key"}/000..250` };
          } else {
            addLog(`DATA WRITE: Added 128 MB to Range #${r.id}. Current size: ${newSize} MB.`);
            return { ...r, sizeMb: newSize };
          }
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Intro strip */}
      <div className="p-4 border-2 border-black bg-neutral-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white mr-2">
            Multi-Raft Architecture
          </span>
          <span className="text-sm font-bold text-black">
            Status:{" "}
            {hasQuorum ? (
              <span className="text-green-700 font-black">
                Quorum Active ({aliveCount}/3 Nodes) — Writes Available
              </span>
            ) : (
              <span className="text-red-700 font-black">
                Quorum Lost ({aliveCount}/3 Nodes) — Writes Halted (No Split-Brain)
              </span>
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetCluster}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-wider bg-white border-2 border-black hover:bg-neutral-200 transition-colors"
          >
            Reset Cluster
          </button>
        </div>
      </div>

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nodes.map((node) => {
          const rangesLed = ranges.filter((r) => r.leaderNodeId === node.id);
          const rangesHosted = ranges.filter((r) => r.replicas.includes(node.id));

          return (
            <div
              key={node.id}
              className={`border-2 border-black p-5 transition-all ${
                node.alive
                  ? "bg-white shadow-[6px_6px_0px_#000]"
                  : "bg-neutral-200 opacity-60 border-dashed shadow-none"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <div>
                  <h4 className="text-base font-black uppercase tracking-tight text-black m-0">{node.name}</h4>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">{node.zone}</p>
                </div>
                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 border border-black ${
                    node.alive ? "bg-green-300 text-black" : "bg-red-400 text-white"
                  }`}
                >
                  {node.alive ? "Online" : "Offline"}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                    Raft Leadership
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {node.alive && rangesLed.length > 0 ? (
                      rangesLed.map((r) => (
                        <span
                          key={r.id}
                          className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FFE01B] border border-black"
                        >
                          Leader: {r.name.split(" ")[0]} #{r.id}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400 italic">None (Follower replica only)</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                    Stored Replicas
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rangesHosted.map((r) => (
                      <span
                        key={r.id}
                        className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700"
                      >
                        Range #{r.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleNode(node.id)}
                className={`w-full py-2 px-3 text-xs font-black uppercase tracking-wider border-2 border-black transition-all ${
                  node.alive
                    ? "bg-red-100 hover:bg-red-500 hover:text-white"
                    : "bg-green-100 hover:bg-green-500 hover:text-white"
                }`}
              >
                {node.alive ? "Crash Node (Simulate 3 AM Outage)" : "Revive Node"}
              </button>
            </div>
          );
        })}
      </div>

      {/* 512 MB Ranges List */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#FFE01B]">
        <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight text-black m-0">
              512 MB Micro-Shards (CockroachDB Ranges)
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              Each range is an isolated Raft consensus group. Writes require 2 out of 3 replica acknowledgments.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">
            Total: {ranges.length} Ranges
          </span>
        </div>

        {splitEvent && (
          <div className="mb-4 p-3 bg-purple-50 border-2 border-[#C21BFF] text-xs font-bold text-[#C21BFF]">
            {splitEvent}
          </div>
        )}

        <div className="space-y-4">
          {ranges.map((r) => {
            const leaderNode = nodes.find((n) => n.id === r.leaderNodeId);
            const isQuorumSafe = r.leaderNodeId !== -1;
            const pct = Math.min(100, Math.round((r.sizeMb / 512) * 100));

            return (
              <div key={r.id} className="p-4 border-2 border-black bg-neutral-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-black">{r.name}</span>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 border border-black text-neutral-600">
                      {r.keyRange}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-700">
                    <span>
                      Raft Leader:{" "}
                      {isQuorumSafe ? (
                        <strong className="text-black font-black">
                          {leaderNode?.name} ({leaderNode?.zone})
                        </strong>
                      ) : (
                        <strong className="text-red-600 font-black">Election Halted (No Quorum)</strong>
                      )}
                    </span>
                    <span>
                      Replicas: <strong className="text-black font-black">3 (Quorum = 2)</strong>
                    </span>
                  </div>
                </div>

                {/* Progress bar and Split button */}
                <div className="flex items-center gap-4">
                  <div className="w-40 sm:w-48">
                    <div className="flex justify-between text-[10px] font-black uppercase text-neutral-500 mb-1">
                      <span>{r.sizeMb} MB / 512 MB</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-3 border border-black bg-white overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          r.sizeMb >= 400 ? "bg-red-400" : "bg-[#FFE01B]"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => triggerRangeSplit(r.id)}
                    className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-white hover:bg-black hover:text-white border-2 border-black transition-colors"
                  >
                    +128 MB Write
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cluster Event Stream */}
      <div className="border-2 border-black bg-black text-green-400 p-4 font-mono text-xs shadow-[4px_4px_0px_#000]">
        <div className="flex items-center justify-between pb-2 border-b border-white/20 mb-3">
          <span className="text-white text-[10px] font-black uppercase tracking-widest">
            Raft Consensus Event Log
          </span>
          <span className="text-[10px] text-white/50 uppercase">Sub-second state transitions</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-white/40">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-green-300">{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison: 3 AM Failover Dilemma */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#C21BFF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-2 border-black pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C21BFF] bg-[#C21BFF]/10 px-2 py-0.5 border border-[#C21BFF]">
              The 3:14 AM Comparison
            </span>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-black m-0 mt-1">
              What Happens When the Primary Node Dies?
            </h4>
          </div>

          <div className="flex border-2 border-black bg-neutral-100">
            <button
              onClick={() => setCompareMode("cockroach")}
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${
                compareMode === "cockroach" ? "bg-black text-white" : "text-black hover:bg-white"
              }`}
            >
              CockroachDB Multi-Raft
            </button>
            <button
              onClick={() => setCompareMode("postgres")}
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${
                compareMode === "postgres" ? "bg-black text-white" : "text-black hover:bg-white"
              }`}
            >
              Traditional PostgreSQL
            </button>
          </div>
        </div>

        {compareMode === "cockroach" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border-2 border-green-300">
              <p className="text-[10px] font-black uppercase text-green-800 tracking-wider mb-1">Detection</p>
              <p className="text-xs font-bold text-green-950">Heartbeat Timeout (&lt; 200ms)</p>
              <p className="text-[11px] text-green-800 mt-2">
                Surviving replicas in the affected range independently notice the missing leader heartbeat. No human or external daemon required.
              </p>
            </div>
            <div className="p-4 bg-green-50 border-2 border-green-300">
              <p className="text-[10px] font-black uppercase text-green-800 tracking-wider mb-1">Consensus</p>
              <p className="text-xs font-bold text-green-950">Sub-second Election</p>
              <p className="text-[11px] text-green-800 mt-2">
                Replicas run an instant Raft leader election. Quorum (2 of 3) accepts the winner. Writes resume in under 2 seconds.
              </p>
            </div>
            <div className="p-4 bg-green-50 border-2 border-green-300">
              <p className="text-[10px] font-black uppercase text-green-800 tracking-wider mb-1">Data Safety</p>
              <p className="text-xs font-bold text-green-950">Zero Lost Transactions</p>
              <p className="text-[11px] text-green-800 mt-2">
                Writes were synchronously committed to disk on a quorum before client acknowledgment. Zero data loss, zero split-brain risk.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border-2 border-red-300">
              <p className="text-[10px] font-black uppercase text-red-800 tracking-wider mb-1">Incident</p>
              <p className="text-xs font-bold text-red-950">Primary Disappears</p>
              <p className="text-[11px] text-red-800 mt-2">
                At 3:14 AM, the primary instance crashes or is network-partitioned. Replicas cannot accept writes. The app throws 500 errors.
              </p>
            </div>
            <div className="p-4 bg-red-50 border-2 border-red-300">
              <p className="text-[10px] font-black uppercase text-red-800 tracking-wider mb-1">Dilemma</p>
              <p className="text-xs font-bold text-red-950">Manual Promotion Panic</p>
              <p className="text-[11px] text-red-800 mt-2">
                On-call engineer must decide: Promote the standby? If the old primary re-appears, a split-brain will silently corrupt ledger tables.
              </p>
            </div>
            <div className="p-4 bg-red-50 border-2 border-red-300">
              <p className="text-[10px] font-black uppercase text-red-800 tracking-wider mb-1">Lag Tax</p>
              <p className="text-xs font-bold text-red-950">Async Replication Lag Loss</p>
              <p className="text-[11px] text-red-800 mt-2">
                If replication had a 40ms asynchronous lag, whatever writes sat in that window are permanently lost to the void.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TAB 2: Time, TrueTime, & Hybrid Logical Clocks
// ────────────────────────────────────────────────────────────
function HlcSimulatorTab() {
  const [driftMs, setDriftMs] = useState<number>(80);
  const [engine, setEngine] = useState<"ntp" | "spanner" | "hlc">("hlc");
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [transactionLog, setTransactionLog] = useState<string[]>([]);

  // Node times
  const baseTime = 1727854000000;
  const nodeAPhysical = baseTime;
  const nodeBPhysical = baseTime - driftMs;

  const runSimulation = () => {
    if (engine === "ntp") {
      setTransactionLog([
        `Node A: Transaction 1 (Alice debits $100) recorded at physical clock ${nodeAPhysical}ms.`,
        `Node B: Transaction 2 (Bob withdraws balance) recorded at physical clock ${nodeBPhysical}ms.`,
        `PARADOX DETECTED: Node B timestamp is ${driftMs}ms EARLIER than Node A! Causality violated. Bob withdrew money before Alice sent it.`,
      ]);
    } else if (engine === "spanner") {
      const waitTime = driftMs > 0 ? driftMs : 10;
      setTransactionLog([
        `Node A: Transaction 1 recorded with TrueTime window [${nodeAPhysical - 7}, ${nodeAPhysical + 7}].`,
        `COMMIT WAIT ACTIVE: Spanner intentionally pauses write acknowledgment for ${waitTime}ms for uncertainty window to pass...`,
        `Success: Transaction committed with guaranteed absolute global ordering. (Cost: Mandatory ${waitTime}ms write delay).`,
      ]);
    } else {
      setIsRestarting(true);
      setTimeout(() => setIsRestarting(false), 900);

      const logicalCountA = 0;
      const logicalCountB = 1;
      const hlcTimeB = Math.max(nodeBPhysical, nodeAPhysical);

      setTransactionLog([
        `Node A: Transaction 1 emitted with HLC (Physical: ${nodeAPhysical}ms, Logical: ${logicalCountA}).`,
        `Node B: Receives Raft message from Node A. Its local physical clock is ${nodeBPhysical}ms (behind by ${driftMs}ms).`,
        `HLC RATCHET: Node B advances logical clock forward -> HLC_B = (Physical: ${hlcTimeB}ms, Logical: ${logicalCountB}).`,
        `RESULT: Causality guaranteed mathematically without waiting. Commit wait = 0ms! Immediate return.`,
      ]);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [driftMs, engine]);

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="p-4 border-2 border-black bg-neutral-50">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white mr-2">
          The Time Problem
        </span>
        <span className="text-sm font-bold text-black">
          Deciding what happened first across servers whose quartz crystals drift.
        </span>
      </div>

      {/* Engine Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            id: "ntp",
            title: "Standard NTP Clocks",
            subtitle: "Uncoordinated Physical Quartz",
            desc: "Nodes rely on periodic internet time sync. Drift easily causes causality violations.",
            color: "border-black bg-white hover:bg-neutral-50",
            activeColor: "bg-red-50 border-red-500 shadow-[4px_4px_0px_#EF4444]",
          },
          {
            id: "spanner",
            title: "Google Spanner (TrueTime)",
            subtitle: "GPS + Atomic Clocks + Commit Wait",
            desc: "Measures uncertainty bounds. Intentionally pauses commits until uncertainty expires.",
            color: "border-black bg-white hover:bg-neutral-50",
            activeColor: "bg-blue-50 border-blue-500 shadow-[4px_4px_0px_#3B82F6]",
          },
          {
            id: "hlc",
            title: "CockroachDB (HLC)",
            subtitle: "Hybrid Logical Clocks in Software",
            desc: "Combines physical time with logical ticks. Zero commit wait. Automatic transaction restarts.",
            color: "border-black bg-white hover:bg-neutral-50",
            activeColor: "bg-purple-50 border-[#C21BFF] shadow-[4px_4px_0px_#C21BFF]",
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setEngine(item.id as any)}
            className={`p-5 text-left border-2 transition-all ${
              engine === item.id ? item.activeColor : item.color
            }`}
          >
            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">{item.subtitle}</p>
            <h4 className="text-sm font-black uppercase tracking-tight text-black mt-1 m-0">{item.title}</h4>
            <p className="text-xs text-neutral-600 mt-2">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Drift Controller Slider */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#FFE01B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight text-black m-0">
              Simulate Quartz Crystal Drift Between Node A & Node B
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              Heat and voltage cause physical clock oscillators to diverge by tens or hundreds of milliseconds.
            </p>
          </div>
          <span className="text-sm font-mono font-black bg-black text-[#FFE01B] px-3 py-1 border border-black">
            Drift: {driftMs > 0 ? `+${driftMs}` : driftMs} ms
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="300"
          step="10"
          value={driftMs}
          onChange={(e) => setDriftMs(Number(e.target.value))}
          className="w-full accent-black h-3 bg-neutral-200 border border-black cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 border-2 border-black bg-neutral-50">
            <span className="text-[10px] font-black uppercase text-neutral-500">Node A (US-East) Clock</span>
            <p className="text-base font-mono font-black text-black mt-1">11:59:59.{String(nodeAPhysical).slice(-3)}</p>
            <p className="text-[11px] text-neutral-600">Origin of Transaction 1 (Alice debit)</p>
          </div>
          <div className="p-4 border-2 border-black bg-neutral-50">
            <span className="text-[10px] font-black uppercase text-neutral-500">Node B (US-West) Clock</span>
            <p className="text-base font-mono font-black text-black mt-1">11:59:58.{String(nodeBPhysical).slice(-3)}</p>
            <p className="text-[11px] text-neutral-600">
              Drifting behind by {driftMs} ms
            </p>
          </div>
        </div>
      </div>

      {/* Live Transaction Walkthrough Box */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#000]">
        <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
          <h4 className="text-sm font-black uppercase tracking-tight text-black m-0">
            Transaction Execution Output
          </h4>
          {isRestarting && (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#C21BFF] text-white animate-pulse">
              HLC Ratchet / Restart Check
            </span>
          )}
        </div>

        <div className="space-y-3 font-mono text-xs">
          {transactionLog.map((line, idx) => (
            <div
              key={idx}
              className={`p-3 border ${
                line.includes("PARADOX")
                  ? "bg-red-50 border-red-400 text-red-900 font-bold"
                  : line.includes("COMMIT WAIT")
                  ? "bg-blue-50 border-blue-400 text-blue-900 font-bold"
                  : line.includes("RESULT") || line.includes("HLC RATCHET")
                  ? "bg-purple-50 border-purple-400 text-purple-900 font-bold"
                  : "bg-neutral-50 border-neutral-300 text-neutral-800"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TAB 3: SQL to Pebble Key-Value Visualizer
// ────────────────────────────────────────────────────────────
function SqlToKvTab() {
  const [selectedQuery, setSelectedQuery] = useState<number>(0);

  const queries = [
    {
      label: "Insert Row",
      sql: "INSERT INTO accounts (id, name, balance) VALUES (42, 'Alice', 2500);",
      tableId: 51,
      indexId: 1,
      key: "/Table/51/Index/1/Row/42",
      mvccTimestamp: "@1727854200.000000000",
      value: '{"name": "Alice", "balance": 2500}',
      rangeTarget: "Range 1 (users/accounts keys 0..500)",
      raftLeader: "Node 1 (us-east-1a)",
      explanation:
        "Tables do not exist in the underlying storage engine. The SQL engine serializes the table row into a globally ordered key-value entry stored inside Pebble (an LSM-Tree written in Go).",
    },
    {
      label: "Point Select",
      sql: "SELECT balance FROM accounts WHERE id = 42;",
      tableId: 51,
      indexId: 1,
      key: "/Table/51/Index/1/Row/42",
      mvccTimestamp: "@1727854200.000000000 (read snapshot)",
      value: "Decoded column 'balance' -> 2500",
      rangeTarget: "Range 1 (users/accounts keys 0..500)",
      raftLeader: "Node 1 (Leaseholder read)",
      explanation:
        "The SQL query is compiled into a single point get against Pebble: key /Table/51/Index/1/Row/42. Reads can be served directly by the Range's Leaseholder without waiting for a Raft consensus roundtrip.",
    },
    {
      label: "Update with MVCC",
      sql: "UPDATE accounts SET balance = 2400 WHERE id = 42;",
      tableId: 51,
      indexId: 1,
      key: "/Table/51/Index/1/Row/42",
      mvccTimestamp: "@1727854210.000000001 (new version)",
      value: '{"name": "Alice", "balance": 2400}',
      rangeTarget: "Range 1 (users/accounts keys 0..500)",
      raftLeader: "Node 1 (us-east-1a)",
      explanation:
        "PostgreSQL and CockroachDB never overwrite data in place. CockroachDB appends a new key-value version with a higher HLC timestamp. Old transactions can still read the previous snapshot without blocking.",
    },
    {
      label: "Secondary Index Insert",
      sql: "CREATE INDEX idx_balance ON accounts (balance);",
      tableId: 51,
      indexId: 2,
      key: "/Table/51/Index/2/balance/2500/Row/42",
      mvccTimestamp: "@1727854200.000000000",
      value: "NULL (primary key is embedded in key)",
      rangeTarget: "Range 2 (balances keys 0..5000)",
      raftLeader: "Node 2 (us-east-1b)",
      explanation:
        "Secondary indexes are also key-value pairs! The indexed value is placed directly into the key itself, while the row primary key is appended to ensure uniqueness.",
    },
  ];

  const current = queries[selectedQuery];

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="p-4 border-2 border-black bg-neutral-50">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white mr-2">
          The Disappearing Table
        </span>
        <span className="text-sm font-bold text-black">
          How CockroachDB turns relational SQL tables into a single monolithic, sorted key-value map.
        </span>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {queries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedQuery(idx)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black transition-all ${
              selectedQuery === idx
                ? "bg-black text-white shadow-[4px_4px_0px_#FFE01B]"
                : "bg-white text-black hover:bg-neutral-100"
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* SQL Input Box */}
      <div className="border-2 border-black bg-neutral-900 text-white p-5 shadow-[6px_6px_0px_#000]">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-700 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FFE01B]">
            Client SQL Layer (PostgreSQL Wire Protocol)
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">Port 5432</span>
        </div>
        <pre className="font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{current.sql}</pre>
      </div>

      {/* Key-Value Translation Visualization */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#C21BFF]">
        <div className="pb-3 border-b-2 border-black mb-6">
          <h4 className="text-sm font-black uppercase tracking-tight text-black m-0">
            Translated Pebble Key-Value Encoding
          </h4>
          <p className="text-xs text-neutral-600 mt-1">{current.explanation}</p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 border-2 border-black bg-neutral-50">
            <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
              Globally Sorted Key Structure
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-sm">
              <span className="bg-purple-200 text-purple-900 px-2 py-0.5 font-bold border border-purple-400">
                Table #{current.tableId}
              </span>
              <span className="text-neutral-400">/</span>
              <span className="bg-blue-200 text-blue-900 px-2 py-0.5 font-bold border border-blue-400">
                Index #{current.indexId}
              </span>
              <span className="text-neutral-400">/</span>
              <span className="bg-yellow-200 text-yellow-900 px-2 py-0.5 font-bold border border-yellow-400">
                RowKey: 42
              </span>
              <span className="text-neutral-400">/</span>
              <span className="bg-neutral-200 text-neutral-900 px-2 py-0.5 font-bold border border-neutral-400">
                {current.mvccTimestamp}
              </span>
            </div>
          </div>

          <div className="p-4 border-2 border-black bg-neutral-50">
            <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">Stored Value Payload</span>
            <div className="text-sm font-bold text-black bg-white p-2 border border-black inline-block">
              {current.value}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 border border-black bg-white">
              <span className="text-[10px] font-black uppercase text-neutral-500 block">Routing: Target 512 MB Range</span>
              <span className="text-xs font-bold text-black">{current.rangeTarget}</span>
            </div>
            <div className="p-3 border border-black bg-white">
              <span className="text-[10px] font-black uppercase text-neutral-500 block">Consensus: Serving Node</span>
              <span className="text-xs font-bold text-black">{current.raftLeader}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TAB 4: The Physics Tax Calculator
// ────────────────────────────────────────────────────────────
function PhysicsTaxTab() {
  const [architecture, setArchitecture] = useState<"postgres" | "cockroach_az" | "cockroach_region">("cockroach_az");
  const [writeRatio, setWriteRatio] = useState<number>(30); // 30% writes, 70% reads

  const getMetrics = () => {
    if (architecture === "postgres") {
      return {
        writeP50: 0.8,
        writeP99: 2.5,
        readP50: 0.3,
        rpo: "40 ms (Async Lag)",
        rto: "5 - 15 mins (Pager)",
        splitBrainRisk: "High during network partition",
        autoFailover: "Manual or external daemon",
      };
    } else if (architecture === "cockroach_az") {
      return {
        writeP50: 5.2,
        writeP99: 9.8,
        readP50: 0.6,
        rpo: "0 seconds (Zero Loss)",
        rto: "< 3 seconds (Automatic)",
        splitBrainRisk: "None (Raft Quorum)",
        autoFailover: "Native sub-second election",
      };
    } else {
      return {
        writeP50: 42.0,
        writeP99: 68.0,
        readP50: 0.9,
        rpo: "0 seconds (Zero Loss)",
        rto: "< 5 seconds (Automatic)",
        splitBrainRisk: "None (Raft Quorum)",
        autoFailover: "Native multi-region failover",
      };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="p-4 border-2 border-black bg-neutral-50">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white mr-2">
          The Engineering Reality
        </span>
        <span className="text-sm font-bold text-black">
          Distributed systems trade single-query write speed for horizontal resilience. Understand the latency costs.
        </span>
      </div>

      {/* Architecture Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            id: "postgres",
            title: "Local PostgreSQL",
            desc: "Single server writing to local NVMe SSD. Ultra-fast writes; manual failover.",
          },
          {
            id: "cockroach_az",
            title: "Multi-AZ CockroachDB",
            desc: "3 nodes in separate availability zones within 1 region (1-2ms RTT network).",
          },
          {
            id: "cockroach_region",
            title: "Multi-Region CockroachDB",
            desc: "Nodes across continents (US-East, US-West, Europe) surviving entire cloud outages.",
          },
        ].map((arch) => (
          <button
            key={arch.id}
            onClick={() => setArchitecture(arch.id as any)}
            className={`p-5 text-left border-2 border-black transition-all ${
              architecture === arch.id
                ? "bg-black text-white shadow-[6px_6px_0px_#FFE01B]"
                : "bg-white text-black hover:bg-neutral-50"
            }`}
          >
            <h4 className="text-sm font-black uppercase tracking-tight m-0">{arch.title}</h4>
            <p className={`text-xs mt-2 ${architecture === arch.id ? "text-neutral-300" : "text-neutral-600"}`}>
              {arch.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Knobs: Write Ratio Slider */}
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#FFE01B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight text-black m-0">
              Workload Profile: Read / Write Mix
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              Reads hit the local Leaseholder node (fast). Writes require Raft quorum network roundtrips.
            </p>
          </div>
          <span className="text-xs font-mono font-black bg-black text-[#FFE01B] px-3 py-1 border border-black">
            {100 - writeRatio}% Reads / {writeRatio}% Writes
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="80"
          step="5"
          value={writeRatio}
          onChange={(e) => setWriteRatio(Number(e.target.value))}
          className="w-full accent-black h-3 bg-neutral-200 border border-black cursor-pointer"
        />
      </div>

      {/* Metrics Scorecard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-neutral-500">P50 Write Latency</span>
          <p className="text-2xl font-black text-black mt-1">{metrics.writeP50} ms</p>
          <p className="text-[10px] text-neutral-500 mt-1">Network + Raft disk sync</p>
        </div>

        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-neutral-500">P50 Read Latency</span>
          <p className="text-2xl font-black text-black mt-1">{metrics.readP50} ms</p>
          <p className="text-[10px] text-neutral-500 mt-1">Leaseholder memory cache</p>
        </div>

        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-neutral-500">RPO (Data Loss Risk)</span>
          <p className={`text-base font-black mt-1 ${metrics.rpo.includes("Zero") ? "text-green-700" : "text-red-600"}`}>
            {metrics.rpo}
          </p>
          <p className="text-[10px] text-neutral-500 mt-1">Recovery Point Objective</p>
        </div>

        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-neutral-500">RTO (Recovery Time)</span>
          <p className="text-base font-black text-black mt-1">{metrics.rto}</p>
          <p className="text-[10px] text-neutral-500 mt-1">Time to resume full writes</p>
        </div>
      </div>

      {/* Honest Architectural Verdict */}
      <div className="border-2 border-black bg-neutral-50 p-6">
        <h4 className="text-xs font-black uppercase tracking-widest text-black mb-2">
          Architectural Decision Matrix
        </h4>
        <div className="text-xs text-neutral-800 space-y-2 leading-relaxed">
          <p>
            <strong>When to stick with PostgreSQL:</strong> If your dataset fits comfortably on a single high-spec server (e.g. 1-2 TB), your application requires sub-millisecond write performance, or you depend heavily on custom C extensions and specific stored procedure tooling.
          </p>
          <p>
            <strong>When CockroachDB is the right move:</strong> When manual sharding begins dominating your roadmap, when 3 AM failovers represent existential risk to financial records, or when zero-downtime multi-region survivability is non-negotiable.
          </p>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TAB 5: Systems Knowledge Check
// ────────────────────────────────────────────────────────────
function QuizTab() {
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="p-4 border-2 border-black bg-neutral-50">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white mr-2">
          Knowledge Check
        </span>
        <span className="text-sm font-bold text-black">
          Validate your understanding of distributed SQL, Raft consensus, and clock mechanics.
        </span>
      </div>

      {!finished ? (
        <div className="border-2 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#C21BFF]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-500">
              Question {current + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs font-black uppercase bg-[#FFE01B] px-2 py-0.5 border border-black">
              Score: {score}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-black mb-6 leading-snug">
            {q.question}
          </h4>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-white text-black border-2 border-black hover:bg-neutral-100";
              if (selected !== null) {
                if (idx === q.answer) {
                  btnStyle = "bg-green-100 border-2 border-green-600 text-green-900 font-bold";
                } else if (idx === selected) {
                  btnStyle = "bg-red-100 border-2 border-red-600 text-red-900";
                } else {
                  btnStyle = "bg-neutral-100 text-neutral-400 border border-neutral-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full p-4 text-left text-xs font-medium transition-all ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="p-4 border-2 border-black bg-neutral-50 mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
                {selected === q.answer ? "Correct Analysis" : "Incorrect"}
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {selected !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#FFE01B] hover:text-black border-2 border-black transition-colors"
            >
              {current + 1 < QUIZ_QUESTIONS.length ? "Next Question" : "Complete Quiz"}
            </button>
          )}
        </div>
      ) : (
        <div className="border-2 border-black bg-white p-8 text-center shadow-[8px_8px_0px_#FFE01B]">
          <h4 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
            Assessment Completed
          </h4>
          <p className="text-sm text-neutral-600 mb-6">
            You scored {score} out of {QUIZ_QUESTIONS.length}
          </p>

          <div className="p-4 bg-neutral-100 border-2 border-black inline-block text-xs font-bold text-black mb-6">
            {score === 5
              ? "Flawless score: You possess a Staff Engineer grasp of distributed SQL and consensus trade-offs."
              : score >= 3
              ? "Solid grasp: You understand the core challenges of Raft, clocks, and horizontal scaling."
              : "Review recommended: Revisit the Multi-Raft and HLC sections above to solidify key concepts."}
          </div>

          <div>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#FFE01B] hover:text-black border-2 border-black transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
