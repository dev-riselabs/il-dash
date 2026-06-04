import {
  CalendarDays,
  Clock,
  Download,
  MapPin,
  Users,
  Zap,
  ArrowRight,
  Loader,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { QueryState } from "@/components/ui/QueryState";
import { useEvent, useEventsList } from "@/lib/api/hooks";
import {
  fmtDate,
  fmtRange,
  fmtRelative,
  fmtDateTime,
} from "@/lib/api/format";
import type { Event } from "@/lib/api/types";

function EventInsight() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Load events list for dropdown
  const eventsQ = useEventsList({ per_page: 50 });

  // Initialize selected ID from first event
  useEffect(() => {
    if (selectedId == null && eventsQ.data && eventsQ.data.data.length > 0) {
      setSelectedId(eventsQ.data.data[0].id);
    }
  }, [selectedId, eventsQ.data]);

  // Load selected event details
  const eventQ = useEvent(selectedId);
  const event = eventQ.data;

  const days = event?.days ?? [];
  const tracks = event?.tracks ?? [];
  const sessions = event?.sessions ?? [];

  // Calculate statistics
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const liveSessions = sessions.filter(s => s.status === 'live').length;
  const totalAttendance = sessions.reduce((sum, s) => {
    return sum + ((s.attendance_in_person ?? 0) + (s.attendance_virtual ?? 0));
  }, 0);

  const statusBreakdown = useMemo(() => {
    const statuses = sessions.map(s => s.status);
    const breakdown: Record<string, number> = {};
    statuses.forEach(status => {
      breakdown[status] = (breakdown[status] ?? 0) + 1;
    });
    return breakdown;
  }, [sessions]);

  const uniqueSpeakers = useMemo(() => {
    const speakerIds = new Set<number>();
    sessions.forEach(session => {
      session.speakers?.forEach(speaker => {
        speakerIds.add(speaker.id);
      });
    });
    return speakerIds.size;
  }, [sessions]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          EVENT INSIGHTS
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Comprehensive overview and analytics for summit events.
        </p>
      </div>

      <div className="flex md:items-center gap-5 md:gap-8 flex-col md:flex-row">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-lexend text-xs">Select Event:</h3>
          <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
            <select
              value={selectedId ?? ""}
              onChange={(e) =>
                setSelectedId(e.target.value ? Number(e.target.value) : null)
              }
              className="text-white font-lexend text-xs bg-transparent outline-none cursor-pointer"
            >
              {(eventsQ.data?.data ?? []).map((e) => (
                <option key={e.id} value={e.id} className="text-black">
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border self-start border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs hover:bg-white/10 transition-colors cursor-pointer">
          <Download className="w-4 text-white" />
          Download Report
        </div>
      </div>

      {eventQ.isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-white animate-spin" />
        </div>
      ) : event ? (
        <>
          {/* Event Header */}
          <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5">
            <div className="flex flex-col gap-5">
              <h5 className="text-xs font-light text-cyan font-lexend uppercase">
                Event Overview
              </h5>
              <h4 className="text-xl sm:text-2xl font-lexend text-white font-bold">
                {event.name}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-2">
                  <CalendarDays className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] sm:text-xs text-white/70 font-lexend">
                      Start Date
                    </span>
                    <span className="text-sm text-white font-semibold">
                      {fmtDate(event.starts_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] sm:text-xs text-white/70 font-lexend">
                      Duration
                    </span>
                    <span className="text-sm text-white font-semibold">
                      {fmtRange(event.starts_at, event.ends_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] sm:text-xs text-white/70 font-lexend">
                      Location
                    </span>
                    <span className="text-sm text-white font-semibold">
                      {event.location ?? "TBD"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] sm:text-xs text-white/70 font-lexend">
                      Status
                    </span>
                    <span className="text-sm text-white font-semibold capitalize bg-green600 px-2 py-1 rounded text-center">
                      {event.status ?? "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {event.description && (
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/80 font-lexend">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Event Statistics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-white/55 rounded-xl py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] sm:text-xs text-white/70 font-lexend uppercase">
                    Total Sessions
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-lexend">
                    {totalSessions}
                  </span>
                </div>
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan opacity-50" />
              </div>
            </div>

            <div className="border border-white/55 rounded-xl py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] sm:text-xs text-white/70 font-lexend uppercase">
                    Completed
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-green-400 font-lexend">
                    {completedSessions}
                  </span>
                </div>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 opacity-50" />
              </div>
            </div>

            <div className="border border-white/55 rounded-xl py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] sm:text-xs text-white/70 font-lexend uppercase">
                    Speakers
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-lexend">
                    {uniqueSpeakers}
                  </span>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan opacity-50" />
              </div>
            </div>

            <div className="border border-white/55 rounded-xl py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] sm:text-xs text-white/70 font-lexend uppercase">
                    Total Attendees
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-lexend">
                    {totalAttendance.toLocaleString()}
                  </span>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan opacity-50" />
              </div>
            </div>
          </section>

          {/* Event Days */}
          {days.length > 0 && (
            <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5">
              <h5 className="text-xs font-light text-cyan font-lexend uppercase mb-4">
                Event Days
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className="border border-white/30 rounded-lg p-3 hover:border-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarDays className="w-4 h-4 text-cyan" />
                      <span className="text-sm font-semibold text-white font-lexend">
                        {fmtDate(day.date)}
                      </span>
                    </div>
                    {day.label && (
                      <p className="text-xs text-white/70 font-lexend">
                        {day.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tracks */}
          {tracks.length > 0 && (
            <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5">
              <h5 className="text-xs font-light text-cyan font-lexend uppercase mb-4">
                Tracks
              </h5>
              <div className="flex flex-wrap gap-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="bg-gradient-to-r from-cyan/20 to-blue/20 border border-cyan/40 rounded-full px-4 py-2 hover:border-cyan/60 transition-colors cursor-pointer"
                  >
                    <span className="text-sm text-white font-semibold font-lexend">
                      {track.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sessions */}
          {sessions.length > 0 && (
            <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5">
              <h5 className="text-xs font-light text-cyan font-lexend uppercase mb-4">
                Sessions ({sessions.length})
              </h5>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {sessions.map((session) => (
                  <Link
                    key={session.id}
                    to={`/session/${session.id}`}
                    className="block border border-white/20 rounded-lg p-3 hover:border-white/60 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-semibold text-white font-lexend truncate">
                          {session.title}
                        </h6>
                        <div className="flex items-center gap-2 text-xs text-white/70 mt-1 flex-wrap">
                          <span className="bg-blue950/50 px-2 py-1 rounded">
                            {session.status}
                          </span>
                          {session.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.venue.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {((session.attendance_in_person ?? 0) + (session.attendance_virtual ?? 0)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/session"
                className="mt-4 inline-flex items-center gap-2 text-cyan hover:text-cyan/80 font-lexend text-xs font-semibold transition-colors"
              >
                View All Sessions
                <ArrowRight className="w-3 h-3" />
              </Link>
            </section>
          )}
        </>
      ) : (
        <div className="border border-white/55 rounded-2xl py-12 px-5 text-center">
          <p className="text-white/70 font-lexend">
            {eventsQ.data?.data.length === 0
              ? "No events available"
              : "Select an event to view details"}
          </p>
        </div>
      )}
    </section>
  );
}

export default EventInsight;
