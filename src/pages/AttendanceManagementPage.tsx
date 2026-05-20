import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { useCheckInAttendee, useCheckOutAttendee } from '@/lib/api/hooks'
import { qk } from '@/lib/api/queryKeys'
import { type Attendee } from '@/lib/api/types'
import { AlertCircle, Loader, CheckCircle, LogOut } from 'lucide-react'

export default function AttendanceManagementPage() {
  const [search, setSearch] = useState('')
  const [apiError, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')

  const { data: attendeesData, isLoading } = useQuery({
    queryKey: qk.attendees.list({ search }),
    queryFn: async () => {
      const response = await api.get<{ data: Attendee[] }>('/api/attendees', {
        params: { search, per_page: 100 },
      })
      return response.data.data || []
    },
  })

  const checkInMutation = useCheckInAttendee()
  const checkOutMutation = useCheckOutAttendee()

  const handleCheckIn = async (attendeeId: number, name: string) => {
    setApiError('')
    setApiSuccess('')
    try {
      await checkInMutation.mutateAsync(attendeeId)
      setApiSuccess(`${name} checked in successfully`)
      setTimeout(() => setApiSuccess(''), 3000)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to check in attendee')
    }
  }

  const handleCheckOut = async (attendeeId: number, name: string) => {
    setApiError('')
    setApiSuccess('')
    try {
      await checkOutMutation.mutateAsync(attendeeId)
      setApiSuccess(`${name} checked out successfully`)
      setTimeout(() => setApiSuccess(''), 3000)
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Failed to check out attendee')
    }
  }

  const attendees = attendeesData || []

  return (
    <section className="space-y-6">
      <section className="border border-white/55 rounded-2xl flex flex-col gap-3 p-5 lg:px-7.5 lg:py-9 border-l-4 border-l-cyan-500">
        <h1 className="text-3xl font-semibold font-lexend text-white">
          Attendance Management
        </h1>
        <p className="text-base font-lexend text-white">
          Check attendees in and out
        </p>
      </section>

      {apiError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{apiError}</p>
        </div>
      )}

      {apiSuccess && (
        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-green-200">{apiSuccess}</p>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search attendees by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      ) : attendees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No attendees found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-semibold text-white">
                  {attendee.first_name} {attendee.last_name}
                </p>
                <p className="text-sm text-white/60">{attendee.email}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  {attendee.category && (
                    <span className="text-white/60">Category: {attendee.category}</span>
                  )}
                  {attendee.organization && (
                    <span className="text-white/60">Org: {attendee.organization}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCheckIn(attendee.id, attendee.first_name)}
                  disabled={!!attendee.checked_in_at || checkInMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/80 hover:bg-green-600 disabled:bg-green-600/30 disabled:cursor-not-allowed transition-colors text-white font-medium text-sm"
                >
                  {checkInMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {attendee.checked_in_at ? 'Checked In' : 'Check In'}
                </button>
                <button
                  onClick={() => handleCheckOut(attendee.id, attendee.first_name)}
                  disabled={!attendee.checked_in_at || !!attendee.checked_out_at || checkOutMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-600 disabled:bg-orange-600/30 disabled:cursor-not-allowed transition-colors text-white font-medium text-sm"
                >
                  {checkOutMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  {attendee.checked_out_at ? 'Checked Out' : 'Check Out'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
