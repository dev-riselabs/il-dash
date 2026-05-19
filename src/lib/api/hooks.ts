import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { api, getCsrfCookie } from './client'
import { qk } from './queryKeys'
import type {
  ActionItem,
  ActionKpis,
  Alert,
  AlertKpis,
  Attendee,
  AttendanceSnapshot,
  BriefRef,
  CommandCenterKpis,
  Deal,
  EventDay,
  EventSession,
  ExecutiveKpis,
  FeedbackKpis,
  FeedbackSubmission,
  Incident,
  IntelligenceKpis,
  Investor,
  LivePollPayload,
  MentionsTimeseriesPoint,
  OverviewKpis,
  OwnerOption,
  Paginated,
  ProgrammeFlow,
  ProgrammeKpis,
  ReportKpis,
  ReportRecord,
  Resolution,
  ResolutionKpis,
  Sector,
  SectorInvestmentSummary,
  SentimentScore,
  SessionOption,
  SessionQuote,
  SocialHashtag,
  SocialKpis,
  SocialMention,
  SocialTheme,
  Speaker,
  SpeakerEngagementScore,
  Track,
  Venue,
} from './types'

type Q<T> = Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>

const get = async <T,>(url: string, params?: Record<string, unknown>) =>
  (await api.get<T>(url, { params })).data

// ---- Lookups ---------------------------------------------------------------
export const useEventDays = (o?: Q<EventDay[]>) =>
  useQuery({ queryKey: qk.lookups.days, queryFn: () => get<EventDay[]>('/api/lookups/event-days'), ...o })
export const useTracks = (o?: Q<Track[]>) =>
  useQuery({ queryKey: qk.lookups.tracks, queryFn: () => get<Track[]>('/api/lookups/tracks'), ...o })
export const useSectors = (o?: Q<Sector[]>) =>
  useQuery({ queryKey: qk.lookups.sectors, queryFn: () => get<Sector[]>('/api/lookups/sectors'), ...o })
export const useVenues = (o?: Q<Venue[]>) =>
  useQuery({ queryKey: qk.lookups.venues, queryFn: () => get<Venue[]>('/api/lookups/venues'), ...o })
export const useSessionOptions = (o?: Q<SessionOption[]>) =>
  useQuery({ queryKey: qk.lookups.sessionOptions, queryFn: () => get<SessionOption[]>('/api/lookups/sessions/options'), ...o })
export const useOwners = (o?: Q<OwnerOption[]>) =>
  useQuery({ queryKey: qk.lookups.owners, queryFn: () => get<OwnerOption[]>('/api/lookups/owners'), ...o })

// ---- Dashboards ------------------------------------------------------------
export const useOverviewKpis = (o?: Q<OverviewKpis>) =>
  useQuery({ queryKey: qk.overview.kpis, queryFn: () => get<OverviewKpis>('/api/overview/kpis'), ...o })
export const useProgrammeFlow = (o?: Q<ProgrammeFlow>) =>
  useQuery({ queryKey: qk.overview.programmeFlow, queryFn: () => get<ProgrammeFlow>('/api/overview/programme-flow'), ...o })
export const useLiveSession = (o?: Q<{ session: EventSession | null }>) =>
  useQuery({ queryKey: qk.overview.liveSession, queryFn: () => get<{ session: EventSession | null }>('/api/overview/live-session'), ...o })
export const useResolutionsTicker = (limit = 8, o?: Q<Resolution[]>) =>
  useQuery({ queryKey: qk.overview.ticker, queryFn: () => get<Resolution[]>('/api/overview/resolutions-ticker', { limit }), ...o })
export const useTopFeedback = (limit = 5, o?: Q<FeedbackSubmission[]>) =>
  useQuery({ queryKey: qk.overview.topFeedback, queryFn: () => get<FeedbackSubmission[]>('/api/overview/top-feedback', { limit }), ...o })
export const useCurrentLivePoll = (o?: Q<LivePollPayload>) =>
  useQuery({ queryKey: qk.overview.currentPoll, queryFn: () => get<LivePollPayload>('/api/overview/live-poll/current'), ...o })

export const useExecutiveKpis = (o?: Q<ExecutiveKpis>) =>
  useQuery({ queryKey: qk.executive.kpis, queryFn: () => get<ExecutiveKpis>('/api/executive/kpis'), ...o })
export const useCommandCenterKpis = (o?: Q<CommandCenterKpis>) =>
  useQuery({ queryKey: qk.commandCenter.kpis, queryFn: () => get<CommandCenterKpis>('/api/command-center/kpis'), ...o })
