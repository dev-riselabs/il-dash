import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import type { ChartOptions, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Center text plugin (typed)
const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw(chart) {
    const { ctx, width, height } = chart;

    ctx.save();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Main number
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("27", width / 2, height / 2 - 10);

    // Sub text
    ctx.font = "14px sans-serif";
    ctx.fillText("Total", width / 2, height / 2 + 15);

    ctx.restore();
  },
};

const data = {
  labels: ["Commitments", "Keynotes", "Panel Discussion"],
  datasets: [
    {
      data: [15, 7, 5],
      backgroundColor: [
        "#CB3CFF", // purple
        "#13A13E", // green
        "#F66202", // orange
      ],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%", // 👈 donut thickness
  plugins: {
    legend: {
      display: false, // we'll build custom legend like your UI
    },
    tooltip: {
      enabled: true,
    },
  },
};

export default function DonutChart() {
  return (
    <div className="flex items-center gap-10">
      <div className="w-50 h-50">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>

      {/* Custom Legend */}
      <div className="text-white space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-purple"></span>
          <p className="text-xs font-lexend">Commitments — 15 (55.6%)</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-green100"></span>
          <p className="text-xs font-lexend">Keynotes — 7 (25.9%)</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-orange100"></span>
          <p className="text-xs font-lexend">Panel Discussion — 5 (18.5%)</p>
        </div>
      </div>
    </div>
  );
}