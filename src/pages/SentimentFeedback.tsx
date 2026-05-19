import { useMemo, useState } from "react";
import { CircleArrowUp } from "lucide-react";

import DonutChart from "@/components/Doughnut";
import Rating from "@/components/Rating";
import SentimentChart from "@/components/SentimentChart";
import { QueryState } from "@/components/ui/QueryState";
import {
  useAnalyticsByTrack,
  useEventDays,
  useFeedback,
  useFeedbackKpis,
  useLatestFeedback,
  useResolutionsBySector,
  useSectors,
  useSentimentBySector,
  useSentimentTrend,
  useSessionOptions,
  useSessionRatings,
  useTracks,
} from "@/lib/api/hooks";
import { fmtNumber, fmtPercent, fmtTime, fullName } from "@/lib/api/format";

const TRACK_COLORS = [
  "#CB3CFF",
  "#13A13E",
  "#F66202",
  "#3DC0FF",
  "#FFAE4C",
  "#A66EFA",
  "#F6001A",
];

const CHANNEL_COLORS: Record<string, string> = {
  qr: "#CB3CFF",
  mobile: "#13A13E",
  website: "#F66202",
  other: "#FFAE4C",
};

function SentimentFeedback() {
  const [sessionId, setSessionId] = useState<string>("");
  const [trackId, setTrackId] = useState<string>("");
  const [dayId, setDayId] = useState<string>("");

  const kpisQ = useFeedbackKpis();
  const trendQ = useSentimentTrend(7);
  const byTrackQ = useAnalyticsByTrack();
  const sessionRatingsQ = useSessionRatings();
  const bySectorQ = useResolutionsBySector();
  const sentimentBySectorQ = useSentimentBySector();
  const sectorsQ = useSectors();
  const latestQ = useLatestFeedback(8);
  const sampleFeedbackQ = useFeedback({ per_page: 100 });

  const sessionOptsQ = useSessionOptions();
  const tracksQ = useTracks();
  const daysQ = useEventDays();

  const k = kpisQ.data;
  const overallScore = useMemo(() => {
    const t = trendQ.data;
    if (!t || t.length === 0) return null;
    return Math.round(t[t.length - 1].net_score);
  }, [trendQ.data]);
  const positivePct =
    k && k.total_submissions > 0
      ? (k.positive_count / k.total_submissions) * 100
      : 0;
  const neutralPct =
    k && k.total_submissions > 0
      ? Math.max(
          0,
          100 -
            (k.positive_count / k.total_submissions) * 100 -
            (k.negative_count / k.total_submissions) * 100,
        )
      : 0;

  const kpis = [
    {
      label: "Overall Sentiment Score",
      value: overallScore !== null ? `${overallScore} /100` : "—",
    },
    { label: "Total Feedback Received", value: fmtNumber(k?.total_submissions ?? 0) },
    { label: "Avg. Session Rating", value: `${(k?.avg_rating ?? 0).toFixed(1)} /5` },
    { label: "Positive Feedback", value: fmtPercent(positivePct, 0) },
    { label: "Neutral Feedback", value: fmtPercent(neutralPct, 0) },
  ];

  // ---- Derived donut data --------------------------------------------------
  const trackDonut = (byTrackQ.data ?? []).map((row, i) => ({
    label: row.track?.name ?? "Untracked",
    value: row.attendance,
    color: TRACK_COLORS[i % TRACK_COLORS.length],
  }));

  const channelDonut = useMemo(() => {
    const rows = sampleFeedbackQ.data?.data ?? [];
    const grouped = rows.reduce<Record<string, number>>((acc, r) => {
      const key = r.channel ?? "other";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).map(([label, value]) => ({
      label: label === "qr" ? "QR Feedback" : label.charAt(0).toUpperCase() + label.slice(1),
      value,
      color: CHANNEL_COLORS[label] ?? "#3DC0FF",
    }));
  }, [sampleFeedbackQ.data]);

  // ---- Sector sentiment join ----------------------------------------------
  const sectorById = useMemo(() => {
    const m = new Map<number, string>();
    (sectorsQ.data ?? []).forEach((s) => m.set(s.id, s.name));
    return m;
  }, [sectorsQ.data]);

  const sectorRows = (sentimentBySectorQ.data ?? [])
    .map((s) => ({
      title: s.scope_ref_id ? (sectorById.get(s.scope_ref_id) ?? `Sector #${s.scope_ref_id}`) : "Overall",
      percent: Math.round(Number(s.positive_pct ?? 0)),
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 8);

  const ratedSessions = (sessionRatingsQ.data ?? [])
    .slice(0, 8)
    .map((r) => ({
      title: r.title,
      score: (r.average_rating_x10 ?? 0) / 10,
    }));

  const resolutionsBySectorRows = (bySectorQ.data ?? [])
    .slice(0, 6)
    .map((row) => ({
      title: row.sector?.name ?? "Unassigned",
      count: row.count,
    }));
  const maxResolutionCount = Math.max(1, ...resolutionsBySectorRows.map((r) => r.count));

  // Filter wiring: only useFeedback supports event_session_id today.
  void trackId;
  void dayId;
  void sessionId;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          SENTIMENT & FEEDBACK
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time audience sentiment, feedback and session ratings
        </p>
      </div>

      <div className="flex flex-row sm:items-center gap-3 lg:flex-row flex-wrap">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="">All Sessions</option>
            {(sessionOptsQ.data ?? []).map((s) => (
              <option key={s.id} value={s.id} className="text-black">
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="">All tracks</option>
            {(tracksQ.data ?? []).map((t) => (
              <option key={t.id} value={t.id} className="text-black">
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={dayId}
            onChange={(e) => setDayId(e.target.value)}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="">All Days</option>
            {(daysQ.data ?? []).map((d) => (
              <option key={d.id} value={d.id} className="text-black">
                {d.label ?? `Day ${d.day_index}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI grid */}
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
                            : idx === 4
                              ? "text-red"
                              : "text-white"
                  }`}
                >
                  {kpisQ.isLoading || trendQ.isLoading ? "…" : value}
                </div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto">
              <CircleArrowUp color="white" width={"20px"} />
              {idx === 0 ? "Live" : "Updated"}
            </div>
          </div>
        ))}
      </div>

      <SentimentChart points={trendQ.data} />

      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-7 ">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            ATTENDANCE BY TRACK
          </h4>
          <QueryState
            isLoading={byTrackQ.isLoading}
            isError={byTrackQ.isError}
            error={byTrackQ.error as { message?: string } | null}
            isEmpty={trackDonut.length === 0}
            emptyLabel="No attendance data yet."
          >
            <DonutChart data={trackDonut} />
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-5 ">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            FEEDBACK CHANNELS
          </h4>
          <QueryState
            isLoading={sampleFeedbackQ.isLoading}
            isError={sampleFeedbackQ.isError}
            error={sampleFeedbackQ.error as { message?: string } | null}
            isEmpty={channelDonut.length === 0}
            emptyLabel="No feedback yet."
          >
            <DonutChart small data={channelDonut} />
          </QueryState>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-7">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            SESSION SENTIMENT SCORES
          </h4>

          <QueryState
            isLoading={sessionRatingsQ.isLoading || sentimentBySectorQ.isLoading}
            isError={sessionRatingsQ.isError}
            error={sessionRatingsQ.error as { message?: string } | null}
            isEmpty={ratedSessions.length === 0 && sectorRows.length === 0}
            emptyLabel="No session sentiment yet."
          >
            <div className="flex flex-col gap-4">
              {(ratedSessions.length > 0 ? ratedSessions : []).map(({ title, score }) => {
                const pct = Math.round((score / 5) * 100);
                return (
                  <div key={title} className="grid grid-cols-12 gap-2">
                    <p className="col-span-4 text-white font-dmSans text-xs align-middle truncate">
                      {title}
                    </p>
                    <div className="col-span-7 flex items-center">
                      <div
                        className={`rounded-full h-2.5 ${pct < 60 ? "bg-red" : "bg-green"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="col-span-1 text-white font-dmSans text-sm flex items-center justify-center">
                      {pct}%
                    </p>
                  </div>
                );
              })}
              {ratedSessions.length === 0 &&
                sectorRows.map(({ title, percent }, i) => (
                  <div key={title + i} className="grid grid-cols-12 gap-2">
                    <p className="col-span-4 text-white font-dmSans text-xs align-middle truncate">
                      {title}
                    </p>
                    <div className="col-span-7 flex items-center">
                      <div
                        className={`rounded-full h-2.5 ${percent < 60 ? "bg-red" : "bg-green"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="col-span-1 text-white font-dmSans text-sm flex items-center justify-center">
                      {percent}%
                    </p>
                  </div>
                ))}
            </div>
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-5">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            RESOLUTIONS BY SECTOR
          </h4>

          <QueryState
            isLoading={bySectorQ.isLoading}
            isError={bySectorQ.isError}
            error={bySectorQ.error as { message?: string } | null}
            isEmpty={resolutionsBySectorRows.length === 0}
            emptyLabel="No resolutions yet."
          >
            <div className="flex flex-col gap-4">
              {resolutionsBySectorRows.map(({ title, count }) => (
                <div key={title} className="grid grid-cols-12 gap-2">
                  <p className="col-span-4 text-white font-dmSans text-sm align-middle truncate">
                    {title}
                  </p>
                  <div className="col-span-7 flex items-center">
                    <div
                      className="rounded-full h-2.5 bg-green"
                      style={{
                        width: `${Math.round((count / maxResolutionCount) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="col-span-1 text-white font-dmSans text-sm flex items-center justify-center">
                    {count}
                  </p>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <div className="flex items-center gap-4 justify-between">
          <h4 className="text-sm sm:text-base font-lexend text-white font-medium uppercase">
            LATEST ADDITIONS
          </h4>
          <button className="text-sm sm:text-base font-lexend text-cyan font-semibold">
            View All
          </button>
        </div>

        <QueryState
          isLoading={latestQ.isLoading}
          isError={latestQ.isError}
          error={latestQ.error as { message?: string } | null}
          isEmpty={(latestQ.data ?? []).length === 0}
          emptyLabel="No feedback yet."
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {(latestQ.data ?? []).map((f) => {
                const name = f.attendee
                  ? fullName(f.attendee)
                  : (f.session?.title ?? "Anonymous");
                const label =
                  f.sentiment_label === "negative"
                    ? "Negative"
                    : f.sentiment_label === "neutral"
                      ? "Neutral"
                      : "Positive";
                const badgeClass =
                  f.sentiment_label === "negative"
                    ? "bg-red200 text-red100"
                    : f.sentiment_label === "neutral"
                      ? "bg-blue500"
                      : "bg-green500";
                return (
                  <div
                    key={f.id}
                    className="border-b border-b-white pb-7.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="bg-white h-12.5 w-12.5 rounded-full shrink-0" />
                      <div className="flex flex-col gap-1">
                        <p className="text-white font-bold font-dmSans text-sm">
                          {name}
                        </p>
                        <Rating rate={f.star_rating} />
                        <p className="text-white font-medium font-dmSans text-xs">
                          {f.review_text ?? f.key_takeaway ?? "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 shrink-0">
                      <p className="font-dmSans text-white text-sm font-medium">
                        {fmtTime(f.submitted_at)}
                      </p>
                      <div
                        className={`${badgeClass} py-1 px-3.5 font-dmSans text-white text-sm font-medium rounded-md flex items-center justify-center`}
                      >
                        {label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
              SUBMIT FEEDBACK
            </button>
          </div>
        </QueryState>
      </section>
    </section>
  );
}

export default SentimentFeedback;
