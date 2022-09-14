<template>
  <v-card
    elevation="2"
    width="20rem"
  >
    <v-card-title>Register</v-card-title>
    <RegisterForm class="px-5 pb-5" />
  </v-card>
</template>

<script lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm
  }
});
</script>
