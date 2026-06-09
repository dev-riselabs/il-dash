import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  // Brain,
  Briefcase,
  Map,
  // ListChecks,
  BarChart3,
  Heart,
  // Megaphone,
  // Bell,
  // FileText,
  // ShieldAlert,
  // SatelliteDish,
  Globe,
  Target,
  Command,
  X,
  ClipboardCheck,
  Speaker,
  NotebookTabs,
  MessageSquareReply,
  // BrainCircuit,
  LogOut,
  CalendarPlus,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/store";

const publicItems = [
  { to: "/investlagos", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/executive-view", label: "Executive View", icon: Target },
  { to: "/command-center", label: "Command Center", icon: Command },
  { to: "/programme", label: "Programme Tracker", icon: CalendarClock },
  // { to: "/insights", label: "Session Insights", icon: Brain },
  { to: "/deals", label: "Deal Room Tracker", icon: Briefcase },
  { to: "/heatmap", label: "Investment Heatmap", icon: Map },
  // { to: "/resolutions", label: "Resolution Board", icon: ListChecks },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/feedback", label: "Sentiment & Feedback", icon: Heart },
  // { to: "/social", label: "Social Media Feed", icon: Megaphone },
  // { to: "/alerts", label: "Alerts & Updates", icon: Bell },
  // { to: "/security", label: "Security", icon: ShieldAlert },
  // { to: "/reports", label: "Reports", icon: FileText },
  { to: "/global", label: "Global Investor Map", icon: Globe },
  // {
  //   to: "/next-action-tracker",
  //   label: "Next Action Tracker",
  //   icon: SatelliteDish,
  // },
  // {
  //   to: "/intelligence-dashboard",
  //   label: "Intelligence Dashboard",
  //   icon: BrainCircuit,
  // },
];

const adminItems = [
  {
    to: "/event",
    label: "Event",
    icon: CalendarPlus,
    end: false,
  },
  {
    to: "/attendance",
    label: "Attendance",
    icon: ClipboardCheck,
    end: false,
  },
  {
    to: "/speaker",
    label: "Speaker",
    icon: Speaker,
    end: false,
  },
  {
    to: "/session",
    label: "Session",
    icon: NotebookTabs,
    end: false,
  },
  {
    to: "/audience-feedback",
    label: "Audience Feedback",
    icon: MessageSquareReply,
    end: false,
  },
  {
    to: "/dealroom",
    label: "Deal Room",
    icon: Handshake, 
    end: false,
  },
];

type SidebarProps = {
  handleCloseMenu: () => void;
  showMenu: boolean;
};

export function MobileSidebar({ handleCloseMenu, showMenu }: SidebarProps) {
  const { user, logout } = useAuth();
  const items = user ? [...publicItems, ...adminItems] : publicItems;

  const handleLogout = async () => {
    await logout();
    handleCloseMenu();
  };

  return (
    <aside
      className={`${showMenu ? "fixed" : "hidden"} w-full bg-surface900/50 backdrop-blur-xs z-20  top-0 left-0 h-screen lg:hidden`}
    >
      <button onClick={handleCloseMenu} className="cursor-pointer">
        <X className="w-6 h-6 absolute top-4 right-4 text-white" />
      </button>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto lg:pb-20 w-2/3 md:w-1/3 bg-surface950 h-screen py-10 -mt-6 flex flex-col">
        <div className="flex-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              onClick={handleCloseMenu}
              key={to}
              to={to}
              end={end ?? false}
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
          
        </div>

        {/* Admin Logout Button */}
        {user && (
          <div className="border-t border-white/5 pt-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors font-outfit w-full",
                "text-white hover:text-slate-200 hover:bg-white/5",
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              <span className="truncate">Logout</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}