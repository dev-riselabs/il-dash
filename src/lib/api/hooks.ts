import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { api, publicApi, getCsrfCookie } from './client'
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
  Event,
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
  SessionInsight,
  SessionOption,
  SessionQuote,
  SocialHashtag,
  SocialKpis,
  SocialMention,
  SocialTheme,
  Speaker,
  SpeakerEngagementScore,
  Track,
  User,
  Venue,
} from './types'

type Q<T> = Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>

/**
 * GET requests for public endpoints (no auth required)
 */
const getPublic = async <T,>(url: string, params?: Record<string, unknown>) =>
  (await publicApi.get<T>(url, { params })).data

/**
 * GET requests for authenticated endpoints (requires auth)
 */
const get = async <T,>(url: string, params?: Record<string, unknown>) =>
  (await api.get<T>(url, { params })).data

// ---- Lookups ---------------------------------------------------------------
export const useEvents = (o?: Q<Event[]>) =>
  useQuery({ queryKey: qk.lookups.events, queryFn: () => getPublic<Event[]>('/api/lookups/events'), ...o })
export const useEventDays = (o?: Q<EventDay[]>) =>
  useQuery({ queryKey: qk.lookups.days, queryFn: () => getPublic<EventDay[]>('/api/lookups/event-days'), ...o })
export const useTracks = (o?: Q<Track[]>) =>
  useQuery({ queryKey: qk.lookups.tracks, queryFn: () => getPublic<Track[]>('/api/lookups/tracks'), ...o })
export const useSectors = (o?: Q<Sector[]>) =>
  useQuery({ queryKey: qk.lookups.sectors, queryFn: () => getPublic<Sector[]>('/api/lookups/sectors'), ...o })
export const useVenues = (o?: Q<Venue[]>) =>
  useQuery({ queryKey: qk.lookups.venues, queryFn: () => getPublic<Venue[]>('/api/lookups/venues'), ...o })
export const useSessionOptions = (o?: Q<SessionOption[]>) =>
  useQuery({ queryKey: qk.lookups.sessionOptions, queryFn: () => getPublic<SessionOption[]>('/api/lookups/sessions/options'), ...o })
export const useOwners = (o?: Q<OwnerOption[]>) =>
  useQuery({ queryKey: qk.lookups.owners, queryFn: () => getPublic<OwnerOption[]>('/api/lookups/owners'), ...o })

export const useCountries = (o?: Q<Array<{ id: string; name: string }>>) =>
  useQuery({ queryKey: qk.lookups.countries, queryFn: () => getPublic<Array<{ id: string; name: string }>>('/api/lookups/countries'), ...o })

export const useJobTitles = (o?: Q<Array<{ id: string; name: string }>>) =>
  useQuery({ queryKey: qk.lookups.jobTitles, queryFn: () => getPublic<Array<{ id: string; name: string }>>('/api/lookups/job-titles'), ...o })

export const useSectorOptions = (o?: Q<Sector[]>) =>
  useQuery({ queryKey: qk.lookups.sectors, queryFn: () => getPublic<Sector[]>('/api/lookups/sectors'), ...o })

export const useInvestorOptions = (o?: Q<Investor[]>) =>
  useQuery({ queryKey: qk.investors.list({}), queryFn: () => getPublic<Paginated<Investor>>('/api/investors', { per_page: 100 }).then(p => p.data), ...o })

// ---- Dashboards ------------------------------------------------------------
export const useOverviewKpis = (o?: Q<OverviewKpis>) =>
  useQuery({ queryKey: qk.overview.kpis, queryFn: () => getPublic<OverviewKpis>('/api/overview/kpis'), ...o })
export const useProgrammeFlow = (o?: Q<ProgrammeFlow>) =>
  useQuery({ queryKey: qk.overview.programmeFlow, queryFn: () => getPublic<ProgrammeFlow>('/api/overview/programme-flow'), ...o })
export const useLiveSession = (o?: Q<{ session: EventSession | null }>) =>
  useQuery({ queryKey: qk.overview.liveSession, queryFn: () => getPublic<{ session: EventSession | null }>('/api/overview/live-session'), ...o })
