import SectionBySectorChart from "@/components/IntelligenceSectorChart";
import IntelligenceSentimentTrendChart from "@/components/IntelligenceSentimentChart";
import { CircleArrowUp } from "lucide-react";

const kpis = [
  { label: "Total Attendance", value: "1200", delta: "4.5%" },
  { label: "Total Sessions", value: "32", delta: "4.5%" },
  { label: "Average Sentiment", value: "59.38%", delta: "4.5%" },
];

function IntelligenceDashboard() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          SENTIMENT & FEEDBACK
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time audience sentiment, feedback and session ratings
        </p>
      </div>
      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div
            key={label}
            className="border border-white/30 rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">
                  {label}
                </div>
                <div
                  className={`text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                    idx === 0
                      ? "text-cyan"
                      : idx === 1
                        ? "text-green"
                        : idx === 2
                          ? "text-green"
                          : idx === 3
                            ? "text-yellow"
                            : idx === 4
                              ? "text-red"
                              : "text-white"
                  }`}
                >
                  {value}
                </div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto">
              <CircleArrowUp color="white" width={"20px"} /> {delta}
            </div>
          </div>
        ))}
      </div>

      <SectionBySectorChart />
      <IntelligenceSentimentTrendChart />
    </section>
  );
}

export default IntelligenceDashboard;
