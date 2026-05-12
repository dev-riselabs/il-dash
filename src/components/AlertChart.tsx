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

const labels = ["May 10", "May 11", "May 12", "May 13", "May 13", "May 14"];

const data = {
  labels,

  datasets: [
    {
      label: "High",
      data: [49, 35, 80, 55, 39, 44],

      borderColor: "#F6001A",
      backgroundColor: "#F6001A",

      tension: 0.45,
      borderWidth: 1.5,

      pointRadius: 4,
      pointHoverRadius: 6,

      pointBackgroundColor: "#F6001A",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },

    {
      label: "Medium",
      data: [42, 91, 85, 83, 64, 91],

      borderColor: "#FFAE4C",
      backgroundColor: "#FFAE4C",

      tension: 0.45,
      borderWidth: 1.5,

      pointRadius: 4,
      pointHoverRadius: 6,

      pointBackgroundColor: "#FFAE4C",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },

    {
      label: "Low",
      data: [26, 57, 57, 70, 13, 95],

      borderColor: "#7086FD",
      backgroundColor: "#7086FD",

      tension: 0.45,
      borderWidth: 1.5,

      pointRadius: 4,
      pointHoverRadius: 6,

      pointBackgroundColor: "#7086FD",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },

    {
      label: "Info",
      data: [56, 11, 37, 54, 87, 15],

      borderColor: "#07DBFA",
      backgroundColor: "#07DBFA",

      tension: 0.45,
      borderWidth: 1.5,

      pointRadius: 4,
      pointHoverRadius: 6,

      pointBackgroundColor: "#07DBFA",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
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
      min: 0,
      max: 100,

      ticks: {
        stepSize: 20,
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

export default function AlertsOverTimeChart() {
  return (
    <div className="w-full rounded-2xl border border-white/55 flex felx-col gap-5 flex-col p-6">
      <h4 className="font-dmSans text-white font-medium text-base uppercase">
        ALERTS OVER TIME (Last 6 Days)
      </h4>

      <div className="h-70 w-full">
        <Line data={data} options={options} plugins={[pointShadowPlugin]} />
      </div>
    </div>
  );
}
