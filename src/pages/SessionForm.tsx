function SessionForm() {
  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Session  Form
        </h1>
        <p className="text-base font-lexend text-white">
          Fill this out after each speaker finishes talking
        </p>
      </section>

      <form action="" className="flex flex-col gap-10">
        <div className="flex gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Session Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Speaker Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Venue <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Start Date <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Start Time
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              End Time
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" Jane Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="feedback" className="text-white font-inter text-sm ">
            Key Insight #1
          </label>
          <textarea
            name=""
            id=""
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="" className="text-white font-inter text-sm ">
            Key Insight #2
          </label>
          <textarea
            name=""
            id=""
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="" className="text-white font-inter text-sm ">
            Key Insight #3
          </label>
          <textarea
            name=""
            id=""
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="" className="text-white font-inter text-sm ">
            Key Quote
          </label>
          <textarea
            name=""
            id=""
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="" className="text-white font-inter text-sm ">
            Resolution
          </label>
          <textarea
            name=""
            id=""
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="fullName" className="text-white font-inter text-sm ">
            Sector <span className="text-red">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {[
              "Tech",
              "Infastructure",
              "Agriculture",
              "Creative",
              "Finance",
              "Policy",
            ].map((sector) => (
              <label
                key={sector}
                className="flex items-center gap-1.5 text-white font-inter text-sm"
              >
                <input type="checkbox" name="" id="" />
                {sector}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="fullName" className="text-white font-inter text-sm ">
            Sentiment <span className="text-red">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {["Positive", "Negative", "Neutral"].map((sector) => (
              <label
                key={sector}
                className="flex items-center gap-1.5 text-white font-inter text-sm"
              >
                <input type="checkbox" name="" id="" />
                {sector}
              </label>
            ))}
          </div>
        </div>

        <button className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center">
          Submit
        </button>
      </form>
    </section>
  );
}

export default SessionForm;
