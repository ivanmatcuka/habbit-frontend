export type User = {
  created_at?: string;
  email: string;
  email_verified_at?: null | string;
  id?: number;
  name: string;
  password?: string;
  remember_token?: null | string;
  updated_at?: string;
};

import { defineStore } from 'pinia';

import localStorageService from '@/services/localStorage';

export const useUserStore = defineStore('user', {
  actions: {
    clearUser() {
      this.user = null;
      localStorageService.removeAccessToken();
    },
    setUser(user: User, accessToken: string) {
      this.user = user;
      localStorageService.setAccessToken(accessToken);
    },
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
  },
  state: () => ({
    user: null as null | User,
  }),
});
