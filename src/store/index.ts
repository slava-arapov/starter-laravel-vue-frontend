import Vue from 'vue';
import Vuex from 'vuex';

import * as auth from '@/store/modules/Auth';
import * as user from '@/store/modules/User';
import * as settings from '@/store/modules/Settings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    settings
  }
});
