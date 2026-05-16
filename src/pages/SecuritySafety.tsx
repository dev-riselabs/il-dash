import DonutChart from "@/components/Doughnut";
import IncidentTrendChart from "@/components/IncidentChart";
import { CircleArrowUp } from "lucide-react";

const kpis = [
  {
    label: "Total Reports (Today)",
    value: "128",
    delta: "18% vs May 8 - May 9",
  },
  { label: "Open Incidents", value: "23", delta: "18% vs Today" },
  { label: "Avg. Response Time", value: "04:32", delta: "6% vs Today" },
  { label: "Resolved (Today)", value: "17", delta: "6% vs Today" },
  { label: "Sentiment Score", value: "78 /100", delta: "3% vs Today" },
];

const severity = [
  { title: "High", value: "12" },
  { title: "Medium", value: "7" },
  { title: "Low", value: "4" },
  { title: "Infor", value: "3" },
];

const zones = [
  { title: "Hall B", value: "11" },
  { title: "Main Hall", value: "8" },
  { title: "Expo Area", value: "6" },
  { title: "Food Court", value: "5" },
  { title: "Parking", value: "4" },
  { title: "Hall C", value: "3" },
  { title: "Other", value: "2" },
];

const sectorOne = [
  { title: "Medical Emergency", value: "28 (22%)" },
  { title: "Crowd Management", value: "26 (20%)" },
  { title: "Suspicious Activity", value: "24 (19%)" },
  { title: "Lost & Found", value: "18 (14%)" },
  { title: "Safety Hazard", value: "12 (9%)" },
  { title: "Others", value: "20 (16%)" },
];

const feeds = [
  {
    title: "Medical Emergency",
    venue: "Near Food Court",
    range: "High",
    label: "Responding",
    time: "10:21 AM",
  },
  {
    title: "Suspicious Activity",
    venue: "Hall B - Row 5",
    range: "High",
    label: "Acknowledged",
    time: "10:21 AM",
  },
  {
    title: "Crowd Congestion",
    venue: "Near Food Court",
    range: "Medium",
    label: "Responding",
    time: "10:21 AM",
  },
  {
    title: "Lost Item",
    venue: "Expo Area - Booth 24",
    range: "Low",
    label: "Acknowledged",
    time: "10:21 AM",
  },
  {
    title: "Spill Hazard",
    venue: "Food Court Area",
    range: "Low",
    label: "Resolved",
    time: "10:21 AM",
  },
];

const alerts = [
  {
    title: "High Risk Incident",
    description:
      "Suspicious activity reported in Hall B. Security team dispatched.",
    status: "High",
    time: "10:21 AM",
  },
  {
    title: "Crowd Build-up Alert",
    description:
      "High footfall detected at Main Hall entrance. Monitoring in progress.",
    status: "Medium",
    time: "10:21 AM",
  },
  {
    title: "High Risk Incident",
    description:
      "Suspicious activity reported in Hall B. Security team dispatched.",
    status: "High",
    time: "10:21 AM",
  },
  {
    title: "Crowd Build-up Alert",
    description:
      "High footfall detected at Main Hall entrance. Monitoring in progress.",
    status: "Medium",
    time: "10:21 AM",
  },
];

