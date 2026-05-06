import DonutChart from "@/components/Doughnut"
import { CircleArrowUp } from "lucide-react"

const kpis = [
  { label: 'Overall Sentiment Score', value: '78 /100', delta: '18% vs Today' },
  { label: 'Total Feedback Received', value: '1,248', delta: '18% vs Today' },
  { label: 'Avg. Session Rating', value: '4.3 /5', delta: '3 New Today' },
  { label: 'Positive Feedback', value: '82%', delta: '6% vs Today' },
  { label: 'Neutral Feedback', value: '12%', delta: '3% vs Today' },
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

    </section>
  )
}

export default SentimentFeedback