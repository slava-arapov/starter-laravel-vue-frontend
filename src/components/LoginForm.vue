<template>
  <v-form
    @submit.prevent="login"
  >
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      name="email"
      autocomplete="email"
      :error-messages="emailErrors"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      name="password"
      :error-messages="passwordErrors"
      required
    />

    <div class="d-flex justify-between align-center pt-2">
      <router-link
        to="/forgot-password"
        class="text-sm base-link pr-3"
      >
        Forgot your password?
      </router-link>
      <v-btn
        color="info"
        type="submit"
        :disabled="!form.meta.valid"
      >
        Login
      </v-btn>
    </div>

    <FlashMessage :error="error" />
  </v-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { getErrorDictionary } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { useFlashMessage } from '@/composables/useFlashMessage';
import axios from 'axios';

const store = useStore();
const router = useRouter();

const form = reactive(useForm());

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});
const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});

const { error } = useFlashMessage();

async function login(): Promise<void> {
  const payload = {
    email: email.value,
    password: password.value
  };
  error.value = null;
  try {
    await AuthService.login(payload);
    const authUser = await store.dispatch('auth/getAuthUser');
    if (authUser) {
      await store.dispatch('auth/setGuest', { value: 'isNotGuest' });
      await router.push('/dashboard');
    } else {
      const fetchError = Error(
        'Unable to fetch user after login, check your API settings'
      );
      fetchError.name = 'User fetch error';
      console.log(fetchError);
      error.value = getErrorDictionary(fetchError);
    }
  } catch (e) {
    console.log(e);

    if (axios.isAxiosError(e) && e.response?.data?.errors) {
      form.setErrors(e.response.data.errors);
    } else if (e instanceof Error) {
      error.value = getErrorDictionary(e);
    }
  }
}

</script>
