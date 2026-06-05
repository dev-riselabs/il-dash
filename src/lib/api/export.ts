import type { Attendee, Event, EventSession, Speaker, FeedbackSubmission } from './types'

const escapeCsvValue = (value: string) => {
  const escaped = value.replace(/"/g, '""')
  return `"${escaped}"`
}

const downloadCsv = (filename: string, rows: Array<Record<string, string | number | undefined>>) => {
  if (rows.length === 0) {
    const blob = new Blob([''], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return
  }

  const columns = Object.keys(rows[0])
  const header = columns.map(escapeCsvValue).join(',')
  const lines = rows.map(row =>
    columns
      .map(column => {
        const value = row[column]
        return escapeCsvValue(value == null ? '' : String(value))
      })
      .join(','),
  )
  const csvContent = [header, ...lines].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function exportSpeakersToExcel(speakers: Speaker[]) {
  const rows = speakers.map(s => ({
    'First Name': s.first_name || '',
    'Last Name': s.last_name || '',
    'Organization': s.organization || '',
    'Job Title': s.job_title || '',
    'Country': s.country || '',
    'Bio': s.bio || '',
    'Created At': s.created_at || '',
  }))
  downloadCsv(`speakers-${new Date().toISOString().split('T')[0]}.csv`, rows)
}

export async function exportEventsToExcel(events: Event[]) {
  const rows = events.map(e => ({
    'Name': e.name || '',
    'Slug': e.slug || '',
    'Status': e.status || '',
    'Location': e.location || '',
    'Description': e.description || '',
    'Starts At': e.starts_at || '',
    'Ends At': e.ends_at || '',
    'Created At': e.created_at || '',
  }))
  downloadCsv(`events-${new Date().toISOString().split('T')[0]}.csv`, rows)
}

export async function exportSessionsToExcel(sessions: EventSession[]) {
  const rows = sessions.map(s => ({
    'Title': s.title || '',
    'Status': s.status || '',
    'Track': s.track?.name || '',
    'Sector': s.sector?.name || '',
    'Venue': s.venue?.name || '',
    'Description': s.description || '',
    'Starts At': s.starts_at || '',
    'Ends At': s.ends_at || '',
    'Speakers Count': s.speakers?.length || 0,
    'Average Rating': s.average_rating_x10 || '',
  }))
  downloadCsv(`sessions-${new Date().toISOString().split('T')[0]}.csv`, rows)
}

export async function exportAttendeesToExcel(attendees: Attendee[]) {
  const rows = attendees.map(a => ({
    'First Name': a.first_name || '',
    'Last Name': a.last_name || '',
    'Email': a.email || '',
    'Organization': a.organization || '',
    'Job Title': a.job_title || '',
    'Country': a.country || '',
    'Region': a.region || '',
    'Gender': a.gender || '',
    'Category': a.category || '',
    'Checked In': a.checked_in_at ? 'Yes' : 'No',
    'Checked Out': a.checked_out_at ? 'Yes' : 'No',
  }))
  downloadCsv(`attendees-${new Date().toISOString().split('T')[0]}.csv`, rows)
}

export async function exportFeedbackToExcel(feedback: FeedbackSubmission[]) {
  const rows = feedback.map(f => ({
    'Session': f.session?.title || '',
    'Attendee': f.attendee ? `${f.attendee.first_name || ''} ${f.attendee.last_name || ''}`.trim() : '',
    'Star Rating': f.star_rating || 0,
    'Sentiment': f.sentiment_label || '',
    'Channel': f.channel || '',
    'Review': f.review_text || '',
    'Key Takeaway': f.key_takeaway || '',
    'Submitted At': f.submitted_at || '',
  }))
  downloadCsv(`feedback-${new Date().toISOString().split('T')[0]}.csv`, rows)
}
