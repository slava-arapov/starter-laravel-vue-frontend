<template>
  <div>
    <v-btn-toggle
      v-model="themeToggle"
      @change="themeToggleChange"
      mandatory
      rounded
    >
      <v-btn
        title="Dark Theme"
        :value="'dark'"
        small
      >
        <v-icon small>{{ mdiIcons.mdiWeatherNight }}</v-icon>
      </v-btn>
      <v-btn
        title="System Theme"
        :value="'system'"
        small
      >
        <v-icon small>{{ mdiIcons.mdiThemeLightDark }}</v-icon>
      </v-btn>
      <v-btn
        title="Light Theme"
        :value="'light'"
        small
      >
        <v-icon small>{{ mdiIcons.mdiWhiteBalanceSunny }}</v-icon>
      </v-btn>
    </v-btn-toggle>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { mdiWeatherNight, mdiThemeLightDark, mdiWhiteBalanceSunny } from '@mdi/js';

const themeInitial = store.getters['settings/theme'] || 'system';

export default Vue.extend({
  name: 'ThemeControl',
  data: function () {
    return {
      mdiIcons: {
        mdiWeatherNight,
        mdiThemeLightDark,
        mdiWhiteBalanceSunny
      },
      themeToggle: themeInitial
    };
  },
  methods: {
    async themeToggleChange() {
      console.log(this.themeToggle);
      await this.$store.dispatch('settings/setTheme', { value: this.themeToggle });
    }
  }
});
</script>
