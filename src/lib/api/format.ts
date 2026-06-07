// Small formatting helpers used across the dashboard widgets so we don't
// repeat formatting logic in every component.

const NAIRA = '\u20A6'

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat('en-NG').format(n)
}

export function fmtNaira(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  if (Math.abs(value) >= 1_000_000_000)
    return `${NAIRA}${(value / 1_000_000_000).toFixed(1)}B`
  if (Math.abs(value) >= 1_000_000)
    return `${NAIRA}${(value / 1_000_000).toFixed(1)}M`
  if (Math.abs(value) >= 1_000)
    return `${NAIRA}${(value / 1_000).toFixed(1)}K`
  return `${NAIRA}${fmtNumber(value)}`
}

export function fmtCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-NG', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function fmtPercent(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(digits)}%`
}

export function fmtDateTime(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function fmtTime(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function fmtRange(startIso?: string | null, endIso?: string | null): string {
  if (!startIso || !endIso) return '—'
  return `${fmtTime(startIso)} - ${fmtTime(endIso)}`
}

export function fmtRelative(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso).getTime()
  if (Number.isNaN(d)) return '—'
  const diff = Date.now() - d
  const abs = Math.abs(diff)
  const min = 60_000,
    hr = 60 * min,
    day = 24 * hr
  if (abs < min) return diff >= 0 ? 'just now' : 'in moments'
  if (abs < hr) return `${Math.round(abs / min)}m ${diff >= 0 ? 'ago' : 'from now'}`
  if (abs < day)
    return `${Math.round(abs / hr)}h ${diff >= 0 ? 'ago' : 'from now'}`
  return `${Math.round(abs / day)}d ${diff >= 0 ? 'ago' : 'from now'}`
}

export function fullName(
  person?: { first_name?: string | null; last_name?: string | null } | null,
): string {
  if (!person) return ''
  return `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim()
}

export function startsInCountdown(startsAt: string | null | undefined): string {
  if (!startsAt) return ''
  const diff = new Date(startsAt).getTime() - Date.now()
  if (Number.isNaN(diff) || diff <= 0) return '00:00:00'
  const totalSec = Math.floor(diff / 1000)
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0')
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
  const s = String(totalSec % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

/**
 * Format ISO date string to yyyy-MM-dd format for HTML date inputs
 * E.g., "2026-05-12T00:00:00.000000Z" -> "2026-05-12"
 */
export function fmtDateForInput(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
