<template>
  <div>
      <v-form
        ref="formElement"
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
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          name="password"
          :error-messages="passwordErrors"
          required
        ></v-text-field>

        <div class="d-flex justify-between align-center pt-2">
          <router-link to="/forgot-password" class="text-sm base-link pr-3">
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const form = reactive(useForm());

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});
const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});

const error: Ref<Error | string | string[] | null> = ref(null);

const formElement: Ref<HTMLFormElement | null> = ref(null);

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
        'Unable to fetch user after login, check your API settings.'
      );
      fetchError.name = 'Fetch User';
      console.log(fetchError);
      error.value = getError(fetchError);
    }
  } catch (e) {
    console.log(e);

    if (e.response.data && e.response.data.errors && formElement.value !== null) {
      formElement.value.setErrors(e.response.data.errors);
    } else {
      error.value = getError(e);
    }
  }
}

</script>
