import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function FormShell({ children }: Props) {
  return (
    <div className="flex flex-col lg:h-screen w-screen bg-black100 overflow-hidden">
      {/* MAIN AREA */}

      <div className="flex flex-col flex-1 gap-8 min-w-0 px-4 md:px-8 min-h-0 overflow-y-auto pb-20">
        <div className="flex flex-col border border-white/55 rounded-b-3xl">
          <div className="flex flex-col gap-2 pt-2">
            <div className="w-full h-4 bg-neutral500"></div>
            <div className="w-full h-4 bg-red200"></div>
            <div className="w-full h-4 bg-orange400"></div>
          </div>
          <div className="flex items-center justify-center py-5">
            <img src="invest-lagos.png" alt="" className="w-60"/>
          </div>
        </div>

        <main className="flex-1 flex justify-center">{children}</main>
      </div>

      {/* FULL WIDTH FOOTER */}
      <footer className=" border-t border-white bg-surface900 flex flex-col gap-4 sm:flex-row sm:items-center justify-between px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-white font-lexend">
          Designed and developed by Events Intelligence & Technology Services
          Limited.
          <img src="/events-intel.png" alt="" className="h-10" />
        </div>
        <div className="text-[10px] sm:text-xs text-white font-lexend flex items-center justify-between gap-1.5">
          AI Deployment Partner
          <img src="/rise-networks-logo.png" alt="" className="h-10" />
        </div>
      </footer>
    </div>
  );
}
