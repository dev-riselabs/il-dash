import DonutChart from "@/components/Doughnut";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import {
  CircleArrowUp,
  House,
  Building2,
  Users,
  Ellipsis,
  BadgeCheck,
  MessageCircle,
  Repeat2,
  Heart,
  ChartNoAxesColumn,
  Download,
} from "lucide-react";

const kpis = [
  { label: "Total Attendance", value: "2,842", delta: "vs Yesterday" },
  { label: "Sessions Today", value: "18", delta: "2 Live Now" },
  { label: "Deals in Motion", value: "47", delta: "8 New" },
  { label: "Investment Signals", value: "32", delta: "6 New" },
  { label: "Commitments Made", value: "15", delta: "3 New" },
];

const insights = [
  {
    title: "Strong investor interest in Lagos tech ecosystem",
    sector: "Top sectors: AI, Fintech, Saas",
  },
  {
    title: "Infrastructure financing emerged as a key priority",
    sector: "Public-private partnerships highlighted",
  },
  {
    title: "Policy reforms and ease of doing business",
    sector: "Commitments received from state officials",
  },
  {
    title: "N50M+ in investment interest recorded",
    sector: "across multiple sectors",
  },
  {
    title: "Policy reforms and ease of doing business",
    sector: "Commitments received from state officials",
  },
  {
    title: "Infrastructure financing emerged as a key priority",
    sector: "Public-private partnerships highlighted",
  },
  {
    title: "Strong investor interest in Lagos tech ecosystem",
    sector: "Top sectors: AI, Fintech, Saas",
  },
];

const investment = [
  {
    title: "N50M investment Interest",
    sector: "Technology Sector",
    signal: "HIGH",
    time: "11:10 AM",
    icon: House,
  },
  {
    title: "Infrastructure Partnership",
    sector: "Public-Private Partnership",
    signal: "MEDIUM",
    time: "11:10 AM",
    icon: Building2,
  },
  {
    title: "Exploring Creative Economy Fund",
    sector: "Early Stage Interest",
    signal: "LOW",
    time: "11:10 AM",
    icon: Users,
  },
];

const deals = [
  {
    partner: "Global Tech Co.",
    sector: "Technology",
    label: "Negotiation",
    value: "₦25M",
  },
  {
    partner: "InfraCorp Ltd.",
    sector: "Infrastructure",
    label: "Negotiation",
    value: "₦15M",
  },
  {
    partner: "HealthPlus Africa",
    sector: "Healthcare",
    label: "Discussion",
    value: "₦8M",
  },
  {
    partner: "GreenPower Ltd.",
    sector: "Energy",
    label: "Commitment",
    value: "₦20M",
  },
  {
    partner: "AgriFuture Ltd.",
    sector: "Agriculture",
    label: "Discussion",
    value: "₦5M",
  },
];

const liveBoard = [
  { title: "Lagos State to establish Tech Innovation Fund", time: "11:15 AM" },
  { title: "Agreement to fast-track Blue Line Rail Project", time: "10:50 AM" },
  { title: "Healthcare Investment MoU signed", time: "10:30 AM" },
  { title: "Creative Economy Policy Review Initiated", time: "10:05 AM" },
  { title: "Renewable Energy Partnership Framework", time: "09:45 AM" },
];

const liveTracker = [
  {
    time: "10:00 AM",
    name: "Keynote Address",
    location: "Main Hall",
    label: "LIVE",
  },
  {
    time: "10:00 AM",
    name: "Investors Roundtable",
    location: "Hall A",
    label: "LIVE",
  },
  {
    time: "10:00 AM",
    name: "Infrastructure Panel",
    location: "Hall B",
    label: "DELAYED",
  },
  {
    time: "10:00 AM",
    name: "Innovation Showcase",
    location: "Hall C",
    label: "UPCOMING",
  },
  {
    time: "10:00 AM",
    name: "Deal Room Sessions",
    location: "Deal Room 1",
    label: "UPCOMING",
  },
];

const tweets = [
  {
    name: "TechCabal",
    username: "@TechCabal",
    img: "/techcabal.png",
    tweet:
      "Hug turnout at #InvestLagos3.0! Lagos is clearly open for business.",
    time: "1:27PM",
    createdAt: "Oct 4 2022",
    likes: "3,987",
    retweet: "5,579",
    comments: "1,240",
    impression: "1.1M",
  },
  {
    name: "Channels TV",
    username: "@channelstv",
    img: "/channels.png",
    tweet: "Invest Lagos 3.0 driving real conversations and real investments.",
    time: "1:27PM",
    createdAt: "Oct 4 2022",
    likes: "3,987",
    retweet: "5,579",
    comments: "1,240",
    impression: "1.1M",
  },
  {
    name: "BusinessDay NG",
    username: "@BusinessDayNg",
    img: "/businessday.png",
    tweet: "N50M+ investment interest recorded across key sectors.",
    time: "1:27PM",
    createdAt: "Oct 4 2022",
    likes: "3,987",
    retweet: "5,579",
    comments: "1,240",
    impression: "1.1M",
  },
];

