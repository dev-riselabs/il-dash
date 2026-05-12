import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="flex flex-col h-screen w-screen bg-surface950 overflow-hidden">
      {/* MAIN AREA */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0">
          <TopNav />

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>

      {/* FULL WIDTH FOOTER */}
      <footer className=" border-t border-white bg-surface900 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-white font-lexend">
          Designed and developed by Events Intelligence & Technology Services
          Limited.
          <img src="/events-intel.png" alt="" className="h-20" />
        </div>
        <div className=" text-xs text-white font-lexend flex items-center gap-1.5">
          AI Deployment Partner
          <img src="/rise-networks-logo.png" alt="" />
        </div>
      </footer>
    </div>
  );
}
