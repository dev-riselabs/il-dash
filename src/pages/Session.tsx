import { useState } from "react";
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Search,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import { useSessions } from "@/lib/api/hooks";
import { fmtDateTime, fullName } from "@/lib/api/format";
import type { SessionStatus } from "@/lib/api/types";

const PER_PAGE = 10;
const STATUSES: ("" | SessionStatus)[] = [
  "",
  "upcoming",
  "next",
  "live",
  "completed",
  "delayed",
  "cancelled",
];

function Session() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | SessionStatus>("");

  const { data, isLoading, isError, error } = useSessions({
    page,
    per_page: PER_PAGE,
    search: search.trim() || undefined,
    status: status || undefined,
  });

  const rows = data?.data ?? [];

  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Sessions
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all sessions for the summit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by title, sector..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
              // name=""
              // id=""
              // placeholder="Search names of attendees..."
              // className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value as "" | SessionStatus);
            }}
            className="bg-blue950 text-white text-xs font-lexend rounded-xl px-3 h-10"
          >
            {STATUSES.map((s) => (
              <option key={s || "all"} value={s}>
                {s ? s.toUpperCase() : "ALL"}
              </option>
            ))}
          </select>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </button>
          <button className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0">
            Create
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-7 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
              STARTS AT <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              SESSION NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Speakers
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Sector
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Status
            </h6>
          </div>
          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error as { message?: string } | null}
            isEmpty={rows.length === 0}
            emptyLabel="No sessions match your filters."
          >
            <div className="flex flex-col gap-6">
              {rows.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-7 gap-10 font-dmSans items-center"
                >
                  <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                    <CalendarDays className="text-white w-3 h-3" />
                    <span>{fmtDateTime(s.starts_at)}</span>
                  </div>
                  <span className="text-white text-sm col-span-2 truncate">
                    {s.title}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {(s.speakers ?? [])
                      .slice(0, 2)
                      .map((sp) => fullName(sp))
                      .join(", ") || "—"}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {s.sector?.name ?? "—"}
                  </span>
                  <span
                    className={`text-xs col-span-1 uppercase rounded px-2 py-1 inline-flex justify-center font-medium ${
                      s.status === "live"
                        ? "bg-green450 text-green350 border border-green350"
                        : s.status === "delayed"
                          ? "bg-brown200 text-yellow400 border border-yellow400"
                          : s.status === "cancelled"
                            ? "bg-red200 text-red100 border border-red100"
                            : s.status === "completed"
                              ? "bg-blue300 text-blue400 border border-blue400"
                              : "bg-blue500 text-white border border-slate400"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>
              {data?.from ?? 0} to {data?.to ?? 0} of {data?.total ?? 0}
            </span>
            <span>sessions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-6 h-6 border border-white rounded-lg flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft className="text-white w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setPage((p) =>
                  data ? Math.min(data.last_page, p + 1) : p + 1,
                )
              }
              disabled={!data || page >= (data?.last_page ?? 1)}
              className="w-6 h-6 border border-white rounded-lg flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Session;
