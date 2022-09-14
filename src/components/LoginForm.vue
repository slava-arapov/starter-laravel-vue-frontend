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
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

declare interface BaseComponentData {
  invalid: boolean,
  email: string | null,
  password: string | null,
  emailRules: string,
  passwordRules: string,
  error?: Error | string | string[] | null
}

export default defineComponent({
  name: 'LoginForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      invalid: false,
      email: '',
      password: '',
      emailRules: 'required|email',
      passwordRules: 'required',
      error: null
    };
  },
  methods: {
    async login(): Promise<void> {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.error = null;
      try {
        await AuthService.login(payload);
        const authUser = await this.$store.dispatch('auth/getAuthUser');
        if (authUser) {
          await this.$store.dispatch('auth/setGuest', { value: 'isNotGuest' });
          await this.$router.push('/dashboard');
        } else {
          const error = Error(
            'Unable to fetch user after login, check your API settings.'
          );
          error.name = 'Fetch User';
          console.log(error);
          this.error = getError(error);
        }
      } catch (error) {
        console.log(error);

        if (error.response.data.errors) {
          (this.$refs.form as HTMLFormElement).setErrors(error.response.data.errors);
        } else {
          this.error = getError(error);
        }
      }
    }
  }
});
</script>
