import { CircleArrowUp } from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import {
  useHeatmapKpis,
  useHeatmapSectors,
  useSectors,
} from "@/lib/api/hooks";
import { fmtCompact, fmtNaira, fmtNumber } from "@/lib/api/format";

const SECTOR_COLORS = [
  "bg-red",
  "bg-orange",
  "bg-green",
  "bg-mint",
  "bg-blue",
  "bg-indigo",
];

function InvestmentHeatmap() {
  const kpisQ = useHeatmapKpis();
  const sectorsQ = useHeatmapSectors();
  const lookupQ = useSectors();

  const k = kpisQ.data;
  const sectorNameById = new Map(
    (lookupQ.data ?? []).map((s) => [s.id, s.name]),
  );

  const kpis = [
    {
      label: "Total Investment Signals (Value)",
      value: fmtNaira(k?.total_value_naira ?? 0),
    },
    {
      label: "Tracked Sectors",
      value: fmtNumber(sectorsQ.data?.length ?? 0),
    },
    {
      label: "High Confidence Signals",
      value: fmtNumber(k?.high_confidence ?? 0),
    },
  ];

  const maxValue = Math.max(
    1,
    ...(sectorsQ.data ?? []).map((s) => s.total_value_naira),
  );
  const sectors = (sectorsQ.data ?? [])
    .slice()
    .sort((a, b) => b.total_value_naira - a.total_value_naira)
    .map((s, i) => ({
      title: s.sector?.name ?? sectorNameById.get(s.sector_id) ?? "—",
      pct: Math.round((s.total_value_naira / maxValue) * 100),
      signals: s.signals_count,
      value: fmtNaira(s.total_value_naira),
      color: SECTOR_COLORS[i % SECTOR_COLORS.length],
    }));

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          INVESTMENT HEATMAP
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of investment interest across sectors and locations.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
        {kpis.map(({ label, value }, idx) => (
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
                  className={`text-2xl sm:text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                    idx === 0
                      ? "text-cyan"
                      : idx === 1
                        ? "text-green"
                        : "text-orange"
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
              <CircleArrowUp color="white" width={"20px"} /> Live
            </div>
          </div>
        ))}
      </div>

      <section className="border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-dmSans font-medium text-sm sm:text-base uppercase">
            TOP SECTORS BY INVESTMENT INTEREST
          </h4>
        </div>

        <QueryState
          isLoading={sectorsQ.isLoading}
          isError={sectorsQ.isError}
          error={sectorsQ.error as { message?: string } | null}
          isEmpty={sectors.length === 0}
          emptyLabel="No investment signals captured yet."
        >
          <div className="overflow-x-auto">
            <section className="flex flex-col gap-6 min-w-180">
              <div className="grid grid-cols-5 gap-4">
                <div className="text-sm font-lexend font-medium text-white uppercase col-span-2">
                  SECTOR
                </div>
                <div className="text-sm font-lexend font-medium text-white uppercase text-center">
                  INVESTMENT SIGNALS
                </div>
                <div className="text-sm font-lexend font-medium text-white uppercase text-center">
                  EST. VALUE (₦)
                </div>
                <div className="text-sm font-lexend font-medium text-white uppercase text-center">
                  TREND
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {sectors.map(({ title, value, signals, pct, color }) => (
                  <div key={title} className="grid grid-cols-5 gap-4">
                    <div className="flex items-center gap-2 text-white font-lexend text-sm col-span-2">
                      <div className={`w-7.5 h-7.5 rounded ${color}`}></div>
                      {title}
                    </div>
                    <div className="text-white font-lexend text-sm text-center tabular-nums">
                      {fmtNumber(signals)}
                    </div>
                    <div className="text-white font-lexend text-sm text-center tabular-nums">
                      {value}
                    </div>
                    <div className="flex items-center gap-2 text-white font-lexend text-sm justify-center">
                      <CircleArrowUp className="w-5 fill-white text-black" />
                      {fmtCompact(pct)}%
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </QueryState>
      </section>
    </section>
  );
}

export default InvestmentHeatmap;
