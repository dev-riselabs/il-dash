import AttendanceChart from "@/components/AttendanceChart";
import DonutChart from "@/components/Doughnut";
import SentimentTrendChart from "@/components/TrendChart";
import { CircleArrowUp } from "lucide-react";

const kpis = [
  { label: "Sessions", value: "28", delta: "18% vs May 8 - May 9" },
  { label: "Attendees", value: "1,248", delta: "18% vs Today" },
  { label: "Investment Signals", value: "68", delta: "6% vs Today" },
  { label: "Resolutions", value: "17", delta: "6% vs Today" },
  { label: "Sentiment Score", value: "78 /100", delta: "3% vs Today" },
];

const reports = [
  {
    session: "Executive Summary Report (May 8 - 10)",
    location: "Main Hall",
    attendOne: "Standard",
    attendTwo: "May",
    attendThree: "562",
    attendFour: "562",
  },
  {
    session: "Lagos Tech & Innovation Hub",
    location: "Hall B",
    attendOne: "Standard",
    attendTwo: "May",
    attendThree: "562",
    attendFour: "562",
  },
  {
    session: "Energy Transition Dialogue",
    location: "Hall B",
    attendOne: "Standard",
    attendTwo: "May",
    attendThree: "562",
    attendFour: "562",
  },
  {
    session: "Healthcare Investment Outlook",
    location: "Hall A",
    attendOne: "Standard",
    attendTwo: "May",
    attendThree: "562",
    attendFour: "562",
  },
  {
    session: "Financing Sustainable Cities",
    location: "Hall C",
    attendOne: "Standard",
    attendTwo: "May",
    attendThree: "562",
    attendFour: "562",
  },
];

const attendance = [
  {
    session: "Unlocking Africa’s Infrastructure Future",
    location: "Main Hall",
    attendee: "532",
  },
  {
    session: "Lagos Tech & Innovation Hub",
    location: "Main Hall",
    attendee: "532",
  },
  {
    session: "Energy Transition Dialogue",
    location: "Main Hall",
    attendee: "532",
  },
  {
    session: "Healthcare Investment Outlook",
    location: "Main Hall",
    attendee: "532",
  },
  {
    session: "Financing Sustainable Cities",
    location: "Main Hall",
    attendee: "532",
  },
];

const engagements = [
  { title: "Social Media Mentions", value: "3,842" },
  { title: "Unique Authors", value: "2,198" },
  { title: "Total Reach", value: "1.26M" },
  { title: "Engagements", value: "28.7K" },
];

function Reports() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          REPORTS
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Comprehensive insights and data reports across Invest Lagos 3.0
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

      <AttendanceChart />
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              ATTENDEE BREAKDOWN
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View full breakdown
            </button>
          </div>
          <DonutChart
            data={[
              { label: "Investors", value: 474, color: "#CB3CFF" },
              { label: "Government", value: 225, color: "#13A13E" },
              { label: "Private Sector", value: 200, color: "#F66202" },
              { label: "Development Partners", value: 137, color: "#CB3CFF" },
              { label: "Academics", value: 87, color: "#13A13E" },
              { label: "Media", value: 66, color: "#F66202" },
              { label: "Other", value: 62, color: "#CB3CFF" },
            ]}
          />
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-6 ">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              INVESTMENT SIGNALS BY SECTOR
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all report
            </button>
          </div>
          <DonutChart
            data={[
              { label: "Infrastructure", value: 26, color: "#CB3CFF" },
              { label: "Technology", value: 15, color: "#13A13E" },
              { label: "Energy", value: 10, color: "#F66202" },
              { label: "Healthcare", value: 8, color: "#CB3CFF" },
              { label: "Transportation", value: 5, color: "#13A13E" },
              { label: "Other", value: 4, color: "#F66202" },
            ]}
          />
        </div>
      </section>

      <SentimentTrendChart />

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            RECENTLY GENERATED REPORTS
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all reports
          </button>
        </div>

        <table>
          <thead className="mb-5">
            <tr>
              <th className="text-base font-semibold uppercase font-dmSans text-white text-left pb-6">
                SESSION
              </th>
              <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                ATTENDEES
              </th>
              <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                ATTENDEES
              </th>
              <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                ATTENDEES
              </th>
              <th className="text-base font-semibold uppercase font-dmSans text-white text-center pb-6">
                ATTENDEES
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map(
              ({
                session,
                location,
                attendFour,
                attendOne,
                attendThree,
                attendTwo,
              }) => (
                <tr key={session} className="">
                  <td className="flex flex-col gap-1 pb-4">
                    <span className="text-sm font-semibold font-dmSans text-white text-left ">
                      {session}
                    </span>
                    <span className="text-xs font-light font-dmSans text-white text-left">
                      {location}
                    </span>
                  </td>
                  <td className="text-sm font-semibold font-dmSans text-white text-center pb-4">
                    {attendOne}
                  </td>
                  <td className="text-sm font-semibold font-dmSans text-white text-center pb-4">
                    {attendTwo}
                  </td>
                  <td className="text-sm font-semibold font-dmSans text-white text-center pb-4">
                    {attendThree}
                  </td>
                  <td className="text-sm font-semibold font-dmSans text-white text-center pb-4">
                    {attendFour}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="flex flex-col lg:flex-row gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              TOP SESSIONS BY ATTENDANCE
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all sessions
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 justify-between">
              <h5 className="text-base font-semibold uppercase font-dmSans text-white">
                SESSION
              </h5>
              <h5 className="text-base font-semibold uppercase font-dmSans text-white">
                ATTENDEES
              </h5>
            </div>

            <div className="flex flex-col gap-4">
              {attendance.map(({ session, location, attendee }) => (
                <div
                  key={session}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold font-dmSans text-white text-left ">
                      {session}
                    </span>
                    <span className="text-xs font-light font-dmSans text-white text-left">
                      {location}
                    </span>
                  </div>
                  <span className="text-sm font-semibold font-dmSans text-white text-center">
                    {attendee}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 self-start">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              ENGAGEMENT SUMMARY
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all engagement report
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {engagements.map(({ title, value }) => (
              <div key={title} className="flex items-center justify-between">
                <span className="text-sm font-semibold font-dmSans text-white">
                  {title}
                </span>
                <span className="text-sm font-semibold font-dmSans text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Reports;
