import DonutChart from "@/components/Doughnut"
import Rating from "@/components/Rating"
import { CircleArrowUp } from "lucide-react"

const kpis = [
  { label: 'Overall Sentiment Score', value: '78 /100', delta: '18% vs Today' },
  { label: 'Total Feedback Received', value: '1,248', delta: '18% vs Today' },
  { label: 'Avg. Session Rating', value: '4.3 /5', delta: '3 New Today' },
  { label: 'Positive Feedback', value: '82%', delta: '6% vs Today' },
  { label: 'Neutral Feedback', value: '12%', delta: '3% vs Today' },
]

const sectorOne = [
    {title : 'Unlocking Africa’s Infra Future', percent : 84},
    {title : 'Lagos Tech & Innovation Hub', percent : 81},
    {title : 'Financing Sustainable Cities', percent : 77},
    {title : 'Healthcare Investment Outlook', percent : 74},
    {title : 'Energy Transition Dialogue', percent : 73},
    {title : 'Creative Economy Unleashed', percent : 71},
    {title : 'Agri-Business & Food Security', percent : 69},
    {title : 'Blue Economy Opportunities', percent : 65},
]

const sectorTwo = [
    {title : 'Content Relevance', percent : 45},
    {title : 'Speakers Quality', percent : 44},
    {title : 'Session Organization', percent : 43},
    {title : 'Venue & Logistics', percent : 41},
    {title : 'Networking Opportunities', percent : 40},
    {title : 'Overall Experience ', percent : 43},
]

const additions = [
    {name: 'Tunde Elegbede', review: 'Very insightful session. Great Speakers!', rate: 5, time:'10:23 AM', label: 'Positive'},
    {name: 'Aisha Mohammed', review: 'Great session, but more case studies would be helpful.', rate: 4, time:'10:23 AM', label: 'Positive'},
    {name: 'John Adeyemi', review: 'Excellent discussion on energy transition. Very relevant.', rate: 5, time:'10:23 AM', label: 'Positive'},
    {name: 'Chinedu Okafor', review: 'To much theory, not enough practical solutions.', rate: 5, time:'10:23 AM', label: 'Positive'},
    {name: 'Ngozi Mbatha', review: 'Amazing insights! Looking forward to collaborations.', rate: 5, time:'10:23 AM', label: 'Positive'},
]

function SentimentFeedback() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>SENTIMENT & FEEDBACK</h1>
        <p className='text-white font-lexend font-light text-xs'>Real-time audience sentiment, feedback and session ratings</p>
      </div>

      <div className="flex items-center gap-8 flex-col lg:flex-row">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
        <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Sessions</option>
            <option value="">All Sessions</option>
            <option value="">All Sessions</option>
        </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
        <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All tracks</option>
            <option value="">All tracks</option>
            <option value="">All tracks</option>
        </select>
        </div>
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
        <select name="" id="" className="text-white font-lexend text-xs">
            <option value="">All Days</option>
            <option value="">All Days</option>
            <option value="">All Days</option>
        </select>
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
                  idx === 4 ? 'text-red' : 
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

      <section className="grid grid-cols-12 gap-5">
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7 '>
                <h4 className='font-dmSans text-white font-medium text-base uppercase'>ATTENDANCE BY TRACK</h4>
                    <DonutChart
                    data={[
                            { label: "Infrastructure", value: 82, color: "#CB3CFF" },
                            { label: "Technology", value: 80, color: "#13A13E" },
                            { label: "Energy", value: 76, color: "#F66202" },
                            { label: "Healthcare", value: 74, color: "#CB3CFF" },
                            { label: "Creative Economy", value: 72, color: "#13A13E" },
                            { label: "Agriculture", value: 70, color: "#F66202" },
                            { label: "Other", value: 68, color: "#F66202" },
                        ]}/>
                </div>

                <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-5 '>
                        <h4 className='font-dmSans text-white font-medium text-base uppercase'>FEEDBACK CHANNELS</h4>
                            <DonutChart small
                            data={[
                                { label: "QR Feedback", value: 862, color: "#CB3CFF" },
                                { label: " Mobile App", value: 276, color: "#13A13E" },
                                { label: "Website", value: 78, color: "#F66202" },
                                { label: "Other", value: 32, color: "#CB3CFF" },
                  ]}/>
                        </div>

      </section>
      <section className="grid grid-cols-12 gap-5">
        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-7'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>SESSION SENTIMENT SCORES</h4>

        <div className='flex flex-col gap-4'>
            {
                sectorOne.map(({title, percent}, i) => <div key={title} className='grid grid-cols-12 gap-2'>
                    <p className='col-span-4 text-white font-dmSans text-xs align-middle'>{title}</p>
                    <div className='col-span-7 flex items-center'>
                        <div className={`rounded-full h-2.5 ${
                           sectorOne.length - 1 === i ? 'bg-red':
                           sectorOne.length - 2 === i ? 'bg-red':
                           'bg-green' 
                        }`} style={{width : `${(percent * 100)/100}%`}}></div>
                    </div>
                    <p className='col-span-1 text-white font-dmSans text-sm flex items-center justify-center'>{percent}%</p>

                </div>)
            }

        </div>
        
        </div>

        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 col-span-5'>
        <h4 className='font-dmSans text-white font-medium text-base uppercase'>RESOLUTIONS BY SECTOR</h4>

        <div className='flex flex-col gap-4'>
            {
                sectorTwo.map(({title, percent}) => <div key={title} className='grid grid-cols-12 gap-2'>
                    <p className='col-span-4 text-white font-dmSans text-sm align-middle'>{title}</p>
                    <div className='col-span-7 flex items-center'>
                        <div className={`rounded-full h-2.5 bg-green`} style={{width : `${(percent * 100)/100}%`}}></div>
                    </div>
                    <p className='col-span-1 text-white font-dmSans text-sm flex items-center justify-center'>{percent/10}</p>

                </div>)
            }

        </div>
        
        </div>

      </section>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6">
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-base font-lexend text-white font-medium uppercase">LATEST ADDITIONS</h4>
        <button className="text-base font-lexend text-cyan font-semibold">View All</button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
            {
                additions.map(({name, review, rate, time, label}) => <div key={name} className="border-b border-b-white pb-7.5 flex items-center justify-between">
                    <div className="flex items-start gap-2.5">
                        <div className="bg-white h-12.5 w-12.5 rounded-full"></div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-bold font-dmSans text-sm">{name}</p>
                            <Rating rate={rate}/>
                            <p className="text-white font-medium font-dmSans text-xs">{review}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                        <p className="font-dmSans text-white text-sm font-medium">{time}</p>
                        <div className="bg-green500 py-1 px-3.5 font-dmSans text-white text-sm font-medium rounded-md flex items-center justify-center">{label}</div>
                    </div>
                </div>)
            }
        </div>
        <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">SUBMIT FEEDBACK</button>
      </div>

      </section>

    </section>
  )
}

export default SentimentFeedback