export const useResolutionsTicker = (limit = 8, o?: Q<Resolution[]>) =>
  useQuery({ queryKey: qk.overview.ticker, queryFn: () => getPublic<Resolution[]>('/api/overview/resolutions-ticker', { limit }), ...o })
export const useTopFeedback = (limit = 5, o?: Q<FeedbackSubmission[]>) =>
  useQuery({ queryKey: qk.overview.topFeedback, queryFn: () => getPublic<FeedbackSubmission[]>('/api/overview/top-feedback', { limit }), ...o })
export const useCurrentLivePoll = (o?: Q<LivePollPayload>) =>
  useQuery({ queryKey: qk.overview.currentPoll, queryFn: () => getPublic<LivePollPayload>('/api/overview/live-poll/current'), ...o })

export const useExecutiveKpis = (o?: Q<ExecutiveKpis>) =>
  useQuery({ queryKey: qk.executive.kpis, queryFn: () => getPublic<ExecutiveKpis>('/api/executive/kpis'), ...o })
export const useCommandCenterKpis = (o?: Q<CommandCenterKpis>) =>
  useQuery({ queryKey: qk.commandCenter.kpis, queryFn: () => getPublic<CommandCenterKpis>('/api/command-center/kpis'), ...o })
export const useProgrammeKpis = (o?: Q<ProgrammeKpis>) =>
  useQuery({ queryKey: qk.programme.kpis, queryFn: () => getPublic<ProgrammeKpis>('/api/programme/kpis'), ...o })
export const useIntelligenceKpis = (o?: Q<IntelligenceKpis>) =>
  useQuery({ queryKey: qk.intelligence.kpis, queryFn: () => getPublic<IntelligenceKpis>('/api/intelligence/kpis'), ...o })

// ---- Analytics -------------------------------------------------------------
type AnalyticsKpis = { total_attendees: number; checked_in: number; new_today: number }
export const useAnalyticsKpis = (o?: Q<AnalyticsKpis>) =>
  useQuery({ queryKey: qk.analytics.kpis, queryFn: () => getPublic<AnalyticsKpis>('/api/analytics/kpis'), ...o })
export const useAttendanceTimeseries = (eventDayId?: number, o?: Q<AttendanceSnapshot[]>) =>
  useQuery({
    queryKey: qk.analytics.attendanceTimeseries(eventDayId),
    queryFn: () => getPublic<AttendanceSnapshot[]>('/api/analytics/attendance-timeseries', eventDayId ? { event_day_id: eventDayId } : undefined),
    ...o,
  })
type ByTrackRow = { track_id: number | null; sessions: number; attendance: number; track?: BriefRef | null }
export const useAnalyticsByTrack = (o?: Q<ByTrackRow[]>) =>
  useQuery({ queryKey: qk.analytics.byTrack, queryFn: () => getPublic<ByTrackRow[]>('/api/analytics/by-track'), ...o })
type ByRegionRow = { region: string | null; count: number }
export const useAnalyticsByRegion = (o?: Q<ByRegionRow[]>) =>
  useQuery({ queryKey: qk.analytics.byRegion, queryFn: () => getPublic<ByRegionRow[]>('/api/analytics/by-region'), ...o })
type ByGenderRow = { gender: string | null; count: number }
export const useAnalyticsByGender = (o?: Q<ByGenderRow[]>) =>
  useQuery({ queryKey: qk.analytics.byGender, queryFn: () => getPublic<ByGenderRow[]>('/api/analytics/by-gender'), ...o })
type ByCategoryRow = { category: string | null; count: number }
export const useAnalyticsByCategory = (o?: Q<ByCategoryRow[]>) =>
  useQuery({ queryKey: qk.analytics.byCategory, queryFn: () => getPublic<ByCategoryRow[]>('/api/analytics/by-category'), ...o })
type SessionRatingRow = { id: number; title: string; average_rating_x10: number }
export const useSessionRatings = (o?: Q<SessionRatingRow[]>) =>
  useQuery({ queryKey: qk.analytics.sessionRatings, queryFn: () => getPublic<SessionRatingRow[]>('/api/analytics/session-ratings'), ...o })
