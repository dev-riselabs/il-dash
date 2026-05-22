import DonutChart from "@/components/Doughnut";
import InvestmentHeatmapChart from "@/components/GlobalChart";
import { QueryState } from "@/components/ui/QueryState";
import { CircleArrowUp } from "lucide-react";
import { FaYelp } from "react-icons/fa";

import {
  useGlobalMapCountries,
  useGlobalMapKpis,
  useHeatmapSectors,
  useInvestorsByRegion,
  useRecentInvestors,
} from "@/lib/api/hooks";
import { fmtCompact, fmtNumber, fmtRelative } from "@/lib/api/format";

const REGION_COLORS = ["#0088FF", "#13A13E", "#FFCC00", "#9747FF", "#9A9DA6"];

function GlobalInvesorMap() {
  const kpisQ = useGlobalMapKpis();
  const countriesQ = useGlobalMapCountries();
  const investorsQ = useRecentInvestors();
  const byRegionQ = useInvestorsByRegion();
  const sectorsQ = useHeatmapSectors();

  const k = kpisQ.data;
  const totalInvestors = (byRegionQ.data ?? []).reduce(
    (s, r) => s + r.count,
    0,
  );
  const topRegion =
    (byRegionQ.data ?? []).slice().sort((a, b) => b.count - a.count)[0] ?? null;
  const totalSectors = sectorsQ.data?.length ?? 0;

  const kpis = [
    { label: "Total Investors", value: fmtNumber(k?.investors_count ?? 0) },
    {
      label: "Countries Represented",
      value: fmtNumber(k?.countries_count ?? 0),
    },
    { label: "Top Region", value: topRegion?.region ?? "—" },
    { label: "Sectors of Interest", value: fmtNumber(totalSectors) },
    { label: "Active Deals", value: fmtNumber(k?.deals_count ?? 0) },
  ];

  const countries = (countriesQ.data ?? []).slice(0, 4);

  const regionDonut = (byRegionQ.data ?? []).map((r, i) => ({
    label: r.region ?? "Unspecified",
    value: r.count,
    color: REGION_COLORS[i % REGION_COLORS.length],
  }));

  const maxSectorValue = Math.max(
    1,
    ...(sectorsQ.data ?? []).map((s) => s.total_value_naira),
  );
  const topSectors = (sectorsQ.data ?? [])
    .slice()
    .sort((a, b) => b.total_value_naira - a.total_value_naira)
    .slice(0, 5)
    .map((s) => ({
      title: s.sector?.name ?? `Sector #${s.sector_id}`,
      percent: Math.round((s.total_value_naira / maxSectorValue) * 100),
    }));

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          GLOBAL INVESTOR MAP
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of investor participation and interest by region
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
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
                        : idx === 2
                          ? "text-orange"
                          : idx === 3
                            ? "text-yellow"
                            : "text-green"
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

      <InvestmentHeatmapChart />

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            TOP COUNTRIES BY INVESTOR COUNT
          </h4>
          <span className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            Top {countries.length}
          </span>
        </div>
        <QueryState
          isLoading={countriesQ.isLoading}
          isError={countriesQ.isError}
          error={countriesQ.error as { message?: string } | null}
          isEmpty={countries.length === 0}
          emptyLabel="No country data yet."
        >
          <div className="flex lg:items-center flex-col lg:flex-row gap-1.5">
            {countries.map(({ country, investors_count }, i) => {
              const pct =
                totalInvestors > 0
                  ? ((investors_count / totalInvestors) * 100).toFixed(1) + "%"
                  : "—";
              return (
                <div
                  key={country}
                  className="border border-white/30 rounded-xl py-3.75 px-5 gap-8 flex-1 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-dmSans font-semibold">
                      {i + 1}
                    </span>
                    <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center text-white font-bold font-dmSans text-xs">
                      {country?.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h5 className="text-white text-sm font-dmSans font-semibold">
                      {country}
                    </h5>
                    <div className="flex items-center gap-4">
                      <span className="text-white text-xs font-dmSans font-light tabular-nums">
                        {fmtNumber(investors_count)}
                      </span>
                      <span className="text-white text-xs font-dmSans font-light">
                        {pct}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </QueryState>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              INVESTORS BY REGION
            </h4>
          </div>
          <QueryState
            isLoading={byRegionQ.isLoading}
            isError={byRegionQ.isError}
            error={byRegionQ.error as { message?: string } | null}
            isEmpty={regionDonut.length === 0}
            emptyLabel="No region breakdown yet."
          >
            <DonutChart data={regionDonut} />
          </QueryState>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TOP SECTORS OF INTEREST
            </h4>
          </div>
          <QueryState
            isLoading={sectorsQ.isLoading}
            isError={sectorsQ.isError}
            error={sectorsQ.error as { message?: string } | null}
            isEmpty={topSectors.length === 0}
            emptyLabel="No sector data yet."
          >
            <div className="flex flex-col gap-4">
              {topSectors.map(({ title, percent }) => (
                <div key={title} className="grid grid-cols-12">
                  <p className="col-span-4 text-white font-dmSans text-sm align-middle truncate">
                    {title}
                  </p>
                  <div className="col-span-7 flex items-center">
                    <div
                      className="rounded-full h-2.5 bg-green"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="col-span-1 text-white font-dmSans text-sm text-right tabular-nums">
                    {fmtCompact(percent)}%
                  </p>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              RECENT INVESTORS
            </h4>
          </div>
          <QueryState
            isLoading={investorsQ.isLoading}
            isError={investorsQ.isError}
            error={investorsQ.error as { message?: string } | null}
            isEmpty={(investorsQ.data ?? []).length === 0}
            emptyLabel="No recent investors yet."
          >
            <div className="flex flex-col gap-5">
              {(investorsQ.data ?? []).slice(0, 6).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center">
                      <FaYelp className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h6 className="text-white font-semibold text-sm font-dmSans">
                        {inv.name}
                      </h6>
                      <span className="text-white font-light text-xs font-dmSans">
                        {inv.investment_focus ?? inv.country ?? inv.region ?? ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-slate100 font-semibold text-sm font-dmSans">
                    {fmtRelative(
                      (inv as unknown as { created_at?: string }).created_at,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>
    </section>
  );
}

export default GlobalInvesorMap;
