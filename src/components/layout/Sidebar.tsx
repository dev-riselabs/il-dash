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
  MessageSquareQuote,
  ClipboardCheck,
  Speaker,
  NotebookTabs,
  MessageSquareReply,
  BrainCircuit,
  ClipboardList,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const items = [
  { to: "/investlagos", label: "Overview", icon: LayoutDashboard, end: true },
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
  {
    to: "/intelligence-dashboard",
    label: "Intelligence Dashboard",
    icon: BrainCircuit,
  },
  {
    to: "/key-insight",
    label: "Key Insight",
    icon: Key,
  },
  {
    to: "/session-quotes",
    label: "Session Quotes",
    icon: MessageSquareQuote,
  },
  {
    to: "/deep-dive",
    label: "Deep Dive",
    icon: ClipboardList,
  },
  {
    to: "/attendance",
    label: "Attendance",
    icon: ClipboardCheck,
  },
  {
    to: "/speaker",
    label: "Speaker",
    icon: Speaker,
  },
  {
    to: "/session",
    label: "Session",
    icon: NotebookTabs,
  },
  {
    to: "/audience-feedback",
    label: "Audience Feedback",
    icon: MessageSquareReply,
  },
];

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  function toggleIsHovered() {
    setIsHovered((prev) => !prev);
  }

  return (
    <aside
      onMouseEnter={toggleIsHovered}
      onMouseLeave={toggleIsHovered}
      className={`${isHovered ? "w-62" : "w-20"} shrink-0 bg-surface900 border-r border-white/5 flex-col lg:flex hidden transition-all `}
    >
      

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
            {isHovered && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
        {isHovered && (
          <img src="./logo-b.png" alt="" className="h-30 mt-6 w-full" />
        )}
      </nav>
    </aside>
  );
}
