"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler
);

interface BrutalistChartProps {
  type: "bar" | "line" | "area";
  data: any[];
  title?: string;
  units?: string;
}

const BRAND_COLORS = ["#C21BFF", "#FF1B58", "#FFE01B", "#1B1C1E", "#00D1FF"];

export default function BrutalistChart({ type, data, title, units }: BrutalistChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="my-16 border-2 border-black bg-white p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative min-h-[350px]" />;
  }

  // Identify X and Y keys
  const dataKey = data.length > 0 ? Object.keys(data[0]).find(k => typeof data[0][k] === "number") || "value" : "value";
  const nameKey = data.length > 0 ? Object.keys(data[0]).find(k => k !== dataKey) || "name" : "name";

  const labels = data.map(d => d[nameKey]);
  const values = data.map(d => d[dataKey]);

  // Chart.js Configuration
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, right: 20, bottom: 0, left: 0 }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        border: { display: true, color: "#1B1C1E", width: 2 },
        ticks: {
          font: { family: "inherit", weight: "900", size: 10 },
          color: "#1B1C1E",
          padding: 10,
          textTransform: "uppercase"
        }
      },
      y: {
        grid: { color: "rgba(27, 28, 30, 0.1)", drawBorder: false },
        border: { display: true, color: "#1B1C1E", width: 2 },
        ticks: {
          font: { family: "inherit", weight: "900", size: 10 },
          color: "#1B1C1E",
          padding: 10,
          callback: function(value: any) {
            return units ? `${value}${units}` : value;
          }
        }
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "rgba(27, 28, 30, 0.4)",
        titleFont: { family: "inherit", weight: "900", size: 10 },
        bodyColor: "#1B1C1E",
        bodyFont: { family: "inherit", weight: "900", size: 14 },
        borderColor: "#1B1C1E",
        borderWidth: 2,
        padding: 16,
        displayColors: false,
        cornerRadius: 0,
        callbacks: {
          title: (context: any) => context[0].label.toUpperCase(),
          label: (context: any) => `${context.raw} ${units || "units"}`
        }
      }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' }
  };

  // Build Dataset
  let dataset: any = {
    label: title || "Data",
    data: values,
    borderColor: "#1B1C1E",
    borderWidth: 2,
  };

  if (type === "bar") {
    dataset = {
      ...dataset,
      type: "bar",
      backgroundColor: values.map((_, i) => BRAND_COLORS[i % BRAND_COLORS.length]),
      maxBarThickness: 80,
    };
  } else if (type === "line") {
    dataset = {
      ...dataset,
      type: "line",
      stepped: true,
      borderColor: "#1B1C1E",
      borderWidth: 4,
      pointBackgroundColor: "#C21BFF",
      pointBorderColor: "#1B1C1E",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "#FF1B58"
    };
  } else if (type === "area") {
    dataset = {
      ...dataset,
      type: "line",
      fill: true,
      backgroundColor: "rgba(194, 27, 255, 0.2)",
      borderColor: "#C21BFF",
      borderWidth: 4,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "#FF1B58",
      pointHoverBorderColor: "#1B1C1E",
      pointHoverBorderWidth: 2
    };
  }

  const chartData = {
    labels,
    datasets: [dataset]
  };

  return (
    <div className="my-16 border-2 border-black bg-white p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {title && (
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="w-2 h-8 bg-black" />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">{title}</h3>
        </div>
      )}

      {/* Chart.js automatically responds to the container size without layout bugs */}
      <div className="w-full relative z-10 h-[300px] sm:h-[400px]">
        <Chart type={type === "bar" ? "bar" : "line"} options={options} data={chartData} />
      </div>

      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <svg className="w-16 h-16" viewBox="0 0 100 100"><path d="M0 100 L100 0 L100 100 Z" fill="black" /></svg>
      </div>
    </div>
  );
}
