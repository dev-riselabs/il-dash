import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

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
