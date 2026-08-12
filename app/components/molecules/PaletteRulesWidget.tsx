"use client";

import React, { useState } from "react";

export default function PaletteRulesWidget() {
  const [hue, setHue] = useState(220);
  const [mode, setMode] = useState<"3color" | "4color">("3color");

  // Calculate colors based on the mode and base hue
  // 60%: Neutral Light Background
  const bg60 = `hsl(${hue}, 20%, 96%)`;
  const bg60Text = `hsl(${hue}, 30%, 15%)`;

  // 30% or 20%: Structural Element
  const structVol = mode === "3color" ? 30 : 20;
  const structColor = `hsl(${hue}, 25%, 85%)`;

  // 10%: Accent 1
  const accent1H = (hue + 180) % 360;
  const accent1 = `hsl(${accent1H}, 85%, 45%)`;

  // 10%: Accent 2 (Only in 4color mode)
  const accent2H = (hue + 60) % 360;
  const accent2 = mode === "4color" ? `hsl(${accent2H}, 90%, 50%)` : "";

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "900px",
        margin: "3rem auto",
        padding: "1.5rem",
        border: "2px solid #000",
        background: "#fff",
        boxShadow: "8px 8px 0px rgba(0,0,0,1)",
        color: "#000",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem", borderBottom: "2px solid #000", paddingBottom: "1rem" }}>
        <span style={{ background: "#000", color: "#fff", padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Interactive Volume Explorer
        </span>
        <h3 style={{ margin: 0, border: "none", padding: 0, textTransform: "uppercase", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
          The Distribution Rules
        </h3>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {/* LEFT COLUMN: Controls & Rules */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ padding: "1rem", border: "2px solid #000", background: "#f8f9fa" }}>
            <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, marginBottom: "0.75rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
              Base Hue: <span>{hue}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              style={{ width: "100%", marginBottom: "1.5rem", appearance: "none", height: "8px", background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", borderRadius: "4px", outline: "none" }}
            />

            <label style={{ display: "block", fontWeight: 800, marginBottom: "0.75rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
              Distribution Mode:
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setMode("3color")}
                style={{ flex: 1, padding: "0.5rem", fontWeight: 800, border: "2px solid #000", cursor: "pointer", transition: "all 0.1s", background: mode === "3color" ? "#000" : "#fff", color: mode === "3color" ? "#fff" : "#000" }}
              >
                60-30-10
              </button>
              <button
                onClick={() => setMode("4color")}
                style={{ flex: 1, padding: "0.5rem", fontWeight: 800, border: "2px solid #000", cursor: "pointer", transition: "all 0.1s", background: mode === "4color" ? "#000" : "#fff", color: mode === "4color" ? "#fff" : "#000" }}
              >
                60-20-10-10
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", border: "1px solid #000", padding: "0.5rem" }}>
              <div style={{ width: "30px", height: "30px", background: bg60, border: "1px solid #000", flexShrink: 0 }}></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>60% - Primary Background</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Dominates the canvas (Neutral Tint).</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", border: "1px solid #000", padding: "0.5rem" }}>
              <div style={{ width: "30px", height: "30px", background: structColor, border: "1px solid #000", flexShrink: 0 }}></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>{structVol}% - Structural Elements</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Cards, Sidebars, Menus (Subtle Tone).</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", border: "1px solid #000", padding: "0.5rem" }}>
              <div style={{ width: "30px", height: "30px", background: accent1, border: "1px solid #000", flexShrink: 0 }}></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>10% - Primary Accent</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>CTA Buttons, Active States (Complement).</div>
              </div>
            </div>
            {mode === "4color" && (
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", border: "1px solid #000", padding: "0.5rem" }}>
                <div style={{ width: "30px", height: "30px", background: accent2, border: "1px solid #000", flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>10% - Secondary Accent</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Badges, Highlights (Triadic/Analogous).</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Mock UI View */}
        <div style={{ flex: "1 1 300px", minWidth: "300px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0.75rem", background: "#000", color: "#fff", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Live Mockup Preview
          </div>
          <div style={{ flexGrow: 1, border: "2px solid #000", borderTop: "none", background: bg60, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
            
            {/* Background Label */}
            <div style={{ position: "absolute", top: "1rem", right: "1rem", fontSize: "4rem", fontWeight: 900, opacity: 0.05, lineHeight: 0.8, color: bg60Text }}>
              60%
            </div>

            {/* Mock Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div style={{ width: "120px", height: "24px", background: structColor, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px" }}></div>
              <div style={{ width: "40px", height: "40px", background: structColor, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)" }}></div>
            </div>

            {/* Mock Content Card */}
            <div style={{ background: structColor, padding: "1.5rem", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ width: "60%", height: "20px", background: bg60Text, opacity: 0.8, borderRadius: "4px" }}></div>
                {mode === "4color" && (
                  <div style={{ background: accent2, color: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>
                    New Alert
                  </div>
                )}
              </div>
              
              <div style={{ width: "100%", height: "8px", background: "rgba(0,0,0,0.1)", borderRadius: "4px", marginBottom: "0.5rem" }}></div>
              <div style={{ width: "85%", height: "8px", background: "rgba(0,0,0,0.1)", borderRadius: "4px", marginBottom: "1.5rem" }}></div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: bg60Text, opacity: 0.6 }}>
                  {mode === "3color" ? "30% Structure" : "20% Structure"}
                </div>
                <button style={{ background: accent1, color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: 800, fontSize: "0.75rem", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}>
                  Primary Action
                </button>
              </div>
            </div>

            {/* Mock Secondary Cards */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <div style={{ flex: 1, height: "60px", background: structColor, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }}></div>
              <div style={{ flex: 1, height: "60px", background: structColor, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }}></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
