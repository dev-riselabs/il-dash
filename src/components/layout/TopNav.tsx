import { useEffect, useState } from "react";

function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TopNav() {
  const now = useLiveClock();

  return (
    <header className="h-33.75 bg-surface900 border-b font-lexend border-white/45 divide-x divide-white  px-6 flex items-center">
      {/* Logo + brand */}
      <div className="flex items-center gap-3 basis-2/8 px-2">
        <img src="/invest-lagos.png" alt="" />
      </div>

      {/* Current session */}
      <div className="basis-3/8 px-4">
        <div className="text-xs font-light tracking-widest text-white uppercase">
          Current Session
        </div>
        <div className="text-xl text-cyan font-semibold mt-1 truncate">
          Lagos &mdash; Africa's Global Gateway
        </div>
        <div className="text-sm text-white font-light mt-1">
          8&ndash;9 June 2026 | Eko Convention Center, NIGERIA
        </div>
      </div>

      {/* Live clock */}
      <div className="basis-3/8 px-4">
        <div className="flex justify-between gap-4 items-center">
          <div>
            <div className="text-xs font-light tracking-widest text-white uppercase">
              Live Clock
            </div>
            <div className="text-2xl font-semibold text-green mt-1 tabular-nums">
              {now.toLocaleTimeString("en-GB", { hour12: false })}
            </div>
          </div>

          <img src="/commonwealth.png" alt="" />
        </div>

        {/* <div className="text-xs text-slate-500 mt-1">
            {now.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div> */}
        <div className="text-sm text-white font-light mt-1">
          8&ndash;9 June 2026 | Eko Convention Center, NIGERIA
        </div>
      </div>
    </header>
  );
}
