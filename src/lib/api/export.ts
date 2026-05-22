import type { Attendee, EventSession, Speaker, FeedbackSubmission } from './types'

/**
 * Export speakers to Excel
 */
export async function exportSpeakersToExcel(speakers: Speaker[]) {
  const XLSX = await import('xlsx')
  const xlsx = XLSX.default || XLSX
  const data = speakers.map(s => ({
    'First Name': s.first_name || '',
    'Last Name': s.last_name || '',
    'Email': s.email || '',
    'Organization': s.organization || '',
    'Job Title': s.job_title || '',
    'Country': s.country || '',
    'Bio': s.bio || '',
    'Created At': s.created_at || '',
  }))

  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Speakers')
  xlsx.writeFile(workbook, `speakers-${new Date().toISOString().split('T')[0]}.xlsx`)
}

/**
 * Export sessions to Excel
 */
export async function exportSessionsToExcel(sessions: EventSession[]) {
  const XLSX = await import('xlsx')
  const xlsx = XLSX.default || XLSX
  const data = sessions.map(s => ({
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

  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sessions')
  xlsx.writeFile(workbook, `sessions-${new Date().toISOString().split('T')[0]}.xlsx`)
}

/**
 * Export attendees to Excel
 */
export async function exportAttendeesToExcel(attendees: Attendee[]) {
  const XLSX = await import('xlsx')
  const xlsx = XLSX.default || XLSX
  const data = attendees.map(a => ({
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

  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Attendees')
  xlsx.writeFile(workbook, `attendees-${new Date().toISOString().split('T')[0]}.xlsx`)
}

/**
 * Export feedback to Excel
 */
export async function exportFeedbackToExcel(feedback: FeedbackSubmission[]) {
  const XLSX = await import('xlsx')
  const xlsx = XLSX.default || XLSX
  const data = feedback.map(f => ({
    'Session': f.session?.title || '',
    'Attendee': f.attendee ? `${f.attendee.first_name || ''} ${f.attendee.last_name || ''}`.trim() : '',
    'Star Rating': f.star_rating || 0,
    'Sentiment': f.sentiment_label || '',
    'Channel': f.channel || '',
    'Review': f.review_text || '',
    'Key Takeaway': f.key_takeaway || '',
    'Submitted At': f.submitted_at || '',
  }))

  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Feedback')
  xlsx.writeFile(workbook, `feedback-${new Date().toISOString().split('T')[0]}.xlsx`)
}

/**
 * Export speakers to PDF
 */
export async function exportSpeakersToPDF(speakers: Speaker[]) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Speakers Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 23)

  let yPos = 35
  speakers.forEach((speaker, idx) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 15
    }

    doc.setFont('helvetica', 'bold')
    doc.text(`${idx + 1}. ${speaker.first_name} ${speaker.last_name}`, 14, yPos)
    yPos += 7

    doc.setFont('helvetica', 'normal')
    const details = [
      `Email: ${speaker.email || 'N/A'}`,
      `Organization: ${speaker.organization || 'N/A'}`,
      `Job Title: ${speaker.job_title || 'N/A'}`,
      `Country: ${speaker.country || 'N/A'}`,
    ]

    details.forEach(detail => {
      doc.text(detail, 20, yPos)
      yPos += 5
    })

    if (speaker.bio) {
      doc.setFont('helvetica', 'italic')
      const bioLines = doc.splitTextToSize(`Bio: ${speaker.bio}`, 170)
      doc.text(bioLines, 20, yPos)
      yPos += bioLines.length * 4 + 2
    }

    yPos += 3
  })

  doc.save(`speakers-${new Date().toISOString().split('T')[0]}.pdf`)
}

/**
 * Export sessions to PDF
 */
export async function exportSessionsToPDF(sessions: EventSession[]) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Sessions Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 23)

  let yPos = 35
  sessions.forEach((session, idx) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 15
    }

    doc.setFont('helvetica', 'bold')
    doc.text(`${idx + 1}. ${session.title}`, 14, yPos)
    yPos += 7

    doc.setFont('helvetica', 'normal')
    const details = [
      `Status: ${session.status}`,
      `Track: ${session.track?.name || 'N/A'}`,
      `Sector: ${session.sector?.name || 'N/A'}`,
      `Venue: ${session.venue?.name || 'N/A'}`,
      `Starts: ${new Date(session.starts_at).toLocaleString()}`,
      `Ends: ${new Date(session.ends_at).toLocaleString()}`,
      `Speakers: ${session.speakers?.length || 0}`,
      `Rating: ${session.average_rating_x10 ? `${session.average_rating_x10}/10` : 'N/A'}`,
    ]

    details.forEach(detail => {
      doc.text(detail, 20, yPos)
      yPos += 5
    })

    if (session.description) {
      doc.setFont('helvetica', 'italic')
      const descLines = doc.splitTextToSize(`Description: ${session.description}`, 170)
      doc.text(descLines, 20, yPos)
      yPos += descLines.length * 4 + 2
    }

    yPos += 3
  })

  doc.save(`sessions-${new Date().toISOString().split('T')[0]}.pdf`)
}

