
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { dealSchema, type DealFormData } from '@/lib/api/schemas'
import { useCreateDeal, useUpdateDeal, useSectorOptions, useDeals } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { AlertCircle, Loader, ArrowRight } from 'lucide-react'

function DealRoomForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEditing = !!id
  
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
  })

  // Fetch deal data when editing
  const { data: dealsData, isLoading: dealsLoading } = useDeals({ per_page: 100 }, { enabled: isEditing })
  const dealToEdit = isEditing ? dealsData?.data?.find(d => d.id === parseInt(id!)) : null

  const createMutation = useCreateDeal()
  const updateMutation = useUpdateDeal()
  const { data: sectorsData } = useSectorOptions()
  
  const isSubmitting = isEditing ? updateMutation.isPending : createMutation.isPending

  // Populate form with deal data when editing
  useEffect(() => {
    if (isEditing && dealToEdit) {
      setValue('title', dealToEdit.title)
      if (dealToEdit.sector_id) setValue('sector_id', String(dealToEdit.sector_id))
      if (dealToEdit.investor_name) setValue('investor_name', dealToEdit.investor_name)
      if (dealToEdit.stage) setValue('stage', dealToEdit.stage)
      if (dealToEdit.value_naira) setValue('value_naira', dealToEdit.value_naira)
    }
  }, [dealToEdit, isEditing, setValue])

  const sectorOptions = (sectorsData || []).map(s => ({
    value: String(s.id),
    label: s.name,
  }))

  const stageOptions = [
    { value: 'discussion', label: 'Discussion' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'commitment', label: 'Commitment' },
    { value: 'closed_won', label: 'Closed Won' },
    { value: 'closed_lost', label: 'Closed Lost' },
  ]

  const onSubmit = async (data: DealFormData) => {
    setApiError('')
    try {
      const payload = {
        title: data.title,
        ...(data.investor_name && { investor_name: data.investor_name }),
        ...(data.sector_id && { sector_id: parseInt(data.sector_id) }),
        ...(data.stage && { stage: data.stage }),
        ...(data.value_naira !== null && { value_naira: data.value_naira }),
      }
      
      if (isEditing && id) {
        await updateMutation.mutateAsync({ id: parseInt(id), ...payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit deal information')
    }
  }

  if (isEditing && dealsLoading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-white" />
      </section>
    )
  }

  if (submitted) {
    return (
      <section className="space-y-6 max-w-3xl w-full mx-auto">
        <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-cyan-500">
          <h1 className="text-3xl font-semibold font-lexend text-white">
            Thank You!
          </h1>
          <p className="text-base font-lexend text-white">
            Deal information has been {isEditing ? 'updated' : 'submitted'} successfully.
          </p>
          <button
            onClick={() => navigate('/dealroom')}
            className="bg-white rounded-lg px-6 font-medium py-3 font-inter text-black text-sm self-start hover:bg-gray-100 transition-colors flex items-center gap-2 mt-4"
          >
            Go to Deals
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-6 max-w-3xl w-full mx-auto">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-orange500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          {isEditing ? 'Edit Deal' : 'Deal Room Form'}
        </h1>
        <p className="text-base font-lexend text-white">
          {isEditing ? 'Update deal information' : 'Create and manage deal room records'}
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
              label="Deal Title"
              placeholder="e.g., Series A Funding Round"
              {...register('title')}
              error={errors.title}
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Sector"
              options={sectorOptions}
              {...register('sector_id')}
              error={errors.sector_id}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Investor / Partner"
              placeholder="e.g., Acme Corporation"
              {...register('investor_name')}
              error={errors.investor_name}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Deal Stage"
              options={stageOptions}
              {...register('stage')}
              error={errors.stage}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Deal Value (Naira)"
              type="number"
              placeholder="e.g., 50000000"
              {...register('value_naira')}
              error={errors.value_naira}
            />
          </div>
        </div>



        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white rounded-lg px-40 font-medium py-4 font-inter text-black text-sm self-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            isEditing ? 'Update Deal' : 'Submit'
          )}
        </button>
      </form>
    </section>
  )
}

export default DealRoomForm