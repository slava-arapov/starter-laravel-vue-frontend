import router from '@/router';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import { Commit } from 'vuex';
import { AxiosResponse } from 'axios';

export const namespaced = true;

interface User {
  name: string,
  email: string,
  email_verified_at: string,
  isAdmin: boolean | null,
  avatar: string
}

export interface AuthState {
  user: User | null,
  guest: string | null,
  loading: boolean,
  message?: string,
  error: string | null
}

export const state: AuthState = {
  user: null,
  guest: window.localStorage.getItem('guest'),
  loading: false,
  error: null
};

export const mutations = {
  SET_USER(state: AuthState, user: User): void {
    state.user = user;
  },
  SET_LOADING(state: AuthState, loading: boolean): void {
    state.loading = loading;
  },
  SET_ERROR(state: AuthState, error: string | null): void {
    state.error = error;
  },
  SET_GUEST(state: AuthState, guest: string): void {
    state.guest = guest;
    window.localStorage.setItem('guest', guest);
  }
};

export const actions = {
  logout({ commit }: { commit: Commit }): Promise<void> {
    return AuthService.logout()
      .then(() => {
        commit('SET_USER', null);
        commit('SET_GUEST', 'isGuest');
        if (router.currentRoute.name !== 'login') {
          router.push({ path: '/login' }).then();
        }
      })
      .catch((error: string) => {
        commit('SET_ERROR', getError(error));
      });
  },
  async getAuthUser ({ commit }: { commit: Commit }): Promise<{'id': number | null, 'name': string | null, 'email': string | null, 'avatar': string | null, 'isAdmin': boolean, 'email_verified_at': string | null} | undefined | null> {
    commit('SET_LOADING', true);
    try {
      const response: AxiosResponse<{'data': {'id': number | null, 'name': string | null, 'email': string | null, 'avatar': string | null, 'isAdmin': boolean, 'email_verified_at': string | null}}> = await AuthService.getAuthUser();
      if (response && response.data && response.data.data) {
        commit('SET_USER', response.data.data);
        commit('SET_LOADING', false);
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_USER', null);
      commit('SET_ERROR', getError(error));
    }
  },
  setGuest({ commit }: { commit: Commit }, { value }: { value: string }): void {
    commit('SET_GUEST', value);
  }
};

export const getters = {
  authUser: (state: AuthState): User | null => {
    return state.user;
  },
  isAdmin: (state: AuthState): boolean => {
    return state.user ? state.user.isAdmin === true : false;
  },
  error: (state: AuthState): string | null => {
    return state.error;
  },
  loading: (state: AuthState): boolean => {
    return state.loading;
  },
  /*
  loggedIn: (state: AuthState): boolean => {
    return !!state.user;
  },
   */
  guest: (): boolean => {
    const storageItem = window.localStorage.getItem('guest');
    return storageItem === 'isGuest';
  }
};
