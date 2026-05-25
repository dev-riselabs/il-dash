import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Track Everything Live",
    description:
      "Monitor sessions, speakers and activities across your event in real time.",
  },
  {
    title: "Capture Insights Instantly",
    description:
      "Extract key insights, resolutions and signals as conversations happen.",
  },
  {
    title: "Convert Discussions into Data & Structured Outcomes",
    description: "Track deals, commitments and follow-ups beyond the event.",
  },
];

const resultOne = [
  {
    img: "/pt-icon.png",
    title: "Live Programme Tracker",
    description:
      "Real-time view of all sessions, what’s happening now and what’s next.",
  },
  {
    img: "/ddt-icon.png",
    title: "Deal & Discussions Tracker",
    description:
      "Track, monitor and close investment opportunities in real time.",
  },
  {
    img: "/cw-icon.png",
    title: "Executive Command View",
    description:
      "View, track and manage all safety and security incidents in real time.",
  },
  {
    img: "/pa-icon.png",
    title: "Participation Analytics",
    description:
      "Real-time insights on attendance, engagement and session performance",
  },
];

const resultTwo = [
  {
    img: "/si-icon.png",
    title: "AI-Powered Session Insights",
    description: "AI-powered insights and outcomes from summit sessions.",
  },
  {
    img: "/cb-icon.png",
    title: "Resolution & Commitment Board",
    description:
      "Real-time view of outcomes, commitments and next steps on the platform.",
  },
  {
    img: "/as-icon.png",
    title: "Security & Alert System",
    description:
      "Real-time monitoring and incident management for a secure summit environment.",
  },
  {
    img: "/ir-icon.png",
    title: "Post-Event Intelligence Report",
    description: "Comprehensive insights and data reports across platform.",
  },
];

const designs = [
  "Innovation Events, Government Summits, Corporate Organizations especially Financial Institutions & Economic Forums",
  "Investment Conferences & Promotion Agencies",
  "Elections & Political Conventions",
  "Security & Emergency Coordination Events",
  "Diplomatic Engagements, Trade Missions & Bilateral Forums",
  "Corporate AGMs, Stock Exchanges, Development Sector Conferences, Pan-African & International Institutional Convenings",
];

const works= [
    'Deploy (Captures audio, video, registrations, APIs and live feeds)',
    'Intelligence (AI summaries, signals, alerts, analytics and insights)',
    'Validation (Human approvals, monitoring teams, escalations and verification)',
    'Outcome (Reports commitments, accountability tracking and measurable results)'
]

