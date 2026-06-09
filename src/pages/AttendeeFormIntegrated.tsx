import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,  } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendeeSchema, type AttendeeFormData } from "@/lib/api/schemas";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import {
  useCreateAttendee,
  useEvents,
  useTracks,
  useSectors,
} from "@/lib/api/hooks";
import { AlertCircle, Loader, ArrowRight } from "lucide-react";

export default function AttendeeFormIntegrated() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const { id } = useParams<{ id?: string }>();
  // const isEditing = !!id;

  const createMutation = useCreateAttendee();
  const eventsQ = useEvents();
  const tracksQ = useTracks();
  const sectorsQ = useSectors();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  });

  const onSubmit = async (data: AttendeeFormData) => {
    setApiError("");
    try {
      await createMutation.mutateAsync({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        job_title: data.job_title,
        organization: data.organization,
        country: data.country,
        region: data.region,
        gender: data.gender,
        category: data.category,
        event_id: data.event_id ? parseInt(data.event_id) : undefined,
        track_id: data.track_id ? parseInt(data.track_id) : undefined,
        sector_id: data.sector_id ? parseInt(data.sector_id) : undefined,
      });
      setSubmitted(true);
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to submit form");
    }
  };
  // const handleUploadMore = () => {
  //   setSubmitted(false);
  //   reset();
  // };

  if (submitted) {
    return (
      <section className="space-y-6">
        <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
          <h1 className="text-3xl font-semibold font-lexend text-white">
            Thank You!
          </h1>
          <p className="text-base font-lexend text-white">
            Your attendee information has been submitted successfully
          </p>
          {/* {!isEditing && (
            <button
              onClick={handleUploadMore}
              className="bg-white/10 border border-white/20 rounded-lg px-6 font-medium py-3 font-inter text-white text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Upload More
            </button>
          )} */}
          <button
            onClick={() => navigate("/investlagos")}
            className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm self-start hover:bg-gray-100 transition-colors flex items-center gap-2 mt-4"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Registeration Form
        </h1>
        <p className="text-base font-lexend text-white">
          Fill this out to register as an attendee
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="First Name"
              placeholder="Jane"
              {...register("first_name")}
              error={errors.first_name}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Last Name"
              placeholder="Doe"
              {...register("last_name")}
              error={errors.last_name}
            />
          </div>
        </div>

        <FormInput
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          {...register("email")}
          error={errors.email}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="Job Title (optional)"
              placeholder="Software Engineer"
              {...register("job_title")}
              error={errors.job_title}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Organization (optional)"
              placeholder="Tech Corp"
              {...register("organization")}
              error={errors.organization}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="Country (optional)"
              placeholder="Nigeria"
              {...register("country")}
              error={errors.country}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Region (optional)"
              placeholder="Lagos"
              {...register("region")}
              error={errors.region}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Gender*"
              {...register("gender")}
              options={[
                { value: "", label: "Select gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              error={errors.gender}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Category (optional)"
              {...register("category")}
              options={[
                { value: "", label: "Select category" },
                { value: "Entrepreneur", label: "Entrepreneur" },
                { value: "Investor", label: "Investor" },
                { value: "Corporate", label: "Corporate" },
                { value: "Media", label: "Media" },
                { value: "Student", label: "Student" },
                { value: "Government", label: "Government" },
                { value: "Other", label: "Other" },
              ]}
              error={errors.category}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Event (optional)"
              {...register("event_id")}
              options={[
                { value: "", label: "Select event" },
                ...(eventsQ.data ?? []).map((e) => ({
                  value: String(e.id),
                  label: e.name,
                })),
              ]}
              error={errors.event_id}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Track (optional)"
              {...register("track_id")}
              options={[
                { value: "", label: "Select track" },
                ...(tracksQ.data ?? []).map((t) => ({
                  value: String(t.id),
                  label: t.name,
                })),
              ]}
              error={errors.track_id}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Sector (optional)"
              {...register("sector_id")}
              options={[
                { value: "", label: "Select sector" },
                ...(sectorsQ.data ?? []).map((s) => ({
                  value: String(s.id),
                  label: s.name,
                })),
              ]}
              error={errors.sector_id}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || createMutation.isPending}
          className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting || createMutation.isPending ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
}
