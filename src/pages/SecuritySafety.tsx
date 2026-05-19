import { useMemo } from "react";
import { CircleArrowUp } from "lucide-react";

import DonutChart from "@/components/Doughnut";
import IncidentTrendChart from "@/components/IncidentChart";
import { QueryState } from "@/components/ui/QueryState";
import {
  useAlerts,
  useAlertsOverTime,
  useCommandCenterKpis,
  useIncidents,
} from "@/lib/api/hooks";
import { fmtNumber, fmtTime } from "@/lib/api/format";
import type { Incident } from "@/lib/api/types";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red",
  high: "bg-purple",
  medium: "bg-orange",
  low: "bg-blue800",
  info: "bg-slate100",
  warning: "bg-orange",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function isToday(iso?: string | null): boolean {
  if (!iso) return false;
  return iso.slice(0, 10) === todayIso();
}

function groupBy<T>(arr: T[], key: (t: T) => string): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, item) => {
    const k = key(item) || "Other";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
}

function SecuritySafety() {
  const ccQ = useCommandCenterKpis();
  const incidentsQ = useIncidents({ per_page: 200 });
  const alertsTrendQ = useAlertsOverTime(7);
  const alertsQ = useAlerts({ per_page: 6 });

  const incidents = (incidentsQ.data?.data ?? []) as Incident[];
  const totalToday = incidents.filter((i) => isToday(i.occurred_at)).length;
  const resolvedToday = incidents.filter(
    (i) => i.status === "resolved" && isToday(i.resolved_at),
  ).length;
  const avgResponse = useMemo(() => {
    const deltas = incidents
      .filter((i) => i.resolved_at && i.occurred_at)
      .map(
        (i) =>
          new Date(i.resolved_at as string).getTime() -
          new Date(i.occurred_at).getTime(),
      )
      .filter((d) => d > 0);
    if (deltas.length === 0) return "—";
    const avgMs = deltas.reduce((s, d) => s + d, 0) / deltas.length;
    const mins = Math.floor(avgMs / 60000);
    const secs = Math.floor((avgMs % 60000) / 1000);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [incidents]);

  const kpis = [
    {
      label: "Total Reports (Today)",
      value: fmtNumber(totalToday),
      delta: `${incidentsQ.data?.total ?? 0} all-time`,
    },
    {
      label: "Open Incidents",
      value: fmtNumber(ccQ.data?.incidents_open ?? 0),
      delta: "Live",
    },
    {
      label: "Avg. Response Time",
      value: avgResponse,
      delta: "Resolved sample",
    },
    {
      label: "Resolved (Today)",
      value: fmtNumber(resolvedToday),
      delta: "Live",
    },
    {
      label: "Safety Level",
      value: (ccQ.data?.safety_level ?? "—").toString().toUpperCase(),
      delta: `${ccQ.data?.personnel_on_duty ?? 0} on duty`,
    },
  ];

  const severityCounts = groupBy(incidents, (i) => i.severity);
  const severity = ["high", "medium", "low", "critical"].map((s) => ({
    title: s.charAt(0).toUpperCase() + s.slice(1),
    value: String(severityCounts[s] ?? 0),
    key: s,
  }));

  const zoneCounts = groupBy(incidents, (i) => i.venue?.name ?? "Other");
  const zones = Object.entries(zoneCounts)
    .map(([title, value]) => ({ title, value: String(value) }))
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, 7);

  const typeCounts = groupBy(incidents, (i) => i.type ?? "Other");
  const totalTypes = Math.max(1, incidents.length);
  const sectorOne = Object.entries(typeCounts)
    .map(([title, count]) => ({
      title,
      value: `${count} (${Math.round((count / totalTypes) * 100)}%)`,
    }))
    .sort((a, b) => parseInt(b.value) - parseInt(a.value))
    .slice(0, 6);

  const feeds = incidents.slice(0, 5).map((i) => ({
    title: i.title,
    venue: i.venue?.name ?? "—",
    range: i.severity.charAt(0).toUpperCase() + i.severity.slice(1),
    label:
      i.status === "open"
        ? "Acknowledged"
        : i.status === "responding"
          ? "Responding"
          : "Resolved",
    time: fmtTime(i.occurred_at),
  }));

  const statusCounts = groupBy(incidents, (i) => i.status);
  const statusDonut = [
    { label: "Open", value: statusCounts.open ?? 0, color: "#CB3CFF" },
    {
      label: "Responding",
      value: statusCounts.responding ?? 0,
      color: "#F66202",
    },
    { label: "Resolved", value: statusCounts.resolved ?? 0, color: "#13A13E" },
  ];

  const alerts = (alertsQ.data?.data ?? []).map((a) => ({
    title: a.title,
    description: a.body ?? "",
    status: a.severity.charAt(0).toUpperCase() + a.severity.slice(1),
    time: fmtTime(a.created_at),
  }));

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          SECURITY & SAFETY SURVEILLANCE SYSTEM
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time monitoring and incident management for a secure summit
          environment.
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

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-9">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              INCIDENT HEATMAP
            </h4>
            <div className="border border-white/55 rounded-md flex overflow-hidden">
              <div className="p-2 sm:p-3 bg-white text-black text-xs font-lexend">
                Heatmap
              </div>
              <div className="p-2 sm:p-3 text-white text-xs font-lexend">
                Cluster
              </div>
            </div>
          </div>
          <div className="border border-white rounded-2xl min-h-20 h-full"></div>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-4 ">
          <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              INCIDENTS BY SEVERITY
            </h4>
            <QueryState
              isLoading={incidentsQ.isLoading}
              isError={incidentsQ.isError}
              error={incidentsQ.error as { message?: string } | null}
              isEmpty={incidents.length === 0}
              emptyLabel="No incidents reported."
            >
              <div className="flex flex-col gap-4">
                {severity.map(({ title, value, key }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${SEVERITY_COLORS[key] ?? "bg-slate100"}`}
                      ></div>
                      <span className="text-white text-xs font-inter">
                        {title}
                      </span>
                    </div>
                    <span className="text-white text-xs font-inter">{value}</span>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
          <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
            <h4 className="text-white font-medium uppercase text-sm font-lexend">
              INCIDENTS BY ZONE
            </h4>
            <QueryState
              isLoading={incidentsQ.isLoading}
              isError={incidentsQ.isError}
              error={incidentsQ.error as { message?: string } | null}
              isEmpty={zones.length === 0}
              emptyLabel="No zone data."
            >
              <div className="flex flex-col gap-4">
                {zones.map(({ title, value }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 justify-between"
                  >
                    <span className="text-white text-xs font-inter">{title}</span>
                    <span className="text-white text-xs font-inter">{value}</span>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            LIVE INCIDENT FEED
          </h4>
          <div className="flex flex-col gap-4 border border-white rounded-2xl p-4 ">
            <QueryState
              isLoading={incidentsQ.isLoading}
              isError={incidentsQ.isError}
              error={incidentsQ.error as { message?: string } | null}
              isEmpty={feeds.length === 0}
              emptyLabel="No incidents reported yet."
            >
            <div className="overflow-x-auto">
              <div className="flex flex-col gap-5 min-w-100">
                {feeds.map(({ title, venue, range, label, time }, i) => (
                  <div
                    key={i}
                    className=" flex items-center gap-4 justify-between pb-8 border-b border-b-white/55"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7.5 h-7.5 bg-white"></div>
                      <div className="flex flex-col gap-1.5">
                        <h6 className="text-white font-dmSans font-semibold text-sm">
                          {title}
                        </h6>
                        <span className="text-white font-dmSans font-light text-xs">
                          {venue}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`py-1.5 px-3 rounded-md text-[10px] font-dmSans font-medium ${
                        range === "High"
                          ? "bg-red200 text-red"
                          : range === "Medium"
                            ? "bg-brown500 text-orange"
                            : "bg-blue900 text-blue200"
                      }`}
                    >
                      {range}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-dmSans text-white font-semibold">
                        {time}
                      </span>
                      <div
                        className={`py-1 px-2 min-w-20 w-full text-[10px] flex justify-center font-dmSans font-medium rounded-md ${
                          label === "Responding"
                            ? "bg-blue900 text-blue200"
                            : label === "Acknowledged"
                              ? "text-orange bg-brown500"
                              : "bg-green850 text-green100"
                        } `}
                      >
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </QueryState>
            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
              VIEW ALL INCIDENTS
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TOP INCIDENT TYPES
            </h4>
            <QueryState
              isLoading={incidentsQ.isLoading}
              isError={incidentsQ.isError}
              error={incidentsQ.error as { message?: string } | null}
              isEmpty={sectorOne.length === 0}
              emptyLabel="No incidents to group."
            >
              <div className="flex flex-col gap-4">
                {sectorOne.map(({ title, value }, i) => (
                  <div
                    key={`${title}-${i}`}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full w-6.5 sm:w-7.5 h-6.5 sm:h-7.5 text-sm font-light font-dmSans flex items-center justify-center ${
                          i === 0
                            ? "bg-yellow text-black"
                            : i === 1
                              ? "text-white bg-orange"
                              : i === 2
                                ? "text-white bg-red"
                                : i === 3
                                  ? "text-white bg-purple"
                                  : i === 4
                                    ? "text-white bg-green"
                                    : "bg-mint text-black"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-white font-medium text-sm font-dmSans">
                        {title}
                      </span>
                    </div>
                    <span className="text-white font-medium text-sm font-dmSans">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
            <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
              INCIDENT STATUS OVERVIEW
            </h4>
            <QueryState
              isLoading={incidentsQ.isLoading}
              isError={incidentsQ.isError}
              error={incidentsQ.error as { message?: string } | null}
              isEmpty={incidents.length === 0}
              emptyLabel="No incidents to chart."
            >
              <DonutChart data={statusDonut} />
            </QueryState>
          </div>
        </div>
      </section>

      <IncidentTrendChart points={alertsTrendQ.data} />

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            ACTIVE ALERTS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all alerts
          </button>
        </div>

        <QueryState
          isLoading={alertsQ.isLoading}
          isError={alertsQ.isError}
          error={alertsQ.error as { message?: string } | null}
          isEmpty={alerts.length === 0}
          emptyLabel="No active alerts."
        >
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-2 min-w-100">
            {alerts.map(({ title, description, status, time }, i) => (
              <div
                key={i}
                className={`px-7.5 py-5 flex items-center justify-between rounded-2xl gap-4 ${
                  i % 2 === 0 ? "bg-violet" : "bg-brown600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7.5 h-7.5 bg-white shrink-0"></div>
                  <div className="flex flex-col gap-1.5">
                    <h6 className="text-white font-dmSans font-semibold text-sm">
                      {title}
                    </h6>
                    <span className="text-white font-dmSans font-light text-xs max-w-70">
                      {description}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="text-white font-dmSans font-semibold text-sm">
                    {time}
                  </span>
                  <div
                    className={`py-1.5 px-3 rounded-md text-[10px] font-dmSans font-medium flex items-center justify-center ${
                      status === "High"
                        ? "bg-red200 text-red"
                        : status === "Medium"
                          ? "bg-brown500 text-orange"
                          : "bg-blue900 text-blue200"
                    }`}
                  >
                    {status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </QueryState>
      </section>
    </section>
  );
}

export default SecuritySafety;
