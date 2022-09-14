/* eslint-disable */
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    route: string | null
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
