import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { useCreateSessionInsight, useUpdateSessionInsight, useSessionInsightDetail } from '@/lib/api/hooks'
import type { EventSession, SessionInsight } from '@/lib/api/types'

const insightSchema = z.object({
  body: z.string().min(1, 'Insight body is required'),
  kind: z.enum(['insight', 'theme']).optional().default('insight'),
  order: z.number().optional(),
})

type InsightFormData = z.infer<typeof insightSchema>

interface InsightManagementModalProps {
  isOpen: boolean
  session: EventSession | null
  insight?: SessionInsight | null
  onClose: () => void
}

export function InsightManagementModal({ isOpen, session, insight, onClose }: InsightManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createMutation = useCreateSessionInsight()
  const updateMutation = useUpdateSessionInsight()
  const isCreating = !insight

  // Fetch fresh data when editing
  const { data: freshInsight, isLoading: isFetching } = useSessionInsightDetail(insight?.id ?? null)
  const insightData = freshInsight || insight

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InsightFormData>({
    resolver: zodResolver(insightSchema),
    defaultValues: {
      body: insightData?.body || '',
      kind: (insightData?.kind as 'insight' | 'theme') || 'insight',
      order: undefined,
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (freshInsight) {
      setValue('body', freshInsight.body || '')
      setValue('kind', (freshInsight.kind as 'insight' | 'theme') || 'insight')
    }
  }, [freshInsight, setValue])

  // Reset form when opening in create mode
  useEffect(() => {
    if (isOpen && isCreating) {
      reset()
    }
  }, [isOpen, isCreating, reset])

  const onSubmit = async (data: InsightFormData) => {
    if (!session) return

    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync({
          event_session_id: session.id,
          body: data.body,
          kind: data.kind,
        })
      } else {
        await updateMutation.mutateAsync({
          id: insight!.id,
          body: data.body,
          kind: data.kind,
        })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save insight'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCreating ? 'Add Insight' : 'Edit Insight'}>
      {isFetching && !isCreating && (
        <div className="text-center text-white/50 py-4">Loading insight data...</div>
      )}
      {!isFetching && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {submitError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-white font-lexend mb-2">
              Insight/Theme <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('body')}
              rows={4}
              placeholder="Enter the insight or key takeaway..."
              className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white placeholder-white/40 font-dmSans resize-none"
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-400 font-dmSans">{errors.body.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white font-lexend mb-2">
              Type
            </label>
            <select
              {...register('kind')}
              className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white font-dmSans"
            >
              <option value="insight">Insight</option>
              <option value="theme">Theme</option>
            </select>
          </div>

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
              {isLoading ? 'Saving...' : isCreating ? 'Add Insight' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
