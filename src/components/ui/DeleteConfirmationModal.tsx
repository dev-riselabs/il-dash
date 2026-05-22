import { AlertTriangle, X } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => Promise<void>
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-sm w-full mx-4 border border-red-900/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-900/30">
          <h2 className="text-lg font-semibold text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300 text-sm mb-6">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-red-900/30">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-white transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
