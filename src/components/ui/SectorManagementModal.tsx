import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Modal } from './Modal'
import { FormInput } from './FormInput'
import { useCreateSector, useUpdateSector, useSectorDetail } from '@/lib/api/hooks'

const sectorSchema = z.object({
  name: z.string().min(1, 'Sector name is required').max(160),
  slug: z.string().optional(),
  color: z.string().optional(),
})

type SectorFormData = z.infer<typeof sectorSchema>

interface SectorManagementModalProps {
  isOpen: boolean
  sector?: { id: number; name: string; slug?: string; color?: string }
  onClose: () => void
}

export function SectorManagementModal({ isOpen, sector, onClose }: SectorManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createMutation = useCreateSector()
  const updateMutation = useUpdateSector()
  const isCreating = !sector
  
  // Fetch fresh data when editing
  const { data: freshSector, isLoading: isFetching } = useSectorDetail(sector?.id ?? null)
  const sectorData = freshSector || sector

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<SectorFormData>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      name: sectorData?.name || '',
      slug: sectorData?.slug || '',
      color: sectorData?.color || '',
    },
  })

  // Update form when fresh data arrives
  useEffect(() => {
    if (freshSector) {
      setValue('name', freshSector.name || '')
      setValue('slug', freshSector.slug || '')
      setValue('color', freshSector.color || '')
    }
  }, [freshSector, setValue])

  // Reset form when opening in create mode
  useEffect(() => {
    if (isOpen && isCreating) {
      reset()
    }
  }, [isOpen, isCreating, reset])

  const onSubmit = async (data: SectorFormData) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      if (isCreating) {
        await createMutation.mutateAsync(data)
      } else {
        await updateMutation.mutateAsync({ id: sector!.id, ...data })
      }
      reset()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save sector'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCreating ? 'Create Sector' : 'Edit Sector'}>
      {isFetching && !isCreating && (
        <div className="text-center text-white/50 py-4">Loading sector data...</div>
      )}
      {!isFetching && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}
        <FormInput
          label="Sector Name"
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