function Welcome() {
  return (
    <div>
      <section className="bg-hero px-4 mdpx-10 lg:px-20 pt-15 flex flex-col gap-10">
        <div className="flex flex-col gap-6 items-center">
          <div className="border border-pink text-white uppercase text-[10px] md:text-sm font-inter rounded-full py-2 px-4 font-medium">
            Real-Time Tracking Platform for High-Level Events
          </div>
          <div className="flex flex-col gap-5 items-center relative py-5">
            <h1 className="font-anek font-semibold text-white max-w-[30ch] text-3xl md:text-5xl text-center leading-10 md:leading-15">
              Turn Your Event Conversations into Measurable Outcomes | In Real
              Time
            </h1>
            <p className="font-inter text-white text-base md:text-lg text-center max-w-[70ch]">
              EventsIntel captures live discussions, extracts key insights,
              tracks investments and discussions signals, and ensures that every
              high-level engagement delivers tangible results.
            </p>
            <img
              src="./line-left.png"
              alt=""
              className="absolute top-0 -left-2 md:left-0"
            />
            <img
              src="./line-right.png"
              alt=""
              className="absolute bottom-0 -right-4 md:right-0"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5">
            <a href="#how-it-works" className="rounded-lg bg-white text-blue600 px-10 py-3 text-sm font-inter hover:bg-white/95 transition-all">
              See How It Works
            </a>
            <Link to='/demo-form' className="rounded-lg bg-pink text-white px-10 py-3 text-sm font-inter hover:bg-pink/90 transition-all">
              Request a Demo
            </Link>
          </div>
        </div>

        <img src="/screenshot-hero.png" alt="" className="" />
      </section>

      <section className="flex flex-col gap-16 py-15 md:py-30 px-4 md:px-10 lg:px-20 bg-feature bg-neutral800">
        <div className="relative py-5">
          <h2 className="font-anek font-semibold text-white text-3xl text-center">
            A New World Class Standard for High-Level Events
          </h2>
          <img
            src="./line-left.png"
            alt=""
            className="absolute top-0 -left-2 md:left-0 w-30"
          />
          <img
            src="./line-right.png"
            alt=""
            className="absolute bottom-0 -right-3 md:right-0 w-30"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {features.map(({ title, description }, i) => (
            <div
              key={title}
              className={`flex flex-col w-full border border-white/10 rounded-3xl py-12.5 px-5 md:px-7.5 gap-10 ${
                i === 1 ? "bg-pink" : "bg-neutral900"
              }`}
            >
              <img
                src={`${i === 1 ? "/robotic-arm-a.png" : "/robotic-arm.png"}`}
                alt=""
                className="w-15 md:w-18 h-15 md:h-18"
              />
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-bold text-xl font-anek">
                  {title}
                </h4>
                <p className="font-inter text-white/70 text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-10 md:gap-16 py-15 md:py-30 px-4 md:px-10 lg:px-20 bg-feature items-center">
        <div className="relative py-5 flex flex-col gap-5 items-center md:max-w-xl">
          <h2 className="font-anek font-semibold text-white text-2xl md:text-3xl text-center">
            Live Use Case
          </h2>
          <p className="text-sm text-white/80 font-inter text-center">
            EventsIntel provides real-time intelligence at one of Africa’s
            leading investment summits, tracking sessions, capturing insights
            and monitoring investment conversations as they happen.
          </p>
          <img
            src="./line-left.png"
            alt=""
            className="absolute top-0 -left-2 md:left-0 w-40"
          />
          <img
            src="./line-right.png"
            alt=""
            className="absolute bottom-0 -right-4 md:right-0 w-40"
          />
        </div>
        <img src="/sentiment-screenshot.png" alt="" />
        <p className="text-sm text-white/80 font-inter text-center">
          Real-time event intelligence + AI insights + discussions tracking +
          post-event accountability as a single deployable system.
        </p>
        <img src="/participation-screenshot.png" alt="" />
        <p className="text-sm text-white/80 font-inter text-center max-w-[75ch]">
          We sit at the centre points of event technology, data analytics and
          strategic consulting but unlike existing solutions, we operate in real
          time and track outcomes beyond the event itself.
        </p>
        <div className="border-4 border-blue50 rounded-2xl w-full h-125">
          <video></video>
        </div>
      </section>

      <section className="flex flex-col gap-16 py-15 md:py-30 px-4 md:px-10 lg:px-20 bg-feature items-center">
        <div className="relative py-5 px-10 flex flex-col gap-4 md:gap-5 items-center max-w-2xl">
          <div className="border border-white/30 text-white uppercase text-xs md:text-sm font-inter rounded-full py-2 px-4 font-medium">
            CORE FEATURES
          </div>
          <h2 className="font-anek font-semibold text-white text-2xl md:text-3xl text-center">
            Built for Results & Decision making
          </h2>
          <p className="text-base md:text-lg text-pink font-inter text-center upper">
            HERE COMES THE GAME CHANGER
          </p>
          <img
            src="./line-left.png"
            alt=""
            className="absolute top-0 left-0 w-40"
          />
          <img
            src="./line-right.png"
            alt=""
            className="absolute bottom-0 right-0 w-40"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-7 md:gap-18">
            {resultOne.map(({ img, title, description }) => (
              <div key={title} className="flex flex-col gap-6">
                <img src={img} alt="" className="w-10 h-10 lg:w-17.5 lg:h-17.5" />
                <div className="flex flex-col gap-4">
                  <h5 className="font-anek font-bold text-white text-xl">
                    {title}
                  </h5>
                  <p className="text-white/80 font-inter text-sm font-light max-w-[50ch] md:max-w-[30ch]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <img src="/result-img.png" alt="" className="h-full w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-7 md:gap-18">
            {resultTwo.map(({ img, title, description }) => (
              <div key={title} className="flex flex-col gap-6">
                <img src={img} alt="" className="w-10 h-10 lg:w-17.5 lg:h-17.5" />
                <div className="flex flex-col gap-4">
                  <h5 className="font-anek font-bold text-white text-xl">
                    {title}
                  </h5>
                  <p className="text-white/80 font-inter text-sm font-light max-w-[50ch] md:max-w-[30ch]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-7 md:flex-row md:items-end md:gap-10 lg:gap-20 pt-10 md:py-10 md:pl-10 lg:pl-20 md:pb-0 bg-cyan100">
        <div className="flex flex-col gap-6 md:pb-10 md:flex-1 px-4 md:px-0">
          <h3 className="text-white font-anek font-semibold text-3xl lg:text-4xl">
            Most Events End in talk. Photos & Videos. Heavy Reports people
            rarely read. then the end. We Delivers Actionable Outcomes.{" "}
          </h3>
          <p className="text-white/80 font-inter text-sm md:text-base">
            High-level events often generate important discussions but lack
            structured follow-through. EventsIntel bridges that gap by
            transforming conversations into actionable intelligence and
            measurable impact.
          </p>
        </div>
        <div className="md:flex-1 pl-4 md:pl-0 ">
          <img src="/next-action-screenshot.png" alt="" className="w-full h-full"/>
        </div>
        
      </section>

      <section className="bg-blue150 px-4 gap-6 md:px-10 lg:px-20 py-10 md:py-20 flex flex-col lg:flex-row lg:items-center lg:gap-10">
        <img src="/built-img.png" alt="" className="max-h-150" />
        <div className="flex flex-col gap-6">
          <h5 className="uppercase font-inter text-base md:text-lg font-semibold text-pink">
            WHO WE BUILT THIS FOR
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold font-anek text-white">
            Designed for Leaders and Institutions
          </h4>
          <div className="flex flex-col gap-4">
            {designs.map((design) => (
              <div
                key={design}
                className="p-4 border border-white rounded-2xl flex items-center gap-4"
              >
                <div className="shrink-0 w-9 md:w-12 h-9 md:h-12 rounded-md bg-white flex items-center justify-center">
                  <FaRegTrashAlt className="w-5 md:w-6 h-5 md:h-6 text-black" />
                </div>
                <p className="text-white/80 font-inter text-sm md:text-lg">{design}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='how-it-works' className="flex flex-col gap-16 py-15 md:py-30 px-4 md:px-10 lg:px-20 bg-feature items-center">
        <div className="relative py-5 px-10 flex flex-col gap-2 items-center max-w-3xl">
          <p className="text-sm md;text-lg text-pink font-inter font-bold text-center uppercase">
            HOW IT WORKS
          </p>
          <h2 className="font-anek font-semibold text-white text-2xl md:text-3xl text-center leading-9 md:leading-14 capitalize">
            Simple. Fast. Immediately <br />
            elevates your Corporate Event to Global Levels
          </h2>
          <img
            src="./line-left.png"
            alt=""
            className="absolute top-0 left-0 w-40"
          />
          <img
            src="./line-right.png"
            alt=""
            className="absolute bottom-0 right-0 w-40"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {
                works.map((work,i) => <div key={work} className={`border border-white/30 rounded-2xl py-8 md:py-12.5 px-7.5 flex flex-col gap-7 md:gap-10 self-stretch ${
                    i === 0 ? 'bg-cyan' :
                    i === 1 ? 'bg-pink' :
                    i === 2 ? 'bg-brown700' :
                    'bg-blue700'
                }`}>
                    <div className="w-10 h-10 flex items-center justify-center text-white font-mono text-4xl font-semibold">{i + 1}</div>
                    <p className="text-xl md:text-2xl font-bold text-white font-anek">{work}</p>
                </div>)
            }

        </div>
      </section>

      <section className="flex flex-col gap-7 md:flex-row md:items-center md:gap-10 lg:gap-20 pt-10 md:py-10 md:pl-10 lg:pl-20 md:pb-0 bg-cyan100">
        <div className="flex flex-col gap-4 md:gap-6 md:flex-1 px-4 md:px-0">
          <h3 className="text-white font-anek font-semibold text-3xl md:text-4xl">
            Bring Intelligence to your next event
          </h3>
          <p className="text-white/80 font-inter text-sm md:text-base">
            Let’s help you move from conversations to measurable outcomes.
          </p>
          <div className="flex items-center gap-3 ">
            <button className="rounded-lg bg-white text-blue600 px-6 md:px-3 lg:px-10 py-3 text-sm font-inter">
              Deploy EventsIntel
            </button>
            <Link to='/demo-form' className="rounded-lg bg-pink text-white px-6 md:px-3 lg:px-10 py-3 text-sm font-inter cursor-pointer hover:bg-pink/90 transition-all">
              Request a Demo
            </Link>
          </div>
        </div>
        <div className="md:flex-1 pl-4 md:pl-0">
          <img src="/security-screenshot.png" alt="" />
        </div>
        
      </section>

      <section className="flex flex-col gap-9 py-20 px-4 md:px-10 lg:px-20 bg-blue150 items-center justify-center">
        <h5 className="font-anek text-xl md:text-2xl font-semibold text-pink">Our main priorities for our Clients are to execute your unique event deployment brilliantly, make your reporting unforgettable, help you demonstrate measurable operational value to your stakeholders and convert your event into recurring institutional results that are useful for future decision making.</h5>
        <div className="flex flex-col gap-6 md:flex-row md:gap-10 md:items-end w-full md:px-5 md:pl-25 md:pb-30 bg-cta">
            <h4 className="text-2xl md:text-3xl font-bold font-anek text-white max-w-[25ch] md:flex-1 md:pb-40">We’re ready to help you. Contact us now.</h4>
            <form action="" className="flex flex-col gap-5 border border-white/50 rounded-2xl bg-neutral900 p-6 md:flex-1">
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Full Name <span className="text-red">*</span></label>
                <input type="text" name="" id="" placeholder="Jane Doe" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Organization <span className="text-red">*</span></label>
                <input type="text" name="" id="" placeholder="Uduth" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Job Title <span className="text-red">*</span></label>
                <input type="text" name="" id="" placeholder="Nurse" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Email Address <span className="text-red">*</span></label>
                <input type="email" name="" id="" placeholder="Jjanedoe@gmail.com" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Phone number(perferably whatsapp) <span className="text-red">*</span></label>
                <input type="text" name="" id="" placeholder="090 2345 4658" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="text-white font-inter text-sm"> Country <span className="text-red">*</span></label>
                <input type="text" name="" id="" placeholder="Nigeria" className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"/>
            </div>
            <button className="rounded-lg bg-pink text-white px-10 py-3 text-sm font-inter">Submit</button>
            </form>
            {/* <img src="/form-shape.png" className="absolute bottom-0 left-0 w-full h-full -z-1"/> */}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
