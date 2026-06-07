import { useState } from 'react'
import { useQuotes, useDeleteQuote } from '@/lib/api/hooks'
import type { SessionQuote } from '@/lib/api/types'
import { ChevronLeft, ChevronRight, Search, Trash2, Plus, Edit2 } from 'lucide-react'
import { fmtDateTime } from '@/lib/api/format'

interface QuoteManagementPageProps {
  sessionId: number
  onAddClick: () => void
  onEditClick: (quote: SessionQuote) => void
}

export function QuoteManagementPage({ sessionId, onAddClick, onEditClick }: QuoteManagementPageProps) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const perPage = 10

  const { data: response, isLoading } = useQuotes({ 
    event_session_id: sessionId, 
    search, 
    per_page: perPage, 
    page 
  })
  const deleteMutation = useDeleteQuote()

  const quotes = response?.data || []
  const pagination = (response as any) || { last_page: 0 }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search quotes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white placeholder-white/40"
          />
        </div>
        <button
          onClick={onAddClick}
          className="flex gap-2 items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-lexend text-sm"
        >
          <Plus size={18} />
          Add Quote
        </button>
      </div>

      <div className="border border-white/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-white/20">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Quote</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Speaker</th>
              <th className="px-4 py-3 text-left font-semibold text-cyan-400 font-lexend">Said At</th>
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
            ) : quotes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-white/50">
                  No quotes found
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-white font-dmSans max-w-sm truncate">"{quote.quote_text}"</td>
                  <td className="px-4 py-3 text-white/70 font-dmSans">
                    {quote.speaker ? `${quote.speaker.first_name} ${quote.speaker.last_name}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-white/70 font-dmSans text-xs">
                    {quote.recorded_at ? fmtDateTime(quote.recorded_at) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => onEditClick(quote)}
                      className="p-1.5 text-cyan-400 hover:bg-white/10 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(quote.id)}
                      className="p-1.5 text-red-400 hover:bg-white/10 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
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
    </div>
  )
}
