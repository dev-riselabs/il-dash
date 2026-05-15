import { ChevronsLeft, ChevronsRight, CircleArrowUp } from "lucide-react";

const kpis = [
  { label: "Deals in Discussion", value: "12", delta: "2 new today" },
  { label: "Active Investors", value: "18", delta: "3 new today" },
  { label: "Total Deal Value", value: "₦45.2B", delta: "20% vs yesterday" },
  { label: "Deals Closed", value: "7", delta: "1 new today" },
  { label: "Avg. Deal Cycle", value: "14 Days", delta: "2 days vs yesterday" },
];

const deals = [
  {
    name: "Lagos Tech Hub Expansion",
    sub: "AI & Innovation Hub",
    sector: "Tech",
    investor: "TechGlobal Ventures",
    country: "USA",
    stage: "IN DISCUSSION",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Lekki Free Zone Infrastructure",
    sub: "Industrial Park",
    sector: "Infrastructure",
    investor: "Global Infa Partners",
    country: "UAE",
    stage: "DUE DILLIGENCE",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "AgriTech Supply Chain",
    sub: "Smart Agriculture",
    sector: "Agriculture",
    investor: "AgriVest Capital",
    country: "UK",
    stage: "NEGOTIATION",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Creative Content Studio",
    sub: "Film & Digital Media",
    sector: "Creative",
    investor: "Creative Africa Fund",
    country: "Nigeria",
    stage: "NEGOTIATION",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Lagos Blue Economy Project",
    sub: "Marine & Logistics",
    sector: "Blue Economy",
    investor: "Oceanic Capital",
    country: "Singapore",
    stage: "CLOSING",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Renewable Energy Initiative",
    sub: "Clean Energy",
    sector: "Energy",
    investor: "Green Future Fund",
    country: "Germany",
    stage: "ON HOLD",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Fintech for MSMEs",
    sub: "Payment Solution",
    sector: "Tech",
    investor: "FinEdge Capital",
    country: "USA",
    stage: "IN DISCUSSION",
    value: "₦12.5M",
    time: "10 mins ago",
  },
  {
    name: "Affordable Housing Project",
    sub: "Real Estate",
    sector: "Real Estate",
    investor: "Harbourvest Ltd.",
    country: "Nigeria",
    stage: "CLOSED",
    value: "₦12.5M",
    time: "10 mins ago",
  },
];

const sectors = [
  {
    title: "Tech",
    score: 95,
  },
  {
    title: "Infrastructure",
    score: 80,
  },
  {
    title: "Agriculture",
    score: 65,
  },
  {
    title: "Creative",
    score: 50,
  },
  {
    title: "Energy",
    score: 50,
  },
  {
    title: "Real Estate",
    score: 50,
  },
];

const sectorOne = [
    {title: 'TechGlobal Ventures', value: '₦12.5M'},
    {title: 'Global Infra Partners', value: '₦9.6M'},
    {title: 'AgriVest Capital', value: '₦7.2M'},
    {title: 'Creative Africa Fund', value: '₦6.3M'},
    {title: 'Oceanic Capital', value: '₦4.2M'},
]