type NewVsReturning = { new: number; returning: number }
export const useNewVsReturning = (o?: Q<NewVsReturning>) =>
  useQuery({ queryKey: qk.analytics.newVsReturning, queryFn: () => getPublic<NewVsReturning>('/api/analytics/new-vs-returning'), ...o })

export const useSentimentTrend = (days = 7, o?: Q<SentimentScore[]>) =>
  useQuery({ queryKey: qk.sentiment.trend(days), queryFn: () => getPublic<SentimentScore[]>('/api/sentiment/trend', { days }), ...o })
export const useSentimentBySector = (o?: Q<SentimentScore[]>) =>
  useQuery({ queryKey: qk.sentiment.bySector, queryFn: () => getPublic<SentimentScore[]>('/api/sentiment/by-sector'), ...o })

type HeatmapKpis = { total_signals: number; total_value_naira: number; high_confidence: number }
export const useHeatmapKpis = (o?: Q<HeatmapKpis>) =>
  useQuery({ queryKey: qk.heatmap.kpis, queryFn: () => getPublic<HeatmapKpis>('/api/heatmap/kpis'), ...o })
export const useHeatmapSectors = (o?: Q<SectorInvestmentSummary[]>) =>
  useQuery({ queryKey: qk.heatmap.sectors, queryFn: () => getPublic<SectorInvestmentSummary[]>('/api/heatmap/sectors'), ...o })

type GlobalMapKpis = { countries_count: number; investors_count: number; deals_count: number }
export const useGlobalMapKpis = (o?: Q<GlobalMapKpis>) =>
  useQuery({ queryKey: qk.globalMap.kpis, queryFn: () => getPublic<GlobalMapKpis>('/api/global-map/kpis'), ...o })
type GlobalMapCountryRow = { country: string; region: string | null; investors_count: number }
export const useGlobalMapCountries = (o?: Q<GlobalMapCountryRow[]>) =>
  useQuery({ queryKey: qk.globalMap.countries, queryFn: () => getPublic<GlobalMapCountryRow[]>('/api/global-map/countries'), ...o })

// ---- Domain collections (paginated) ----------------------------------------
type EventListParams = { search?: string; status?: string; per_page?: number; page?: number }
export const useEventsList = (params: EventListParams = {}, o?: Q<Paginated<Event>>) =>
  useQuery({ queryKey: qk.events.list(params), queryFn: () => getPublic<Paginated<Event>>('/api/events', params), ...o })
export const useEvent = (id: number | null, o?: Q<Event>) =>
  useQuery({ queryKey: qk.events.detail(id ?? 0), queryFn: () => getPublic<Event>(`/api/events/${id}`), enabled: !!id, ...o })

type AttendeeListParams = { search?: string; checked_in?: boolean; per_page?: number; page?: number; region?: string; category?: string }
export const useAttendees = (params: AttendeeListParams = {}, o?: Q<Paginated<Attendee>>) =>
  useQuery({ queryKey: qk.attendees.list(params), queryFn: () => getPublic<Paginated<Attendee>>('/api/attendees', params), ...o })

type SpeakerListParams = { search?: string; per_page?: number; page?: number }
export const useSpeakers = (params: SpeakerListParams = {}, o?: Q<Paginated<Speaker>>) =>
  useQuery({ queryKey: qk.speakers.list(params), queryFn: () => getPublic<Paginated<Speaker>>('/api/speakers', params), ...o })
export const useTopEngagementSpeakers = (o?: Q<SpeakerEngagementScore[]>) =>
  useQuery({ queryKey: qk.speakers.topEngagement, queryFn: () => getPublic<SpeakerEngagementScore[]>('/api/speakers/top-engagement'), ...o })

type SessionListParams = { status?: string; event_day_id?: number; track_id?: number; venue_id?: number; sector_id?: number; search?: string; per_page?: number; page?: number }
export const useSessions = (params: SessionListParams = {}, o?: Q<Paginated<EventSession>>) =>
  useQuery({ queryKey: qk.sessions.list(params), queryFn: () => getPublic<Paginated<EventSession>>('/api/sessions', params), ...o })
