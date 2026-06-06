import { useMemo } from "react";
import DonutChart from "@/components/Doughnut";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import {
  CircleArrowUp,
  Ellipsis,
  BadgeCheck,
  MessageCircle,
  Repeat2,
  Heart,
  ChartNoAxesColumn,
  Download,
  TrendingUp,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import {
  useDeals,
  useExecutiveKpis,
  useHeatmapSectors,
  useLatestResolutions,
  useProgrammeFlow,
  useSocialMentions,
} from "@/lib/api/hooks";
import {
  fmtCompact,
  fmtNaira,
  fmtNumber,
  fmtRelative,
  fmtTime,
} from "@/lib/api/format";
import type { Deal, DealStage, EventSession } from "@/lib/api/types";

const DEAL_LABEL: Record<DealStage, string> = {
  discussion: "Discussion",
  negotiation: "Negotiation",
  commitment: "Commitment",
  closed_won: "Closed (Won)",
  closed_lost: "Closed (Lost)",
};

function dealTone(stage: DealStage): string {
  switch (stage) {
    case "negotiation":
      return "border-yellow200 text-yellow200 bg-yellow100";
    case "discussion":
      return "border-blue400 bg-blue300 text-blue400";
    case "commitment":
      return "border-green250 text-green250 bg-green150";
    case "closed_won":
      return "border-green350 text-green350 bg-green450";
    case "closed_lost":
      return "border-red100 text-red100 bg-red200";
  }
}

function sessionLabel(s: EventSession): string {
  switch (s.status) {
    case "live":
      return "LIVE";
    case "completed":
      return "COMPLETED";
    case "delayed":
      return "DELAYED";
    case "cancelled":
      return "CANCELLED";
    default:
      return "UPCOMING";
  }
}

function sessionTone(s: EventSession): string {
  switch (s.status) {
    case "live":
      return "text-green350 bg-green450 border-green350";
    case "delayed":
      return "text-green350 bg-brown200 border-yellow400";
    case "cancelled":
      return "text-red100 bg-red200 border-red100";
    default:
      return "text-white border-slate400 bg-blue500";
  }
}

function ExecutiveView() {
  const kpisQ = useExecutiveKpis();
  const flowQ = useProgrammeFlow();
  const resolutionsQ = useLatestResolutions(8);
  const dealsQ = useDeals({ per_page: 5 });
  const mentionsQ = useSocialMentions({ per_page: 5 });
  const heatmapQ = useHeatmapSectors();

  const kpiCards = useMemo(() => {
    const k = kpisQ.data;
    const totalLive =
      (flowQ.data?.live.length ?? 0) + (flowQ.data?.next.length ?? 0);
    return [
      {
        label: "Total Attendance",
        value: fmtNumber(k?.attendance ?? 0),
        delta: "Live tally",
        tone: "text-cyan",
      },
      {
        label: "Sessions Completed",
        value: fmtNumber(k?.sessions_completed ?? 0),
        delta: `${k?.sessions_live ?? 0} Live Now`,
        tone: "text-green",
      },
      {
        label: "Deals in Motion",
        value: fmtNumber(dealsQ.data?.total ?? 0),
        delta: fmtNaira(k?.deals_value_naira ?? 0),
        tone: "text-orange",
      },
      {
        label: "Resolutions",
        value: fmtNumber(resolutionsQ.data?.length ?? 0),
        delta: "Recent",
        tone: "text-yellow",
      },
      {
        label: "Commitments",
        value: fmtNaira(k?.commitments_value_naira ?? 0),
        delta: `${totalLive} live + next`,
        tone: "text-white",
      },
    ];
  }, [kpisQ.data, flowQ.data, dealsQ.data, resolutionsQ.data]);

  // Live programme tracker = live + next + upcoming (first 5 by start time)
  const programmeRows = useMemo<EventSession[]>(() => {
    const f = flowQ.data;
    if (!f) return [];
    return [...f.live, ...f.next, ...f.upcoming]
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      );
  }, [flowQ.data]);

  // Top investment signals = top 3 sectors by total_value_naira
  const topSignals = useMemo(() => {
    const rows = heatmapQ.data ?? [];
    return [...rows]
      .sort((a, b) => (b.total_value_naira ?? 0) - (a.total_value_naira ?? 0))
      .slice(0, 3)
      .map((r, idx) => ({
        title: r.sector?.name ?? "Sector",
        value: r.total_value_naira ?? 0,
        signals: r.signals_count ?? 0,
        captured_at: r.captured_at,
        signal: idx === 0 ? "HIGH" : idx === 1 ? "MEDIUM" : "LOW",
      }));
  }, [heatmapQ.data]);

  const dealRows = dealsQ.data?.data ?? [];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          EXECUTIVE VIEW
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Live snapshot of attendance, sessions, deals, sentiment, and social
          conversation.
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpiCards.map(({ label, value, delta, tone }) => (
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
                  className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${tone}`}
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

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TOP INSIGHTS TODAY
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all
            </button>
          </div>

          <QueryState
            isLoading={resolutionsQ.isLoading}
            isError={resolutionsQ.isError}
            error={resolutionsQ.error as { message?: string } | null}
            isEmpty={(resolutionsQ.data ?? []).length === 0}
            emptyLabel="No insights captured yet."
          >
            <div className="flex flex-col gap-4">
              {(resolutionsQ.data ?? []).slice(0, 7).map((r) => (
                <div key={r.id} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan shrink-0 mt-1"></div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h6 className="text-sm font-dmSans font-semibold text-white">
                      {r.title}
                    </h6>
                    <span className="text-xs font-dmSans font-light text-white/80">
                      {r.sector?.name ?? r.committed_by ?? r.session?.title ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TOP INVESTMENT SIGNALS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all
            </button>
          </div>

          <QueryState
            isLoading={heatmapQ.isLoading}
            isError={heatmapQ.isError}
            error={heatmapQ.error as { message?: string } | null}
            isEmpty={topSignals.length === 0}
            emptyLabel="No investment signals yet."
          >
            <div className="flex flex-col gap-6">
              {topSignals.map(
                ({ title, value, signals, captured_at, signal }, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 justify-between py-4 px-5 border border-white rounded-2xl border-l-4 ${
                      signal === "HIGH"
                        ? "border-l-red100"
                        : signal === "MEDIUM"
                          ? "border-l-yellow"
                          : "border-l-cyan"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div
                        className={`rounded-md py-1.25 px-3.75 text-[10px] font-dmSans font-medium uppercase self-start ${
                          signal === "HIGH"
                            ? "bg-red200 text-red100"
                            : signal === "MEDIUM"
                              ? "bg-brown100 text-yellow300"
                              : "bg-blue300 text-blue400"
                        }`}
                      >
                        {signal} signal
                      </div>
                      <div className="flex flex-col gap-2">
                        <h6 className="text-sm font-dmSans font-semibold text-white">
                          {fmtNaira(value)} in {title}
                        </h6>
                        <span className="text-xs font-dmSans font-light text-white/80">
                          {signals} signals tracked
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 items-end">
                      <p className="text-white font-dmSans font-light text-xs">
                        {fmtRelative(captured_at)}
                      </p>
                      <TrendingUp className="text-white w-6" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-7">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            DEALS IN MOTION
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="flex flex-col gap-8 min-w-150">
            <div className="flex items-center gap-3 justify-between">
              <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
                PARTNER
              </h6>
              <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
                SECTOR
              </h6>
              <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
                STAGE
              </h6>
              <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
                VALUE
              </h6>
            </div>
            <QueryState
              isLoading={dealsQ.isLoading}
              isError={dealsQ.isError}
              error={dealsQ.error as { message?: string } | null}
              isEmpty={dealRows.length === 0}
              emptyLabel="No deals yet."
            >
              <div className="flex flex-col gap-4">
                {dealRows.map((d: Deal) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-3 px-2 py-1 border border-white/40 rounded-2xl"
                  >
                    <div className="text-white font-dmSans font-semibold text-sm flex-1">
                      {d.investor_name ?? d.title}
                    </div>
                    <div className="text-white font-dmSans font-semibold text-sm text-left flex-1">
                      {d.sector?.name ?? "—"}
                    </div>
                    <div className="flex-1 flex items-center">
                      <div
                        className={`border rounded py-2 px-5 text-xs ${dealTone(d.stage)}`}
                      >
                        {DEAL_LABEL[d.stage]}
                      </div>
                    </div>
                    <div className="text-white font-dmSans font-semibold text-sm text-left flex-1">
                      {fmtNaira(d.value_naira ?? 0)}
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              LIVE PROGRAMME TRACKER
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View full schedule
            </button>
          </div>
          <QueryState
            isLoading={flowQ.isLoading}
            isError={flowQ.isError}
            error={flowQ.error as { message?: string } | null}
            isEmpty={programmeRows.length === 0}
            emptyLabel="No live sessions."
          >
            <div className="overflow-x-auto">
              <div className="flex flex-col gap-10 min-w-130">
                {programmeRows.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-4 justify-between"
                  >
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          s.status === "live" ? "bg-green100" : "bg-white/60"
                        }`}
                      ></div>
                      <span className="text-white font-dmSans text-sm font-semibold">
                        {fmtTime(s.starts_at)}
                      </span>
                    </div>
                    <p className="text-white font-dmSans text-sm font-semibold flex-1 px-2 truncate">
                      {s.title}
                    </p>
                    <p className="text-white font-dmSans text-sm font-semibold">
                      {s.venue?.name ?? "—"}
                    </p>
                    <div
                      className={`rounded-md border py-1.25 px-3.75 text-[10px] font-dmSans font-medium w-26 flex justify-center ${sessionTone(s)}`}
                    >
                      {sessionLabel(s)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              RESOLUTION BOARD (LIVE)
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all
            </button>
          </div>

          <QueryState
            isLoading={resolutionsQ.isLoading}
            isError={resolutionsQ.isError}
            error={resolutionsQ.error as { message?: string } | null}
            isEmpty={(resolutionsQ.data ?? []).length === 0}
            emptyLabel="No resolutions yet."
          >
            <div className="flex flex-col gap-4">
              {(resolutionsQ.data ?? []).slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan shrink-0 mt-1"></div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h6 className="text-sm font-dmSans font-semibold text-white">
                      {r.title}
                    </h6>
                    <span className="text-xs font-dmSans font-light text-white/80">
                      {fmtTime(r.recorded_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              INVESTMENT HEATMAP
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all report
            </button>
          </div>
          <QueryState
            isLoading={heatmapQ.isLoading}
            isError={heatmapQ.isError}
            error={heatmapQ.error as { message?: string } | null}
            isEmpty={(heatmapQ.data ?? []).length === 0}
            emptyLabel="No heatmap data."
          >
            <DonutChart
              data={(() => {
                const palette = [
                  "#9747FF",
                  "#13A13E",
                  "#FF8D28",
                  "#00C8B3",
                  "#B91293",
                  "#9A9DA6",
                ];
                return (heatmapQ.data ?? [])
                  .slice(0, 6)
                  .map((r, i) => ({
                    label: r.sector?.name ?? `Sector ${r.sector_id ?? ""}`,
                    value: Math.max(1, Math.round((r.total_value_naira ?? 0) / 1_000_000)),
                    color: palette[i % palette.length],
                  }));
              })()}
            />
          </QueryState>
        </div>
        <SentimentAnalysis />
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            SOCIAL MEDIA LIVE FEED
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all
          </button>
        </div>

        <QueryState
          isLoading={mentionsQ.isLoading}
          isError={mentionsQ.isError}
          error={mentionsQ.error as { message?: string } | null}
          isEmpty={(mentionsQ.data?.data ?? []).length === 0}
          emptyLabel="No mentions yet."
        >
          <div className="flex flex-col gap-5">
            {(mentionsQ.data?.data ?? []).map((m) => (
              <div
                key={m.id}
                className="border border-white/55 rounded-2xl px-3 sm:px-4 py-4 pb-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-4">
                    {m.author_avatar_url ? (
                      <img
                        src={m.author_avatar_url}
                        alt=""
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                        {(m.author_name ?? m.author_handle).charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-white text-base font-bold font-inter">
                          {m.author_name ?? m.author_handle}
                        </h5>
                        <BadgeCheck className="w-6 h-6 fill-blue" />
                      </div>
                      <h6 className="text-white text-xs font-inter">
                        {m.author_handle} · {m.platform}
                      </h6>
                    </div>
                  </div>
                  <button>
                    <Ellipsis className="text-white w-5" />
                  </button>
                </div>

                <p className="text-white text-sm font-inter font-light">
                  {m.body}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-inter font-light">
                    {fmtTime(m.posted_at)} ·
                  </span>
                  <span className="text-white text-xs font-inter font-light">
                    {fmtRelative(m.posted_at)}
                  </span>
                </div>
                <div className="w-full h-px bg-white/70"></div>
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.comments)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.shares)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChartNoAxesColumn className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.impressions)}
                    </span>
                  </div>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </QueryState>
      </section>
    </section>
  );
}

export default ExecutiveView;
