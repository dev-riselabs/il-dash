import AttendanceChart from "@/components/AttendanceChart";
import DonutChart from "@/components/Doughnut";
import SentimentTrendChart from "@/components/TrendChart";
import { QueryState } from "@/components/ui/QueryState";
import { CircleArrowUp } from "lucide-react";

import {
  useAnalyticsByCategory,
  useExecutiveKpis,
  useFeedbackKpis,
  useHeatmapSectors,
  useIntelligenceKpis,
  useReportKpis,
  useReports as useReportList,
  useSessionRatings,
  useSocialKpis,
} from "@/lib/api/hooks";
import { fmtCompact, fmtDateTime, fmtNumber, fmtPercent } from "@/lib/api/format";

const DONUT_COLORS = ["#CB3CFF", "#13A13E", "#F66202", "#0088FF", "#FFCC00", "#9747FF", "#9A9DA6"];

function Reports() {
  const execQ = useExecutiveKpis();
  const intelQ = useIntelligenceKpis();
  const reportKpisQ = useReportKpis();
  const byCategoryQ = useAnalyticsByCategory();
  const heatmapSectorsQ = useHeatmapSectors();
  const ratingsQ = useSessionRatings();
  const socialKpisQ = useSocialKpis();
  const feedbackKpisQ = useFeedbackKpis();
  const reportsQ = useReportList({ per_page: 5 });

  const e = execQ.data;
  const intel = intelQ.data;
  const r = reportKpisQ.data;
  const f = feedbackKpisQ.data;
  const s = socialKpisQ.data;

  const sessionsTotal = (e?.sessions_completed ?? 0) + (e?.sessions_live ?? 0);
  const kpis = [
    { label: "Sessions", value: fmtNumber(sessionsTotal), delta: "Completed + Live" },
    { label: "Attendees", value: fmtNumber(e?.attendance ?? 0), delta: "Checked in" },
    { label: "Investment Signals", value: fmtNumber(intel?.total_signals ?? 0), delta: "Live" },
    { label: "Reports", value: `${fmtNumber(r?.ready ?? 0)} / ${fmtNumber(r?.total ?? 0)}`, delta: "Ready" },
    { label: "Avg Rating", value: f?.avg_rating != null ? `${f.avg_rating.toFixed(1)} /5` : "—", delta: "Feedback" },
  ];

  const categoryDonut = (byCategoryQ.data ?? []).map((row, i) => ({
    label: row.category ?? "Other",
    value: row.count,
    color: DONUT_COLORS[i % DONUT_COLORS.length],
  }));

  const sectorDonut = (heatmapSectorsQ.data ?? [])
    .slice()
    .sort((a, b) => b.signals_count - a.signals_count)
    .slice(0, 6)
    .map((row, i) => ({
      label: row.sector?.name ?? `Sector #${row.sector_id}`,
      value: row.signals_count,
      color: DONUT_COLORS[i % DONUT_COLORS.length],
    }));

  const topRatings = (ratingsQ.data ?? [])
    .slice()
    .sort((a, b) => b.average_rating_x10 - a.average_rating_x10)
    .slice(0, 5);

  const engagements = [
    { title: "Social Media Mentions", value: fmtNumber(s?.total_mentions ?? 0) },
    { title: "Positive Sentiment", value: fmtPercent(s?.positive_pct ?? 0, 1) },
    { title: "Total Reach", value: fmtCompact(s?.total_reach ?? 0) },
    { title: "Impressions", value: fmtCompact(s?.total_impressions ?? 0) },
  ];

  const reports = reportsQ.data?.data ?? [];
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          REPORTS
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Comprehensive insights and data reports across Invest Lagos 3.0
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
                              ? "text-white"
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

      <AttendanceChart />
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              ATTENDEE BREAKDOWN
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View full breakdown
            </button>
          </div>
          <QueryState
            isLoading={byCategoryQ.isLoading}
            isError={byCategoryQ.isError}
            error={byCategoryQ.error as { message?: string } | null}
            isEmpty={categoryDonut.length === 0}
            emptyLabel="No attendee categories yet."
          >
            <DonutChart data={categoryDonut} />
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              INVESTMENT SIGNALS BY SECTOR
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all report
            </button>
          </div>
          <QueryState
            isLoading={heatmapSectorsQ.isLoading}
            isError={heatmapSectorsQ.isError}
            error={heatmapSectorsQ.error as { message?: string } | null}
            isEmpty={sectorDonut.length === 0}
            emptyLabel="No sector signals yet."
          >
            <DonutChart data={sectorDonut} />
          </QueryState>
        </div>
      </section>

      <SentimentTrendChart />

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            RECENTLY GENERATED REPORTS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all reports
          </button>
        </div>

        <QueryState
          isLoading={reportsQ.isLoading}
          isError={reportsQ.isError}
          error={reportsQ.error as { message?: string } | null}
          isEmpty={reports.length === 0}
          emptyLabel="No reports generated yet."
        >
          <div className="overflow-x-auto">
            <table className="min-w-180 w-full">
              <thead className="mb-5">
                <tr>
                  <th className="text-base font-semibold uppercase font-dmSans text-white text-left pb-6">
                    REPORT
                  </th>
                  <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                    KIND
                  </th>
                  <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                    STATUS
                  </th>
                  <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                    FORMAT
                  </th>
                  <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                    CREATED
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((rep) => (
                  <tr key={rep.id}>
                    <td className="flex flex-col gap-1 pb-4">
                      <span className="text-sm font-semibold font-dmSans text-white text-left ">
                        {rep.name}
                      </span>
                      <span className="text-xs font-light font-dmSans text-white text-left">
                        {rep.file_url ? "Available" : "Processing"}
                      </span>
                    </td>
                    <td className="text-sm font-semibold font-dmSans text-white text-center pb-4 capitalize">
                      {rep.kind}
                    </td>
                    <td className="text-sm font-semibold font-dmSans text-white text-center pb-4 capitalize">
                      {rep.status}
                    </td>
                    <td className="text-sm font-semibold font-dmSans text-white text-center pb-4 uppercase">
                      {rep.format ?? "—"}
                    </td>
                    <td className="text-sm font-semibold font-dmSans text-white text-center pb-4">
                      {fmtDateTime(rep.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </QueryState>
      </section>

      <section className="flex flex-col lg:flex-row gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TOP SESSIONS BY ATTENDANCE
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all sessions
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 justify-between">
              <h5 className="text-sm sm:text-base font-semibold uppercase font-dmSans text-white">
                SESSION
              </h5>
              <h5 className="text-sm sm:text-base font-semibold uppercase font-dmSans text-white">
                RATING
              </h5>
            </div>

            <QueryState
              isLoading={ratingsQ.isLoading}
              isError={ratingsQ.isError}
              error={ratingsQ.error as { message?: string } | null}
              isEmpty={topRatings.length === 0}
              emptyLabel="No session ratings yet."
            >
              <div className="flex flex-col gap-4">
                {topRatings.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold font-dmSans text-white text-left ">
                        {row.title}
                      </span>
                    </div>
                    <span className="text-sm font-semibold font-dmSans text-white text-center tabular-nums">
                      {(row.average_rating_x10 / 10).toFixed(1)} / 5
                    </span>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 self-start">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              ENGAGEMENT SUMMARY
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all engagement report
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {engagements.map(({ title, value }) => (
              <div key={title} className="flex items-center justify-between">
                <span className="text-sm font-semibold font-dmSans text-white">
                  {title}
                </span>
                <span className="text-sm font-semibold font-dmSans text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Reports;
