import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import Default from '@/layouts/Default.vue';
import DefaultCentered from '@/layouts/DefaultCentered.vue';

// eslint-disable-next-line no-unused-expressions
import('@/assets/css/style.scss');

loadFonts().then();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('default-layout', Default)
  .component('default-centered-layout', DefaultCentered)
  .mount('#app');
