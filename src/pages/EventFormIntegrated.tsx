import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventFormData } from '@/lib/api/schemas'
import { useCreateEvent } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader, ArrowRight } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function EventFormIntegrated() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { status: 'upcoming' },
  })

  const createMutation = useCreateEvent()
  const isSubmitting = createMutation.isPending

  const onSubmit = async (data: EventFormData) => {
    setApiError('')
    try {
      const payload: Record<string, unknown> = {
        name: data.name,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        status: data.status || 'upcoming',
      }
      if (data.slug) payload.slug = data.slug
      if (data.description) payload.description = data.description
      if (data.location) payload.location = data.location

      await createMutation.mutateAsync(payload)
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit event')
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
            Event has been created successfully.
          </p>
          <button
            onClick={() => navigate('/event')}
            className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm self-start hover:bg-gray-100 transition-colors flex items-center gap-2 mt-4"
          >
            View Events
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Event Form
        </h1>
        <p className="text-base font-lexend text-white">
          Create a new event
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <FormInput
          label="Event Name"
          placeholder="e.g., Invest Lagos Summit 2026"
          {...register('name')}
          error={errors.name}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="Slug (Optional)"
              placeholder="e.g., invest-lagos-2026"
              {...register('slug')}
              error={errors.slug}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Status"
              options={STATUS_OPTIONS}
              {...register('status')}
              error={errors.status}
            />
          </div>
        </div>

        <FormInput
          label="Location (Optional)"
          placeholder="e.g., Eko Convention Centre, Lagos"
          {...register('location')}
          error={errors.location}
        />

        <FormTextarea
          label="Description (Optional)"
          placeholder="Brief description of the event..."
          {...register('description')}
          error={errors.description}
          maxLength={1000}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="Start Date & Time"
              type="datetime-local"
              {...register('starts_at')}
              error={errors.starts_at}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="End Date & Time"
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
