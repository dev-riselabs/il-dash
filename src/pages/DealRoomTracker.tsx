// Wired Deal Room Tracker — paginated /deals plus heatmap + investor widgets.
import { ChevronsLeft, ChevronsRight, CircleArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  useDeals,
  useHeatmapSectors,
  useInvestors,
  useRecentInvestors,
} from "@/lib/api/hooks";
import { fmtNaira, fmtRelative } from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";
import type {
  Deal,
  DealStage,
  Investor,
  Paginated,
  SectorInvestmentSummary,
} from "@/lib/api/types";

type StageTabKey = "all" | DealStage;

const STAGE_TABS: { key: StageTabKey; label: string }[] = [
  { key: "all", label: "ALL DEALS" },
  { key: "discussion", label: "IN DISCUSSION" },
  { key: "negotiation", label: "NEGOTIATION" },
  { key: "commitment", label: "COMMITMENT" },
  { key: "closed_won", label: "CLOSED WON" },
  { key: "closed_lost", label: "CLOSED LOST" },
];

const STAGE_LABEL: Record<DealStage, string> = {
  discussion: "IN DISCUSSION",
  negotiation: "NEGOTIATION",
  commitment: "COMMITMENT",
  closed_won: "CLOSED WON",
  closed_lost: "CLOSED LOST",
};

const STAGE_BORDER: Record<DealStage, string> = {
  discussion: "border-green750 text-green100",
  negotiation: "border-orange text-orange",
  commitment: "border-yellow text-yellow",
  closed_won: "border-green100 text-green100",
  closed_lost: "border-slate600 text-slate600",
};

const PER_PAGE = 8;
const KPI_TONE = ["text-cyan", "text-green", "text-orange", "text-yellow", "text-green"];

function DealRoomTracker() {
  const [tab, setTab] = useState<StageTabKey>("all");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      ...(tab === "all" ? {} : { stage: tab }),
      page,
      per_page: PER_PAGE,
    }),
    [tab, page],
  );

  const dealsQ = useDeals(params);
  const discussionQ = useDeals({ stage: "discussion", per_page: 1 });
  const closedWonQ = useDeals({ stage: "closed_won", per_page: 1 });
  const commitmentQ = useDeals({ stage: "commitment", per_page: 1 });
  const investorsQ = useInvestors({ per_page: 1 });
  const sectorsQ = useHeatmapSectors();
  const recentInvestorsQ = useRecentInvestors();

  const pageDealValue = (dealsQ.data?.data ?? []).reduce(
    (sum, d) => sum + (d.value_naira ?? 0),
    0,
  );

  const kpis = [
    { label: "Deals in Discussion", value: discussionQ.data?.total ?? 0, delta: "Live count" },
    { label: "Active Investors", value: investorsQ.data?.total ?? 0, delta: "All registered" },
    {
      label: "Total Value (page)",
      value: fmtNaira(pageDealValue),
      delta: `${dealsQ.data?.data.length ?? 0} on page`,
    },
    {
      label: "Deals Won",
      value: closedWonQ.data?.total ?? 0,
      delta: `${commitmentQ.data?.total ?? 0} in commitment`,
    },
    { label: "Stages", value: 5, delta: "Across pipeline" },
  ];

  const maxSectorValue = Math.max(
    1,
    ...(sectorsQ.data ?? []).map((s) => s.total_value_naira ?? 0),
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          DEAL ROOM TRACKER
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Track, monitor and close investment opportunities in real time.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div key={label} className="border border-white/30 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${KPI_TONE[idx]}`}>
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

      <DealsCard
        tab={tab}
        setTab={(k) => { setTab(k); setPage(1); }}
        dealsQ={dealsQ}
        page={page}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />

      <SectorsAndInvestors
        sectorsQ={sectorsQ}
        investorsQ={recentInvestorsQ}
        maxSectorValue={maxSectorValue}
      />
    </section>
  );
}

export default DealRoomTracker;