function ExecutiveView() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          EXECUTIVE VIEW
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          View, track and manage all safety and security incidents in real time.
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

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              TOP INSIGHTS TODAY
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {insights.map(({ title, sector }) => (
              <div key={title} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan"></div>
                <div className="flex flex-col gap-1.5">
                  <h6 className="text-sm font-dmSans font-semibold text-white">
                    {title}
                  </h6>
                  <span className="text-xs font-dmSans font-light text-white/80">
                    {sector}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              TOP INVESTMENT SIGNALS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {investment.map(
              ({ title, sector, icon: Icon, time, signal }, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 justify-between py-4 px-5 border border-white rounded-2xl border-l-4 ${
                    signal.toLowerCase() === "high"
                      ? "border-l-red100"
                      : "border-l-yellow"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`rounded-md py-1.25 px-3.75 text-[10px] font-dmSans font-mediumn uppercase self-start ${
                        signal.toLowerCase() === "high"
                          ? "bg-red200 text-red100"
                          : "bg-brown100 text-yellow300"
                      }`}
                    >
                      {signal} signal
                    </div>
                    <div className="flex flex-col gap-2">
                      <h6 className="text-sm font-dmSans font-semibold text-white">
                        {title}
                      </h6>
                      <span className="text-xs font-dmSans font-light text-white">
                        {sector}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="text-white font-dmSans font-light text-xs">
                      {time}
                    </p>
                    <Icon className="text-white w-6" />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-7">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            DEALS IN MOTION
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 justify-between">
            <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
              PARTNER
            </h6>
            <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
              SECTOR
            </h6>
            <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
              SECTOR
            </h6>
            <h6 className="font-lexend font-bold text-sm text-slate100 flex-1">
              SECTOR
            </h6>
          </div>
          <div className="flex flex-col gap-4">
            {deals.map(({ partner, sector, label, value }, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 px-2 py-1 border border-white/40 rounded-2xl"
              >
                <div className="text-white font-dmSans font-semibold text-sm flex-1">
                  {partner}
                </div>
                <div className="text-white font-dmSans font-semibold text-sm text-left flex-1">
                  {sector}
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className={` border rounded py-2 px-5 text-xs ${
                      label === "Negotiation"
                        ? "border-yellow200 text-yellow200 bg-yellow100"
                        : label === "Discussion"
                          ? "border-blue400 bg-blue300 text-blue400"
                          : label === "Commitment"
                            ? "border-green250 text-green250 bg-green150"
                            : ""
                    }`}
                  >
                    {label}
                  </div>
                </div>
                <div className="text-white font-dmSans font-semibold text-sm text-left flex-1">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              LIVE PROGRAMME TRACKER
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View full schedule
            </button>
          </div>
          <div className="flex flex-col gap-10">
            {liveTracker.map(({ time, name, location, label }, i) => (
              <div key={i} className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green100"></div>
                  <span className="text-white font-dmSans text-sm font-semibold">
                    {time}
                  </span>
                </div>
                <p className="text-white font-dmSans text-sm font-semibold">
                  {name}
                </p>
                <p className="text-white font-dmSans text-sm font-semibold">
                  {location}
                </p>
                <div
                  className={`rounded-md border py-1.25 px-3.75 text-[10px] font-dmSans font-medium w-26 flex justify-center ${
                    label === "LIVE"
                      ? "text-green350 bg-green450 border-green350"
                      : label === "DELAYED"
                        ? "text-green350 bg-brown200 border-yellow400"
                        : "text-white border-slate400 bg-blue500"
                  }`}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              RESOLUTION BOARD (LIVE)
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {liveBoard.map(({ title, time }, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan"></div>
                <div className="flex flex-col gap-1.5">
                  <h6 className="text-sm font-dmSans font-semibold text-white">
                    {title}
                  </h6>
                  <span className="text-xs font-dmSans font-light text-white/80">
                    {time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              INVESTMENT HEATMAP
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all report
            </button>
          </div>
          <DonutChart
            data={[
              { label: "Infrastructure", value: 398, color: "#9747FF" },
              { label: "Technology", value: 348, color: "#13A13E" },
              { label: "Energy", value: 249, color: "#FF8D28" },
              { label: "Healthcare", value: 162, color: "#00C8B3" },
              { label: "Transportation", value: 88, color: "#B91293" },
              { label: "Other", value: 18, color: "#9A9DA6" },
            ]}
          />
        </div>
        <SentimentAnalysis />
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            SOCIAL MEDIA LIVE FEED
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {tweets.map(
            ({
              name,
              username,
              img,
              tweet,
              likes,
              retweet,
              impression,
              comments,
              time,
              createdAt,
            }) => (
              <div
                key={name}
                className="border border-white/55 rounded-2xl px-4 py-4 pb-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={img}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-white text-base font-bold font-inter">
                          {name}
                        </h5>
                        <BadgeCheck className="w-6 h-6 fill-blue" />
                      </div>

                      <h6 className="text-white text-xs font-inter">
                        {username}
                      </h6>
                    </div>
                  </div>
                  <button>
                    <Ellipsis className="text-white w-5" />
                  </button>
                </div>

                <p className="text-white text-sm font-inter font-light">
                  {tweet}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-inter font-light">
                    {time} .
                  </span>
                  <span className="text-white text-xs font-inter font-light">
                    {createdAt}.
                  </span>
                </div>
                <div className="w-full h-px bg-white/70"></div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-inter">
                      {comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-inter">
                      {retweet}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-inter">
                      {likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChartNoAxesColumn className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-inter">
                      {impression}
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-white" />
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </section>
  );
}

export default ExecutiveView;
