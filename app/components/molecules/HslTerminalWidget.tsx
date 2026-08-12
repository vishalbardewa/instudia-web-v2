"use client";

import React, { useState, useEffect, useRef } from "react";

export default function HslTerminalWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const lines = [
    { text: "instudia@color-theory ~ % ./analyze-hsl", delay: 0 },
    { text: "[INITIALIZING DIMENSIONAL MAPPING...]", delay: 600, color: "#10b981" },
    { text: " ", delay: 800 },
    { text: "+-----------------------------------------------------------+", delay: 900, color: "#6b7280" },
    { text: "| DIMENSIONAL MAPPING OF HSL                                |", delay: 1000, color: "#e5e7eb", bold: true },
    { text: "+-----------------------------------------------------------+", delay: 1100, color: "#6b7280" },
    { text: "| ", delay: 1200, inline: true, color: "#6b7280" },
    { text: "Base Hue (H)  ", delay: 1200, inline: true, color: "#ec4899", bold: true },
    { text: "-> Angular position on 360° wheel           |", delay: 1200, color: "#9ca3af" },
    { text: "|                  (e.g., 0° Red, 120° Green, 240° Blue)    |", delay: 1300, color: "#6b7280" },
    { text: "| ", delay: 1400, inline: true, color: "#6b7280" },
    { text: "Saturation (S)", delay: 1400, inline: true, color: "#3b82f6", bold: true },
    { text: "-> Distance from neutral gray axis          |", delay: 1400, color: "#9ca3af" },
    { text: "|                  0% (Neutral) ------------> 100% (Vivid)  |", delay: 1500, color: "#6b7280" },
    { text: "| ", delay: 1600, inline: true, color: "#6b7280" },
    { text: "Lightness (L) ", delay: 1600, inline: true, color: "#f59e0b", bold: true },
    { text: "-> Vertical axis of brightness              |", delay: 1600, color: "#9ca3af" },
    { text: "|                  0% (Black) -- 50% (Pure) -- 100% (White) |", delay: 1700, color: "#6b7280" },
    { text: "+-----------------------------------------------------------+", delay: 1800, color: "#6b7280" },
    { text: " ", delay: 1900 },
    { text: "[MAPPING VARIATIONS...]", delay: 2200, color: "#10b981" },
    { text: " ", delay: 2400 },
    { text: "+-----------------------------------------------------------+", delay: 2500, color: "#6b7280" },
    { text: "| MODIFICATION  | FORMULA               | VISUAL EFFECT     |", delay: 2600, color: "#e5e7eb", bold: true },
    { text: "|---------------|-----------------------|-------------------|", delay: 2700, color: "#6b7280" },
    { text: "| ", delay: 2800, inline: true, color: "#6b7280" },
    { text: "Tint          ", delay: 2800, inline: true, color: "#f3f4f6", bold: true },
    { text: "| Hue + White (L > 50%) | Lighter, softer   |", delay: 2800, color: "#9ca3af" },
    { text: "| ", delay: 2900, inline: true, color: "#6b7280" },
    { text: "Tone          ", delay: 2900, inline: true, color: "#9ca3af", bold: true },
    { text: "| Hue + Gray (S < 100%) | Muted, subtle     |", delay: 2900, color: "#9ca3af" },
    { text: "| ", delay: 3000, inline: true, color: "#6b7280" },
    { text: "Shade         ", delay: 3000, inline: true, color: "#374151", bold: true },
    { text: "| Hue + Black (L < 50%) | Darker, richer    |", delay: 3000, color: "#9ca3af" },
    { text: "+-----------------------------------------------------------+", delay: 3100, color: "#6b7280" },
    { text: " ", delay: 3200 },
    { text: "instudia@color-theory ~ % ", delay: 3500, color: "#e5e7eb", showCursor: true },
  ];

  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    
    let timeouts: NodeJS.Timeout[] = [];
    let inlineGroup: number[] = [];

    lines.forEach((line, i) => {
      if (line.inline) {
        inlineGroup.push(i);
      } else {
        const currentGroup = [...inlineGroup, i];
        inlineGroup = [];
        
        const timeout = setTimeout(() => {
          setVisibleLines((prev) => [...prev, ...currentGroup]);
        }, line.delay);
        timeouts.push(timeout);
      }
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.1)",
        background: "#0f111a",
        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
      }}
    >
      {/* Mac Terminal Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "#1a1d27", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }}></div>
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: "12px", color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em" }}>
          hsl-relationship-map.sh
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{ padding: "1.5rem", minHeight: "450px", fontSize: "0.85rem", lineHeight: "1.5", overflowX: "auto" }}>
        {visibleLines.map((index) => {
          const line = lines[index];
          // Determine if we need a newline wrapper (if not inline, or if it's the last inline element of a group)
          const isNextInline = lines[index + 1]?.inline;
          const isInlinePart = line.inline;
          
          const content = (
            <span
              key={index}
              style={{
                color: line.color || "#e5e7eb",
                fontWeight: line.bold ? "bold" : "normal",
                whiteSpace: "pre-wrap",
              }}
            >
              {line.text}
              {line.showCursor && (
                <span style={{ display: "inline-block", width: "8px", height: "15px", background: "#e5e7eb", verticalAlign: "middle", marginLeft: "4px", animation: "blink 1s step-end infinite" }}></span>
              )}
            </span>
          );

          if (isInlinePart || isNextInline) {
            return content; // Return without div wrapper to keep on same line
          }
          
          return (
            <div key={index} style={{ minHeight: "21px" }}>
              {content}
            </div>
          );
        })}
        
        {!isVisible && <div style={{ height: "100%", width: "100%" }}></div>}

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}