export const useProgrammeKpis = (o?: Q<ProgrammeKpis>) =>
  useQuery({ queryKey: qk.programme.kpis, queryFn: () => get<ProgrammeKpis>('/api/programme/kpis'), ...o })
export const useIntelligenceKpis = (o?: Q<IntelligenceKpis>) =>
  useQuery({ queryKey: qk.intelligence.kpis, queryFn: () => get<IntelligenceKpis>('/api/intelligence/kpis'), ...o })

// ---- Analytics -------------------------------------------------------------
type AnalyticsKpis = { total_attendees: number; checked_in: number; new_today: number }
export const useAnalyticsKpis = (o?: Q<AnalyticsKpis>) =>
  useQuery({ queryKey: qk.analytics.kpis, queryFn: () => get<AnalyticsKpis>('/api/analytics/kpis'), ...o })
export const useAttendanceTimeseries = (eventDayId?: number, o?: Q<AttendanceSnapshot[]>) =>
  useQuery({
    queryKey: qk.analytics.attendanceTimeseries(eventDayId),
    queryFn: () => get<AttendanceSnapshot[]>('/api/analytics/attendance-timeseries', eventDayId ? { event_day_id: eventDayId } : undefined),
    ...o,
  })
type ByTrackRow = { track_id: number | null; sessions: number; attendance: number; track?: BriefRef | null }
export const useAnalyticsByTrack = (o?: Q<ByTrackRow[]>) =>
  useQuery({ queryKey: qk.analytics.byTrack, queryFn: () => get<ByTrackRow[]>('/api/analytics/by-track'), ...o })
type ByRegionRow = { region: string | null; count: number }
export const useAnalyticsByRegion = (o?: Q<ByRegionRow[]>) =>
  useQuery({ queryKey: qk.analytics.byRegion, queryFn: () => get<ByRegionRow[]>('/api/analytics/by-region'), ...o })
type ByGenderRow = { gender: string | null; count: number }
export const useAnalyticsByGender = (o?: Q<ByGenderRow[]>) =>
  useQuery({ queryKey: qk.analytics.byGender, queryFn: () => get<ByGenderRow[]>('/api/analytics/by-gender'), ...o })
type ByCategoryRow = { category: string | null; count: number }
export const useAnalyticsByCategory = (o?: Q<ByCategoryRow[]>) =>
  useQuery({ queryKey: qk.analytics.byCategory, queryFn: () => get<ByCategoryRow[]>('/api/analytics/by-category'), ...o })
type SessionRatingRow = { id: number; title: string; average_rating_x10: number }
export const useSessionRatings = (o?: Q<SessionRatingRow[]>) =>
  useQuery({ queryKey: qk.analytics.sessionRatings, queryFn: () => get<SessionRatingRow[]>('/api/analytics/session-ratings'), ...o })
type NewVsReturning = { new: number; returning: number }
export const useNewVsReturning = (o?: Q<NewVsReturning>) =>
  useQuery({ queryKey: qk.analytics.newVsReturning, queryFn: () => get<NewVsReturning>('/api/analytics/new-vs-returning'), ...o })

export const useSentimentTrend = (days = 7, o?: Q<SentimentScore[]>) =>
  useQuery({ queryKey: qk.sentiment.trend(days), queryFn: () => get<SentimentScore[]>('/api/sentiment/trend', { days }), ...o })
export const useSentimentBySector = (o?: Q<SentimentScore[]>) =>
  useQuery({ queryKey: qk.sentiment.bySector, queryFn: () => get<SentimentScore[]>('/api/sentiment/by-sector'), ...o })

type HeatmapKpis = { total_signals: number; total_value_naira: number; high_confidence: number }
export const useHeatmapKpis = (o?: Q<HeatmapKpis>) =>
  useQuery({ queryKey: qk.heatmap.kpis, queryFn: () => get<HeatmapKpis>('/api/heatmap/kpis'), ...o })
export const useHeatmapSectors = (o?: Q<SectorInvestmentSummary[]>) =>
  useQuery({ queryKey: qk.heatmap.sectors, queryFn: () => get<SectorInvestmentSummary[]>('/api/heatmap/sectors'), ...o })

type GlobalMapKpis = { countries_count: number; investors_count: number; deals_count: number }
export const useGlobalMapKpis = (o?: Q<GlobalMapKpis>) =>
  useQuery({ queryKey: qk.globalMap.kpis, queryFn: () => get<GlobalMapKpis>('/api/global-map/kpis'), ...o })
