import { useMemo, useState } from "react";
import { CalendarDays, Download, CircleArrowUp } from "lucide-react";

import DonutChart from "@/components/Doughnut";
import AttendanceChart from "@/components/LineChart";
import Rating from "@/components/Rating";
import { QueryState } from "@/components/ui/QueryState";
import {
  useAnalyticsByCategory,
  useAnalyticsByGender,
  useAnalyticsByRegion,
  useAnalyticsByTrack,
  useAnalyticsKpis,
  useAttendanceTimeseries,
  useEventDays,
  useNewVsReturning,
  useResolutionsBySector,
  useSessionRatings,
  useTopEngagementSpeakers,
  useTracks,
} from "@/lib/api/hooks";
import { fmtNumber, fmtPercent, fullName } from "@/lib/api/format";

const PALETTE = [
  "#CB3CFF",
  "#13A13E",
  "#F66202",
  "#3DC0FF",
  "#FFAE4C",
  "#A66EFA",
  "#F6001A",
  "#7E89AC",
  "#9A91FB",
  "#D9E1FA",
];

function ParticipationAnalytics() {
  const [eventDayId, setEventDayId] = useState<string>("");
  const [trackId, setTrackId] = useState<string>("");

  const kpisQ = useAnalyticsKpis();
  const tsQ = useAttendanceTimeseries(eventDayId ? Number(eventDayId) : undefined);
  const byTrackQ = useAnalyticsByTrack();
  const byRegionQ = useAnalyticsByRegion();
  const byGenderQ = useAnalyticsByGender();
  const byCategoryQ = useAnalyticsByCategory();
  const sessionRatingsQ = useSessionRatings();
  const topSpeakersQ = useTopEngagementSpeakers();
  const bySectorQ = useResolutionsBySector();
  const newVsRetQ = useNewVsReturning();
  const daysQ = useEventDays();
  const tracksQ = useTracks();

  void trackId;

  const k = kpisQ.data;
  const totalAttendance = useMemo(() => {
    const points = tsQ.data ?? [];
    if (points.length === 0) return k?.total_attendees ?? 0;
    return points[points.length - 1].total;
  }, [tsQ.data, k]);

  const checkInRate =
    k && k.total_attendees > 0 ? (k.checked_in / k.total_attendees) * 100 : 0;
  const newVsTotalPct =
    newVsRetQ.data && newVsRetQ.data.new + newVsRetQ.data.returning > 0
      ? (newVsRetQ.data.new / (newVsRetQ.data.new + newVsRetQ.data.returning)) * 100
      : 0;
  const returningVsTotalPct = 100 - newVsTotalPct;

  const kpis = [
    { label: "Total Attendees", value: fmtNumber(k?.total_attendees ?? 0) },
    { label: "Checked In", value: fmtNumber(k?.checked_in ?? 0) },
    { label: "Check-in Rate", value: fmtPercent(checkInRate, 0) },
    { label: "New Today", value: fmtNumber(k?.new_today ?? 0) },
    {
      label: "Returning Rate",
      value: fmtPercent(returningVsTotalPct, 0),
    },
  ];

  const trackDonut = (byTrackQ.data ?? []).map((row, i) => ({
    label: row.track?.name ?? "Untracked",
    value: row.attendance,
    color: PALETTE[i % PALETTE.length],
  }));

  const categoryDonut = (byCategoryQ.data ?? []).map((row, i) => ({
    label: row.category ?? "Unspecified",
    value: row.count,
    color: PALETTE[i % PALETTE.length],
  }));

  const genderDonut = (byGenderQ.data ?? []).map((row, i) => ({
    label: row.gender ?? "Unspecified",
    value: row.count,
    color: PALETTE[i % PALETTE.length],
  }));

  const totalRegion = Math.max(
    1,
    (byRegionQ.data ?? []).reduce((s, r) => s + r.count, 0),
  );
  const regionRows = (byRegionQ.data ?? []).slice(0, 5).map((r, i) => ({
    country: r.region ?? "Other",
    percent: Math.round((r.count / totalRegion) * 100),
    color: PALETTE[i % PALETTE.length],
  }));

  const ratedSessions = (sessionRatingsQ.data ?? []).slice(0, 5).map((r) => ({
    title: r.title,
    rate: Number(((r.average_rating_x10 ?? 0) / 10).toFixed(1)),
  }));

  const topSpeakers = (topSpeakersQ.data ?? []).slice(0, 5).map((row) => ({
    speaker: row.speaker ? fullName(row.speaker) : `Speaker #${row.speaker_id}`,
    session: row.sessions_count,
    score: Math.round(Number(row.score ?? 0)),
  }));

  const bySectorRows = (bySectorQ.data ?? []).slice(0, 8);
  const maxSectorCount = Math.max(1, ...bySectorRows.map((s) => s.count));
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          PARTICIPATION ANALYTICS
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time insights on attendance, engagement and session performance
        </p>
      </div>

      <div className="flex sm:items-center gap-5 sm:gap-8 flex-col lg:flex-row">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-lexend text-xs ">Date Range</h3>
          <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1">
            <CalendarDays className="text-white w-4" />
            <select
              value={eventDayId}
              onChange={(e) => setEventDayId(e.target.value)}
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
        <div className="flex items-center gap-4">
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

          <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
            <Download className="w-4 text-white" />
            Export Report
          </div>
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
                              ? "text-green"
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
              <CircleArrowUp color="white" width={"20px"} />
              {idx === 3 ? "New Today" : "Live"}
            </div>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AttendanceChart points={tsQ.data} currentTotal={totalAttendance} />
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-7 ">
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
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-7">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            RESOLUTIONS BY SECTOR
          </h4>

          <QueryState
            isLoading={bySectorQ.isLoading}
            isError={bySectorQ.isError}
            error={bySectorQ.error as { message?: string } | null}
            isEmpty={bySectorRows.length === 0}
            emptyLabel="No sector data yet."
          >
            <div className="flex flex-col gap-4">
              {bySectorRows.map((row, idx) => {
                const title = row.sector?.name ?? "Unspecified";
                const percent = Math.round((row.count / maxSectorCount) * 100);
                const barColor =
                  idx === 0 ? "bg-green" : idx === 1 ? "bg-yellow" : "bg-orange";
                return (
                  <div key={`${title}-${idx}`} className="grid grid-cols-12">
                    <p className="col-span-4 text-white font-dmSans text-xs sm:text-sm align-middle">
                      {title}
                    </p>
                    <div className="col-span-7 flex items-center">
                      <div
                        className={`rounded-full h-2 sm:h-2.5 ${barColor}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="col-span-1 text-white font-dmSans text-xs sm:text-sm flex items-center">
                      {row.count}
                    </p>
                  </div>
                );
              })}
            </div>
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-5">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            SESSION PERFORMANCE (BY AVG. RATING)
          </h4>

          <div className="flex flex-col gap-6">
            <QueryState
              isLoading={sessionRatingsQ.isLoading}
              isError={sessionRatingsQ.isError}
              error={sessionRatingsQ.error as { message?: string } | null}
              isEmpty={ratedSessions.length === 0}
              emptyLabel="No ratings collected yet."
            >
              <div className="flex flex-col gap-4">
                {ratedSessions.map(({ title, rate }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 justify-between"
                  >
                    <p className="font-dmSans text-white text-xs sm:text-sm">{title}</p>
                    <div className="flex items-center gap-2">
                      <Rating rate={rate} />
                      <p className="font-dmSans text-white text-xs sm:text-sm">{rate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>

            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
              VIEW ALL RATINGS
            </button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 w-full flex flex-col gap-6 lg:col-span-7">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            TOP SPEAKERS BY ENGAGEMENT
          </h4>

          <div className="flex flex-col gap-6">
            <QueryState
              isLoading={topSpeakersQ.isLoading}
              isError={topSpeakersQ.isError}
              error={topSpeakersQ.error as { message?: string } | null}
              isEmpty={topSpeakers.length === 0}
              emptyLabel="No speaker engagement scores yet."
            >
              <div className="overflow-x-auto">
                <div className="flex flex-col gap-8 min-w-120">
                  <div className="grid grid-cols-12 gap-5">
                    <h4 className="font-lexend text-sm text-white col-span-5 font-bold">
                      Speaker
                    </h4>
                    <h4 className="font-lexend text-sm text-white col-span-2 text-center font-bold">
                      Sessions
                    </h4>
                    <h4 className="font-lexend text-sm text-white col-span-5 text-center font-bold">
                      Engagement Score
                    </h4>
                  </div>
                  <div className="flex flex-col gap-4">
                    {topSpeakers.map(({ speaker, session, score }, idx) => (
                      <div key={`${speaker}-${idx}`} className="grid grid-cols-12 gap-5">
                        <div className="col-span-5 flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-white shrink-0"></div>
                          <p className="text-white font-lexend text-sm">
                            {speaker}
                          </p>
                        </div>
                        <p className="text-white font-lexend text-sm col-span-2 justify-center flex items-center">
                          {session}
                        </p>
                        <div className="flex items-center gap-2 col-span-5">
                          <div className="w-33 h-2">
                            <div
                              className="h-1.5 rounded-full bg-green"
                              style={{ width: `${Math.min(100, score)}%` }}
                            ></div>
                          </div>
                          <p className="text-white font-lexend text-sm">{score}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </QueryState>

            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
              VIEW ALL SPEAKERS
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              ATTENDEES BY CATEGORY
            </h4>
            <QueryState
              isLoading={byCategoryQ.isLoading}
              isError={byCategoryQ.isError}
              error={byCategoryQ.error as { message?: string } | null}
              isEmpty={categoryDonut.length === 0}
              emptyLabel="No category breakdown yet."
            >
              <DonutChart small data={categoryDonut} />
            </QueryState>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              BY REGION
            </h4>

            <QueryState
              isLoading={byRegionQ.isLoading}
              isError={byRegionQ.isError}
              error={byRegionQ.error as { message?: string } | null}
              isEmpty={regionRows.length === 0}
              emptyLabel="No region data yet."
            >
              <div className="flex flex-col gap-3">
                {regionRows.map(({ country, color, percent }) => (
                  <div key={country} className="flex flex-col gap-1">
                    <h4 className="text-neutral100 font-outfit  text-xs">
                      {country}
                    </h4>
                    <div className="flex gap-8 justify-between items-center">
                      <div className="flex-1 h-1 rounded-full bg-neutral200">
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: `${color}`,
                          }}
                        ></div>
                      </div>
                      <p className="text-neutral100 font-outfit  text-xs">
                        {percent}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-7">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            BY GENDER
          </h4>
          <QueryState
            isLoading={byGenderQ.isLoading}
            isError={byGenderQ.isError}
            error={byGenderQ.error as { message?: string } | null}
            isEmpty={genderDonut.length === 0}
            emptyLabel="No gender breakdown yet."
          >
            <DonutChart data={genderDonut} />
          </QueryState>
        </div>

        <div className="flex flex-col gap-5 md:col-span-5">
          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex gap-4 items-center">
            <div className="w-13.5 h-13.5 rounded-md bg-green400 shrink-0"></div>
            <div className="flex flex-col gap-2">
              <p className="text-white uppercase font-lexend text-sm">
                NEW ATTENDEES TODAY
              </p>
              <p className="text-2xl font-bold font-lexend text-green">
                {fmtNumber(newVsRetQ.data?.new ?? 0)}
              </p>
              <p className="font-light text-sm font-lexend text-white">
                {fmtPercent(newVsTotalPct, 0)} of total attendees
              </p>
            </div>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex gap-4 items-center">
            <div className="w-13.5 h-13.5 rounded-md bg-green400 shrink-0"></div>
            <div className="flex flex-col gap-2">
              <p className="text-white uppercase font-lexend text-sm">
                RETURNING ATTENDEES
              </p>
              <p className="text-2xl font-bold font-lexend text-green">
                {fmtNumber(newVsRetQ.data?.returning ?? 0)}
              </p>
              <p className="font-light text-sm font-lexend text-white">
                {fmtPercent(returningVsTotalPct, 0)} of total attendees
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ParticipationAnalytics;
