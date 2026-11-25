"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  QrCodeIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { toCampusSlug } from "../_utils/campusFormatter";

const PRESET_CAMPUSES = [
  "Tetso College",
  "Patkai Christian College",
  "NIT Nagaland",
  "Dimapur Government College",
  "St. Joseph University",
  "Immanuel College",
  "Unity College",
];

const SITE_BASE = "https://www.instudianagaland.com";

export default function SeminarQrGeneratorPage() {
  const [campusInput, setCampusInput] = useState("Tetso College");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [topic, setTopic] = useState("AI & Career Readiness");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const campusSlug = useMemo(
    () => toCampusSlug(campusInput) || "campus-seminar",
    [campusInput]
  );

  const relativePath = useMemo(() => {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (topic.trim()) params.set("topic", topic.trim());
    return `/s/${campusSlug}?${params.toString()}`;
  }, [campusSlug, date, topic]);

  const fullUrl = `${SITE_BASE}${relativePath}`;

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(fullUrl, {
      width: 600,
      margin: 2,
      color: {
        dark: "#1E1B2E",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch((err) => console.error("[QR] Generation error:", err));
    return () => {
      active = false;
    };
  }, [fullUrl]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-${campusSlug}-${date}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2">
              <QrCodeIcon className="h-3.5 w-3.5" />
              Speaker Closing-Slide Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Seminar QR Code Generator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Encode the campus, date, and topic into one QR code so students
              never have to type them.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            &larr; Back to site
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Campus / Institution Name
              </label>
              <input
                type="text"
                value={campusInput}
                onChange={(e) => setCampusInput(e.target.value)}
                placeholder="e.g., Tetso College"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none"
              />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PRESET_CAMPUSES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCampusInput(preset)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition cursor-pointer ${
                      campusInput === preset
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Seminar Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Seminar Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI & Career Readiness"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Encoded URL
              </p>
              <p className="text-xs font-mono text-indigo-300 break-all">
                {fullUrl}
              </p>
            </div>
          </div>

          {/* Right: QR Preview & Actions */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-between text-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Closing Slide QR Preview
              </p>
              <div className="rounded-2xl bg-white p-4 shadow-xl">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`QR code for ${campusInput}`}
                    className="h-56 w-56 object-contain"
                  />
                ) : (
                  <div className="h-56 w-56 flex items-center justify-center text-slate-400 text-sm">
                    Generating QR...
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm font-semibold text-white">
                {campusInput || "Campus Seminar"}
              </p>
              <p className="text-xs text-slate-400">
                {topic} • {date}
              </p>
            </div>

            <div className="w-full space-y-2.5 mt-6">
              <button
                type="button"
                onClick={handleDownloadQr}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-3 text-sm font-bold text-white transition cursor-pointer"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download QR PNG (600x600)
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-200 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      Copy URL
                    </>
                  )}
                </button>

                <Link
                  href={relativePath}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-200 transition"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Test Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

