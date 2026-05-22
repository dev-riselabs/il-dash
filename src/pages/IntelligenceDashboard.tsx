import SectionBySectorChart from "@/components/IntelligenceSectorChart";
import IntelligenceSentimentTrendChart from "@/components/IntelligenceSentimentChart";
import { QueryState } from "@/components/ui/QueryState";
import { CircleArrowUp } from "lucide-react";

import {
  useIntelligenceKpis,
  useSectors,
  useSentimentBySector,
  useSentimentTrend,
} from "@/lib/api/hooks";
import { fmtNumber, fmtPercent } from "@/lib/api/format";

function IntelligenceDashboard() {
  const kpisQ = useIntelligenceKpis();
  const trendQ = useSentimentTrend(14);
  const bySectorQ = useSentimentBySector();
  const sectorsQ = useSectors();

  const k = kpisQ.data;
  const kpis = [
    {
      label: "Total Signals",
      value: fmtNumber(k?.total_signals ?? 0),
      delta: "Live",
    },
    {
      label: "Positive Sentiment",
      value: fmtPercent(k?.positive_pct ?? 0, 1),
      delta: "Today",
    },
    {
      label: "Quotes Captured",
      value: fmtNumber(k?.quotes_count ?? 0),
      delta: "Live",
    },
  ];

  const sectorNameById = new Map<number, string>();
  (sectorsQ.data ?? []).forEach((s) => sectorNameById.set(s.id, s.name));
  const sectorPoints = (bySectorQ.data ?? [])
    .filter((p) => p.scope === "sector" && p.scope_id != null)
    .map((p) => ({
      label:
        sectorNameById.get(p.scope_id as number) ??
        `Sector #${p.scope_id}`,
      value: Math.round(p.positive_pct),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

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
                  {kpisQ.isLoading ? "…" : value}
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

      <QueryState
        isLoading={bySectorQ.isLoading || sectorsQ.isLoading}
        isError={bySectorQ.isError}
        error={bySectorQ.error as { message?: string } | null}
        isEmpty={sectorPoints.length === 0}
        emptyLabel="No sector sentiment yet."
      >
        <SectionBySectorChart points={sectorPoints} />
      </QueryState>

      <QueryState
        isLoading={trendQ.isLoading}
        isError={trendQ.isError}
        error={trendQ.error as { message?: string } | null}
        isEmpty={(trendQ.data ?? []).length === 0}
        emptyLabel="No sentiment trend yet."
      >
        <IntelligenceSentimentTrendChart points={trendQ.data} />
      </QueryState>
    </section>
  );
}

export default IntelligenceDashboard;
