"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeForm } from "../molecules/ResumeForm";
import { ResumePreview } from "../molecules/ResumePreview";
import {
  IconSparkles,
  IconPlus,
  IconMinus,
  IconEye,
  IconForms,
  IconDownload,
  IconAdjustmentsHorizontal,
  IconMaximize,
  IconLoader2
} from "@tabler/icons-react";

const TEMPLATES = [
  { id: "bento", label: "Bento", desc: "Symmetrical Grid Layout" },
  { id: "minimalist", label: "Minimalist", desc: "Spacious Single Column" },
  { id: "executive", label: "Executive", desc: "Traditional Business Focus" },
  { id: "metropolitan", label: "Metropolitan", desc: "Asymmetric High-End Editorial" },
];

const PAPER_SIZES = [
  { id: "a4", label: "A4", desc: "ISO 210 × 297 mm" },
  { id: "letter", label: "US Letter", desc: "8.5 × 11 in" },
];

const FONT_OPTIONS = [
  { id: "jakarta", label: "Plus Jakarta", desc: "Modern Sans" },
  { id: "inter", label: "Inter", desc: "Clean Tech" },
  { id: "merriweather", label: "Merriweather", desc: "Editorial Serif" },
];

const HEADER_ALIGNMENTS = [
  { id: "default", label: "Template Default" },
  { id: "left", label: "Left Align" },
  { id: "center", label: "Centered" },
];

const DEFAULT_RESUME = {
  basics: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john@example.com",
    phone: "+91-123-4567890",
    location: "Dimapur, Nagaland",
    website: "linkedin.com/in/johndoe",
    summary: "Dedicated software engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and mentoring junior developers.",
  },
  sections: [
    {
      id: "exp-1",
      title: "Experience",
      type: "list",
      items: [
        {
          title: "Senior Developer",
          subtitle: "Tech Solutions Inc.",
          date: "Jan 2021 - Present",
          description: "• Led a team of 5 developers to build a high-traffic e-commerce platform.\n• Optimized API performance by 40% using Redis caching.\n• Architected a microservices-based system using Node.js and AWS.",
          location: "Bengaluru"
        }
      ]
    },
    {
      id: "edu-1",
      title: "Education",
      type: "list",
      items: [
        {
          title: "B.Tech in Computer Science",
          subtitle: "Example University of Technology",
          date: "2016 - 2020"
        }
      ]
    },
    {
      id: "skills-1",
      title: "Expertise",
      type: "tags",
      content: "React, Node.js, TypeScript, Next.js, PostgreSQL, Docker, AWS"
    }
  ],
  settings: {
    themeColor: "#000000",
    fontSize: 14,
    lineHeight: 1.6,
    sectionGap: 24,
    template: "bento",
    pagePadding: 20,
    itemGap: 10,
    headerSize: 4.0,
    sectionTitleSize: 11,
    bodySize: 14,
    paperSize: "a4",
    fontFamily: "jakarta",
    headerAlignment: "default"
  }
};

const PRESET_COLORS = [
  { name: "Obsidian", hex: "#000000", type: "archive" },
  { name: "Graphite", hex: "#333333", type: "archive" },
  { name: "Slate", hex: "#ec2828", type: "spectrum" },
  { name: "Saffron", hex: "#e1d41e", type: "spectrum" },
  { name: "Emerald", hex: "#11e12c", type: "spectrum" },
  { name: "Cyan", hex: "#11e1cf", type: "spectrum" },
];

const SettingSlider = ({ label, value, min, max, step, onChange }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-black">{label}</label>
      <span className="text-[10px] font-bold text-black bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">{value}</span>
    </div>
    <input
      type="range"
      min={min} max={max} step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-black"
    />
  </div>
);

