import { create } from 'zustand'
import { api, getCsrfCookie } from '@/lib/api/client'

export interface AuthUser {
  id: number
  name: string
  email: string
  roles?: string[]
  permissions?: string[]
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  initialized: boolean
  fetchMe: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  fetchMe: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get('/api/auth/me')
      const user: AuthUser | null = data.user
        ? {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            roles: data.roles ?? [],
            permissions: data.permissions ?? [],
          }
        : null
      set({ user, loading: false, initialized: true })
    } catch {
      set({ user: null, loading: false, initialized: true })
    }
  },

  login: async (email, password) => {
    set({ loading: true })
    try {
      await getCsrfCookie()
      await api.post('/api/auth/login', { email, password })
      await get().fetchMe()
    } finally {
      set({ loading: false })
    }
  },

  signup: async (name, email, password) => {
    set({ loading: true })
    try {
      await getCsrfCookie()
      await api.post('/api/auth/signup', { name, email, password, password_confirmation: password })
      // Don't auto-authenticate after signup - user must login separately
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout')
    } finally {
      set({ user: null })
    }
  },

  hasRole: (role) => get().user?.roles?.includes(role) ?? false,
  hasPermission: (perm) => get().user?.permissions?.includes(perm) ?? false,
}))