export const useSession = (id: number | null, o?: Q<EventSession>) =>
  useQuery({ queryKey: qk.sessions.detail(id ?? 0), queryFn: () => getPublic<EventSession>(`/api/sessions/${id}`), enabled: !!id, ...o })

type TrackListParams = { event_id?: number; search?: string; per_page?: number; page?: number }
export const useTracksList = (params: TrackListParams = {}, o?: Q<Paginated<Track>>) =>
  useQuery({ queryKey: qk.tracks.list(params), queryFn: () => getPublic<Paginated<Track>>('/api/tracks', params), ...o })
export const useTrack = (id: number | null, o?: Q<Track>) =>
  useQuery({ queryKey: qk.tracks.detail(id ?? 0), queryFn: () => getPublic<Track>(`/api/tracks/${id}`), enabled: !!id, ...o })

type SectorListParams = { search?: string; per_page?: number; page?: number }
export const useSectorsList = (params: SectorListParams = {}, o?: Q<Paginated<Sector>>) =>
  useQuery({ queryKey: qk.sectors.list(params), queryFn: () => getPublic<Paginated<Sector>>('/api/sectors', params), ...o })
export const useSectorDetail = (id: number | null, o?: Q<Sector>) =>
  useQuery({ queryKey: qk.sectors.detail(id ?? 0), queryFn: () => getPublic<Sector>(`/api/sectors/${id}`), enabled: !!id, ...o })

type VenueListParams = { search?: string; per_page?: number; page?: number }
export const useVenuesList = (params: VenueListParams = {}, o?: Q<Paginated<Venue>>) =>
  useQuery({ queryKey: qk.venues.list(params), queryFn: () => getPublic<Paginated<Venue>>('/api/venues', params), ...o })
export const useVenueDetail = (id: number | null, o?: Q<Venue>) =>
  useQuery({ queryKey: qk.venues.detail(id ?? 0), queryFn: () => getPublic<Venue>(`/api/venues/${id}`), enabled: !!id, ...o })

type EventDayListParams = { event_id?: number; search?: string; per_page?: number; page?: number }
export const useEventDaysList = (params: EventDayListParams = {}, o?: Q<Paginated<EventDay>>) =>
  useQuery({ queryKey: qk.eventDays.list(params), queryFn: () => get<Paginated<EventDay>>('/api/event-days', params), ...o })
export const useEventDayDetail = (id: number | null, o?: Q<EventDay>) =>
  useQuery({ queryKey: qk.eventDays.detail(id ?? 0), queryFn: () => get<EventDay>(`/api/event-days/${id}`), enabled: !!id, ...o })

type QuoteListParams = { event_session_id?: number; speaker_id?: number; search?: string; per_page?: number; page?: number }
export const useQuotes = (params: QuoteListParams = {}, o?: Q<Paginated<SessionQuote>>) =>
  useQuery({ queryKey: qk.quotes.list(params), queryFn: () => getPublic<Paginated<SessionQuote>>('/api/quotes', params), ...o })

export const useQuoteDetail = (id: number | null, o?: Q<SessionQuote>) =>
  useQuery({ queryKey: qk.quotes.detail(id ?? 0), queryFn: () => get<SessionQuote>(`/api/quotes/${id}`), enabled: !!id, ...o })

type FeedbackListParams = { event_session_id?: number; channel?: string; sentiment_label?: string; per_page?: number; page?: number }
export const useFeedback = (params: FeedbackListParams = {}, o?: Q<Paginated<FeedbackSubmission>>) =>
  useQuery({ queryKey: qk.feedback.list(params), queryFn: () => getPublic<Paginated<FeedbackSubmission>>('/api/feedback', params), ...o })
export const useFeedbackKpis = (o?: Q<FeedbackKpis>) =>
  useQuery({ queryKey: qk.feedback.kpis, queryFn: () => getPublic<FeedbackKpis>('/api/feedback/kpis'), ...o })