function DealRoomTracker() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          DEAL ROOM TRACKER
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Track, monitor and close investment opportunities in real time.
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

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <menu className="flex items-center gap-3 justify-between overflow-x-auto">
          <button className="border-b-2 border-b-orange px-3 py-1 text-orange text-sm font-lexend font-medium rounded-lg flex-1">
            ALL DEALS
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            IN DISCUSSION
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            DUE DILIGENCE
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            NEGOTIATION
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            CLOSING
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            CLOSED
          </button>
          <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">
            HOLD
          </button>
        </menu>

        <div className="flex flex-col gap-8 ">
          <div className="overflow-hidden overflow-x-auto">
            <div className="flex flex-col gap-6 min-w-360">
              <div className="grid grid-cols-12 gap-6">
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-4">
                  Deal / Project
                </h5>
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-1 text-center">
                  Sector
                </h5>
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-3">
                  Investor / Partner
                </h5>
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-2 text-center">
                  Stage
                </h5>
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-1">
                  Deal Value
                </h5>
                <h5 className="font-lexend font-bold text-base text-slate100 col-span-1">
                  Last Activity
                </h5>
              </div>
              <div className="flex flex-col gap-4">
                {deals.map(
                  ({
                    name,
                    sub,
                    sector,
                    investor,
                    country,
                    stage,
                    time,
                    value,
                  }) => (
                    <div key={name} className="grid grid-cols-12 gap-6">
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-white shrink-0"></div>
                        <div className="flex flex-col gap-1 font-lexend">
                          <h6 className="text-white font-light text-sm">
                            {name}
                          </h6>
                          <span className="text-white font-light text-[10px]">
                            {sub}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <div
                          className={`py-2 px-2 rounded-md border text-xs font-lexend font-light  ${
                            sector === "Tech"
                              ? "border-green750 text-green750"
                              : sector === "Infrastructure"
                                ? "border-cyan text-cyan"
                                : sector === "Agriculture"
                                  ? "border-yellow text-yellow"
                                  : sector === "Creative"
                                    ? "border-purple text-purple"
                                    : sector === "Blue Economy"
                                      ? "border-cyan text-cyan"
                                      : sector === "Energy"
                                        ? "border-yellow700 text-yellow700"
                                        : sector === "Real Estate"
                                          ? "border-mint text-mint"
                                          : ""
                          }`}
                        >
                          {sector}
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-md bg-white"></div>
                        <div className="flex flex-col gap-1 font-lexend">
                          <span className="text-white font-light text-xs">
                            {investor}
                          </span>
                          <span className="text-white font-light text-[10px]">
                            {country}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`col-span-2 rounded-xl py-1 border-2 text-sm font-semibold font-lexend flex items-center justify-center ${
                          stage === "IN DISCUSSION"
                            ? "border-green750 text-green100"
                            : stage === "DUE DILLIGENCE"
                              ? "border-blue text-blue"
                              : stage === "NEGOTIATION"
                                ? "border-orange text-orange"
                                : stage === "CLOSING"
                                  ? "border-yellow text-yellow"
                                  : stage === "ON HOLD"
                                    ? "border-slate600 text-slate600"
                                    : stage === "CLOSED"
                                      ? "border-green100 text-green100"
                                      : ""
                        }`}
                      >
                        {stage}
                      </div>
                      <span className="text-white text-sm font-semibold font-lexend col-span-1">
                        {value}
                      </span>
                      <span className="text-green100 text-sm font-lexend col-span-1">
                        {time}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-4 font-lexend text-white text-sm">
              <p>Showing</p>
              <p>1 to 5 of 120</p>
              <p>deals</p>
            </div>

            <div className="flex gap-3 items-center">
              <button className="w-5 h-5 border border-white rounded flex items-center justify-center">
                <ChevronsLeft className="text-white w-3 h-3" />
              </button>
              <button className="w-5 h-5 border border-white rounded flex items-center justify-center">
                <ChevronsRight className="text-white w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            DEALS BY SECTOR
          </h4>
          <div className="flex flex-col gap-4">
            {
                sectors.map(({ title, score }) => (
                <div key={title} className="grid grid-cols-12 gap-4">
                  <p className="text-white font-dmSans text-sm col-span-3">
                    {title}
                  </p>
                  <div className="col-span-7 sm:col-span-8">
                    <div
                      className={` h-5
                  ${
                    score > 90
                      ? "bg-green"
                      : score > 70
                        ? "bg-yellow" :
                        score > 50 ? 'bg-orange'
                          : "bg-red"
                  }
                  `}
                      style={{ width: `${(score * 100) / 100}%` }}
                    ></div>
                  </div>
                  <p className="text-white font-dmSans text-sm col-span-1">
                    {score}%
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            DEALS BY SECTOR
          </h4>
          <div className="flex flex-col gap-4">
            {
                sectorOne.map(({title, value}, i) => <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-full w-7.5 h-7.5 text-sm font-light font-dmSans flex items-center justify-center ${
                            i === 0 ? 'bg-yellow text-black':
                            i === 1 ? 'text-white bg-orange': 
                            i === 2 ? 'text-white bg-red': 
                            i === 3 ? 'text-white bg-purple': 
                            i === 4 ? 'text-white bg-green': 
                            'bg-mint text-black'

                        }`}>{i + 1}</div>
                        <span className="text-white font-medium text-sm font-dmSans">{title}</span>
                    </div>
                    <span className="text-white font-medium text-sm font-dmSans">{value}</span>

                </div>)
            }
          </div>
        </div>
      </section>
    </section>
  );
}

export default DealRoomTracker;
