import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { speakerSchema, type SpeakerFormData } from '@/lib/api/schemas'
import { useCreateSpeaker, useSessionOptions, useCountries, useJobTitles } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader, ArrowRight } from 'lucide-react'

export default function SpeakerFormIntegrated() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
  })

  const createMutation = useCreateSpeaker()
  const { data: sessionsData } = useSessionOptions()
  const { data: countriesData } = useCountries()
  const { data: jobTitlesData } = useJobTitles()
  const isSubmitting = createMutation.isPending

  const sessionOptions = (sessionsData || []).map(s => ({
    value: String(s.id),
    label: s.title,
  }))

  const countryOptions = (countriesData || []).map(c => ({
    value: c.id,
    label: c.name,
  }))

  const jobTitleOptions = (jobTitlesData || []).map(t => ({
    value: t.id,
    label: t.name,
  }))

  const roleOptions = [
    { value: 'keynote', label: 'Keynote' },
    { value: 'panelist', label: 'Panelist' },
    { value: 'moderator', label: 'Moderator' },
  ]

  const onSubmit = async (data: SpeakerFormData) => {
    setApiError('')
    try {
      const payload = {
        ...data,
        ...(data.session_id && { session_id: parseInt(data.session_id) }),
      }
      await createMutation.mutateAsync(payload)
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit speaker information')
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
            Speaker information has been submitted successfully.
          </p>
          <button
            onClick={() => navigate('/overview')}
            className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm self-start hover:bg-gray-100 transition-colors flex items-center gap-2 mt-4"
          >
            Go to Dashboard
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
          Speaker Form
        </h1>
        <p className="text-base font-lexend text-white">
          Tell us about the speaker
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex gap-3">
          <div className="flex-1">
            <FormInput
              label="First Name"
              placeholder="Jane"
              {...register('first_name')}
              error={errors.first_name}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Last Name"
              placeholder="Doe"
              {...register('last_name')}
              error={errors.last_name}
            />
          </div>
        </div>

        <FormInput
          label="Email Address (Optional)"
          type="email"
          placeholder="jane@example.com"
          {...register('email')}
          error={errors.email}
        />

        <FormSelect
          label="Job Title / Position (Optional)"
          {...register('job_title')}
          options={jobTitleOptions}
          error={errors.job_title}
        />

        <FormInput
          label="Organization (Optional)"
          placeholder="Company or Institution Name"
          {...register('organization')}
          error={errors.organization}
        />

        <FormSelect
          label="Country (Optional)"
          {...register('country')}
          options={countryOptions}
          error={errors.country}
        />

        <FormTextarea
          label="Bio (Optional)"
          placeholder="Brief biography and professional background"
          {...register('bio')}
          error={errors.bio}
          maxLength={500}
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
            <FormSelect
              label="Speaker Role (Optional)"
              {...register('role')}
              options={roleOptions}
              error={errors.role}
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


