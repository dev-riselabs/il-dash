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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const labels = [
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

const data = {
  labels,

  datasets: [
    {
      label: "Positive",

      data: [2, 18, 12, 30, 66, 52, 45, 35, 45, 40, 78],

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

      data: [28, 15, 22, 40, 65, 80, 72, 70, 78, 54, 55],

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

      callbacks: {
        title: () => "15 Aug 2022",
        label: () => "Record Count - 0",
      },
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

export default function IntelligenceSentimentTrendChart() {
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
