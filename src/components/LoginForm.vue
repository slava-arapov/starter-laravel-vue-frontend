<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="login"
      >
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="emailRules"
        >
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            :error-messages="errors"
            required
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="password"
          :rules="passwordRules"
        >
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            name="password"
            :error-messages="errors"
            required
          ></v-text-field>
        </validation-provider>

        <div class="d-flex justify-between align-center pt-2">
          <router-link to="/forgot-password" class="text-sm base-link pr-3">
            Forgot your password?
          </router-link>
          <v-btn
            color="info"
            type="submit"
            :disabled="invalid"
          >
            Login
          </v-btn>
        </div>

        <FlashMessage :error="error" />
      </v-form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

declare interface BaseComponentData {
  invalid: boolean,
  email: string | null,
  password: string | null,
  emailRules: string,
  passwordRules: string,
  error?: Error | string | string[] | null
}

export default (Vue as VueConstructor<
  Vue & {
  $refs: {
    observer: InstanceType<typeof ValidationObserver>;
  };
}
>).extend({
  name: 'LoginForm',
  components: {
    ValidationProvider,
    ValidationObserver,
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
          this.$refs.observer.setErrors(error.response.data.errors);
        } else {
          this.error = getError(error);
        }
      }
    }
  }
});
</script>
