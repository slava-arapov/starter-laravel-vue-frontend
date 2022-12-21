<template>
  <v-container>
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Website Logo"
            class="ms-4 me-2"
            contain
            :src="logoUrl"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <router-link to="/">
          <v-img
            alt="Website Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="150"
            src="@/assets/name.svg"
            width="150"
          />
        </router-link>
      </div>

      <v-spacer />
      <v-btn
        v-if="authUser"
        to="/dashboard"
        data-testid="dashboard-button"
      >
        <span>Dashboard</span>
      </v-btn>
      <v-btn
        v-if="isAdmin"
        to="/users"
        data-testid="users-button"
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
        open-on-click
        open-on-hover
      >
        <template #activator="{ props }">
          <v-btn
            dark
            elevation="0"
            v-bind="props"
            data-testid="user-menu-button"
          >
            <v-img
              v-if="authUser?.avatar"
              :alt="authUser?.name + ' avatar'"
              :src="apiUrl+authUser?.avatar"
              aspect-ratio="1"
              class="shrink mr-2 hidden-sm-and-down grey lighten-2 rounded-circle"
              cover
              min-width="30"
              data-testid="user-avatar"
            />
            {{ authUser?.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            to="/user"
            data-testid="settings-button"
          >
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
            data-testid="logout-button"
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
        data-testid="login-button"
      >
        <span>Login</span>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { mdiLogout } from '@mdi/js';
import { useTheme } from 'vuetify';
import logoUrlLight from '@/assets/logo.svg';
import logoUrlDark from '@/assets/logo-dark.svg';

const store = useStore();

const theme = useTheme();

const mdiIcons = {
  mdiLogout
};

const apiUrl = import.meta.env.VITE_APP_API_URL;
const authUser = computed(() => store.getters['auth/authUser']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);

const logoUrl = computed(() => theme.global.name.value === 'light' ? logoUrlLight : logoUrlDark);

function logout() {
  store.dispatch('auth/logout');
}

</script>
