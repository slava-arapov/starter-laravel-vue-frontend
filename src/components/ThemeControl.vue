<template>
  <div>
    <v-btn-toggle
      v-model="themeToggle"
      mandatory
      rounded
      @update:modelValue="themeToggleChange"
    >
      <v-btn
        title="Dark Theme"
        :value="'dark'"
        size="small"
      >
        <v-icon
          :icon="mdiIcons.mdiWeatherNight"
          small
        />
      </v-btn>
      <v-btn
        title="System Theme"
        :value="'system'"
        size="small"
      >
        <v-icon
          :icon="mdiIcons.mdiThemeLightDark"
          small
        />
      </v-btn>
      <v-btn
        title="Light Theme"
        :value="'light'"
        size="small"
      >
        <v-icon
          :icon="mdiIcons.mdiWhiteBalanceSunny"
          small
        />
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mdiWeatherNight, mdiThemeLightDark, mdiWhiteBalanceSunny } from '@mdi/js';
import { useStore } from '@/store';

const store = useStore();

const mdiIcons = {
  mdiWeatherNight,
  mdiThemeLightDark,
  mdiWhiteBalanceSunny
};

const themeInitial = store.state.settings.theme;

const themeToggle = ref(themeInitial);

function themeToggleChange() {
  store.dispatch('settings/setTheme', { value: themeToggle.value });
}

</script>
