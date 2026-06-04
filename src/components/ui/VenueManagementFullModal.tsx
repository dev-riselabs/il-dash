import { X } from 'lucide-react'
import { VenueManagementPage } from '@/components/VenueManagementPage'

interface VenueManagementFullModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VenueManagementFullModal({ isOpen, onClose }: VenueManagementFullModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="sticky top-0 bg-slate-950 border-b border-white/20 flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-white font-lexend">Manage Venues</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <VenueManagementPage />
        </div>
      </div>
    </div>
  )
}
