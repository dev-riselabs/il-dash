import { CircleArrowUp } from "lucide-react"

const kpis = [
  { label: 'Total Actions', value: '1,245', delta: '18% vs Yesterday' },
  { label: 'Completed', value: '34', delta: '22%' },
  { label: 'In Progress', value: '78', delta: '50%' },
  { label: 'Pending', value: '32', delta: '21%' },
  { label: 'Overdue', value: '12', delta: '7%' },
]

function NextActionTracker() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>NEXT ACTION TRACKER</h1>
        <p className='text-white font-lexend font-light text-xs'>Track commitment, follow-ups and outcomes beyound discussion</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div key={label} className="border border-white/30 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div className={`text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                  idx === 0 ? 'text-cyan' :
                  idx === 1 ? 'text-green' :
                  idx === 2 ? 'text-orange' : 
                  idx === 3 ? 'text-yellow' : 
                  idx === 4 ? 'text-white' : 
                  'text-white'
                }`}>{value}</div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto"><CircleArrowUp color='white' width={'20px'} /> {delta}</div>
          </div>
        ))}
      </div>

      <menu className="flex items-center gap-3">
        <button className="border-b-2 border-b-blue px-10 py-1 text-blue text-sm font-lexend font-medium rounded-lg">ALL ACTIONS</button>
        <button className="px-10 py-1 text-slate100 text-sm font-lexend font-medium">MY ACTIONS</button>
        <button className="px-10 py-1 text-slate100 text-sm font-lexend font-medium">OVERDUE</button>
        <button className="px-10 py-1 text-slate100 text-sm font-lexend font-medium">FOLLOW-UPS</button>
        <button className="px-10 py-1 text-slate100 text-sm font-lexend font-medium">COMMITMENTS</button>
      </menu>

      </section>
  )
}

export default NextActionTracker