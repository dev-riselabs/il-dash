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
import {
  useCurrentLivePoll,
  useLiveSession,
  useOverviewKpis,
  useProgrammeFlow,
  useResolutionsTicker,
  useTopFeedback,
} from "@/lib/api/hooks";
import { fmtNumber, fmtRange, fullName } from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";

const KPI_TONE = ["text-cyan", "text-green", "text-orange", "text-white"];

export default function Overview() {
  const kpisQ = useOverviewKpis();
  const flowQ = useProgrammeFlow();
  const liveQ = useLiveSession();
  const tickerQ = useResolutionsTicker(8);
  const topFeedbackQ = useTopFeedback(5);
  const pollQ = useCurrentLivePoll();

  const kpis = [
    {
      label: "Total Attendance",
      value: kpisQ.data?.total_attendance,
      delta: "Live",
    },
    {
      label: "Number of Speakers",
      value: kpisQ.data?.speakers_count,
      delta: "Registered",
    },
    {
      label: "Active Deals",
      value: kpisQ.data?.active_deals,
      delta: "In motion",
    },
    {
      label: "Resolutions Today",
      value: kpisQ.data?.resolutions_today,
      delta: "Today",
    },
  ];

  const liveSession = flowQ.data?.live?.[0] ?? null;
  const nextSessions = flowQ.data?.upcoming ?? [];
  const completedSessions = flowQ.data?.completed ?? [];
  const tickerItems = tickerQ.data ?? [];
  const liveSessionDetail = liveQ.data?.session ?? null;
  const liveInsights = (liveSessionDetail?.insights ?? []).slice(0, 4);
  const headlineQuote = (liveSessionDetail?.quotes ?? [])[0] ?? null;
  const headlineResolutions = (liveSessionDetail?.resolutions ?? []).slice(
    0,
    4,
  );

  console.log(headlineQuote);

  const poll = pollQ.data?.poll ?? null;
  const tally = pollQ.data?.tally ?? {};
  const pollTotal = Object.values(tally).reduce((a, b) => a + (b as number), 0);


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          REAL-TIME INTELLIGENCE DASHBOARD [IL-DASH]
        </h1>
        {/* <p className="text-white font-lexend font-light text-xs">Overview.</p> */}
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${KPI_TONE[idx]}`}
                  >
                    {kpisQ.isLoading ? "…" : fmtNumber(value ?? null)}
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
              {/* {headlineQuote
                ? `"${headlineQuote?.quote_text}"`
                : "Lagos is not just the future of Africa—it is the blueprint for sustainable urbanization globally."} */}
              
                "The story of Lagos is a story of ambition, resilience, and execution. We invite the world to invest, innovate, and grow with us."
            </p>
            <div className="">
              <p className="text-white font-lexend text-[10px] sm:text-sm text-right">
                {/* {fullName(headlineQuote?.speaker) ||
                  "Babajide Olusola Sanwo-Olu"} */}
                  "Mr. Babajide Olusola Sanwo-Olu"
              </p>
              <p className="text-white font-lexend text-[8px] sm:text-[10px] text-right">
                  "Executive Governor, Lagos State"
                {/* {headlineQuote?.speaker?.job_title ??
                  "Executive Governor, Lagos State"} */}
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
          <h2 className="text-sm sm:text-base font-light tracking-widest text-white font-lexend uppercase">
            Live Programme Flow
          </h2>
          <QueryState
            isLoading={flowQ.isLoading}
            isError={flowQ.isError}
            error={flowQ.error}
            isEmpty={
              !liveSession &&
              nextSessions.length === 0 &&
              completedSessions.length === 0
            }
            emptyLabel="No sessions scheduled yet."
          >
            <div className="border-l-4 border-l-cyan py-6 pr-2 pl-3 flex flex-col gap-4">
              <h3 className="font-lexend text-base font-medium text-cyan pl-8">
                CURRENT SESSION
              </h3>
              <div className="overflow-y-auto h-80 pl-4">
                <div className="flex flex-col pl-6 gap-6 border-l-2 border-l-white/55 relative ">
                  {liveSession ? (
                    <div className="flex justify-between items-center gap-3 p-4 border border-white/31 rounded-lg after:content-['1'] after:absolute after:bg-red after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-4">
                      <div className="flex flex-col gap-3">
                        <span className="font-lexend text-white text-xs font-light">
                          {fmtRange(liveSession.starts_at, liveSession.ends_at)}
                        </span>
                        <h5 className="font-lexend text-white text-xs font-semibold">
                          {liveSession.title}
                        </h5>
                        <p className="font-lexend text-white text-[10px] font-medium">
                          {liveSession.description ??
                            liveSession.venue?.name ??
                            ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 border-red border rounded-md py-1.5 px-2 uppercase text-xs text-red">
                        <div className="w-1.5 h-1.5 rounded-full bg-red" />
                        live
                      </div>
                    </div>
                  ) : (
                    <div className="text-white/60 text-xs font-lexend">
                      No session is live right now.
                    </div>
                  )}

                  <h3 className="font-lexend text-base font-medium text-yellow pl-4 mt-4">
                    NEXT SESSIONS
                  </h3>
                  <div className="flex flex-col gap-2">
                    {nextSessions.map((s, i) => (
                      <div
                        key={s.id}
                        style={
                          { "--step": `"${i + 2}"` } as React.CSSProperties
                        }
                        className="flex justify-between items-center gap-3 p-4 border border-white/31 rounded-lg after:content-(--step) after:absolute after:bg-yellow after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-4"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="font-lexend text-white text-xs font-light">
                            {fmtRange(s.starts_at, s.ends_at)}
                          </span>
                          <h5 className="font-lexend text-white text-xs font-semibold">
                            {s.title}
                          </h5>
                          <p className="font-lexend text-white text-[10px] font-medium">
                            {s.description ?? s.venue?.name ?? ""}
                          </p>
                        </div>
                        <div className="uppercase text-xs text-yellow font-semibold">
                          up next
                        </div>
                      </div>
                    ))}
                    {nextSessions.length === 0 && (
                      <div className="text-white/60 text-xs font-lexend">
                        No upcoming sessions queued.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-white/35 py-4 px-3 mt-2">
              <div className="overflow-y-auto h-50 pl-4">
                <div className="flex flex-col gap-2 relative border-l border-l-white/55 pl-6 ">
                  {completedSessions.map((s, i) => (
                    <div
                      key={s.id}
                      style={{ "--step": `"${i + 1}"` } as React.CSSProperties}
                      className={`flex justify-between items-center gap-2 p-4 border border-white/31 rounded-lg after:content-(--step) after:absolute after:bg-green after:text-sm after:flex after:justify-center after:items-center after:w-8.5 after:h-8.5 after:rounded-full after:text-white after:z-5 after:-left-4`}
                    >
                      <div className="flex flex-col gap-3">
                        <span className="font-lexend text-white text-xs font-light">
                          {fmtRange(s.starts_at, s.ends_at)}
                        </span>
                        <h5 className="font-lexend text-white text-xs font-semibold">
                          {s.title}
                        </h5>
                        <p className="font-lexend text-white text-[10px] font-medium">
                          {s.description ?? s.venue?.name ?? ""}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className=" uppercase text-xs text-green font-semibold">
                          completed
                        </div>
                        <Link
                          to="/feedback-form"
                          className="text-red100 uppercase  rounded-md text-xs font-semibold"
                        >
                          Give Feedback
                        </Link>
                      </div>
                    </div>
                  ))}
                  {completedSessions.length === 0 && (
                    <div className="text-white/60 text-xs font-lexend">
                      No completed sessions yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </QueryState>
        </section>

        <section className="flex flex-col gap-10 lg:col-span-7">
          <div className="border border-white/55 rounded-2xl flex flex-col gap-5 p-4 lg:py-5 lg:px-7.5">
            <div className="flex flex-col gap-3 font-lexend">
              <h2 className="text-xs sm:text-sm font-light tracking-widest text-cyan uppercase">
                Live Session Intelligence
              </h2>
              <h3 className="text-lg sm:text-3xl font-semibold text-white">
                {liveSessionDetail?.title ?? "Awaiting live session"}
              </h3>
              <div className="text-sm sm:text-base text-cyan font-light">
                {liveSessionDetail?.speakers &&
                liveSessionDetail.speakers.length > 0
                  ? `Keynote — ${fullName(liveSessionDetail.speakers[0])}`
                  : (liveSessionDetail?.description ??
                    "Stand by — no session is live yet.")}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="text-base font-medium tracking-widest text-green uppercase">
                Key Insights
              </div>
              <QueryState
                isLoading={liveQ.isLoading}
                isEmpty={liveInsights.length === 0}
                emptyLabel="Insights will appear here once the session begins."
              >
                {liveInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                      <Sparkles color="white" width={"20px"} />
                    </div>
                    <p className="text-sm sm:text-base text-white font-lexend">
                      {insight.body}
                    </p>
                  </div>
                ))}
              </QueryState>
            </div>
          </div>
          <blockquote className="border border-white/55 rounded-2xl flex flex-col gap-5 sm:gap-10 p-4 lg:py-5 lg:px-7.5">
            <p className="text-sm sm:text-lg font-lexend text-white leading-relaxed">
              {headlineQuote
                ? `"${headlineQuote?.quote_text}"`
                : '"Lagos is not just keeping up with the future, we are building it for Africa and the world."'}
            </p>
            <footer className="text-xs text-white font-dmSans flex flex-col gap-1">
              <strong className="text-cyan text-sm sm:text-base">
                {fullName(headlineQuote?.speaker) || "Mr. Taiwo Oyedele"}
                {/* {fullName(headlineQuote?.speaker) || "Dr. Bosun Tijani"} */}
              </strong>{" "}
              {headlineQuote?.speaker?.job_title ??
                "Minister of Finance, Coordinating Minister of the Economy for the Federal Republic of Nigeria"}
            </footer>
          </blockquote>
        </section>
      </section>

      <section className="border border-white/55 rounded-2xl p-4 sm:p-7.5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="flex flex-col gap-2 lg:col-span-3 justify-center">
          <QueryState
            isLoading={liveQ.isLoading}
            isEmpty={headlineResolutions.length === 0}
            emptyLabel="No commitments captured from the live session yet."
          >
            {headlineResolutions.map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <CircleCheck
                  color="green"
                  width={"18px"}
                  className="shrink-0"
                />
                <span className="text-white text-xs sm:text-sm font-lexend">
                  {r.title}
                </span>
              </div>
            ))}
          </QueryState>
        </div>
        <img
          src="/target.png"
          alt=""
          className="self-end lg:col-span-1 h-20 sm:h-auto"
        />
      </section>

      <section className="grid grid-cols-1 py-5 px-4 sm:px-7.5 rounded-4xl border border-white/55 lg:grid-cols-10 gap-2">
        <p className="text-cyan font-dmSans flex items-center gap-2 uppercase text-xs lg:col-span-2">
          <Volume2 /> LIVE RESOLUTION TICKER
        </p>
        <p className="text-white font-dmSans text-[10px] lg:col-span-3">
          {tickerItems[0]?.title ?? "Awaiting first resolution of the day…"}
        </p>
        <p className="text-white flex items-center gap-1 lg:col-span-3 text-[10px]">
          <CircleSmall className="fill-cyan text-cyan w-3" />{" "}
          {tickerItems[1]?.title ?? "More updates coming through the day."}
        </p>
        <Link
          to="/resolutions"
          className="text-cyan uppercase text-xs flex items-center gap-1 lg:col-span-2"
        >
          <CircleSmall className="fill-cyan text-cyan w-3" />
          VIEW ALL UPDATES <ChevronRight className="w-4" />
        </Link>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 lg:col-span-5 flex flex-col gap-8">
          <div className="border-b border-b-white/55 pb-7 flex flex-col gap-6">
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
                  {poll?.question ?? "No live poll is open right now."}
                </h6>
              </div>
            </div>
            <QueryState isLoading={pollQ.isLoading} isEmpty={!poll}>
              <div className="flex flex-col gap-4">
                {(poll?.options ?? Object.keys(tally)).map((option) => {
                  const count = (tally[option] as number) ?? 0;
                  const pct =
                    pollTotal > 0 ? Math.round((count / pollTotal) * 100) : 0;
                  const colour = option.toLowerCase().includes("excellent")
                    ? "bg-green"
                    : option.toLowerCase().includes("good")
                      ? "bg-yellow"
                      : option.toLowerCase().includes("average")
                        ? "bg-orange"
                        : "bg-red";
                  return (
                    <div key={option} className="grid grid-cols-12">
                      <p className="text-white font-dmSans text-sm col-span-3">
                        {option}
                      </p>
                      <div className="col-span-8">
                        <div
                          className={`h-5 ${colour}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-white font-dmSans text-sm col-span-1">
                        {pct}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </QueryState>
          </div>
          <p className="text-white font-medium text-base">
            Total Votes: {fmtNumber(pollTotal)}
          </p>
        </div>

        <div className="lg:col-span-7 border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 flex flex-col gap-3">
          <h4 className="text-green font-lexend font-medium text-base">
            TOP FEEDBACK
          </h4>
          <div className="flex flex-col gap-7">
            <QueryState
              isLoading={topFeedbackQ.isLoading}
              isEmpty={(topFeedbackQ.data ?? []).length === 0}
              emptyLabel="No feedback captured yet."
            >
              <div className="flex flex-col gap-6">
                {(topFeedbackQ.data ?? []).map((fb) => (
                  <div key={fb.id} className="flex items-center gap-3">
                    <img src="/quote.png" alt="" />
                    <p className="font-lexend text-white text-sm">
                      “{fb.review_text ?? fb.key_takeaway ?? "Great session."}”
                    </p>
                  </div>
                ))}
              </div>
            </QueryState>
            <Link
              to="/feedback"
              className="border cursor-pointer border-white rounded-lg flex justify-center items-center text-white font-medium text-base font-rubik py-2.5"
            >
              VIEW ALL FEEDBACK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
