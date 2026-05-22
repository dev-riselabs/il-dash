"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface SectorChartProps {
  points?: Array<{ label: string; value: number }>;
}

const fallback: Array<{ label: string; value: number }> = [
  { label: "Tech", value: 180 },
  { label: "Infras", value: 110 },
  { label: "Finance", value: 50 },
  { label: "Policy", value: 75 },
  { label: "Creative", value: 135 },
  { label: "Agriculture", value: 250 },
  { label: "Health", value: 200 },
];

function buildData(points?: Array<{ label: string; value: number }>) {
  const rows = points && points.length > 0 ? points : fallback;
  const max = Math.max(1, ...rows.map((r) => r.value));
  return {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        label: "Value",
        data: rows.map((r) => r.value),
        backgroundColor: "#00C0E8",
        stack: "combined",
        barThickness: 20,
      },
      {
        label: "Remaining",
        data: rows.map((r) => max - r.value),
        backgroundColor: "rgba(255,255,255,0.12)",
        stack: "combined",
        barThickness: 20,
      },
    ],
    max,
  };
}

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: "#0f172a",
      borderColor: "#1e293b",
      borderWidth: 1,
    },
  },

  scales: {
    x: {
      stacked: true,

      grid: {
        display: false,
      },

      ticks: {
        color: "#D1D5DB",
        font: {
          size: 13,
        },
      },

      border: {
        color: "#fff",
      },
    },

    y: {
      stacked: true,
      beginAtZero: true,

      ticks: {
        color: "#D1D5DB",
      },

      grid: {
        color: "rgba(255,255,255,0.15)",
        borderDash: [4, 4],
        drawBorder: false,
      },

      border: {
        display: false,
      },
    },
  },
};

export default function SectionBySectorChart({ points }: SectorChartProps = {}) {
  const data = buildData(points);
  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: { ...baseOptions.scales.y, max: data.max },
    },
  };
  return (
    <div className="w-full rounded-2xl border border-white/55 space-y-6 p-6">
      <h4 className="font-dmSans text-white font-medium text-base uppercase">
        Section by Sector
      </h4>

      <div className="h-70">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
