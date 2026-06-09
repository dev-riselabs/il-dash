import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Register the PWA service worker explicitly so we can force a reload as
// soon as a new build is available. Without this, returning visitors keep
// being served the previously cached bundle until they hard-refresh.
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      updateSW(true)
    },
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        // Poll for new versions every hour for long-lived tabs.
        setInterval(() => {
          registration.update().catch(() => {})
        }, 60 * 60 * 1000)
      }
    },
  })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 1 * 60 * 1000, // Keep cache for 1 minute instead of 5
      refetchOnWindowFocus: true,
      refetchOnMount: true, // Refetch on mount if data is stale
      refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds for active queries
      refetchIntervalInBackground: true, // Continue refetching even when tab is in background
    },
    mutations: {
      retry: 1, // Retry failed mutations once
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
