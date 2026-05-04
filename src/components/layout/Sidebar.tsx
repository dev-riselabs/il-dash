import { NavLink } from 'react-router-dom'
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
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/programme', label: 'Programme Tracker', icon: CalendarClock },
  { to: '/insights', label: 'Session Insights', icon: Brain },
  { to: '/deals', label: 'Deal Room Tracker', icon: Briefcase },
  { to: '/heatmap', label: 'Investment Heatmap', icon: Map },
  { to: '/resolutions', label: 'Resolution Board', icon: ListChecks },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/feedback', label: 'Sentiment & Feedback', icon: Heart },
  { to: '/social', label: 'Social Media Feed', icon: Megaphone },
  { to: '/alerts', label: 'Alerts & Updates', icon: Bell },
  { to: '/security', label: 'Security', icon: ShieldAlert },
  { to: '/reports', label: 'Reports', icon: FileText },
]

export function Sidebar() {
  return (
    <aside className="w-[248px] shrink-0 bg-surface-900 border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="text-xs font-semibold tracking-widest text-accent-cyan">
          IL-DASH
        </div>
        <div className="text-[10px] text-slate-500 mt-1">v1.0 · Command Centre</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-accent-cyan/10 text-accent-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}
