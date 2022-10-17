<template>
  <v-card>
    <v-form
      @submit.prevent="updateUser"
    >
      <v-text-field
        v-model="name"
        label="Name"
        type="text"
        name="name"
        autocomplete="name"
        :error-messages="nameErrors"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        name="email"
        autocomplete="email"
        :error-messages="emailErrors"
        required
      ></v-text-field>
      <v-btn
        color="info"
        type="submit"
        :disabled="!form.meta.valid"
        small
      >
        Update
      </v-btn>
      <FlashMessage :message="message" :error="error" />
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useStore } from 'vuex';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';

const store = useStore();

const form = reactive(useForm());

const { value: name, errors: nameErrors } = useField('name', 'required', {
  initialValue: ''
});
const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});

const error: Ref<Error | string | string[] | null> = ref(null);
const message: Ref<string | null> = ref(null);

const authUser = computed(() => store.getters['auth/authUser']);

function updateUser() {
  error.value = null;
  message.value = null;

  const payload = {
    name: name.value,
    email: email.value
  };

  AuthService.updateUser(payload)
    .then(() => store.dispatch('auth/getAuthUser'))
    .then(() => (message.value = 'User updated.'))
    .catch((error) => (error.value = getError(error)));
}

onMounted(() => {
  name.value = authUser.value.name;
  email.value = authUser.value.email;
});

</script>
