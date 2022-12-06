<template>
  <v-app>
    <LoadingProgress />
    <AppHeader />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LoadingProgress from '@/components/LoadingProgress.vue';

</script>
