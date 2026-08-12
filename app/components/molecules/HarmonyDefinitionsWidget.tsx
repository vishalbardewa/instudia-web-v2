"use client";

import React, { useState } from "react";

type HarmonyType = "Monochromatic" | "Complementary" | "Analogous" | "Triadic" | "Split-Complementary";

const harmoniesData: Record<HarmonyType, {
  category: string;
  geometry: string;
  impact: string;
  application: string;
  getColors: (h: number) => { label: string; h: number; s: number; l: number }[];
}> = {
  "Monochromatic": {
    category: "1-Color Scheme",
    geometry: "A single base hue modified entirely through variations in saturation and lightness (tints, tones, shades).",
    impact: "Clean, minimalist, deeply cohesive, and highly professional.",
    application: "Data dashboards, elegant corporate branding, and layouts where high information density requires low color distraction.",
    getColors: (h) => [
      { label: "Base", h, s: 100, l: 50 },
      { label: "Tint", h, s: 100, l: 85 },
      { label: "Tone", h, s: 30, l: 50 },
      { label: "Shade", h, s: 100, l: 20 },
    ],
  },
  "Complementary": {
    category: "2-Color Scheme",
    geometry: "Two hues positioned at exactly 180° opposite intervals on the color wheel.",
    impact: "Maximum contrast, high energy, and striking separation.",
    application: "Call-to-action (CTA) buttons, error states, and focal points designed to immediately draw the eye.",
    getColors: (h) => [
      { label: "Base", h, s: 100, l: 50 },
      { label: "Complement", h: (h + 180) % 360, s: 100, l: 50 },
    ],
  },
  "Analogous": {
    category: "3-Color Scheme",
    geometry: "Three hues positioned adjacent to each other, typically separated by 30° to 45° intervals.",
    impact: "Natural, serene, and incredibly harmonious. Reflects patterns frequently found in nature.",
    application: "Background gradients, thematic illustrations, and overarching brand identities where low-tension visuals are desired.",
    getColors: (h) => [
      { label: "Base - 30°", h: (h + 330) % 360, s: 100, l: 50 },
      { label: "Base", h, s: 100, l: 50 },
      { label: "Base + 30°", h: (h + 30) % 360, s: 100, l: 50 },
    ],
  },
  "Triadic": {
    category: "3-Color Scheme",
    geometry: "Three hues evenly spaced at 120° intervals, forming a perfect equilateral triangle across the color wheel.",
    impact: "Vibrant, balanced, and playful. Distributes visual weight evenly without overpowering.",
    application: "Complex illustrations, consumer-facing applications, and educational platforms requiring distinct color-coding.",
    getColors: (h) => [
      { label: "Base", h, s: 100, l: 50 },
      { label: "Triad 1", h: (h + 120) % 360, s: 100, l: 50 },
      { label: "Triad 2", h: (h + 240) % 360, s: 100, l: 50 },
    ],
  },
  "Split-Complementary": {
    category: "3-Color Scheme",
    geometry: "A base hue paired with the two hues immediately adjacent to its direct complement (an isosceles triangle).",
    impact: "Retains rich contrast like the standard complementary scheme but significantly reduces visual tension.",
    application: "Primary branding and complex interface design where strong contrast is needed without exhausting the user's eyes.",
    getColors: (h) => [
      { label: "Base", h, s: 100, l: 50 },
      { label: "Split 1", h: (h + 150) % 360, s: 100, l: 50 },
      { label: "Split 2", h: (h + 210) % 360, s: 100, l: 50 },
    ],
  },
};

export default function HarmonyDefinitionsWidget() {
  const [activeTab, setActiveTab] = useState<HarmonyType>("Complementary");
  const [baseHue, setBaseHue] = useState(220); // Blue

  const activeData = harmoniesData[activeTab];
  const generatedColors = activeData.getColors(baseHue);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "900px",
        margin: "3rem auto",
        border: "4px solid #000",
        background: "#fff",
        boxShadow: "12px 12px 0px rgba(0,0,0,1)",
        color: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "1.25rem 1.5rem", background: "#000", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, textTransform: "uppercase", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.05em" }}>
          Essential Harmonies Explorer
        </h3>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#fff", color: "#000", padding: "0.25rem 0.5rem" }}>
          INTERACTIVE GUIDE
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "4px solid #000" }}>
        {Object.keys(harmoniesData).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as HarmonyType)}
              style={{
                flex: "1 1 auto",
                padding: "1rem",
                fontWeight: 900,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                background: isActive ? "#FFE01B" : "#f1f5f9",
                border: "none",
                borderRight: "2px solid #000",
                borderBottom: isActive ? "none" : "2px solid #000",
                cursor: "pointer",
                transition: "all 0.1s",
                boxShadow: isActive ? "inset 0px -4px 0px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* LEFT COLUMN: Data Details */}
        <div style={{ flex: "1 1 350px", borderRight: "4px solid #000", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", color: "#64748b", marginBottom: "0.25rem" }}>
              {activeData.category}
            </div>
            <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              {activeTab}
            </h2>
          </div>

          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "0.25rem" }}>Geometry</h4>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5, color: "#334155" }}>{activeData.geometry}</p>
          </div>

          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "0.25rem" }}>Visual Impact</h4>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5, color: "#334155" }}>{activeData.impact}</p>
          </div>

          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "0.25rem" }}>Real-World Application</h4>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5, color: "#334155" }}>{activeData.application}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Visualizer */}
        <div style={{ flex: "1 1 350px", background: "#f8fafc", padding: "2rem", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.75rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
              <span>Test Base Hue</span>
              <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{baseHue}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={baseHue}
              onChange={(e) => setBaseHue(parseInt(e.target.value))}
              style={{ 
                width: "100%", 
                appearance: "none", 
                height: "16px", 
                background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", 
                border: "2px solid #000",
                outline: "none",
                boxShadow: "2px 2px 0px #000"
              }}
            />
          </div>

          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
            <h4 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "#64748b" }}>
              Generated Palette
            </h4>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              {generatedColors.map((color, idx) => {
                const isBase = color.label.includes("Base");
                return (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px rgba(0,0,0,1)",
                        borderRadius: isBase ? "50%" : "0", // Circle for base, square for derived
                      }}
                    ></div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", background: isBase ? "#000" : "transparent", color: isBase ? "#fff" : "#000", padding: isBase ? "0.1rem 0.4rem" : "0" }}>
                      {color.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
