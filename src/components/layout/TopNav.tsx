import { Menu } from "lucide-react";
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
    <header className="lg:h-25 bg-surface900 border-b font-lexend border-white/45 py-5 lg:py-0 lg:divide-x divide-white gap-4 lg:gap-0 px-4  lg:px-6 flex flex-col lg:flex-row lg:items-center">
      {/* Logo + brand */}
      <img src="./logo_il.png" alt=""className="w-30 h-20 px-2" />
      <div className="flex justify-between items-center gap-3 lg:basis-2/8 lg:px-2">
        <img src="/invest-lagos.png" alt="" className="w-30 lg:w-40"/>
        <button className="cursor-pointer lg:hidden"><Menu className="w-6 h-6 text-white"/></button>
      </div>

      {/* Current session */}
      <div className="lg:basis-3/8 lg:px-4">
        <div className="text-[10px] sm:text-xs font-light tracking-widest text-white uppercase">
          Current Session
        </div>
        <div className="text-lg sm:text-xl text-cyan font-semibold mt-1 truncate">
          Lagos &mdash; Africa's Global Gateway
        </div>
        <div className="text-[10px] sm:text-sm text-white font-light mt-1">
          8&ndash;9 June 2026 | Eko Convention Center, NIGERIA
        </div>
      </div>

      {/* Live clock */}
      <div className="lg:basis-3/8 lg:px-4">
        <div className="flex justify-between gap-4 items-center">
          <div>
            <div className="text-[10px] sm:text-xs font-light tracking-widest text-white uppercase">
              Live Clock
            </div>
            <div className="text-lg sm:text-2xl font-semibold text-green mt-1 tabular-nums">
              {now.toLocaleTimeString("en-GB", { hour12: false })}
            </div>
          </div>

          <img src="/commonwealth.png" alt="" className="w-30 lg:w-40"/>
        </div>

        {/* <div className="text-xs text-slate-500 mt-1">
            {now.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div> */}
        <div className="text-[10px] sm:text-xs text-white font-light mt-1">
          8&ndash;9 June 2026 | Eko Convention Center, NIGERIA
        </div>
      </div>
    </header>
  );
}
