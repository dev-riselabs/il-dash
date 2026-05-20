
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
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          REAL-TIME INTELLIGENCE DASHBOARD [IL-DASH]
        </h1>
        <p className="text-white font-lexend font-light text-xs">Overview.</p>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-3">
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
          <div className="flex flex-col gap-4 justify-center px-5 py-3 w-3/5">
            <p className="text-white font-lexend text-xs sm:text-base">
              Lagos is not just the future of Africa—it is the blueprint for
              sustainable urbanization globally.
            </p>
            <div className="">
              <p className="text-white font-lexend text-[10px] sm:text-sm text-right">
                Babajide Olusola Sanwo-Olu
              </p>
              <p className="text-white font-lexend text-[8px] sm:text-[10px] text-right">
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
            <h2 className="text-sm sm:text-base font-light tracking-widest text-white font-lexend uppercase">
              Live Programme Flow
            </h2>
            <div className="border-l-4 border-l-cyan py-6 pr-2 pl-7 flex flex-col gap-4">
              <h3 className="font-lexend text-base font-medium text-cyan pl-8">
                CURRENT SESSION
              </h3>
              <div className="overflow-y-auto h-100 pl-4">
              <div className="flex flex-col pl-6 gap-6 border-l-2 border-l-white/55 relative ">
                <div  className="flex justify-between items-center gap-3 p-4 border border-white/31 rounded-lg after:content-['1'] after:absolute after:bg-red after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-4">
                  <div className="flex flex-col gap-3">
                    <span className="font-lexend text-white text-xs font-light">
                      11:00 AM - 12:30 PM
                    </span>
                    <h5 className="font-lexend text-white text-xs font-semibold">
                      Lagos - Africa’s Global Gateway
                    </h5>
                    <p className="font-lexend text-white text-[10px] font-medium">
                      Shaping Africa’s Digital Future
                    </p>
                  </div>
                  <div className="flex items-center gap-1 border-red border rounded-md py-1.5 px-2 uppercase text-xs text-red">
                    <div className="w-1.5 h-1.5 rounded-full bg-red"></div>
                    live
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-lexend text-base font-medium text-yellow pl-4">
                    NEXT SESSION
                  </h3>
                  <div className="flex flex-col gap-2 relative">
                    {[
                      {
                        time: "1:00 PM - 02:30 PM",
                        title: "The Future of Technology...",
                        description: "Building Sustainable Cities",
                      },
                      {
                        time: "03:00 PM - 04:30 PM",
                        title: "Creative Economy Dialogue",
                        description: "Unlocking Africa’s Creative Potential",
                      },
                    ].map(({ time, description, title }, i) => (
                      <div key={i} style={{ "--step": `"${i + 2}"` } as React.CSSProperties} className="flex justify-between items-center gap-3 p-4 border border-white/31 rounded-lg after:content-(--step) after:absolute after:bg-yellow after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-10">
                        <div className="flex flex-col gap-3">
                          <span className="font-lexend text-white text-xs font-light">
                            {time}
                          </span>
                          <h5 className="font-lexend text-white text-xs font-semibold">
                            {title}
                          </h5>
                          <p className="font-lexend text-white text-[10px] font-medium">
                            {description}
                          </p>
                        </div>
                        <div className=" uppercase text-xs text-yellow font-semibold">
                          up next
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="border border-white/35 py-4 px-6 overflow-y-auto h-60">
              <div className="border-l-2 border-l-white/55 pl-5 flex flex-col gap-2 relative">
              {[
                      {
                        time: "1:00 PM - 02:30 PM",
                        title: "The Future of Technology...",
                        description: "Building Sustainable Cities",
                      },
                      {
                        time: "03:00 PM - 04:30 PM",
                        title: "Creative Economy Dialogue",
                        description: "Unlocking Africa’s Creative Potential",
                      },
                      {
                        time: "03:00 PM - 04:30 PM",
                        title: "Creative Economy Dialogue",
                        description: "Unlocking Africa’s Creative Potential",
                      },
                      {
                        time: "03:00 PM - 04:30 PM",
                        title: "Creative Economy Dialogue",
                        description: "Unlocking Africa’s Creative Potential",
                      },
                    ].map(({ time, description, title }, i) => (
                      <div key={i} style={{ "--step": `"${i + 1}"` } as React.CSSProperties} className="flex justify-between items-center gap-3 p-4 border border-white/31 rounded-lg after:content-(--step) after:absolute after:bg-green after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-5">
                        <div className="flex flex-col gap-3">
                          <span className="font-lexend text-white text-xs font-light">
                            {time}
                          </span>
                          <h5 className="font-lexend text-white text-xs font-semibold">
                            {title}
                          </h5>
                          <p className="font-lexend text-white text-[10px] font-medium">
                            {description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className=" uppercase text-xs text-green font-semibold">
                          completed
                        </div>
                        <Link to='/feedback-form' className="text-white bg-red100 px-1.5 py-1.5 rounded-md text-xs font-semibold">Give Feedback</Link>

                        </div>
                        
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live session intelligence */}
        <section className="flex flex-col gap-10 lg:col-span-7">
          <div className="border border-white/55 rounded-2xl flex flex-col gap-5 p-4 lg:py-5 lg:px-7.5">
            <div className="flex flex-col gap-3 font-lexend">
              <h2 className="text-xs sm:text-sm font-light tracking-widest text-cyan uppercase">
                Live Session Intelligence
              </h2>
              <h3 className="text-lg sm:text-3xl font-semibold text-white">
                Plenary: Lagos &mdash; Africa's Global Gateway
              </h3>
              <div className="text-sm sm:text-base text-cyan font-light">
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
                  <p className="text-sm sm:text-base text-white font-lexend">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border border-white/55 rounded-2xl flex flex-col gap-5 sm:gap-10 p-4 lg:py-5 lg:px-7.5">
            <p className="text-sm sm:text-lg font-lexend text-white leading-relaxed">
              "Lagos is not just keeping up with the future, we are building it
              for Africa and the world."
            </p>
            <footer className="text-xs text-white font-dmSans flex flex-col gap-1">
              <strong className="text-cyan text-sm sm:text-base">
                Dr. Bosun Tijani
              </strong>{" "}
              Minister, Communications, Innovation & Digital Economy
            </footer>
          </blockquote>
        </section>
      </section>
      <section className="border border-white/55 rounded-2xl p-4 sm:p-7.5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="flex flex-col gap-2 lg:col-span-3 justify-center">
          {[
            "Commitment to establish a Lagos AI innovation Hub by Q1 2026.",
            "Partnership discussion between fintech leaders and government on regulatory sandbox expansion.",
            "₦1BN investment interest recorded in Lagos tech ecosystem.",
            "Capacity building program for 500,000 young tech talents.",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CircleCheck color="green" width={"18px"} className="shrink-0" />
              <span className="text-white text-xs sm:text-sm font-lexend">
                {item}
              </span>
            </div>
          ))}
        </div>
        <img
          src="/target.png"
          alt=""
          className="self-end lg:col-span-1 h-20 sm:h-auto"
        />
      </section>
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-5 px-4 sm:px-7.5 rounded-4xl border border-white/55  gap-2">
        <p className="text-cyan font-dmSans flex items-center gap-2 uppercase text-xs">
          <Volume2 /> LIVE RESOLUTION TICKER
        </p>
        <p className="text-white font-dmSans text-xs">
          ₦1BN investment interest recorded in Lagos tech ecosystem....
        </p>
        <p className="text-white flex items-center gap-1 text-xs">
          <CircleSmall className="fill-cyan text-cyan w-3" /> Partnership
          discussion between Flutterwave & Lagos State...
        </p>
        <p className="text-cyan uppercase text-xs flex items-center gap-1">
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
                <span className="font-dmSans font-medium text-base sm:text-lg text-white">
                  AUDIENCE FEEDBACK
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="font-dmSans font-medium text-white uppercase text-sm sm:text-base">
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
            <Link
              to={`/feedback`}
              className="border cursor-pointer border-white rounded-lg flex justify-center items-center text-white font-medium text-base font-rubik py-2.5 "
            >
              VIEW ALL FEEDBACK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
