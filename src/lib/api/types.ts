// Shared types that mirror the Laravel API response shapes for il_dash.
// Only the fields actually consumed by the React UI are listed here; the
// backend may return additional columns that we intentionally ignore.

export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: 'super_admin' | 'admin' | 'operator'
  bio?: string | null
  created_at: string
  last_login_at?: string | null
}

export interface BriefRef {
  id: number
  name: string
  color?: string | null
}

export interface Sector extends BriefRef {}
export interface Track extends BriefRef {}
export interface Venue extends BriefRef {}

export interface Event {
  id: number
  name: string
  slug?: string | null
  description?: string | null
  starts_at?: string
  ends_at?: string
  status?: string | null
}

export interface EventDay {
  id: number
  event_id: number
  day_index: number
  date: string
  label: string | null
}

export interface SessionOption {
  id: number
  title: string
}

export interface OwnerOption {
  id: number
  name: string
}

// ---- Dashboard / KPIs ------------------------------------------------------

export interface OverviewKpis {
  total_attendance: number
  speakers_count: number
  active_deals: number
  resolutions_today: number
}

export interface ExecutiveKpis {
  attendance: number
  sessions_completed: number
  sessions_live: number
  commitments_value_naira: number
  deals_value_naira: number
}

export interface CommandCenterKpis {
  sessions_live: number
  incidents_open: number
  alerts_unread: number
  safety_level: 'low' | 'medium' | 'high' | string
  personnel_on_duty: number
}

export interface ProgrammeKpis {
  total_sessions: number
  live: number
  completed: number
  delayed: number
  cancelled: number
}

export interface IntelligenceKpis {
  total_signals: number
  positive_pct: number
  negative_pct: number
  neutral_pct: number
  quotes_count: number
}

// ---- Programme / Sessions --------------------------------------------------

export type SessionStatus =
  | 'upcoming'
  | 'next'
  | 'live'
  | 'completed'
  | 'cancelled'
  | 'delayed'

export interface Speaker {
  id: number
  first_name: string
  last_name: string
  organization?: string | null
  job_title?: string | null
  email?: string | null
  bio?: string | null
  photo_url?: string | null
  country?: string | null
  created_at?: string
}

export interface SpeakerEngagementScore {
  id: number
  speaker_id: number
  event_day_id?: number | null
  sessions_count: number
  score: number
  speaker?: Pick<Speaker, 'id' | 'first_name' | 'last_name' | 'organization' | 'photo_url'>
}

export interface EventSession {
  id: number
  event_id: number
  event_day_id?: number | null
  track_id?: number | null
  venue_id?: number | null
  sector_id?: number | null
  title: string
  description?: string | null
  type?: string | null
  status: SessionStatus
  starts_at: string
  ends_at: string
  ai_summary?: string | null
  attendance_in_person?: number | null
  attendance_virtual?: number | null
  average_rating_x10?: number | null
  track?: BriefRef | null
  venue?: BriefRef | null
  sector?: BriefRef | null
  day?: EventDay | null
  speakers?: Speaker[]
  insights?: SessionInsight[]
  quotes?: SessionQuote[]
  resources?: SessionResource[]
  timeline_events?: SessionTimelineEvent[]
  resolutions?: Resolution[]
}

export interface SessionInsight {
  id: number
  event_session_id: number
  body: string
  kind?: string | null
  created_at?: string
}

export interface SessionResource {
  id: number
  event_session_id: number
  label: string
  resource_type: string
  url?: string | null
}

export interface SessionTimelineEvent {
  id: number
  event_session_id: number
  label: string
  occurred_at: string
  speaker_name?: string | null
}

export interface SessionQuote {
  id: number
  event_session_id?: number | null
  speaker_id?: number | null
  body: string
  recorded_at?: string | null
  speaker?: Speaker | null
  session?: { id: number; title: string } | null
}

export interface ProgrammeFlow {
  live: EventSession[]
  next: EventSession[]
  completed: EventSession[]
  upcoming: EventSession[]
}

// ---- Resolutions / Feedback / Polls ---------------------------------------

export type ResolutionCategory =
  | 'commitment'
  | 'partnership'
  | 'policy'
  | 'keynote'
  | 'panel'

export type ResolutionStage =
  | 'commitment'
  | 'negotiation'
  | 'signed'
  | 'fulfilled'

export interface Resolution {
  id: number
  event_session_id?: number | null
  track_id?: number | null
  sector_id?: number | null
  title: string
  description?: string | null
  category: ResolutionCategory
  committed_by?: string | null
  stage: ResolutionStage
  status: 'open' | 'in_progress' | 'completed'
  estimated_impact_naira?: number | null
  recorded_at: string
  sector?: BriefRef | null
  session?: { id: number; title: string } | null
  track?: BriefRef | null
}

export interface ResolutionKpis {
  total: number
  today: number
  by_stage: Record<string, number>
  total_impact_naira: number
}

export interface FeedbackSubmission {
  id: number
  event_session_id?: number | null
  attendee_id?: number | null
  channel: 'qr' | 'mobile' | 'website' | 'other'
  star_rating: number
  review_text?: string | null
  key_takeaway?: string | null
  sentiment_label?: 'positive' | 'neutral' | 'negative' | null
  sentiment_score?: number | null
  submitted_at: string
  session?: { id: number; title: string } | null
  attendee?: { id: number; first_name: string; last_name: string } | null
}

