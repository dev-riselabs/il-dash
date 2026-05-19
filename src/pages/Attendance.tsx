import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Ellipsis,
  Pencil,
  Search,
  Trash,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import { useAttendees, useCheckInAttendee } from "@/lib/api/hooks";
import { fmtDateTime } from "@/lib/api/format";

const PER_PAGE = 10;

function Attendance() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [checkedInOnly, setCheckedInOnly] = useState<boolean | undefined>(
    undefined,
  );

  const { data, isLoading, isError, error } = useAttendees({
    page,
    per_page: PER_PAGE,
    search: search.trim() || undefined,
    checked_in: checkedInOnly,
  });

  const checkIn = useCheckInAttendee();
  const rows = data?.data ?? [];
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);

  function handleActiveDropdown(id: number){
    setActiveDropdown(prev => prev === id ? null : id)
  }

  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Attendance
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all attendance records from the summit.
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
              placeholder="Search names of attendees..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <button
            onClick={() => {
              setPage(1);
              setCheckedInOnly((v) =>
                v === undefined ? true : v === true ? false : undefined,
              );
            }}
            title={
              checkedInOnly === true
                ? "Showing: checked-in"
                : checkedInOnly === false
                  ? "Showing: not checked-in"
                  : "Showing: all"
            }
            className={`rounded-xl w-10 h-10 flex items-center justify-center shrink-0 ${
              checkedInOnly === undefined ? "bg-blue950" : "bg-cyan"
            }`}
          >
            {/* <Funnel className="w-5 h-5 text-white" /> */}
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
              CHECKED IN <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              FIRST NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              LAST NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Email Address
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              JOB TITLE
            </h6>
          </div>

          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error as { message?: string } | null}
            isEmpty={rows.length === 0}
            emptyLabel="No attendees match your filters."
          >
            <div className="flex flex-col gap-6">
              {rows.map((a) => (
                <div
                  key={a.id}
                  className="grid grid-cols-7 gap-10 font-dmSans"
                >
                  <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                    {a.checked_in_at ? (
                      <>
                        <CheckCircle2 className="text-green100 w-4 h-4 shrink-0" />
                        <span>{fmtDateTime(a.checked_in_at)}</span>
                      </>
                    ) : (
                      <button
                        onClick={() => checkIn.mutate(a.id)}
                        disabled={checkIn.isPending}
                        className="text-cyan underline text-xs"
                      >
                        Check in
                      </button>
                    )}
                  </div>
                  <span className="text-white text-sm col-span-1">
                    {a.first_name}
                  </span>
                  <span className="text-white text-sm col-span-1">
                    {a.last_name}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {a.email ?? "—"}
                  </span>
                  <div className="flex items-center justify-between gap-2 text-white text-sm col-span-2 font-dmSans">
                    <span className="truncate">{a.job_title ?? "—"}</span>
                    <button>
                      <Ellipsis className="text-white w-5 h-5" />
                    </button>
                  </div>
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
            <span>attendees</span>
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

export default Attendance;
