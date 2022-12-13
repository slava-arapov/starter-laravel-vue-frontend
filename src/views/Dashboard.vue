<template>
  <v-row>
    <v-col
      md="6"
      lg="4"
      xl="3"
    >
      <v-card
        class="info d-flex flex-no-wrap justify-space-between"
        height="100%"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between w-100">
          <div>
            <v-card-title
              class="text-h5"
            >
              {{ authUser?.name }}
            </v-card-title>
            <v-card-subtitle>signed in</v-card-subtitle>

            <v-card-actions>
              <v-btn
                class="ml-2 mt-5"
                to="/user"
                outlined
                size="small"
              >
                View Profile
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
          >
            <v-img
              v-if="authUser?.avatar"
              :alt="authUser.name + ' avatar'"
              :src="apiUrl+authUser.avatar"
              aspect-ratio="1"
              class="shrink grey lighten-2 rounded-circle"
              cover
              max-height="125"
              max-width="125"
            />
            <v-icon
              v-else
              :icon="mdiIcons.mdiAccountCircle"
              size="125"
            />
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <v-col
      sm="6"
      md="6"
      lg="4"
      xl="3"
    >
      <v-card
        class="info"
        height="100%"
        dark
      >
        <v-card-title
          class="text-h5"
        >
          About the Starter
        </v-card-title>
        <v-card-text>
          You can find information about dependencies and some docs at GitHub repository.
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-2 mt-5"
            href="https://github.com/garethredfern/laravelvue-spa"
            outlined
            size="small"
          >
            github.com
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col
      sm="6"
      md="6"
      lg="4"
      xl="3"
    >
      <v-card
        class="info"
        height="100%"
        dark
      >
        <v-card-title
          class="text-h5"
        >
          Documentation
        </v-card-title>
        <v-card-text>
          The starter template is based on Gareth Redfern's example project. You can find some docs at Gareth Redfern's website.
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-2 mt-5"
            href="https://laravelvuespa.com"
            outlined
            size="small"
          >
            laravelvuespa.com
          </v-btn>
          <v-btn
            class="ml-2 mt-5"
            href="https://github.com/garethredfern/laravelvue-spa"
            outlined
            size="small"
          >
            github.com
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
import type { Ref } from 'vue';
import { mdiAccountCircle } from '@mdi/js';

const store = useStore();

const mdiIcons = {
  mdiAccountCircle
};

const apiUrl: Ref<string | null> = import.meta.env.VITE_APP_API_URL;

const authUser = computed(() => store.getters['auth/authUser']);
</script>
