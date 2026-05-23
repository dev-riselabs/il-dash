import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateAttendee, useTracks, useSectors, useEvents } from '@/lib/api/hooks'
import { attendeeSchema } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import type { Attendee } from '@/lib/api/types'

interface AttendeeEditModalProps {
  isOpen: boolean
  onClose: () => void
  attendee: Attendee
}

export function AttendeeEditModal({ isOpen, onClose, attendee }: AttendeeEditModalProps) {
  const updateMutation = useUpdateAttendee()
  const eventsQ = useEvents()
  const tracksQ = useTracks()
  const sectorsQ = useSectors()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      first_name: attendee.first_name,
      last_name: attendee.last_name,
      email: attendee.email || '',
      job_title: attendee.job_title || '',
      organization: attendee.organization || '',
      country: attendee.country || '',
      region: attendee.region || '',
      gender: attendee.gender || '',
      category: attendee.category || '',
      event_id: attendee.event_id ? String(attendee.event_id) : '',
      track_id: attendee.track_id ? String(attendee.track_id) : '',
      sector_id: attendee.sector_id ? String(attendee.sector_id) : '',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: attendee.id,
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
      }
      await updateMutation.mutateAsync(payload)
      reset({
        first_name: attendee.first_name,
        last_name: attendee.last_name,
        email: attendee.email || '',
        job_title: attendee.job_title || '',
        organization: attendee.organization || '',
        country: attendee.country || '',
        region: attendee.region || '',
        gender: attendee.gender || '',
        category: attendee.category || '',
        event_id: attendee.event_id ? String(attendee.event_id) : '',
        track_id: attendee.track_id ? String(attendee.track_id) : '',
        sector_id: attendee.sector_id ? String(attendee.sector_id) : '',
      })
      onClose()
    } catch (error) {
      console.error('Failed to update attendee:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Edit Attendee</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              {...register('first_name')}
              error={errors.first_name}
            />
            <FormInput
              label="Last Name"
              placeholder="Enter last name"
              {...register('last_name')}
              error={errors.last_name}
            />
          </div>

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter email address"
            {...register('email')}
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Job Title"
              placeholder="Enter job title"
              {...register('job_title')}
              error={errors.job_title}
            />
            <FormInput
              label="Organization"
              placeholder="Enter organization"
              {...register('organization')}
              error={errors.organization}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Country"
              placeholder="Enter country"
              {...register('country')}
              error={errors.country}
            />
            <FormInput
              label="Region"
              placeholder="Enter region"
              {...register('region')}
              error={errors.region}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Gender"
              {...register('gender')}
              options={[
                { value: '', label: 'Select gender' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              error={errors.gender}
            />
            <FormSelect
              label="Category"
              {...register('category')}
              options={[
                { value: '', label: 'Select category' },
                { value: 'Entrepreneur', label: 'Entrepreneur' },
                { value: 'Investor', label: 'Investor' },
                { value: 'Corporate', label: 'Corporate' },
                { value: 'Media', label: 'Media' },
                { value: 'Student', label: 'Student' },
                { value: 'Government', label: 'Government' },
                { value: 'Other', label: 'Other' },
              ]}
              error={errors.category}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Event"
              {...register('event_id')}
              options={[
                { value: '', label: 'Select event' },
                ...(eventsQ.data ?? []).map(e => ({ value: String(e.id), label: e.name }))
              ]}
              error={errors.event_id}
            />
            <FormSelect
              label="Track"
              {...register('track_id')}
              options={[
                { value: '', label: 'Select track' },
                ...(tracksQ.data ?? []).map(t => ({ value: String(t.id), label: t.name }))
              ]}
              error={errors.track_id}
            />
          </div>

          <FormSelect
            label="Sector"
            {...register('sector_id')}
            options={[
              { value: '', label: 'Select sector' },
              ...(sectorsQ.data ?? []).map(s => ({ value: String(s.id), label: s.name }))
            ]}
            error={errors.sector_id}
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
