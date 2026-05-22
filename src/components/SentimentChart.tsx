import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import type { SentimentScore } from "@/lib/api/types";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

type SentimentChartProps = {
  points?: SentimentScore[];
  title?: string;
};

const fallbackLabels = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
const fallback = {
  positive: [45, 90, 85, 18, 42, 92],
  neutral: [60, 70, 84, 88, 67, 98],
  negative: [30, 28, 96, 12, 46, 38],
};

function buildDataset(points?: SentimentScore[]) {
  if (!points || points.length === 0) {
    return {
      labels: fallbackLabels,
      pos: fallback.positive,
      neu: fallback.neutral,
      neg: fallback.negative,
    };
  }
  const sorted = [...points].sort(
    (a, b) =>
      new Date(a.captured_at).getTime() - new Date(b.captured_at).getTime(),
  );
  return {
    labels: sorted.map((p) =>
      new Date(p.captured_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
    ),
    pos: sorted.map((p) => Number(p.positive_pct ?? 0)),
    neu: sorted.map((p) => Number(p.neutral_pct ?? 0)),
    neg: sorted.map((p) => Number(p.negative_pct ?? 0)),
  };
}

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#fff",
        usePointStyle: true,
        pointStyle: "circle",
      },
    },

    tooltip: {
      backgroundColor: "#020617",
      borderColor: "#334155",
      borderWidth: 1,
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#AEB9E1",
      displayColors: true,
      callbacks: {
        title: (items) => `${items[0].label}`,
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#fff",
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        color: "#fff",
        borderDash: [4, 4], // 🔥 dashed vertical grid
      } as any,
      border: {
        display: false,
      },
    },

    y: {
      min: 0,
      max: 100,
      ticks: {
        color: "#fff",
        stepSize: 20,
      },
      grid: {
        color: "#fff",
        borderDash: [4, 4], // 🔥 dashed horizontal grid
      } as any,
      border: {
        display: false,
      },
    },
  },
};

export default function SentimentChart({ points, title }: SentimentChartProps = {}) {
  const ds = buildDataset(points);
  const data = {
    labels: ds.labels,
    datasets: [
      {
        label: "Positive",
        data: ds.pos,
        borderColor: "#6FD195",
        backgroundColor: "#6FD195",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 1,
      },
      {
        label: "Neutral",
        data: ds.neu,
        borderColor: "#FFAE4C",
        backgroundColor: "#FFAE4C",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 1,
      },
      {
        label: "Negative",
        data: ds.neg,
        borderColor: "#F6001A",
        backgroundColor: "#F6001A",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className=" border border-white/55 rounded-2xl py-5 px-5 sm:p-6 w-full h-100 flex flex-col gap-6">
      <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
        {title ?? "SENTIMENT TREND OVER TIME"}
      </h4>

      <div className="w-full h-75">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