const ColorButton = ({ color, active, onClick }: { color: any, active: boolean, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${active ? "border-black scale-110 shadow-lg shadow-black/10" : "border-white shadow-sm hover:shadow-md"}`}
    style={{ backgroundColor: color.hex }}
  >
    {active && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
  </motion.button>
);

export const ResumeBuilder = () => {
  const [data, setData] = useState(DEFAULT_RESUME);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [zoom, setZoom] = useState(0.85);
  const [isAutoFit, setIsAutoFit] = useState(true); // Intelligence toggle
  const [showSettings, setShowSettings] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Advanced Live-Scaling Engine (ResizeObserver)
  useEffect(() => {
    if (!previewContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Only trigger auto-fit if manual mode is off
        if (!isAutoFit) continue;

        const { width } = entry.contentRect;
        if (width === 0) continue;

        const a4Width = 794; // ISO-A4 (794px at 96dpi)
        const fitScale = width / a4Width;

        // Uncapped High-Fidelity Spread
        setZoom(Number(Math.max(Math.min(fitScale, 2.0), 0.35).toFixed(2)));
      }
    });

    resizeObserver.observe(previewContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [isAutoFit]);

  const updateSettings = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  const handleExport = async () => {
    const printContent = document.querySelector(".resume-print-area");
    if (!printContent || isExporting) return;

    setIsExporting(true);

    try {
      // 1. Collect all stylesheets and style blocks from the parent window
      const styleTags = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
        .map((tag) => tag.outerHTML)
        .join("\n");

      const docTitle = `${data.basics?.name ? `${data.basics.name} - Resume` : "Resume"} | instudia`;
      const paperSize = data.settings?.paperSize === "letter" ? "letter" : "A4";

      // 2. Create a clean hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      iframe.style.visibility = "hidden";
      iframe.id = "resume-export-iframe";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) {
        document.body.removeChild(iframe);
        setIsExporting(false);
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${docTitle}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
            ${styleTags}
            <style>
              @page {
                size: ${paperSize};
                margin: 0;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .resume-print-area {
                margin: 0 auto !important;
                box-shadow: none !important;
                border: none !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
          </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      if (iframe.contentWindow) {
        if (iframeDoc.fonts && iframeDoc.fonts.ready) {
          await iframeDoc.fonts.ready;
        }

        // Small grace timeout for layout calculation & rendering
        await new Promise((resolve) => setTimeout(resolve, 300));

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setTimeout(() => {
        const existingIframe = document.getElementById("resume-export-iframe");
        if (existingIframe) {
          document.body.removeChild(existingIframe);
        }
        setIsExporting(false);
      }, 1000);
    }
  };

  const handleZoom = (type: "in" | "out" | "fit") => {
    if (type === "fit") {
      setIsAutoFit(true);
      if (!previewContainerRef.current) return;
      const width = previewContainerRef.current.clientWidth;
      const fitScale = width / 794;
      setZoom(Number(Math.max(Math.min(fitScale, 2.0), 0.35).toFixed(2)));
    } else {
      setIsAutoFit(false);
      setZoom(prev => {
        const next = type === "in" ? prev + 0.1 : prev - 0.1;
        return Number(Math.max(0.2, Math.min(next, 2.5)).toFixed(2));
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-neutral-50 font-jakarta text-black selection:bg-black selection:text-white">

      <div className="relative w-full max-w-[1920px] mx-auto px-6 py-12 md:py-20 flex flex-col gap-6 lg:gap-10">

        {/* Global Header */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 lg:p-14 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center">
                <IconSparkles size={20} className="text-white" />
              </div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Career Suite</h2>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              RESUME <span className="text-neutral-400/60">BUILDER</span>.
            </h1>
            <p className="text-base lg:text-lg font-medium text-neutral-500 max-w-lg leading-relaxed">
              Built with a professional document engine that treats every page like a masterpiece.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowSettings(true)} className="px-8 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-black/10 transition-all hover:-translate-y-1">
              Settings
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2.5 px-8 py-5 bg-brandpurple text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-brandpurple/20 transition-all hover:opacity-90 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isExporting ? (
                <>
                  <IconLoader2 size={16} className="animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <IconDownload size={16} />
                  <span>Export Project</span>
                </>
              )}
            </button>
          </div>
        </motion.header>

        {/* Mobile Navigator */}
        <div className="lg:hidden sticky top-4 z-40 flex justify-center px-4">
          <div className="relative bg-white/80 backdrop-blur-2xl border border-neutral-200 p-1.5 rounded-full shadow-2xl flex items-center gap-1">
            <motion.div
              layoutId="mobileTabIndicator"
              className="absolute bg-black rounded-full"
              animate={{ x: activeTab === "edit" ? 0 : "100%" }}
              style={{
                width: "calc(50% - 6px)",
                height: "calc(100% - 12px)",
                left: "6px"
              }}
            />
            <button
              onClick={() => setActiveTab("edit")}
              className={`relative z-10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "edit" ? "text-white" : "text-neutral-400"}`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`relative z-10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "preview" ? "text-white" : "text-neutral-400"}`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Persistent Grid Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative min-h-[80vh]">

          {/* Editor Column */}
          <div
            className={`transition-all duration-500 ease-out ${activeTab === "preview" ? "opacity-0 translate-y-10 pointer-events-none absolute lg:relative lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto" : "opacity-100 translate-y-0"}`}
          >
            <ResumeForm data={data} setData={setData} />
          </div>

          {/* Preview Column */}
          <div
            className={`sticky top-10 transition-all duration-500 ease-out ${activeTab === "edit" ? "opacity-0 translate-y-10 pointer-events-none absolute lg:relative lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:top-10" : "opacity-100 translate-y-0"}`}
          >
            <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-6 lg:p-12 shadow-sm space-y-10 relative overflow-hidden min-h-[70vh] lg:min-h-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-6 gap-4">
                <div className="flex items-center gap-3">
                  <IconEye size={18} className="text-neutral-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Live Preview</span>
                </div>

                {/* Quick Template Switcher */}
                <div className="flex flex-wrap items-center gap-1 bg-neutral-100/70 p-1 rounded-2xl border border-neutral-200/50">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => updateSettings("template", t.id)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        data.settings.template === t.id
                          ? "bg-black text-white shadow-sm"
                          : "text-neutral-500 hover:text-black hover:bg-white/60"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Controls Overlay */}
              <div className="absolute top-28 right-8 z-20 flex flex-col gap-2 p-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <button onClick={() => handleZoom("in")} className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all"><IconPlus size={18} /></button>
                <div className="h-[1px] bg-white/5 mx-2" />
                <div className="py-2 text-center text-[9px] font-black text-white/50 tracking-tighter">{Math.round(zoom * 100)}%</div>
                <div className="h-[1px] bg-white/5 mx-2" />
                <button onClick={() => handleZoom("out")} className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all"><IconMinus size={18} /></button>
                <div className="h-[1px] bg-white/5 mx-2" />
                <button onClick={() => handleZoom("fit")} className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all"><IconMaximize size={18} /></button>
              </div>

              <div
                ref={previewContainerRef}
                className="relative bg-neutral-50/50 rounded-3xl p-0 border border-neutral-100/50 shadow-inner overflow-auto max-h-[85vh] md:max-h-[92vh] min-h-[50vh] custom-scrollbar flex justify-center group transition-all"
              >
                <div
                  className="transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) origin-top center will-change-transform"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
                >
                  <div className="bg-white shadow-[0_40px_120px_-15px_rgba(0,0,0,0.12)] border border-neutral-100">
                    <ResumePreview data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Action Pull-up */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white z-[110] shadow-[-30px_0_90px_rgba(0,0,0,0.2)] flex flex-col"
            >
              <div className="p-10 border-b border-neutral-50 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Settings</h2>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1 text-ellipsis overflow-hidden whitespace-nowrap">Granular Calibration</p>
                </div>
                <button onClick={() => setShowSettings(false)} className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-black transition-colors">
                  <IconPlus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                {/* Template Picker */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Architectural Type</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => updateSettings("template", t.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${data.settings.template === t.id ? "border-black bg-black text-white shadow-xl" : "border-neutral-100 hover:border-neutral-200"}`}
                      >
                        <div className="text-xs font-black uppercase tracking-wider">{t.label}</div>
                        <div className={`text-[10px] font-medium mt-1 ${data.settings.template === t.id ? "text-neutral-400" : "text-neutral-400"}`}>
                          {t.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paper Standard Picker */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Document Paper Standard</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAPER_SIZES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => updateSettings("paperSize", p.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          (data.settings.paperSize || "a4") === p.id
                            ? "border-black bg-black text-white shadow-lg"
                            : "border-neutral-100 hover:border-neutral-200 bg-neutral-50/50"
                        }`}
                      >
                        <div className="text-xs font-black uppercase tracking-wider">{p.label}</div>
                        <div className={`text-[10px] font-medium mt-0.5 ${(data.settings.paperSize || "a4") === p.id ? "text-neutral-300" : "text-neutral-400"}`}>
                          {p.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Engine Picker */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Typography Engine</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => updateSettings("fontFamily", f.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          (data.settings.fontFamily || "jakarta") === f.id
                            ? "border-black bg-black text-white shadow-lg"
                            : "border-neutral-100 hover:border-neutral-200 bg-neutral-50/50"
                        }`}
                      >
                        <div className="text-[11px] font-black tracking-tight">{f.label}</div>
                        <div className={`text-[9px] font-medium mt-0.5 ${(data.settings.fontFamily || "jakarta") === f.id ? "text-neutral-300" : "text-neutral-400"}`}>
                          {f.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Header Style */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Header Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {HEADER_ALIGNMENTS.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => updateSettings("headerAlignment", h.id)}
                        className={`py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                          (data.settings.headerAlignment || "default") === h.id
                            ? "border-black bg-black text-white shadow-lg"
                            : "border-neutral-100 hover:border-neutral-200 bg-neutral-50/50"
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase tracking-wider">{h.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Color Palette</label>
                  <div className="flex flex-wrap gap-4 px-2">
                    {PRESET_COLORS.map((c) => (
                      <ColorButton key={c.hex} color={c} active={data.settings.themeColor === c.hex} onClick={() => updateSettings("themeColor", c.hex)} />
                    ))}
                  </div>
                </div>

                <div className="space-y-8 pt-6 border-t border-neutral-50">
                  <SettingSlider label="Body Typography" value={data.settings.bodySize} min={10} max={18} step={1} onChange={(v: any) => updateSettings("bodySize", v)} />
                  <SettingSlider label="Vertical Rhythm" value={data.settings.lineHeight} min={1.2} max={2} step={0.1} onChange={(v: any) => updateSettings("lineHeight", v)} />
                  <SettingSlider label="Atmospheric Spacing" value={data.settings.sectionGap} min={12} max={64} step={4} onChange={(v: any) => updateSettings("sectionGap", v)} />
                  <SettingSlider label="ISO Margin (mm)" value={data.settings.pagePadding} min={10} max={40} step={2} onChange={(v: any) => updateSettings("pagePadding", v)} />
                  <SettingSlider label="Structural Title Size" value={data.settings.sectionTitleSize} min={9} max={16} step={1} onChange={(v: any) => updateSettings("sectionTitleSize", v)} />
                </div>
              </div>

              <div className="p-10 bg-neutral-50 border-t border-neutral-100">
                <button onClick={() => setShowSettings(false)} className="w-full py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                  Apply Configurations
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
