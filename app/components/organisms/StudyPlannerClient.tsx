"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon, DocumentDuplicateIcon, PrinterIcon, CheckIcon } from "@heroicons/react/24/solid";

type Priority = "High" | "Medium" | "Low";
type StudyTime = "morning" | "afternoon" | "evening" | "custom";
type WeekendMode = "light" | "intensive";


interface Subject {
  id: number;
  name: string;
  priority: Priority;
  confidence: number;
}

const PRIORITY_COLOR: Record<Priority, string> = {
  High: "🔴",
  Medium: "🟡",
  Low: "🟢",
};

const SCHEDULES: Record<StudyTime, { time: string; block: string; activity: string }[]> = {
  morning: [
    { time: "5:00 – 5:30 AM", block: "🌅 Morning Ritual", activity: "Wake up, hydrate, light stretch, set intentions" },
    { time: "5:30 – 7:00 AM", block: "🧠 Deep Work 1", activity: "Highest priority subject — peak focus window" },
    { time: "7:00 – 7:10 AM", block: "☕ Break", activity: "Short walk or snack" },
    { time: "7:10 – 8:30 AM", block: "🧠 Deep Work 2", activity: "Highest priority subject (continued)" },
    { time: "8:30 – 9:00 AM", block: "🍳 Breakfast", activity: "Full rest — no study" },
    { time: "9:00 – 10:00 AM", block: "🍅 Pomodoro", activity: "2 × 25-min — Medium priority subject" },
    { time: "10:00 – 10:10 AM", block: "☕ Break", activity: "Hydrate + rest eyes" },
    { time: "10:10 – 11:30 AM", block: "🧠 Deep Work 3", activity: "Problem-solving / Practice questions" },
    { time: "11:30 AM – 1:00 PM", block: "📖 Review", activity: "Low priority subject or spaced repetition" },
    { time: "1:00 – 2:00 PM", block: "🍽️ Lunch Break", activity: "Full rest — no screens" },
    { time: "2:00 – 3:00 PM", block: "🍅 Pomodoro", activity: "Active Recall — flashcards / quizzing" },
    { time: "3:00 – 3:30 PM", block: "🏃 Movement", activity: "Walk, stretch, breathe" },
    { time: "3:30 – 5:00 PM", block: "✍️ Practice", activity: "Past papers or mock test questions" },
    { time: "5:00 – 5:30 PM", block: "🧘 Recharge", activity: "Music or power nap (max 20 min)" },
    { time: "5:30 – 6:30 PM", block: "🔁 Spaced Repetition", activity: "Review previous days' material" },
    { time: "6:30 – 7:00 PM", block: "📓 Wrap-Up", activity: "Write 3 things learned + plan tomorrow" },
    { time: "7:00 – 9:00 PM", block: "🌙 Free Time", activity: "Family, hobbies, rest — you've earned it" },
    { time: "9:00 PM", block: "💤 Lights Out", activity: "Early sleep for an early rise tomorrow" },
  ],
  afternoon: [
    { time: "7:00 – 7:30 AM", block: "🌅 Morning Ritual", activity: "Wake up, hydrate, stretch, review today's goals" },
    { time: "7:30 – 9:00 AM", block: "📖 Light Review", activity: "Re-read notes from yesterday — no heavy lifting" },
    { time: "9:00 – 10:00 AM", block: "🍳 Breakfast + Prep", activity: "Eat, plan tasks, warm up mentally" },
    { time: "10:00 – 10:30 AM", block: "🍅 Pomodoro", activity: "1 × 25-min — light subject or vocabulary" },
    { time: "10:30 AM – 12:00 PM", block: "🧠 Deep Work 1", activity: "Medium priority subject" },
    { time: "12:00 – 1:00 PM", block: "🍽️ Lunch Break", activity: "Full rest — no screens" },
    { time: "1:00 – 2:30 PM", block: "🧠 Deep Work 2", activity: "Highest priority subject — peak afternoon focus" },
    { time: "2:30 – 2:40 PM", block: "☕ Break", activity: "Hydrate + rest eyes" },
    { time: "2:40 – 4:00 PM", block: "🧠 Deep Work 3", activity: "Highest priority subject (continued)" },
    { time: "4:00 – 4:30 PM", block: "🏃 Movement", activity: "Walk, stretch, breathe" },
    { time: "4:30 – 5:30 PM", block: "🍅 Pomodoro", activity: "2 × 25-min — Active Recall (flashcards)" },
    { time: "5:30 – 7:00 PM", block: "✍️ Practice", activity: "Past papers, mock tests, or problem sets" },
    { time: "7:00 – 7:30 PM", block: "🔁 Spaced Repetition", activity: "Review previous days' material" },
    { time: "7:30 – 8:00 PM", block: "🍽️ Dinner", activity: "" },
    { time: "8:00 – 8:30 PM", block: "📓 Wrap-Up", activity: "Write 3 things learned + set tomorrow's top 3 goals" },
    { time: "10:00 PM", block: "💤 Lights Out", activity: "Sleep is non-negotiable. It consolidates memory." },
  ],
  evening: [
    { time: "8:00 – 8:30 AM", block: "🌅 Morning Ritual", activity: "Wake up, hydrate, light stretch" },
    { time: "8:30 – 10:00 AM", block: "🍳 Breakfast + Light Reading", activity: "Easy review or news — no intensity" },
    { time: "10:00 AM – 12:00 PM", block: "📖 Light Review", activity: "Re-read notes, summarize previous topics" },
    { time: "12:00 – 1:00 PM", block: "🍽️ Lunch Break", activity: "Full rest — no screens" },
    { time: "1:00 – 3:00 PM", block: "🍅 Pomodoro", activity: "3 × 25-min — Medium priority subject" },
    { time: "3:00 – 4:00 PM", block: "🏃 Movement / Nap", activity: "Walk, gym, or 20-min power nap" },
    { time: "4:00 – 6:00 PM", block: "🧠 Deep Work 1", activity: "Highest priority subject — energy building" },
    { time: "6:00 – 6:10 PM", block: "☕ Break", activity: "Hydrate + snack" },
    { time: "6:10 – 8:00 PM", block: "🧠 Deep Work 2", activity: "Highest priority subject — peak evening focus" },
    { time: "8:00 – 8:30 PM", block: "🍽️ Dinner", activity: "" },
    { time: "8:30 – 10:00 PM", block: "🧠 Deep Work 3", activity: "Problem solving / Past paper practice" },
    { time: "10:00 – 10:30 PM", block: "🔁 Spaced Repetition", activity: "Quick review of the day's material" },
    { time: "10:30 – 11:00 PM", block: "📓 Wrap-Up", activity: "Write 3 things learned + plan tomorrow" },
    { time: "11:00 – 11:30 PM", block: "🧘 Wind Down", activity: "No screens — read fiction, meditate, stretch" },
    { time: "11:30 PM", block: "💤 Lights Out", activity: "Prioritize 7+ hours sleep for memory consolidation" },
  ],
  // 'custom' schedule is generated at runtime; this empty array satisfies the Record<StudyTime> type
  custom: [],
};

