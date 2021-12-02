import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import Default from '@/layouts/Default.vue';
import DefaultCentered from '@/layouts/DefaultCentered.vue';

import { extend, localize } from 'vee-validate';
import ru from '@/locale/ru.json';
import en from '@/locale/en.json';
import { required, email, image } from 'vee-validate/dist/rules';

// eslint-disable-next-line no-unused-expressions
import(/* webpackChunkName: "style" */ '@/assets/css/style.scss');

const userLang: string = /^ru\b/.test(navigator.language) ? 'ru' : 'en';

console.log(userLang);

if (userLang === 'ru') {
  localize('ru', ru);
} else {
  localize('en', en);
}

extend('required', required);
extend('email', email);
extend('image', image);

interface PasswordParamI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
extend('password', {
  params: ['target'],
  validate(value, { target }: PasswordParamI) {
    return value === target;
  }
});

Vue.component('default-layout', Default);
Vue.component('default-centered-layout', DefaultCentered);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', userLang);
  },
  mounted() {
    this.refreshTheme();
    this.addThemeChangeEventListener();
  },
  methods: {
    addThemeChangeEventListener() {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      try {
        // Chrome & Firefox
        darkMediaQuery.addEventListener('change', () => {
          this.refreshTheme();
        });
      } catch (e1) {
        try {
          // Safari
          // noinspection JSDeprecatedSymbols
          darkMediaQuery.addListener(() => {
            this.refreshTheme();
          });
        } catch (e2) {
          console.error(e2);
        }
      }
    },
    refreshTheme() {
      const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const selectedTheme = this.$store.state.settings.theme; // store.getters['settings/theme'];

      const darkThemeSelected = selectedTheme === 'dark' || (selectedTheme === 'system' && systemThemeIsDark);

      // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.$vuetify.theme.dark = darkThemeSelected, 0);
    }
  },
  watch: {
    '$store.state.settings.theme': function() {
      this.refreshTheme();
    }
  },
  render: h => h(App)
}).$mount('#app');