function SecuritySafety() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          SECURITY & SAFETY SURVEILLANCE SYSTEM
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time monitoring and incident management for a secure summit
          environment.
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

      <section className="grid grid-cols-1 sm:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-9">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              INCIDENT HEATMAP
            </h4>
            <div className="border border-white/55 rounded-md flex overflow-hidden">
              <div className="p-3 bg-white text-black text-xs font-lexend">
                Heatmap
              </div>
              <div className="p-3 text-white text-xs font-lexend">Cluster</div>
            </div>
          </div>
          <div className="border border-white rounded-2xl min-h-20 h-full"></div>
        </div>
        <div className="col-span-3 flex flex-col gap-4 ">
          <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
            <h4 className="text-white font-medium uppercase text-sm font-lexend">
              INCIDENTS BY SEVERITY
            </h4>
            <div className="flex flex-col gap-4">
              {severity.map(({ title, value }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        title === "High"
                          ? "bg-purple"
                          : title === "Medium"
                            ? "bg-orange"
                            : title === "Low"
                              ? "bg-blue800"
                              : "bg-slate100"
                      }`}
                    ></div>
                    <span className="text-white text-xs font-inter">
                      {title}
                    </span>
                  </div>
                  <span className="text-white text-xs font-inter">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
            <h4 className="text-white font-medium uppercase text-sm font-lexend">
              INCIDENTS BY ZONE
            </h4>
            <div className="flex flex-col gap-4">
              {zones.map(({ title, value }) => (
                <div
                  key={title}
                  className="flex items-center gap-2 justify-between"
                >
                  <span className="text-white text-xs font-inter">{title}</span>
                  <span className="text-white text-xs font-inter">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-4 flex flex-col gap-5">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            LIVE INCIDENT FEED
          </h4>
          <div className="flex flex-col gap-4 border border-white rounded-2xl p-4">
            <div className="flex flex-col gap-5">
              {feeds.map(({ title, venue, range, label, time }, i) => (
                <div
                  key={i}
                  className=" flex items-center gap-4 justify-between pb-8 border-b border-b-white/55"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7.5 h-7.5 bg-white"></div>
                    <div className="flex flex-col gap-1.5">
                      <h6 className="text-white font-dmSans font-semibold text-sm">
                        {title}
                      </h6>
                      <span className="text-white font-dmSans font-light text-xs">
                        {venue}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`py-1.5 px-3 rounded-md text-[10px] font-dmSans font-medium ${
                      range === "High"
                        ? "bg-red200 text-red"
                        : range === "Medium"
                          ? "bg-brown500 text-orange"
                          : "bg-blue900 text-blue200"
                    }`}
                  >
                    {range}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-dmSans text-white font-semibold">
                      {time}
                    </span>
                    <div
                      className={`py-1 px-2 min-w-20 w-full text-[10px] flex justify-center font-dmSans font-medium rounded-md ${
                        label === "Responding"
                          ? "bg-blue900 text-blue200"
                          : label === "Acknowledged"
                            ? "text-orange bg-brown500"
                            : "bg-green850 text-green100"
                      } `}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">
              VIEW ALL INCIDENTS
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              DEALS BY SECTOR
            </h4>
            <div className="flex flex-col gap-4">
              {sectorOne.map(({ title, value }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full w-7.5 h-7.5 text-sm font-light font-dmSans flex items-center justify-center ${
                        i === 0
                          ? "bg-yellow text-black"
                          : i === 1
                            ? "text-white bg-orange"
                            : i === 2
                              ? "text-white bg-red"
                              : i === 3
                                ? "text-white bg-purple"
                                : i === 4
                                  ? "text-white bg-green"
                                  : "bg-mint text-black"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-white font-medium text-sm font-dmSans">
                      {title}
                    </span>
                  </div>
                  <span className="text-white font-medium text-sm font-dmSans">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
            <h4 className="font-dmSans text-white font-medium text-base uppercase">
              INCIDENT STATUS OVERVIIEW
            </h4>
            <DonutChart
              data={[
                { label: "New", value: 6, color: "#CB3CFF" },
                { label: "Acknowledged", value: 8, color: "#13A13E" },
                { label: "Responding", value: 6, color: "#F66202" },
                { label: "Resolved (Today)", value: 105, color: "#13A13E" },
              ]}
            />
          </div>
        </div>
      </section>

      <IncidentTrendChart/>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            ACTIVE ALERTS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all alerts
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {alerts.map(({ title, description, status, time }, i) => (
            <div
              key={i}
              className={`px-7.5 py-5 flex items-center justify-between rounded-2xl gap-4 ${
                i % 2 === 0 ? "bg-violet" : "bg-brown600"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7.5 h-7.5 bg-white"></div>
                <div className="flex flex-col gap-1.5">
                  <h6 className="text-white font-dmSans font-semibold text-sm">
                    {title}
                  </h6>
                  <span className="text-white font-dmSans font-light text-xs max-w-70">
                    {description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-white font-dmSans font-semibold text-sm">
                  {time}
                </span>
                <div
                  className={`py-1.5 px-3 rounded-md text-[10px] font-dmSans font-medium flex items-center justify-center ${
                    status === "High"
                      ? "bg-red200 text-red"
                      : status === "Medium"
                        ? "bg-brown500 text-orange"
                        : "bg-blue900 text-blue200"
                  }`}
                >
                  {status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default SecuritySafety;
