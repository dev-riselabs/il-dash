import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminSignupSchema, type AdminSignupFormData } from '@/lib/api/schemas'
import { useSignupAdmin } from '@/lib/api/hooks'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { AlertCircle, Loader } from 'lucide-react'

export default function SignupAdminPage() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<AdminSignupFormData>({
    resolver: zodResolver(adminSignupSchema),
  })

  const signupMutation = useSignupAdmin()
  const isSubmitting = signupMutation.isPending

  const onSubmit = async (data: AdminSignupFormData) => {
    setApiError('')
    try {
      await signupMutation.mutateAsync(data)
      navigate('/user-management')
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to create admin account')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-slate-900 rounded-lg shadow-lg p-8 border border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-2">Create Admin Account</h1>
        <p className="text-slate-400 mb-6">Only super admins can create new admin accounts</p>

        {apiError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Name"
            placeholder="John Doe"
            {...register('name')}
            error={errors.name}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            error={errors.email}
          />

          <FormInput
            label="Phone"
            type="tel"
            placeholder="+234 800 000 0000"
            {...register('phone')}
            error={errors.phone}
          />

          <FormSelect
            label="Role"
            {...register('role')}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'operator', label: 'Operator' },
            ]}
            error={errors.role}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password}
            hint="Minimum 8 characters"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...register('password_confirmation')}
            error={errors.password_confirmation}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => navigate('/user-management')}
            className="text-cyan-500 hover:text-cyan-400 text-sm"
          >
            ← Back to User Management
          </button>
        </div>
      </div>
    </div>
  )
}
