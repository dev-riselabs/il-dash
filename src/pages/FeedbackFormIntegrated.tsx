import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema, type FeedbackFormData } from '@/lib/api/schemas'
import { useCreateFeedback, useSessions } from '@/lib/api/hooks'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { AlertCircle, Loader, Star, ArrowRight } from 'lucide-react'

export default function FeedbackFormIntegrated() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      star_rating: 0,
    },
  })

  const createMutation = useCreateFeedback()
  const { data: sessionsData } = useSessions()
  const isSubmitting = createMutation.isPending
  const rating = watch('star_rating')

  const sessionOptions = (sessionsData?.data || []).map(s => ({
    value: String(s.id),
    label: s.title,
  }))

  const onSubmit = async (data: FeedbackFormData) => {
    setApiError('')
    try {
      await createMutation.mutateAsync({
        ...data,
        session_id: parseInt(data.session_id),
        star_rating: Number(data.star_rating),
      })
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit feedback')
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
            Your feedback has been submitted successfully. We appreciate your input!
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
          Feedback Form
        </h1>
        <p className="text-base font-lexend text-white">
          Share your thoughts about the session
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <FormSelect
          label="Session"
          {...register('session_id')}
          options={sessionOptions}
          error={errors.session_id}
        />

        <div className="flex flex-col gap-4">
          <label className="text-white font-inter text-sm">
            Star Rating <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-4">
            <Controller
              name="star_rating"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (field.value || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-600 text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            />
            {rating > 0 && <span className="text-slate-300 text-sm ml-4">{rating}/5 stars</span>}
          </div>
          {errors.star_rating && (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{errors.star_rating.message}</span>
            </div>
          )}
        </div>

        <FormTextarea
          label="Comments"
          placeholder="Share your feedback and key takeaways..."
          {...register('comment')}
          error={errors.comment}
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
