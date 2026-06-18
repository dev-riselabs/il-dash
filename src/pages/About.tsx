import { LuBrain } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { ShieldAlert } from "lucide-react";
import { BsCalendar4Event } from "react-icons/bs";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { PiPresentationChartBold } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { motion } from "motion/react";

const pillars = [
  {
    title: "Intelligence",
    items: [
      { name: "AI-powered insights", icon: LuBrain },
      { name: "Real-time summaries", icon: FaRegClock },
    ],
  },
  {
    title: "Control",
    items: [
      {
        name: "Live operational Visibility",
        icon: PiPresentationChartBold,
      },
      { name: "Security + Coordination", icon: ShieldAlert },
    ],
  },
  {
    title: "Accountability",
    items: [
      { name: "Post-event tracking", icon: BsCalendar4Event },
      { name: "Pipeline monitoring", icon: LuChartNoAxesCombined },
      {
        name: "Follow through on commitments",
        icon: IoMdCheckboxOutline,
      },
    ],
  },
];

const services = [
  "EventsIntelis an event technology, intelligence and operational command platform designed for conferences, summits, forums and high-level engagements. We combine digital infrastructure, real-time intelligence and operational visibility to help organizations track activities, capture insights and deliver measurable outcomes.",
  "Most High-level events have a recurring problem. They host high-level conversations but cannot track outcomes in real time or after the event and that’s our entry point. We’re not offering you a dashboard or just data visualisation tools, we’re providing you control rooms, operational frameworks, evidence of impact, post-event accountability and investor conversion tracking. We deploy a full intelligence team + system for your event.",
  "Our deployments can include digital event platforms, executive dashboards, real-time intelligence, delegate support systems, reporting frameworks and post-event accountability tracking.",

  // "EventsIntel is a real-time intelligence and command system that captures conversations, tracks decisions and converts them into structured data, insights and measurable outcomes. This is not a pure tech or pure events management platform. It’s a Bridge.",
  // "Most High-level events have a recurring problem. They host high-level conversations but cannot track outcomes in real time or after the event and that’s our entry point. We’re not offering you a dashboard or just data visualisation tools, we’re providing you control rooms, evidence of impact, post-event accountability and investor conversion tracking. We deploy a full intelligence team + system for your event.",
  // "For every client, we offer customized pre-event setup, Live event intelligence, post-event tracking (30–90 days), outcomes, decision-making, accountability powered by sophisticated modern technology and those are the core of our product.",
];

