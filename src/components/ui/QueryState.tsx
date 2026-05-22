// Compact loading / error / empty placeholders used by the wired pages.

import type { ReactNode } from 'react'

interface Props {
  isLoading?: boolean
  isError?: boolean
  error?: { message?: string } | null
  isEmpty?: boolean
  emptyLabel?: string
  loadingLabel?: string
  errorLabel?: string
  children: ReactNode
  className?: string
}

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty,
  emptyLabel = 'No data yet.',
  loadingLabel = 'Loading…',
  errorLabel = 'Failed to load.',
  className,
  children,
}: Props) {
  if (isLoading) {
    return (
      <div
        className={
          'text-white/60 text-xs font-lexend py-4 text-center ' +
          (className ?? '')
        }
      >
        {loadingLabel}
      </div>
    )
  }
  if (isError) {
    return (
      <div
        className={
          'text-red-300 text-xs font-lexend py-4 text-center ' +
          (className ?? '')
        }
      >
        {errorLabel} {error?.message ? `(${error.message})` : ''}
      </div>
    )
  }
  if (isEmpty) {
    return (
      <div
        className={
          'text-white/60 text-xs font-lexend py-4 text-center ' +
          (className ?? '')
        }
      >
        {emptyLabel}
      </div>
    )
  }
  return <>{children}</>
}