export const useLatestFeedback = (limit = 10, o?: Q<FeedbackSubmission[]>) =>
  useQuery({ queryKey: qk.feedback.latest(limit), queryFn: () => getPublic<FeedbackSubmission[]>('/api/feedback/latest', { limit }), ...o })

type ResolutionListParams = { stage?: string; sector_id?: number; track_id?: number; category?: string; per_page?: number; page?: number }
export const useResolutions = (params: ResolutionListParams = {}, o?: Q<Paginated<Resolution>>) =>
  useQuery({ queryKey: qk.resolutions.list(params), queryFn: () => getPublic<Paginated<Resolution>>('/api/resolutions', params), ...o })
export const useResolutionKpis = (o?: Q<ResolutionKpis>) =>
  useQuery({ queryKey: qk.resolutions.kpis, queryFn: () => getPublic<ResolutionKpis>('/api/resolutions/kpis'), ...o })
type ResByCategoryRow = { category: string; count: number }
export const useResolutionsByCategory = (o?: Q<ResByCategoryRow[]>) =>
  useQuery({ queryKey: qk.resolutions.byCategory, queryFn: () => getPublic<ResByCategoryRow[]>('/api/resolutions/by-category'), ...o })
type ResBySectorRow = { sector_id: number | null; count: number; sector?: BriefRef | null }
export const useResolutionsBySector = (o?: Q<ResBySectorRow[]>) =>
  useQuery({ queryKey: qk.resolutions.bySector, queryFn: () => getPublic<ResBySectorRow[]>('/api/resolutions/by-sector'), ...o })
export const useLatestResolutions = (limit = 10, o?: Q<Resolution[]>) =>
  useQuery({ queryKey: qk.resolutions.latest(limit), queryFn: () => getPublic<Resolution[]>('/api/resolutions/latest', { limit }), ...o })

type InvestorListParams = { search?: string; region?: string; country?: string; per_page?: number; page?: number }
export const useInvestors = (params: InvestorListParams = {}, o?: Q<Paginated<Investor>>) =>
  useQuery({ queryKey: qk.investors.list(params), queryFn: () => getPublic<Paginated<Investor>>('/api/investors', params), ...o })
export const useRecentInvestors = (o?: Q<Investor[]>) =>
  useQuery({ queryKey: qk.investors.recent, queryFn: () => getPublic<Investor[]>('/api/investors/recent'), ...o })
type InvByRegionRow = { region: string | null; count: number }
export const useInvestorsByRegion = (o?: Q<InvByRegionRow[]>) =>
  useQuery({ queryKey: qk.investors.byRegion, queryFn: () => getPublic<InvByRegionRow[]>('/api/investors/by-region'), ...o })
type InvByCountryRow = { country: string | null; count: number }
export const useInvestorsByCountry = (o?: Q<InvByCountryRow[]>) =>
  useQuery({ queryKey: qk.investors.byCountry, queryFn: () => getPublic<InvByCountryRow[]>('/api/investors/by-country'), ...o })

type DealListParams = { stage?: string; sector_id?: number; investor_id?: number; owner_id?: number; per_page?: number; page?: number }
export const useDeals = (params: DealListParams = {}, o?: Q<Paginated<Deal>>) =>
  useQuery({ queryKey: qk.deals.list(params), queryFn: () => getPublic<Paginated<Deal>>('/api/deals', params), ...o })

type IncidentListParams = { status?: string; severity?: string; type?: string; venue_id?: number; per_page?: number; page?: number }
export const useIncidents = (params: IncidentListParams = {}, o?: Q<Paginated<Incident>>) =>
  useQuery({ queryKey: qk.incidents.list(params), queryFn: () => getPublic<Paginated<Incident>>('/api/incidents', params), ...o })

type AlertListParams = { status?: string; severity?: string; source?: string; per_page?: number; page?: number }
export const useAlerts = (params: AlertListParams = {}, o?: Q<Paginated<Alert>>) =>
  useQuery({ queryKey: qk.alerts.list(params), queryFn: () => getPublic<Paginated<Alert>>('/api/alerts', params), ...o })
export const useAlertKpis = (o?: Q<AlertKpis>) =>
  useQuery({ queryKey: qk.alerts.kpis, queryFn: () => getPublic<AlertKpis>('/api/alerts/kpis'), ...o })
