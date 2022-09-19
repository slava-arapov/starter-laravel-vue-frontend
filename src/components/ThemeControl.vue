<template>
  <div>
    <v-btn-toggle
      v-model="themeToggle"
      @update:modelValue="themeToggleChange"
      mandatory
      rounded
    >
      <v-btn
        title="Dark Theme"
        :value="'dark'"
        small
      >
        <v-icon
          :icon="mdiIcons.mdiWeatherNight"
          small
        ></v-icon>
      </v-btn>
      <v-btn
        title="System Theme"
        :value="'system'"
        small
      >
        <v-icon
          :icon="mdiIcons.mdiThemeLightDark"
          small
        ></v-icon>
      </v-btn>
      <v-btn
        title="Light Theme"
        :value="'light'"
        small
      >
        <v-icon
          :icon="mdiIcons.mdiWhiteBalanceSunny"
          small
        ></v-icon>
      </v-btn>
    </v-btn-toggle>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mdiWeatherNight, mdiThemeLightDark, mdiWhiteBalanceSunny } from '@mdi/js';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ThemeControl',
  setup () {
    const store = useStore();

    const mdiIcons = {
      mdiWeatherNight,
      mdiThemeLightDark,
      mdiWhiteBalanceSunny
    };

    const themeInitial = store.state.settings.theme || 'system';

    const themeToggle = ref(themeInitial);

    function themeToggleChange() {
      store.dispatch('settings/setTheme', { value: themeToggle.value });
    }

    return {
      mdiIcons,
      themeInitial,
      themeToggle,
      themeToggleChange
    };
  }
});
</script>
