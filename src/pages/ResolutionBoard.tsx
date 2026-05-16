import {
  CircleArrowUp,
  CircleCheck,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
} from "lucide-react";
import DonutChart from "../components/Doughnut";

const kpis = [
  { label: "Total Resolutions", value: "27", delta: "9 New Today" },
  { label: "Commitments", value: "15", delta: "6 New Today" },
  { label: "Partnerships", value: "7", delta: "3 New Today" },
  { label: "Policy Actions", value: "5", delta: "3 New Today" },
  {
    label: "Est. Investment Impact",
    value: "215.4B",
    delta: "20% vs yesterday",
  },
];

const additions = [
  { title: "Lagos Blue Rail Project - Phase 1", time: "10:20 AM" },
  { title: "Healthcare Infrastructure Fund Partnership", time: "10:20 AM" },
  { title: "Off-gride Solar Expansion Initiative", time: "10:20 AM" },
  { title: "Lagos Fintech City Project", time: "10:20 AM" },
  { title: "Waste-to-Wealth Partners", time: "10:20 AM" },
];

const sectors = [
  { title: "Infrastructure", percent: 8 },
  { title: "Technology", percent: 6 },
  { title: "Energy", percent: 4 },
  { title: "Healthcare", percent: 3 },
  { title: "Environment", percent: 2 },
  { title: "Agriculture", percent: 2 },
  { title: "Creative Economy", percent: 2 },
];

function ResolutionBoard() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          RESOLUTION BOARD (LIVE)
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of outcomes, commitments and next steps from Invest
          Lagos3.0
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-3">
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
                  className={`text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
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

      <section className="border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-12">
        <div className="overflow-hidden flex flex-col gap-7.5 overflow-x-auto">
          <div className="grid grid-cols-12 gap-8 min-w-400">
            <div className="text-sm font-lexend font-bold text-slate100 col-span-4">
              Resolution / Commitment
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Category
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-2 text-center">
              Sector
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-2 text-center">
              Committed By
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Stage
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Impact(EST.)
            </div>
            <div className="text-sm font-lexend font-bold text-slate100 col-span-1 text-center">
              Time Added
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8 min-w-400">
            <div className="flex items-center gap-1.5 col-span-4">
              <div className="w-12 h-12 rounded-md bg-green200 shrink-0"></div>
              <div className="flex flex-col gap-2">
                <h5 className="text-white font-dmSans text-sm font-semibold">
                  Lagos Tech Hub Expansion
                </h5>
                <p className="text-white font-dmSans text-xs font-light">
                  Commitment to commence Phase 1 of the Lagos Blue Rail Project
                  by Q1 2026.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-1">
              <div className="bg-slate200 px-6 py-2 rounded-md text-white font-lexend text-sm font-semibold ">
                Infrastructure
              </div>
            </div>
            <div className="text-xs font-lexend text-white flex justify-center items-center col-span-2">
              Transport
            </div>
            <div className="text-xs font-lexend text-white flex justify-center items-center col-span-2">
              Lagos State Government & Private Partners{" "}
            </div>
            <div className=" col-span-1 flex items-center justify-center">
              <div className="border-2 border-green rounded-md py-1 px-6 text-green">
                Commitment
              </div>
            </div>
            <div className="text-green text-sm font-medium flex items-center justify-center">
              ₦45.5B
            </div>
            <div className="flex items-center justify-between gap-1 text-white font-lexend text-sm">
              10:30AM
              <button>
                <EllipsisVertical className="text-white" />
              </button>
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
      </section>

      <section className="border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            LATEST ADDITIONS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View All
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {additions.map(({ title, time }) => (
            <div
              key={title}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center text-white font-lexend text-sm">
                <CircleCheck className="fill-green text-black " /> {title}
              </div>
              <div className="text-white font-lexend text-sm">{time}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            RESOLUTIONS BY CATEGORY
          </h4>
          <DonutChart
            data={[
              { label: "Commitments", value: 15, color: "#CB3CFF" },
              { label: "Keynotes", value: 7, color: "#13A13E" },
              { label: "Panel Discussion", value: 5, color: "#F66202" },
            ]}
          />
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            RESOLUTIONS BY SECTOR
          </h4>

          <div className="flex flex-col gap-4">
            {sectors.map(({ title, percent }) => (
              <div key={title} className="grid grid-cols-12">
                <p className="col-span-4 text-white font-dmSans text-sm align-middle">
                  {title}
                </p>
                <div className="col-span-7 flex items-center">
                  <div
                    className={`rounded-full h-2.5 ${
                      title === "Infrastructure"
                        ? "bg-green"
                        : title === "Technology"
                          ? "bg-yellow"
                          : "bg-orange"
                    }`}
                    style={{ width: `${(percent * 1000) / 100}%` }}
                  ></div>
                </div>
                <p className="col-span-1 text-white font-dmSans text-sm align-middle">
                  {percent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default ResolutionBoard;
