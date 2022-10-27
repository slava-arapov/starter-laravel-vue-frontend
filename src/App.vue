<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useTheme } from 'vuetify';
import { configure, defineRule } from 'vee-validate';
import { email, image, required, confirmed } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@/locale/ru.json';
import en from '@/locale/en.json';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

defineRule('email', email);
defineRule('image', image);
defineRule('required', required);
defineRule('confirmed', confirmed);

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

const theme = useTheme();
const route = useRoute();
const store = useStore();

const layout = computed(() => {
  return (route.meta?.layout || defaultLayout) + '-layout';
});

function changeTheme (themeName: string) {
  theme.global.name.value = themeName;
}

function refreshTheme() {
  let themeName = store.state.settings.theme ?? '';

  if (themeName === 'system') {
    const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeName = systemThemeIsDark ? 'dark' : 'light';
  }

  // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
  setTimeout(() => changeTheme(themeName), 0);
}

function addThemeChangeEventListener() {
  const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  try {
    // Chrome & Firefox
    darkMediaQuery.addEventListener('change', () => {
      refreshTheme();
    });
  } catch (e1) {
    try {
      // Safari
      // noinspection JSDeprecatedSymbols
      darkMediaQuery.addListener(() => {
        refreshTheme();
      });
    } catch (e2) {
      console.error(e2);
    }
  }
}

onMounted(() => {
  const html = document.documentElement;
  html.setAttribute('lang', userLang);
  refreshTheme();
  addThemeChangeEventListener();
});

watch(() => store.state.settings.theme, () => {
  refreshTheme();
});

</script>