function DealsCard({
  tab,
  setTab,
  dealsQ,
  page,
  onPrev,
  onNext,
}: {
  tab: StageTabKey;
  setTab: (k: StageTabKey) => void;
  dealsQ: UseQueryResult<Paginated<Deal>, Error>;
  page: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
      <menu className="flex items-center gap-3 justify-between overflow-x-auto">
        {STAGE_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1 text-sm font-lexend font-medium rounded-lg flex-1 whitespace-nowrap ${
              tab === t.key ? "border-b-2 border-b-orange text-orange" : "text-slate100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </menu>

      <div className="flex flex-col gap-8">
        <div className="overflow-hidden overflow-x-auto">
          <div className="flex flex-col gap-6 min-w-360">
            <div className="grid grid-cols-12 gap-6">
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-4">Deal / Project</h5>
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-1 text-center">Sector</h5>
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-3">Investor / Partner</h5>
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-2 text-center">Stage</h5>
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-1">Deal Value</h5>
              <h5 className="font-lexend font-bold text-base text-slate100 col-span-1">Last Activity</h5>
            </div>
            <QueryState
              isLoading={dealsQ.isLoading}
              isError={dealsQ.isError}
              error={dealsQ.error}
              isEmpty={(dealsQ.data?.data.length ?? 0) === 0}
              emptyLabel="No deals found for this filter."
            >
              <div className="flex flex-col gap-4">
                {(dealsQ.data?.data ?? []).map((d) => (
                  <DealRow key={d.id} deal={d} />
                ))}
              </div>
            </QueryState>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4 font-lexend text-white text-sm">
            <p>Showing</p>
            <p>
              {dealsQ.data?.from ?? 0} to {dealsQ.data?.to ?? 0} of {dealsQ.data?.total ?? 0}
            </p>
            <p>deals</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              disabled={page <= 1 || dealsQ.isLoading}
              onClick={onPrev}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft className="text-white w-3 h-3" />
            </button>
            <button
              disabled={dealsQ.isLoading || (dealsQ.data ? page >= dealsQ.data.last_page : true)}
              onClick={onNext}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight className="text-white w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DealRow({ deal }: { deal: Deal }) {
  const sectorName = deal.sector?.name ?? "—";
  const sectorColour = deal.sector?.color ?? "";
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-white shrink-0" />
        <div className="flex flex-col gap-1 font-lexend">
          <h6 className="text-white font-light text-sm">{deal.title}</h6>
          <span className="text-white font-light text-[10px]">{sectorName}</span>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div
          className="py-2 px-2 rounded-md border text-xs font-lexend font-light"
          style={sectorColour ? { borderColor: sectorColour, color: sectorColour } : undefined}
        >
          {sectorName}
        </div>
      </div>
      <div className="col-span-3 flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-white" />
        <div className="flex flex-col gap-1 font-lexend">
          <span className="text-white font-light text-xs">{deal.investor?.name ?? "—"}</span>
          <span className="text-white font-light text-[10px]">
            {deal.owner?.name ?? ""}
          </span>
        </div>
      </div>
      <div
        className={`col-span-2 rounded-xl py-1 border-2 text-sm font-semibold font-lexend flex items-center justify-center ${STAGE_BORDER[deal.stage]}`}
      >
        {STAGE_LABEL[deal.stage]}
      </div>
      <span className="text-white text-sm font-semibold font-lexend col-span-1">
        {fmtNaira(deal.value_naira)}
      </span>
      <span className="text-green100 text-sm font-lexend col-span-1">
        {fmtRelative(deal.updated_at ?? deal.opened_at)}
      </span>
    </div>
  );
}

function SectorsAndInvestors({
  sectorsQ,
  investorsQ,
  maxSectorValue,
}: {
  sectorsQ: UseQueryResult<SectorInvestmentSummary[], Error>;
  investorsQ: UseQueryResult<Investor[], Error>;
  maxSectorValue: number;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
          DEAL VALUE BY SECTOR
        </h4>
        <QueryState
          isLoading={sectorsQ.isLoading}
          isError={sectorsQ.isError}
          error={sectorsQ.error}
          isEmpty={(sectorsQ.data?.length ?? 0) === 0}
          emptyLabel="No sector data yet."
        >
          <div className="flex flex-col gap-4">
            {(sectorsQ.data ?? []).slice(0, 6).map((s) => {
              const score = Math.round(((s.total_value_naira ?? 0) / maxSectorValue) * 100);
              const tone =
                score > 90 ? "bg-green" : score > 70 ? "bg-yellow" : score > 50 ? "bg-orange" : "bg-red";
              return (
                <div key={s.id} className="grid grid-cols-12 gap-4">
                  <p className="text-white font-dmSans text-sm col-span-3">
                    {s.sector?.name ?? `Sector ${s.sector_id}`}
                  </p>
                  <div className="col-span-7 sm:col-span-8">
                    <div className={`h-5 ${tone}`} style={{ width: `${score}%` }} />
                  </div>
                  <p className="text-white font-dmSans text-sm col-span-1">{score}%</p>
                </div>
              );
            })}
          </div>
        </QueryState>
      </div>

      <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
          RECENT INVESTORS
        </h4>
        <QueryState
          isLoading={investorsQ.isLoading}
          isError={investorsQ.isError}
          error={investorsQ.error}
          isEmpty={(investorsQ.data?.length ?? 0) === 0}
          emptyLabel="No recent investors."
        >
          <div className="flex flex-col gap-4">
            {(investorsQ.data ?? []).slice(0, 6).map((inv, i) => {
              const dotTone =
                ["bg-yellow text-black", "text-white bg-orange", "text-white bg-red", "text-white bg-purple", "text-white bg-green", "bg-mint text-black"][i] ??
                "bg-mint text-black";
              return (
                <div key={inv.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full w-7.5 h-7.5 text-sm font-light font-dmSans flex items-center justify-center ${dotTone}`}>
                      {i + 1}
                    </div>
                    <span className="text-white font-medium text-sm font-dmSans">{inv.name}</span>
                  </div>
                  <span className="text-white font-medium text-sm font-dmSans">{inv.country ?? "—"}</span>
                </div>
              );
            })}
          </div>
        </QueryState>
      </div>
    </section>
  );
}

