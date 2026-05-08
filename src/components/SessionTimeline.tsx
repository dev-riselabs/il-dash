export default function SessionTimeline() {
  const sessions = [
    {
      id: 1,
      status: "LIVE",
      title: "Lagos - Africa’s Global Gateway",
      subtitle: "Shaping Africa’s Digital Future",
      time: "11:00 AM - 12:30 PM",
      type: "current",
    },
    {
      id: 2,
      status: "UP NEXT",
      title: "The Future of Technology...",
      subtitle: "Building Sustainable Cities",
      time: "1:00 PM - 02:30 PM",
      type: "next",
    },
    {
      id: 3,
      status: "UP NEXT",
      title: "Creative Economy Dialogue",
      subtitle: "Unlocking Africa’s Creative Potential",
      time: "03:00 PM - 04:30 PM",
      type: "next",
    },
  ];

  return (
    <section className=" text-white">
      <div className=" flex flex-col gap-8">
        {/* CURRENT SESSION */}
        <div>
          <h2 className="text-cyan text-lg font-bold mb-6 uppercase">
            Current Session
          </h2>

          <div className="flex gap-6">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                📡
              </div>

              <div className="w-0.5 flex-1 bg-gray-500 min-h-30" />
            </div>

            {/* Card */}
            <div className=" border border-gray-700 rounded-3xl p-4 flex justify-between items-center gap-4 ">
              <div className="flex flex-col gap-2">
                <p className="text-gray-300 text-xs">{sessions[0].time}</p>

                <h3 className="text-sm font-bold">
                  {sessions[0].title}
                </h3>

                <p className="text-gray-400 text-xs">{sessions[0].subtitle}</p>
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
            Next Session
          </h2>

          <div className="flex flex-col gap-6">
            {sessions.slice(1).map((session) => (
              <div key={session.id} className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black text-lg font-bold flex items-center justify-center ">
                    {session.id}
                  </div>

                  {session.id !== 3 && (
                    <div className="w-0.5 flex-1 bg-gray-500 min-h-25" />
                  )}
                </div>

                {/* Card */}
                <div className=" border border-gray-700 rounded-3xl p-5 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-300 text-xs">{session.time}</p>

                    <h3 className="text-sm font-bold">
                      {session.title}
                    </h3>

                    <p className="text-gray-400 text-xs">{session.subtitle}</p>
                  </div>

                  <p className="text-yellow-400 font-bold text-sm whitespace-nowrap">
                    {session.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}