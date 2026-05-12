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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const labels = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

const data = {
  labels,
  datasets: [
    {
      label: "Positive",
      data: [45, 90, 85, 18, 42, 92],
      borderColor: "#6FD195", // green
      backgroundColor: "#6FD195",
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 1,
    },
    {
      label: "Neutral",
      data: [60, 70, 84, 88, 67, 98],
      borderColor: "#FFAE4C", // orange
      backgroundColor: "#FFAE4C",
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 1,
    },
    {
      label: "Negative",
      data: [30, 28, 96, 12, 46, 38],
      borderColor: "#F6001A", // red
      backgroundColor: "#F6001A",
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 1,
    },
  ],
};

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

export default function SentimentChart() {
  return (
    <div className=" border border-white/55 rounded-2xl p-6 w-full h-100 flex flex-col gap-6">
      <h4 className="font-dmSans text-white font-medium text-base uppercase">
        SENTIMENT TREND OVER TIME
      </h4>

      <div className="w-full h-75">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