/**
 * Export attendees to PDF
 */
export async function exportAttendeesToPDF(attendees: Attendee[]) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Attendees Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 23)

  let yPos = 35
  attendees.forEach((attendee, idx) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 15
    }

    doc.setFont('helvetica', 'bold')
    doc.text(`${idx + 1}. ${attendee.first_name} ${attendee.last_name}`, 14, yPos)
    yPos += 7

    doc.setFont('helvetica', 'normal')
    const details = [
      `Email: ${attendee.email || 'N/A'}`,
      `Organization: ${attendee.organization || 'N/A'}`,
      `Job Title: ${attendee.job_title || 'N/A'}`,
      `Country: ${attendee.country || 'N/A'}`,
      `Category: ${attendee.category || 'N/A'}`,
      `Checked In: ${attendee.checked_in_at ? 'Yes' : 'No'}`,
      `Checked Out: ${attendee.checked_out_at ? 'Yes' : 'No'}`,
    ]

    details.forEach(detail => {
      doc.text(detail, 20, yPos)
      yPos += 5
    })

    yPos += 3
  })

  doc.save(`attendees-${new Date().toISOString().split('T')[0]}.pdf`)
}

/**
 * Export feedback to PDF
 */
export async function exportFeedbackToPDF(feedback: FeedbackSubmission[]) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Feedback Report', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 23)

  let yPos = 35
  feedback.forEach((item, idx) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 15
    }

    doc.setFont('helvetica', 'bold')
    doc.text(`${idx + 1}. ${item.session?.title || 'N/A'} - ${item.star_rating} stars`, 14, yPos)
    yPos += 7

    doc.setFont('helvetica', 'normal')
    const details = [
      `Attendee: ${item.attendee ? `${item.attendee.first_name} ${item.attendee.last_name}` : 'N/A'}`,
      `Sentiment: ${item.sentiment_label || 'N/A'}`,
      `Channel: ${item.channel}`,
      `Submitted: ${new Date(item.submitted_at).toLocaleString()}`,
    ]

    details.forEach(detail => {
      doc.text(detail, 20, yPos)
      yPos += 5
    })

    if (item.review_text) {
      doc.setFont('helvetica', 'italic')
      const reviewLines = doc.splitTextToSize(`Review: ${item.review_text}`, 170)
      doc.text(reviewLines, 20, yPos)
      yPos += reviewLines.length * 4 + 2
    }

    if (item.key_takeaway) {
      const takeawayLines = doc.splitTextToSize(`Key Takeaway: ${item.key_takeaway}`, 170)
      doc.text(takeawayLines, 20, yPos)
      yPos += takeawayLines.length * 4
    }

    yPos += 3
  })

  doc.save(`feedback-${new Date().toISOString().split('T')[0]}.pdf`)
}
