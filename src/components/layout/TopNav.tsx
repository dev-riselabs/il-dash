import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileSidebar } from "./MobileSidebar";

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

  const [showMenu, setShowMenu] = useState(false);

  function handleOpenMenu() {
    setShowMenu(true);
  }

  function handleCloseMenu() {
    setShowMenu(false);
  }

  return (
    <>
      <MobileSidebar handleCloseMenu={handleCloseMenu} showMenu={showMenu} />
      <header className="lg:h-20 bg-surface900 border-b font-lexend border-white/45 py-5 lg:py-0 lg:divide-x divide-white gap-4 lg:gap-0 px-4  lg:px-6 flex flex-col lg:flex-row lg:items-center">
        {/* Logo + brand */}
        <div className="lg:divide-x divide-white flex items-center justify-between">
          <div className="flex-1">
            <img
            src="./logo_il.png"
            alt=""
            className="md:w-25 md:h-15 px-2 w-20 h-15"
          />
          </div>
          
          <div className="flex justify-between items-center gap-3 flex-1 lg:basis-2/8 lg:px-2">
            <img src="/invest-lagos.png" alt="" className="w-30 lg:w-40" />
            <button
              onClick={handleOpenMenu}
              className="cursor-pointer lg:hidden"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Current session */}
        <div className="lg:basis-3/8 lg:px-4">
          <div className="text-[10px] sm:text-xs font-light tracking-widest text-white uppercase">
            Current Session
          </div>
          <div className="text-lg sm:text-xl text-cyan font-semibold mt-0.75 truncate">
            Lagos &mdash; Africa's Global Gateway
          </div>
          <div className="text-[10px] sm:text-xs text-white font-light mt-0.75">
            8th to 9th June 2026 | Eko Convention Center, NIGERIA
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

            <img src="/commonwealth.png" alt="" className="w-30 lg:w-40" />
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
            8th to 9th June 2026 | Eko Convention Center, NIGERIA
          </div>
        </div>
      </header>
    </>
  );
}
