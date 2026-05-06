import { CalendarDays, Download, CircleArrowUp } from "lucide-react"
import DonutChart from "@/components/Doughnut"
import AttendanceChart from "@/components/LineChart"
import Rating from "@/components/Rating"

const kpis = [
  { label: 'Total Attendees', value: '1,248', delta: '18% vs Today' },
  { label: 'Unique Attendees', value: '842', delta: '18% vs Today' },
  { label: 'Avg. Session Attedan.', value: '87%', delta: '3 New Today' },
  { label: 'Avg, Time Spent', value: '2h 48m', delta: '3 New Today' },
  { label: 'Engagement Rate', value: '92%', delta: '20% vs yesterday' },
]

const sectors = [
    {title : 'Unlocking Africa’s Infra Future', percent : 96},
    {title : 'Lagos Tech & Innovation Hub', percent : 92},
    {title : 'Financing Sustainable Cities', percent : 88},
    {title : 'Healthcare Investment Outlook', percent : 85},
    {title : 'Energy Transition Dialogue', percent : 83},
    {title : 'Creative Economy Unleashed', percent : 78},
    {title : 'Agri-Business & Food Security', percent : 76},
    {title : 'Blue Economy Opportunities', percent : 72},
]

const ratings = [
    {title : 'Lagos Tech & Innovation Hub', rate : 4.7},
    {title : 'Unlocking Africa’s Infra Future', rate : 4.7},
    {title : 'Financing Sustainable Cities', rate : 4.7},
    {title : 'Healthcare Investment Outlook', rate : 4.7},
    {title : 'Energy Transition Dialogue', rate : 4.7},
]

const speakers = [
    {speaker : 'Dr. Akinwumi Adesina', session : 2, score: 95},
    {speaker : 'Dr. Akinwumi Adesina', session : 2, score: 95},
    {speaker : 'Dr. Akinwumi Adesina', session : 2, score: 95},
    {speaker : 'Dr. Akinwumi Adesina', session : 2, score: 95},
    {speaker : 'Dr. Akinwumi Adesina', session : 2, score: 95},
]

const region = [
    {country : 'Nigeria', percent : 30, color: '#CB3CFF'},
    {country : 'United Kigdom', percent : 20, color: '#7E89AC'},
    {country : 'Canada', percent : 20, color: '#9A91FB'},
    {country : 'Australia', percent : 15, color: '#00C2FF'},
    {country : 'Spain', percent : 15, color: '#D9E1FA'},
]

