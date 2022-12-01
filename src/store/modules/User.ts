import { getErrorDictionary } from '@/utils/helpers';
import { User } from '@/interfaces/User';
import { Users } from '@/interfaces/Users';
import { Meta } from '@/interfaces/Meta';
import UserService from '@/services/UserService';
import { Commit } from 'vuex';
import { AxiosResponse } from 'axios';

export const namespaced = true;

export interface UserState {
  users: User[] | null,
  meta: Meta | null,
  links: string[] | null,
  loading: boolean,
  message: string | null,
  error: string | null
}

function setPaginatedUsers(commit: Commit, response: AxiosResponse<Users>) {
  commit('SET_USERS', response.data.data);
  commit('SET_META', response.data.meta);
  commit('SET_LINKS', response.data.links);
}

export const state: UserState = {
  users: [],
  meta: null,
  links: null,
  loading: false,
  message: null,
  error: null
};

export const mutations = {
  SET_USERS(state: UserState, users: User[] | null): void {
    state.users = users;
  },
  SET_META(state: UserState, meta: Meta | null): void {
    state.meta = meta;
  },
  SET_LINKS(state: UserState, links: string[] | null): void {
    state.links = links;
  },
  SET_LOADING(state: UserState, loading: boolean): void {
    state.loading = loading;
  },
  SET_MESSAGE(state: UserState, message: string | null): void {
    state.message = message;
  },
  SET_ERROR(state: UserState, error: string | null): void {
    state.error = error;
  }
};

// noinspection JSUnusedGlobalSymbols
export const actions = {
  getUsers({ commit }: { commit: Commit }, page: number): void {
    commit('SET_LOADING', true);
    UserService.getUsers(page)
      .then((response) => {
        setPaginatedUsers(commit, response);
      })
      .catch((error) => {
        commit('SET_ERROR', getErrorDictionary(error));
      });
    commit('SET_LOADING', false);
  },
  paginateUsers({ commit }: { commit: Commit }, link: string): void {
    commit('SET_LOADING', true);
    UserService.paginateUsers(link)
      .then((response) => {
        setPaginatedUsers(commit, response);
      })
      .catch((error) => {
        commit('SET_ERROR', getErrorDictionary(error));
      });
    commit('SET_LOADING', false);
  },
  deleteUser({ commit }: { commit: Commit }, id: number): void {
    commit('SET_LOADING', true);
    UserService.deleteUser(id)
      .then(() => {
        commit('SET_MESSAGE', 'User deleted.');
        setTimeout(() => commit('SET_MESSAGE', null), 3000);
      })
      .catch((error) => {
        commit('SET_ERROR', getErrorDictionary(error));
      });
    commit('SET_LOADING', false);
  }
};

export const getters = {
  users: (state: UserState): User[] | null => {
    return state.users;
  },
  meta: (state: UserState): Meta | null => {
    return state.meta;
  },
  links: (state: UserState): string[] | null => {
    return state.links;
  },
  loading: (state: UserState): boolean => {
    return state.loading;
  },
  message: (state: UserState): string | null => {
    return state.message;
  },
  error: (state: UserState): string | null => {
    return state.error;
  }
};
