import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * Public API client - for unauthenticated requests from public pages
 * GET: No credentials (avoid CORS preflight)
 * POST/PUT/PATCH/DELETE: Sends CSRF token via interceptor
 */
export const publicApi: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false, // Keep false by default
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// Interceptor: Enable credentials only for state-changing requests
publicApi.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    config.withCredentials = true // Send CSRF cookie for mutations
    config.headers['X-XSRF-TOKEN'] = getCSRFToken() // Manually set CSRF token
  }
  return config
})

/**
 * Authenticated API client - for admin pages with Sanctum cookie auth
 * Sends credentials for cookie-based authentication
 */
export const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

/**
 * Get CSRF token from cookie
 */
function getCSRFToken(): string {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

/**
 * Sanctum SPA cookie auth requires fetching the CSRF cookie before
 * any state-changing request (login, logout, POST/PUT/DELETE).
 */
export async function getCsrfCookie(): Promise<void> {
  await axios.get(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true })
}
