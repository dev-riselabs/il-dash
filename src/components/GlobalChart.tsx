import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

const InvestmentHeatmap = () => {
  const data = {
    datasets: [
      {
        label: "USA",
        data: [{ x: 15, y: 55, r: 18 }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(168, 85, 247, 0.45)",
      },
      {
        label: "Nigeria",
        data: [{ x: 50, y: 65, r: 22 }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
      },
      {
        label: "UK",
        data: [{ x: 38, y: 75, r: 16 }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
      },
      {
        label: "South Africa",
        data: [{ x: 48, y: 35, r: 18 }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
      },
      {
        label: "India",
        data: [{ x: 85, y: 28, r: 20 }],
        backgroundColor: "rgba(14, 165, 233, 0.35)",
        borderColor: "#0EA5E9",
        borderWidth: 2,
      },
      {
        label: "Asia",
        data: [{ x: 94, y: 74, r: 20 }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#050816",
        borderColor: "#2A2D3E",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#D1D5DB",
        padding: 12,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label} Investors`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/55 p-6">
      {/* Top Buttons */}
      <div className="mb-6 flex items-center gap-0">
        <button className="rounded-l-md bg-[#0039B8] px-6 py-2 text-sm text-white">
          Map View
        </button>

        <button className="rounded-r-md border border-[#2A2D3E] bg-transparent px-6 py-2 text-sm text-white">
          List View
        </button>
      </div>

      <img
        src="/map-bg.svg"
        alt="world map"
        className="absolute inset-0 h-full w-full object-contain "
      />

      {/* Bubble Chart */}
      <div className="relative h-125 w-full">
        <Bubble data={data} options={options} />
      </div>

      {/* Info Card */}
      <div className="absolute bottom-16 left-1/2 w-70 -translate-x-1/2 rounded-2xl border border-[#2A2D3E] bg-[#020817]/95 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#A855F7]" />
            <p className="text-sm text-white">Nigeria</p>
          </div>

          <button className="text-white">✕</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Investors</span>
            <span className="text-white">236</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Sessions Attended</span>
            <span className="text-white">18</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm text-[#6B7280]">Top Sectors</p>

          <div className="space-y-3">
            {[
              {
                title: "Infrastructure",
                value: "42%",
                color: "#0EA5E9",
              },
              {
                title: "Technology",
                value: "28%",
                color: "#22C55E",
              },
              {
                title: "Energy",
                value: "15%",
                color: "#FACC15",
              },
              {
                title: "Healthcare",
                value: "10%",
                color: "#A855F7",
              },
              {
                title: "Agriculture",
                value: "5%",
                color: "#FB923C",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#D1D5DB]">{item.title}</span>
                </div>

                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>

          <button className="mt-5 text-sm font-medium text-[#00C2FF]">
            View Details
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 rounded-2xl border border-[#2A2D3E] bg-[#020817]/90 p-4 backdrop-blur-md">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
          Investor Count
        </p>

        <div className="space-y-3">
          {[
            { label: "1 - 10", color: "#1D4ED8" },
            { label: "11 - 50", color: "#06B6D4" },
            { label: "51 - 100", color: "#22C55E" },
            { label: "101 - 250", color: "#EAB308" },
            { label: "250+", color: "#C026D3" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-xs text-[#D1D5DB]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentHeatmap;
