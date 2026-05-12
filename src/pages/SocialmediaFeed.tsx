import DonutChart from "@/components/Doughnut";
import MentionsChart from "@/components/SocialChart";
import { CalendarDays, CircleArrowUp, CircleCheck } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const kpis = [
  { label: "Total Mentions", value: "3,842", delta: "18% vs Today" },
  { label: "Unique Authors", value: "2,196", delta: "18% vs Today" },
  { label: "Total Reach", value: "1.26M", delta: "6% vs Today" },
  { label: "Engagement", value: "28.7K", delta: "6% vs Today" },
  { label: "Neutral Feedback", value: "78 /100", delta: "3% vs Today" },
];

const sectorOne = [
  { icon: <FaXTwitter />, percent: 1482 },
  { icon: <FaLinkedin />, percent: 1482 },
  { icon: <FaFacebook />, percent: 1482 },
  { icon: <FaSquareInstagram />, percent: 1482 },
  { icon: <FaYoutube />, percent: 1482 },
];

const additions = [
  { title: "Infrastructure Development", value: "1,256" },
  { title: "Investment Opportunities", value: "985" },
  { title: "Technology & Innovation", value: "782" },
  { title: "Energy Transition", value: "624" },
  { title: "Partnerships & Collaboration", value: "531" },
];

const hashtags = [
  { title: "#InvestLagos3.0", value: "1,256" },
  { title: "#LagosRising", value: "985" },
  { title: "#InvestLagos", value: "782" },
  { title: "#Partnerships", value: "624" },
  { title: "#OpenForBusiness", value: "531" },
];

function SocialmediaFeed() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          SOCIAL MEDIA FEED
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time social media mentions, trends and engagement around Invest
          Lagos 3.0
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

      <div className="flex items-center gap-8 flex-col lg:flex-row">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Platforms</option>
            <option value="">All Platforms</option>
            <option value="">All Platforms</option>
          </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Sentiment</option>
            <option value="">All Sentiment</option>
            <option value="">All Sentiment</option>
          </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Themes</option>
            <option value="">All Themes</option>
            <option value="">All Themes</option>
          </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Locations</option>
            <option value="">All Locations</option>
            <option value="">All Locations</option>
          </select>
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1">
          <CalendarDays className="text-white w-4" />
          <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">Day 1 (May 10 2026)</option>
            <option value="">Day 2 (May 11 2026)</option>
          </select>
        </div>
      </div>

      <MentionsChart />

      <section className="grid grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-5 ">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            SENTIMENT BREAKDOWN
          </h4>
          <DonutChart
            small
            data={[
              { label: "Positive", value: 2998, color: "#CB3CFF" },
              { label: "Neutral", value: 538, color: "#13A13E" },
              { label: "Negative", value: 306, color: "#F66202" },
            ]}
          />
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7">
          <h4 className="font-dmSans text-white font-medium text-base uppercase">
            SESSION SENTIMENT SCORES
          </h4>

          <div className="flex flex-col gap-4">
            {sectorOne.map(({ icon, percent }, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-10 place-content-between"
              >
                <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center col-span-2">
                  {icon}
                </div>
                <div className="col-span-7 flex items-center">
                  <div
                    className={`rounded-full h-2.5 ${
                      sectorOne.length - 1 === i
                        ? "bg-red"
                        : sectorOne.length - 2 === i
                          ? "bg-red"
                          : "bg-green"
                    }`}
                    style={{ width: `${(percent * 100) / 100}%` }}
                  ></div>
                </div>
                <p className="col-span-2 text-white font-dmSans text-sm flex items-center justify-center">
                  {percent}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white/55 font-medium uppercase text-base font-lexend">
              LATEST ADDITIONS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all themes
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {additions.map(({ title, value }) => (
              <div
                key={title}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center text-white/55 font-lexend text-sm">
                  <CircleCheck className="fill-green text-black " /> {title}
                </div>
                <div className="text-white/55 font-lexend text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              TRENDING HASHTAGS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all hashtags
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {hashtags.map(({ title, value }) => (
              <div
                key={title}
                className="flex items-center justify-between gap-3"
              >
                <div className=" text-white font-lexend text-sm"> {title}</div>
                <div className="text-white font-lexend text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default SocialmediaFeed;
