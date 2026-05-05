import { CircleArrowUp } from 'lucide-react'

const kpis = [
  { label: 'Total Investment Signals', value: '215.6B', delta: '15% vs yesterday' },
  { label: 'Numbers of Sector', value: '6', delta: 'Live Now' },
  { label: 'Active Investors', value: '12', delta: '20% vs yesterday' },
]

const sectors = [
    {title : 'Technology & Innovation', percent : 96, value: '62.5B', trend: '82%'},
    {title : 'Infrastructure', percent : 96, value: '62.5B', trend: '82%'},
    {title : 'Energy', percent : 96, value: '62.5B', trend: '82%'},
    {title : 'Healthcare', percent : 96, value: '62.5B', trend: '82%'},
    {title : 'Agriculture', percent : 96, value: '62.5B', trend: '82%'},
    {title : 'Creative Economy', percent : 96, value: '62.5B', trend: '82%'},
]

function InvestmentHeatmap() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>INVESTMENT HEATMAP</h1>
        <p className='text-white font-lexend font-light text-xs'>Real-time view of investment interest across sectors and locations.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div key={label} className="border border-white/30 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div className={`text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                  idx === 0 ? 'text-cyan' :
                  idx === 1 ? 'text-green' :
                  idx === 2 ? 'text-orange' : 
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

      <section className='border border-white/55 rounded-2xl py-5 px-5 lg:px-7.5 flex flex-col gap-5'>
       <div className='flex items-center justify-between gap-3'>
        <h4 className='text-white font-dmSans font-medium text-base uppercase'>TOP SECTORS BY INVESTMENT INTEREST</h4>
        <button className='bg-white rounded px-7.5 py-2.5 font-rubik text-black text-sm'>VIEW ALL SECTORS</button>
       </div>

       <section className='flex flex-col gap-6'>
            <div className='grid grid-cols-4 gap-4'>
                <div className='text-sm font-lexend font-medium text-white uppercase'>SECTOR</div>
                <div className='text-sm font-lexend font-medium text-white uppercase text-center'>SECTOR</div>
                <div className='text-sm font-lexend font-medium text-white uppercase text-center'>EST. VALUE (N)</div>
                <div className='text-sm font-lexend font-medium text-white uppercase text-center'>TREND</div>
            </div>

        <div className='flex flex-col gap-5'>
            {
                sectors.map(({title, value, percent, trend}) => <div key={title} className='grid grid-cols-4 gap-4'>
                    <div className='flex items-center gap-2 text-white font-lexend text-sm'> <div className={`w-7.5 h-7.5 rounded
                        ${
                            title === 'Technology & Innovation' ? 'bg-red' :
                            title === 'Infrastructure' ? 'bg-orange' :
                            title === 'Energy' ? 'bg-green' :
                            title === 'Healthcare' ? 'bg-mint' :
                            title === 'Agriculture' ? 'bg-blue' :
                            'bg-indigo'
                        }
                        `}></div> {title}</div>
                    <div className='text-white font-lexend text-sm text-center'>{percent}</div> 
                    <div className='text-white font-lexend text-sm text-center'>{value}</div>   
                    <div className='flex items-center gap-2 text-white font-lexend text-sm justify-center'> <CircleArrowUp className='w-5 fill-white text-black'/>{trend}</div>
                </div>)
            }
        </div>
       </section>
      </section>

    </section>
  )
}

export default InvestmentHeatmap