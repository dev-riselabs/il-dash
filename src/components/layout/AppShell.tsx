import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

interface Props {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface950">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <footer className="h-12 border-t border-white/5 bg-surface900 flex items-center justify-center text-xs text-slate-500">
          Designed and Developed by Rise Networks &middot; Invest Lagos 3.0 Technology Partner
        </footer>
      </div>
    </div>
  )
}
