import { useEffect, useState } from "react";

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

/**
 * Convert ISO timestamp into readable Nigerian format
 */
const formatDateTime = (dateStr?: string) => {
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

export default function SessionTimeline() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/sessions");
        const json = await res.json();

        setSessions(json?.data || []);
      } catch (error) {
        console.error("Session fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const currentSession = sessions[0];
  const nextSessions = sessions.slice(1, 3);

  if (loading && !sessions.length) {
    return <p className="text-white">Loading sessions...</p>;
  }

  const currentTime = formatDateTime(currentSession?.Timestamp);

  return (
    <section className="text-white">
      <div className="flex flex-col gap-8">

        {/* CURRENT SESSION */}
        <div>
          <h2 className="text-cyan text-lg font-bold mb-6 uppercase">
            Current Session
          </h2>

          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                📡
              </div>
              <div className="w-0.5 flex-1 bg-gray-500 min-h-30" />
            </div>

            <div className="border border-gray-700 rounded-3xl p-4 flex justify-between items-center gap-4 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-gray-300 text-xs">
                  {currentTime
                    ? `${currentTime.date} • ${currentTime.time}`
                    : "Live Now"}
                </p>

                <h3 className="text-sm font-bold">
                  {currentSession?.session_name || "No active session"}
                </h3>

                <p className="text-gray-400 text-xs">
                  {currentSession?.speaker_name}
                </p>
              </div>

              <button className="border border-red-500 text-red-500 text-xs px-3 py-3 rounded-lg flex items-center gap-3 font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                LIVE
              </button>
            </div>
          </div>
        </div>

        {/* NEXT SESSIONS */}
        <div>
          <h2 className="text-yellow-400 text-lg font-bold mb-6 uppercase ml-10">
            Next Sessions
          </h2>

          <div className="flex flex-col gap-6">
            {nextSessions.map((session, index) => {
              const sessionTime = formatDateTime(session?.Timestamp);

              return (
                <div key={session.Timestamp} className="flex gap-6">

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-black text-lg font-bold flex items-center justify-center">
                      {index + 1}
                    </div>

                    {index !== nextSessions.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-500 min-h-25" />
                    )}
                  </div>

                  <div className="border border-gray-700 rounded-3xl p-5 flex justify-between items-center w-full">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-300 text-xs">
                        {sessionTime
                          ? `${sessionTime.date} • ${sessionTime.time}`
                          : "Scheduled"}
                      </p>

                      <h3 className="text-sm font-bold">
                        {session.session_name}
                      </h3>

                      <p className="text-gray-400 text-xs">
                        {session.speaker_name}
                      </p>
                    </div>

                    <p className="text-yellow-400 font-bold text-sm whitespace-nowrap">
                      UP NEXT
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}