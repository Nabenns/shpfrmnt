import { create } from 'zustand'
import { api } from '@/lib/api'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  loading: true,

  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password })
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    // Set cookie untuk middleware route protection (7 hari)
    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${data.expiresIn}; SameSite=Strict`
    set({ isAuthenticated: true, username })
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      await api.post('/auth/logout', { refreshToken })
    } catch {}
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    document.cookie = 'accessToken=; path=/; max-age=0'
    set({ isAuthenticated: false, username: null })
    window.location.href = '/login'
  },

  checkAuth: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ isAuthenticated: false, loading: false })
      return
    }
    try {
      const { data } = await api.get('/auth/me')
      set({ isAuthenticated: true, username: data.username, loading: false })
    } catch {
      set({ isAuthenticated: false, loading: false })
    }
  },
}))
