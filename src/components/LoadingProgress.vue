<template>
  <v-progress-linear
    v-if="loading"
    :color="theme.global.current.value.dark ? 'deep-purple-lighten-1' : 'deep-purple-lighten-2'"
    indeterminate
    rounded
    height="6"
    style="position: absolute; z-index: 9999;"
  ></v-progress-linear>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { useTheme } from 'vuetify';
import { computed } from 'vue';

const store = useStore();
const theme = useTheme();

const loading = computed(() => store.state.loading);
</script>
