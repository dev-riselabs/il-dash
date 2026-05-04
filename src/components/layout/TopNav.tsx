import { useEffect, useState } from 'react'

function useLiveClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function TopNav() {
  const now = useLiveClock()

  return (
    <header className="h-[135px] bg-surface-900 border-b border-white/5 px-6 flex items-center">
      <div className="flex-1 grid grid-cols-3 gap-6 items-center">
        {/* Logo + brand */}
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold tracking-wider text-white">
            INVEST LAGOS <span className="text-accent-cyan">3.0</span>
          </div>
        </div>

        {/* Current session */}
        <div>
          <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
            Current Session
          </div>
          <div className="text-lg font-medium text-white mt-1 truncate">
            Lagos &mdash; Africa's Global Gateway
          </div>
          <div className="text-xs text-slate-500 mt-1">
            8&ndash;9 June 2026 | Eko Convention Center, NIGERIA
          </div>
        </div>

        {/* Live clock */}
        <div className="text-right">
          <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
            Live Clock
          </div>
          <div className="text-2xl font-mono font-medium text-accent-cyan mt-1 tabular-nums">
            {now.toLocaleTimeString('en-GB', { hour12: false })}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {now.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
