import { useState } from "react";

function DemoForm() {
  const [step, setStep] = useState(1);

  function handleChangeStep(step: number) {
    setStep(step);
  }
  return (
    <div>
      <section className="flex flex-col gap-5 px-4 md:flex-row md:justify-between md:gap-10 md:items-end py-10 md:px-10 lg:px-20 bg-demo">
        <div className="flex flex-col gap-5">
          <div className="border border-pink rounded-full text-white px-6 py-2 font-inter font-bold text-xs md:text-base self-start">
            EventsIntel™
          </div>
          <h1 className="font-anek text-3xl md:text-4xl text-white">REQUEST A DEMO FORM</h1>
        </div>
        <img src="/demo-img.png" alt="" className="h-55 md:h-80 w-full md:basis-1/2" />
      </section>
      <section className=" py-15 px-4 md:px-10 lg:px-20 bg-neutral900">
        <form action="" className="flex flex-col gap-10">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibol text-lg">
                  SECTION A: BASIC DETAILS
                </h5>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Full Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Jane Doe"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Email Address <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="janedoe@gmail.com"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Organization <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="world"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Job Title <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Ceo"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Phone Number (WhatsApp preferred){" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="070 2356 1256"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Country <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Nigeria"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-4 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibol text-lg">
                  SECTION B: EVENT DETAILS
                </h5>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Type of Event <span className="text-red">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    >
                      <option value="">Pick event type</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      Event Name (if available)
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Expected Event Date <span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      placeholder="20/09/2002"
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      Event Location <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="" className="text-white font-inter text-sm">
                    {" "}
                    Estimated Number of Attendees{" "}
                    <span className="text-red">*</span> (Ranges: 50–100 /
                    100–300 / 300–1000 / 1000+)
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibol text-lg">
                  SECTION C: NEEDS & INTENT
                </h5>
                <div className="flex flex-col gap-4 md:flex-row md:gap-60 ">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      What are you primarily looking to achieve?{" "}
                      <span className="text-red">*</span>
                    </label>
                    <div className="flex flex-col gap-5 pl-4">
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Track event sessions in real time
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Capture key insights & resolutions
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Monitor investment or deal flow
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Improve event reporting
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Security & coordination
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="" className="text-white font-inter text-sm">
                      {" "}
                      When are you looking to deploy a solution?{" "}
                      <span className="text-red">*</span>
                    </label>
                    <div className="flex flex-col gap-5 pl-4">
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Immediately (0–1 month)
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Soon (1–3 months)
                      </label>
                      <label
                        htmlFor=""
                        className="flex items-center gap-3 text-white font-inter text-sm"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="accent-pink"
                        />{" "}
                        Exploring options
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibol text-lg">
                  SECTION D: QUALIFIER (SMART FILTER)
                </h5>

                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-white font-inter text-sm">
                    Budget Range:
                  </label>
                  <div className="flex flex-col gap-5 pl-4">
                    <label
                      htmlFor=""
                      className="flex items-center gap-3 text-white font-inter text-sm"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-pink"
                      />{" "}
                      $10K – $25K
                    </label>
                    <label
                      htmlFor=""
                      className="flex items-center gap-3 text-white font-inter text-sm"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-pink"
                      />{" "}
                      $25K – $50K
                    </label>
                    <label
                      htmlFor=""
                      className="flex items-center gap-3 text-white font-inter text-sm"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-pink"
                      />{" "}
                      $50K+
                    </label>
                    <label
                      htmlFor=""
                      className="flex items-center gap-3 text-white font-inter text-sm"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="accent-pink"
                      />{" "}
                      Not sure yet
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibol text-lg">
                  SECTION E: FINAL INPUT
                </h5>
                <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="" className="text-white font-inter text-sm">
                     Tell us more about your event or needs
                    </label>
                    <textarea
                      name=""
                      id=""
                      placeholder="Type here..."
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none h-50 resize-none"
                    />
                  </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-end md:flex-row md:justify-end gap-8 md:gap-20 md:items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-20 h-3 ${step === 1 ? "bg-pink" : "bg-slate700"}`}
              ></div>
              <div
                className={`w-20 h-3 ${step === 2 ? "bg-pink" : "bg-slate700"}`}
              ></div>
            </div>

            <div>
              {step === 1 && (
                <button
                  type="button"
                  onClick={() => handleChangeStep(2)}
                  className="rounded-lg bg-pink text-white px-15 py-3 text-sm font-inter cursor-pointer"
                >
                  Next
                </button>
              )}
              {step === 2 && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChangeStep(1)}
                    className="rounded-lg bg-white text-blue600 px-6 py-3 text-sm font-inter cursor-pointer"
                  >
                    Previous
                  </button>
                  <button className="rounded-lg bg-pink text-white px-6 py-3 text-sm font-inter cursor-pointer">
                    Request a Demo
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DemoForm;
