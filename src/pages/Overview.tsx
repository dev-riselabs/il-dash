import SessionTimeline from "@/components/SessionTimeline";
import {
  CircleArrowUp,
  Sparkles,
  CircleCheck,
  Volume2,
  CircleSmall,
  ChevronRight,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Total Attendance", value: "1,200", delta: "+4.5%" },
  { label: "Number of Speakers", value: "20", delta: "+4.5%" },
  { label: "Active Deals", value: "12", delta: "+8.0%" },
  { label: "Resolutions Today", value: "7", delta: "+12%" },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          REAL-TIME INTELLIGENCE DASHBOARD [IL-DASH]
        </h1>
        <p className="text-white font-lexend font-light text-xs">Overview.</p>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
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
        <div className="flex gap-4 items-center border border-white/30 rounded-xl overflow-hidden">
          <div className="flex flex-col gap-4 justify-center px-5 w-3/5">
            <p className="text-white font-lexend text-base">
              Lagos is not just the future of Africa—it is the blueprint for
              sustainable urbanization globally.
            </p>
            <div className="">
              <p className="text-white font-lexend text-sm text-right">
                Babajide Olusola Sanwo-Olu
              </p>
              <p className="text-white font-lexend text-[10px] text-right">
                Executive Governor, Lagos State
              </p>
            </div>
          </div>
          <img
            src="/Babajide-Sanwo-olu 2.png"
            alt=""
            className="w-2/5 h-full"
          />
        </div>
      </section>

      {/* Two-column main area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live programme flow */}
        <section className="border border-white/55 rounded-2xl p-4 lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-base font-light tracking-widest text-white font-lexend uppercase">
              Live Programme Flow
            </h2>
            <div className="border-l-4 border-l-cyan py-3 px-3">
              <SessionTimeline />
            </div>
            <div className="border border-white/35 py-4 px-6">
              <div className="flex items-center justify-between gap-4 border border-white/55 rounded-xl p-6">
                <div className="flex flex-col gap-3">
                  <span className="text-white font-lexend font-light text-xs">
                    1:00 PM - 02:30 PM
                  </span>
                  <h5 className="text-white font-lexend font-semibold text-xs truncate">
                    Infrastructure & Urban Growth
                  </h5>
                  <span className="text-white font-lexend font-medium text-[10px]">
                    Building Sustainable Cities
                  </span>
                </div>
                <p className="text-sm font-bold uppercase font-lexend text-green">
                  COMPLETED
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live session intelligence */}
        <section className="flex flex-col gap-10 lg:col-span-7">
          <div className="border border-white/55 rounded-2xl flex flex-col gap-5 p-4 lg:py-5 lg:px-7.5">
            <div className="flex flex-col gap-3 font-lexend">
              <h2 className="text-sm font-light tracking-widest text-cyan uppercase">
                Live Session Intelligence
              </h2>
              <h3 className="text-3xl font-semibold text-white">
                Plenary: Lagos &mdash; Africa's Global Gateway
              </h3>
              <div className="text-base text-cyan font-light">
                Keynote &mdash; Governor Sanwo-Olu
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-base font-medium tracking-widest text-green uppercase">
                Key Insights
              </div>
              {[
                "AI and automation are unlocking productivity across key African industries.",
                "Lagos is emerging as the preferred innovation and investment gateway in West Africa.",
                "Strategic partnerships and talent development are key to scaling digital solutions.",
                "Public-private partnerships will accelerate infrastructure delivery over the next decade.",
              ].map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>
                  <p className="text-base text-white font-lexend">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border border-white/55 rounded-2xl flex flex-col gap-10 p-4 lg:py-5 lg:px-7.5">
            <p className="text-lg font-lexend text-white leading-relaxed">
              "Lagos is not just keeping up with the future, we are building it
              for Africa and the world."
            </p>
            <footer className="mt-3 text-xs text-white font-dmSans flex flex-col gap-1">
              <strong className="text-cyan text-base">Dr. Bosun Tijani</strong>{" "}
              Minister, Communications, Innovation & Digital Economy
            </footer>
          </blockquote>
        </section>
      </section>
      <section className="border border-white/55 rounded-2xl p-7.5 grid grid-cols-1 lg:grid-cols-4">
        <div className="flex flex-col gap-2 lg:col-span-3 justify-center">
          {[
            "Commitment to establish a Lagos AI innovation Hub by Q1 2026.",
            "Partnership discussion between fintech leaders and government on regulatory sandbox expansion.",
            "₦1BN investment interest recorded in Lagos tech ecosystem.",
            "Capacity building program for 500,000 young tech talents.",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CircleCheck color="green" width={"18px"} />
              <span className="text-white text-sm font-lexend">{item}</span>
            </div>
          ))}
        </div>
        <img
          src="/target.png"
          alt=""
          className="self-end lg:col-span-1 lg:h-auto"
        />
      </section>
      <section className="grid grid-cols-1 py-5 px-7.5 rounded-4xl border border-white/55 lg:grid-cols-10 gap-2">
        <p className="text-cyan font-dmSans flex items-center gap-2 uppercase text-xs lg:col-span-2">
          <Volume2 /> LIVE RESOLUTION TICKER
        </p>
        <p className="text-white font-dmSans text-[10px] lg:col-span-3">
          ₦1BN investment interest recorded in Lagos tech ecosystem....
        </p>
        <p className="text-white flex items-center gap-1 lg:col-span-3 text-[10px]">
          <CircleSmall className="fill-cyan text-cyan w-3" /> Partnership
          discussion between Flutterwave & Lagos State...
        </p>
        <p className="text-cyan uppercase text-xs flex items-center gap-1 lg:col-span-2">
          <CircleSmall className="fill-cyan text-cyan w-3" />
          VIEW ALL UPDATES <ChevronRight className="w-4" />
        </p>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 lg:col-span-5 flex flex-col gap-8 ">
          <div className=" border-b border-b-white/55 pb-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <User className="w-6 fill-white text-white" />{" "}
                <span className="font-dmSans font-medium text-lg text-white">
                  AUDIENCE FEEDBACK
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="font-dmSans font-medium text-white uppercase text-base">
                  LIVE POLL
                </h5>
                <h6 className="font-dmSans font-medium text-white text-sm">
                  How impactful is this session?
                </h6>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Excellent",
                  score: 68,
                },
                {
                  title: "Good",
                  score: 24,
                },
                {
                  title: "Average",
                  score: 6,
                },
                {
                  title: "Not Good",
                  score: 2,
                },
              ].map(({ title, score }) => (
                <div key={title} className="grid grid-cols-12">
                  <p className="text-white font-dmSans text-sm col-span-3">
                    {title}
                  </p>
                  <div className="col-span-8">
                    <div
                      className={` h-5
                  ${
                    title === "Excellent"
                      ? "bg-green"
                      : title === "Good"
                        ? "bg-yellow"
                        : title === "Average"
                          ? "bg-orange"
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
              ))}
            </div>
          </div>
          <p className="text-white font-medium text-base">Total Votes: 1,000</p>
        </div>

        <div className="lg:col-span-7 border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 flex flex-col gap-3">
          <h4 className="text-green font-lexend font-medium text-base">
            TOP FEEDBACK
          </h4>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-6">
              {[
                "“Very insightful session with actionable takeaways.”",
                "“Great lineup of speakers and relevant discussions”.",
                "“Need more time for Q&A and deeper engagement”.",
                "“Excellent organization and flow!”.",
                "“Excellent organization and flow!”.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <img src="/quote.png" alt="" />
                  <p className="font-lexend text-white text-sm">{item}</p>
                </div>
              ))}
            </div>
            <Link to={`/feedback`} className="border cursor-pointer border-white rounded-lg text-white font-medium text-base font-rubik py-2.5 ">
              VIEW ALL FEEDBACK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
