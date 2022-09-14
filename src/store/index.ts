import { createStore } from 'vuex';

import * as auth from '@/store/modules/Auth';
import * as user from '@/store/modules/User';
import * as settings from '@/store/modules/Settings';

export interface StoreState {
  route: string | null
}

export default createStore<StoreState>({
  state: {
    route: null
  },
  mutations: {
    SET_ROUTE(state, route) {
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
