import {
  BadgeCheck,
  ChartNoAxesColumn,
  CircleAlert,
  CircleArrowUp,
  ClipboardList,
  Download,
  Ellipsis,
  Heart,
  History,
  MessageCircle,
  NotepadText,
  Repeat2,
  ShieldCheck,
  Siren,
  TriangleAlert,
  Volume1,
} from "lucide-react";

const kpis = [
  { label: "Total Attendance", value: "2,842", delta: "vs Yesterday" },
  { label: "Sessions Today", value: "18", delta: "2 Live Now" },
  { label: "Deals in Motion", value: "47", delta: "8 New" },
  { label: "Active Alert", value: "6", delta: "6 New" },
  { label: "Commitments Made", value: "SECURE", delta: "All Clear" },
];

const seesionTracker = [
  {
    title: "Keynote Address",
    sector: "Opening Plenary",
    venue: "Main Hall",
    status: "LIVE",
    time: "10:00 AM - 11:00 AM",
    progress: "80%",
  },
  {
    title: "Investors Roundtable",
    sector: "Private Session",
    venue: "Main Hall",
    status: "DELAYED",
    time: "10:00 AM - 11:00 AM",
    progress: "20%",
  },
  {
    title: "Infastructure Panel",
    sector: "Transport & Logistics",
    venue: "Main Hall",
    status: "UPCOMING",
    time: "10:00 AM - 11:00 AM",
    progress: "0%",
  },
  {
    title: "Innovation Showcase",
    sector: "Startup & Tech",
    venue: "Main Hall",
    status: "UPCOMING",
    time: "10:00 AM - 11:00 AM",
    progress: "0%",
  },
  {
    title: "Healthcare Investment",
    sector: "Panel Discussion",
    venue: "Main Hall",
    status: "CANCELLED",
    time: "10:00 AM - 11:00 AM",
    progress: "0%",
  },
];