type GlobalMapCountryRow = { country: string; region: string | null; investors_count: number }
export const useGlobalMapCountries = (o?: Q<GlobalMapCountryRow[]>) =>
  useQuery({ queryKey: qk.globalMap.countries, queryFn: () => get<GlobalMapCountryRow[]>('/api/global-map/countries'), ...o })

// ---- Domain collections (paginated) ----------------------------------------
type AttendeeListParams = { search?: string; checked_in?: boolean; per_page?: number; page?: number; region?: string; category?: string }
export const useAttendees = (params: AttendeeListParams = {}, o?: Q<Paginated<Attendee>>) =>
  useQuery({ queryKey: qk.attendees.list(params), queryFn: () => get<Paginated<Attendee>>('/api/attendees', params), ...o })

type SpeakerListParams = { search?: string; per_page?: number; page?: number }
export const useSpeakers = (params: SpeakerListParams = {}, o?: Q<Paginated<Speaker>>) =>
  useQuery({ queryKey: qk.speakers.list(params), queryFn: () => get<Paginated<Speaker>>('/api/speakers', params), ...o })
export const useTopEngagementSpeakers = (o?: Q<SpeakerEngagementScore[]>) =>
  useQuery({ queryKey: qk.speakers.topEngagement, queryFn: () => get<SpeakerEngagementScore[]>('/api/speakers/top-engagement'), ...o })

type SessionListParams = { status?: string; event_day_id?: number; track_id?: number; venue_id?: number; sector_id?: number; search?: string; per_page?: number; page?: number }
export const useSessions = (params: SessionListParams = {}, o?: Q<Paginated<EventSession>>) =>
  useQuery({ queryKey: qk.sessions.list(params), queryFn: () => get<Paginated<EventSession>>('/api/sessions', params), ...o })
export const useSession = (id: number | null, o?: Q<EventSession>) =>
  useQuery({ queryKey: qk.sessions.detail(id ?? 0), queryFn: () => get<EventSession>(`/api/sessions/${id}`), enabled: !!id, ...o })

type QuoteListParams = { event_session_id?: number; speaker_id?: number; search?: string; per_page?: number; page?: number }
export const useQuotes = (params: QuoteListParams = {}, o?: Q<Paginated<SessionQuote>>) =>
  useQuery({ queryKey: qk.quotes.list(params), queryFn: () => get<Paginated<SessionQuote>>('/api/quotes', params), ...o })

type FeedbackListParams = { event_session_id?: number; channel?: string; sentiment_label?: string; per_page?: number; page?: number }
export const useFeedback = (params: FeedbackListParams = {}, o?: Q<Paginated<FeedbackSubmission>>) =>
  useQuery({ queryKey: qk.feedback.list(params), queryFn: () => get<Paginated<FeedbackSubmission>>('/api/feedback', params), ...o })
export const useFeedbackKpis = (o?: Q<FeedbackKpis>) =>
  useQuery({ queryKey: qk.feedback.kpis, queryFn: () => get<FeedbackKpis>('/api/feedback/kpis'), ...o })
export const useLatestFeedback = (limit = 10, o?: Q<FeedbackSubmission[]>) =>
  useQuery({ queryKey: qk.feedback.latest(limit), queryFn: () => get<FeedbackSubmission[]>('/api/feedback/latest', { limit }), ...o })

type ResolutionListParams = { stage?: string; sector_id?: number; track_id?: number; category?: string; per_page?: number; page?: number }
export const useResolutions = (params: ResolutionListParams = {}, o?: Q<Paginated<Resolution>>) =>
  useQuery({ queryKey: qk.resolutions.list(params), queryFn: () => get<Paginated<Resolution>>('/api/resolutions', params), ...o })
export const useResolutionKpis = (o?: Q<ResolutionKpis>) =>
  useQuery({ queryKey: qk.resolutions.kpis, queryFn: () => get<ResolutionKpis>('/api/resolutions/kpis'), ...o })
type ResByCategoryRow = { category: string; count: number }
export const useResolutionsByCategory = (o?: Q<ResByCategoryRow[]>) =>
  useQuery({ queryKey: qk.resolutions.byCategory, queryFn: () => get<ResByCategoryRow[]>('/api/resolutions/by-category'), ...o })
