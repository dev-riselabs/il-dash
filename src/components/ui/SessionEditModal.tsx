import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateSession, useEvents, useTracksList, useSectors, useVenues } from '@/lib/api/hooks'
import { sessionSchema } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import type { EventSession } from '@/lib/api/types'

interface SessionEditModalProps {
  isOpen: boolean
  onClose: () => void
  session: EventSession
}

export function SessionEditModal({ isOpen, onClose, session }: SessionEditModalProps) {
  const updateMutation = useUpdateSession()
  const { data: events } = useEvents()
  const { data: tracks } = useTracksList()
  const { data: sectors } = useSectors()
  const { data: venues } = useVenues()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      event_id: session.event_id || '',
      title: session.title,
      description: session.description || '',
      track_id: session.track_id || '',
      sector_id: session.sector_id || '',
      venue_id: session.venue_id || '',
      starts_at: session.starts_at ? session.starts_at.slice(0, 16) : '',
      ends_at: session.ends_at ? session.ends_at.slice(0, 16) : '',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: session.id,
        event_id: parseInt(data.event_id),
        title: data.title,
        description: data.description,
        track_id: data.track_id ? parseInt(data.track_id) : null,
        sector_id: data.sector_id ? parseInt(data.sector_id) : null,
        venue_id: data.venue_id ? parseInt(data.venue_id) : null,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
      }
      await updateMutation.mutateAsync(payload)
      reset({
        event_id: session.event_id || '',
        title: session.title,
        description: session.description || '',
        track_id: session.track_id || '',
        sector_id: session.sector_id || '',
        venue_id: session.venue_id || '',
        starts_at: session.starts_at ? session.starts_at.slice(0, 16) : '',
        ends_at: session.ends_at ? session.ends_at.slice(0, 16) : '',
      })
      onClose()
    } catch (error) {
      console.error('Failed to update session:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Edit Session</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <FormSelect
            label="Event"
            options={[
              { value: '', label: 'Select an event' },
              ...(events ?? []).map(e => ({ value: e.id.toString(), label: e.name }))
            ]}
            {...register('event_id')}
            error={errors.event_id}
          />

          <FormInput
            label="Title"
            placeholder="Enter session title"
            {...register('title')}
            error={errors.title}
          />

          <FormTextarea
            label="Description"
            placeholder="Enter session description"
            {...register('description')}
            error={errors.description}
          />

          <FormSelect
            label="Track (Optional)"
            options={[
              { value: '', label: 'Select a track' },
              ...(tracks?.data ?? []).map((t: any) => ({ value: t.id.toString(), label: t.name }))
            ]}
            {...register('track_id')}
            error={errors.track_id}
          />

          <FormSelect
            label="Sector (Optional)"
            options={[
              { value: '', label: 'Select a sector' },
              ...(sectors ?? []).map(s => ({ value: s.id.toString(), label: s.name }))
            ]}
            {...register('sector_id')}
            error={errors.sector_id}
          />

          <FormSelect
            label="Venue (Optional)"
            options={[
              { value: '', label: 'Select a venue' },
              ...(venues ?? []).map(v => ({ value: v.id.toString(), label: v.name }))
            ]}
            {...register('venue_id')}
            error={errors.venue_id}
          />

          <FormInput
            label="Start Time (Optional)"
            type="datetime-local"
            {...register('starts_at')}
            error={errors.starts_at}
          />

          <FormInput
            label="End Time (Optional)"
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
