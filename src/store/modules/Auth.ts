import router from '@/router';
import { getErrorDictionary } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import { Commit } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import { StoreState } from '@/store';

export const namespaced = true;

interface User {
  name: string,
  email: string,
  email_verified_at: string,
  isAdmin: boolean | null,
  avatar: string
}

interface UserData {
  id: number | null,
  name: string | null,
  email: string | null,
  avatar: string | null,
  isAdmin: boolean,
  email_verified_at: string | null
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
  logout({ commit, rootState }: { commit: Commit, rootState: StoreState }): Promise<void> {
    return AuthService.logout()
      .then(() => {
        commit('SET_USER', null);
        commit('SET_GUEST', 'isGuest');
        if (rootState.route !== 'login') {
          router.push({ path: '/login' }).then();
        }
      })
      .catch((error: string) => {
        commit('SET_ERROR', getErrorDictionary(new Error(error)));
      });
  },
  async getAuthUser ({ commit }: { commit: Commit }): Promise<UserData | undefined | null> {
    commit('SET_LOADING', true);
    try {
      const response: AxiosResponse<{ 'data': UserData }> = await AuthService.getAuthUser();
      if (response && response.data && response.data.data) {
        commit('SET_USER', response.data.data);
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      commit('SET_USER', null);
      if (error instanceof Error || axios.isAxiosError(error)) {
        commit('SET_ERROR', getErrorDictionary(error));
      }
    }
    commit('SET_LOADING', false);
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
    return state.user?.isAdmin ?? false;
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
