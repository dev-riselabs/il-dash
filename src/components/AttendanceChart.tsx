import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

const AttendanceChart = () => {
  const data = {
    labels: ["May 10", "May 11", "May 12", "May 13", "May 14", "May 15"],
    datasets: [
      {
        label: "Attendance",
        data: [56, 64, 76, 78, 70, 37],
        borderColor: "#7C5CFC",
        backgroundColor: "#7C5CFC",
        borderWidth: 1.5,
        tension: 0.45,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointBackgroundColor: "#A78BFA",
        pointBorderColor: "#7C5CFC",
        pointBorderWidth: 2,
        fill: false,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#050816",
        borderColor: "#2A2D3E",
        borderWidth: 1,
        padding: 14,
        displayColors: false,
        titleColor: "#FFFFFF",
        bodyColor: "#D1D5DB",
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
          label: () => "1,282 Attendees",
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
          color: "#fff",
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
      <div className="flex items-center justify-between">
        <h4 className="font-dmSans text-white font-medium text-base uppercase">
          Attendance Over Time
        </h4>

        <select className="rounded-md border border-white/55 bg-transparent px-4 py-1.5 text-sm text-white outline-none">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="h-70 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;