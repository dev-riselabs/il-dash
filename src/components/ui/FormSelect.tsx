import { forwardRef, SelectHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: FieldError
  hint?: string
  required?: boolean
  options: Array<{ value: string | number; label: string }> | Array<{ id: string | number; name: string }>
  fullWidth?: boolean
  isIdName?: boolean
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, required, options, fullWidth = true, isIdName = false, className = '', ...props }, ref) => {
    const optionList = (options as any[]).map(opt => ({
      value: isIdName ? opt.id : opt.value,
      label: isIdName ? opt.name : opt.label,
    }))

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-white mb-1.5">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
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
        >
          <option value="">-- Select an option --</option>
          {optionList.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
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

FormSelect.displayName = 'FormSelect'
