import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SentimentDivideChart() {
  const labels = ["Positive", "Neutral", "Negative"];
  const values = [18, 18, 2];

  const dotColors = [
    "#72CC88", // Green
    "#F8B233", // Yellow
    "#F65B4D", // Red
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiment",
        data: values,
        backgroundColor: "#6C63F0",
        borderRadius: 0,
        barThickness: 28,
        borderSkipped: false as const,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 80, // Space for colored dots
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 35,
        grid: {
          color: "rgba(255,255,255,0.08)",
          tickBorderDash: [2, 4], // Use this instead of borderDash
        },
        ticks: {
          color: "#9CA3AF",
          stepSize: 5,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 14,
            weight: 500,
          },
          padding: 20,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Plugin to draw values at the end of each bar
  const valueLabelsPlugin: Plugin<"bar"> = {
    id: "valueLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "14px sans-serif";
      ctx.textBaseline = "middle";

      meta.data.forEach((bar, index) => {
        const value = values[index];
        ctx.fillText(String(value), bar.x + 10, bar.y);
      });

      ctx.restore();
    },
  };

  // Replace the coloredDotsPlugin with this TypeScript-safe version

  const coloredDotsPlugin: Plugin<"bar"> = {
    id: "coloredDots",
    afterDraw(chart) {
      const { ctx } = chart;
      const yScale = chart.scales.y;

      ctx.save();

      labels.forEach((_, index) => {
        // getPixelForValue on a category scale expects the numeric index
        const y = yScale.getPixelForValue(index);
        const x = yScale.left - 22;

        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = dotColors[index];
        ctx.fill();
      });

      ctx.restore();
    },
  };

  return (
    <div className="w-full rounded-2xl border border-white/55 p-6 space-y-6">
      <h4 className="font-dmSans text-white font-medium text-base uppercase">
        Sentiment Divide
      </h4>

      <div className="h-70">
        <Bar
          data={data}
          options={options}
          plugins={[valueLabelsPlugin, coloredDotsPlugin]}
        />
      </div>
    </div>
  );
}
