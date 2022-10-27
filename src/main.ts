import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DefaultCenteredLayout from '@/layouts/DefaultCenteredLayout.vue';

// eslint-disable-next-line no-unused-expressions
import('@/assets/css/style.scss');

loadFonts().then();

createApp(App)
  .use(router)
  .use(store, key)
  .use(vuetify)
  .component('default-layout', DefaultLayout)
  .component('default-centered-layout', DefaultCenteredLayout)
  .mount('#app');
