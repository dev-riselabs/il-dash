import { useState } from 'react'
import { X } from 'lucide-react'
import { TrackManagementPage } from '@/components/TrackManagementPage'
import { useEventsList } from '@/lib/api/hooks'

interface TrackManagementModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrackManagementFullModal({ isOpen, onClose }: TrackManagementModalProps) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const { data: eventsData } = useEventsList({ per_page: 100 })

  const events = eventsData?.data || []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="sticky top-0 bg-slate-950 border-b border-white/20 flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-white font-lexend">Manage Tracks</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-white font-lexend mb-2">
              Select Event
            </label>
            <select
              value={selectedEventId || ''}
              onChange={(e) => setSelectedEventId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white"
            >
              <option value="" className="bg-slate-900 text-white">-- Select an Event --</option>
              {events.map((event) => (
                <option key={event.id} value={event.id} className="bg-slate-900 text-white">
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {selectedEventId ? (
            <TrackManagementPage eventId={selectedEventId} />
          ) : (
            <div className="text-center text-white/50 py-8 font-lexend">
              Please select an event to manage tracks
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
