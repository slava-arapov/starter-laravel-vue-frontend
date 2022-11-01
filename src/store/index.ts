import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import * as auth from '@/store/modules/Auth';
import * as user from '@/store/modules/User';
import * as settings from '@/store/modules/Settings';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { SettingsState } from '@/store/modules/Settings';

export interface StoreState {
  route: string | null,
  auth: AuthState,
  user: UserState,
  settings: SettingsState
}

export const key: InjectionKey<Store<StoreState>> = Symbol('store');

export const store = createStore<StoreState>({
  state: {
    route: null
  } as StoreState,
  mutations: {
    SET_ROUTE(state, route: string | null) {
      state.route = route;
    }
  },
  actions: {
  },
  modules: {
    auth,
    user,
    settings
  }
});

export function useStore() {
  return baseUseStore(key);
}
