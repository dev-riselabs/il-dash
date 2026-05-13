import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  Brain,
  Briefcase,
  Map,
  ListChecks,
  BarChart3,
  Heart,
  Megaphone,
  Bell,
  FileText,
  ShieldAlert,
  SatelliteDish,
  Globe,
  Target,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/executive-view", label: "Executive View", icon: Target },
  { to: "/command-center", label: "Command Center", icon: Command },
  { to: "/programme", label: "Programme Tracker", icon: CalendarClock },
  { to: "/insights", label: "Session Insights", icon: Brain },
  { to: "/deals", label: "Deal Room Tracker", icon: Briefcase },
  { to: "/heatmap", label: "Investment Heatmap", icon: Map },
  { to: "/resolutions", label: "Resolution Board", icon: ListChecks },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/feedback", label: "Sentiment & Feedback", icon: Heart },
  { to: "/social", label: "Social Media Feed", icon: Megaphone },
  { to: "/alerts", label: "Alerts & Updates", icon: Bell },
  { to: "/security", label: "Security", icon: ShieldAlert },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/global", label: "Global Investor Map", icon: Globe },
  {
    to: "/next-action-tracker",
    label: "Next Action Tracker",
    icon: SatelliteDish,
  },
];

export function Sidebar() {
  return (
    <aside className="w-62 shrink-0 bg-surface900 border-r border-white/5 flex flex-col lg:block hidden">
      <div className="p-6 border-b border-white/5 flex justify-center">
        {/* <div className="text-xs font-semibold tracking-widest text-accent-cyan">
          IL-DASH
        </div>
        <div className="text-[10px] text-slate-500 mt-1">v1.0 · Command Centre</div> */}
        <img src="./logo_il.png" alt="" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto lg:pb-20">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors font-outfit",
                isActive
                  ? "bg-cyan/10 text-cyan"
                  : "text-white hover:text-slate-200 hover:bg-white/5",
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
        <img src="./logo-b.png" alt="" className="h-30 mt-6 w-full" />
      </nav>
    </aside>
  );
}
