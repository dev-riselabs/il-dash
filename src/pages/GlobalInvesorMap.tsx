import DonutChart from "@/components/Doughnut";
import InvestmentHeatmap from "@/components/GlobalChart";
import { CircleArrowUp } from "lucide-react";
import { FaYelp } from "react-icons/fa";

const kpis = [
  { label: "Total Investors", value: "1,245", delta: "18% vs Today" },
  { label: "Countries Represented", value: "72", delta: "6 New" },
  { label: "Top Region", value: "Europe", delta: "32% of Total" },
  { label: "Sectors of Intrest", value: "8", delta: "6% vs Today" },
  { label: "Investment Signals", value: "47", delta: "8 New Signals" },
];

const sectors = [
  { title: "Infrastructure", percent: 42 },
  { title: "Technology", percent: 28 },
  { title: "Energy", percent: 15 },
  { title: "Healthcare", percent: 10 },
  { title: "Agriculture", percent: 5 },
];

const investors = [
  {
    name: "Africa Finance Corporation",
    sector: "Infrastructure",
    time: "2m ago",
  },
  { name: "Plug and Play Ventures", sector: "Technology", time: "5m ago" },
  {
    name: "European Investment Bank",
    sector: "Infrastructure",
    time: "8m ago",
  },
  { name: "Afreximbank", sector: "Trade & Finance", time: "12m ago" },
  { name: "SoftBank Africa Fund", sector: "Technology", time: "15m ago" },
];

const countries = [
  { img: "", name: "Nigeria", total: "236", percent: "11.3%" },
  { img: "", name: "United Kingdom", total: "198", percent: "15.9%" },
  { img: "", name: "United States", total: "176", percent: "14.3%" },
  { img: "", name: "Germany", total: "72", percent: "5.8%" },
];

function GlobalInvesorMap() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          GLOBAL INVESTOR MAP
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time view of investor participation and interest by region{" "}
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

      <InvestmentHeatmap />

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            TOP COUNTRIES BY INVESTOR COUNT
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all
          </button>
        </div>
        <div className="flex lg:items-center flex-col lg:flex-row gap-1.5">
          {countries.map(({ name, percent, total }, i) => (
            <div className="border border-white/30 rounded-xl py-3.75 px-5 gap-8 flex-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-dmSans font-semibold">
                  {i + 1}
                </span>
                <img
                  src={`${
                    i === 0
                      ? "/ng-flag.png"
                      : i === 1
                        ? "/uk-flag.png"
                        : i === 2
                          ? "/usa-flag.png"
                          : "/germany-flag-48866.png"
                  }`}
                  alt=""
                  className="w-12 h-12 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-white text-sm font-dmSans font-semibold">
                  {name}
                </h5>
                <div className="flex items-center gap-4">
                  <span className="text-white text-xs font-dmSans font-light">
                    {total}
                  </span>
                  <span className="text-white text-xs font-dmSans font-light">
                    {percent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              INVESTOR SUMMARY
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View full report
            </button>
          </div>
          <DonutChart
            data={[
              { label: "Europe", value: 398, color: "#0088FF" },
              { label: "Africa", value: 348, color: "#13A13E" },
              { label: "North America", value: 249, color: "#FFCC00" },
              { label: "Asia", value: 162, color: "#9747FF" },
              { label: "Others", value: 88, color: "#9A9DA6" },
            ]}
          />
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              TOP SECTORS OF INTREST
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>

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
                    style={{ width: `${(percent * 100) / 100}%` }}
                  ></div>
                </div>
                <p className="col-span-1 text-white font-dmSans text-sm align-middle">
                  {percent}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              RECENT INVESTORS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {investors.map(({ name, sector, time }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <FaYelp className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6 className="text-white font-semibold text-sm font-dmSans">
                      {name}
                    </h6>
                    <span className="text-white font-light text-xs font-dmSans">
                      {sector}
                    </span>
                  </div>
                </div>
                <span className="text-slate100 font-semibold text-sm font-dmSans">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default GlobalInvesorMap;
