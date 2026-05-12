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

const SentimentTrendChart = () => {
  const labels = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

  const data = {
    labels,
    datasets: [
      {
        label: "Positive",
        data: [45, 89, 85, 18, 43, 91],
        borderColor: "#72F4C8",
        backgroundColor: "#72F4C8",
        tension: 0.45,
        borderWidth: 1.5,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointBackgroundColor: "#72F4C8",
        pointBorderColor: "#D9FFF4",
        pointBorderWidth: 2,
      },
      {
        label: "Neutral",
        data: [59, 70, 83, 88, 67, 97],
        borderColor: "#F6A63B",
        backgroundColor: "#F6A63B",
        tension: 0.45,
        borderWidth: 1.5,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointBackgroundColor: "#F6A63B",
        pointBorderColor: "#FFE3BE",
        pointBorderWidth: 2,
      },
      {
        label: "Negative",
        data: [29, 28, 96, 11, 46, 38],
        borderColor: "#FF1E3C",
        backgroundColor: "#FF1E3C",
        tension: 0.45,
        borderWidth: 1.5,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointBackgroundColor: "#FF1E3C",
        pointBorderColor: "#FFD4DA",
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
          color: "#D1D5DB",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#050816",
        borderColor: "#2A2D3E",
        borderWidth: 1,
        padding: 14,
        titleColor: "#FFFFFF",
        bodyColor: "#D1D5DB",
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0.25)",
          borderDash: [4, 4],
          drawBorder: false,
        },
        ticks: {
          color: "#fff",
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
          color: "#ffff",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.25)",
          borderDash: [4, 4],
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
      <div className=" flex items-center justify-between">
        <h4 className="font-dmSans text-white font-medium text-base uppercase">
          Sentiment Trend Over Time
        </h4>
      </div>

      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SentimentTrendChart;