const alerts = [
  {
    name: "Speaker no-show: Mr. John Doe",
    sector: "Hall B Infrastructure Panel",
    time: "11:10 AM",
    status: "CRITICAL",
    icon: TriangleAlert,
  },
  {
    name: "Speaker no-show: Mr. John Doe",
    sector: "Hall B Infrastructure Panel",
    time: "11:10 AM",
    status: "WARNING",
    icon: TriangleAlert,
  },
  {
    name: "Speaker no-show: Mr. John Doe",
    sector: "Hall B Infrastructure Panel",
    time: "11:10 AM",
    status: "INFO",
    icon: CircleAlert,
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

const incidents = [
  {
    name: "Crowd congestion",
    venue: "Main Entrance",
    time: "11:00 AM",
    progress: "Responding",
  },
  {
    name: "Access control issue",
    venue: "Hall B",
    time: "11:10 AM",
    progress: "Responding",
  },
  {
    name: "Medical assistance",
    venue: "VIP Lounge",
    time: "10:58 AM",
    progress: "Resolved",
  },
];

const actions = [
  {
    name: "Broadcast Announcement",
    action: "Send message to all attendee",
    label: "Positive",
    icon: Volume1,
  },
  {
    name: "Alert Security Team",
    action: "Send urgent notification",
    label: "Positive",
    icon: Siren,
  },
  {
    name: "Update Session Status",
    action: "Modify session information",
    label: "Positive",
    icon: History,
  },
  {
    name: "Add Command Note",
    action: "Add operational note",
    label: "Positive",
    icon: NotepadText,
  },
  {
    name: "Generate Situation Report",
    action: "Download current report",
    label: "Positive",
    icon: ClipboardList,
  },
];

function CommandCenter() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          COMMAND CENTRE
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time monitoring and Operational Control{" "}
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

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            SESSION TRACKER
          </h4>
          <button className="text-cyan font-semibold font-lexend text-base">
            View all schedule
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h5 className="text-white font-semibold text-base font-dmSans flex-2">
              SESSION / TRACK
            </h5>
            <h5 className="text-white font-semibold text-base font-dmSans flex-1">
              VENUE
            </h5>
            <h5 className="text-white font-semibold text-base font-dmSans flex-1">
              STATUS
            </h5>
            <h5 className="text-white font-semibold text-base font-dmSans flex-1">
              TIME
            </h5>
            <h5 className="text-white font-semibold text-base font-dmSans flex-1">
              PROGRESS
            </h5>
          </div>

          <div className="flex flex-col gap-4">
            {seesionTracker.map(
              ({ title, sector, time, venue, status, progress }, i) => (
                <div
                  key={title}
                  className={`
                py-2 px-5 flex items-center justify-between ${
                  i % 2 === 0 ? "border border-white/55 rounded-2xl" : ""
                }
                `}
                >
                  <div className="flex flex-col gap-1.5 flex-2">
                    <h6 className="text-white font-semibold text-sm font-dmSans">
                      {title}
                    </h6>
                    <span className="text-white font-light text-xs font-dmSans">
                      {sector}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm font-dmSans flex-1">
                    {venue}
                  </p>
                  <div className="flex items-center gap-1 flex-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        status === "LIVE"
                          ? "bg-green100"
                          : status === "DELAYED"
                            ? "bg-yellow500"
                            : status === "UPCOMING"
                              ? "bg-white"
                              : status === "CANCELLED"
                                ? "bg-red"
                                : ""
                      }`}
                    ></div>
                    <span
                      className={`text-[10px] font-dmSans ${
                        status === "LIVE"
                          ? "text-green100"
                          : status === "DELAYED"
                            ? "text-yellow500"
                            : status === "UPCOMING"
                              ? "text-white"
                              : status === "CANCELLED"
                                ? "text-red"
                                : ""
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm font-dmSans flex-1">
                    {time}
                  </p>
                  <p className="text-white font-semibold text-sm font-dmSans flex-1 text-center">
                    {progress}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-11 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              ALERTS & NOTIFICATIONS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all alerts
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {alerts.map(({ name, sector, time, status, icon: Icon }) => (
              <div
                key={name}
                className={`border border-l-4 border-white/55 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 ${
                  status === "CRITICAL"
                    ? "border-l-red"
                    : status === "INFO"
                      ? "border-l-blue"
                      : "border-l-yellow"
                }
                `}
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={` w-25 px-3 py-2 rounded-md text-[10px] font-dmSans font-medium flex items-center justify-center
                        ${
                          status === "CRITICAL"
                            ? "bg-red200 text-red"
                            : status === "INFO"
                              ? "bg-blue600 text-blue700"
                              : "bg-brown300 text-yellow500"
                        }
                            `}
                  >
                    {status}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-dmSans text-white font-semibold">
                      {name}
                    </h6>
                    <span className="text-xs font-dmSans text-white font-light">
                      {sector}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-xs font-dmSans text-white font-light">
                    {time}
                  </p>
                  <Icon
                    className={`w-10 h-10 ${
                      status === "CRITICAL"
                        ? "fill-red"
                        : status === "INFO"
                          ? "fill-blue"
                          : "fill-yellow"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-6">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            SECURITY OVERVIEW
          </h4>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 items-center">
              <h5 className="text-white font-lexend text-sm font-light">
                VENUE STATUS
              </h5>
              <div className="flex items-center gap-2">
                <ShieldCheck className="fill-green w-30 h-30" />
                <div className="flex flex-col gap-1.5">
                  <h6 className="text-white font-dmSans font-semibold text-2xl ">
                    SECURE
                  </h6>
                  <span className="text-white font-dmSans font-light text-xs ">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 divide-y divide-white/55">
              <div className="flex items-center gap-4 pb-5">
                <div className="flex flex-col gap-2">
                  <span className="text-white font-light font-lexend text-sm">
                    SECURITY PERSONNEL
                  </span>
                  <span className="text-green font-semibold font-lexend text-2xl">
                    128
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    On Duty
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-light font-lexend text-sm">
                    INCIDENTS TODAY
                  </span>
                  <span className="text-green font-semibold font-lexend text-2xl">
                    2
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    Resolved
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-light font-lexend text-sm">
                    RESPONSE TIME
                  </span>
                  <span className="text-green font-semibold font-lexend text-2xl">
                    2m 15s
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    Avg. Time
                  </span>
                </div>
              </div>
              <SafetyLevel />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-base font-lexend">
              SECURITY INCIDENTS (LIVE)
            </h4>
            <button className="text-cyan font-semibold font-lexend text-base">
              View all incidents
            </button>
          </div>
          <div className="flex flex-col gap-7">
            <div className="border border-white/55 rounded-2xl h-50 "></div>
            <div className="flex flex-col gap-5 divide divide-white/55">
              <div className="flex items-center justify-between gap-4">
                <h5 className="text-base font-semibold text-white font-lexend uppercase">
                  Session/track
                </h5>
                <h5 className="text-base font-semibold text-white font-lexend uppercase">
                  Venue
                </h5>
                <h5 className="text-base font-semibold text-white font-lexend uppercase">
                  time
                </h5>
                <h5 className="text-base font-semibold text-white font-lexend uppercase">
                  progress
                </h5>
              </div>
              <div className="flex flex-col gap-4">
                {incidents.map(({ name, venue, time, progress }) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 justify-between"
                  >
                    <p className="text-sm font-semibold text-white font-dmSans flex-2">
                      {name}
                    </p>
                    <p className="text-sm font-semibold text-white font-dmSans flex-1">
                      {venue}
                    </p>
                    <p className="text-sm font-semibold text-white font-dmSans flex-1">
                      {time}
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <div
                        className={`border font-dmSans font-medium text-xs py-1.25 px-3.75 rounded-md ${
                          progress === "Responding"
                            ? " border-yellow200 bg-yellow100 text-yellow200"
                            : "border-green100 text-green100 bg-green550"
                        }`}
                      >
                        {progress}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
          <h4 className="text-white font-medium uppercase text-base font-lexend">
            QUICK ACTIONS
          </h4>
          <div className="flex flex-col gap-3.5">
            {
               actions.map(({icon: Icon}, i) => <div className="px-7.5 py-5 border border-white/55 rounded-2xl flex items-center justify-between gap-2">
                 <div className="flex items-center gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-md ${
                    i === 0 ? 'bg-blue' : 
                    i === 1 ? 'bg-purple300' :
                    i === 2 ? 'bg-orange' :
                    i === 3 ? 'bg-green100' :
                    ''

                  }`}><Icon className="text-white w-5"/></div>
                  <div className="flex flex-col gap-2">

                  </div>
                 </div>
                 <div></div>
               </div>)
            }</div>
        </div>
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

const SafetyLevel = () => {
  const progress = 18; // percentage position of circle

  return (
    <section className=" w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white uppercase text-xs font-light font-lexend tracking-wide">
          Safety Level
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green" />

          <span className="text-green font-semibold text-xs">LOW RISK</span>
        </div>
      </div>

      {/* Progress Wrapper */}
      <div className="relative">
        {/* Segments */}
        <div className="flex gap-1 h-2">
          <div className="flex-1 bg-[#3FC06A]" />
          <div className="flex-1 bg-[#DCA225]" />
          <div className="flex-1 bg-[#D55D22]" />
          <div className="flex-1 bg-[#8F231C]" />
        </div>

        {/* Indicator Circle */}
        <div
          className="absolute top-3 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow-md"
          style={{
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </section>
  );
};
export default CommandCenter;