function About() {
  return (
    <div>
      <section className="bg-about px-4 md:px-10 lg:px-20 py-10 md:py-20 flex flex-col lg:flex-row lg:items-center gap-10">
        <img src="/about-img.png" alt="" className="h-100 lg:flex-1" />
        <div className="flex flex-col gap-5 lg:flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            className="text-white font-bold font-anek text-2xl md:text-3xl"
          >
            About Events Intel
          </motion.h1>
          <div className="flex flex-col gap-3">
            {services.map((service, i) => (
              <motion.p
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: i * 0.55,
                }}
                key={service}
                className="text-white/80 text-sm md:text-base font-inter"
              >
                {service}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7 md:flex-row md:items-end md:gap-20 pt-10 md:py-10 md:pl-10 lg:pl-20 md:pb-0 bg-cyan100">
        <div className="flex flex-col gap-4 px-4 md:px-0 md:pb-8 lg:pb-15 md:flex-1">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            className="text-white font-anek font-semibold text-2xl md:text-4xl"
          >
            CORE VALUE PROPOSITION
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
            }}
            className="text-white/80 font-inter text-sm lg:text-base"
          >
            {/* We don’t just help you run events. We help you track outcomes,
            capture data and intelligence and convert conversations into
            measurable impact. This is a standard operating system for how
            high-level events are run across Africa. */}
            We don't just run events. We provide the technology, intelligence
            and operational systems that transform activities into insights,
            decisions and measurable impact. Events Intel is a standard
            operating system for how high-level events are run across Africa.
          </motion.p>
        </div>
        <div className="pl-4 md:pl-0 md:flex-1">
          <img src="/ev-screenshot.png" alt="" className="w-full" />
        </div>
      </section>

      <section className="bg-about px-4 md:px-10 lg:px-20 py-10 md:py-20 flex flex-col lg:flex-row lg:items-center gap-10">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          src="/about-img.png"
          alt=""
          className="h-100 lg:flex-1"
        />
        <div className="flex flex-col gap-5 lg:flex-1">
          <h2 className="text-white font-bold font-anek text-2xl md:text-3xl">
            The platform scope includes:
          </h2>
          <ul className="flex flex-col gap-3 list-disc pl-5">
            <li className="text-white text-sm md:text-base font-inter">
              Executive Dashboards & Command Centres
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Event Websites & Registration Systems
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Live Event Monitoring
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              AI-Assisted Insight Extraction
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Deal Rooms & Opportunity Tracking
              {/* Security and operational command systems */}
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Delegate Experience Systems
              {/* Investment/deal-flow intelligence */}
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Decision & Resolution Tracking
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Stakeholder Coordination
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Post-Event Accountability Tracking
            </li>
            <li className="text-white text-sm md:text-base font-inter">
              Enterprise & Government Reporting Systems
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-10 py-10 md:py-20 px-4 md:px-10 lg:px-20 bg-blue150 items-center justify-center">
        <div className="relative py-5 px-10 flex flex-col gap-2 items-center max-w-3xl">
          <p className="text-sm m:text-lg text-white font-inter font-bold text-center uppercase">
            OUR 3 KEY PILLARS
          </p>
          <h2 className="font-anek font-semibold text-white text-2xl md:text-3xl text-center leading-10 md:leading-14 capitalize">
            Intelligence. Control. Accountability.
          </h2>
          <motion.img
            src="./line-left.png"
            alt=""
            className="absolute top-0 left-0 w-40"
            animate={{
              y: [0, -15, 0],
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.img
            src="./line-right.png"
            alt=""
            className="absolute bottom-0 right-0 w-40"
            animate={{
              y: [0, -15, 0],
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.55,
              }}
              key={pillar.title}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div
                className={`border-l-6 border border-white/55 rounded-l-2xl p-4 md:p-6 flex items-center gap-6 md:gap-12 md:col-span-2 ${
                  i === 0
                    ? "border-l-blue250"
                    : i === 1
                      ? "border-l-mint50"
                      : "border-l-purple400"
                }
                `}
              >
                <div
                  className={`border border-white/55 w-14 md:w-17.5 h-14 md:h-17.5 rounded-full flex items-center justify-center font-anek font-semibold shrink-0 text-2xl md:text-3xl ${
                    i === 0
                      ? "text-blue250"
                      : i === 1
                        ? "text-mint50"
                        : "text-purple400"
                  }`}
                >
                  0{i + 1}
                </div>
                <div className="flex flex-col gap-6">
                  <h4 className="text-white font-anek font-semibold text-xl md:text-2xl">
                    {pillar.title}
                  </h4>
                  <div className="flex flex-col gap-5">
                    {pillar.items.map(({ name, icon: Icon }) => (
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center ${
                            i === 0
                              ? "bg-blue350"
                              : i === 1
                                ? "bg-mint100"
                                : "bg-purple500"
                          }`}
                        >
                          {" "}
                          <Icon
                            className={`w-4 md:w-5 h-4 md:h-5 ${
                              i === 0
                                ? "text-blue250"
                                : i === 1
                                  ? "text-mint50"
                                  : "text-purple400"
                            }`}
                          />{" "}
                        </div>
                        <span className="text-white/80 font-inter text-sm md:text-base ">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <img src="/chart-img.png" alt="" className="h-full" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-7 md:flex-row md:items-end md:gap-20 pt-10 md:py-10 md:pl-10 lg:pl-20 md:pb-0 bg-cyan100">
        <div className="flex flex-col gap-4 md:pb-8 lg:pb-15 lg:flex-1 px-4 md:px-0">
          <h3 className="text-white font-anek font-semibold text-2xl md:text-3xl lg:text-4xl">
            What to expect when you use our Platform
          </h3>
          <ul className="flex flex-col gap-2 lg:gap-3 list-disc pl-4">
            <li className="text-white font-inter text-sm md:text-base">
              {/* Proprietary event intelligence datasets */}
              Event Technology Infrastructure
            </li>
            <li className="text-white font-inter text-sm md:text-base">
              {/* Institutional workflows */}
              Real-Time Intelligence & Analytics
            </li>
            <li className="text-white font-inter text-sm md:text-base">
              {/* Executive reporting infrastructure */}
              Executive Dashboards & Reporting
            </li>
            <li className="text-white font-inter text-sm md:text-base">
              Operational Coordination Systems
            </li>
            <li className="text-white font-inter text-sm md:text-base">
              {/* And post-event accountability tracking */}
              Delegate Support Frameworks
            </li>
            <li className="text-white font-inter text-sm md:text-base">
              Post-Event Accountability Tracking
            </li>
          </ul>
        </div>
        <div className="md:flex-1 pl-4 md:pl-0">
          <img
            src="/next-action-screenshot.png"
            alt=""
            className="w-full lg:flex-1"
          />
        </div>
      </section>
    </div>
  );
}

export default About;