type AlertBySeverityRow = { severity: string; count: number }
export const useAlertsBySeverity = (o?: Q<AlertBySeverityRow[]>) =>
  useQuery({ queryKey: qk.alerts.bySeverity, queryFn: () => getPublic<AlertBySeverityRow[]>('/api/alerts/by-severity'), ...o })
type AlertOverTimeRow = { date: string; count: number }
export const useAlertsOverTime = (days = 7, o?: Q<AlertOverTimeRow[]>) =>
  useQuery({ queryKey: qk.alerts.overTime(days), queryFn: () => getPublic<AlertOverTimeRow[]>('/api/alerts/over-time', { days }), ...o })
export const useAlertsRecentlyResolved = (limit = 10, o?: Q<Alert[]>) =>
  useQuery({ queryKey: qk.alerts.recentlyResolved(limit), queryFn: () => getPublic<Alert[]>('/api/alerts/recently-resolved', { limit }), ...o })

type ActionListParams = { status?: string; owner_id?: number; sector_id?: number; related_to?: string; per_page?: number; page?: number }
export const useActions = (params: ActionListParams = {}, o?: Q<Paginated<ActionItem>>) =>
  useQuery({ queryKey: qk.actions.list(params), queryFn: () => getPublic<Paginated<ActionItem>>('/api/actions', params), ...o })
export const useActionKpis = (o?: Q<ActionKpis>) =>
  useQuery({ queryKey: qk.actions.kpis, queryFn: () => getPublic<ActionKpis>('/api/actions/kpis'), ...o })

type ReportListParams = { kind?: string; status?: string; per_page?: number; page?: number }
export const useReports = (params: ReportListParams = {}, o?: Q<Paginated<ReportRecord>>) =>
  useQuery({ queryKey: qk.reports.list(params), queryFn: () => getPublic<Paginated<ReportRecord>>('/api/reports', params), ...o })
export const useReportKpis = (o?: Q<ReportKpis>) =>
  useQuery({ queryKey: qk.reports.kpis, queryFn: () => getPublic<ReportKpis>('/api/reports/kpis'), ...o })

// ---- Social ----------------------------------------------------------------
export const useSocialKpis = (o?: Q<SocialKpis>) =>
  useQuery({ queryKey: qk.social.kpis, queryFn: () => getPublic<SocialKpis>('/api/social/kpis'), ...o })
type MentionParams = { platform?: string; sentiment_label?: string; theme_id?: number; location?: string; per_page?: number; page?: number }
export const useSocialMentions = (params: MentionParams = {}, o?: Q<Paginated<SocialMention>>) =>
  useQuery({ queryKey: qk.social.mentions(params), queryFn: () => getPublic<Paginated<SocialMention>>('/api/social/mentions', params), ...o })
export const useSocialTimeseries = (days = 7, platform?: string, o?: Q<MentionsTimeseriesPoint[]>) =>
  useQuery({ queryKey: qk.social.timeseries(days, platform), queryFn: () => getPublic<MentionsTimeseriesPoint[]>('/api/social/mentions-timeseries', { days, platform }), ...o })
type SocialPlatformRow = { platform: string; count: number }
export const useSocialByPlatform = (o?: Q<SocialPlatformRow[]>) =>
  useQuery({ queryKey: qk.social.byPlatform, queryFn: () => getPublic<SocialPlatformRow[]>('/api/social/by-platform'), ...o })
type SocialSentimentRow = { sentiment_label: string; count: number }
export const useSocialSentimentBreakdown = (o?: Q<SocialSentimentRow[]>) =>
  useQuery({ queryKey: qk.social.sentiment, queryFn: () => getPublic<SocialSentimentRow[]>('/api/social/sentiment-breakdown'), ...o })
export const useSocialThemes = (o?: Q<SocialTheme[]>) =>
  useQuery({ queryKey: qk.social.themes, queryFn: () => getPublic<SocialTheme[]>('/api/social/themes'), ...o })
