import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const pointShadowPlugin = {
  id: "pointShadow",

  beforeDatasetsDraw(chart: any) {
    const { ctx } = chart;

    ctx.save();

    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },

  afterDatasetsDraw(chart: any) {
    chart.ctx.restore();
  },
};

type Point = { date: string; count: number };

function formatLabel(d: string) {
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function buildData(points: Point[]) {
  const labels = points.map((p) => formatLabel(p.date));
  return {
    labels,
    datasets: [
      {
        label: "Alerts",
        data: points.map((p) => p.count),
        borderColor: "#07DBFA",
        backgroundColor: "#07DBFA",
        tension: 0.45,
        borderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#07DBFA",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        fill: false,
      },
    ],
  };
}

const options: any = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: "index",
    intersect: false,
  },

  plugins: {
    legend: {
      position: "bottom",

      labels: {
        color: "#ffffff",
        usePointStyle: true,
        pointStyle: "circle",
        padding: 18,

        font: {
          size: 12,
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
        display: true,
        color: "rgba(255,255,255,0.35)",
        borderDash: [2, 4],
        drawBorder: false,
      },

      ticks: {
        color: "#ffffff",

        font: {
          size: 12,
        },
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        color: "#ffffff",

        font: {
          size: 12,
        },
      },

      grid: {
        display: true,
        color: "rgba(255,255,255,0.35)",
        borderDash: [2, 4],
        drawBorder: false,
      },
    },
  },
};

interface Props {
  points?: Point[];
  days?: number;
  title?: string;
}

export default function AlertsOverTimeChart({
  points = [],
  days = 7,
  title,
}: Props) {
  const data = buildData(points);
  const heading = title ?? `ALERTS OVER TIME (LAST ${days} DAYS)`;
  return (
    <div className="w-full rounded-2xl border border-white/55 flex flex-col gap-5 p-6">
      <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
        {heading}
      </h4>

      <div className="h-70 w-full">
        {points.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-white/60 text-xs font-lexend">
            No alert activity yet.
          </div>
        ) : (
          <Line data={data} options={options} plugins={[pointShadowPlugin]} />
        )}
      </div>
    </div>
  );
}
