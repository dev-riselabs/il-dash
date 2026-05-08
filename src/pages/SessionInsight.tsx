import DonutChart from "@/components/Doughnut"
import { CalendarDays, CircleCheck, Clock, Download, MapPin, Sparkles } from "lucide-react"

const sectors = [
    {title : 'Excellent', percent : 61},
    {title : 'Good', percent : 24},
    {title : 'Fair', percent : 6},
    {title : 'Poor', percent : 2},
]

const resources =[
    {resource : 'Session Agenda', type: 'PDF'},
    {resource : 'Presentation Slides', type: 'PPTX'},
    {resource : 'Speakers List', type: 'PDF'},
    {resource : 'Photo', type: 'ZIP'},
]

const quotes = [
    {quote : '“Lagos is not just open for investment, we are open for transformational partnerships.”', name: 'Babajide Sanwo-Olu', state: 'Governor, Lagos State', img: '/img1.jpg'},
     {quote : '“Lagos is not just open for investment, we are open for transformational partnerships.”', name: 'Babajide Sanwo-Olu', state: 'Governor, Lagos State', img: '/img2.jpg'},
      {quote : '“Lagos is not just open for investment, we are open for transformational partnerships.”', name: 'Babajide Sanwo-Olu', state: 'Governor, Lagos State', img: '/img3.jpg'},
]

const signals = [
    {signal : 'High confidence signals', value: 2},
    {signal : 'Medium confidence signals', value: 1},
]

