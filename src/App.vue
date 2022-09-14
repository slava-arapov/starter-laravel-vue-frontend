<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'vuetify';
import { defineRule, configure } from 'vee-validate';
import { required, email, image } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@/locale/ru.json';
import en from '@/locale/en.json';
import store from '@/store';

defineRule('required', required);
defineRule('email', email);
defineRule('image', image);

const defaultLayout = 'default';
const userLang: string = /^ru\b/.test(navigator.language) ? 'ru' : 'en';

configure({
  generateMessage: localize({
    en,
    ru
  })
});

if (userLang === 'ru') {
  setLocale('ru');
} else {
  setLocale('en');
}

export default defineComponent({
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta?.layout || defaultLayout) + '-layout';
    }
  },
  created() {
    const html = document.documentElement;
    html.setAttribute('lang', userLang);
  },
  mounted() {
    this.refreshTheme();
    this.addThemeChangeEventListener();
  },
  setup () {
    const theme = useTheme();

    return {
      theme,
      changeTheme: (themeName: string) => { theme.global.name.value = themeName; }
    };
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
      const selectedTheme = store.getters['settings/theme']; // this.$store.state.settings.theme; // store.getters['settings/theme'];

      const darkThemeSelected = selectedTheme === 'dark' || (selectedTheme === 'system' && systemThemeIsDark);
      const themeName = darkThemeSelected ? 'dark' : 'light';

      // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
      setTimeout(() => this.changeTheme(themeName), 0);
    }
  },
  watch: {
    '$store.state.settings.theme': function() {
      this.refreshTheme();
    }
  }
});
</script>
