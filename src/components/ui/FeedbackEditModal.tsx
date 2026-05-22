import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useUpdateFeedback } from '@/lib/api/hooks'
import { feedbackEditSchema } from '@/lib/api/schemas'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'
import type { FeedbackSubmission } from '@/lib/api/types'

interface FeedbackEditModalProps {
  isOpen: boolean
  onClose: () => void
  feedback: FeedbackSubmission
}

export function FeedbackEditModal({ isOpen, onClose, feedback }: FeedbackEditModalProps) {
  const updateMutation = useUpdateFeedback()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackEditSchema),
    defaultValues: {
      star_rating: feedback.star_rating?.toString() || '5',
      review_text: feedback.review_text || '',
      key_takeaway: feedback.key_takeaway || '',
      sentiment_label: feedback.sentiment_label || 'neutral',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: feedback.id,
        star_rating: parseInt(data.star_rating),
        review_text: data.review_text,
        key_takeaway: data.key_takeaway,
        sentiment_label: data.sentiment_label,
      }
      await updateMutation.mutateAsync(payload)
      reset({
        star_rating: feedback.star_rating?.toString() || '5',
        review_text: feedback.review_text || '',
        key_takeaway: feedback.key_takeaway || '',
        sentiment_label: feedback.sentiment_label || 'neutral',
      })
      onClose()
    } catch (error) {
      console.error('Failed to update feedback:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Edit Feedback</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <FormInput
            label="Star Rating (1-5)"
            type="number"
            min="1"
            max="5"
            {...register('star_rating')}
            error={errors.star_rating?.message}
          />

          <FormTextarea
            label="Review"
            placeholder="Enter review text"
            {...register('review_text')}
            error={errors.review_text?.message}
          />

          <FormTextarea
            label="Key Takeaway"
            placeholder="Enter key takeaway"
            {...register('key_takeaway')}
            error={errors.key_takeaway?.message}
          />

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sentiment
            </label>
            <select
              {...register('sentiment_label')}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
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
