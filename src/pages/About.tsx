function About() {
  return (
    <div>
      <section className="bg-hero px-20 py-20 flex flex-col md:flex-row md:items-center gap-10">
        <img src="/about-img.png" alt="" className="" />
        <div className="flex flex-col gap-5">
          <h1 className="text-white font-bold font-anek text-3xl">
            About the Service
          </h1>
          <div className="flex flex-col gap-3">
            <p className="text-white/80 text-base font-inter">
              EventsIntel is a real-time intelligence and command system that
              captures conversations, tracks decisions and converts them into
              structured data, insights and measurable outcomes. This is not a
              pure tech or pure events management platform. It’s a Bridge.{" "}
            </p>
            <p className="text-white/80 text-base font-inter">
              Most High-level events have a recurring problem. They host
              high-level conversations but cannot track outcomes in real time or
              after the event and that’s our entry point. We’re not offering you
              a dashboard or just data visualisation tools, we’re providing you
              control rooms, evidence of impact, post-event accountability and
              investor conversion tracking. We deploy a full intelligence team +
              system for your event.{" "}
            </p>
            <p className="text-white/80 text-base font-inter">
              For every client, we offer customized pre-event setup, Live event
              intelligence, post-event tracking (30–90 days), outcomes,
              decision-making, accountability powered by sophisticated modern
              technology and those are the core of our product.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7 md:flex-row md:items-end md:gap-20 py-10 md:pl-20 md:pb-0 bg-cyan100">
        <div className="flex flex-col gap-6 md:pb-15 md:flex-1">
          <h3 className="text-white font-anek font-semibold text-4xl">
            CORE VALUE PROPOSITION
          </h3>
          <p className="text-white/80 font-inter text-base">
            We don’t just help you run events. We help you track outcomes,
            capture data and intelligence and convert conversations into
            measurable impact. This is a standard operating system for how
            high-level events are run across Africa.
          </p>
        </div>
        <img src="/ev-screenshot.png" alt="" className="md:flex-1"/>
      </section>
    </div>
  );
}

export default About;
