import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateEvent } from '@/lib/api/hooks'
import { eventSchema, type EventFormData } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import type { Event } from '@/lib/api/types'

interface EventEditModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event
}

const STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function EventEditModal({ isOpen, onClose, event }: EventEditModalProps) {
  const updateMutation = useUpdateEvent()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event.name,
      slug: event.slug ?? '',
      description: event.description ?? '',
      location: event.location ?? '',
      starts_at: event.starts_at ? event.starts_at.slice(0, 16) : '',
      ends_at: event.ends_at ? event.ends_at.slice(0, 16) : '',
      status: (event.status as EventFormData['status']) ?? 'upcoming',
    },
  })

  const onSubmit = async (data: EventFormData) => {
    try {
      const payload: Record<string, unknown> = {
        id: event.id,
        name: data.name,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        status: data.status || 'upcoming',
        description: data.description ?? null,
        location: data.location ?? null,
      }
      if (data.slug) payload.slug = data.slug

      await updateMutation.mutateAsync(payload as Record<string, unknown> & { id: number })
      reset({
        name: data.name,
        slug: data.slug ?? '',
        description: data.description ?? '',
        location: data.location ?? '',
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        status: data.status,
      })
      onClose()
    } catch (error) {
      console.error('Failed to update event:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <FormInput
            label="Event Name"
            placeholder="Enter event name"
            {...register('name')}
            error={errors.name}
          />

          <FormInput
            label="Slug (Optional)"
            placeholder="e.g., invest-lagos-2026"
            {...register('slug')}
            error={errors.slug}
          />

          <FormSelect
            label="Status"
            options={STATUS_OPTIONS}
            {...register('status')}
            error={errors.status}
          />

          <FormInput
            label="Location"
            placeholder="e.g., Eko Convention Centre, Lagos"
            {...register('location')}
            error={errors.location}
          />

          <FormTextarea
            label="Description"
            placeholder="Brief description of the event..."
            {...register('description')}
            error={errors.description}
          />

          <FormInput
            label="Start Date & Time"
            type="datetime-local"
            {...register('starts_at')}
            error={errors.starts_at}
          />

          <FormInput
            label="End Date & Time"
            type="datetime-local"
            {...register('ends_at')}
            error={errors.ends_at}
          />

          <div className="flex gap-3 pt-4 border-t border-slate-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition-colors disabled:opacity-50 font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