function ParticipationAnalytics() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>PARTICIPATION ANALYTICS</h1>
        <p className='text-white font-lexend font-light text-xs'>Real-time insights on attendance, engagement and session performance</p>
      </div>

      <div className="flex items-center gap-8 flex-col lg:flex-row">
        <div className="flex items-center gap-4">
            <h3 className="text-white font-lexend text-xs ">Date Range</h3>
            <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1">
            <CalendarDays  className="text-white w-4"/>
             <select name="" id="" className="text-white font-lexend text-xs">
                <option value="">Day 1 (May 10 2026)</option>
                <option value="">Day 2 (May 11 2026)</option>
             </select>
            </div>
        </div>
        <div className="flex items-center gap-4">

        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
        <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All tracks</option>
            <option value="">All tracks</option>
            <option value="">All tracks</option>
        </select>
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
        <Download className="w-4 text-white"/>
        Export Report
          

        </div>

        </div>

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

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AttendanceChart/>
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7 '>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>ATTENDANCE BY TRACK</h4>
            <DonutChart
            data={[
    { label: "Infrastructure", value: 349, color: "#CB3CFF" },
    { label: "Technology", value: 299, color: "#13A13E" },
    { label: "Energy", value: 224, color: "#F66202" },
    { label: "Healthcare", value: 150, color: "#CB3CFF" },
    { label: "Creative Economy", value: 100, color: "#13A13E" },
    { label: "Agriculture", value: 74, color: "#F66202" },
    { label: "Environment", value: 54, color: "#F66202" },
  ]}/>
        </div>

      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-7'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>RESOLUTIONS BY SECTOR</h4>

        <div className='flex flex-col gap-4'>
            {
                sectors.map(({title, percent}) => <div key={title} className='grid grid-cols-12'>
                    <p className='col-span-4 text-white font-dmSans text-sm align-middle'>{title}</p>
                    <div className='col-span-7 flex items-center'>
                        <div className={`rounded-full h-2.5 ${
                           title === 'Unlocking Africa’s Infra Future' ? 'bg-green':
                           title === 'Lagos Tech & Innovation Hub' ? 'bg-yellow' : 'bg-orange'
                        }`} style={{width : `${(percent * 100)/100}%`}}></div>
                    </div>
                    <p className='col-span-1 text-white font-dmSans text-sm flex items-center'>{percent}</p>

                </div>)
            }

        </div>
        
        </div>

        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-5'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>SESSION PERFORMANCE (BY AVG. RATING)</h4>

        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
               {
                ratings.map(({title, rate}) => <div key={title} className="flex items-center gap-2 justify-between">
                    <p className="font-dmSans text-white text-sm">{title}</p>
                    <div className="flex items-center gap-2">
                        <Rating rate={rate}/>
                        <p className="font-dmSans text-white text-sm">{rate}</p>
                    </div>

                </div>)
               }
            </div>

            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">VIEW ALL RATINGS</button>

        </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 lg:col-span-7">
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>TOP SPEAKERS BY ENGAGEMENT</h4>

        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-12 gap-5">
                    <h4 className="font-lexend text-sm text-white col-span-5 font-bold">Speaker</h4>
                    <h4 className="font-lexend text-sm text-white col-span-2 text-center font-bold">Sessions</h4>
                    <h4 className="font-lexend text-sm text-white col-span-5 text-center font-bold">Engagement Score</h4>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        speakers.map(({speaker,session, score }) => <div key={speaker} className="grid grid-cols-12 gap-5">
                            <div className="col-span-5 flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white"></div>
                                <p className="text-white font-lexend text-sm">{speaker}</p>
                            </div>
                            <p className="text-white font-lexend text-sm col-span-2 justify-center flex items-center">{session}</p>
                            <div className="flex items-center gap-2 col-span-5">
                                <div className="w-33 h-2">
                                    <div className="h-1.5 rounded-full bg-green" style={{width : `${(score *100)/100}%`}}></div>
                                </div>
                                <p className="text-white font-lexend text-sm">{score}%</p>

                            </div>
                        </div>)
                    }

                </div>

            </div>

            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">VIEW ALL SPEAKERS</button>
        </div>
        </div>

        <div className="flex flex-col gap-6 col-span-5">
            <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>ATTENDANCE BY TRACK</h4>
            <DonutChart small
            data={[
    { label: "Investors", value: 524, color: "#CB3CFF" },
    { label: "Government", value: 274, color: "#13A13E" },
    { label: "Private Sector", value: 250, color: "#F66202" },
    { label: "SMEs / Startups", value: 125, color: "#CB3CFF" },
    { label: "Other", value: 75, color: "#13A13E" }
  ]}/>
        </div>

        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>BY REGION</h4>

        <div className="flex flex-col gap-3">
            {region.map(({country, color, percent}) => <div key={country} className="flex flex-col gap-1">
                <h4 className="text-neutral100 font-outfit  text-xs">{country}</h4>
                <div className="flex gap-8 justify-between items-center">
                    <div className="flex-1 h-1 rounded-full bg-neutral200">
                        <div className="h-1 rounded-full" style={{width : `${(percent * 100)/100}%`, backgroundColor: `${color}`}}></div>
                    </div>
                    <p className="text-neutral100 font-outfit  text-xs">{percent}%</p>
                </div>
            </div> )}

        </div>
        </div>
        </div>

      </section>

      <section className="grid grid-cols-12 gap-5">
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7'>
           <h4 className='font-dmSans text-white font-medium text-base uppercase'>BY GENDER</h4>
            <DonutChart
            data={[
    { label: "Male", value: 816, color: "#CB3CFF" },
    { label: "Female", value: 424, color: "#13A13E" },
    { label: "Others", value: 12, color: "#F66202" },
  ]}/>
        </div>

        <div className="flex flex-col gap-5 col-span-5">
            <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex gap-4 items-center">
              <div className="w-13.5 h-13.5 rounded-md bg-green400 shrink-0"></div>
              <div className="flex flex-col gap-2">
                <p className="text-white uppercase font-lexend text-sm">NEW ATTENDEES TODAY</p>
                <p className="text-2xl font-bold font-lexend text-green">312</p>
                <p className="font-light text-sm font-lexend text-white">25% of total attendees</p>
              </div>
            </div>

            <div className="border border-white/55 rounded-2xl py-5 px-7.5 flex gap-4 items-center">
              <div className="w-13.5 h-13.5 rounded-md bg-green400 shrink-0"></div>
              <div className="flex flex-col gap-2">
                <p className="text-white uppercase font-lexend text-sm">RETURNING ATTENDEES</p>
                <p className="text-2xl font-bold font-lexend text-green">936</p>
                <p className="font-light text-sm font-lexend text-white">75% of total attendees</p>
              </div>
            </div>
        </div>

      </section>
    </section>
  )
}

export default ParticipationAnalytics