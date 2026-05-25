import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitDemoRequest } from "@/lib/api/hooks";
import { demoRequestSchema, type DemoRequestFormData } from "@/lib/api/schemas";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

function DemoForm() {
  const [step, setStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    mode: "onBlur",
  });

  const submitMutation = useSubmitDemoRequest();
  const isSubmitting = submitMutation.isPending;

  // Watch checkbox arrays for primary objectives and deployment timeline
  const watchedObjectives = watch("primary_objectives");
  const watchedTimeline = watch("deployment_timeline");

  const handleChangeStep = (newStep: number) => {
    setApiError("");
    setStep(newStep);
  };

  const onSubmit = async (data: DemoRequestFormData) => {
    setApiError("");
    setSuccessMessage("");

    try {
      const result = await submitMutation.mutateAsync(data);
      setSuccessMessage(result.message || "Demo request submitted successfully! Check your email for confirmation.");
      reset();
      setStep(1);
      // Scroll to top to show success message
      window.scrollTo(0, 0);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to submit demo request. Please try again.";
      setApiError(errorMessage);
    }
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    const currentObjectives = watchedObjectives || [];
    if (isChecked) {
      setValue("primary_objectives", [...currentObjectives, value]);
    } else {
      setValue("primary_objectives", currentObjectives.filter((item) => item !== value));
    }
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    const currentTimeline = watchedTimeline || [];
    if (isChecked) {
      setValue("deployment_timeline", [...currentTimeline, value]);
    } else {
      setValue("deployment_timeline", currentTimeline.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <section className="flex flex-col gap-5 px-4 md:flex-row md:justify-between md:gap-10 md:items-end py-10 md:px-20 bg-demo">
        <div className="flex flex-col gap-5">
          <div className="border border-pink rounded-full text-white px-6 py-2 font-inter font-bold text-xs md:text-base self-start">
            EventsIntel™
          </div>
          <h1 className="font-anek text-3xl md:text-4xl text-white">
            REQUEST A DEMO FORM
          </h1>
        </div>
        <img
          src="/demo-img.png"
          alt=""
          className="h-55 md:h-70 w-full md:basis-1/2"
        />
      </section>

      <section className="py-15 px-4 md:px-20 bg-neutral900">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-200 text-sm">{successMessage}</p>
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              {/* Section A: Basic Details */}
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibold text-lg">
                  SECTION A: BASIC DETAILS
                </h5>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="full_name" className="text-white font-inter text-sm">
                      Full Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      placeholder="Jane Doe"
                      {...register("full_name")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.full_name && (
                      <p className="text-red-400 text-xs">{errors.full_name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="email" className="text-white font-inter text-sm">
                      Email Address <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="janedoe@gmail.com"
                      {...register("email")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="organization" className="text-white font-inter text-sm">
                      Organization <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="organization"
                      placeholder="Tech Innovations Ltd"
                      {...register("organization")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.organization && (
                      <p className="text-red-400 text-xs">{errors.organization.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="job_title" className="text-white font-inter text-sm">
                      Job Title <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="job_title"
                      placeholder="CEO"
                      {...register("job_title")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.job_title && (
                      <p className="text-red-400 text-xs">{errors.job_title.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="phone_number" className="text-white font-inter text-sm">
                      Phone Number (WhatsApp preferred){" "}
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      placeholder="070 2356 1256"
                      {...register("phone_number")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.phone_number && (
                      <p className="text-red-400 text-xs">{errors.phone_number.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="country" className="text-white font-inter text-sm">
                      Country <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      placeholder="Nigeria"
                      {...register("country")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.country && (
                      <p className="text-red-400 text-xs">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section B: Event Details */}
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-4 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibold text-lg">
                  SECTION B: EVENT DETAILS
                </h5>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="event_type" className="text-white font-inter text-sm">
                      Type of Event <span className="text-red">*</span>
                    </label>
                    <select
                      id="event_type"
                      {...register("event_type")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    >
                      <option value="">Pick event type</option>
                      <option value="Conference">Conference</option>
                      <option value="Summit">Summit</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Webinar">Webinar</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Networking Event">Networking Event</option>
                      <option value="Product Launch">Product Launch</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.event_type && (
                      <p className="text-red-400 text-xs">{errors.event_type.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="event_name" className="text-white font-inter text-sm">
                      Event Name (if available)
                    </label>
                    <input
                      type="text"
                      id="event_name"
                      placeholder="Tech Summit 2024"
                      {...register("event_name")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.event_name && (
                      <p className="text-red-400 text-xs">{errors.event_name.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="event_date" className="text-white font-inter text-sm">
                      Expected Event Date <span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      id="event_date"
                      {...register("event_date")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.event_date && (
                      <p className="text-red-400 text-xs">{errors.event_date.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="event_location" className="text-white font-inter text-sm">
                      Event Location <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="event_location"
                      placeholder="Lagos, Nigeria"
                      {...register("event_location")}
                      className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                    />
                    {errors.event_location && (
                      <p className="text-red-400 text-xs">{errors.event_location.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="estimated_attendees" className="text-white font-inter text-sm">
                    Estimated Number of Attendees{" "}
                    <span className="text-red">*</span> (Ranges: 50–100 /
                    100–300 / 300–1000 / 1000+)
                  </label>
                  <select
                    id="estimated_attendees"
                    {...register("estimated_attendees")}
                    className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink"
                  >
                    <option value="">Select attendee range</option>
                    <option value="50-100">50–100</option>
                    <option value="100-300">100–300</option>
                    <option value="300-1000">300–1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  {errors.estimated_attendees && (
                    <p className="text-red-400 text-xs">{errors.estimated_attendees.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              {/* Section C: Needs & Intent */}
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibold text-lg">
                  SECTION C: NEEDS & INTENT
                </h5>
                <div className="flex flex-col gap-4 md:flex-row md:gap-60">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="objectives" className="text-white font-inter text-sm">
                      What are you primarily looking to achieve?{" "}
                      <span className="text-red">*</span>
                    </label>
                    <div className="flex flex-col gap-5 pl-4">
                      {[
                        "Track event sessions in real time",
                        "Capture key insights & resolutions",
                        "Monitor investment or deal flow",
                        "Improve event reporting",
                        "Security & coordination",
                        "Other",
                      ].map((objective) => (
                        <label
                          key={objective}
                          className="flex items-center gap-3 text-white font-inter text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={objective}
                            onChange={handleObjectiveChange}
                            checked={watchedObjectives?.includes(objective) || false}
                            className="accent-pink cursor-pointer"
                          />
                          {objective}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="timeline" className="text-white font-inter text-sm">
                      When are you looking to deploy a solution?{" "}
                      <span className="text-red">*</span>
                    </label>
                    <div className="flex flex-col gap-5 pl-4">
                      {[
                        "Immediately (0–1 month)",
                        "Soon (1–3 months)",
                        "Exploring options",
                      ].map((timeline) => (
                        <label
                          key={timeline}
                          className="flex items-center gap-3 text-white font-inter text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={timeline}
                            onChange={handleTimelineChange}
                            checked={watchedTimeline?.includes(timeline) || false}
                            className="accent-pink cursor-pointer"
                          />
                          {timeline}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section D: Budget */}
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibold text-lg">
                  SECTION D: QUALIFIER (BUDGET)
                </h5>

                <div className="flex flex-col gap-4">
                  <label htmlFor="budget" className="text-white font-inter text-sm">
                    Budget Range:
                  </label>
                  <div className="flex flex-col gap-5 pl-4">
                    {[
                      "$10K – $25K",
                      "$25K – $50K",
                      "$50K+",
                      "Not sure yet",
                    ].map((budget) => (
                      <label
                        key={budget}
                        className="flex items-center gap-3 text-white font-inter text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={budget}
                          {...register("budget_range")}
                          className="accent-pink cursor-pointer"
                        />
                        {budget}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section E: Additional Notes */}
              <div className="flex flex-col gap-7 md:gap-10 border border-white/55 rounded-2xl px-5 md:px-10 py-10">
                <h5 className="text-white font-anek font-semibold text-lg">
                  SECTION E: FINAL INPUT
                </h5>
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="additional_notes" className="text-white font-inter text-sm">
                    Tell us more about your event or needs
                  </label>
                  <textarea
                    id="additional_notes"
                    placeholder="Type here..."
                    {...register("additional_notes")}
                    className="border border-white/55 rounded-xl text-white/80 text-sm px-4 py-3 bg-white/10 outline-none focus:border-pink h-50 resize-none"
                  />
                  {errors.additional_notes && (
                    <p className="text-red-400 text-xs">{errors.additional_notes.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col items-end md:flex-row md:justify-end gap-8 md:gap-20 md:items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-20 h-3 rounded-full ${
                  step === 1 ? "bg-pink" : "bg-slate-700"
                }`}
              ></div>
              <div
                className={`w-20 h-3 rounded-full ${
                  step === 2 ? "bg-pink" : "bg-slate-700"
                }`}
              ></div>
            </div>

            <div>
              {step === 1 && (
                <button
                  type="button"
                  onClick={() => handleChangeStep(2)}
                  className="rounded-lg bg-pink text-white px-15 py-3 text-sm font-inter cursor-pointer hover:bg-pink/90 transition-colors"
                >
                  Next
                </button>
              )}
              {step === 2 && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChangeStep(1)}
                    className="rounded-lg bg-white text-blue-600 px-6 py-3 text-sm font-inter cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-pink text-white px-6 py-3 text-sm font-inter cursor-pointer hover:bg-pink/90 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Request a Demo"
                    )}
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

