import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateSpeaker, useCountries, useSessionOptions } from '@/lib/api/hooks'
import { speakerSchema } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import type { Speaker } from '@/lib/api/types'

interface SpeakerEditModalProps {
  isOpen: boolean
  onClose: () => void
  speaker: Speaker
}

export function SpeakerEditModal({ isOpen, onClose, speaker }: SpeakerEditModalProps) {
  const updateMutation = useUpdateSpeaker()
  const { data: countriesData } = useCountries()
  const { data: sessionsData } = useSessionOptions()

  const countryOptions = (countriesData || []).map(c => ({
    value: c.id,
    label: c.name,
  }))

  const sessionOptions = (sessionsData || []).map(s => ({
    value: String(s.id),
    label: s.title,
  }))

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      first_name: speaker.first_name,
      last_name: speaker.last_name,
      job_title: speaker.job_title || '',
      organization: speaker.organization || '',
      country: speaker.country || '',
      bio: speaker.bio || '',
      session_id: '',
      role: speaker.role || '',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: speaker.id,
        first_name: data.first_name,
        last_name: data.last_name,
        job_title: data.job_title,
        organization: data.organization,
        country: data.country,
        bio: data.bio,
      }
      await updateMutation.mutateAsync(payload)
      reset({
        first_name: speaker.first_name,
        last_name: speaker.last_name,
        job_title: speaker.job_title || '',
        organization: speaker.organization || '',
        country: speaker.country || '',
        bio: speaker.bio || '',
        session_id: '',
        role: speaker.role || '',
      })
      onClose()
    } catch (error) {
      console.error('Failed to update speaker:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Edit Speaker</h2>
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
            label="Job Title / Position"
            placeholder="Enter job title or position"
            {...register('job_title')}
            error={errors.job_title}
          />

          <FormInput
            label="Organization"
            placeholder="Enter organization"
            {...register('organization')}
            error={errors.organization}
          />

          <FormSelect
            label="Country"
            {...register('country')}
            options={countryOptions}
            error={errors.country}
          />

          <FormTextarea
            label="Bio"
            placeholder="Enter speaker bio"
            {...register('bio')}
            error={errors.bio}
          />

          <div className="flex gap-3">
            <div className="flex-1">
              <FormSelect
                label="Session (Optional)"
                {...register('session_id')}
                options={sessionOptions}
                error={errors.session_id}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Speaker Role (Optional)"
                placeholder="e.g., Keynote, Panelist, Moderator"
                {...register('role')}
                error={errors.role}
              />
            </div>
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
