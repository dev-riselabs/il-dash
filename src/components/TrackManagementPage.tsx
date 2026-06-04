import { useState, useMemo } from 'react'
import { useTracksList, useDeleteTrack } from '@/lib/api/hooks'
import { TrackManagementModal } from '@/components/ui/TrackManagementModal'
import { ChevronLeft, ChevronRight, Search, Trash2, Edit2, Plus } from 'lucide-react'

interface TrackManagementPageProps {
  eventId: number
}

export function TrackManagementPage({ eventId }: TrackManagementPageProps) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<any>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const perPage = 10

  const { data: response, isLoading } = useTracksList({ event_id: eventId, search, per_page: perPage, page })
  const deleteMutation = useDeleteTrack()

  const tracks = response?.data || []
  const pagination = response?.meta || {}

  const handleEdit = (track: Track) => {
    setSelectedTrack(track)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedTrack(undefined)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this track?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTrack(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search tracks..."
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
          className="flex gap-2 items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-lexend text-sm"
        >
          <Plus size={18} />
          Add Track
        </button>
      </div>

      <div className="border border-white/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-white/20">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Slug</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Color</th>
              <th className="px-4 py-3 text-right font-semibold text-cyan-400 font-lexend">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-white/50">
                  Loading...
                </td>
              </tr>
            ) : tracks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-white/50">
                  No tracks found
                </td>
              </tr>
            ) : (
              tracks.map((track) => (
                <tr key={track.id} className="hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-white font-dmSans">{track.name}</td>
                  <td className="px-4 py-3 text-white/70 font-dmSans">{track.slug || '-'}</td>
                  <td className="px-4 py-3">
                    {track.color && (
                      <div className="flex gap-2 items-center">
                        <div
                          className="w-6 h-6 rounded border border-white/20"
                          style={{ backgroundColor: track.color }}
                        />
                        <span className="text-white/70 font-dmSans text-xs">{track.color}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(track)}
                        className="p-1.5 text-cyan-400 hover:bg-white/10 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(track.id)}
                        className="p-1.5 text-red-400 hover:bg-white/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.last_page && pagination.last_page > 1 && (
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

      <TrackManagementModal
        isOpen={isModalOpen}
        track={selectedTrack}
        eventId={eventId}
        onClose={handleCloseModal}
      />
    </div>
  )
}
