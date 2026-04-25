import type { User } from '~shared/types/user';

import { defineStore } from 'pinia';
import localStorageService from '~shared/services/localStorage';

type StateDefinition = typeof initialState;

const initialState = {
  user: null as null | User,
};

const userStoreDefinition = {
  actions: {
    clearUser(this: StateDefinition) {
      this.user = null;
      localStorageService.removeAccessToken();
    },
    setUser(this: StateDefinition, user: User, accessToken: string) {
      this.user = user;
      localStorageService.setAccessToken(accessToken);
    },
  },
  getters: {
    getUser: (state: StateDefinition) => state.user,
    isLoggedIn: (state: StateDefinition) => !!state.user,
  },
  state: () => initialState,
};

const useUserStore = defineStore('user', userStoreDefinition);

export { userStoreDefinition, useUserStore };
