import { CircleArrowUp, Clock, ListFilter, MapPin, Search } from "lucide-react";

const kpis = [
  { label: "Total Sessions", value: "12", delta: "vs Yesterday" },
  { label: "Completed", value: "4", delta: "2 Live Now" },
  { label: "Live Now", value: "1", delta: "8 New" },
  { label: "Remaining", value: "7", delta: "6 New" },
];

const programs = [
  {
    title: "Plenary Session: Lagos - Africa’s Global Gateway",
    description: "Shaping Africa’s Digital Future",
    venue: "Main Auditorium",
    time: "11:00 AM - 12:30 PM",
    status: "live",
  },
  {
    title: "Plenary Session: The Future of Technology and Innovation",
    description: "Targeted global technology participation including Elon Musk",
    venue: "Main Auditorium",
    time: "11:00 AM - 12:30 PM",
    status: "next",
  },
  {
    title: "Plenary Session: Unlocking Investment",
    description: "Keynote: Mr. Aig Imokhoude",
    venue: "Main Auditorium",
    time: "11:00 AM - 12:30 PM",
    status: "upcoming",
  },
  {
    title: "Plenary Session: Building The Cities of the Future",
    description: "Keynote: African Development Bank President (TBC)",
    venue: "Main Auditorium",
    time: "11:00 AM - 12:30 PM",
    status: "upcoming",
  },
  {
    title: "Talent, Creativity and Culture",
    description: "Keynote: Richard Mofe-Damijo (RMD)",
    venue: "Main Auditorium",
    time: "11:00 AM - 12:30 PM",
    status: "completed",
  },
];

function ProgrammeTracker() {
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

      <section className="flex flex-col gap-6">
        <h2 className="text-white font-lexend font-semibold text-xl sm:text-2xl">
          PROGRAMME FLOW
        </h2>
        <section className="flex">
          
          <div className="flex flex-col gap-6 flex-1 border-l-2 border-l-white/55 pl-5 sm:pl-10 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative after:content-['All'] after:text-white after:border after:border-red after:rounded-lg after:px-2 after:sm:px-3 after:text-[10px] after:sm:text-xs after:py-2 after:bg-surface950 after:uppercase after:z-3 after:absolute after:top-px after:-left-9 after:sm:-left-15">
              <div className="flex  divide-x divide-white/55 border font-lexend border-white/55 rounded-lg self-start">
                <div className="py-1.5 px-1.5 sm:px-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-red rounded-full"></div>
                  <span className="text-[10px] sm:text-xs uppercase text-slate100">Live</span>
                </div>
                <div className="py-1.5 px-1.5 sm:px-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow rounded-full"></div>
                  <span className="text-[10px] sm:text-xs uppercase text-slate100">
                    up next
                  </span>
                </div>
                <div className="py-1.5 px-1.5 sm:px-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-slate100 rounded-full"></div>
                  <span className="text-[10px] sm:text-xs uppercase text-slate100">
                    upcoming
                  </span>
                </div>
                <div className="py-1.5 px-1.5 sm:px-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan rounded-full"></div>
                  <span className="text-[10px] sm:text-xs uppercase text-slate100">
                    completed
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate500 p-2 rounded-full min-w-20 flex gap-1.5 items-center">
                  <Search className="w-4 text-white" />
                  <input
                    type="search"
                    name=""
                    id=""
                    className="text-white font-lexend outline-none text-sm placeholder:text-white"
                    placeholder="Search session..."
                  />
                </div>
                <button className="border border-white/70 rounded-md w-10 h-10 flex items-center justify-center">
                  <ListFilter className="text-white w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 relative">
              {programs.map(
                ({ title, description, time, venue, status }, i) => (
                  <div
                    key={i}
                    style={{ "--step": `"${i + 1}"` } as React.CSSProperties}
                    className={`flex border-2 flex-col gap-3 py-5 px-4 lg:px-7.5 rounded-2xl ${
                      status === "live"
                        ? "border-red after:bg-orange300"
                        : status === "next"
                          ? "border-white/35 after:bg-yellow"
                          : status === 'completed' ? 'border-slate100/33 after:bg-cyan' : "border-slate100/33 after:bg-slate100"
                    } after:content-(--step) after:text-sm after:font-semibold after:text-white after:flex after:justify-center after:items-center after:absolute after:w-8 after:sm:w-10 after:h-8 after:sm:h-10  after:rounded-full after:z-5 after:-left-9 after:sm:-left-15`}
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
                          {status === "live"
                            ? "live now"
                            : status === "next"
                              ? "up next"
                              : status}
                        </div>
                        <h5
                          className={`${
                            status === "upcoming"
                              ? "text-slate100/33"
                              : status === "completed"
                                ? "text-cyan"
                                : "text-white"
                          } font-lexend text-sm sm:text-base font-semibold lg:text-xl`}
                        >
                          {title}
                        </h5>
                      </div>
                      {status === "live" && (
                        <div className="flex self-start items-center gap-2 justify-center py-2 px-4 rounded-md border border-green100">
                          <div className="w-1.5 h-1.5 rounded-full bg-green100"></div>
                          <span className="text-green100 uppercase text-[8px] sm:text-xs font-lexend">
                            live
                          </span>
                        </div>
                      )}
                      {status === "next" && (
                        <div className="flex self-start flex-col gap-px border border-yellow text-[8px] sm:text-xs uppercase text-yellow font-lexend rounded-md items-center justify-center px-3 py-1">
                          <span>starts in</span>
                          <span>01:17:23</span>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm lg:text-base font-lexend font-semibold ${
                        status === "upcoming"
                          ? "text-slate100/33"
                          : status === "completed"
                            ? "text-cyan"
                            : "text-white"
                      }`}
                    >
                      {description}
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
                        <div
                          className={`flex items-center gap-2 pr-2 ${
                            status === "upcoming"
                              ? "text-slate100/33"
                              : status === "completed"
                                ? "text-cyan"
                                : "text-white"
                          }`}
                        >
                          {" "}
                          <Clock className="w-4" />{" "}
                          <span className="text-xs">{time}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            status === "upcoming"
                              ? "text-slate100/33"
                              : status === "completed"
                                ? "text-cyan"
                                : "text-white"
                          }`}
                        >
                          {" "}
                          <MapPin className="w-4" />{" "}
                          <span className="text-xs">{venue}</span>
                        </div>
                      </div>

                      <div
                        className={`py-2 px-3 self-start rounded-md text-xs uppercase   ${
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
                ),
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default ProgrammeTracker;