const WEEKEND_SCHEDULES: Record<WeekendMode, { saturday: { time: string; block: string; activity: string }[]; sunday: { time: string; block: string; activity: string }[] }> = {
  intensive: {
    saturday: [
      { time: "8:00 – 8:30 AM", block: "🌅 Morning Ritual", activity: "Hydrate, stretch, review week goals" },
      { time: "8:30 – 11:30 AM", block: "📝 Full Mock Exam", activity: "Timed, real exam conditions — no interruptions" },
      { time: "11:30 AM – 12:00 PM", block: "☕ Break", activity: "Rest, stretch, snack" },
      { time: "12:00 – 1:00 PM", block: "🔍 Error Analysis", activity: "Review every wrong answer — understand WHY" },
      { time: "1:00 – 2:00 PM", block: "🍽️ Lunch Break", activity: "Full rest" },
      { time: "2:00 – 4:00 PM", block: "🔁 Targeted Review", activity: "Re-study only the topics you got wrong" },
      { time: "4:00 – 5:00 PM", block: "🏃 Movement", activity: "Walk, gym, sport — recharge fully" },
      { time: "5:00 – 6:30 PM", block: "🍅 Pomodoro", activity: "2 × 25-min — Spaced repetition of weak areas" },
      { time: "6:30 PM+", block: "🌙 Free Evening", activity: "Rest, family, social — zero study guilt" },
    ],
    sunday: [
      { time: "8:30 – 9:00 AM", block: "🌅 Gentle Start", activity: "Light stretch, tea/coffee, journaling" },
      { time: "9:00 – 10:30 AM", block: "📖 Error Log Review", activity: "Study only Saturday's error log topics" },
      { time: "10:30 – 11:30 AM", block: "🍅 Pomodoro", activity: "2 × 25-min — Flash cards on weak areas" },
      { time: "11:30 AM – 12:30 PM", block: "🧘 Rest", activity: "No study — recharge your brain" },
      { time: "12:30 – 1:30 PM", block: "🍽️ Lunch", activity: "Full rest" },
      { time: "1:30 – 3:00 PM", block: "📅 Next Week Planning", activity: "Update subject priorities, plan Monday schedule" },
      { time: "3:00 PM+", block: "🌙 Full Rest", activity: "Zero study — be with family, rest, hobbies" },
    ],
  },
  light: {
    saturday: [
      { time: "9:00 – 9:30 AM", block: "🌅 Easy Start", activity: "Light stretch, coffee, journal" },
      { time: "9:30 – 11:00 AM", block: "📖 Light Review", activity: "Skim notes, re-read summaries — low effort" },
      { time: "11:00 AM – 12:00 PM", block: "🍅 Pomodoro", activity: "1 × 25-min — Flashcards only" },
      { time: "12:00 – 1:00 PM", block: "🍽️ Lunch", activity: "Full rest" },
      { time: "1:00 – 2:00 PM", block: "🏃 Activity", activity: "Sport, walk, something fun — recharge" },
      { time: "2:00 PM+", block: "🌙 Free Day", activity: "Rest, hobbies, family — total mental break" },
    ],
    sunday: [
      { time: "10:00 – 10:30 AM", block: "🌅 Slow Morning", activity: "No alarm, gentle wake up" },
      { time: "10:30 – 11:30 AM", block: "📅 Week Planning", activity: "Review priorities, plan next week's subjects" },
      { time: "11:30 AM+", block: "🌙 Complete Rest", activity: "Absolutely no study — full mental recovery day" },
    ],
  },
};

