import { useMemo, useState } from "react";
import DonutChart from "@/components/Doughnut";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleArrowUp,
  Download,
  ListFilter,
  Search,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import {
  useActionKpis,
  useActions,
  useSectors,
} from "@/lib/api/hooks";
import { fmtNumber, fmtRelative } from "@/lib/api/format";
import type { ActionItem, ActionStatus } from "@/lib/api/types";

type Tab = "all" | "my" | "overdue" | "followups" | "commitments";

const TAB_LABELS: { key: Tab; label: string }[] = [
  { key: "all", label: "ALL ACTIONS" },
  { key: "my", label: "MY ACTIONS" },
  { key: "overdue", label: "OVERDUE" },
  { key: "followups", label: "FOLLOW-UPS" },
  { key: "commitments", label: "COMMITMENTS" },
];

const STATUS_LABEL: Record<ActionStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  done: "Completed",
  blocked: "Blocked",
};

const SECTOR_BAR_TONE = [
  "bg-green",
  "bg-yellow",
  "bg-orange",
  "bg-cyan",
  "bg-purple100",
  "bg-blue",
  "bg-red",
];

const ROW_THUMB_TONE = [
  "bg-green700",
  "bg-purple100",
  "bg-orange200",
  "bg-green800",
  "bg-green900",
  "bg-blue200",
];

function actionBadgeTone(s: ActionStatus): string {
  switch (s) {
    case "done":
      return "bg-green500";
    case "in_progress":
      return "bg-purple200";
    case "blocked":
      return "bg-brown";
    default:
      return "bg-blue200";
  }
}

function dueLabel(due_at?: string | null): {
  text: string;
  isOverdue: boolean;
} {
  if (!due_at) return { text: "No due date", isOverdue: false };
  const due = new Date(due_at).getTime();
  if (!Number.isFinite(due)) return { text: "No due date", isOverdue: false };
  const now = Date.now();
  return {
    text: fmtRelative(due_at),
    isOverdue: due < now,
  };
}

function priorityBadge(due_at?: string | null, status?: ActionStatus): {
  label: string;
  className: string;
} {
  const due = due_at ? new Date(due_at).getTime() : null;
  const now = Date.now();
  if (due !== null && due < now && status !== "done") {
    return {
      label: "OVERDUE",
      className: "border-red100 bg-transparent text-red100",
    };
  }
  if (due !== null && due - now < 2 * 24 * 60 * 60 * 1000) {
    return {
      label: "HIGH",
      className: "text-yellow200 border-yellow200 bg-yellow100",
    };
  }
  return {
    label: "MEDIUM",
    className: "border-white/40 bg-transparent text-white",
  };
}

