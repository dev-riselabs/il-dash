import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { useCreateVenue, useUpdateVenue, useVenueDetail } from '@/lib/api/hooks'

const venueSchema = z.object({
  name: z.string().min(1, 'Venue name is required').max(160),
  slug: z.string().optional(),
  capacity: z.number().optional(),
  status: z.enum(['available', 'unavailable']).optional(),
})

type VenueFormData = z.infer<typeof venueSchema>

interface VenueManagementModalProps {
  isOpen: boolean
  venue?: { id: number; name: string; slug?: string; capacity?: number; status?: string }
  onClose: () => void
}

export function VenueManagementModal({ isOpen, venue, onClose }: VenueManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createMutation = useCreateVenue()
  const updateMutation = useUpdateVenue()
  const isCreating = !venue
  
  // Fetch fresh data when editing
  const { data: freshVenue, isLoading: isFetching } = useVenueDetail(venue?.id ?? null)
  const venueData = freshVenue || venue

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<VenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: venueData?.name || '',
      slug: venueData?.slug || '',
      capacity: venueData?.capacity || undefined,
      status: venueData?.status || 'available',
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (freshVenue) {
      setValue('name', freshVenue.name || '')
      setValue('slug', freshVenue.slug || '')
      setValue('capacity', freshVenue.capacity || undefined)
      setValue('status', freshVenue.status || 'available')
    }
  }, [freshVenue, setValue])

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
  ]

  const onSubmit = async (data: VenueFormData) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync(data)
      } else {
        await updateMutation.mutateAsync({ id: venue!.id, ...data })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save venue'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCreating ? 'Create Venue' : 'Edit Venue'}>
      {isFetching && !isCreating && (
        <div className="text-center text-white/50 py-4">Loading venue data...</div>
      )}
      {!isFetching && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}
        <FormInput
          label="Venue Name"
          error={errors.name?.message}
          required
          {...register('name')}
        />
        <FormInput
          label="Slug"
          {...register('slug')}
        />
        <FormInput
          label="Capacity"
          type="number"
          {...register('capacity', { valueAsNumber: true })}
        />
        <FormSelect
          label="Status"
          options={statusOptions}
          {...register('status')}
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
