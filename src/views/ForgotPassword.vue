<template>
  <div class="max-w-sm p-5 m-auto">
    <v-card
      elevation="2"
      width="20rem"
    >
      <v-card-title>Forgot Password</v-card-title>

      <ForgotPasswordForm class="px-5 pb-5" />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue';

</script>
