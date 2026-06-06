import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { FormInput } from './FormInput'
import { useCreateEventDay, useUpdateEventDay, useEventDayDetail } from '@/lib/api/hooks'

const eventDaySchema = z.object({
  event_id: z.number().min(1, 'Event is required').optional(),
  day_no: z.number().min(1, 'Day number is required'),
  date: z.string().min(1, 'Date is required'),
  label: z.string().optional(),
})

type EventDayFormData = z.infer<typeof eventDaySchema>

interface EventDayManagementModalProps {
  isOpen: boolean
  eventDay?: { id: number; event_id?: number; day_no?: number; date?: string; label?: string | null }
  onClose: () => void
}

export function EventDayManagementModal({ isOpen, eventDay, onClose }: EventDayManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createMutation = useCreateEventDay()
  const updateMutation = useUpdateEventDay()
  const isCreating = !eventDay

  // Fetch fresh data when editing
  const { data: freshEventDay, isLoading: isFetching } = useEventDayDetail(eventDay?.id ?? null)
  const eventDayData = freshEventDay || eventDay

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<EventDayFormData>({
    resolver: zodResolver(eventDaySchema),
    defaultValues: {
      day_no: eventDayData?.day_no ?? 1,
      date: eventDayData?.date || '',
      label: eventDayData?.label || '',
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (freshEventDay) {
      setValue('day_no', freshEventDay.day_no ?? 1)
      setValue('date', freshEventDay.date || '')
      setValue('label', freshEventDay.label || '')
    }
  }, [freshEventDay, setValue])

  const onSubmit = async (data: EventDayFormData) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync(data)
      } else {
        await updateMutation.mutateAsync({ id: eventDay!.id, ...data })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save event day'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCreating ? 'Create Event Day' : 'Edit Event Day'}>
      {isFetching && !isCreating && (
        <div className="text-center text-white/50 py-4">Loading event day data...</div>
      )}
      {!isFetching && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {submitError}
            </div>
          )}
          <FormInput
            label="Day Number"
            type="number"
            error={errors.day_no?.message}
            required
            {...register('day_no', { valueAsNumber: true })}
          />
          <FormInput
            label="Date"
            type="date"
            error={errors.date?.message}
            required
            {...register('date')}
          />
          <FormInput
            label="Label (Optional)"
            placeholder="e.g., Day 1, Opening Day, etc."
            {...register('label')}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-white font-dmSans"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 font-dmSans"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
