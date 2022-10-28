import { Commit } from 'vuex';

export const namespaced = true;

export interface SettingsState {
  theme: string | null
}

export const state: SettingsState = {
  theme: window.localStorage.getItem('theme') || 'system'
};

export const mutations = {
  SET_THEME(state: SettingsState, theme: string): void {
    state.theme = theme;
    window.localStorage.setItem('theme', theme);
  }
};

// noinspection JSUnusedGlobalSymbols
export const actions = {
  setTheme({ commit }: { commit: Commit }, { value }: { value: string }): void {
    commit('SET_THEME', value);
  }
};