export const useSocialHashtags = (o?: Q<SocialHashtag[]>) =>
  useQuery({ queryKey: qk.social.hashtags, queryFn: () => getPublic<SocialHashtag[]>('/api/social/hashtags'), ...o })

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['actions'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['next-action-tracker'] })
    },
  })
}

export function useResolveAlert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Alert>(`/api/alerts/${id}/resolve`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alerts'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['command-center'] })
    },
  })
}

export function useMarkAlertRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Alert>(`/api/alerts/${id}/read`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alerts'] })
      qc.invalidateQueries({ queryKey: ['command-center'] })
    },
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
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'attendees' })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useCheckOutAttendee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => post<Attendee>(`/api/attendees/${id}/check-out`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'attendees' })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useUpdateAttendee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Attendee>(`/api/attendees/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'attendees' })
      qc.invalidateQueries({ queryKey: ['analytics'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useDeleteAttendee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/attendees/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'attendees' })
      qc.invalidateQueries({ queryKey: ['analytics'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useUpdateFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<FeedbackSubmission>(`/api/feedback/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feedback'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['sentiment'] })
    },
  })
}

export function useDeleteFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/feedback/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feedback'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
      qc.invalidateQueries({ queryKey: ['sentiment'] })
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

// ---- Form Submissions -------------------------------------------------------
export function useCreateAttendee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Attendee>('/api/attendees', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'attendees' })
      qc.invalidateQueries({ queryKey: ['analytics'] })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useCreateSpeaker() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Speaker>('/api/speakers', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'speakers' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useUpdateSpeaker() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Speaker>(`/api/speakers/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'speakers' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useDeleteSpeaker() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/speakers/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'speakers' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useCreateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Event>('/api/events', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'events' })
      qc.invalidateQueries({ queryKey: qk.lookups.events })
    },
  })
}

export function useUpdateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Event>(`/api/events/${id}`, payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'events' })
      qc.invalidateQueries({ queryKey: qk.lookups.events })
    },
  })
}

export function useDeleteEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/events/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'events' })
      qc.invalidateQueries({ queryKey: qk.lookups.events })
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sessions' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useCreateSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<EventSession>('/api/sessions', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sessions' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useUpdateSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<EventSession>(`/api/sessions/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sessions' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useDeleteSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/sessions/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sessions' })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useCreateTrack() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Track>('/api/tracks', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'tracks' })
    },
  })
}

export function useUpdateTrack() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Track>(`/api/tracks/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'tracks' })
    },
  })
}

export function useDeleteTrack() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/tracks/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'tracks' })
    },
  })
}

export function useCreateSector() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Sector>('/api/sectors', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sectors' })
    },
  })
}

export function useUpdateSector() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Sector>(`/api/sectors/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sectors' })
    },
  })
}

export function useDeleteSector() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/sectors/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sectors' })
    },
  })
}

export function useCreateVenue() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Venue>('/api/venues', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'venues' })
    },
  })
}

export function useUpdateVenue() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Venue>(`/api/venues/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'venues' })
    },
  })
}

export function useDeleteVenue() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/venues/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'venues' })
    },
  })
}

export function useCreateEventDay() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<EventDay>('/api/event-days', payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'eventDays' })
    },
  })
}

export function useUpdateEventDay() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<EventDay>(`/api/event-days/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'eventDays' })
    },
  })
}

export function useDeleteEventDay() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/event-days/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['event-days'] })
    },
  })
}

// Session Quotes
type QuoteCreateParams = { event_session_id: number; speaker_id?: number; quote_text: string; said_at: string }
export function useCreateQuote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: QuoteCreateParams) =>
      post<SessionQuote>('/api/quotes', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.quotes.list() })
    },
  })
}

export function useDeleteQuote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/quotes/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.quotes.list() })
    },
  })
}

export function useUpdateQuote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { id: number; data: Partial<QuoteCreateParams> }) =>
      patch<SessionQuote>(`/api/quotes/${params.id}`, params.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.quotes.list() })
    },
  })
}

