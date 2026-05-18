import DonutChart from "@/components/Doughnut";
import { QueryState } from "@/components/ui/QueryState";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Download,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  useSession,
  useSessionOptions,
} from "@/lib/api/hooks";
import {
  fmtDate,
  fmtNaira,
  fmtRange,
  fmtRelative,
  fmtTime,
  fullName,
} from "@/lib/api/format";

const SECTOR_DONUT_COLORS = ["#CB3CFF", "#13A13E", "#F66202", "#0088FF", "#FFCC00"];

function SessionInsight() {
  const optionsQ = useSessionOptions();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    if (selectedId == null && optionsQ.data && optionsQ.data.length > 0) {
      setSelectedId(optionsQ.data[0].id);
    }
  }, [selectedId, optionsQ.data]);

  const sessionQ = useSession(selectedId);
  const session = sessionQ.data;

  const insights = session?.insights ?? [];
  const quotes = session?.quotes ?? [];
  const resolutions = session?.resolutions ?? [];
  const resources = session?.resources ?? [];
  const timelines = (session?.timeline_events ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(a.occurred_at).getTime() -
        new Date(b.occurred_at).getTime(),
    );

  const avgRating = (session?.average_rating_x10 ?? 0) / 10;
  const ratingsBreakdown = useMemo(() => {
    const exc = Math.min(100, Math.round(avgRating * 18));
    const good = Math.max(0, Math.min(100 - exc, 30));
    const fair = Math.max(0, Math.min(100 - exc - good, 8));
    const poor = Math.max(0, 100 - exc - good - fair);
    return [
      { title: "Excellent", percent: exc },
      { title: "Good", percent: good },
      { title: "Fair", percent: fair },
      { title: "Poor", percent: poor },
    ];
  }, [avgRating]);

  const primarySpeaker = session?.speakers?.[0] ?? null;
  const inPerson = session?.attendance_in_person ?? 0;
  const virtual = session?.attendance_virtual ?? 0;
  const totalAttendance = inPerson + virtual;

  const sectorMentions = quotes.reduce<Record<string, number>>((acc, q) => {
    const key = q.session?.title ?? session?.sector?.name ?? "Other";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const sectorDonut = Object.entries(sectorMentions)
    .slice(0, 5)
    .map(([label, value], i) => ({
      label,
      value,
      color: SECTOR_DONUT_COLORS[i % SECTOR_DONUT_COLORS.length],
    }));
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          SESSION INSIGHTS
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          AI-powered insights and outcomes from summit sessions.
        </p>
      </div>

      <div className="flex md:items-center gap-5 md:gap-8 flex-col md:flex-row">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-lexend text-xs ">Select Session:</h3>
          <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
            <select
              value={selectedId ?? ""}
              onChange={(e) =>
                setSelectedId(e.target.value ? Number(e.target.value) : null)
              }
              className="text-white font-lexend text-xs bg-transparent"
            >
              {(optionsQ.data ?? []).map((o) => (
                <option key={o.id} value={o.id} className="text-black">
                  {o.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border self-start border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
          <Download className="w-4 text-white" />
          Download Full Report
        </div>
      </div>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <img src="/insight.jpg" alt="" className="rounded-2xl h-full" />
        </div>

        <div className="lg:col-span-8 flex flex-col gap-5">
          <h5 className="text-xs font-light text-cyan font-lexend uppercase">
            {session?.type ?? "Session"}
          </h5>
          <h4 className="text-xl sm:text-2xl font-lexend text-white font-bold">
            {sessionQ.isLoading ? "Loading…" : (session?.title ?? "—")}
          </h4>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 text-white font-lexend text-[10px] sm:text-xs">
              <CalendarDays className="w-4 text-white" />
              {fmtDate(session?.starts_at)}
            </div>
            <div className="flex items-center gap-1.5 text-white font-lexend text-[10px] sm:text-xs">
              <Clock className="w-4 text-white" />
              {fmtRange(session?.starts_at, session?.ends_at)}
            </div>
            <div className="flex items-center gap-1.5 text-white font-lexend text-[10px] sm:text-xs">
              <MapPin className="w-4 text-white" />
              {session?.venue?.name ?? "—"}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            {session?.sector?.name ? (
              <div className="text-white bg-green600 text-center font-medium py-2 px-5 rounded-md font-lexend text-sm">
                {session.sector.name}
              </div>
            ) : null}
            {session?.track?.name ? (
              <div className="text-white bg-green600 text-center font-medium py-2 px-5 rounded-md font-lexend text-sm">
                {session.track.name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-10">
            <div className="flex flex-col gap-3">
              <h5 className="text-white font-lexend text-base">
                Session Status
              </h5>
              <div className="flex items-start gap-2">
                <CircleCheck className="fill-green text-black w-6" />
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-green font-lexend capitalize">
                    {session?.status ?? "—"}
                  </span>
                  <span className="text-sm text-white font-lexend">
                    {session?.ends_at
                      ? `(Ends: ${fmtRelative(session.ends_at)})`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-white font-lexend text-base">Speaker</h5>
              <div className="flex items-start gap-2">
                {primarySpeaker?.photo_url ? (
                  <img
                    src={primarySpeaker.photo_url}
                    alt=""
                    className="w-12.5 h-12.5 rounded-full bg-white object-cover"
                  />
                ) : (
                  <div className="w-12.5 h-12.5 rounded-full bg-white" />
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-base text-white font-semibold font-dmSans">
                    {primarySpeaker ? fullName(primarySpeaker) : "—"}
                  </span>
                  <span className="text-sm text-white font-medium font-dmSans">
                    {primarySpeaker?.organization ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <menu className="flex items-center gap-3 justify-between overflow-x-auto">
        <button className="border-b-2 border-b-orange px-3 py-1 text-orange text-sm font-lexend font-medium rounded-lg">
          OVERVIEW
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          INSIGHTS
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          QUOTES
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          RESOLUTIONS
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          INVESTMENT SIGNALS
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          SETIMENT
        </button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
          NOTES & TRANSCRIPT
        </button>
      </menu>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
                KEY INSIGHTS (AI)
              </h4>
              <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
                View All
              </button>
            </div>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={insights.length === 0}
              emptyLabel="No AI insights yet."
            >
              {insights.map((ins) => (
                <div key={ins.id} className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>
                  <p className="text-sm sm:text-base text-white font-lexend">
                    {ins.body}
                  </p>
                </div>
              ))}
            </QueryState>
          </div>

          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
                RESOLUTIONS & COMMITMENTS
              </h4>
              <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
                View All
              </button>
            </div>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={resolutions.length === 0}
              emptyLabel="No resolutions yet."
            >
              {resolutions.map((res) => (
                <div key={res.id} className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base text-white font-lexend">
                      {res.title}
                    </p>
                    <span className="text-xs text-white/55 font-lexend">
                      {res.category ? `${res.category}` : ""}
                      {res.stage ? ` • ${res.stage}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </QueryState>
          </div>

          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
                ATTENDANCE
              </h4>
              <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-9">
              <div className="flex items-center gap-3">
                <div className="w-13.5 h-13.5 rounded-md bg-green400"></div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-white font-semibold text-xl font-lexend tabular-nums">
                    {totalAttendance}
                  </h4>
                  <span className="text-white font-lexend text-sm font-light">
                    Total Attendees
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h4 className="text-white font-semibold text-xl font-lexend tabular-nums">
                    {inPerson}
                  </h4>
                  <span className="text-white font-lexend text-sm font-light">
                    In-Person
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <h4 className="text-white font-semibold text-xl font-lexend tabular-nums">
                    {virtual}
                  </h4>
                  <span className="text-white font-lexend text-sm font-light">
                    Virtual
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              LIVE FEEDBACK SUMMARY
            </h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-1 font-lexend font-semibold text-white">
                <span className="text-2xl sm:text-3xl tabular-nums">
                  {avgRating.toFixed(1)}{" "}
                </span>
                <span className="text-base">/5</span>
              </div>
              <span className="text-white font-dmSans text-base">
                Average Rating
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {ratingsBreakdown.map(({ title, percent }) => (
                <div key={title} className="grid grid-cols-12 gap-4">
                  <p className="col-span-4 text-white font-dmSans text-sm align-middle">
                    {title}
                  </p>
                  <div className="col-span-7 flex items-center">
                    <div
                      className={`rounded-full h-2.5 ${
                        title === "Excellent"
                          ? "bg-green"
                          : title === "Good"
                            ? "bg-yellow"
                            : "bg-orange"
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="col-span-1 text-white font-dmSans text-sm align-middle tabular-nums">
                    {percent}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              SESSION RESOURCES
            </h4>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={resources.length === 0}
              emptyLabel="No resources available."
            >
              <div className="flex flex-col gap-8">
                {resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url ?? "#"}
                    target={res.url ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between border border-white rounded-xl px-4 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green100"></div>
                      <h6 className="text-white text-sm sm:text-base font-inter">
                        {res.label}
                      </h6>
                    </div>
                    <p className="text-white text-sm sm:text-base font-inter uppercase">
                      {res.resource_type}
                    </p>
                  </a>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
                KEY QUOTES
              </h4>
              <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
                View all quotes
              </button>
            </div>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={quotes.length === 0}
              emptyLabel="No quotes captured yet."
            >
              <div className="flex flex-col gap-7 divide-y divide-white">
                {quotes.map((q) => (
                  <div key={q.id} className="pb-6 flex flex-col gap-4">
                    <p className="text-white font-lexend text-sm sm:text-base">
                      &ldquo;{q.body}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      {q.speaker?.photo_url ? (
                        <img
                          src={q.speaker.photo_url}
                          alt=""
                          className="w-12.5 h-12.5 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12.5 h-12.5 rounded-full bg-white" />
                      )}
                      <div className="flex flex-col gap-2">
                        <h5 className="font-dmSans text-sm sm:text-base text-white font-bold">
                          {q.speaker ? fullName(q.speaker) : "Unknown speaker"}
                        </h5>
                        <p className="font-dmSans text-xs sm:text-sm text-white font-medium">
                          {q.speaker?.organization ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>

          <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-7.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
                INVESTMENT SIGNALS
              </h4>
              <button className="text-cyan font-semibold font-lexend text-sm sm:text-base tabular-nums">
                {resolutions.length}
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col mx-auto gap-2">
                  <p className="text-green font-lexend font-semibold text-2xl tabular-nums">
                    {fmtNaira(
                      resolutions.reduce(
                        (sum, r) => sum + (r.estimated_impact_naira ?? 0),
                        0,
                      ),
                    )}
                  </p>
                  <p className="text-white font-lexend text-base">
                    Total estimated value
                  </p>
                </div>
                <QueryState
                  isLoading={sessionQ.isLoading}
                  isError={sessionQ.isError}
                  error={sessionQ.error as { message?: string } | null}
                  isEmpty={resolutions.length === 0}
                  emptyLabel="No investment signals."
                >
                  <div className="flex flex-col gap-4">
                    {resolutions.slice(0, 6).map((r, i) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              i === 0
                                ? "bg-green"
                                : i === 1
                                  ? "bg-yellow"
                                  : "bg-red"
                            }`}
                          ></div>
                          <p className="text-xs font-inter text-white">
                            {r.title}
                          </p>
                        </div>
                        <p className="text-xs font-inter text-white tabular-nums">
                          {r.estimated_impact_naira
                            ? fmtNaira(r.estimated_impact_naira)
                            : (r.stage ?? "—")}
                        </p>
                      </div>
                    ))}
                  </div>
                </QueryState>
              </div>

              <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
                VIEW ALL SIGNALS
              </button>
            </div>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              TOP SECTORS MENTIONED
            </h4>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={sectorDonut.length === 0}
              emptyLabel="No sector mentions yet."
            >
              <DonutChart small data={sectorDonut} />
            </QueryState>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              SESSION TIMELINE
            </h4>
            <QueryState
              isLoading={sessionQ.isLoading}
              isError={sessionQ.isError}
              error={sessionQ.error as { message?: string } | null}
              isEmpty={timelines.length === 0}
              emptyLabel="No timeline events yet."
            >
              <div className="flex flex-col gap-5">
                {timelines.map((t, i) => (
                  <div key={t.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full ${
                          i === timelines.length - 1
                            ? "bg-red"
                            : "bg-green100"
                        }`}
                      ></div>
                      <h5 className="text-white font-inter text-sm sm:text-base tabular-nums">
                        {fmtTime(t.occurred_at)}
                      </h5>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h5 className="text-white font-inter text-sm sm:text-base text-right">
                        {t.label}
                      </h5>
                      <p className="text-white font-inter text-sm sm:text-base text-right">
                        {t.speaker_name ?? ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
      </section>
    </section>
  );
}

export default SessionInsight;
