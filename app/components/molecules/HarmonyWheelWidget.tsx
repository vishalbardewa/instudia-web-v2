"use client";

import React, { useState, useRef, useEffect } from "react";

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

function renderSwatch(title: string, h: number, s: number, l: number, index: number) {
  const { rgb, hex } = hslToRgbHex(h, s, l);
  return (
    <div
      key={index}
      style={{
        flex: "1 1 180px",
        border: "3px solid #000",
        background: "#fff",
        boxShadow: "6px 6px 0px rgba(0,0,0,1)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ height: "100px", background: `hsl(${h}, ${s}%, ${l}%)`, borderBottom: "3px solid #000" }}></div>
      <div style={{ padding: "1rem", background: "#fff", flexGrow: 1 }}>
        <div style={{ fontWeight: 900, marginBottom: "1rem", color: "#000", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ background: "#f8fafc", border: "2px solid #000", padding: "0.25rem 0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#000", fontSize: "0.65rem", fontWeight: 900 }}>HEX</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", userSelect: "all", fontWeight: 700 }}>{hex}</span>
          </div>
          <div style={{ background: "#f8fafc", border: "2px solid #000", padding: "0.25rem 0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#000", fontSize: "0.65rem", fontWeight: 900 }}>RGB</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", userSelect: "all", fontWeight: 700 }}>{rgb}</span>
          </div>
          <div style={{ background: "#f8fafc", border: "2px solid #000", padding: "0.25rem 0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#000", fontSize: "0.65rem", fontWeight: 900 }}>HSL</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", userSelect: "all", fontWeight: 700 }}>{h}°, {s}%, {l}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HarmonyWheelWidget() {
  const [mode, setMode] = useState("monochromatic");
  const [baseH, setBaseH] = useState(0);
  const [offset, setOffset] = useState(30);
  const [s, setS] = useState(80);
  const [l, setL] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const CX = 125;
  const CY = 125;
  const R = 100;

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | MouseEvent) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - CX;
    const y = e.clientY - rect.top - CY;
    let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    setBaseH(Math.round(angle));
  };

  let angles: number[] = [];
  let roles: string[] = [];
  let summaryText = "";

  if (mode === "monochromatic") {
    angles = [baseH];
    roles = ["Base Hue"];
    summaryText =
      "Monochromatic mode uses a single hue. Variations are created purely by adjusting saturation and lightness, creating a highly cohesive and calming palette.";
  } else if (mode === "complementary") {
    angles = [baseH, (baseH + 180) % 360];
    roles = ["Base Hue", "Complement"];
    summaryText =
      "Complementary mode selects two hues positioned 180° apart on the color wheel. This creates maximum visual contrast and high energy, ideal for calls to action.";
  } else if (mode === "analogous") {
    angles = [baseH, (baseH + 30) % 360, (baseH + 330) % 360];
    roles = ["Base Hue", "Analogous Right", "Analogous Left"];
    summaryText =
      "Analogous mode groups three adjacent hues. This low-contrast harmony naturally occurs in the environment, offering a serene, visually pleasing experience.";
  } else if (mode === "triadic") {
    angles = [baseH, (baseH + 120) % 360, (baseH + 240) % 360];
    roles = ["Base Hue", "Triad 1", "Triad 2"];
    summaryText =
      "Triadic mode forms an equilateral triangle (120° apart). It maintains high contrast but feels more balanced and vibrant than a direct complementary scheme.";
  } else if (mode === "split") {
    angles = [baseH, (baseH + 150) % 360, (baseH + 210) % 360];
    roles = ["Base Hue", "Split Complement 1", "Split Complement 2"];
    summaryText =
      "Split-Complementary mode pairs a base hue with the two colors adjacent to its complement. It offers strong contrast with reduced tension and jarring vibration.";
  } else if (mode === "tetradic") {
    angles = [baseH, (baseH + offset) % 360, (baseH + 180) % 360, (baseH + 180 + offset) % 360];
    roles = ["Base Hue", "Accent 1", "Complement 1", "Complement 2"];
    summaryText =
      "Tetradic (Rectangular) mode utilizes two pairs of complementary colors. Adjusting the offset angle controls the grouping tightness, requiring one color to dominate to prevent chaos.";
  } else if (mode === "quadratic") {
    angles = [baseH, (baseH + 90) % 360, (baseH + 180) % 360, (baseH + 270) % 360];
    roles = ["Base Hue", "Accent 1", "Complement 1", "Accent 2"];
    summaryText =
      "Quadratic (Square) mode forms a perfect square with four colors evenly spaced at 90° intervals, giving equal, dynamic weight to all hues in the palette.";
  }

  const modeOptions = {
    monochromatic: "Monochromatic",
    complementary: "Complementary (180°)",
    analogous: "Analogous (±30°)",
    triadic: "Triadic (120°)",
    split: "Split-Complementary (150°, 210°)",
    tetradic: "Tetradic / Rectangular",
    quadratic: "Quadratic / Square (90°)",
  };

  const points =
    angles.length > 1
      ? angles
        .map((a) => {
          const rad = ((a - 90) * Math.PI) / 180;
          return `${CX + R * Math.cos(rad)},${CY + R * Math.sin(rad)}`;
        })
        .join(" ")
      : "";

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1000px",
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
          Harmony Studio
        </h3>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#fff", color: "#000", padding: "0.25rem 0.5rem" }}>
          UNIFIED COLOR WHEEL
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>

        {/* LEFT COLUMN: Controls & Wheel */}
        <div style={{ flex: "1 1 350px", borderRight: "4px solid #000", padding: "2rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "2rem" }}>

          <div style={{ position: "relative", width: "250px", height: "250px", margin: "0 auto", userSelect: "none" }}>
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "25px",
                right: "25px",
                bottom: "25px",
                borderRadius: "50%",
                background:
                  "conic-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))",
                opacity: 1,
                border: "2px solid #000"
              }}
            ></div>
            <svg
              ref={svgRef}
              viewBox="0 0 250 250"
              onMouseMove={handleMouseMove as any}
              style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible", zIndex: 10 }}
            >
              <circle cx="125" cy="125" r="100" fill="none" stroke="#000" strokeWidth="4" />
              <polygon points={points} fill="rgba(0,0,0,0.05)" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
              {angles.map((a, i) => {
                const rad = ((a - 90) * Math.PI) / 180;
                const x = CX + R * Math.cos(rad);
                const y = CY + R * Math.sin(rad);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === 0 ? 10 : 8}
                    fill={`hsl(${a}, ${s}%, ${l}%)`}
                    stroke={i === 0 ? "#fff" : "#000"}
                    strokeWidth="3"
                    style={{ cursor: i === 0 ? "pointer" : "default" }}
                    onMouseDown={() => {
                      if (i === 0) setIsDragging(true);
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 900, textTransform: "uppercase", fontSize: "0.85rem" }}>
                Harmony Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "2px solid #000",
                  fontFamily: "inherit",
                  fontWeight: 800,
                  boxShadow: "2px 2px 0px #000",
                  background: "#fff"
                }}
              >
                {Object.entries(modeOptions).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Base Hue (H)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{baseH}°</span>
              </label>
              <input type="range" min="0" max="360" value={baseH} onChange={(e) => setBaseH(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>

            {mode === "tetradic" && (
              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                  <span>Rectangular Offset</span>
                  <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{offset}°</span>
                </label>
                <input type="range" min="30" max="60" value={offset} onChange={(e) => setOffset(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: "#f1f5f9", border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
              </div>
            )}

            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Saturation (S)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{s}%</span>
              </label>
              <input type="range" min="0" max="100" value={s} onChange={(e) => setS(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, hsl(${baseH}, 0%, ${l}%), hsl(${baseH}, 100%, ${l}%))`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>

            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
                <span>Lightness (L)</span>
                <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{l}%</span>
              </label>
              <input type="range" min="0" max="100" value={l} onChange={(e) => setL(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, hsl(${baseH}, ${s}%, 0%), hsl(${baseH}, ${s}%, 50%), hsl(${baseH}, ${s}%, 100%))`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Swatches & Info */}
        <div style={{ flex: "1 1 450px", display: "flex", flexDirection: "column", padding: "2rem", background: "#fff" }}>
          <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "3px solid #000", background: "#f1f5f9", boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 900, textTransform: "uppercase" }}>
              {modeOptions[mode as keyof typeof modeOptions]}
            </h4>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "#334155", fontWeight: 500 }}>
              {summaryText}
            </p>
          </div>

          <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.9rem", fontWeight: 900, textTransform: "uppercase", color: "#64748b" }}>
            Generated Palette
          </h4>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {mode === "monochromatic" ? (
              <>
                {renderSwatch("Base Hue", baseH, s, l, 0)}
                {renderSwatch("Tint", baseH, s, Math.min(l + 30, 95), 1)}
                {renderSwatch("Shade", baseH, s, Math.max(l - 30, 10), 2)}
              </>
            ) : (
              angles.map((a, i) => renderSwatch(roles[i], a, s, l, i))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