function SessionInsight() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>SESSION INSIGHTS</h1>
        <p className='text-white font-lexend font-light text-xs'>AI-powered insights and outcomes from summit sessions.</p>
      </div>

      <div className="flex items-center gap-8 flex-col lg:flex-row">
        <div className="flex items-center gap-4">
            <h3 className="text-white font-lexend text-xs ">Select Session:</h3>
            <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
             <select name="" id="" className="text-white font-lexend text-xs">
                <option value="">Unlocking Africa’s Infrastructure Future</option>
                <option value="">Unlocking Africa’s Infrastructure Future</option>
             </select>
            </div>
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1 text-white font-lexend text-xs">
        <Download className="w-4 text-white"/>
        Download Full Report
          

        </div>

      </div>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4">
            <img src="/insight.jpg" alt="" className="rounded-2xl h-full"/>
         </div>

         <div className="lg:col-span-8 flex flex-col gap-5">
            <h5 className="text-xs font-light text-cyan font-lexend">PLENARY SESSION</h5>
            <h4 className="text-2xl font-lexend text-white font-bold">Unlocking Africa’s Infrastructure Future</h4>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-white font-lexend text-xs">
                    <CalendarDays className="w-4 text-white"/>
                    May 8, 2026
                </div>
                <div className="flex items-center gap-1.5 text-white font-lexend text-xs">
                    <Clock className="w-4 text-white"/>
                    09:30 AM - 11:00 AM
                </div>
                <div className="flex items-center gap-1.5 text-white font-lexend text-xs">
                    <MapPin className="w-4 text-white"/>
                    Main Hall
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-white bg-green600 font-medium py-2 px-5 rounded-md font-lexend text-sm">Infrastructure</div>
                <div className="text-white bg-green600 font-medium py-2 px-5 rounded-md font-lexend text-sm">Policy & Regulation</div>
                <div className="text-white bg-green600 font-medium py-2 px-5 rounded-md font-lexend text-sm">Public-Private Partnership</div>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex flex-col gap-3">
                    <h5 className="text-white font-lexend text-base">Session Status</h5>
                    <div className="flex items-start gap-2">
                        <CircleCheck className="fill-green text-black w-6"/>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-green font-lexend">Completed </span>
                            <span className="text-sm text-white font-lexend">(Ended: 1h 24m ago)</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h5 className="text-white font-lexend text-base">Speaker</h5>
                    <div className="flex items-start gap-2">
                        <div className="w-12.5 h-12.5 rounded-full bg-white"></div>
                        <div className="flex flex-col gap-2">
                            <span className="text-base text-white font-semibold font-dmSans">Adesola Ogunleye </span>
                            <span className="text-sm text-white font-medium font-dmSans">Lagos State Ministry of E&T</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>

      </section>

      <menu className="flex items-center gap-3 justify-between">
        <button className="border-b-2 border-b-orange px-3 py-1 text-orange text-sm font-lexend font-medium rounded-lg">OVERVIEW</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">INSIGHTS</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">QUOTES</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">RESOLUTIONS</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">INVESTMENT SIGNALS</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">SETIMENT</button>
        <button className="px-3 py-1 text-slate100 text-sm font-lexend font-medium">NOTES & TRANSCRIPT</button>
      </menu>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 flex flex-col gap-5">
            <div className='border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5'>
        <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>KEY INSIGHTS (AI)</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View All</button>
        </div>
        {[
              'Africa’s infrastructure gap presents a 100B annual funding need, with Lagos positioned as a leading investment destination.',
              'Public-private partnerships (PPPs) remain critical to closing the infrastructure deficit and accelerating project delivery.',
              'Regulatory harmonization and policy stability were identified as key drivers for attracting long-term global capital. ',
              'Digital infrastructure and smart city solutions are emerging as high-impact priority areas for investors.',
              'Local capacity building and job creation must be integrated into all major infrastructure projects.'
            ].map((insight, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles color='white' width={'20px'}/>
                </div>
                <p className="text-base text-white font-lexend">{insight}</p>
              </div>
            ))}
        </div>

        <div className='border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5'>
        <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>RESOLUTIONS & COMMITMENTS</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View All</button>
        </div>
        {[
              {insight : 'Lagos State Government to fast-track the infrastructure PPP Framework review by Q4 2026.', commitment : 'Commitment by Lagos State Government'},
              {insight : 'AFDB to support the development of a Lagos infrastructure Pipeline and Project Preparation Fund.', commitment : 'Commitment by African Development Bank'},
              {insight : 'Private investors commit to explore co-investment opportunities in Lagos transport and energy projects.', commitment : 'Commitment by Private Sector'},
              {insight : 'Establishment of an infrastructure Investors Roundtable to meet bi-annually.', commitment : 'Commitment by All Stakeholders'},
            ].map(({insight, commitment}, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 border border-red100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles color='white' width={'20px'}/>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-base text-white font-lexend">{insight}</p>
                    <span className="text-xs text-white/55 font-lexend">{commitment}</span>
                </div>
                
              </div>
            ))}
        </div>

        <div className="border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5">
             <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>RESOLUTIONS & COMMITMENTS</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View All</button>
        </div>
        <div className="flex flex-col gap-9">
            <div className="flex items-center gap-3">
                <div className="w-13.5 h-13.5 rounded-md bg-green400"></div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-white font-semibold text-xl font-lexend">312</h4>
                    <span className="text-white font-lexend text-sm font-light">Total Attendees</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h4 className="text-white font-semibold text-xl font-lexend">300</h4>
                    <span className="text-white font-lexend text-sm font-light">In-Person</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <h4 className="text-white font-semibold text-xl font-lexend">12</h4>
                    <span className="text-white font-lexend text-sm font-light">Virtual</span>
                </div>
            </div>

        </div>

        </div>

        <div className="border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5">
            <h4 className='font-dmSans text-white font-medium text-base uppercase'>LIVE FEEDBACK SUMMARY</h4>
            <div className="flex flex-col gap-1">
                <div className="flex items-end gap-1 font-lexend font-semibold text-white">
                    <span className="text-3xl">4.6 </span>
                    <span className="text-base">/5</span>
                </div>
                <span className="text-white font-dmSans text-base">Average Rating</span>
            </div>
            <div className='flex flex-col gap-4'>
            {
                sectors.map(({title, percent}) => <div key={title} className='grid grid-cols-12 gap-4'>
                    <p className='col-span-4 text-white font-dmSans text-sm align-middle'>{title}</p>
                    <div className='col-span-7 flex items-center'>
                        <div className={`rounded-full h-2.5 ${
                           title === 'Excellent' ? 'bg-green':
                           title === 'Good' ? 'bg-yellow' : 'bg-orange'
                        }`} style={{width : `${(percent * 1000)/100}%`}}></div>
                    </div>
                    <p className='col-span-1 text-white font-dmSans text-sm align-middle'>{percent}</p>

                </div>)
            }

        </div>

        </div>

        <div className="border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5">
            <h4 className='font-dmSans text-white font-medium text-base uppercase'>SESSION RESOURCES</h4>
            <div className="flex flex-col gap-8">
                {
                    resources.map(({resource, type})=> <div key={resource} className="flex items-center justify-between border border-white rounded-xl px-4 py-5">
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full bg-green100"></div>
                            <h6 className="text-white text-base font-inter">{resource}</h6>
                        </div>
                        <p className="text-white text-base font-inter">{type}</p>
                    </div>)
                }
            </div>

        </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-5">
        <div className="border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5">
             <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>KEY QUOTES</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>View all quotes</button>
        </div>
        <div className="flex flex-col gap-7 divide-y divide-white">
            {
                quotes.map(({quote, img, name, state}, i)=> <div key={i} className="pb-6 flex flex-col gap-4">
                    <p className="text-white font-lexend text-base">{quote}</p>
                    <div className="flex items-center gap-2">
                        <img src={img} alt="" className="w-12.5 h-12.5 rounded-full object-fill" />
                        <div className="flex flex-col gap-2">
                            <h5 className="font-dmSans text-base text-white font-bold">{name}</h5>
                            <p className="font-dmSans text-sm text-white font-medium">{state}</p>

                        </div>
                    </div>
                </div>)
            }
        </div>
        </div>

        <div className="border border-white rounded-2xl px-7.5 py-5 flex flex-col gap-7.5">
             <div className='flex items-center justify-between gap-3'>
            <h4 className='text-white font-medium uppercase text-base font-lexend'>INVESTMENT SIGNALS</h4>
            <button className='text-cyan font-semibold font-lexend text-base'>3</button>
        </div>

        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4"> 
                <div className="flex flex-col mx-auto gap-2">
                    <p className="text-green font-lexend font-semibold text-2xl">68.7B</p>
                    <p className="text-white font-lexend text-base">Total estimated value</p>
                </div>
                <div className="flex flex-col gap-4">
                    {signals.map(({signal, value},i) => <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${
                                i === 0 ? 'bg-green' :
                                i === 1 ? 'bg-yellow' :
                                'bg-red'
                            }`}></div>
                            <p className="text-xs font-inter text-white">{signal}</p>
                        </div>
                        <p className="text-xs font-inter text-white">{value}</p>
                    </div>)}
                </div>
            </div>

            <button className="border border-white/55 rounded-2xl py-2.5 px-7.5 font-rubik uppercase text-white text-sm">VIEW ALL SIGNALS</button>

        </div>
        </div>

        <div className='border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6'>
                <h4 className='font-dmSans text-white font-medium text-base uppercase'>TOP SECTORS MENTIONED</h4>
                    <DonutChart small
                    data={[
            { label: "Energy", value: 135, color: "#CB3CFF" },
            { label: "Infrastructure", value: 70, color: "#13A13E" },
            { label: "Technology", value: 48, color: "#F66202" },
            { label: "Transport", value: 38, color: "#CB3CFF" },
            { label: "Other", value: 33, color: "#13A13E" }
          ]}/>
                </div>

        
        </div>
      </section>

    </section>
  )
}

export default SessionInsight