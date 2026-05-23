import { useState } from 'react'
import { Download, X, FileSpreadsheet } from 'lucide-react'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onDownload: (format: 'excel') => Promise<void>
}

export function DownloadModal({ isOpen, onClose, title, onDownload }: DownloadModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (format: 'excel') => {
    setIsLoading(true)
    setError(null)
    try {
      await onDownload(format)
      onClose()
    } catch (err: any) {
      setError(err?.message || 'Download failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-sm w-full mx-4 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 pt-4">
            <div className="p-3 bg-red-900/20 border border-red-800 rounded text-red-200 text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-3">
          <p className="text-sm text-slate-300 mb-4">
            Select a format to download the data:
          </p>

          <button
            onClick={() => handleDownload('excel')}
            disabled={isLoading}
            className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 hover:border-slate-600"
          >
            <FileSpreadsheet className="w-6 h-6 text-green-500" />
            <div className="text-left flex-1">
              <p className="font-medium text-white">Download CSV (.csv)</p>
              <p className="text-xs text-slate-400">Spreadsheet format</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
