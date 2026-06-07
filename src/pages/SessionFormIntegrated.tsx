import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { sessionSchema, type SessionFormData } from '@/lib/api/schemas'
import { useCreateSession, useEvents, useTracksList, useSectors, useVenues, useEventDaysList } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader, ArrowRight, RotateCcw } from 'lucide-react'

export default function SessionFormIntegrated() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
  })

  const createMutation = useCreateSession()
  const { data: eventsData } = useEvents()
  const { data: tracksData } = useTracksList()
  const { data: sectorsData } = useSectors()
  const { data: venuesData } = useVenues()
  const { data: eventDaysData } = useEventDaysList({ per_page: 100 })
  const isSubmitting = createMutation.isPending
  const handleUploadMore = () => {
    setSubmitted(false)
    reset()
  }
  const eventOptions = (eventsData || []).map(e => ({
    value: String(e.id),
    label: e.name,
  }))

  const eventDayOptions = (eventDaysData?.data || []).map((d: any) => ({
    value: String(d.id),
    label: d.label ? `Day ${d.day_no} - ${d.label}` : `Day ${d.day_no}`,
  }))

  const trackOptions = (tracksData?.data || []).map((t: any) => ({
    value: String(t.id),
    label: t.name,
  }))

  const sectorOptions = (sectorsData || []).map(s => ({
    value: String(s.id),
    label: s.name,
  }))

  const venueOptions = (venuesData || []).map(v => ({
    value: String(v.id),
    label: v.name,
  }))

  const onSubmit = async (data: SessionFormData) => {
    setApiError('')
    try {
      const payload: any = {
        event_id: parseInt(data.event_id),
      }
      if (data.title) payload.title = data.title
      if (data.description) payload.description = data.description
      if (data.event_day_id) payload.event_day_id = parseInt(data.event_day_id)
      if (data.track_id) payload.track_id = parseInt(data.track_id)
      if (data.sector_id) payload.sector_id = parseInt(data.sector_id)
      if (data.venue_id) payload.venue_id = parseInt(data.venue_id)
      if (data.starts_at) payload.starts_at = data.starts_at
      if (data.ends_at) payload.ends_at = data.ends_at

      await createMutation.mutateAsync(payload)
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit session')
    }
  }

  if (submitted) {
    return (
      <section className="space-y-6">
        <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-cyan-500">
          <h1 className="text-3xl font-semibold font-lexend text-white">
            Thank You!
          </h1>
          <p className="text-base font-lexend text-white">
            Session information has been submitted successfully.
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUploadMore}
              className="bg-white/10 border border-white/20 rounded-lg px-6 font-medium py-3 font-inter text-white text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Upload More
            </button>
            <button
              onClick={() => navigate('/sessions')}
              className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Go to Sessions
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Session Form
        </h1>
        <p className="text-base font-lexend text-white">
          Create a new session
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <FormSelect
          label="Event"
          {...register('event_id')}
          options={eventOptions}
          error={errors.event_id}
        />

        <FormInput
          label="Session Title"
          placeholder="e.g., Building Scalable Systems"
          {...register('title')}
          error={errors.title}
        />

        <FormTextarea
          label="Description"
          placeholder="Detailed session description..."
          {...register('description')}
          error={errors.description}
          maxLength={500}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Track (Optional)"
              {...register('track_id')}
              options={trackOptions}
              error={errors.track_id}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Sector (Optional)"
              {...register('sector_id')}
              options={sectorOptions}
              error={errors.sector_id}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Event Day (Optional)"
              {...register('event_day_id')}
              options={eventDayOptions}
              error={errors.event_day_id}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Venue (Optional)"
              {...register('venue_id')}
              options={venueOptions}
              error={errors.venue_id}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="Start Time (Optional)"
              type="datetime-local"
              {...register('starts_at')}
              error={errors.starts_at}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="End Time (Optional)"
              type="datetime-local"
              {...register('ends_at')}
              error={errors.ends_at}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </section>
  )
}
