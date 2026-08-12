"use client";

import React, { useState, useEffect, useRef } from "react";

function hslToRgbHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const rgb = [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  const hex =
    "#" +
    (1 << 24 | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2])
      .toString(16)
      .slice(1)
      .toUpperCase();
  return { rgb: rgb.join(", "), hex };
}

export default function ColorExplorerWidget() {
  const [h, setH] = useState(340);
  const [s, setS] = useState(80);
  const [l, setL] = useState(50);
  const [copyText, setCopyText] = useState("COPY COLORS");

  const { rgb, hex } = hslToRgbHex(h, s, l);

  let satText = s > 70 ? "Vivid & Intense" : s > 30 ? "Balanced Chroma" : "Muted & Mellow";
  if (s === 0) satText = "Achromatic (Gray)";

  let lightText = l > 80 ? "High-Key / Light" : l > 30 ? "Balanced Mid-Tone" : "Deep / Shadowed";
  if (l === 0) lightText = "Pure Black";
  if (l === 100) lightText = "Pure White";

  const handleCopy = () => {
    const text = `HEX: ${hex} | RGB: rgb(${rgb}) | HSL: hsl(${h}, ${s}%, ${l}%)`;
    navigator.clipboard.writeText(text);
    setCopyText("COPIED!");
    setTimeout(() => setCopyText("COPY COLORS"), 1500);
  };

  const tints = Array.from({ length: 5 }).map((_, i) => l + ((95 - l) / 4) * i);
  const tones = Array.from({ length: 5 }).map((_, i) => s - (s / 4) * i);
  const shades = Array.from({ length: 5 }).map((_, i) => l - ((l - 10) / 4) * i);

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
          Color Property Explorer
        </h3>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#fff", color: "#000", padding: "0.25rem 0.5rem" }}>
          HSL DIMENSIONS
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* LEFT COLUMN: Controls */}
        <div style={{ flex: "1 1 350px", borderRight: "4px solid #000", padding: "2rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ padding: "1.25rem", border: "3px solid #000", background: "#fff", boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
            <p style={{ margin: 0, fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase" }}>
              {satText}
            </p>
            <p style={{ margin: "0.25rem 0 0 0", fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase", color: "#64748b" }}>
              {lightText}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Hue (H)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{h}°</span>
              </label>
              <input type="range" min="0" max="360" value={h} onChange={(e) => setH(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>

            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Saturation (S)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{s}%</span>
              </label>
              <input type="range" min="0" max="100" value={s} onChange={(e) => setS(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>

            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Lightness (L)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{l}%</span>
              </label>
              <input type="range" min="0" max="100" value={l} onChange={(e) => setL(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, #000, hsl(${h}, ${s}%, 50%), #fff)`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Swatch & Output */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", padding: "2rem", background: "#fff", gap: "1.5rem" }}>
          
          <div style={{ height: "200px", background: `hsl(${h}, ${s}%, ${l}%)`, border: "4px solid #000", boxShadow: "6px 6px 0px rgba(0,0,0,1)" }}></div>
          
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#f1f5f9", border: "2px solid #000", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", boxShadow: "2px 2px 0px #000" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 900 }}>HEX</span>
              <span style={{ fontFamily: "monospace", fontSize: "0.9rem", fontWeight: 700 }}>{hex}</span>
            </div>
            <div style={{ flex: 1, background: "#f1f5f9", border: "2px solid #000", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", boxShadow: "2px 2px 0px #000" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 900 }}>RGB</span>
              <span style={{ fontFamily: "monospace", fontSize: "0.9rem", fontWeight: 700 }}>{rgb}</span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{ padding: "1rem", background: "#FFE01B", border: "3px solid #000", fontWeight: 900, fontSize: "1rem", cursor: "pointer", boxShadow: "4px 4px 0px #000", transition: "all 0.1s", outline: "none" }}
            onMouseDown={(e) => { e.currentTarget.style.boxShadow = "0px 0px 0px #000"; e.currentTarget.style.transform = "translate(4px, 4px)"; }}
            onMouseUp={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0px #000"; e.currentTarget.style.transform = "none"; }}
          >
            {copyText}
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION: Variations */}
      <div style={{ borderTop: "4px solid #000", background: "#f8fafc", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        <div>
          <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 900, textTransform: "uppercase", fontSize: "0.9rem" }}>Tints (Base + White)</h4>
          <div style={{ display: "flex", height: "60px", border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}>
            {tints.map((stepL, i) => (
              <div key={i} style={{ flex: 1, background: `hsl(${h}, ${s}%, ${stepL}%)`, borderRight: i < tints.length - 1 ? "2px solid #000" : "none" }}></div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 900, textTransform: "uppercase", fontSize: "0.9rem" }}>Tones (Base + Gray)</h4>
          <div style={{ display: "flex", height: "60px", border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}>
            {tones.map((stepS, i) => (
              <div key={i} style={{ flex: 1, background: `hsl(${h}, ${stepS}%, ${l}%)`, borderRight: i < tones.length - 1 ? "2px solid #000" : "none" }}></div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 900, textTransform: "uppercase", fontSize: "0.9rem" }}>Shades (Base + Black)</h4>
          <div style={{ display: "flex", height: "60px", border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}>
            {shades.map((stepL, i) => (
              <div key={i} style={{ flex: 1, background: `hsl(${h}, ${s}%, ${stepL}%)`, borderRight: i < shades.length - 1 ? "2px solid #000" : "none" }}></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
