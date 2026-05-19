

const features =[
    {title : 'Track Everything Live', description: 'Monitor sessions, speakers and activities across your event in real time.'},
    {title : 'Capture Insights Instantly', description: 'Extract key insights, resolutions and signals as conversations happen.'},
    {title : 'Convert Discussions into Data & Structured Outcomes', description: 'Track deals, commitments and follow-ups beyond the event.'},
]

const resultOne = [
    {img : '/pt-icon.png', title: 'Live Programme Tracker', description : 'Real-time view of all sessions, what’s happening now and what’s next.'},
    {img : '/ddt-icon.png', title: 'Deal & Discussions Tracker', description : 'Track, monitor and close investment opportunities in real time.'},
    {img : '/cw-icon.png', title: 'Executive Command View', description : 'View, track and manage all safety and security incidents in real time.'},
    {img : '/pa-icon.png', title: 'Participation Analytics', description : 'Real-time insights on attendance, engagement and session performance'},
]

const resultTwo = [
    {img : '/si-icon.png', title: 'AI-Powered Session Insights', description : 'AI-powered insights and outcomes from summit sessions.'},
    {img : '/cb-icon.png', title: 'Resolution & Commitment Board', description : 'Real-time view of outcomes, commitments and next steps on the platform.'},
    {img : '/as-icon.png', title: 'Security & Alert System', description : 'Real-time monitoring and incident management for a secure summit environment.'},
    {img : '/ir-icon.png', title: 'Post-Event Intelligence Report', description : 'Comprehensive insights and data reports across platform.'},
]

function Welcome() {
  return (
    <div>
        <section className="bg-hero px-20 pt-15 flex flex-col gap-10">
            <div className="flex flex-col gap-6 items-center">
                <div className="border border-pink text-white uppercase text-sm font-inter rounded-full py-2 px-4 font-medium">
                    Real-Time Tracking Platform for High-Level Events
                </div>
                <div className="flex flex-col gap-5 items-center relative py-5">
                    <h1 className="font-anek font-semibold text-white max-w-[40ch] text-5xl text-center leading-15">Turn Your Event Conversations into Measurable Outcomes | In Real Time</h1>
                    <p className="font-inter text-white text-lg text-center max-w-[70ch]">EventsIntel captures live discussions, extracts key insights, tracks investments and discussions signals, and ensures that every high-level engagement delivers tangible results.</p>
                    <img src="./line-left.png" alt="" className="absolute top-0 left-0"/>
                    <img src="./line-right.png" alt="" className="absolute bottom-0 right-0"/>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <button className="rounded-lg bg-white text-blue600 px-10 py-3 text-sm font-inter">See How It Works</button>
                    <button className="rounded-lg bg-pink text-white px-10 py-3 text-sm font-inter">Request a Demo</button>
                </div>
            </div>

            <img src="/screenshot-hero.png" alt="" className=" rounded-t-3xl"/>
        </section>

        <section className="flex flex-col gap-16 py-30 px-20 bg-feature bg-neutral800">
            <div className="relative py-5">
                <h2 className="font-anek font-semibold text-white text-3xl text-center">A New World Class Standard for High-Level Events</h2>
                <img src="./line-left.png" alt="" className="absolute top-0 left-0 w-30"/>
                    <img src="./line-right.png" alt="" className="absolute bottom-0 right-0 w-30"/>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {
                    features.map(({title, description}, i) => <div key={title} className={`flex flex-col w-full border border-white/10 rounded-3xl py-12.5 px-7.5 gap-10 ${
                        i === 1 ? 'bg-pink' : 'bg-neutral900'
                    }`}>
                        <img src={`${
                            i === 1 ? '/robotic-arm-a.png' : '/robotic-arm.png'
                        }`} alt="" className="w-18 h-18"/>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold text-xl font-anek">{title}</h4>
                            <p className="font-inter text-white/70 text-base">{description}</p>
                        </div>
                    </div>)
                }
            </div>
        </section>

        <section className="flex flex-col gap-16 py-30 px-20 bg-feature items-center">
            <div className="relative py-5 flex flex-col gap-5 items-center max-w-xl">
                <h2 className="font-anek font-semibold text-white text-3xl text-center">Live Use Case</h2>
                <p className="text-sm text-white/80 font-inter text-center">EventsIntel provides real-time intelligence at one of Africa’s leading investment summits, tracking  sessions, capturing insights and monitoring investment conversations as they happen.</p>
                <img src="./line-left.png" alt="" className="absolute top-0 left-0 w-40"/>
                    <img src="./line-right.png" alt="" className="absolute bottom-0 right-0 w-40"/>
            </div>
            <img src="/sentiment-screenshot.png" alt="" />
            <p className="text-sm text-white/80 font-inter text-center">Real-time event intelligence + AI insights + discussions tracking + post-event accountability as a single deployable system.</p>
            <img src="/participation-screenshot.png" alt="" />
            <p className="text-sm text-white/80 font-inter text-center max-w-[75ch]">We sit at the centre points of event technology, data analytics and strategic consulting but unlike existing solutions,
we operate in real time and track outcomes beyond the event itself.</p>
            <div className="border-4 border-blue50 rounded-2xl w-full h-125">
                <video src=""></video>
            </div>
        </section>

        <section className="flex flex-col gap-16 py-30 px-20 bg-feature items-center">
            <div className="relative py-5 px-10 flex flex-col gap-5 items-center max-w-2xl">
                <div className="border border-white/30 text-white uppercase text-sm font-inter rounded-full py-2 px-4 font-medium">
                    CORE FEATURES
                </div>
                <h2 className="font-anek font-semibold text-white text-3xl text-center">Built for Results & Decision making</h2>
                <p className="text-lg text-pink font-inter text-center upper">HERE COMES THE GAME CHANGER</p>
                <img src="./line-left.png" alt="" className="absolute top-0 left-0 w-40"/>
                    <img src="./line-right.png" alt="" className="absolute bottom-0 right-0 w-40"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                <div className="flex flex-col gap-10 md:gap-18">
                    {
                        resultOne.map(({img, title, description}) => <div className="flex flex-col gap-6">
                            <img src={img} alt="" className="w-17.5 h-17.5" />
                            <div className="flex flex-col gap-4">
                                <h5 className="font-anek font-bold text-white text-xl">{title}</h5>
                                <p className="text-white/80 font-inter text-sm font-light max-w-[30ch]">{description}</p>
                            </div>
                        </div>)
                    }
                </div>
                <img src="/result-img.png" alt="" className="h-full"/>
                <div className="flex flex-col gap-10 md:gap-18">
{
                        resultTwo.map(({img, title, description}) => <div className="flex flex-col gap-6">
                            <img src={img} alt="" className="w-17.5 h-17.5" />
                            <div className="flex flex-col gap-4">
                                <h5 className="font-anek font-bold text-white text-xl">{title}</h5>
                                <p className="text-white/80 font-inter text-sm font-light max-w-[30ch]">{description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </section>
    </div>
  )
}

export default Welcome