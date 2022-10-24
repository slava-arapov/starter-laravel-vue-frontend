<template>
  <v-container>
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="ms-4 me-2"
            contain
            src="@/assets/logo.svg"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <router-link to="/">
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="150"
            src="@/assets/name.svg"
            width="150"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-if="authUser"
        to="/dashboard"
      >
        <span>Dashboard</span>
      </v-btn>
      <v-btn
        v-if="isAdmin"
        to="/users"
      >
        <span>Users</span>
      </v-btn>

      <v-btn
        to="/about"
      >
        <span>About</span>
      </v-btn>

      <v-menu
        v-if="authUser"
        open-on-hover
        bottom
        left
      >
        <template v-slot:activator="{ props }">
          <v-btn
            dark
            elevation="0"
            v-bind="props"
          >
            <v-img
              :alt="authUser?.name + ' avatar'"
              v-if="authUser?.avatar"
              :src="apiUrl+authUser?.avatar"
              aspect-ratio="1"
              class="shrink mr-2 hidden-sm-and-down grey lighten-2 rounded-circle"
              min-width="30"
            />
            {{ authUser?.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            to="/user"
          >
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>
              Logout
              <v-icon :icon="mdiIcons.mdiLogout" />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        to="/login"
      >
        <span>Login</span>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { mdiLogout } from '@mdi/js';

const store = useStore();

const mdiIcons = {
  mdiLogout
};

const apiUrl = import.meta.env.VITE_APP_API_URL;
const authUser = computed(() => store.getters['auth/authUser']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);

function logout() {
  store.dispatch('auth/logout');
}

</script>
