import { AlarmClockCheck } from "lucide-react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

import type { AttendanceSnapshot } from "@/lib/api/types";

type AttendanceChartProps = {
  points?: AttendanceSnapshot[];
  currentTotal?: number;
};

const fallbackLabels = [
  "12 AM",
  "",
  "",
  "",
  "8 AM",
  "",
  "",
  "",
  "4 PM",
  "",
  "",
  "11 PM",
];
const fallbackData = [20, 60, 200, 100, 250, 180, 140, 260, 500, 120, 300, 40];

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#111827",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#333",
      borderWidth: 1,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#AEB9E1",
        font: {
          size: 10,
        },
        //      maxRotation: 0,
        // minRotation: 0,
      },
      border: {
        display: false,
      },
    },

    y: {
      min: 0,
      ticks: {
        color: "#AEB9E1",
      },
      grid: {
        color: "rgba(255,255,255,0.05)", //
      },
      border: {
        display: false,
      },
    },
  },
};

export default function AttendanceChart({ points, currentTotal }: AttendanceChartProps = {}) {
  const sorted = points
    ? [...points].sort(
        (a, b) =>
          new Date(a.captured_at).getTime() - new Date(b.captured_at).getTime(),
      )
    : null;
  const labels =
    sorted && sorted.length > 0
      ? sorted.map((p) =>
          new Date(p.captured_at).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        )
      : fallbackLabels;
  const values =
    sorted && sorted.length > 0 ? sorted.map((p) => p.total) : fallbackData;
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#CB3CFF",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };
  const headline =
    currentTotal !== undefined
      ? currentTotal
      : sorted && sorted.length > 0
        ? sorted[sorted.length - 1].total
        : 400;
  return (
    <div className=" border border-white/55 rounded-2xl space-y-4 p-6 w-full min-h-87.5 lg:col-span-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral100 tracking-wide flex items-center gap-2 font-lexend">
            <AlarmClockCheck className="text-neutral100 w-5" /> ATTENDANCE OVER
            TIME
          </p>

          <div className="flex items-start gap-3 ">
            <h2 className="text-4xl text-white font-semibold font-lexend">
              {headline}
            </h2>

            <span className="text-green100 text-xs font-lexend bg-green300 px-2 py-1 rounded-md">
              Live ↗
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-auto h-45">
        <Line data={data} options={options} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-green100 text-xs font-lexend bg-green300 px-2 py-1 rounded-md">
          • Live
        </span>

        <button className="text-purple text-xs font-lexend">View report</button>
      </div>
    </div>
  );
}
