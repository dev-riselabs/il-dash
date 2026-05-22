import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { echo } from './echo'

// Wires Echo channel subscriptions to React Query cache invalidation so that
// open dashboards refresh automatically when backend events fire.

const SUBS: Array<{
  channel: string
  isPrivate: boolean
  events: { name: string; keys: readonly (readonly unknown[])[] }[]
}> = [
  {
    channel: 'incidents',
    isPrivate: true,
    events: [
      { name: 'IncidentReported', keys: [['incidents'], ['command-center'], ['alerts']] },
      { name: 'IncidentStatusChanged', keys: [['incidents'], ['command-center']] },
    ],
  },
  {
    channel: 'alerts',
    isPrivate: true,
    events: [{ name: 'AlertCreated', keys: [['alerts'], ['command-center']] }],
  },
  {
    channel: 'deals',
    isPrivate: true,
    events: [{ name: 'DealStageChanged', keys: [['deals'], ['overview'], ['executive']] }],
  },
  {
    channel: 'programme',
    isPrivate: false,
    events: [
      { name: 'SessionStatusChanged', keys: [['sessions'], ['overview'], ['programme'], ['executive'], ['command-center']] },
    ],
  },
  {
    channel: 'resolutions',
    isPrivate: false,
    events: [
      { name: 'ResolutionAdded', keys: [['resolutions'], ['overview'], ['executive']] },
    ],
  },
  {
    channel: 'sentiment',
    isPrivate: false,
    events: [
      { name: 'FeedbackSubmitted', keys: [['feedback'], ['sentiment'], ['overview'], ['intelligence']] },
    ],
  },
]

export function useRealtimeInvalidations(enabled: boolean) {
  const qc = useQueryClient()

  useEffect(() => {
    if (!enabled) return

    const cleanups: Array<() => void> = []

    for (const sub of SUBS) {
      let ch
      try {
        ch = sub.isPrivate
          ? echo.private(sub.channel)
          : echo.channel(sub.channel)
      } catch {
        continue // Echo not initialised yet (e.g. missing env vars)
      }

      for (const evt of sub.events) {
        const handler = () => {
          for (const key of evt.keys) {
            qc.invalidateQueries({ queryKey: key as unknown[] })
          }
        }
        ch.listen(`.${evt.name}`, handler)
        ch.listen(evt.name, handler) // also bind without the leading dot
        cleanups.push(() => {
          try {
            ch.stopListening(`.${evt.name}`)
            ch.stopListening(evt.name)
          } catch {
            /* noop */
          }
        })
      }
    }

    return () => {
      for (const c of cleanups) c()
    }
  }, [enabled, qc])
}
