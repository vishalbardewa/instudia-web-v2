"use client";

import React, { useState } from "react";

export default function HslRelationshipWidget() {
  const [hue, setHue] = useState(340);
  const [sat, setSat] = useState(100);
  const [light, setLight] = useState(50);

  // Base colors for Math
  const baseColor = `hsl(${hue}, ${sat}%, ${light}%)`;
  const pureWhite = `hsl(${hue}, ${sat}%, 100%)`; // #FFFFFF
  const pureBlack = `hsl(${hue}, ${sat}%, 0%)`;   // #000000
  const neutralGray = `hsl(${hue}, 0%, ${light}%)`;  // #808080

  // Result colors
  const tintColor = `hsl(${hue}, ${sat}%, ${Math.min(100, light + (100 - light) * 0.7)}%)`;
  const toneColor = `hsl(${hue}, ${Math.max(0, sat * 0.3)}%, ${light}%)`;
  const shadeColor = `hsl(${hue}, ${sat}%, ${Math.max(0, light * 0.3)}%)`;

  const MathRow = ({ title, base, modifier, result, formula, label }: any) => (
    <div style={{ padding: "1.5rem", borderBottom: "2px solid #000", background: "#fff", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</h4>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#f1f5f9", padding: "0.25rem 0.5rem", border: "1px solid #000" }}>{formula}</span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        {/* Base */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "60px", height: "60px", background: base, border: "2px solid #000", boxShadow: "4px 4px 0px #000" }}></div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>BASE</span>
        </div>
        
        <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>+</div>
        
        {/* Modifier */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "60px", height: "60px", background: modifier, border: "2px solid #000", boxShadow: "4px 4px 0px #000" }}></div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>{label}</span>
        </div>
        
        <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>=</div>
        
        {/* Result */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "80px", height: "80px", background: result, border: "2px solid #000", boxShadow: "6px 6px 0px #000" }}></div>
          <span style={{ fontSize: "0.85rem", fontWeight: 900 }}>{title.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "900px",
        margin: "3rem auto",
        border: "4px solid #000",
        background: "#f8fafc",
        boxShadow: "12px 12px 0px rgba(0,0,0,1)",
        color: "#000",
      }}
    >
      <div style={{ padding: "1.5rem", background: "#000", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, textTransform: "uppercase", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.05em" }}>
          HSL Relationship Map
        </h3>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#fff", color: "#000", padding: "0.25rem 0.5rem" }}>
          INTERACTIVE DIAGRAM
        </span>
      </div>

      <div style={{ padding: "1.5rem", borderBottom: "4px solid #000", background: "#fff", display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* Hue Slider */}
        <div>
          <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
            <span>Base Hue (H)</span>
            <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{hue}°</span>
          </label>
          <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
        </div>

        {/* Saturation Slider */}
        <div>
          <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
            <span>Saturation (S)</span>
            <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{sat}%</span>
          </label>
          <input type="range" min="0" max="100" value={sat} onChange={(e) => setSat(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, hsl(${hue}, 0%, ${light}%), hsl(${hue}, 100%, ${light}%))`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
        </div>

        {/* Lightness Slider */}
        <div>
          <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginBottom: "0.5rem", textTransform: "uppercase", fontSize: "0.85rem" }}>
            <span>Lightness (L)</span>
            <span style={{ background: "#000", color: "#fff", padding: "0.1rem 0.5rem" }}>{light}%</span>
          </label>
          <input type="range" min="0" max="100" value={light} onChange={(e) => setLight(parseInt(e.target.value))} style={{ width: "100%", appearance: "none", height: "12px", background: `linear-gradient(to right, hsl(${hue}, ${sat}%, 0%), hsl(${hue}, ${sat}%, 50%), hsl(${hue}, ${sat}%, 100%))`, border: "2px solid #000", outline: "none", boxShadow: "2px 2px 0px #000" }} />
        </div>

      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* DIMENSIONS */}
        <div style={{ flex: "1 1 300px", borderRight: "4px solid #000" }}>
          <div style={{ padding: "1rem", background: "#f1f5f9", borderBottom: "2px solid #000", fontWeight: 900, textTransform: "uppercase", fontSize: "0.85rem" }}>
            The 3 Dimensions
          </div>
          
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Hue */}
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Hue (H) <span style={{ color: "#64748b", fontWeight: 600 }}>0° - 360°</span></div>
              <div style={{ position: "relative", height: "24px", background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)", border: "2px solid #000" }}>
                <div style={{ position: "absolute", left: `${(hue / 360) * 100}%`, top: "-4px", bottom: "-4px", width: "4px", background: "#000", marginLeft: "-2px" }}></div>
              </div>
            </div>

            {/* Saturation */}
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Saturation (S) <span style={{ color: "#64748b", fontWeight: 600 }}>0% - 100%</span></div>
              <div style={{ position: "relative", height: "24px", background: `linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`, border: "2px solid #000" }}>
                <div style={{ position: "absolute", left: `${sat}%`, top: "-4px", bottom: "-4px", width: "4px", background: "#000", marginLeft: "-2px" }}></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", fontWeight: 800, marginTop: "0.25rem" }}>
                <span>NEUTRAL GRAY</span>
                <span>VIVID PURE</span>
              </div>
            </div>

            {/* Lightness */}
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Lightness (L) <span style={{ color: "#64748b", fontWeight: 600 }}>0% - 100%</span></div>
              <div style={{ position: "relative", height: "24px", background: `linear-gradient(to right, hsl(${hue}, 100%, 0%), hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 100%))`, border: "2px solid #000" }}>
                <div style={{ position: "absolute", left: `${light}%`, top: "-4px", bottom: "-4px", width: "4px", background: "#000", marginLeft: "-2px" }}></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", fontWeight: 800, marginTop: "0.25rem" }}>
                <span>BLACK</span>
                <span>PURE</span>
                <span>WHITE</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLOR MATH */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "1rem", background: "#f1f5f9", borderBottom: "2px solid #000", fontWeight: 900, textTransform: "uppercase", fontSize: "0.85rem" }}>
            Color Modification Math
          </div>
          
          <MathRow 
            title="Tint" 
            base={baseColor} 
            modifier={pureWhite} 
            label="WHITE"
            result={tintColor} 
            formula="Lightness > 50%" 
          />
          <MathRow 
            title="Tone" 
            base={baseColor} 
            modifier={neutralGray} 
            label="GRAY"
            result={toneColor} 
            formula="Saturation < 100%" 
          />
          <MathRow 
            title="Shade" 
            base={baseColor} 
            modifier={pureBlack} 
            label="BLACK"
            result={shadeColor} 
            formula="Lightness < 50%" 
          />
        </div>
      </div>
    </div>
  );
}
