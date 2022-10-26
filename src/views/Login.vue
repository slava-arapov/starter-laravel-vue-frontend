<template>
  <v-card
    elevation="2"
    width="20rem"
  >
    <v-card-title>Login</v-card-title>

    <LoginForm class="px-5 pb-5" />

    <v-divider />

    <p class="my-3 text-center">
      <router-link
        to="/register"
      >
        Register for an account
      </router-link>
    </p>
  </v-card>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';

</script>
