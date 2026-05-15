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

const sectors = [
  "Tech",
  "Infras",
  "Finance",
  "Policy",
  "Creative",
  "Agriculture",
  "Health",
];

const values = [180, 110, 50, 75, 135, 250, 200];

const MAX = 250;

const data = {
  labels: sectors,
  datasets: [
    {
      label: "Value",
      data: values,
      backgroundColor: "#00C0E8",
      stack: "combined",
      barThickness: 20,
    },

    {
      label: "Remaining",
      data: values.map((item) => MAX - item),
      backgroundColor: "rgba(255,255,255,0.12)",
      stack: "combined",
      barThickness: 20,
    },
  ],
};

const options = {
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
      max: MAX,

      ticks: {
        stepSize: 50,
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

export default function SectionBySectorChart() {
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
