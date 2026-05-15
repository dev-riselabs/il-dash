import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Users } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysis = () => {
  const sentimentData = [
    {
      label: "Positive",
      value: 78,
      color: "#16A34A",
    },
    {
      label: "Neutral",
      value: 15,
      color: "#334155",
    },
    {
      label: "Negative",
      value: 7,
      color: "#64748B",
    },
  ];

  const total = 78;

  const data = {
    labels: sentimentData.map((item) => item.label),
    datasets: [
      {
        data: sentimentData.map((item) => item.value),
        backgroundColor: sentimentData.map((item) => item.color),
        borderWidth: 0,
        cutout: "60%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // ✅ Inner white circle
  const innerBorderPlugin: Plugin<"doughnut"> = {
    id: "innerBorder",
    afterDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      if (!meta.data.length) return;

      const arc = meta.data[0] as ArcElement;

      const x = arc.x;
      const y = arc.y;

      // 👇 make slightly smaller so it sits inside
      const radius = arc.innerRadius - 2;

      ctx.save();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;

      ctx.stroke();

      ctx.restore();
    },
  };

  return (
    <section className="border border-white/55 rounded-2xl p-6 flex flex-col gap-6 w-full lg:col-span-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
          SENTIMENT ANALYSIS
        </h4>

        <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
          View all
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Doughnut Chart */}
        <div className="relative w-52 h-52 mx-auto">
          <Doughnut
            data={data}
            options={options}
            plugins={[innerBorderPlugin]}
          />

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-3xl font-bold">{total}%</h3>

            <p className="text-white text-base mt-1">Positive</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-8">
          {sentimentData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-neutral100 text-xs font-outfit">
                  {item.label}
                </p>

                <span className="text-neutral100 text-xs font-outfit">
                  {item.value}%
                </span>
              </div>

              <div className="w-full h-1 bg-neutral200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center gap-3 mt-2">
            <Users className="text-white w-5 h-5" />

            <p className="text-neutral100 text-xs font-outfit">
              Based on 1,245 responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentimentAnalysis;
