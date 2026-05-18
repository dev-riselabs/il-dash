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
  Filler
);

export interface IncidentTrendPoint {
  date: string;
  count: number;
}

interface IncidentTrendChartProps {
  points?: IncidentTrendPoint[];
}

const fallbackLabels = ["May 10", "May 11", "May 12", "May 13", "May 14", "May 15"];
const fallbackData = [12, 9, 14, 8, 11, 7];

function buildData(points?: IncidentTrendPoint[]) {
  const sorted = points
    ? [...points].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
    : null;
  const labels =
    sorted && sorted.length > 0
      ? sorted.map((p) =>
          new Date(p.date).toLocaleDateString("en-GB", {
            month: "short",
            day: "2-digit",
          }),
        )
      : fallbackLabels;
  const values =
    sorted && sorted.length > 0 ? sorted.map((p) => p.count) : fallbackData;
  return {
    labels,
    datasets: [
      {
        label: "Alerts",
        data: values,
        borderColor: "#F6001A",
        backgroundColor: "#F6001A",
        borderWidth: 1,
        tension: 0.45,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 1,
        pointBackgroundColor: "#F6001A",
        pointBorderColor: "#fff",
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
        color: "#B8C0CC",
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "#050816",
      borderColor: "#2B3245",
      borderWidth: 1,
      padding: 14,
      titleColor: "#fff",
      bodyColor: "#fff",
      displayColors: false,
      callbacks: {
        label: (context: any) => {
          return ` ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255,255,255,0.15)",
        borderDash: [4, 4],
      },
      ticks: {
        color: "#B8C0CC",
      },
    },
    y: {
      min: 0,
      ticks: {
        color: "#B8C0CC",
      },
      grid: {
        color: "rgba(255,255,255,0.15)",
        borderDash: [4, 4],
      },
    },
  },
};

export default function IncidentTrendChart({ points }: IncidentTrendChartProps = {}) {
  const data = buildData(points);
  return (
    <div className="w-full rounded-2xl border border-white/55 flex flex-col gap-6 p-6">
      <div className="">
        <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            INCIDENT TREND
          </h4>
      </div>

      <div className="h-75 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}