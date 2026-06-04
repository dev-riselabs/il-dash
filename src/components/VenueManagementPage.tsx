import { useState } from 'react'
import { useVenuesList, useDeleteVenue } from '@/lib/api/hooks'
import { VenueManagementModal } from '@/components/ui/VenueManagementModal'
import { ChevronLeft, ChevronRight, Search, Trash2, Edit2, Plus } from 'lucide-react'

export function VenueManagementPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedVenue, setSelectedVenue] = useState<any>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const perPage = 10

  const { data: response, isLoading } = useVenuesList({ search, per_page: perPage, page })
  const deleteMutation = useDeleteVenue()

  const venues = response?.data || []
  const pagination = response?.meta || {}

  const handleEdit = (venue: Venue) => {
    setSelectedVenue(venue)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedVenue(undefined)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this venue?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVenue(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search venues..."
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
          Add Venue
        </button>
      </div>

      <div className="border border-white/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-white/20">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Capacity</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Status</th>
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
            ) : venues.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-white/50">
                  No venues found
                </td>
              </tr>
            ) : (
              venues.map((venue) => (
                <tr key={venue.id} className="hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-white font-dmSans">{venue.name}</td>
                  <td className="px-4 py-3 text-white/70 font-dmSans">{venue.capacity || '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium font-dmSans ${
                        venue.status === 'available'
                          ? 'bg-green-900/30 text-green-400 border border-green-400/30'
                          : 'bg-red-900/30 text-red-400 border border-red-400/30'
                      }`}
                    >
                      {venue.status || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(venue)}
                        className="p-1.5 text-cyan-400 hover:bg-white/10 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(venue.id)}
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

      <VenueManagementModal
        isOpen={isModalOpen}
        venue={selectedVenue}
        onClose={handleCloseModal}
      />
    </div>
  )
}
