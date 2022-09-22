<template>
  <div>
      <Form
        as="v-form"
        ref="form"
        lazy-validation
        @submit="login"
        v-slot="{ meta }"
      >
        <Field
          v-model="email"
          name="email"
          :rules="emailRules"
          v-slot="{ field, errors }"
        >
          <v-text-field
            v-bind="field"
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            :error-messages="errors"
            required
          ></v-text-field>
        </Field>

        <Field
          v-model="password"
          name="password"
          :rules="passwordRules"
          v-slot="{ field, errors }"
        >
          <v-text-field
            v-bind="field"
            label="Password"
            type="password"
            name="password"
            :error-messages="errors"
            required
          ></v-text-field>
        </Field>

        <div class="d-flex justify-between align-center pt-2">
          <router-link to="/forgot-password" class="text-sm base-link pr-3">
            Forgot your password?
          </router-link>
          <v-btn
            color="info"
            type="submit"
            :disabled="!meta.valid"
          >
            Login
          </v-btn>
        </div>

        <FlashMessage :error="error" />
      </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const invalid = ref(false);
    const email = ref('');
    const password = ref('');

    const emailRules = 'required|email';
    const passwordRules = 'required';

    const error: Ref<Error | string | string[] | null> = ref(null);

    const form: Ref<HTMLFormElement | null> = ref(null);

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

        if (e.response.data && e.response.data.errors && form.value !== null) {
          form.value.setErrors(e.response.data.errors);
        } else {
          error.value = getError(e);
        }
      }
    }

    return {
      invalid,
      email,
      password,
      emailRules,
      passwordRules,
      error,
      login
    };
  }
});
</script>
