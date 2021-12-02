<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
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
      text
      v-if="authUser"
      to="/dashboard"
    >
      <span>Dashboard</span>
    </v-btn>
    <v-btn
      text
      v-if="isAdmin"
      to="/users"
    >
      <span>Users</span>
    </v-btn>

    <v-btn
      text
      to="/about"
    >
      <span>About</span>
    </v-btn>

    <v-menu
      v-if="authUser"
      open-on-hover
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          <v-img
            :alt="authUser.name + ' avatar'"
            v-if="authUser.avatar"
            :src="apiUrl+authUser.avatar"
            aspect-ratio="1"
            class="shrink mr-2 hidden-sm-and-down grey lighten-2 rounded-circle"
            cover
            min-width="30"
          />
          {{ authUser.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          text
          to="/user"
        >
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item
          text
          to="/logout"
          @click="logout"
        >
          <v-list-item-title>
            Logout
            <v-icon>mdi-logout</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      text
      v-else
      to="/login"
    >
      <span>Login</span>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Header',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: function () {
    return {
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser', 'isAdmin'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
});
</script>
