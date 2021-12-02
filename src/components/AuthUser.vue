<template>
  <v-card>
    <v-card-title
      class="text-h5 d-flex align-center mb-2"
    >
        <v-avatar
          size="36"
          class="mr-3"
          tile
        >
          <v-img
            :alt="authUser.name + ' avatar'"
            v-if="authUser.avatar"
            :src="apiUrl+authUser.avatar"
            aspect-ratio="1"
            class="shrink grey lighten-2 rounded-circle"
            cover
            max-height="36"
            max-width="36"
          />
          <v-icon size="36" v-else>{{ mdiIcons.mdiAccountCircle }}</v-icon>
        </v-avatar>
      <p class="ma-0">
        {{ authUser.name }}
      </p>
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-icon v-if="authUser.email_verified_at" class="success--text pr-1" title="Verified Email">{{ mdiIcons.mdiCheckDecagram }}</v-icon>
      {{ authUser.email }}
    </v-card-subtitle>

    <v-card-actions>
      <VerifyEmail v-if="!authUser.email_verified_at"/>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import VerifyEmail from '@/components/VerifyEmail.vue';
import { mdiAccountCircle, mdiCheckDecagram } from '@mdi/js';

declare interface BaseComponentData {
  mdiIcons: Record<string, string>,
  apiUrl: string | null
}

export default Vue.extend({
  name: 'AuthUser',
  components: {
    VerifyEmail
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data(): BaseComponentData {
    return {
      mdiIcons: {
        mdiAccountCircle,
        mdiCheckDecagram
      },
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  }
});
</script>
