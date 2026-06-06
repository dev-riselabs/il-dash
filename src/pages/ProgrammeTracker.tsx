import { CircleArrowUp, Clock, ListFilter, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useProgrammeFlow, useProgrammeKpis } from "@/lib/api/hooks";
import { fmtRange, startsInCountdown } from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";
import type { EventSession, SessionStatus } from "@/lib/api/types";

const KPI_TONE = ["text-cyan", "text-green", "text-orange", "text-yellow"];

type FilterKey = "all" | SessionStatus;

const FILTERS: { key: FilterKey; label: string; dot: string }[] = [
  { key: "all", label: "All", dot: "bg-white" },
  { key: "live", label: "Live", dot: "bg-red" },
  { key: "next", label: "Up Next", dot: "bg-yellow" },
  { key: "upcoming", label: "Upcoming", dot: "bg-slate100" },
  { key: "completed", label: "Completed", dot: "bg-cyan" },
];

function ProgrammeTracker() {
  const kpisQ = useProgrammeKpis();
  const flowQ = useProgrammeFlow();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  const kpis = [
    { label: "Total Sessions", value: kpisQ.data?.total_sessions, delta: "Across the day" },
    { label: "Completed", value: kpisQ.data?.completed, delta: `${kpisQ.data?.live ?? 0} Live Now` },
    { label: "Live Now", value: kpisQ.data?.live, delta: `${kpisQ.data?.delayed ?? 0} Delayed` },
    {
      label: "Remaining",
      value:
        (kpisQ.data?.total_sessions ?? 0) -
        (kpisQ.data?.completed ?? 0) -
        (kpisQ.data?.live ?? 0),
      delta: `${kpisQ.data?.cancelled ?? 0} Cancelled`,
    },
  ];

  const programs = useMemo(() => {
    const flow = flowQ.data;
    if (!flow) return [] as EventSession[];
    const ordered: EventSession[] = [
      ...(flow.live ?? []),
      ...(flow.upcoming ?? []),
      ...(flow.completed ?? []),
    ];
    const seen = new Set<number>();
    let result = ordered.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
    if (activeFilter !== "all") {
      result = result.filter((s) => s.status === activeFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.description ?? "").toLowerCase().includes(q) ||
          (s.venue?.name ?? "").toLowerCase().includes(q),
      );
    }
    return result;
  }, [flowQ.data, activeFilter, search]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          LIVE PROGRAMME TRACKER
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of all sessions.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div key={label} className="border border-white/30 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div
                  className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${KPI_TONE[idx]}`}
                >
                  {kpisQ.isLoading ? "…" : (value ?? 0)}
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

      <section className="flex flex-col gap-6">
        <h2 className="text-white font-lexend font-semibold text-xl sm:text-2xl">PROGRAMME FLOW</h2>

        <section className="flex">
          <div className="flex flex-col gap-6 flex-1 border-l-2 border-l-white/55 pl-5 sm:pl-10 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex divide-x divide-white/55 border font-lexend border-white/55 rounded-lg self-start">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`py-1.5 px-1.5 sm:px-3 flex items-center gap-1 ${
                      activeFilter === f.key ? "bg-white/10" : ""
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 ${f.dot} rounded-full`} />
                    <span className="text-[10px] sm:text-xs uppercase text-slate100">{f.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate500 p-2 rounded-full min-w-20 flex gap-1.5 items-center">
                  <Search className="w-4 text-white" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-white font-lexend outline-none text-sm placeholder:text-white bg-transparent"
                    placeholder="Search session..."
                  />
                </div>
                <button className="border border-white/70 rounded-md w-10 h-10 flex items-center justify-center">
                  <ListFilter className="text-white w-4 h-4" />
                </button>
              </div>
            </div>

            <QueryState
              isLoading={flowQ.isLoading}
              isError={flowQ.isError}
              error={flowQ.error}
              isEmpty={programs.length === 0}
              emptyLabel="No sessions match your filters."
            >
              <div className="flex flex-col gap-4 relative">
                {programs.map((s, i) => (
                  <ProgrammeRow key={s.id} session={s} index={i} />
                ))}
              </div>
            </QueryState>
          </div>
        </section>
      </section>
    </section>
  );
}


function ProgrammeRow({ session, index }: { session: EventSession; index: number }) {
  const status = session.status;
  const borderClass =
    status === "live"
      ? "border-red after:bg-orange300"
      : status === "next"
        ? "border-white/35 after:bg-yellow"
        : status === "completed"
          ? "border-slate100/33 after:bg-cyan"
          : "border-slate100/33 after:bg-slate100";

  const titleColour =
    status === "upcoming"
      ? "text-slate100/33"
      : status === "completed"
        ? "text-cyan"
        : "text-white";

  const venueName = session.venue?.name ?? "TBD";

  return (
    <div
      style={{ "--step": `"${index + 1}"` } as React.CSSProperties}
      className={`flex border-2 flex-col gap-3 py-5 px-4 lg:px-7.5 rounded-2xl ${borderClass} after:content-(--step) after:text-sm after:font-semibold after:text-white after:flex after:justify-center after:items-center after:absolute after:w-8 after:sm:w-10 after:h-8 after:sm:h-10 after:rounded-full after:z-5 after:-left-9 after:sm:-left-15`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div
            className={`border-2 rounded-md py-1.5 px-1.5 sm:px-2.5 uppercase text-[8px] sm:text-xs shrink-0 ${
              status === "live"
                ? "border-red text-red"
                : status === "next"
                  ? "border-yellow text-yellow"
                  : status === "upcoming"
                    ? "border-slate/100/33 text-slate100/33"
                    : status === "completed"
                      ? "border-cyan text-cyan"
                      : ""
            }`}
          >
            {status === "live" ? "live now" : status === "next" ? "up next" : status}
          </div>
          <h5 className={`${titleColour} font-lexend text-sm sm:text-base font-semibold lg:text-xl`}>
            {session.title}
          </h5>
        </div>
        {status === "live" && (
          <div className="flex self-start items-center gap-2 justify-center py-2 px-4 rounded-md border border-green100">
            <div className="w-1.5 h-1.5 rounded-full bg-green100" />
            <span className="text-green100 uppercase text-[8px] sm:text-xs font-lexend">live</span>
          </div>
        )}
        {status === "next" && (
          <div className="flex self-start flex-col gap-px border border-yellow text-[8px] sm:text-xs uppercase text-yellow font-lexend rounded-md items-center justify-center px-3 py-1">
            <span>starts in</span>
            <span>{startsInCountdown(session.starts_at)}</span>
          </div>
        )}
      </div>
      <p className={`text-xs sm:text-sm lg:text-base font-lexend font-semibold ${titleColour}`}>
        {session.description ?? ""}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div
          className={`flex items-center gap-2 divide-x ${
            status === "upcoming"
              ? "divide-slate100/33"
              : status === "completed"
                ? "divide-cyan"
                : "divide-white"
          }`}
        >
          <div className={`flex items-center gap-2 pr-2 ${titleColour}`}>
            <Clock className="w-4" />
            <span className="text-xs">{fmtRange(session.starts_at, session.ends_at)}</span>
          </div>
          <div className={`flex items-center gap-2 ${titleColour}`}>
            <MapPin className="w-4" />
            <span className="text-xs">{venueName}</span>
          </div>
        </div>
        <div
          className={`py-2 px-3 self-start rounded-md text-xs uppercase ${
            status === "upcoming"
              ? "bg-slate100 text-white"
              : status === "completed"
                ? "bg-cyan text-white"
                : "bg-white text-black"
          }`}
        >
          {status === "completed" ? "view recap" : "view details"}
        </div>
      </div>
    </div>
  );
}

export default ProgrammeTracker;
