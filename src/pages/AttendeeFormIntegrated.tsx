import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { attendeeSchema, type AttendeeFormData } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { AlertCircle, Loader } from 'lucide-react'

export default function AttendeeFormIntegrated() {
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  })

  const onSubmit = async (data: AttendeeFormData) => {
    setApiError('')
    try {
      // TODO: Add useCreateAttendee mutation hook
      console.log('Attendee form data:', data)
      setSubmitted(true)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit form')
    }
  }

  if (submitted) {
    return (
      <section className="space-y-6">
        <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
          <h1 className="text-3xl font-semibold font-lexend text-white">
            Thank You!
          </h1>
          <p className="text-base font-lexend text-white">
            Your attendee information has been submitted successfully
          </p>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Attendee Form
        </h1>
        <p className="text-base font-lexend text-white">
          Fill this out to register as an attendee
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
          label="Phone"
          type="tel"
          placeholder="+234 800 000 0000"
          {...register('phone')}
          error={errors.phone}
        />

        <FormSelect
          label="Nationality"
          {...register('nationality')}
          options={[
            { value: 'Nigeria', label: 'Nigeria' },
            { value: 'Ghana', label: 'Ghana' },
            { value: 'Kenya', label: 'Kenya' },
            { value: 'South Africa', label: 'South Africa' },
            { value: 'United States', label: 'United States' },
            { value: 'United Kingdom', label: 'United Kingdom' },
            { value: 'Other', label: 'Other' },
          ]}
          error={errors.nationality}
        />

        <FormSelect
          label="Attendee Category"
          {...register('category')}
          options={[
            { value: 'Entrepreneur', label: 'Entrepreneur' },
            { value: 'Investor', label: 'Investor' },
            { value: 'Corporate', label: 'Corporate' },
            { value: 'Media', label: 'Media' },
            { value: 'Student', label: 'Student' },
            { value: 'Other', label: 'Other' },
          ]}
          error={errors.category}
        />

        <FormInput
          label="Date of Birth (optional)"
          type="date"
          {...register('date_of_birth')}
          error={errors.date_of_birth}
        />

        <button 
          type="submit"
          className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center hover:bg-gray-100 transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
