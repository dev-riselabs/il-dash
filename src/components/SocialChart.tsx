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

import type { MentionsTimeseriesPoint } from "@/lib/api/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface MentionsChartProps {
  points?: MentionsTimeseriesPoint[];
}

const fallbackLabels = [
  "0:09 AM",
  "0:09 AM",
  "0:09 AM",
  "0:09 AM",
  "0:09 AM",
  "0:09 AM",
];
const fallbackData = [56, 64, 76, 78, 70, 37];

function buildData(points?: MentionsTimeseriesPoint[]) {
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
  const values =
    sorted && sorted.length > 0 ? sorted.map((p) => p.mentions) : fallbackData;
  return {
    labels,
    datasets: [
      {
        label: "Mentions",
        data: values,
        borderColor: "#8979FF",
        backgroundColor: "#8979FF",
        borderWidth: 1,
        tension: 0.45,
        pointRadius: 6,
        pointHoverRadius: 7,
        pointBackgroundColor: "#8979FF",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };
}

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom" as const,

      labels: {
        color: "#FFFFFF",
        usePointStyle: true,
        pointStyle: "circle" as const,
        padding: 20,

        font: {
          size: 14,
        },
      },
    },

    tooltip: {
      enabled: true,
    },
  },

  scales: {
    x: {
      grid: {
        color: "#fff",
        borderDash: [2, 2],
        drawBorder: false,
      },

      ticks: {
        color: "#FFFFFF",

        font: {
          size: 12,
        },
      },
    },

    y: {
      min: 0,

      ticks: {
        color: "#FFFFFF",

        font: {
          size: 12,
        },
      },

      grid: {
        color: "#fff",
        borderDash: [4, 4],
        drawBorder: false,
      },
    },
  },
};

export default function MentionsChart({ points }: MentionsChartProps = {}) {
  const data = buildData(points);
  return (
    <div className="w-full rounded-3xl border border-white/55 px-4 py-5 sm:p-6 flex gap-6 flex-col">
      <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
        Mentions Over Time
      </h4>

      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