// Session Insights
type InsightListParams = { event_session_id?: number; kind?: string; search?: string; per_page?: number; page?: number }
export const useSessionInsights = (params: InsightListParams = {}, o?: Q<Paginated<SessionInsight>>) =>
  useQuery({ queryKey: qk.insights.list(params), queryFn: () => getPublic<Paginated<SessionInsight>>('/api/session-insights', params), ...o })

export const useSessionInsightDetail = (id: number | null, o?: Q<SessionInsight>) =>
  useQuery({ queryKey: qk.insights.detail(id ?? 0), queryFn: () => getPublic<SessionInsight>(`/api/session-insights/${id}`), enabled: !!id, ...o })

type InsightCreateParams = { event_session_id: number; body: string; kind?: string; order?: number }
export function useCreateSessionInsight() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: InsightCreateParams) =>
      post<SessionInsight>('/api/session-insights', payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: qk.insights.list() })
      if (data.event_session_id) {
        qc.invalidateQueries({ queryKey: qk.insights.list({ event_session_id: data.event_session_id }) })
      }
    },
  })
}

type InsightUpdateParams = { id: number; body?: string; kind?: string; order?: number }
export function useUpdateSessionInsight() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: InsightUpdateParams & Record<string, unknown>) =>
      patch<SessionInsight>(`/api/session-insights/${id}`, payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: qk.insights.list() })
      qc.invalidateQueries({ queryKey: qk.insights.detail(data.id) })
      if (data.event_session_id) {
        qc.invalidateQueries({ queryKey: qk.insights.list({ event_session_id: data.event_session_id }) })
      }
    },
  })
}

export function useDeleteSessionInsight() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/session-insights/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.insights.list() })
    },
  })
}

export function useCreateDeal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<Deal>('/api/deals', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['deals'], exact: false })
      qc.invalidateQueries({ queryKey: qk.overview.kpis })
      qc.invalidateQueries({ queryKey: qk.executive.kpis })
    },
  })
}

export function useUpdateDeal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<Deal>(`/api/deals/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['deals'], exact: false })
      qc.invalidateQueries({ queryKey: qk.overview.kpis })
      qc.invalidateQueries({ queryKey: qk.executive.kpis })
    },
  })
}

export function useDeleteDeal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del<void>(`/api/deals/${id}`),
    onSuccess: () => {
      // Invalidate all deals-related queries (list, detail, etc) with exact: false
      qc.invalidateQueries({ queryKey: ['deals'], exact: false })
      qc.invalidateQueries({ queryKey: qk.overview.kpis })
      qc.invalidateQueries({ queryKey: qk.executive.kpis })
    },
  })
}

// ---- User Management -------------------------------------------------------
export const useUsers = (params: Record<string, unknown> = {}, o?: Q<Paginated<User>>) =>
  useQuery({
    queryKey: qk.users.list(params),
    queryFn: () => get<Paginated<User>>('/api/users', params),
    ...o,
  })

export const useUser = (id: number | null, o?: Q<User>) =>
  useQuery({
    queryKey: qk.users.detail(id ?? 0),
    queryFn: () => get<User>(`/api/users/${id}`),
    enabled: !!id,
    ...o,
  })

export function useSignupAdmin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<{ user: User; token: string }>('/api/auth/signup-admin', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.users.list() })
      qc.invalidateQueries({ queryKey: ['auth'] })
    },
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      post<User>('/api/users', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.users.list() })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: Record<string, unknown> & { id: number }) =>
      patch<User>(`/api/users/${id}`, payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: qk.users.list() })
      qc.invalidateQueries({ queryKey: qk.users.detail(data.id) })
      qc.invalidateQueries({ queryKey: ['overview'] })
    },
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      del(`/api/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.users.list() })
    },
  })
}

export function useChangeUserRole() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      patch<User>(`/api/users/${id}/role`, { role }),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: qk.users.list() })
      qc.invalidateQueries({ queryKey: qk.users.detail(data.id) })
    },
  })
}

// Demo Request - Public submission
export function useSubmitDemoRequest() {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      publicApi.post<{ success: boolean; message: string }>('/api/demo-request', payload).then(res => res.data),
  })
}

// Re-export delete helper for future use elsewhere
export { del as deleteRequest }
