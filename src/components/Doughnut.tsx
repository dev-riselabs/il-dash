import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartItem = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  data: ChartItem[];
  small? : boolean;
};

// ✅ Center text plugin (dynamic)
const createCenterTextPlugin = (total: number): Plugin<"doughnut"> => ({
  id: "centerText",
  beforeDraw(chart) {
    const { ctx, width, height } = chart;

    ctx.save();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 32px sans-serif";
    ctx.fillText(String(total), width / 2, height / 2 - 10);

    ctx.font = "14px sans-serif";
    ctx.fillText("Total", width / 2, height / 2 + 15);

    ctx.restore();
  },
});

// ✅ Inner border ONLY plugin
const innerBorderPlugin: Plugin<"doughnut"> = {
  id: "innerBorder",
  afterDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);

    if (!meta.data.length) return;

    const arc = meta.data[0] as ArcElement;
    const { x, y, innerRadius } = arc;

    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1; // 👈 adjust thickness here
    ctx.stroke();

    ctx.restore();
  },
};

export default function DonutChart({ data, small }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),

        borderWidth: 0, // ❌ remove default borders
        // hoverOffset: 6,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex items-center gap-10">
      <div className={`${small ? 'w-40 h-40' :"w-50 h-50"}`}>
        <Doughnut
          data={chartData}
          options={options}
          plugins={[
            createCenterTextPlugin(total),
            innerBorderPlugin,
          ]}
        />
      </div>

      {/* Custom Legend */}
      <div className="text-white space-y-4">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);

          return (
            <div key={index} className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>

              <p className="text-xs font-lexend">
                {item.label} 
              </p>
              <p className="text-xs font-lexend flex items-center gap-1">— {item.value} ({percentage}%)</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}