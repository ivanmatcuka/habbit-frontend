export type User = {
  id?: number
  name: string
  email: string
  password?: string
  remember_token?: string | null
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
}

import { defineStore } from 'pinia'
import localStorageService from '@/services/localStorage'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User, accessToken: string) {
      this.user = user
      localStorageService.setAccessToken(accessToken)
    },
    clearUser() {
      this.user = null
      localStorageService.removeAccessToken()
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
})
