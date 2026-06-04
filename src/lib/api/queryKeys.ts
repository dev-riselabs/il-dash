// Centralised query-key factory for TanStack Query. Using a single source of
// truth keeps cache invalidations (especially from realtime Echo events)
// in sync with the read hooks.

export const qk = {
  // Auth
  auth: ['auth', 'me'] as const,

  // Lookups
  lookups: {
    events: ['lookups', 'events'] as const,
    days: ['lookups', 'event-days'] as const,
    tracks: ['lookups', 'tracks'] as const,
    sectors: ['lookups', 'sectors'] as const,
    venues: ['lookups', 'venues'] as const,
    sessionOptions: ['lookups', 'sessions', 'options'] as const,
    owners: ['lookups', 'owners'] as const,
    countries: ['lookups', 'countries'] as const,
    jobTitles: ['lookups', 'job-titles'] as const,
  },

  // Dashboard
  overview: {
    kpis: ['overview', 'kpis'] as const,
    programmeFlow: ['overview', 'programme-flow'] as const,
    liveSession: ['overview', 'live-session'] as const,
    ticker: ['overview', 'resolutions-ticker'] as const,
    topFeedback: ['overview', 'top-feedback'] as const,
    currentPoll: ['overview', 'live-poll', 'current'] as const,
  },
  executive: { kpis: ['executive', 'kpis'] as const },
  commandCenter: { kpis: ['command-center', 'kpis'] as const },
  programme: { kpis: ['programme', 'kpis'] as const },
  intelligence: { kpis: ['intelligence', 'kpis'] as const },

  // Analytics
  analytics: {
    kpis: ['analytics', 'kpis'] as const,
    attendanceTimeseries: (eventDayId?: number) =>
      ['analytics', 'attendance-timeseries', eventDayId ?? null] as const,
    byTrack: ['analytics', 'by-track'] as const,
    byRegion: ['analytics', 'by-region'] as const,
    byGender: ['analytics', 'by-gender'] as const,
    byCategory: ['analytics', 'by-category'] as const,
    sessionRatings: ['analytics', 'session-ratings'] as const,
    newVsReturning: ['analytics', 'new-vs-returning'] as const,
  },
  sentiment: {
    trend: (days = 7) => ['sentiment', 'trend', days] as const,
    bySector: ['sentiment', 'by-sector'] as const,
  },
  heatmap: {
    kpis: ['heatmap', 'kpis'] as const,
    sectors: ['heatmap', 'sectors'] as const,
  },
  globalMap: {
    kpis: ['global-map', 'kpis'] as const,
    countries: ['global-map', 'countries'] as const,
  },

  // Domain collections
  attendees: {
    list: (params: Record<string, unknown> = {}) =>
      ['attendees', 'list', params] as const,
    detail: (id: number) => ['attendees', 'detail', id] as const,
  },
  speakers: {
    list: (params: Record<string, unknown> = {}) =>
      ['speakers', 'list', params] as const,
    topEngagement: ['speakers', 'top-engagement'] as const,
    detail: (id: number) => ['speakers', 'detail', id] as const,
  },
  events: {
    list: (params: Record<string, unknown> = {}) =>
      ['events', 'list', params] as const,
    detail: (id: number) => ['events', 'detail', id] as const,
  },
  sessions: {
    list: (params: Record<string, unknown> = {}) =>
      ['sessions', 'list', params] as const,
    detail: (id: number) => ['sessions', 'detail', id] as const,
  },
  tracks: {
    list: (params: Record<string, unknown> = {}) =>
      ['tracks', 'list', params] as const,
    detail: (id: number) => ['tracks', 'detail', id] as const,
  },
  sectors: {
    list: (params: Record<string, unknown> = {}) =>
      ['sectors', 'list', params] as const,
    detail: (id: number) => ['sectors', 'detail', id] as const,
  },
  venues: {
    list: (params: Record<string, unknown> = {}) =>
      ['venues', 'list', params] as const,
    detail: (id: number) => ['venues', 'detail', id] as const,
  },
  quotes: {
    list: (params: Record<string, unknown> = {}) =>
      ['quotes', 'list', params] as const,
  },
  feedback: {
    list: (params: Record<string, unknown> = {}) =>
      ['feedback', 'list', params] as const,
    kpis: ['feedback', 'kpis'] as const,
    latest: (limit = 10) => ['feedback', 'latest', limit] as const,
  },
  resolutions: {
    list: (params: Record<string, unknown> = {}) =>
      ['resolutions', 'list', params] as const,
    kpis: ['resolutions', 'kpis'] as const,
    byCategory: ['resolutions', 'by-category'] as const,
    bySector: ['resolutions', 'by-sector'] as const,
    latest: (limit = 10) => ['resolutions', 'latest', limit] as const,
    detail: (id: number) => ['resolutions', 'detail', id] as const,
  },
  investors: {
    list: (params: Record<string, unknown> = {}) =>
      ['investors', 'list', params] as const,
    recent: ['investors', 'recent'] as const,
    byRegion: ['investors', 'by-region'] as const,
    byCountry: ['investors', 'by-country'] as const,
    detail: (id: number) => ['investors', 'detail', id] as const,
  },
  deals: {
    list: (params: Record<string, unknown> = {}) =>
      ['deals', 'list', params] as const,
    detail: (id: number) => ['deals', 'detail', id] as const,
  },
  incidents: {
    list: (params: Record<string, unknown> = {}) =>
      ['incidents', 'list', params] as const,
    detail: (id: number) => ['incidents', 'detail', id] as const,
  },
  alerts: {
    list: (params: Record<string, unknown> = {}) =>
      ['alerts', 'list', params] as const,
    kpis: ['alerts', 'kpis'] as const,
    bySeverity: ['alerts', 'by-severity'] as const,
    overTime: (days = 7) => ['alerts', 'over-time', days] as const,
    recentlyResolved: (limit = 10) =>
      ['alerts', 'recently-resolved', limit] as const,
  },
  actions: {
    list: (params: Record<string, unknown> = {}) =>
      ['actions', 'list', params] as const,
    kpis: ['actions', 'kpis'] as const,
  },
  reports: {
    list: (params: Record<string, unknown> = {}) =>
      ['reports', 'list', params] as const,
    kpis: ['reports', 'kpis'] as const,
    detail: (id: number) => ['reports', 'detail', id] as const,
  },
  social: {
    kpis: ['social', 'kpis'] as const,
    mentions: (params: Record<string, unknown> = {}) =>
      ['social', 'mentions', params] as const,
    timeseries: (days = 7, platform?: string) =>
      ['social', 'timeseries', days, platform ?? null] as const,
    byPlatform: ['social', 'by-platform'] as const,
    sentiment: ['social', 'sentiment-breakdown'] as const,
    themes: ['social', 'themes'] as const,
    hashtags: ['social', 'hashtags'] as const,
  },
  users: {
    list: (params: Record<string, unknown> = {}) =>
      ['users', 'list', params] as const,
    detail: (id: number) => ['users', 'detail', id] as const,
  },
}

// Root key prefixes for broad invalidation (e.g. realtime events that
// affect many list endpoints).
export const qkRoots = {
  overview: ['overview'] as const,
  executive: ['executive'] as const,
  commandCenter: ['command-center'] as const,
  programme: ['programme'] as const,
  intelligence: ['intelligence'] as const,
  analytics: ['analytics'] as const,
  sentiment: ['sentiment'] as const,
  events: ['events'] as const,
  sessions: ['sessions'] as const,
  resolutions: ['resolutions'] as const,
  feedback: ['feedback'] as const,
  deals: ['deals'] as const,
  incidents: ['incidents'] as const,
  alerts: ['alerts'] as const,
  actions: ['actions'] as const,
  social: ['social'] as const,
  reports: ['reports'] as const,
}
