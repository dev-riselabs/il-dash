
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { dealSchema, type DealFormData } from '@/lib/api/schemas'
import { useCreateDeal, useSectorOptions, useInvestorOptions, useOwners } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { AlertCircle, Loader, ArrowRight } from 'lucide-react'

function DealRoomForm() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
  })

  const createMutation = useCreateDeal()
  const { data: sectorsData } = useSectorOptions()
  const { data: investorsData } = useInvestorOptions()
  const { data: ownersData } = useOwners()
  const isSubmitting = createMutation.isPending

  const sectorOptions = (sectorsData || []).map(s => ({
    value: String(s.id),
    label: s.name,
  }))

  const investorOptions = (investorsData || []).map(i => ({
    value: String(i.id),
    label: i.name,
  }))

  const ownerOptions = (ownersData || []).map(o => ({
    value: String(o.id),
    label: o.name,
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
        ...(data.investor_id && { investor_id: parseInt(data.investor_id) }),
        ...(data.sector_id && { sector_id: parseInt(data.sector_id) }),
        ...(data.owner_id && { owner_id: parseInt(data.owner_id) }),
        ...(data.stage && { stage: data.stage }),
        ...(data.value_naira !== null && { value_naira: data.value_naira }),
      }
      await createMutation.mutateAsync(payload)
      setSubmitted(true)
      reset()
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to submit deal information')
    }
  }

  if (submitted) {
    return (
      <section className="space-y-6 max-w-3xl w-full mx-auto">
        <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-cyan-500">
          <h1 className="text-3xl font-semibold font-lexend text-white">
            Thank You!
          </h1>
          <p className="text-base font-lexend text-white">
            Deal information has been submitted successfully.
          </p>
          <button
            onClick={() => navigate('/deal-room')}
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
          Deal Room Form
        </h1>
        <p className="text-base font-lexend text-white">
          Create and manage deal room records
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
            <FormSelect
              label="Investor / Partner"
              options={investorOptions}
              {...register('investor_id')}
              error={errors.investor_id}
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

        <div className="flex gap-3">
          <div className="flex-1">
            <FormSelect
              label="Owner"
              options={ownerOptions}
              {...register('owner_id')}
              error={errors.owner_id}
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

export default DealRoomForm