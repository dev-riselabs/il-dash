import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateSession, useEvents, useTracksList, useSectors, useVenues, useEventDaysList, useSpeakersOptions } from '@/lib/api/hooks'
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
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>(
    (session.speakers || []).map(s => String(s.id))
  )

  const updateMutation = useUpdateSession()
  const { data: events } = useEvents()
  const { data: tracks } = useTracksList()
  const { data: sectors } = useSectors()
  const { data: venues } = useVenues()
  const { data: eventDays } = useEventDaysList({ per_page: 100 })
  const { data: speakersData } = useSpeakersOptions()

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
      event_day_id: session.event_day_id?.toString() || '',
      track_id: session.track_id || '',
      sector_id: session.sector_id || '',
      venue_id: session.venue_id || '',
      status: session.status || 'upcoming',
      starts_at: session.starts_at ? session.starts_at.slice(0, 16) : '',
      ends_at: session.ends_at ? session.ends_at.slice(0, 16) : '',
    },
  })

  const speakerOptions = (speakersData || []).map(s => ({
    value: String(s.id),
    label: `${s.first_name} ${s.last_name}`,
  }))

  const handleAddSpeaker = (speakerId: string) => {
    if (speakerId && !selectedSpeakers.includes(speakerId)) {
      setSelectedSpeakers([...selectedSpeakers, speakerId])
    }
  }

  const handleRemoveSpeaker = (speakerId: string) => {
    setSelectedSpeakers(selectedSpeakers.filter(id => id !== speakerId))
  }

  const availableSpeakers = useMemo(() => {
    return speakerOptions.filter(opt => !selectedSpeakers.includes(opt.value))
  }, [speakerOptions, selectedSpeakers])

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: session.id,
        event_id: parseInt(data.event_id),
        title: data.title,
        description: data.description,
        event_day_id: data.event_day_id ? parseInt(data.event_day_id) : null,
        track_id: data.track_id ? parseInt(data.track_id) : null,
        sector_id: data.sector_id ? parseInt(data.sector_id) : null,
        venue_id: data.venue_id ? parseInt(data.venue_id) : null,
        status: data.status || 'upcoming',
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        speaker_ids: selectedSpeakers.map(id => parseInt(id)),
      }
      await updateMutation.mutateAsync(payload)
      reset({
        event_id: session.event_id || '',
        title: session.title,
        description: session.description || '',
        event_day_id: session.event_day_id?.toString() || '',
        track_id: session.track_id || '',
        sector_id: session.sector_id || '',
        venue_id: session.venue_id || '',
        status: session.status || 'upcoming',
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
            label="Event Day (Optional)"
            options={[
              { value: '', label: 'Select an event day' },
              ...(eventDays?.data ?? []).map((d: any) => ({ 
                value: d.id.toString(), 
                label: d.label ? `Day ${d.day_no} - ${d.label}` : `Day ${d.day_no}`
              }))
            ]}
            {...register('event_day_id')}
            error={errors.event_day_id}
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

          <FormSelect
            label="Status"
            options={[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'live', label: 'Live' },
              { value: 'completed', label: 'Completed' }
            ]}
            {...register('status')}
            error={errors.status}
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

          {/* Multiple Speakers Assignment */}
          <div className="flex flex-col gap-4 border-t border-slate-700 pt-4">
            <label className="text-white font-medium text-sm">
              Assign Speakers 
            </label>

            {/* Speaker selector */}
            {availableSpeakers.length > 0 && (
              <div className="flex gap-2">
                <select
                  onChange={(e) => handleAddSpeaker(e.target.value)}
                  value=""
                  className="flex-1 text-white font-inter border border-slate-600 rounded-lg py-2 px-3 bg-slate-800 text-sm outline-none"
                >
                  <option value="">Select a speaker...</option>
                  {availableSpeakers.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected Speakers Tags */}
            {selectedSpeakers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSpeakers.map(speakerId => {
                  const speakerName = speakerOptions.find(s => s.value === speakerId)?.label
                  return (
                    <div
                      key={speakerId}
                      className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <span>{speakerName}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpeaker(speakerId)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

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
