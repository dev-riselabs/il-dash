import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 rounded-lg max-w-md w-full shadow-xl border border-white/20">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-lg font-semibold text-white font-lexend">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white/60 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
