<template>
  <v-card
    elevation="2"
  >
    <v-card-title>Login</v-card-title>

    <LoginForm class="px-5 pb-5" />

    <v-divider></v-divider>

    <p class="my-3 text-center">
      <router-link
        to="/register"
      >Register for an account</router-link
      >
    </p>
  </v-card>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm
  }
});
</script>
