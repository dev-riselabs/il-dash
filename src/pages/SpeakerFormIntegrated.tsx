import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { speakerSchema, type SpeakerFormData } from '@/lib/api/schemas'
import { useCreateSpeaker, useSessionOptions, useCountries } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader, ArrowRight, RotateCcw, X } from 'lucide-react'

export default function SpeakerFormIntegrated() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
  })

  const createMutation = useCreateSpeaker()
  const { data: sessionsData } = useSessionOptions()
  const { data: countriesData } = useCountries()
  const isSubmitting = createMutation.isPending

  const handleUploadMore = () => {
    setSubmitted(false)
    reset()
    setSelectedSessions([])
  }

  const sessionOptions = (sessionsData || []).map(s => ({
    value: String(s.id),
    label: s.title,
  }))

  const countryOptions = (countriesData || []).map(c => ({
    value: c.id,
    label: c.name,
  }))

  const handleAddSession = (sessionId: string) => {
    if (sessionId && !selectedSessions.includes(sessionId)) {
      setSelectedSessions([...selectedSessions, sessionId])
    }
  }

  const handleRemoveSession = (sessionId: string) => {
    setSelectedSessions(selectedSessions.filter(id => id !== sessionId))
  }

  const onSubmit = async (data: SpeakerFormData) => {
    setApiError('')
    try {
      const payload: any = {
        first_name: data.first_name,
        last_name: data.last_name,
      }
      if (data.job_title) payload.job_title = data.job_title
      if (data.organization) payload.organization = data.organization
      if (data.country) payload.country = data.country
      if (data.bio) payload.bio = data.bio
      if (selectedSessions.length > 0) {
        payload.session_ids = selectedSessions.map(id => parseInt(id))
      }

      await createMutation.mutateAsync(payload)
      setSubmitted(true)
      reset()
      setSelectedSessions([])
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
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUploadMore}
              className="bg-white/10 border border-white/20 rounded-lg px-6 font-medium py-3 font-inter text-white text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Upload More
            </button>
            <button
              onClick={() => navigate('/speaker')}
              className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Go to Speakers
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
          Speaker Form
        </h1>
        <p className="text-base font-lexend text-white">
          Tell us about the speaker
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
          label="Job Title / Position (Optional)"
          placeholder="Software Engineer"
          {...register('job_title')}
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

        {/* Multiple Sessions Assignment */}
        <div className="flex flex-col gap-4">
          <label className="text-white font-inter text-sm font-medium">
            Assign to Sessions (Optional)
          </label>
          
          {/* Session selector */}
          <div className="flex gap-2">
            <select
              onChange={(e) => handleAddSession(e.target.value)}
              value=""
              className="flex-1 text-white font-inter border border-white/55 rounded-xl py-3 px-4 bg-white/10 text-sm outline-none"
            >
              <option value="">Select a session...</option>
              {sessionOptions
                .filter(opt => !selectedSessions.includes(opt.value))
                .map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Selected Sessions Tags */}
          {selectedSessions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedSessions.map(sessionId => {
                const sessionName = sessionOptions.find(s => s.value === sessionId)?.label
                return (
                  <div
                    key={sessionId}
                    className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-3 py-2 text-white font-inter text-sm"
                  >
                    <span>{sessionName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSession(sessionId)}
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


