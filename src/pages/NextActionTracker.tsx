import DonutChart from "@/components/Doughnut"
import { ChevronsLeft, ChevronsRight, CircleArrowUp, Download, ListFilter, Search } from "lucide-react"

const kpis = [
  { label: 'Total Actions', value: '1,245', delta: '18% vs Yesterday' },
  { label: 'Completed', value: '34', delta: '22%' },
  { label: 'In Progress', value: '78', delta: '50%' },
  { label: 'Pending', value: '32', delta: '21%' },
  { label: 'Overdue', value: '12', delta: '7%' },
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

const actions =[
    {title : 'Follow-up with GreenPower Ltd.', date : 'June 9th, 2026 (Tomorrow)', status: 'OVERDUE'},
    {title : 'Share deck with Plug and Play Ventures', date : 'June 8th, 2026 (2 days left)', status: 'HIGH'},
    {title : 'Follow-up with GreenPower Ltd.', date : 'June 7th, 2026 (3 days left)', status: 'MEDIUM'},
]

const actionData = [
    {title: 'Follow-up meeting with Africa Finance', description : 'AI & Innovation Hub', action : 'Commitment', related: 'Africa Finance Corporation', sector: 'Infrastructure', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
    {title: 'Share investor deck with Plug and Play', description : 'Ventures for Lagos Innovation Hub.', action : 'Follow-up', related: 'Plug and Play Ventures', sector: 'Technology', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
    {title: 'Policy review meeting with Ministry of', description : 'Transport on PPP framework.', action : 'Policy', related: 'Ministry of Transport', sector: 'Transport', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
    {title: 'Investor roundtable follow-up schedule', description : 'one-on-one with interested investors.', action : 'Follow-up', related: 'Investors Roundtable', sector: 'Multi-Sector', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
    {title: 'Explore partnership on renewable energy', description : 'project in Lagos.', action : 'Commitment', related: 'GreenPower Ltd.', sector: 'Energy', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
    {title: 'Provide cost-benefit analysis for proposed', description : 'Lekki Deep Sea Port expansion.', action : 'Action Item', related: 'InfraCorp Ltd.', sector: 'Infrastructure', owner: 'Babajide Sanwo-Olu', position: 'Governor, Lagos State', img: '/Babajide-Sanwo-olu 2.png'},
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

      <div className="flex items-center gap-8 flex-col lg:flex-row">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1.5 min-w-80">
        <Search className="w-4 text-white shrink-0"/>
             <input type="search" name="" id="" placeholder="Search actions, partners, sessions..." className="flex-1 text-white text-sm font-lexend outline-none placeholder:text-white"/>
            </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
             <select name="" id="" className="text-white font-lexend text-xs">
                <option value="">All Status</option>
                <option value="">All Status</option>
             </select>
            </div>

            <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
             <select name="" id="" className="text-white font-lexend text-xs">
                <option value="">All Categories</option>
                <option value="">All Categories</option>
             </select>
            </div>

            <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
             <select name="" id="" className="text-white font-lexend text-xs">
                <option value="">All Sectors</option>
                <option value="">All Sectors</option>
             </select>
            </div>

<div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
        <ListFilter className="w-4 text-white"/>
        Filter
          

        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
        <Download className="w-4 text-white"/>
        Export
          

        </div>

      </div>


<section className='border border-white/55 rounded-2xl px-7.5 py-2.5 flex flex-col gap-12'>

    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border border-white/50 rounded-2xl py-6 px-5">
        <h5 className="text-center font-lexend font-light text-white text-sm">ACTION / DESCRIPTION</h5>
        <h5 className="text-center font-lexend font-light text-white text-sm">RELATED TO</h5>
        <h5 className="text-center font-lexend font-light text-white text-sm">SECTOR</h5>
        <h5 className="text-center font-lexend font-light text-white text-sm">OWNER</h5>
        </div>
        <div className="flex flex-col gap-6">
            {actionData.map(({title,description, action, related, owner, position, img, sector}, i) => <div key={i} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className={`${
                        i === 0 ? 'bg-green700' : 
                        i === 2 ? 'bg-orange200' : 
                        i === 1 ? 'bg-purple100' : 
                        i === 3 ? 'bg-green800' : 
                        i === 4 ? 'bg-green900' : 
                        i === 5 ? 'bg-blue200' : 
                        ''
                    } w-12 h-12 rounded-md shrink-0`}></div>
                    <div className="flex flex-col gap-1.5">
                        <h6 className="text-white font-lexend font-light text-sm">{title}</h6>
                        <span className="text-white font-lexend font-light text-sm">{description}</span>
                        <div className={`text-xs text-white font-lexend rounded-md py-1 px-3.5 self-start ${
                            action === 'Commitment' ? 'bg-green500':
                            action === 'Follow-up' ? 'bg-purple200' :
                            action === 'Policy' ? 'bg-brown':
                            action === 'Action Item' ? 'bg-blue200':
                            ''

                        }`}>{action}</div>
                    </div>
                </div>
                <p className="text-white font-lexend font-light text-sm text-center">{related}</p>
                <p className="text-white font-lexend font-light text-sm ">{sector}</p>
                <div className="flex items-center gap-2">
                    <img src={img} alt="" className="w-12.5 h-12.5 rounded-full shrink-0"/>
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-dmSans font-semibold text-sm">{owner}</span>
                        <span className="text-white font-dmSans font-medium text-xs">{position}</span>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
        

        <div className='flex items-center gap-3 justify-between'>
            <div className='flex items-center gap-4 font-lexend text-white text-sm'>
                <p>Showing</p>
                <p>1 to 5 of 120</p>
                <p>deals</p>
            </div>

            <div className='flex gap-3 items-center'>
                <button className='w-5 h-5 border border-white rounded flex items-center justify-center'><ChevronsLeft className='text-white w-3 h-3'/></button>
                <button className='w-5 h-5 border border-white rounded flex items-center justify-center'><ChevronsRight className='text-white w-3 h-3'/></button>
            </div>

        </div>

      </section>

      <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
              <h4 className='font-dmSans text-white font-medium text-base uppercase'>ACTION STATUS OVERVIEWS</h4>
              <DonutChart
        data={[
          { label: "Completed", value: 34, color: "#CB3CFF" },
          { label: "In Progress", value: 78, color: "#13A13E" },
          { label: "Pending", value: 32, color: "#F66202" },
          { label: "Overdue", value: 12, color: "#13A13E" },
        ]}
      />
              </div>
              <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
              <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>ACTIONS BY SECTOR</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View full</button>
        </div>
      
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

            <section  className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>ACTIONS BY SECTOR</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View full</button>
        </div>

        <div className="flex flex-col gap-9">
            {
                actions.map(({title, date, status},i) => <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-blue100"></div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-sm font-lexend font-light text-white">{title}</h5>
                            <span className={`${status.toLowerCase() === 'overdue' ? 'text-red100' : 'text-slate100'} font-lexend font-light text-xs`}>{date}</span>
                        </div>
                        
                    </div>
                    <div className={`py-1.25 px-3.75 rounded-md border uppercase font-dmSans text-xs ${status.toLowerCase() === 'overdue' ? 'border-red100 bg-transparent text-red100' : 'text-yellow200 border-yellow200 bg-yellow100'}`}>{status}</div>
                </div>)
            }
        </div>

            </section>

      </section>
  )
}

export default NextActionTracker