function SpeakerForm() {
  return (
    <section className="space-y-6 max-w-3xl w-full">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-2xl md:text-3xl font-semibold font-lexend text-white">
          Speaker  Form
        </h1>
        <p className="text-sm md:text-base font-lexend text-white">
          Fill this out after each speaker finishes talking
        </p>
      </section>

      <form action="" className="flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              First Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Jane"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              Last Name  <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Doe"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              Email Address <span className="text-red">*</span>
            </label>
            <input
              type="email"
              name=""
              id=""
              placeholder="janedoe@gmail.com"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              Phone Number <span className="text-red">*</span>
            </label>
            <input
              type="number"
              name=""
              id=""
              placeholder="+234 70 3245 5678"
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              Organization / Company  <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label
              htmlFor=""
              className="text-white font-inter text-sm "
            >
              Job Title / Position  <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=" "
              className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            />
          </div>
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
            Years of Experience  <span className="text-red">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {["0-3", "4-7", "8-14", "15+"].map((sector) => (
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

export default SpeakerForm;