type ResBySectorRow = { sector_id: number | null; count: number; sector?: BriefRef | null }
export const useResolutionsBySector = (o?: Q<ResBySectorRow[]>) =>
  useQuery({ queryKey: qk.resolutions.bySector, queryFn: () => get<ResBySectorRow[]>('/api/resolutions/by-sector'), ...o })
export const useLatestResolutions = (limit = 10, o?: Q<Resolution[]>) =>
  useQuery({ queryKey: qk.resolutions.latest(limit), queryFn: () => get<Resolution[]>('/api/resolutions/latest', { limit }), ...o })

type InvestorListParams = { search?: string; region?: string; country?: string; per_page?: number; page?: number }
export const useInvestors = (params: InvestorListParams = {}, o?: Q<Paginated<Investor>>) =>
  useQuery({ queryKey: qk.investors.list(params), queryFn: () => get<Paginated<Investor>>('/api/investors', params), ...o })
export const useRecentInvestors = (o?: Q<Investor[]>) =>
  useQuery({ queryKey: qk.investors.recent, queryFn: () => get<Investor[]>('/api/investors/recent'), ...o })
type InvByRegionRow = { region: string | null; count: number }
export const useInvestorsByRegion = (o?: Q<InvByRegionRow[]>) =>
  useQuery({ queryKey: qk.investors.byRegion, queryFn: () => get<InvByRegionRow[]>('/api/investors/by-region'), ...o })
type InvByCountryRow = { country: string | null; count: number }
export const useInvestorsByCountry = (o?: Q<InvByCountryRow[]>) =>
  useQuery({ queryKey: qk.investors.byCountry, queryFn: () => get<InvByCountryRow[]>('/api/investors/by-country'), ...o })

type DealListParams = { stage?: string; sector_id?: number; investor_id?: number; owner_id?: number; per_page?: number; page?: number }
export const useDeals = (params: DealListParams = {}, o?: Q<Paginated<Deal>>) =>
  useQuery({ queryKey: qk.deals.list(params), queryFn: () => get<Paginated<Deal>>('/api/deals', params), ...o })

type IncidentListParams = { status?: string; severity?: string; type?: string; venue_id?: number; per_page?: number; page?: number }
export const useIncidents = (params: IncidentListParams = {}, o?: Q<Paginated<Incident>>) =>
  useQuery({ queryKey: qk.incidents.list(params), queryFn: () => get<Paginated<Incident>>('/api/incidents', params), ...o })

type AlertListParams = { status?: string; severity?: string; source?: string; per_page?: number; page?: number }
export const useAlerts = (params: AlertListParams = {}, o?: Q<Paginated<Alert>>) =>
  useQuery({ queryKey: qk.alerts.list(params), queryFn: () => get<Paginated<Alert>>('/api/alerts', params), ...o })
export const useAlertKpis = (o?: Q<AlertKpis>) =>
  useQuery({ queryKey: qk.alerts.kpis, queryFn: () => get<AlertKpis>('/api/alerts/kpis'), ...o })
type AlertBySeverityRow = { severity: string; count: number }
export const useAlertsBySeverity = (o?: Q<AlertBySeverityRow[]>) =>
  useQuery({ queryKey: qk.alerts.bySeverity, queryFn: () => get<AlertBySeverityRow[]>('/api/alerts/by-severity'), ...o })
type AlertOverTimeRow = { date: string; count: number }
export const useAlertsOverTime = (days = 7, o?: Q<AlertOverTimeRow[]>) =>
  useQuery({ queryKey: qk.alerts.overTime(days), queryFn: () => get<AlertOverTimeRow[]>('/api/alerts/over-time', { days }), ...o })
export const useAlertsRecentlyResolved = (limit = 10, o?: Q<Alert[]>) =>
  useQuery({ queryKey: qk.alerts.recentlyResolved(limit), queryFn: () => get<Alert[]>('/api/alerts/recently-resolved', { limit }), ...o })

type ActionListParams = { status?: string; owner_id?: number; sector_id?: number; related_to?: string; per_page?: number; page?: number }
export const useActions = (params: ActionListParams = {}, o?: Q<Paginated<ActionItem>>) =>
  useQuery({ queryKey: qk.actions.list(params), queryFn: () => get<Paginated<ActionItem>>('/api/actions', params), ...o })
export const useActionKpis = (o?: Q<ActionKpis>) =>
  useQuery({ queryKey: qk.actions.kpis, queryFn: () => get<ActionKpis>('/api/actions/kpis'), ...o })

