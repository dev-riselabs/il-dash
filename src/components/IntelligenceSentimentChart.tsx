"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { SentimentScore } from "@/lib/api/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface TrendChartProps {
  points?: SentimentScore[];
}

const fallbackLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];
const fallbackPositive = [2, 18, 12, 30, 66, 52, 45, 35, 45, 40, 78];
const fallbackNegative = [28, 15, 22, 40, 65, 80, 72, 70, 78, 54, 55];

function buildData(points?: SentimentScore[]) {
  const sorted = points
    ? [...points].sort(
        (a, b) =>
          new Date(a.captured_at).getTime() - new Date(b.captured_at).getTime(),
      )
    : null;
  const labels =
    sorted && sorted.length > 0
      ? sorted.map((p) =>
          new Date(p.captured_at).toLocaleDateString("en-GB", {
            month: "short",
            day: "2-digit",
          }),
        )
      : fallbackLabels;
  const positive =
    sorted && sorted.length > 0
      ? sorted.map((p) => p.positive_pct)
      : fallbackPositive;
  const negative =
    sorted && sorted.length > 0
      ? sorted.map((p) => p.negative_pct)
      : fallbackNegative;
  return {
    labels,
    datasets: [
      {
        label: "Positive",
        data: positive,
        borderColor: "#1F8BFF",
        backgroundColor: "#1F8BFF",
        tension: 0.45,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#1F8BFF",
        pointHoverBorderColor: "#fff",
      },
      {
        label: "Negative",
        data: negative,
        borderColor: "#FFA500",
        backgroundColor: "#FFA500",
        tension: 0.45,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#FFA500",
        pointHoverBorderColor: "#fff",
      },
    ],
  };
}

const options = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: "index" as const,
    intersect: false,
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: "#020617",

      borderColor: "#334155",
      borderWidth: 1,

      padding: 14,

      displayColors: false,

      titleColor: "#fff",
      bodyColor: "#fff",

    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "#8EA3D0",
        padding: 12,
        font: {
          size: 14,
        },
      },

      border: {
        display: false,
      },
    },

    y: {
      beginAtZero: true,
      max: 100,

      ticks: {
        color: "#8EA3D0",
        stepSize: 20,
        padding: 15,
      },

      grid: {
        color: "rgba(255,255,255,.65)",
        lineWidth: 1,
      },

      border: {
        display: false,
      },
    },
  },

  elements: {
    line: {
      capBezierPoints: true,
    },
  },
};

export default function IntelligenceSentimentTrendChart({
  points,
}: TrendChartProps = {}) {
  const data = buildData(points);
  return (
    <div className="w-full h-95 rounded-2xl border border-white/55 p-6 space-y-6">
      <h4 className="font-dmSans text-white font-medium text-base uppercase">
        Sentiment Trend
      </h4>

      <div className="h-70">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
