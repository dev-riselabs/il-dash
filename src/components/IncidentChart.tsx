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

const labels = ["May 10", "May 11", "May 12", "May 13", "May 13", "May 14"];

const data = {
  labels,
  datasets: [
    {
      label: "High",
      data: [50, 35, 80, 58, 39, 44],
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
    {
      label: "Medium",
      data: [42, 91, 85, 83, 64, 91],
      borderColor: "#FFAE4C",
      backgroundColor: "#FFAE4C",
      borderWidth: 1,
      tension: 0.45,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 1,
      pointBackgroundColor: "#FFAE4C",
      pointBorderColor: "#fff",
    },
    {
      label: "Low",
      data: [26, 57, 57, 70, 13, 95],
      borderColor: "#7086FD",
      backgroundColor: "#7086FD",
      borderWidth: 1,
      tension: 0.45,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 1,
      pointBackgroundColor: "#7086FD",
      pointBorderColor: "#fff",
    },
    {
      label: "Info",
      data: [56, 11, 37, 47, 87, 15],
      borderColor: "#07DBFA",
      backgroundColor: "#07DBFA",
      borderWidth: 1,
      tension: 0.45,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 1,
      pointBackgroundColor: "#07DBFA",
      pointBorderColor: "#fff",
    },
  ],
};

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
          return ` ${context.parsed.y} /100`;
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
      max: 100,
      ticks: {
        stepSize: 20,
        color: "#B8C0CC",
      },
      grid: {
        color: "rgba(255,255,255,0.15)",
        borderDash: [4, 4],
      },
    },
  },
};

export default function IncidentTrendChart() {
  return (
    <div className="w-full rounded-2xl border border-white/55 flex flex-col gap-6 p-6">
      <div className="">
        <h4 className="text-white font-medium uppercase text-base font-lexend">
            INCIDENT TREND
          </h4>
      </div>

      <div className="h-75 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}