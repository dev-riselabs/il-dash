// Wired Alerts & Updates — live /alerts endpoints.
import AlertsOverTimeChart from "@/components/AlertChart";
import DonutChart from "@/components/Doughnut";
import { CircleArrowUp, CircleCheck, EllipsisVertical } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useAlertKpis,
  useAlerts,
  useAlertsBySeverity,
  useAlertsOverTime,
  useAlertsRecentlyResolved,
} from "@/lib/api/hooks";
import { fmtRelative, fmtTime } from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";
import type { Alert, AlertSeverity } from "@/lib/api/types";

const SEVERITY_TONE: Record<AlertSeverity, string> = {
  critical: "bg-red text-white",
  high: "bg-red text-white",
  warning: "bg-orange text-white",
  medium: "bg-orange text-white",
  low: "bg-yellow text-black",
  info: "bg-cyan text-black",
};

const SEVERITY_LABEL: Record<AlertSeverity, string> = {
  critical: "Critical",
  high: "High",
  warning: "Warning",
  medium: "Medium",
  low: "Low",
  info: "Info",
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "#F6001A",
  high: "#F6001A",
  warning: "#FFAE4C",
  medium: "#FFAE4C",
  low: "#FFB800",
  info: "#07DBFA",
};

const KPI_TONE = ["text-cyan", "text-red", "text-orange", "text-green"];
const PER_PAGE = 8;

function AlertsUpdates() {
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ page, per_page: PER_PAGE }), [page]);

  const kpisQ = useAlertKpis();
  const listQ = useAlerts(params);
  const bySevQ = useAlertsBySeverity();
  const overTimeQ = useAlertsOverTime(7);
  const resolvedQ = useAlertsRecentlyResolved(5);

  const kpis = [
    { label: "Unread Alerts", value: kpisQ.data?.unread ?? 0, delta: "Live count" },
    { label: "Critical Open", value: kpisQ.data?.critical_open ?? 0, delta: "Needs attention" },
    { label: "Resolved Today", value: kpisQ.data?.resolved_today ?? 0, delta: "Closed today" },
    { label: "Total Alerts", value: kpisQ.data?.total ?? 0, delta: "All time" },
  ];
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          ALERTS & UPDATES
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Stay informed about critical events, updates and actions across Invest
          Lagos 3.0
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
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
                  className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${KPI_TONE[idx] ?? "text-white"}`}
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

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-4">
      <div className="overflow-x-auto">
      <div className="flex flex-col gap-6 min-w-200">
        <div className="grid grid-cols-12 gap-5 w-full">
          <h5 className="col-span-5 text-slate100 font-lexend uppercase text-base">
            ALERT
          </h5>
          <h5 className="col-span-1 text-slate100 font-lexend uppercase text-base text-center">
            SEVERITY
          </h5>
          <h5 className="col-span-4 text-slate100 font-lexend uppercase text-base text-center">
            SOURCE
          </h5>
          <h5 className="col-span-2 text-slate100 font-lexend uppercase text-base">
            TIME
          </h5>
        </div>

        <QueryState
          isLoading={listQ.isLoading}
          isError={listQ.isError}
          error={listQ.error}
          isEmpty={(listQ.data?.data.length ?? 0) === 0}
          emptyLabel="No alerts to display."
        >
          <div className="flex flex-col gap-5 pb-6">
            {(listQ.data?.data ?? []).map((a) => (
              <AlertRow key={a.id} alert={a} />
            ))}
          </div>
        </QueryState>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-white/70 text-xs font-lexend">
            Showing {listQ.data?.from ?? 0} to {listQ.data?.to ?? 0} of{" "}
            {listQ.data?.total ?? 0} alerts
          </p>
          <button
            disabled={
              listQ.isLoading ||
              (listQ.data ? page >= listQ.data.last_page : true)
            }
            onClick={() => setPage((p) => p + 1)}
            className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm disabled:opacity-40"
          >
            LOAD MORE ALERTS
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-9 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-4">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            BY SEVERITY
          </h4>
          <QueryState
            isLoading={bySevQ.isLoading}
            isError={bySevQ.isError}
            error={bySevQ.error}
            isEmpty={(bySevQ.data?.length ?? 0) === 0}
            emptyLabel="No severity breakdown yet."
          >
            <DonutChart
              data={(bySevQ.data ?? []).map((s) => ({
                label: SEVERITY_LABEL[s.severity as AlertSeverity] ?? s.severity,
                value: s.count,
                color: SEVERITY_COLOR[s.severity] ?? "#888",
              }))}
            />
          </QueryState>
        </div>

        <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white/55 font-medium uppercase text-sm sm:text-base font-lexend">
              RECENTLY RESOLVED
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all
            </button>
          </div>
          <QueryState
            isLoading={resolvedQ.isLoading}
            isError={resolvedQ.isError}
            error={resolvedQ.error}
            isEmpty={(resolvedQ.data?.length ?? 0) === 0}
            emptyLabel="Nothing resolved yet."
          >
            <div className="flex flex-col gap-6">
              {(resolvedQ.data ?? []).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 text-white/55 font-lexend text-xs sm:text-sm">
                    <CircleCheck className="fill-green text-black" /> {a.title}
                  </div>
                  <div className="text-white/55 font-lexend text-xs sm:text-sm">
                    {fmtTime(a.resolved_at ?? a.created_at)}
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <AlertsOverTimeChart points={overTimeQ.data ?? []} days={7} />
    </section>
  );
}

function AlertRow({ alert }: { alert: Alert }) {
  const tone = SEVERITY_TONE[alert.severity] ?? "bg-slate200 text-white";
  return (
    <div className="grid grid-cols-12 gap-5 border-t border-t-white/55 pt-5">
      <div className="col-span-5 flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded-full shrink-0 ${
            alert.status === "unread" ? "bg-cyan" : "bg-white/40"
          }`}
        />
        <div className="flex flex-col gap-1.5">
          <h5 className="text-sm font-dmSans text-white font-semibold">
            {alert.title}
          </h5>
          {alert.body ? (
            <p className="text-xs font-dmSans text-white font-light line-clamp-2">
              {alert.body}
            </p>
          ) : null}
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <div className={`py-1 px-4 rounded text-xs font-dmSans font-medium ${tone}`}>
          {SEVERITY_LABEL[alert.severity] ?? alert.severity}
        </div>
      </div>

      <div className="col-span-4 flex items-center gap-2 justify-center">
        <p className="text-sm font-dmSans text-white font-semibold">
          {alert.source ?? "—"}
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-dmSans text-white font-semibold">
            {fmtTime(alert.created_at)}
          </p>
          <p className="text-xs font-dmSans text-white font-light">
            {fmtRelative(alert.created_at)}
          </p>
        </div>
        <button>
          <EllipsisVertical className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default AlertsUpdates;
