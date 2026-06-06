import { useState } from 'react'
import { useEventDaysList, useDeleteEventDay } from '@/lib/api/hooks'
import type { EventDay } from '@/lib/api/types'
import { EventDayManagementModal } from '@/components/ui/EventDayManagementModal'
import { ChevronLeft, ChevronRight, Search, Trash2, Edit2, Plus } from 'lucide-react'

interface EventDayManagementPageProps {
  eventId?: number
}

export function EventDayManagementPage({ eventId }: EventDayManagementPageProps) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedEventDay, setSelectedEventDay] = useState<any>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const perPage = 10

  const { data: response, isLoading } = useEventDaysList({ 
    event_id: eventId, 
    search, 
    per_page: perPage, 
    page 
  })
  const deleteMutation = useDeleteEventDay()

  const eventDays = response?.data || []
  const pagination = (response as any) || { last_page: 0 }

  const handleEdit = (eventDay: EventDay) => {
    setSelectedEventDay(eventDay)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedEventDay(undefined)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this event day?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEventDay(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search event days..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white placeholder-white/40"
          />
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-dmSans"
        >
          <Plus size={18} />
          Create
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-white/50">Loading event days...</div>
      ) : eventDays.length === 0 ? (
        <div className="text-center py-8 text-white/50">No event days found</div>
      ) : (
        <>
          <div className="border border-white/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-white/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-dmSans text-white">Day #</th>
                  <th className="px-4 py-3 text-left text-sm font-dmSans text-white">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-dmSans text-white">Label</th>
                  <th className="px-4 py-3 text-right text-sm font-dmSans text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {eventDays.map((eventDay) => (
                  <tr key={eventDay.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-white">{eventDay.day_no}</td>
                    <td className="px-4 py-3 text-sm text-white">
                      {new Date(eventDay.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/70">
                      {eventDay.label || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(eventDay)}
                          className="p-1.5 text-cyan-400 hover:bg-cyan-400/10 rounded transition-colors"
                          title="Edit event day"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(eventDay.id)}
                          className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          title="Delete event day"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.last_page > 1 && (
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-30 text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-white/70 font-dmSans">
                Page {page} of {pagination.last_page}
              </span>
              <button
                onClick={() => setPage(Math.min(pagination.last_page, page + 1))}
                disabled={page >= pagination.last_page}
                className="p-1.5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-30 text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      <EventDayManagementModal
        isOpen={isModalOpen}
        eventDay={selectedEventDay}
        onClose={handleCloseModal}
      />
    </div>
  )
}