export interface FeedbackKpis {
  total_submissions: number
  avg_rating: number
  positive_count: number
  negative_count: number
}

export interface LivePoll {
  id: number
  question: string
  status: 'open' | 'closed'
  event_session_id?: number | null
  options?: string[]
  responses?: { id: number; option: string }[]
}

export interface LivePollPayload {
  poll: LivePoll | null
  tally?: Record<string, number>
}

// ---- Deals / Investors ----------------------------------------------------

export type DealStage =
  | 'discussion'
  | 'negotiation'
  | 'commitment'
  | 'closed_won'
  | 'closed_lost'

export interface Deal {
  id: number
  title: string
  investor_id?: number | null
  sector_id?: number | null
  owner_id?: number | null
  stage: DealStage
  value_naira?: number | null
  opened_at?: string | null
  updated_at?: string
  created_at?: string
  investor?: { id: number; name: string; logo_url?: string | null } | null
  sector?: BriefRef | null
  owner?: { id: number; name: string } | null
}

export interface Investor {
  id: number
  name: string
  country?: string | null
  region?: string | null
  logo_url?: string | null
  contact_email?: string | null
  investment_focus?: string | null
}

export interface InvestmentSignal {
  id: number
  title: string
  sector_id?: number | null
  estimated_value_naira?: number | null
  confidence: 'low' | 'medium' | 'high'
  detected_at: string
  sector?: BriefRef | null
}

export interface SectorInvestmentSummary {
  id: number
  sector_id: number
  total_value_naira: number
  signals_count: number
  captured_at: string
  sector?: BriefRef | null
}

// ---- Operations -----------------------------------------------------------

export type IncidentStatus = 'open' | 'responding' | 'resolved'
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface Incident {
  id: number
  type: string
  title: string
  description?: string | null
  venue_id?: number | null
  occurred_at: string
  severity: IncidentSeverity
  status: IncidentStatus
  resolved_at?: string | null
  reported_by?: number | null
  venue?: BriefRef | null
  reporter?: { id: number; name: string } | null
}

export type AlertSeverity =
  | 'info'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'warning'

export interface Alert {
  id: number
  title: string
  body?: string | null
  severity: AlertSeverity
  status: 'unread' | 'read' | 'resolved'
  source?: string | null
  source_ref_id?: number | null
  resolved_at?: string | null
  created_at: string
}

export interface AlertKpis {
  unread: number
  critical_open: number
  resolved_today: number
  total: number
}

export type ActionStatus = 'pending' | 'in_progress' | 'done' | 'blocked'

export interface ActionItem {
  id: number
  title: string
  description?: string | null
  related_to?: 'session' | 'incident' | 'deal' | 'resolution' | null
  related_id?: number | null
  sector_id?: number | null
  owner_id?: number | null
  status: ActionStatus
  due_at?: string | null
  sector?: BriefRef | null
  owner?: { id: number; name: string } | null
}

export interface ActionKpis {
  total: number
  pending: number
  in_progress: number
  done: number
  overdue: number
}

// ---- Attendees ------------------------------------------------------------

export interface Attendee {
  id: number
  first_name: string
  last_name: string
  email?: string | null
  job_title?: string | null
  organization?: string | null
  country?: string | null
  region?: string | null
  gender?: string | null
  category?: string | null
  checked_in_at?: string | null
  is_new_today?: boolean
  created_at?: string
}

// ---- Analytics ------------------------------------------------------------

export interface AttendanceSnapshot {
  id: number
  event_day_id: number
  captured_at: string
  in_person: number
  virtual: number
  total: number
}

export interface SentimentScore {
  id: number
  scope: 'overall' | 'sector' | 'session'
  scope_ref_id?: number | null
  positive_pct: number
  neutral_pct: number
  negative_pct: number
  net_score: number
  captured_at: string
}

export interface CountAggregate<TKey extends string = string> {
  [k: string]: number | string | null | undefined
  count?: number
  // common shapes returned by group-by endpoints
  // e.g. { region: 'Africa', count: 12 } / { gender: 'F', count: 10 }
  _key?: TKey
}

// ---- Reports --------------------------------------------------------------

export interface ReportRecord {
  id: number
  name: string
  kind: string
  status: 'queued' | 'processing' | 'ready' | 'failed'
  format?: string | null
  file_url?: string | null
  created_at: string
  completed_at?: string | null
}

export interface ReportKpis {
  total: number
  ready: number
  queued: number
}

// ---- Social ---------------------------------------------------------------

export interface SocialMention {
  id: number
  platform: string
  author_handle: string
  author_name?: string | null
  author_avatar_url?: string | null
  posted_at: string
  body: string
  link?: string | null
  likes: number
  comments: number
  shares: number
  reach: number
  impressions: number
  sentiment_label?: 'positive' | 'neutral' | 'negative'
  sentiment_score?: number | null
  location?: string | null
  theme?: BriefRef | null
}

export interface SocialKpis {
  total_mentions: number
  positive_pct: number
  total_reach: number
  total_impressions: number
}

export interface SocialTheme {
  id: number
  name: string
  mention_count: number
  sentiment_score?: number | null
}

export interface SocialHashtag {
  id: number
  tag: string
  mention_count: number
}

export interface MentionsTimeseriesPoint {
  id: number
  captured_at: string
  platform?: string | null
  mentions: number
  positive: number
  neutral: number
  negative: number
}
