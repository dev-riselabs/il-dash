import { Star } from "lucide-react";
import { useState } from "react";

function FeedbackForm() {
  const [rating, setRating] = useState(0);

  function handleRatingChange(value: number) {
    setRating(value);
  }
  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Feedback Form
        </h1>
        <p className="text-base font-lexend text-white">
          Here’s for the feedback description
        </p>
      </section>

      <form action="" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <label htmlFor="fullName" className="text-white font-inter text-sm ">
            Full Name <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name=""
            id=""
            placeholder=" Jane Doe"
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-30">
          <div className="flex flex-col gap-6">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              How impactful was the session? <span className="text-red">*</span>
            </label>
            <div className="flex gap-5 items-end font-inter">
              <span className="text-white text-xs">Not Good</span>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white text-xs">1</span>
                  <input
                    type="radio"
                    name=""
                    id=""
                    className="border border-white rounded-full w-5 h-5 appearance-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white text-xs">2</span>
                  <input
                    type="radio"
                    name=""
                    id=""
                    className="border border-white rounded-full w-5 h-5 appearance-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white text-xs">3</span>
                  <input
                    type="radio"
                    name=""
                    id=""
                    className="border border-white rounded-full w-5 h-5 appearance-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white text-xs">4</span>
                  <input
                    type="radio"
                    name=""
                    id=""
                    className="border border-white rounded-full w-5 h-5 appearance-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white text-xs">5</span>
                  <input
                    type="radio"
                    name=""
                    id=""
                    className="border border-white rounded-full w-5 h-5 appearance-none"
                  />
                </div>
              </div>
              <span className="text-white text-xs">Excellent</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label
              htmlFor="fullName"
              className="text-white font-inter text-sm "
            >
              Star Rating <span className="text-red">*</span>
            </label>
            <div className="flex items-center gap-14 font-inter">
              <span className="text-white text-xs">1</span>
              <span className="text-white text-xs">2</span>
              <span className="text-white text-xs">3</span>
              <span className="text-white text-xs">4</span>
              <span className="text-white text-xs">5</span>
            </div>
            <div className="flex items-center gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} onClick={() => handleRatingChange(i)} className="">
                  <Star
                    className={`w-7 h-7 ${
                      i <= rating ? "fill-yellow" : "fill-white"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="feedback" className="text-white font-inter text-sm ">
            Feedback <span className="text-red">*</span>
          </label>
          <textarea
            name="feedback"
            id="feedback"
            placeholder="Type your message..."
            className="text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none resize-none min-h-30"
          />
        </div>

        <button className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center" >Submit</button>
      </form>
    </section>
  );
}

export default FeedbackForm;
