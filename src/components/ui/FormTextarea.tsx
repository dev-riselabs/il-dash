import { forwardRef, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: FieldError
  hint?: string
  required?: boolean
  fullWidth?: boolean
  charCount?: boolean
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, required, fullWidth = true, charCount = false, className = '', ...props }, ref) => {
    const textContent = (props.value as string) || ''
    const maxLength = props.maxLength as number || 0

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-white mb-1.5">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={`
            w-full px-3 py-2 bg-slate-900 border rounded-lg
            text-white placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
            transition-all duration-200 resize-vertical
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700'}
            ${className}
          `}
        />
        <div className="flex justify-between items-start mt-1.5 gap-2">
          <div>
            {error && (
              <div className="flex items-center gap-1 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>{error.message}</span>
              </div>
            )}
            {hint && !error && (
              <p className="text-xs text-slate-400">{hint}</p>
            )}
          </div>
          {charCount && maxLength > 0 && (
            <span className={`text-xs ${textContent.length > maxLength * 0.8 ? 'text-amber-400' : 'text-slate-500'}`}>
              {textContent.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