function NextActionTracker() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ActionStatus | "">("");
  const [sectorFilter, setSectorFilter] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const kpisQ = useActionKpis();
  const sectorsQ = useSectors();

  const listParams = useMemo(
    () => ({
      page,
      per_page: perPage,
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(sectorFilter ? { sector_id: Number(sectorFilter) } : {}),
    }),
    [page, statusFilter, sectorFilter],
  );

  const listQ = useActions(listParams);
  // A larger sample query used purely to aggregate sector counts for the side widget.
  const aggregateQ = useActions({ per_page: 200 });

  const tabbedRows = useMemo<ActionItem[]>(() => {
    const rows = listQ.data?.data ?? [];
    const lower = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab === "overdue") {
        const due = r.due_at ? new Date(r.due_at).getTime() : null;
        if (due === null || r.status === "done" || due >= Date.now())
          return false;
      }
      if (!lower) return true;
      const hay = `${r.title} ${r.description ?? ""} ${
        r.sector?.name ?? ""
      } ${r.owner?.name ?? ""}`.toLowerCase();
      return hay.includes(lower);
    });
  }, [listQ.data, tab, search]);

  const sectorSummary = useMemo(() => {
    const rows = aggregateQ.data?.data ?? [];
    const counts = new Map<string, number>();
    for (const r of rows) {
      const key = r.sector?.name ?? "Unassigned";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const total = rows.length || 1;
    return Array.from(counts.entries())
      .map(([title, count]) => ({
        title,
        count,
        percent: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [aggregateQ.data]);

  const upcoming = useMemo(() => {
    const rows = aggregateQ.data?.data ?? [];
    return rows
      .filter((r) => r.status !== "done" && r.due_at)
      .sort(
        (a, b) =>
          new Date(a.due_at as string).getTime() -
          new Date(b.due_at as string).getTime(),
      )
      .slice(0, 3);
  }, [aggregateQ.data]);

  const kpiCards = useMemo(() => {
    const k = kpisQ.data;
    return [
      { label: "Total Actions", value: k?.total ?? 0, tone: "text-cyan" },
      { label: "Completed", value: k?.done ?? 0, tone: "text-green" },
      { label: "In Progress", value: k?.in_progress ?? 0, tone: "text-orange" },
      { label: "Pending", value: k?.pending ?? 0, tone: "text-yellow" },
      { label: "Overdue", value: k?.overdue ?? 0, tone: "text-white" },
    ];
  }, [kpisQ.data]);

  const meta = listQ.data;
  const from = meta?.from ?? 0;
  const to = meta?.to ?? 0;
  const total = meta?.total ?? 0;
  const lastPage = meta?.last_page ?? 1;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          NEXT ACTION TRACKER
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Track commitment, follow-ups and outcomes beyond discussion
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpiCards.map(({ label, value, tone }) => (
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
                  {kpisQ.isLoading ? "…" : fmtNumber(value)}
                </div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto">
              <CircleArrowUp color="white" width={"20px"} /> live
            </div>
          </div>
        ))}
      </div>

      <menu className="flex items-center gap-3 overflow-x-auto">
        {TAB_LABELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setTab(key);
              setPage(1);
            }}
            className={
              tab === key
                ? "border-b-2 border-b-blue px-10 py-1 text-blue text-sm font-lexend font-medium rounded-lg"
                : "px-10 py-1 text-slate100 text-sm font-lexend font-medium"
            }
          >
            {label}
          </button>
        ))}
      </menu>

      <div className="flex items-center gap-5 flex-wrap">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1.5 min-w-80">
          <Search className="w-4 text-white shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actions, partners, sessions..."
            className="flex-1 text-white text-sm font-lexend outline-none placeholder:text-white bg-transparent"
          />
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ActionStatus | "");
              setPage(1);
            }}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="" className="bg-bgDark">
              All Status
            </option>
            {(Object.keys(STATUS_LABEL) as ActionStatus[]).map((s) => (
              <option key={s} value={s} className="bg-bgDark">
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value ? Number(e.target.value) : "");
              setPage(1);
            }}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="" className="bg-bgDark">
              All Sectors
            </option>
            {(sectorsQ.data ?? []).map((s) => (
              <option key={s.id} value={s.id} className="bg-bgDark">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
          <ListFilter className="w-4 text-white" />
          Filter
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
          <Download className="w-4 text-white" />
          Export
        </div>
      </div>

      <section className="border border-white/55 rounded-2xl px-7.5 py-2.5 flex flex-col gap-12">
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-6 min-w-220">
          <div className="flex items-center justify-between border border-white/50 rounded-2xl py-6 px-5">
            <h5 className="text-center font-lexend font-light text-white text-sm">
              ACTION / DESCRIPTION
            </h5>
            <h5 className="text-center font-lexend font-light text-white text-sm">
              RELATED TO
            </h5>
            <h5 className="text-center font-lexend font-light text-white text-sm">
              SECTOR
            </h5>
            <h5 className="text-center font-lexend font-light text-white text-sm">
              OWNER
            </h5>
          </div>
          <QueryState
            isLoading={listQ.isLoading}
            isError={listQ.isError}
            error={listQ.error as { message?: string } | null}
            isEmpty={tabbedRows.length === 0}
            emptyLabel="No actions match the current filters."
          >
            <div className="flex flex-col gap-6">
              {tabbedRows.map((row, i) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`${ROW_THUMB_TONE[i % ROW_THUMB_TONE.length]} w-12 h-12 rounded-md shrink-0`}
                    ></div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h6 className="text-white font-lexend font-light text-sm truncate">
                        {row.title}
                      </h6>
                      <span className="text-white/70 font-lexend font-light text-xs truncate">
                        {row.description ?? "—"}
                      </span>
                      <div
                        className={`text-xs text-white font-lexend rounded-md py-1 px-3.5 self-start ${actionBadgeTone(row.status)}`}
                      >
                        {STATUS_LABEL[row.status]}
                      </div>
                    </div>
                  </div>
                  <p className="text-white font-lexend font-light text-sm text-center flex-1">
                    {row.related_to
                      ? `${row.related_to}${row.related_id ? ` #${row.related_id}` : ""}`
                      : "—"}
                  </p>
                  <p className="text-white font-lexend font-light text-sm flex-1">
                    {row.sector?.name ?? "—"}
                  </p>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-12.5 h-12.5 rounded-full shrink-0 bg-white/10 flex items-center justify-center text-white font-dmSans text-xs">
                      {(row.owner?.name ?? "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-white font-dmSans font-semibold text-sm truncate">
                        {row.owner?.name ?? "Unassigned"}
                      </span>
                      <span className="text-white/60 font-dmSans font-medium text-xs">
                        {row.due_at
                          ? `Due ${dueLabel(row.due_at).text}`
                          : "No due date"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
</div>
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4 font-lexend text-white text-sm">
            <p>Showing</p>
            <p>
              {fmtNumber(from)} to {fmtNumber(to)} of {fmtNumber(total)}
            </p>
            <p>actions</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft className="text-white w-3 h-3" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page >= lastPage}
              className="w-5 h-5 border border-white rounded flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight className="text-white w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            ACTION STATUS OVERVIEWS
          </h4>
          <QueryState
            isLoading={kpisQ.isLoading}
            isError={kpisQ.isError}
            error={kpisQ.error as { message?: string } | null}
            isEmpty={!kpisQ.data || kpisQ.data.total === 0}
            emptyLabel="No actions recorded yet."
          >
            <DonutChart
              data={[
                {
                  label: "Completed",
                  value: kpisQ.data?.done ?? 0,
                  color: "#13A13E",
                },
                {
                  label: "In Progress",
                  value: kpisQ.data?.in_progress ?? 0,
                  color: "#CB3CFF",
                },
                {
                  label: "Pending",
                  value: kpisQ.data?.pending ?? 0,
                  color: "#F66202",
                },
                {
                  label: "Overdue",
                  value: kpisQ.data?.overdue ?? 0,
                  color: "#E03E3E",
                },
              ]}
            />
          </QueryState>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              ACTIONS BY SECTOR
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View full
            </button>
          </div>

          <QueryState
            isLoading={aggregateQ.isLoading}
            isError={aggregateQ.isError}
            error={aggregateQ.error as { message?: string } | null}
            isEmpty={sectorSummary.length === 0}
            emptyLabel="No sector data yet."
          >
            <div className="flex flex-col gap-4">
              {sectorSummary.map(({ title, percent }, i) => (
                <div key={title} className="grid grid-cols-12">
                  <p className="col-span-4 text-white font-dmSans text-sm align-middle">
                    {title}
                  </p>
                  <div className="col-span-7 flex items-center">
                    <div
                      className={`rounded-full h-2.5 ${SECTOR_BAR_TONE[i % SECTOR_BAR_TONE.length]}`}
                      style={{ width: `${Math.max(percent, 2)}%` }}
                    ></div>
                  </div>
                  <p className="col-span-1 text-white font-dmSans text-sm align-middle text-right">
                    {percent}%
                  </p>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            UPCOMING ACTIONS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View full
          </button>
        </div>

        <QueryState
          isLoading={aggregateQ.isLoading}
          isError={aggregateQ.isError}
          error={aggregateQ.error as { message?: string } | null}
          isEmpty={upcoming.length === 0}
          emptyLabel="No upcoming actions."
        >
          <div className="flex flex-col gap-9">
            {upcoming.map((row) => {
              const badge = priorityBadge(row.due_at, row.status);
              const due = dueLabel(row.due_at);
              return (
                <div
                  key={row.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-md bg-blue100 shrink-0"></div>
                    <div className="flex flex-col gap-2 min-w-0">
                      <h5 className="text-sm font-lexend font-light text-white truncate">
                        {row.title}
                      </h5>
                      <span
                        className={`${due.isOverdue ? "text-red100" : "text-slate100"} font-lexend font-light text-xs`}
                      >
                        Due {due.text}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`py-1.25 px-3.75 rounded-md border uppercase font-dmSans text-xs ${badge.className}`}
                  >
                    {badge.label}
                  </div>
                </div>
              );
            })}
          </div>
        </QueryState>
      </section>
    </section>
  );
}

export default NextActionTracker;
