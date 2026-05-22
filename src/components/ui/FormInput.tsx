import { forwardRef, type InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  hint?: string
  required?: boolean
  fullWidth?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, required, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-white mb-1.5">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`
            w-full px-3 py-2 bg-slate-900 border rounded-lg
            text-white placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700'}
            ${className}
          `}
        />
        {error && (
          <div className="flex items-center gap-1 mt-1.5 text-red-400 text-sm">
            <AlertCircle size={16} />
            <span>{error.message}</span>
          </div>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-400 mt-1">{hint}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