type ReportListParams = { kind?: string; status?: string; per_page?: number; page?: number }
export const useReports = (params: ReportListParams = {}, o?: Q<Paginated<ReportRecord>>) =>
  useQuery({ queryKey: qk.reports.list(params), queryFn: () => get<Paginated<ReportRecord>>('/api/reports', params), ...o })
export const useReportKpis = (o?: Q<ReportKpis>) =>
  useQuery({ queryKey: qk.reports.kpis, queryFn: () => get<ReportKpis>('/api/reports/kpis'), ...o })

// ---- Social ----------------------------------------------------------------
export const useSocialKpis = (o?: Q<SocialKpis>) =>
  useQuery({ queryKey: qk.social.kpis, queryFn: () => get<SocialKpis>('/api/social/kpis'), ...o })
type MentionParams = { platform?: string; sentiment_label?: string; theme_id?: number; location?: string; per_page?: number; page?: number }
export const useSocialMentions = (params: MentionParams = {}, o?: Q<Paginated<SocialMention>>) =>
  useQuery({ queryKey: qk.social.mentions(params), queryFn: () => get<Paginated<SocialMention>>('/api/social/mentions', params), ...o })
export const useSocialTimeseries = (days = 7, platform?: string, o?: Q<MentionsTimeseriesPoint[]>) =>
  useQuery({ queryKey: qk.social.timeseries(days, platform), queryFn: () => get<MentionsTimeseriesPoint[]>('/api/social/mentions-timeseries', { days, platform }), ...o })
type SocialPlatformRow = { platform: string; count: number }
export const useSocialByPlatform = (o?: Q<SocialPlatformRow[]>) =>
  useQuery({ queryKey: qk.social.byPlatform, queryFn: () => get<SocialPlatformRow[]>('/api/social/by-platform'), ...o })
type SocialSentimentRow = { sentiment_label: string; count: number }
export const useSocialSentimentBreakdown = (o?: Q<SocialSentimentRow[]>) =>
  useQuery({ queryKey: qk.social.sentiment, queryFn: () => get<SocialSentimentRow[]>('/api/social/sentiment-breakdown'), ...o })
export const useSocialThemes = (o?: Q<SocialTheme[]>) =>
  useQuery({ queryKey: qk.social.themes, queryFn: () => get<SocialTheme[]>('/api/social/themes'), ...o })
export const useSocialHashtags = (o?: Q<SocialHashtag[]>) =>
  useQuery({ queryKey: qk.social.hashtags, queryFn: () => get<SocialHashtag[]>('/api/social/hashtags'), ...o })

// ---- Mutations -------------------------------------------------------------
// CSRF cookie is required by Sanctum for any state-changing request.
const post = async <T,>(url: string, payload?: unknown) => {
  await getCsrfCookie()
  return (await api.post<T>(url, payload)).data
}
const patch = async <T,>(url: string, payload?: unknown) => {
  await getCsrfCookie()
  return (await api.patch<T>(url, payload)).data
}
const del = async <T,>(url: string) => {
  await getCsrfCookie()
  return (await api.delete<T>(url)).data
}

export function useUpdateSessionStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      patch<EventSession>(`/api/sessions/${id}/status`, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sessions'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['programme'] })
      qc.invalidateQueries({ queryKey: ['executive'] })
      qc.invalidateQueries({ queryKey: ['command-center'] })
    },
  })
}

export function useUpdateDealStage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, stage }: { id: number; stage: string }) =>
      patch<Deal>(`/api/deals/${id}/stage`, { stage }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['deals'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['executive'] })
    },
  })
}

export function useUpdateIncidentStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      patch<Incident>(`/api/incidents/${id}/status`, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['incidents'] })
      qc.invalidateQueries({ queryKey: ['command-center'] })
      qc.invalidateQueries({ queryKey: ['alerts'] })
    },
  })
}

export function useUpdateActionStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      patch<ActionItem>(`/api/actions/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['actions'] }),
  })
}

export function useResolveAlert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Alert>(`/api/alerts/${id}/resolve`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useMarkAlertRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Alert>(`/api/alerts/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useCreateFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<FeedbackSubmission>) =>
      post<FeedbackSubmission>('/api/feedback', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feedback'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['sentiment'] })
    },
  })
}

export function useCheckInAttendee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Attendee>(`/api/attendees/${id}/check-in`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['attendees'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useGenerateReport() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { name: string; kind: string; format?: string }) =>
      post<ReportRecord>('/api/reports/generate', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reports'] }),
  })
}

// Re-export delete helper for future use elsewhere
export { del as deleteRequest }
