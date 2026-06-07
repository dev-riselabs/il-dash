import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { FormInput } from './FormInput'
import { useCreateQuote, useUpdateQuote, useQuoteDetail } from '@/lib/api/hooks'
import type { EventSession, Speaker, SessionQuote } from '@/lib/api/types'

const quoteSchema = z.object({
  quote_text: z.string().min(1, 'Quote text is required'),
  speaker_id: z.number().optional(),
  said_at: z.string().min(1, 'Date/time is required'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface QuoteManagementModalProps {
  isOpen: boolean
  session: EventSession | null
  quote?: SessionQuote | null
  onClose: () => void
  speakers?: Speaker[]
}

export function QuoteManagementModal({ isOpen, session, quote, onClose, speakers = [] }: QuoteManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isCreating = !quote || quote.id === undefined
  
  const createMutation = useCreateQuote()
  const updateMutation = useUpdateQuote()
  const { data: freshQuote } = useQuoteDetail(quote?.id ?? null)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      quote_text: quote?.quote_text || '',
      speaker_id: quote?.speaker_id || undefined,
      said_at: quote?.said_at ? new Date(quote.said_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (!isCreating && freshQuote) {
      setValue('quote_text', freshQuote.quote_text)
      setValue('speaker_id', freshQuote.speaker_id)
      const saidAtDate = new Date(freshQuote.said_at)
      setValue('said_at', saidAtDate.toISOString().slice(0, 16))
    }
  }, [freshQuote, isCreating, setValue])

  // Reset form when opening in create mode
  useEffect(() => {
    if (isOpen && isCreating) {
      reset()
      setSubmitError(null)
    }
  }, [isOpen, isCreating, reset])

  const onSubmit = async (data: QuoteFormData) => {
    if (!session) return
    
    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync({
          event_session_id: session.id,
          quote_text: data.quote_text,
          speaker_id: data.speaker_id,
          said_at: new Date(data.said_at).toISOString(),
        })
      } else if (quote?.id) {
        await updateMutation.mutateAsync({
          id: quote.id,
          data: {
            event_session_id: session.id,
            quote_text: data.quote_text,
            speaker_id: data.speaker_id,
            said_at: new Date(data.said_at).toISOString(),
          },
        })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to ${isCreating ? 'add' : 'update'} quote`
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isCreating ? 'Add' : 'Edit'} Quote in "${session?.title || 'Session'}"`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-white font-lexend mb-2">
            Quote Text <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register('quote_text')}
            rows={4}
            placeholder="Enter the quote..."
            className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white placeholder-white/40 font-dmSans resize-none"
          />
          {errors.quote_text && (
            <p className="mt-1 text-sm text-red-400 font-dmSans">{errors.quote_text.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white font-lexend mb-2">
            Speaker (Optional)
          </label>
          <select
            {...register('speaker_id', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white font-dmSans"
          >
            <option value="">-- Select a Speaker --</option>
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.first_name} {speaker.last_name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Date & Time"
          type="datetime-local"
          required
          error={errors.said_at?.message}
          {...register('said_at')}
        />

        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 font-medium text-sm"
          >
            {isLoading ? (isCreating ? 'Adding...' : 'Updating...') : (isCreating ? 'Add Quote' : 'Update Quote')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

