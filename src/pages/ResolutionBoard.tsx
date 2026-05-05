import { CircleArrowUp, CircleCheck } from 'lucide-react'
import DonutChart from '../components/Doughnut'

const kpis = [
  { label: 'Total Resolutions', value: '27', delta: '9 New Today' },
  { label: 'Commitments', value: '15', delta: '6 New Today' },
  { label: 'Partnerships', value: '7', delta: '3 New Today' },
  { label: 'Policy Actions', value: '5', delta: '3 New Today' },
  { label: 'Est. Investment Impact', value: '215.4B', delta: '20% vs yesterday' },
]

const additions = [
    {title : 'Lagos Blue Rail Project - Phase 1', time : '10:20 AM'},
    {title : 'Healthcare Infrastructure Fund Partnership', time : '10:20 AM'},
    {title : 'Off-gride Solar Expansion Initiative', time : '10:20 AM'},
    {title : 'Lagos Fintech City Project', time : '10:20 AM'},
    {title : 'Waste-to-Wealth Partners', time : '10:20 AM'},
]

const sectors = [
    {title : 'Infrastructure', percent : 8},
    {title : 'Technology', percent : 6},
    {title : 'Energy', percent : 4},
    {title : 'Healthcare', percent : 3},
    {title : 'Environment', percent : 2},
    {title : 'Agriculture', percent : 2},
    {title : 'Creative Economy', percent : 2},
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

      <section className='border border-white rounded-2xl px-7.5 py-2.5 flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>LATEST ADDITIONS</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View All</button>
        </div>
        <div className='flex flex-col gap-6'>
            {
                additions.map(({title, time}) => <div key={title} className='flex items-center justify-between gap-3'>
                    <div className='flex items-center text-white font-lexend text-sm'><CircleCheck className='fill-green text-black '/> {title}</div>
                    <div className='text-white font-lexend text-sm'>{time}</div>
                </div>)
            }

        </div>

      </section>

      <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>RESOLUTIONS BY CATEGORY</h4>
        <DonutChart/>
        </div>
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>RESOLUTIONS BY SECTOR</h4>

        <div className='flex flex-col gap-4'>
            {
                sectors.map(({title, percent}) => <div key={title} className='grid grid-cols-12'>
                    <p className='col-span-4 text-white font-dmSans text-sm align-middle'>{title}</p>
                    <div className='col-span-7 flex items-center'>
                        <div className={`rounded-full h-2.5 ${
                           title === 'Infrastructure' ? 'bg-green':
                           title === 'Technology' ? 'bg-yellow' : 'bg-orange'
                        }`} style={{width : `${(percent * 1000)/100}%`}}></div>
                    </div>
                    <p className='col-span-1 text-white font-dmSans text-sm align-middle'>{percent}</p>

                </div>)
            }

        </div>
        
        </div>
      </section>
    </section>
  )
}

export default ResolutionBoard