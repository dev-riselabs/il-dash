import SessionTimeline from "@/components/SessionTimeline";
import { useEffect, useState } from "react";
import {
  CircleArrowUp,
  Sparkles,
  CircleCheck,
  Volume2,
  CircleSmall,
  ChevronRight,
  User,
} from "lucide-react";

interface DealEvent {
  timestamp: string;
  deal_name: string;
  investor_name: string;
  sector: string;
  deal_status: string;
  deal_value: number;
}

interface SessionData {
  Timestamp: string;
  session_name: string;
  speaker_name: string;
  "key_insight #1": string;
  "key_insight #2": string;
  "key_insight #3": string;
  key_quote: string;
  resolution: string;
  sector: string;
  sentiment: string;
}

interface AudienceFeedback {
  timestamp: string;
  session_name: string;
  session_rating: number;
  key_takeaway: string;
}

interface Speaker {
  timestamp: string;
  first_name: string;
  last_name: string;
  organization: string;
  job_title: string;
}

interface Attendee {
  timestamp: string;
  first_name: string;
  last_name: string;
  email_address: string;
}

interface SessionSchedule {
  timestamp: string;
  session_name: string;
  speaker_name: string;
  session_date: string;
  start_time: string;
  end_time: string;
}


const formatScheduleDateTime = (dateStr?: string) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return null;

  return {
    date: date.toLocaleDateString("en-NG", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export default function Overview() {
  const [deals, setDeals] = useState<DealEvent[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [feedbacks, setFeedbacks] = useState<AudienceFeedback[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [schedule, setSchedule] = useState<SessionSchedule[]>([]);
  const [loading, setLoading] = useState(false);

  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const safeFetch = async (url: string) => {
          try {
            const res = await fetch(url);

            // Handle non-200 responses
            if (!res.ok) {
              console.error("HTTP Error:", url, res.status);
              return { data: [], total_records: 0 };
            }

            const data = await res.json();

            return data;
          } catch (error) {
            console.error("Fetch Failed:", url, error);
            return { data: [], total_records: 0 };
          }
        };

        const [
          dealsRes,
          sessionsRes,
          feedbackRes,
          speakersRes,
          attendeesRes,
          scheduleRes,
        ] = await Promise.all([
          safeFetch(
            "/api?tab=Deal_Event"
          ),

          safeFetch(
            "/api?tab=Session"
          ),

          safeFetch(
            "/api?tab=Audience_Feedback"
          ),

          safeFetch(
            "/api?tab=Speaker"
          ),

          safeFetch(
            "/api?tab=Attendees"
          ),

          safeFetch(
            "/api?tab=Session_Schedule"
          ),
        ]);



        // console.log("Deals:", dealsRes);
        // console.log("Sessions:", sessionsRes);
        // console.log("Feedbacks:", feedbackRes);
        // console.log("Speakers:", speakersRes);
        // console.log("Attendees:", attendeesRes);
        // console.log("Schedule:", scheduleRes);



        setDeals(dealsRes.data || []);
        setSessions(sessionsRes.data || []);
        setFeedbacks(feedbackRes.data || []);
        setSpeakers(speakersRes.data || []);
        setAttendees(attendeesRes.data || []);
        setSchedule(scheduleRes.data || []);

        setTotalAttendees(attendeesRes.total_records || 0);
        setTotalSpeakers(speakersRes.total_records || 0);
        setTotalDeals(dealsRes.total_records || 0);
        setTotalSessions(sessionsRes.total_records || 0);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 10000);

    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      label: "Total Attendance",
      value: totalAttendees,
      delta: "+4.5%",
    },
    {
      label: "Number of Speakers",
      value: totalSpeakers,
      delta: "+4.5%",
    },
    {
      label: "Active Deals",
      value: totalDeals,
      delta: "+8.0%",
    },
    {
      label: "Sessions",
      value: totalSessions,
      delta: "+12%",
    },
  ];

  if (loading && !sessions.length) {
    return (
      <div className="text-white text-center py-20">
        Loading Dashboard...
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-2xl font-semibold font-lexend">
          REAL-TIME INTELLIGENCE DASHBOARD [IL-DASH]
        </h1>

        <p className="text-white font-lexend font-light text-xs">
          Overview.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    className={`text-3xl font-medium font-dmSans mt-2 tabular-nums ${idx === 0
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
                <CircleArrowUp color="white" width={"20px"} />
                {delta}
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

            <div>
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

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="border border-white/55 rounded-2xl p-4 lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-base font-light tracking-widest text-white font-lexend uppercase">
              Live Programme Flow
            </h2>

            <div className="border-l-4 border-l-cyan py-3 px-3">
              <SessionTimeline />
            </div>

            {schedule.slice(0, 1).map((item, index) => {
              const start = formatScheduleDateTime(item.start_time);
              const end = formatScheduleDateTime(item.end_time);

              return (
                <div key={index} className="border border-white/35 py-4 px-6">
                  <div className="flex items-center justify-between gap-4 border border-white/55 rounded-xl p-6">

                    <div className="flex flex-col gap-3">

                      {/* DATE + TIME RANGE */}
                      <span className="text-white font-lexend font-light text-xs">
                        {start && end
                          ? `${start.date} • ${start.time} - ${end.time}`
                          : `${item.start_time} - ${item.end_time}`}
                      </span>

                      {/* SESSION NAME */}
                      <h5 className="text-white font-lexend font-semibold text-xs truncate">
                        {item.session_name}
                      </h5>

                      {/* SPEAKER */}
                      <span className="text-white font-lexend font-medium text-[10px]">
                        {item.speaker_name}
                      </span>
                    </div>

                    <p className="text-sm font-bold uppercase font-lexend text-green">
                      LIVE
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-10 lg:col-span-7">
          <div className="border border-white/55 rounded-2xl flex flex-col gap-5 p-4 lg:py-5 lg:px-7.5">
            <div className="flex flex-col gap-3 font-lexend">
              <h2 className="text-sm font-light tracking-widest text-cyan uppercase">
                Live Session Intelligence
              </h2>

              <h3 className="text-3xl font-semibold text-white">
                {sessions[2]?.session_name}
              </h3>

              <div className="text-base text-cyan font-light">
                Keynote — {sessions[2]?.speaker_name}
              </div>
            </div>
        {
            <div className="mt-6 space-y-3">
              <div className="text-base font-medium tracking-widest text-green uppercase">
                Key Insights
              </div>

              {/* {sessions.slice(0, 4).map((session, i) => ( */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>

                  <p className="text-base text-white font-lexend">
                    {/* {sessions[2]["key_insight #1"]} */}
                  </p>
                </div>
                <div  className="flex items-start gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>

                  <p className="text-base text-white font-lexend">
                    {/* {sessions[2]["key_insight_#2"]} */}
                  </p>
                </div>
                <div  className="flex items-start gap-3">
                  <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles color="white" width={"20px"} />
                  </div>

                  <p className="text-base text-white font-lexend">
                    {/* {sessions[2]["key_insight_#3"]} */}
                  </p>
                </div>
              {/* ))} */}
            </div>
            }
          </div>

          <blockquote className="border border-white/55 rounded-2xl flex flex-col gap-10 p-4 lg:py-5 lg:px-7.5">
            <p className="text-lg font-lexend text-white leading-relaxed">
              "{sessions[0]?.key_quote}"
            </p>

            <footer className="mt-3 text-xs text-white font-dmSans flex flex-col gap-1">
              <strong className="text-cyan text-base">
                {sessions[0]?.speaker_name}
              </strong>
            </footer>
          </blockquote>
        </section>
      </section>

      <section className="border border-white/55 rounded-2xl p-7.5 grid grid-cols-1 lg:grid-cols-4">
        <div className="flex flex-col gap-2 lg:col-span-3 justify-center">
          {sessions.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CircleCheck color="green" width={"18px"} />

              <span className="text-white text-sm font-lexend">
                {item.resolution}
              </span>
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
          {deals[0]?.deal_name}
        </p>

        <p className="text-white flex items-center gap-1 lg:col-span-3 text-[10px]">
          <CircleSmall className="fill-cyan text-cyan w-3" />
          {deals[1]?.deal_name}
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
                <User className="w-6 fill-white text-white" />

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

                  <div className="col-span-7">
                    <div
                      className={` h-5
                  ${title === "Excellent"
                          ? "bg-green"
                          : title === "Good"
                            ? "bg-yellow"
                            : title === "Average"
                              ? "bg-orange"
                              : "bg-red"
                        }
                  `}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>

                  <p className="text-white font-dmSans text-sm col-span-2">
                    {score}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white font-medium text-base">
            Total Votes: {feedbacks.length}
          </p>
        </div>

        <div className="lg:col-span-7 border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 flex flex-col gap-3">
          <h4 className="text-green font-lexend font-medium text-base">
            TOP FEEDBACK
          </h4>

          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-6">
              {feedbacks.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img src="/quote.png" alt="" />

                  <p className="font-lexend text-white text-sm">
                    "{item.key_takeaway}"
                  </p>
                </div>
              ))}
            </div>

            <button className="border border-white rounded-lg text-white font-medium text-base font-rubik py-2.5 ">
              VIEW ALL FEEDBACK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}