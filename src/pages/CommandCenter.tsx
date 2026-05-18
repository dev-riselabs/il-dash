// Wired Command Centre — live KPIs, sessions, alerts, incidents, social.
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
import {
  useAlerts,
  useCommandCenterKpis,
  useIncidents,
  useOverviewKpis,
  useProgrammeFlow,
  useSocialMentions,
} from "@/lib/api/hooks";
import {
  fmtCompact,
  fmtNumber,
  fmtRange,
  fmtRelative,
  fmtTime,
} from "@/lib/api/format";
import { QueryState } from "@/components/ui/QueryState";
import type {
  AlertSeverity,
  EventSession,
  IncidentSeverity,
  SessionStatus,
} from "@/lib/api/types";

const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  upcoming: "UPCOMING",
  next: "NEXT",
  live: "LIVE",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
  delayed: "DELAYED",
};
const SESSION_DOT: Record<SessionStatus, string> = {
  upcoming: "bg-white",
  next: "bg-cyan",
  live: "bg-green100",
  completed: "bg-green",
  cancelled: "bg-red",
  delayed: "bg-yellow500",
};
const SESSION_TEXT: Record<SessionStatus, string> = {
  upcoming: "text-white",
  next: "text-cyan",
  live: "text-green100",
  completed: "text-green",
  cancelled: "text-red",
  delayed: "text-yellow500",
};

const ALERT_TONE_LABEL: Record<AlertSeverity, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  warning: "WARNING",
  medium: "MEDIUM",
  low: "LOW",
  info: "INFO",
};
const ALERT_BORDER: Record<AlertSeverity, string> = {
  critical: "border-l-red",
  high: "border-l-red",
  warning: "border-l-yellow",
  medium: "border-l-yellow",
  low: "border-l-yellow",
  info: "border-l-blue",
};
const ALERT_PILL: Record<AlertSeverity, string> = {
  critical: "bg-red200 text-red",
  high: "bg-red200 text-red",
  warning: "bg-brown300 text-yellow500",
  medium: "bg-brown300 text-yellow500",
  low: "bg-brown300 text-yellow500",
  info: "bg-blue600 text-blue700",
};
const ALERT_ICON_FILL: Record<AlertSeverity, string> = {
  critical: "fill-red",
  high: "fill-red",
  warning: "fill-yellow",
  medium: "fill-yellow",
  low: "fill-yellow",
  info: "fill-blue",
};

const SAFETY_TONE: Record<string, { dot: string; text: string; label: string }> = {
  low: { dot: "bg-green", text: "text-green", label: "LOW RISK" },
  medium: { dot: "bg-yellow", text: "text-yellow", label: "MEDIUM RISK" },
  high: { dot: "bg-red", text: "text-red", label: "HIGH RISK" },
};

const SAFETY_POSITION: Record<string, number> = {
  low: 18,
  medium: 50,
  high: 82,
};

// Static placeholder until a Cameras endpoint is exposed by the backend.
const LIVE_FEEDS = [
  { img: "/feed1.jpg", venue: "Main hall", status: "live" },
  { img: "/feed2.jpg", venue: "Hall A", status: "live" },
  { img: "/feed3.jpg", venue: "Main hall", status: "live" },
  { img: "/feed4.jpg", venue: "Main hall", status: "live" },
  { img: "/feed5.jpg", venue: "Main hall", status: "delayed" },
  { img: "/feed6.jpg", venue: "Main hall", status: "delayed" },
  { img: "/feed7.jpg", venue: "Main hall", status: "live" },
  { img: "/feed8.jpg", venue: "Main hall", status: "delayed" },
];

const QUICK_ACTIONS = [
  {
    name: "Broadcast Announcement",
    action: "Send message to all attendees",
    label: "Ready",
    icon: Volume1,
  },
  {
    name: "Alert Security Team",
    action: "Send urgent notification",
    label: "Ready",
    icon: Siren,
  },
  {
    name: "Update Session Status",
    action: "Modify session information",
    label: "Ready",
    icon: History,
  },
  {
    name: "Add Command Note",
    action: "Add operational note",
    label: "Ready",
    icon: NotepadText,
  },
  {
    name: "Generate Situation Report",
    action: "Download current report",
    label: "Ready",
    icon: ClipboardList,
  },
];

