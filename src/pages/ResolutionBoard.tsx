import { CircleArrowUp } from 'lucide-react'

const kpis = [
  { label: 'Total Resolutions', value: '27', delta: '9 New Today' },
  { label: 'Commitments', value: '15', delta: '6 New Today' },
  { label: 'Partnerships', value: '7', delta: '3 New Today' },
  { label: 'Policy Actions', value: '5', delta: '3 New Today' },
  { label: 'Est. Investment Impact', value: '215.4B', delta: '20% vs yesterday' },
]


function ResolutionBoard() {
  return (
    <section className="space-y-6">
         <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>INVESTMENT HEATMAP</h1>
        <p className='text-white font-lexend font-light text-xs'>Real-time view of investment interest across sectors and locations.</p>
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
                  idx === 4 ? 'text-green' : 
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
    </section>
  )
}

export default ResolutionBoard