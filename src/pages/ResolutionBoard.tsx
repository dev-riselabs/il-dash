// Wired Resolution Board — live /resolutions endpoints + breakdowns.
import {
  CircleArrowUp,
  CircleCheck,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
} from "lucide-react";
import { useMemo, useState } from "react";
import DonutChart from "../components/Doughnut";
import {
  useLatestResolutions,
  useResolutionKpis,
  useResolutions,
  useResolutionsByCategory,
  useResolutionsBySector,
} from "@/lib/api/hooks";
import { fmtNaira, fmtTime } from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";
import type {
  Resolution,
  ResolutionCategory,
  ResolutionStage,
} from "@/lib/api/types";

type StageTabKey = "all" | ResolutionStage;

const STAGE_TABS: { key: StageTabKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "commitment", label: "COMMITMENT" },
  { key: "negotiation", label: "NEGOTIATION" },
  { key: "signed", label: "SIGNED" },
  { key: "fulfilled", label: "FULFILLED" },
];

const STAGE_LABEL: Record<ResolutionStage, string> = {
  commitment: "Commitment",
  negotiation: "Negotiation",
  signed: "Signed",
  fulfilled: "Fulfilled",
};

const STAGE_BORDER: Record<ResolutionStage, string> = {
  commitment: "border-green text-green",
  negotiation: "border-orange text-orange",
  signed: "border-cyan text-cyan",
  fulfilled: "border-green100 text-green100",
};

const CATEGORY_LABEL: Record<ResolutionCategory, string> = {
  commitment: "Commitments",
  partnership: "Partnerships",
  policy: "Policy",
  keynote: "Keynotes",
  panel: "Panel Discussion",
};

const CATEGORY_COLOR: Record<ResolutionCategory, string> = {
  commitment: "#CB3CFF",
  partnership: "#13A13E",
  policy: "#F66202",
  keynote: "#FFB800",
  panel: "#00C2FF",
};

const SECTOR_BAR_TONE = [
  "bg-green",
  "bg-yellow",
  "bg-orange",
  "bg-cyan",
  "bg-purple",
  "bg-red",
  "bg-mint",
];

const PER_PAGE = 8;

function ResolutionBoard() {
  const [stage, setStage] = useState<StageTabKey>("all");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      ...(stage === "all" ? {} : { stage }),
      page,
      per_page: PER_PAGE,
    }),
    [stage, page],
  );

  const kpisQ = useResolutionKpis();
  const listQ = useResolutions(params);
  const byCategoryQ = useResolutionsByCategory();
  const bySectorQ = useResolutionsBySector();
  const latestQ = useLatestResolutions(5);

  const categoryCount = (key: ResolutionCategory) =>
    (byCategoryQ.data ?? []).find((c) => c.category === key)?.count ?? 0;

  const kpis = [
    {
      label: "Total Resolutions",
      value: kpisQ.data?.total ?? 0,
      delta: `${kpisQ.data?.today ?? 0} New Today`,
    },
    {
      label: "Commitments",
      value: categoryCount("commitment"),
      delta: "Live count",
    },
    {
      label: "Partnerships",
      value: categoryCount("partnership"),
      delta: "Live count",
    },
    {
      label: "Policy Actions",
      value: categoryCount("policy"),
      delta: "Live count",
    },
    {
      label: "Est. Investment Impact",
      value: fmtNaira(kpisQ.data?.total_impact_naira ?? 0),
      delta: "Across all stages",
    },
  ];
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          RESOLUTION BOARD (LIVE)
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of outcomes, commitments and next steps from Invest
          Lagos3.0
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
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
                  className={`text-2xl sm:text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                    idx === 0
                      ? "text-cyan"
                      : idx === 1
                        ? "text-green"
                        : idx === 2
                          ? "text-orange"
                          : idx === 3
                            ? "text-yellow"
                            : idx === 4
                              ? "text-green"
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

      <section className="border border-white rounded-2xl px-5 sm:px-7.5 py-2.5 flex flex-col gap-6">
        <menu className="flex items-center gap-3 justify-between overflow-x-auto">
          {STAGE_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setStage(t.key);
                setPage(1);
              }}
              className={`px-3 py-1 text-sm font-lexend font-medium rounded-lg flex-1 whitespace-nowrap ${
                stage === t.key
                  ? "border-b-2 border-b-orange text-orange"
                  : "text-slate100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </menu>

        <div className="overflow-hidden flex flex-col gap-7.5 overflow-x-auto">
          <div className="grid grid-cols-12 gap-8 min-w-400">
            <div className="text-sm font-lexend font-bold text-slate100 col-span-4">
              Resolution / Commitment
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Category
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-2 text-center">
              Sector
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-2 text-center">
              Committed By
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Stage
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Impact(EST.)
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Time Added
            </div>
          </div>

          <QueryState
            isLoading={listQ.isLoading}
            isError={listQ.isError}
            error={listQ.error}
            isEmpty={(listQ.data?.data.length ?? 0) === 0}
            emptyLabel="No resolutions found for this filter."
          >
            <div className="flex flex-col gap-6 min-w-400">
              {(listQ.data?.data ?? []).map((r) => (
                <ResolutionRow key={r.id} resolution={r} />
              ))}
            </div>
          </QueryState>
        </div>

        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4 font-lexend text-white text-sm">
            <p>Showing</p>
            <p>
              {listQ.data?.from ?? 0} to {listQ.data?.to ?? 0} of{" "}
              {listQ.data?.total ?? 0}
            </p>
            <p>resolutions</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              disabled={page <= 1 || listQ.isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft className="text-white w-3 h-3" />
            </button>
            <button
              disabled={
                listQ.isLoading ||
                (listQ.data ? page >= listQ.data.last_page : true)
              }
              onClick={() => setPage((p) => p + 1)}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight className="text-white w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      <section className="border border-white rounded-2xl px-5 sm:px-7.5 py-2.5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            LATEST ADDITIONS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View All
          </button>
        </div>
        <QueryState
          isLoading={latestQ.isLoading}
          isError={latestQ.isError}
          error={latestQ.error}
          isEmpty={(latestQ.data?.length ?? 0) === 0}
          emptyLabel="No latest resolutions yet."
        >
          <div className="flex flex-col gap-6">
            {(latestQ.data ?? []).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 text-white font-lexend text-xs sm:text-sm">
                  <CircleCheck className="fill-green text-black" /> {r.title}
                </div>
                <div className="text-white font-lexend text-xs sm:text-sm">
                  {fmtTime(r.recorded_at)}
                </div>
              </div>
            ))}
          </div>
        </QueryState>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            RESOLUTIONS BY CATEGORY
          </h4>
          <QueryState
            isLoading={byCategoryQ.isLoading}
            isError={byCategoryQ.isError}
            error={byCategoryQ.error}
            isEmpty={(byCategoryQ.data?.length ?? 0) === 0}
            emptyLabel="No category data yet."
          >
            <DonutChart
              data={(byCategoryQ.data ?? []).map((c) => ({
                label:
                  CATEGORY_LABEL[c.category as ResolutionCategory] ?? c.category,
                value: c.count,
                color:
                  CATEGORY_COLOR[c.category as ResolutionCategory] ?? "#888",
              }))}
            />
          </QueryState>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            RESOLUTIONS BY SECTOR
          </h4>
          <QueryState
            isLoading={bySectorQ.isLoading}
            isError={bySectorQ.isError}
            error={bySectorQ.error}
            isEmpty={(bySectorQ.data?.length ?? 0) === 0}
            emptyLabel="No sector data yet."
          >
            <SectorBreakdown rows={bySectorQ.data ?? []} />
          </QueryState>
        </div>
      </section>
    </section>
  );
}