const KPI_TONE = ["text-cyan", "text-green", "text-orange", "text-yellow", "text-green"];

function CommandCenter() {
  const ccQ = useCommandCenterKpis();
  const overviewQ = useOverviewKpis();
  const flowQ = useProgrammeFlow();
  const alertsQ = useAlerts({ per_page: 3, status: "unread" });
  const incidentsQ = useIncidents({ per_page: 5 });
  const mentionsQ = useSocialMentions({ per_page: 3 });

  const cc = ccQ.data;
  const safety = (cc?.safety_level ?? "low") as keyof typeof SAFETY_TONE;
  const safetyTone = SAFETY_TONE[safety] ?? SAFETY_TONE.low;
  const safetyPos = SAFETY_POSITION[safety] ?? 18;

  const sessionsRows: EventSession[] = [
    ...(flowQ.data?.live ?? []),
    ...(flowQ.data?.next ?? []),
    ...(flowQ.data?.upcoming ?? []),
  ].slice(0, 6);

  const kpis = [
    {
      label: "Total Attendance",
      value: fmtNumber(overviewQ.data?.total_attendance ?? 0),
      delta: "Checked in",
    },
    {
      label: "Sessions Live",
      value: fmtNumber(cc?.sessions_live ?? 0),
      delta: "Now on stage",
    },
    {
      label: "Open Incidents",
      value: fmtNumber(cc?.incidents_open ?? 0),
      delta: "Field response",
    },
    {
      label: "Unread Alerts",
      value: fmtNumber(cc?.alerts_unread ?? 0),
      delta: "Needs review",
    },
    {
      label: "Safety Level",
      value: (cc?.safety_level ?? "LOW").toString().toUpperCase(),
      delta: `${fmtNumber(cc?.personnel_on_duty ?? 0)} on duty`,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          COMMAND CENTRE
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time monitoring and Operational Control{" "}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
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
                  className={`text-2xl sm:text-3xl font-medium font-dmSans mt-2 tabular-nums ${KPI_TONE[idx] ?? "text-white"}`}
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

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            SESSION TRACKER
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all schedule
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-6 min-w-150">
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

            <QueryState
              isLoading={flowQ.isLoading}
              isError={flowQ.isError}
              error={flowQ.error}
              isEmpty={sessionsRows.length === 0}
              emptyLabel="No sessions scheduled."
            >
              <div className="flex flex-col gap-4">
                {sessionsRows.map((s, i) => {
                  const status = s.status as SessionStatus;
                  return (
                    <div
                      key={s.id}
                      className={`py-2 px-5 flex items-center justify-between ${
                        i % 2 === 0 ? "border border-white/55 rounded-2xl" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1.5 flex-2">
                        <h6 className="text-white font-semibold text-sm font-dmSans">
                          {s.title}
                        </h6>
                        <span className="text-white font-light text-xs font-dmSans">
                          {s.track?.name ?? s.sector?.name ?? "—"}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm font-dmSans flex-1">
                        {s.venue?.name ?? "—"}
                      </p>
                      <div className="flex items-center gap-1 flex-1">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${SESSION_DOT[status] ?? "bg-white"}`}
                        />
                        <span
                          className={`text-[10px] font-dmSans ${SESSION_TEXT[status] ?? "text-white"}`}
                        >
                          {SESSION_STATUS_LABEL[status] ?? status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm font-dmSans flex-1">
                        {fmtRange(s.starts_at, s.ends_at)}
                      </p>
                      <p className="text-white font-semibold text-sm font-dmSans flex-1 text-center">
                        {progressFor(s)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </QueryState>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-11 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              ALERTS & NOTIFICATIONS
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all alerts
            </button>
          </div>
          <QueryState
            isLoading={alertsQ.isLoading}
            isError={alertsQ.isError}
            error={alertsQ.error}
            isEmpty={(alertsQ.data?.data.length ?? 0) === 0}
            emptyLabel="No unread alerts."
          >
            <div className="flex flex-col gap-6">
              {(alertsQ.data?.data ?? []).map((a) => {
                const sev = a.severity as AlertSeverity;
                const Icon =
                  sev === "info" ? CircleAlert : TriangleAlert;
                return (
                  <div
                    key={a.id}
                    className={`border border-l-4 border-white/55 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 ${
                      ALERT_BORDER[sev] ?? "border-l-yellow"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`w-25 px-3 py-2 rounded-md text-[10px] font-dmSans font-medium flex items-center justify-center ${
                          ALERT_PILL[sev] ?? "bg-brown300 text-yellow500"
                        }`}
                      >
                        {ALERT_TONE_LABEL[sev] ?? sev.toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h6 className="text-sm font-dmSans text-white font-semibold">
                          {a.title}
                        </h6>
                        <span className="text-xs font-dmSans text-white font-light">
                          {a.source ?? a.body ?? "—"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="text-xs font-dmSans text-white font-light">
                        {fmtTime(a.created_at)}
                      </p>
                      <Icon
                        className={`w-10 h-10 ${
                          ALERT_ICON_FILL[sev] ?? "fill-yellow"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </QueryState>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 lg:col-span-6">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            SECURITY OVERVIEW
          </h4>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 items-center">
              <h5 className="text-white font-lexend text-sm font-light">
                VENUE STATUS
              </h5>
              <div className="flex items-center gap-2">
                <ShieldCheck className={`${safetyTone.text} w-30 h-30`} />
                <div className="flex flex-col gap-1.5">
                  <h6 className="text-white font-dmSans font-semibold text-2xl">
                    {(cc?.safety_level ?? "LOW").toString().toUpperCase()}
                  </h6>
                  <span className="text-white font-dmSans font-light text-xs">
                    {cc?.incidents_open
                      ? `${cc.incidents_open} open incident(s)`
                      : "All systems operational"}
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
                  <span className="text-green font-semibold font-lexend text-xl sm:text-2xl">
                    {fmtNumber(cc?.personnel_on_duty ?? 0)}
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    On Duty
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-light font-lexend text-sm">
                    OPEN INCIDENTS
                  </span>
                  <span
                    className={`font-semibold font-lexend text-xl sm:text-2xl ${
                      (cc?.incidents_open ?? 0) > 0 ? "text-yellow" : "text-green"
                    }`}
                  >
                    {fmtNumber(cc?.incidents_open ?? 0)}
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    Field response
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-light font-lexend text-sm">
                    UNREAD ALERTS
                  </span>
                  <span
                    className={`font-semibold font-lexend text-xl sm:text-2xl ${
                      (cc?.alerts_unread ?? 0) > 0 ? "text-orange" : "text-green"
                    }`}
                  >
                    {fmtNumber(cc?.alerts_unread ?? 0)}
                  </span>
                  <span className="text-white font-light font-lexend text-sm">
                    Awaiting review
                  </span>
                </div>
              </div>
              <SafetyLevel position={safetyPos} tone={safetyTone} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              SECURITY INCIDENTS (LIVE)
            </h4>
            <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              View all incidents
            </button>
          </div>
          <div className="flex flex-col gap-7">
            <IncidentSummaryStrip
              total={incidentsQ.data?.total ?? 0}
              open={cc?.incidents_open ?? 0}
            />
            <div className="overflow-x-auto">
              <div className="flex flex-col gap-5 divide-y pb-5 divide-white/55 min-w-150">
                <div className="flex items-center justify-between gap-4">
                  <h5 className="text-base font-semibold text-white font-lexend uppercase flex-2">
                    Incident
                  </h5>
                  <h5 className="text-base font-semibold text-white font-lexend uppercase flex-1">
                    Venue
                  </h5>
                  <h5 className="text-base font-semibold text-white font-lexend uppercase flex-1">
                    Time
                  </h5>
                  <h5 className="text-base font-semibold text-white font-lexend uppercase flex-1 text-center">
                    Status
                  </h5>
                </div>
                <QueryState
                  isLoading={incidentsQ.isLoading}
                  isError={incidentsQ.isError}
                  error={incidentsQ.error}
                  isEmpty={(incidentsQ.data?.data.length ?? 0) === 0}
                  emptyLabel="No incidents reported."
                >
                  <div className="flex flex-col gap-4">
                    {(incidentsQ.data?.data ?? []).map((inc) => (
                      <div
                        key={inc.id}
                        className="flex items-center gap-4 justify-between"
                      >
                        <p className="text-sm font-semibold text-white font-dmSans flex-2">
                          {inc.title}
                        </p>
                        <p className="text-sm font-semibold text-white font-dmSans flex-1">
                          {inc.venue?.name ?? "—"}
                        </p>
                        <p className="text-sm font-semibold text-white font-dmSans flex-1">
                          {fmtTime(inc.occurred_at)}
                        </p>
                        <div className="flex-1 flex items-center justify-center">
                          <div
                            className={`border font-dmSans font-medium text-xs py-1.25 px-3.75 rounded-md ${incidentStatusTone(inc.status, inc.severity)}`}
                          >
                            {incidentStatusLabel(inc.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </QueryState>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            QUICK ACTIONS
          </h4>
          <div className="flex flex-col gap-3.5">
            {QUICK_ACTIONS.map(({ name, action, icon: Icon, label }, i) => (
              <div
                key={name}
                className="px-4 sm:px-7.5 py-5 border border-white/55 rounded-2xl flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-md flex items-center justify-center ${
                      i === 0
                        ? "bg-blue"
                        : i === 1
                          ? "bg-purple300"
                          : i === 2
                            ? "bg-orange"
                            : i === 3
                              ? "bg-green100"
                              : i === 4
                                ? "bg-mint"
                                : ""
                    }`}
                  >
                    <Icon className="text-white w-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h5 className="text-white font-dmSans text-sm font-semibold">
                      {name}
                    </h5>
                    <span className="text-white font-dmSans text-xs font-light">
                      {action}
                    </span>
                  </div>
                </div>
                <div className="bg-green500 py-1.25 px-2.5 rounded-md text-white font-dmSans font-medium text-[10px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            LIVE FEED
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all cameras
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIVE_FEEDS.map(({ img, status, venue }, i) => (
              <div
                key={i}
                className="border border-white overflow-hidden rounded-2xl h-41.5 w-full relative"
              >
                <img src={img} alt="" className="w-full h-full" />
                <div className="absolute top-2 left-2 border border-white/15 rounded-md py-1.25 px-2.5 flex items-center justify-center bg-green500/20 text-white text-[10px] font-dmSans font-medium">
                  {venue}
                </div>
                <div
                  className={`absolute top-2 right-2 uppercase rounded-md py-1.25 px-2.5 flex items-center justify-center text-[10px] font-dmSans font-medium ${
                    status === "live"
                      ? "bg-green650 text-green100"
                      : "bg-brown400 text-yellow600"
                  }`}
                >
                  {status}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-10 lg:flex-row lg:justify-center lg:items-center">
            <div className="flex items-center flex-col gap-5 border border-white/30 rounded-2xl py-5 px-10 max-w-50 w-full">
              <h6 className="text-white font-dmSans text-sm font-semibold">
                Total Cameras
              </h6>
              <span className="text-white font-dmSans text-3xl font-semibold">
                {LIVE_FEEDS.length}
              </span>
            </div>
            <div className="flex items-center flex-col gap-5 border border-white/30 rounded-2xl py-5 px-10 max-w-50 w-full">
              <h6 className="text-white font-dmSans text-sm font-semibold">
                Active
              </h6>
              <span className="text-green font-dmSans text-3xl font-semibold">
                {LIVE_FEEDS.filter((f) => f.status === "live").length}
              </span>
            </div>
            <div className="flex items-center flex-col gap-5 border border-white/30 rounded-2xl py-5 px-10 max-w-50 w-full">
              <h6 className="text-white font-dmSans text-sm font-semibold">
                Offline
              </h6>
              <span className="text-red font-dmSans text-3xl font-semibold">
                {LIVE_FEEDS.filter((f) => f.status !== "live").length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            SOCIAL MEDIA LIVE FEED
          </h4>
          <button className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            View all
          </button>
        </div>

        <QueryState
          isLoading={mentionsQ.isLoading}
          isError={mentionsQ.isError}
          error={mentionsQ.error}
          isEmpty={(mentionsQ.data?.data.length ?? 0) === 0}
          emptyLabel="No social mentions yet."
        >
          <div className="flex flex-col gap-5">
            {(mentionsQ.data?.data ?? []).map((m) => (
              <div
                key={m.id}
                className="border border-white/55 rounded-2xl px-3 sm:px-4 py-4 pb-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={m.author_avatar_url ?? "/Chart-icon.png"}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover bg-white/10"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-white text-base font-bold font-inter">
                          {m.author_name ?? m.author_handle}
                        </h5>
                        <BadgeCheck className="w-6 h-6 fill-blue" />
                      </div>
                      <h6 className="text-white text-xs font-inter">
                        @{m.author_handle}
                      </h6>
                    </div>
                  </div>
                  <button>
                    <Ellipsis className="text-white w-5" />
                  </button>
                </div>

                <p className="text-white text-sm font-inter font-light">
                  {m.body}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-inter font-light">
                    {fmtTime(m.posted_at)} ·
                  </span>
                  <span className="text-white text-xs font-inter font-light">
                    {fmtRelative(m.posted_at)}
                  </span>
                  <span className="text-white/60 text-xs font-inter font-light ml-2">
                    {m.platform}
                  </span>
                </div>
                <div className="w-full h-px bg-white/70"></div>
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.comments)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.shares)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChartNoAxesColumn className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-inter">
                      {fmtCompact(m.impressions)}
                    </span>
                  </div>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </QueryState>
      </section>
    </section>
  );
}

function progressFor(s: EventSession): string {
  const start = new Date(s.starts_at).getTime();
  const end = new Date(s.ends_at).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return "0%";
  if (s.status === "completed") return "100%";
  if (s.status === "upcoming" || s.status === "next" || s.status === "cancelled")
    return "0%";
  const now = Date.now();
  if (now <= start) return "0%";
  if (now >= end) return "100%";
  return `${Math.round(((now - start) / (end - start)) * 100)}%`;
}

function incidentStatusLabel(status: string): string {
  switch (status) {
    case "open":
      return "Open";
    case "responding":
      return "Responding";
    case "resolved":
      return "Resolved";
    default:
      return status;
  }
}

function incidentStatusTone(status: string, severity: IncidentSeverity): string {
  if (status === "resolved") return "border-green100 text-green100 bg-green550";
  if (status === "responding")
    return "border-yellow200 bg-yellow100 text-yellow200";
  // open
  if (severity === "critical" || severity === "high")
    return "border-red bg-red200 text-red";
  return "border-orange bg-yellow100 text-orange";
}

function IncidentSummaryStrip({
  total,
  open,
}: {
  total: number;
  open: number;
}) {
  const resolved = Math.max(total - open, 0);
  return (
    <div className="border border-white/55 rounded-2xl h-50 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h5 className="text-white/70 font-lexend text-xs uppercase">
          Incident overview
        </h5>
        <span className="text-white/50 font-lexend text-[10px]">
          live count
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-white/70 text-xs font-lexend">Total</span>
          <span className="text-white text-2xl font-semibold font-dmSans">
            {fmtNumber(total)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/70 text-xs font-lexend">Open</span>
          <span
            className={`text-2xl font-semibold font-dmSans ${
              open > 0 ? "text-yellow" : "text-green"
            }`}
          >
            {fmtNumber(open)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/70 text-xs font-lexend">Resolved</span>
          <span className="text-green text-2xl font-semibold font-dmSans">
            {fmtNumber(resolved)}
          </span>
        </div>
      </div>
    </div>
  );
}

type SafetyTone = { dot: string; text: string; label: string };

function SafetyLevel({
  position,
  tone,
}: {
  position: number;
  tone: SafetyTone;
}) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white uppercase text-xs font-light font-lexend tracking-wide">
          Safety Level
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
          <span className={`${tone.text} font-semibold text-xs`}>
            {tone.label}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-1 h-2">
          <div className="flex-1 bg-[#3FC06A]" />
          <div className="flex-1 bg-[#DCA225]" />
          <div className="flex-1 bg-[#D55D22]" />
          <div className="flex-1 bg-[#8F231C]" />
        </div>
        <div
          className="absolute top-3 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow-md"
          style={{
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </section>
  );
}

export default CommandCenter;
