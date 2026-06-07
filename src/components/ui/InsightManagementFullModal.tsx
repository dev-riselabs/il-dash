import { useState } from 'react'
import { X } from 'lucide-react'
import { InsightManagementPage } from '@/components/InsightManagementPage'
import { InsightManagementModal } from '@/components/ui/InsightManagementModal'
import type { EventSession, SessionInsight } from '@/lib/api/types'

interface InsightManagementFullModalProps {
  isOpen: boolean
  session: EventSession | null
  onClose: () => void
}

export function InsightManagementFullModal({ isOpen, session, onClose }: InsightManagementFullModalProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<SessionInsight | null>(null)

  const handleEdit = (insight: SessionInsight) => {
    setSelectedInsight(insight)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedInsight(null)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedInsight(null)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
          <div className="sticky top-0 bg-slate-950 border-b border-white/20 flex items-center justify-between p-6">
            <h2 className="text-xl font-semibold text-white font-lexend">
              Manage Insights & Themes — {session?.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {session ? (
              <InsightManagementPage 
                sessionId={session.id} 
                onAddClick={handleAdd}
                onEditClick={handleEdit}
              />
            ) : (
              <div className="text-center text-white/50 py-8 font-lexend">
                No session selected
              </div>
            )}
          </div>
        </div>
      </div>

      <InsightManagementModal
        isOpen={isFormOpen}
        session={session}
        insight={selectedInsight}
        onClose={handleFormClose}
      />
    </>
  )
}
