import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { speakerSchema, type SpeakerFormData } from '@/lib/api/schemas'
import { useCreateSpeaker } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader } from 'lucide-react'

export default function SpeakerFormIntegrated() {
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
  })

  const createMutation = useCreateSpeaker()
  const isSubmitting = createMutation.isPending

  const onSubmit = async (data: SpeakerFormData) => {
    setApiError('')
    try {
      await createMutation.mutateAsync(data)
      setSubmitted(true)
      reset()
      // Auto-reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
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
            Speaker information has been submitted successfully. You will be redirected to the form shortly.
          </p>
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
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          {...register('email')}
          error={errors.email}
        />

        <FormInput
          label="Title/Position"
          placeholder="CEO, Founder, etc."
          {...register('title')}
          error={errors.title}
        />

        <FormTextarea
          label="Bio"
          placeholder="Brief biography and professional background"
          {...register('bio')}
          error={errors.bio}
          maxLength={500}
        />

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