export default function StudyPlannerClient() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Mathematics", priority: "High", confidence: 5 },
    { id: 2, name: "Science", priority: "High", confidence: 4 },
    { id: 3, name: "English", priority: "Medium", confidence: 7 },
  ]);
  const [studentName, setStudentName] = useState("");
  const [examName, setExamName] = useState("");
  const [studyTime, setStudyTime] = useState<StudyTime>("morning");
  const [weekendMode, setWeekendMode] = useState<WeekendMode>("light");
  const [customWake, setCustomWake] = useState("06:00");
  const [customEnd, setCustomEnd] = useState("21:00");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);


  const addSubject = () => setSubjects([...subjects, { id: Date.now(), name: "", priority: "Medium", confidence: 5 }]);
  const removeSubject = (id: number) => setSubjects(subjects.filter((s) => s.id !== id));
  const updateSubject = (id: number, field: keyof Subject, value: any) =>
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const generate = () => {
    if (subjects.some((s) => !s.name.trim())) return alert("Please fill in all subject names.");
    setGenerated(true);
    setTimeout(() => document.getElementById("planner-output")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const generateCustomSchedule = (wake: string, end: string) => {
    const toMins = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const fmt = (mins: number) => {
      const h = Math.floor(mins / 60) % 24;
      const m = mins % 60;
      const period = h < 12 ? "AM" : "PM";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
    };
    const wakeM = toMins(wake);
    const endM = toMins(end);
    const duration = endM - wakeM;
    if (duration < 120) return SCHEDULES.morning;
    const slots: { time: string; block: string; activity: string }[] = [];
    let cur = wakeM;
    const add = (dur: number, block: string, activity: string) => {
      const start = fmt(cur);
      cur += dur;
      slots.push({ time: `${start} – ${fmt(cur)}`, block, activity });
    };
    add(30, "🌅 Morning Ritual", "Wake up, hydrate, stretch, set intentions");
    add(90, "🧠 Deep Work 1", "Highest priority subject — peak focus");
    add(10, "☕ Break", "Short walk or snack");
    add(90, "🧠 Deep Work 2", "Highest priority subject (continued)");
    add(60, "🍽️ Meal Break", "Full rest — no screens");
    add(50, "🍅 Pomodoro", "2 × 25-min — Medium priority subject");
    add(10, "☕ Break", "Hydrate + rest eyes");
    const remaining = endM - cur - 60;
    if (remaining > 90) {
      add(Math.min(remaining - 60, 90), "🧠 Deep Work 3", "Problem-solving / practice questions");
      add(30, "🏃 Movement", "Walk, stretch, breathe");
      add(endM - cur - 60, "🍅 Pomodoro", "Active Recall — flashcards / past papers");
    } else if (remaining > 0) {
      add(remaining, "📖 Review", "Spaced repetition or practice");
    }
    add(30, "🔁 Spaced Repetition", "Review the day's material");
    add(30, "📓 Wrap-Up", "Write 3 things learned + plan tomorrow");
    slots.push({ time: fmt(cur), block: "💤 Lights Out", activity: "Sleep is non-negotiable — it consolidates memory." });
    return slots;
  };

  const schedule = studyTime === "custom"
    ? generateCustomSchedule(customWake, customEnd)
    : SCHEDULES[studyTime as Exclude<StudyTime, "custom">];

  const weekend = WEEKEND_SCHEDULES[weekendMode];

  const generateMarkdown = () => {
    const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const subjectTable = subjects.map((s, i) =>
      `| ${i + 1} | ${s.name} | ${PRIORITY_COLOR[s.priority]} ${s.priority} | ${s.confidence}/10 |`).join("\n");
    const scheduleTable = schedule.map((r) => `| ${r.time} | ${r.block} | ${r.activity} |`).join("\n");
    const satTable = weekend.saturday.map((r) => `| ${r.time} | ${r.block} | ${r.activity} |`).join("\n");
    const sunTable = weekend.sunday.map((r) => `| ${r.time} | ${r.block} | ${r.activity} |`).join("\n");
    return `# 📚 Study Planner — ${examName || "Exam Prep"}\nStudent: ${studentName || "Student"} | ${today}\n\n## 📊 Master Schedule\n| # | Subject | Priority | Confidence |\n|---|---------|----------|------------|\n${subjectTable}\n\n## 🕐 Daily Routine (${studyTime.charAt(0).toUpperCase() + studyTime.slice(1)} Schedule)\n| Time | Block | Activity |\n|------|-------|----------|\n${scheduleTable}\n\n## 🏖️ Saturday Schedule\n| Time | Block | Activity |\n|------|-------|----------|\n${satTable}\n\n## 🌙 Sunday Schedule\n| Time | Block | Activity |\n|------|-------|----------|\n${sunTable}\n\n*Generated by Instudia Study Planner · ${today}*`;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    const timeLabel: Record<StudyTime, string> = {
      morning: "🌅 Morning Bird (5 AM – 7 PM)",
      afternoon: "☀️ Afternoon Focus (10 AM – 9 PM)",
      evening: "🌙 Night Owl (4 PM – 11 PM)",
      custom: `⚙️ Custom (${customWake} – ${customEnd})`,
    };

    const weekendLabel: Record<WeekendMode, string> = {
      light: "🏖️ Light Weekend",
      intensive: "💪 Intensive Weekend",
    };

    const priorityBadge = (p: Priority) => {
      const map: Record<Priority, { color: string; bg: string; label: string }> = {
        High: { color: "#dc2626", bg: "#fef2f2", label: "🔴 High" },
        Medium: { color: "#d97706", bg: "#fffbeb", label: "🟡 Medium" },
        Low: { color: "#16a34a", bg: "#f0fdf4", label: "🟢 Low" },
      };
      return `<span style="background:${map[p].bg};color:${map[p].color};padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;border:1px solid ${map[p].color}30">${map[p].label}</span>`;
    };

    const confidenceBar = (score: number) => {
      const pct = score * 10;
      const color = score >= 7 ? "#16a34a" : score >= 4 ? "#d97706" : "#dc2626";
      return `<div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:8px;background:#f1f5f9;border-radius:999px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${color};border-radius:999px"></div></div><span style="font-size:12px;font-weight:800;color:${color}">${score}/10</span></div>`;
    };

    const subjectRows = subjects.map((s, i) => `
      <tr>
        <td style="font-weight:700;color:#6d28d9">#${i + 1}</td>
        <td style="font-weight:800;color:#1B1C1E">${s.name}</td>
        <td>${priorityBadge(s.priority)}</td>
        <td>${confidenceBar(s.confidence)}</td>
      </tr>`).join("");

    const blockColor = (block: string): { bg: string; border: string; text: string } => {
      if (block.includes("Deep Work")) return { bg: "#ede9fe", border: "#7c3aed", text: "#4c1d95" };
      if (block.includes("Pomodoro")) return { bg: "#fff1f2", border: "#f43f5e", text: "#9f1239" };
      if (block.includes("Break") || block.includes("Movement") || block.includes("Recharge") || block.includes("Wind Down"))
        return { bg: "#f0fdf4", border: "#22c55e", text: "#15803d" };
      if (block.includes("Lunch") || block.includes("Dinner") || block.includes("Breakfast"))
        return { bg: "#fef9c3", border: "#eab308", text: "#92400e" };
      if (block.includes("Free") || block.includes("Rest") || block.includes("Lights Out"))
        return { bg: "#f0f9ff", border: "#38bdf8", text: "#075985" };
      if (block.includes("Mock") || block.includes("Practice") || block.includes("Wrap"))
        return { bg: "#fdf4ff", border: "#d946ef", text: "#86198f" };
      return { bg: "#f8fafc", border: "#cbd5e1", text: "#475569" };
    };

    const renderScheduleRows = (rows: typeof schedule) => rows.map((r) => {
      const c = blockColor(r.block);
      return `<tr>
        <td style="font-weight:700;color:#64748b;white-space:nowrap;font-size:12px">${r.time}</td>
        <td><span style="background:${c.bg};color:${c.text};border:1px solid ${c.border}30;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700">${r.block}</span></td>
        <td style="color:#475569;font-size:13px">${r.activity}</td>
      </tr>`;
    }).join("");

    const recallSections = subjects.map((s) => `
      <div style="margin-bottom:20px;break-inside:avoid">
        <h3 style="font-size:15px;font-weight:800;color:#4c1d95;margin-bottom:10px">${s.name}</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="background:#f8fafc">
            <th style="padding:8px 12px;text-align:left;color:#64748b;font-weight:700;border-bottom:2px solid #e2e8f0">Topic</th>
            <th style="padding:8px 12px;text-align:center;color:#64748b;font-weight:700;border-bottom:2px solid #e2e8f0">Studied</th>
            <th style="padding:8px 12px;text-align:center;color:#7c3aed;font-weight:700;border-bottom:2px solid #e2e8f0">Day 1</th>
            <th style="padding:8px 12px;text-align:center;color:#7c3aed;font-weight:700;border-bottom:2px solid #e2e8f0">Day 3</th>
            <th style="padding:8px 12px;text-align:center;color:#7c3aed;font-weight:700;border-bottom:2px solid #e2e8f0">Day 7</th>
          </tr></thead>
          <tbody>
            ${[1, 2, 3].map(n => `<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;font-weight:600">Topic ${n}</td>
              ${[0, 0, 0, 0].map(() => `<td style="text-align:center;padding:8px;border-bottom:1px solid #f1f5f9"><span style="display:inline-block;width:18px;height:18px;border:2px solid #7c3aed;border-radius:4px"></span></td>`).join("")}
            </tr>`).join("")}
          </tbody>
        </table>
      </div>`).join("");

    const sortedSubjects = [...subjects].sort((a) => a.priority === "High" ? -1 : 1);
    const weeklyCards = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => {
      const main = sortedSubjects[i % sortedSubjects.length]?.name || "Review";
      const tasks = [`Deep Work Block: ${main}`, "Pomodoro session × 2", "Active Recall: Yesterday's topics", "10 practice questions"];
      return `<div style="background:#fafaff;border:1px solid #ede9fe;border-radius:12px;padding:16px 20px;break-inside:avoid">
        <h4 style="font-size:14px;font-weight:800;color:#4c1d95;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #ede9fe">${day}</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px">
          ${tasks.map(t => `<li style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#374151">
            <span style="display:inline-block;width:16px;height:16px;border:2px solid #7c3aed;border-radius:4px;flex-shrink:0;margin-top:1px"></span>${t}
          </li>`).join("")}
        </ul>
      </div>`;
    }).join("");

    const weekendCard = (day: string, rows: typeof schedule, bg: string) => `
      <div style="background:${bg};border-radius:16px;padding:20px 24px;break-inside:avoid">
        <h4 style="font-size:16px;font-weight:900;color:#1B1C1E;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #e2e8f0">${day}</h4>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          ${rows.map((r) => {
      const c = blockColor(r.block);
      return `<tr>
              <td style="font-weight:700;color:#64748b;white-space:nowrap;font-size:11px;padding:6px 8px">${r.time}</td>
              <td style="padding:6px 8px"><span style="background:${c.bg};color:${c.text};border:1px solid ${c.border}30;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700">${r.block}</span></td>
              <td style="color:#475569;font-size:12px;padding:6px 8px">${r.activity}</td>
            </tr>`;
    }).join("")}
        </table>
      </div>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Study Planner — ${examName || "Exam Prep"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;color:#1B1C1E;background:#fff;font-size:13.5px;line-height:1.6}
    .page{max-width:860px;margin:0 auto;padding:48px 52px}
    .header{background:linear-gradient(135deg,#1B1C1E 0%,#4c1d95 100%);border-radius:20px;padding:36px 40px;color:white;margin-bottom:32px;position:relative;overflow:hidden}
    .header::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(124,58,237,0.3);border-radius:50%}
    .badge{display:inline-flex;align-items:center;background:rgba(88,255,27,0.15);border:1px solid rgba(88,255,27,0.4);color:#58FF1B;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:14px}
    .h-title{font-size:30px;font-weight:900;margin-bottom:6px}
    .h-sub{font-size:14px;color:rgba(255,255,255,0.65);font-weight:500}
    .chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
    .chip{background:rgba(255,255,255,0.1);border-radius:10px;padding:8px 16px}
    .chip-label{font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.06em}
    .chip-value{font-size:13px;font-weight:800;color:white;margin-top:2px}
    .section{margin-bottom:32px}
    .sec-head{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid #f1f5f9}
    .sec-icon{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
    .sec-title{font-size:17px;font-weight:900;color:#1B1C1E}
    table{width:100%;border-collapse:collapse}
    thead tr{background:#f8fafc}
    th{padding:10px 14px;text-align:left;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;border-bottom:2px solid #e2e8f0}
    td{padding:10px 14px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    .quote{background:linear-gradient(135deg,#f5f3ff,#fdf4ff);border-left:4px solid #7c3aed;border-radius:0 12px 12px 0;padding:14px 20px;margin-bottom:20px;font-style:italic;color:#4c1d95;font-weight:600;font-size:14px}
    .week-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .weekend-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .foot{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #f1f5f9;font-size:11px;color:#94a3b8;font-weight:500}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.section{break-inside:avoid}}
  </style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="badge">📚 Study Planner</div>
    <div class="h-title">${examName || "Exam Preparation"}</div>
    <div class="h-sub">"Champions are made in the hours when they could quit — but don't." 💪</div>
    <div class="chips">
      <div class="chip"><div class="chip-label">Student</div><div class="chip-value">${studentName || "Student"}</div></div>
      <div class="chip"><div class="chip-label">Generated</div><div class="chip-value">${today}</div></div>
      <div class="chip"><div class="chip-label">Subjects</div><div class="chip-value">${subjects.length} Topics</div></div>
      <div class="chip"><div class="chip-label">Study Style</div><div class="chip-value">${timeLabel[studyTime]}</div></div>
      <div class="chip"><div class="chip-label">Weekend Mode</div><div class="chip-value">${weekendLabel[weekendMode]}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">📊</div><div class="sec-title">Master Schedule</div></div>
    <table><thead><tr><th>#</th><th>Subject</th><th>Priority</th><th>Confidence</th></tr></thead><tbody>${subjectRows}</tbody></table>
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">🕐</div><div class="sec-title">Daily Routine — ${timeLabel[studyTime]}</div></div>
    <div class="quote">Your schedule is optimised for your preferred study time. Deep Work blocks are placed at your peak focus window.</div>
    <table><thead><tr><th>Time</th><th>Block</th><th>Activity</th></tr></thead><tbody>${renderScheduleRows(schedule)}</tbody></table>
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">🔁</div><div class="sec-title">Active Recall Tracker</div></div>
    <div class="quote">Review each topic on <strong>Day 1</strong>, then <strong>Day 3</strong>, then <strong>Day 7</strong>. This is how information permanently sticks.</div>
    ${recallSections}
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">✅</div><div class="sec-title">Weekday Checklist (Mon–Fri)</div></div>
    <div class="week-grid">${weeklyCards}</div>
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">🏖️</div><div class="sec-title">Weekend Schedule — ${weekendLabel[weekendMode]}</div></div>
    <div class="weekend-grid">
      ${weekendCard("📅 Saturday", weekend.saturday, "#fafaff")}
      ${weekendCard("☀️ Sunday", weekend.sunday, "#f0fdf4")}
    </div>
  </div>

  <div class="section">
    <div class="sec-head"><div class="sec-icon">🏆</div><div class="sec-title">Exam-Week Affirmations</div></div>
    <div class="quote">"I have put in the work. I trust my preparation. I show up calm and confident."</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${["I will sleep 7–8 hours every night this week.", "I will NOT cram the night before — review notes only.", "I will arrive 15 minutes early to the exam.", "I will read every question carefully before answering.", "After the exam, I will celebrate — I gave my best. 🎉"].map(a =>
      `<div style="display:flex;gap:12px;align-items:center;background:#fafafa;border:1px solid #f1f5f9;border-radius:10px;padding:12px 16px">
          <span style="display:inline-block;width:18px;height:18px;border:2px solid #7c3aed;border-radius:5px;flex-shrink:0"></span>
          <span style="font-weight:600;color:#374151">${a}</span>
        </div>`).join("")}
    </div>
  </div>

  <div class="foot">Generated by Instudia Study Planner · ${today} · instudianagaland.com 🚀</div>
</div>
<script>window.onload = () => { window.print(); }</script>
</body></html>`);
    printWindow.document.close();
  };

  const TIME_OPTIONS: { value: StudyTime; label: string; icon: string; desc: string }[] = [
    { value: "morning", label: "Morning Bird", icon: "🌅", desc: "5 AM – 7 PM · Peak focus at dawn" },
    { value: "afternoon", label: "Afternoon Focus", icon: "☀️ ", desc: "10 AM – 9 PM · Gradual warm-up" },
    { value: "evening", label: "Night Owl", icon: "🌙", desc: "4 PM – 11 PM · Peak focus at dusk" },
    { value: "custom", label: "Custom", icon: "⚙️", desc: "Set your own wake-up & end time" },
  ];


  return (
    <div className="flex flex-col gap-12">
      {/* ── Input Panel ── */}
      <div className="bg-white rounded-3xl border border-[#1B1C1E] border-2 shadow-xl shadow-gray-100/50 p-8 md:p-10">
        <h2 className="text-2xl font-black text-[#1B1C1E] mb-2">Configure Your Planner</h2>
        <p className="text-gray-400 mb-8">Fill in the details below and generate your personalised schedule in seconds.</p>

        {/* Student & Exam Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Atozo Yeptho"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-gray-50 border border-neutral-200 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-brandpurple/20 focus:border-brandpurple font-semibold transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Exam / Goal Name</label>
            <input
              type="text"
              placeholder="e.g. Final Exams 2025"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full bg-gray-50 border border-neutral-200 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-brandpurple/20 focus:border-brandpurple font-semibold transition-all"
            />
          </div>
        </div>

        {/* ── Time Preference ── */}
        <div className="mb-10">
          <h3 className="font-black text-[#1B1C1E] text-lg mb-1">Preferred Study Time</h3>
          <p className="text-gray-400 text-sm mb-4">Your daily routine will be optimised around your peak focus window.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TIME_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`relative flex flex-col gap-1 p-5 rounded-2xl border-2 cursor-pointer transition-all ${studyTime === opt.value
                  ? "border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10"
                  : "border-neutral-100 bg-gray-50 hover:border-brandpurple/30"
                  }`}
              >
                <input
                  type="radio"
                  name="studyTime"
                  value={opt.value}
                  checked={studyTime === opt.value}
                  onChange={() => setStudyTime(opt.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{opt.icon}</span>
                <span className="font-extrabold text-[#1B1C1E] text-sm mt-1">{opt.label}</span>
                <span className="text-xs text-gray-400 font-medium">{opt.desc}</span>
                {studyTime === opt.value && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-brandpurple rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </span>
                )}
              </label>
            ))}
          </div>

          {/* Custom time pickers — shown only when Custom is selected */}
          {studyTime === "custom" && (
            <div className="mt-5 p-5 bg-brandpurple/5 border border-brandpurple/20 rounded-2xl">
              <p className="text-sm font-bold text-brandpurple mb-4">⚙️ Set Your Custom Schedule Window</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">🌅 Wake-Up / Study Start</label>
                  <input
                    type="time"
                    value={customWake}
                    onChange={(e) => setCustomWake(e.target.value)}
                    className="w-full bg-white border border-brandpurple/30 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-brandpurple/20 focus:border-brandpurple font-bold text-[#1B1C1E] transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">The time your first Deep Work block starts</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">🌙 Study End / Lights Out</label>
                  <input
                    type="time"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full bg-white border border-brandpurple/30 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-brandpurple/20 focus:border-brandpurple font-bold text-[#1B1C1E] transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Your schedule wraps up at this time</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 font-medium">
                Your {customWake} – {customEnd} window will be automatically divided into Deep Work, Pomodoro, breaks, and review blocks.
              </p>
            </div>
          )}
        </div>

        {/* ── Weekend Mode ── */}
        <div className="mb-10">
          <h3 className="font-black text-[#1B1C1E] text-lg mb-1">Weekend Mode</h3>
          <p className="text-gray-400 text-sm mb-4">How should your Saturdays and Sundays be structured?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: "light" as WeekendMode, icon: "🏖️", label: "Light Weekend", desc: "Short review + full rest. Recharge for the week ahead." },
              { value: "intensive" as WeekendMode, icon: "💪", label: "Intensive Weekend", desc: "Full mock exam on Saturday + targeted error review on Sunday." },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`relative flex flex-col gap-1 p-5 rounded-2xl border-2 cursor-pointer transition-all ${weekendMode === opt.value
                  ? "border-brandpurple bg-brandpurple/5 shadow-md shadow-brandpurple/10"
                  : "border-neutral-100 bg-gray-50 hover:border-brandpurple/30"
                  }`}
              >
                <input
                  type="radio"
                  name="weekendMode"
                  value={opt.value}
                  checked={weekendMode === opt.value}
                  onChange={() => setWeekendMode(opt.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{opt.icon}</span>
                <span className="font-extrabold text-[#1B1C1E] text-sm mt-1">{opt.label}</span>
                <span className="text-xs text-gray-400 font-medium">{opt.desc}</span>
                {weekendMode === opt.value && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-brandpurple rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[#1B1C1E] text-lg">Subjects</h3>
            <button
              onClick={addSubject}
              className="flex items-center gap-2 text-sm font-bold text-brandpurple border border-brandpurple/30 px-4 py-2 rounded-xl hover:bg-brandpurple/5 transition-all"
            >
              <PlusIcon className="w-4 h-4" /> Add Subject
            </button>
          </div>

          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-neutral-100">
                <div className="col-span-12 md:col-span-4">
                  <input
                    type="text"
                    placeholder="Subject name"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                    className="w-full bg-white border border-neutral-200 px-4 py-2.5 rounded-xl text-sm font-bold text-[#1B1C1E] outline-none focus:border-brandpurple transition-all"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label className="block text-xs font-bold text-gray-400 mb-1">Priority</label>
                  <select
                    value={subject.priority}
                    onChange={(e) => updateSubject(subject.id, "priority", e.target.value)}
                    className="w-full bg-white border border-neutral-200 px-3 py-2.5 rounded-xl text-sm font-bold text-[#1B1C1E] outline-none focus:border-brandpurple transition-all appearance-none"
                  >
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>
                <div className="col-span-5 md:col-span-4">
                  <label className="block text-xs font-bold text-gray-400 mb-1">
                    Confidence: <span className="text-brandpurple">{subject.confidence}/10</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={subject.confidence}
                    onChange={(e) => updateSubject(subject.id, "confidence", Number(e.target.value))}
                    className="w-full accent-brandpurple"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeSubject(subject.id)}
                    disabled={subjects.length <= 1}
                    className="text-gray-300 hover:text-red-400 disabled:opacity-30 transition-all"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-[#1B1C1E] text-white font-black text-lg py-5 rounded-2xl hover:bg-brandpurple hover:shadow-xl hover:shadow-brandpurple/30 transition-all duration-300"
        >
          ✨ Generate My Study Planner
        </button>
      </div>

      {/* ── Generated Planner Output ── */}
      {generated && (
        <div id="planner-output" className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-8 py-5 border-b border-neutral-100 bg-gray-50">
            <div>
              <h2 className="font-black text-[#1B1C1E] text-xl">Your Study Planner is Ready! 🎉</h2>
              <p className="text-sm text-gray-400">Copy the Markdown or print as PDF directly.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={copyMarkdown}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-neutral-200 text-[#1B1C1E] hover:border-brandpurple/40"
                  }`}
              >
                {copied ? <CheckIcon className="w-4 h-4" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Markdown"}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-brandpurple text-white hover:bg-brandpurple/90 transition-all"
              >
                <PrinterIcon className="w-4 h-4" />
                Print / PDF
              </button>
            </div>
          </div>

          {/* Live Preview of selections */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Schedule Preview */}
              <div>
                <h4 className="font-black text-[#1B1C1E] mb-3 flex items-center gap-2">
                  <span className="text-brandpurple">🕐</span> Daily Routine Preview
                </h4>
                <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                  {schedule.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b border-neutral-50">
                      <span className="text-gray-400 font-bold w-28 flex-shrink-0">{r.time}</span>
                      <span className="font-bold text-[#1B1C1E]">{r.block}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Weekend Preview */}
              <div>
                <h4 className="font-black text-[#1B1C1E] mb-3 flex items-center gap-2">
                  <span className="text-brandpurple">🏖️</span> Weekend Preview
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Saturday</p>
                    <div className="space-y-1">
                      {weekend.saturday.map((r, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs py-1 border-b border-neutral-50">
                          <span className="text-gray-400 font-bold w-28 flex-shrink-0">{r.time}</span>
                          <span className="font-bold text-[#1B1C1E]">{r.block}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Sunday</p>
                    <div className="space-y-1">
                      {weekend.sunday.map((r, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs py-1 border-b border-neutral-50">
                          <span className="text-gray-400 font-bold w-28 flex-shrink-0">{r.time}</span>
                          <span className="font-bold text-[#1B1C1E]">{r.block}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