function ResolutionRow({ resolution }: { resolution: Resolution }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="flex items-center gap-1.5 col-span-4">
        <div className="w-12 h-12 rounded-md bg-green200 shrink-0" />
        <div className="flex flex-col gap-2">
          <h5 className="text-white font-dmSans text-sm font-semibold">
            {resolution.title}
          </h5>
          {resolution.description ? (
            <p className="text-white font-dmSans text-xs font-light line-clamp-2">
              {resolution.description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-center col-span-1">
        <div className="bg-slate200 px-3 py-2 rounded-md text-white font-lexend text-xs font-semibold text-center">
          {CATEGORY_LABEL[resolution.category] ?? resolution.category}
        </div>
      </div>
      <div className="text-xs font-lexend text-white flex justify-center items-center col-span-2 text-center">
        {resolution.sector?.name ?? "—"}
      </div>
      <div className="text-xs font-lexend text-white flex justify-center items-center col-span-2 text-center">
        {resolution.committed_by ?? "—"}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div
          className={`border-2 rounded-md py-1 px-3 text-xs font-lexend font-semibold ${STAGE_BORDER[resolution.stage]}`}
        >
          {STAGE_LABEL[resolution.stage]}
        </div>
      </div>
      <div className="text-green text-sm font-medium flex items-center justify-center col-span-1">
        {fmtNaira(resolution.estimated_impact_naira ?? 0)}
      </div>
      <div className="flex items-center justify-between gap-1 text-white font-lexend text-sm col-span-1">
        {fmtTime(resolution.recorded_at)}
        <button>
          <EllipsisVertical className="text-white" />
        </button>
      </div>
    </div>
  );
}

function SectorBreakdown({
  rows,
}: {
  rows: Array<{ sector_id: number | null; count: number; sector?: { name?: string } | null }>;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="flex flex-col gap-4">
      {rows.slice(0, 8).map((r, i) => {
        const name = r.sector?.name ?? (r.sector_id ? `Sector ${r.sector_id}` : "Unassigned");
        const pct = Math.round((r.count / max) * 100);
        return (
          <div key={`${r.sector_id ?? "none"}-${i}`} className="grid grid-cols-12 gap-2">
            <p className="col-span-4 text-white font-dmSans text-sm">{name}</p>
            <div className="col-span-7 flex items-center">
              <div
                className={`rounded-full h-2.5 ${SECTOR_BAR_TONE[i % SECTOR_BAR_TONE.length]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="col-span-1 text-white font-dmSans text-sm text-right">
              {r.count}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ResolutionBoard;
