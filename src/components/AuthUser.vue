<template>
  <v-card>
    <v-card-title
      class="text-h5 d-flex align-center mb-2"
    >
      <v-avatar
        size="36"
        class="mr-3"
      >
        <v-img
          v-if="authUser?.avatar"
          :alt="authUser?.name + ' avatar'"
          :src="apiUrl+authUser?.avatar"
          aspect-ratio="1"
          class="shrink grey lighten-2 rounded-circle"
          cover
          max-height="36"
          max-width="36"
        />
        <v-icon
          v-else
          :icon="mdiIcons.mdiAccountCircle"
          size="36"
        />
      </v-avatar>
      <p class="ma-0">
        {{ authUser?.name }}
      </p>
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-icon
        v-if="authUser?.email_verified_at"
        :icon="mdiIcons.mdiCheckDecagram"
        class="success--text pr-1"
        title="Verified Email"
      />
      {{ authUser?.email }}
    </v-card-subtitle>

    <v-card-actions>
      <VerifyEmail v-if="!authUser?.email_verified_at" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useStore } from '@/store';
import VerifyEmail from '@/components/VerifyEmail.vue';
import { mdiAccountCircle, mdiCheckDecagram } from '@mdi/js';

const store = useStore();

const mdiIcons = {
  mdiAccountCircle,
  mdiCheckDecagram
};

const apiUrl: Ref<string | null> = import.meta.env.VITE_APP_API_URL;

const authUser = computed(() => store.getters['auth/authUser']);
</script>
