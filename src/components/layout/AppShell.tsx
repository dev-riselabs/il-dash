import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="flex flex-col lg:h-screen w-screen bg-surface950 overflow-hidden">
      <TopNav />
      {/* MAIN AREA */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0">
          

          <main className="flex-1 lg:overflow-y-auto p-4 sm:p-6 pb-20">{children}</main>
          {/* FULL WIDTH FOOTER */}
      <footer className=" border-t border-white/55 bg-surface900 flex flex-col gap-4 sm:flex-row sm:items-center justify-between px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-white font-lexend">
          Designed and developed by Events Intelligence & Technology Services
          Limited.
          <img src="/events-intel.png" alt="" className="h-10" />
        </div>
        <div className="text-[10px] sm:text-xs text-white font-lexend flex items-center justify-center gap-1.5">
          AI Deployment Partner
          <img src="/rise-networks-logo.png" alt="" className="h-10"/>
        </div>
      </footer>
        </div>
      </div>

      
    </div>
  );
}
