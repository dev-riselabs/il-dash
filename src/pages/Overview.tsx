import { CircleArrowUp } from 'lucide-react'

const kpis = [
  { label: 'Total Attendance', value: '1,200', delta: '+4.5%' },
  { label: 'Number of Speakers', value: '20', delta: '+4.5%' },
  { label: 'Active Deals', value: '12', delta: '+8.0%' },
  { label: 'Resolutions Today', value: '7', delta: '+12%' },
]

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>REAL-TIME INTELLIGENCE DASHBOARD [IL-DASH]</h1>
        <p className='text-white font-lexend font-light text-xs'>Overview.</p>
      </div>
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* KPI grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }) => (
          <div key={label} className="border border-white/30 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div className="text-3xl font-semibold font-dmSans text-white mt-2 tabular-nums">{value}</div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green flex items-center gap-2"><CircleArrowUp color='white' width={'20px'} /> {delta}</div>
          </div>
        ))}
      </div>
      <div className='flex gap-4 items-center border border-white/30 rounded-xl overflow-hidden'>
        <div className='flex flex-col gap-4 justify-center px-5 w-3/5'>
          <p className='text-white font-lexend text-base'>Lagos is not just the future of Africa—it is the blueprint for sustainable urbanization globally.</p>
          <div className=''>
            <p className='text-white font-lexend text-sm text-right'>Babajide Olusola Sanwo-Olu</p>
            <p className='text-white font-lexend text-[10px] text-right'>Executive Governor, Lagos State</p>
          </div>
        </div>
        <img src="/Babajide-Sanwo-olu 2.png" alt="" className='w-2/5 h-full'/>
      </div>
      </section>

      {/* Two-column main area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live programme flow */}
        <section className="card lg:col-span-5">
          <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4">
            Live Programme Flow
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl bg-surface800 border border-red/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 tracking-wider">CURRENT SESSION</span>
                <span className="badge-live">● LIVE</span>
              </div>
              <div className="text-xs text-slate-500">11:00 AM &mdash; 12:30 PM</div>
              <div className="text-base font-medium text-white mt-1">
                Lagos &mdash; Africa's Global Gateway
              </div>
              <div className="text-xs text-slate-400 mt-1">Shaping Africa's Digital Future</div>
            </div>

            <div className="rounded-xl bg-surface800 border border-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 tracking-wider">NEXT SESSION</span>
                <span className="badge-next">UP NEXT</span>
              </div>
              <div className="text-xs text-slate-500">1:00 PM &mdash; 2:30 PM</div>
              <div className="text-base font-medium text-white mt-1">The Future of Technology</div>
              <div className="text-xs text-slate-400 mt-1">Building Sustainable Cities</div>
            </div>

            <div className="rounded-xl bg-surface800 border border-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 tracking-wider">UPCOMING</span>
                <span className="badge-next">UP NEXT</span>
              </div>
              <div className="text-xs text-slate-500">3:00 PM &mdash; 4:30 PM</div>
              <div className="text-base font-medium text-white mt-1">Creative Economy Dialogue</div>
              <div className="text-xs text-slate-400 mt-1">Unlocking Africa's Creative Potential</div>
            </div>
          </div>
        </section>

        {/* Live session intelligence */}
        <section className="card lg:col-span-7">
          <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
            Live Session Intelligence
          </h2>
          <h3 className="text-2xl font-medium text-white mt-2">
            Plenary: Lagos &mdash; Africa's Global Gateway
          </h3>
          <div className="text-xs text-slate-500 mt-1">Keynote &mdash; Governor Sanwo-Olu</div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Key Insights
            </div>
            {[
              'AI and automation are unlocking productivity across key African industries.',
              'Lagos is emerging as the preferred innovation and investment gateway in West Africa.',
              'Strategic partnerships and talent development are key to scaling digital solutions.',
              'Public-private partnerships will accelerate infrastructure delivery over the next decade.',
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0">
                  <span className="text-xs text-cyan font-semibold">AI</span>
                </div>
                <p className="text-sm text-slate-300 pt-1">{insight}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-6 pt-6 border-t border-white/5">
            <p className="text-base text-white italic leading-relaxed">
              "Lagos is not just keeping up with the future, we are building it for Africa and the world."
            </p>
            <footer className="mt-3 text-xs text-slate-500">
              <strong className="text-slate-400">Dr. Bosun Tijani</strong> &middot; Minister, Communications, Innovation & Digital Economy
            </footer>
          </blockquote>
        </section>
      </div>
    </div>
  )
}
