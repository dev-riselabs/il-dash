import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { FormInput } from './FormInput'
import { useCreateTrack, useUpdateTrack, useTrack } from '@/lib/api/hooks'

const trackSchema = z.object({
  name: z.string().min(1, 'Track name is required').max(160),
  event_id: z.number().min(1, 'Event is required'),
  slug: z.string().optional(),
  color: z.string().optional(),
})

type TrackFormData = z.infer<typeof trackSchema>

interface TrackManagementModalProps {
  isOpen: boolean
  track?: { id: number; name: string; slug?: string; color?: string; event_id?: number }
  eventId: number
  onClose: () => void
}

export function TrackManagementModal({ isOpen, track, eventId, onClose }: TrackManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createMutation = useCreateTrack()
  const updateMutation = useUpdateTrack()
  const isCreating = !track
  
  // Fetch fresh data when editing
  const { data: freshTrack, isLoading: isFetching } = useTrack(track?.id ?? null)
  const trackData = freshTrack || track

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TrackFormData>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      name: trackData?.name || '',
      event_id: eventId,
      slug: trackData?.slug || '',
      color: trackData?.color || '',
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (freshTrack) {
      setValue('name', freshTrack.name || '')
      setValue('slug', freshTrack.slug || '')
      setValue('color', freshTrack.color || '')
    }
  }, [freshTrack, setValue])

  // Reset form when opening in create mode
  useEffect(() => {
    if (isOpen && isCreating) {
      reset()
    }
  }, [isOpen, isCreating, reset])

  const onSubmit = async (data: TrackFormData) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync(data)
      } else {
        await updateMutation.mutateAsync({ id: track!.id, ...data })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save track'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCreating ? 'Create Track' : 'Edit Track'}>
      {isFetching && !isCreating && (
        <div className="text-center text-white/50 py-4">Loading track data...</div>
      )}
      {!isFetching && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}
        <FormInput
          label="Track Name"
          error={errors.name?.message}
          required
          {...register('name')}
        />
        <FormInput
          label="Slug"
          hint="Auto-generated from name if left empty"
          {...register('slug')}
        />
        <FormInput
          label="Color"
          type="text"
          placeholder="#000000"
          {...register('color')}
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
