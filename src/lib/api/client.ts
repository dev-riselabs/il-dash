import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * Public API client - for unauthenticated requests from public pages
 * No credentials sent, no CORS credential conflicts
 */
export const publicApi: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
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
 * Sanctum SPA cookie auth requires fetching the CSRF cookie before
 * any state-changing request (login, logout, POST/PUT/DELETE).
 */
export async function getCsrfCookie(): Promise<void> {
  await axios.get(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true })
}
