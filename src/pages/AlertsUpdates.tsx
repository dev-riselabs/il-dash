import AlertsOverTimeChart from "@/components/AlertChart";
import DonutChart from "@/components/Doughnut";
import { CircleArrowUp, CircleCheck, EllipsisVertical } from "lucide-react";

const kpis = [
  { label: "Unread Alerts", value: "12", delta: "18% vs Today" },
  { label: "High Priority", value: "5", delta: "18% vs Today" },
  { label: "Updates", value: "8", delta: "6% vs Today" },
  { label: "Resolved", value: "24", delta: "6% vs Today" },
];

const additions = [
  {
    title: "Deal Room “Financing Sustainable Cities” activity resumed",
    time: "09:40 AM",
  },
  {
    title: "Sentiment improved for “Healthcare Investment Outlook”.",
    time: "09:28 AM",
  },
  {
    title: "Technical issue resolved for Live Stream in Hall C",
    time: "09:15 AM",
  },
];

const alerts = [
  {
    name: "Lagos Tech Hub Expansion",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "High",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
  {
    name: "Low Attendance Alert",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "Medium",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
  {
    name: "Lagos Tech Hub Expansion",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "Low",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
  {
    name: "Lagos Tech Hub Expansion",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "High",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
  {
    name: "Lagos Tech Hub Expansion",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "High",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
  {
    name: "Lagos Tech Hub Expansion",
    description:
      "“Agri-Business & Food Security” session in Hall B is delayed by 15 mins.",
    severity: "High",
    source: "Programme Tracker",
    time: "10:21 AM",
  },
];

function AlertsUpdates() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          ALERTS & UPDATES
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Stay informed about critical events, updates and actions across Invest
          Lagos 3.0
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-3">
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

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-5">
          <h5 className="lg:col-span-5 text-slate100 font-lexend uppercase text-base">
            ALERT
          </h5>
          <h5 className="lg:col-span-1 text-slate100 font-lexend uppercase text-base text-center">
            SEVERITY
          </h5>
          <h5 className="lg:col-span-4 text-slate100 font-lexend uppercase text-base text-center">
            SOURCE
          </h5>
          <h5 className="lg:col-span-2 text-slate100 font-lexend uppercase text-base">
            TIME
          </h5>
        </div>

        <div className="flex flex-col gap-4 divide-y divide-white/55">
          <div className="flex flex-col gap-5 pb-6">
            {alerts.map(({ name, description, time, severity, source }, i) => (
              <div
                key={i}
                className="grid  lg:grid-cols-12 gap-5 border-t border-t-white/55 pt-5"
              >
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white shrink-0"></div>
                  <div className="w-7.5 h-7.5 bg-white shrink-0"></div>
                  <div className="flex flex-col gap-1.5">
                    <h5 className="text-sm font-dmSans text-white font-semibold">
                      {name}
                    </h5>
                    <p className="text-xs font-dmSans text-white font-light">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  <div className="bg-green500 py-1 px-4 rounded text-white text-xs font-dmSans font-medium">
                    {severity}
                  </div>
                </div>

                <div className="col-span-4 flex items-center gap-2 justify-center">
                  <div className="w-7.5 h-7.5 bg-white"></div>
                  <p className="text-sm font-dmSans text-white font-semibold">
                    {source}
                  </p>
                </div>

                <div className="col-span-2 flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-dmSans text-white font-semibold">
                      {time}
                    </p>
                    <p className="text-xs font-dmSans text-white font-light">
                      2m ago
                    </p>
                  </div>
                  <button>
                    <EllipsisVertical className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
            LOAD MORE ALERTS
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-9 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-4">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            FEEDBACK CHANNELS
          </h4>
          <DonutChart
            data={[
              { label: "High", value: 5, color: "#CB3CFF" },
              { label: "Medium", value: 7, color: "#13A13E" },
              { label: "Low", value: 3, color: "#F66202" },
              { label: "Info", value: 10, color: "#13A13E" },
            ]}
          />
        </div>

        <div className="border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white/55 font-medium uppercase text-base font-lexend">
              RECENTLY RESOLVED
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {additions.map(({ title, time }) => (
              <div
                key={title}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center text-white/55 font-lexend text-sm">
                  <CircleCheck className="fill-green text-black " /> {title}
                </div>
                <div className="text-white/55 font-lexend text-sm">{time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AlertsOverTimeChart />
    </section>
  );
}

export default AlertsUpdates;
