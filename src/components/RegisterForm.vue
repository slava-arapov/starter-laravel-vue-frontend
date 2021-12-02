<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="registerUser"
      >
        <validation-provider
          v-slot="{ errors }"
          name="name"
          :rules="nameRules"
        >
          <v-text-field
            v-model="name"
            label="Name"
            type="text"
            name="name"
            autocomplete="name"
            :error-messages="errors"
            required
          ></v-text-field>
        </validation-provider>
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
            :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
            label="Password"
            :type="showPass ? 'text' : 'password'"
            name="password"
            :error-messages="errors"
            required
            @click:append="showPass = !showPass"
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="confirm-password"
          :rules="passwordConfirmRules"
        >
          <v-text-field
            v-model="passwordConfirm"
            :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
            label="Confirm Password"
            :type="showPass ? 'text' : 'password'"
            name="confirm-password"
            :error-messages="errors"
            required
            @click:append="showPass = !showPass"
          ></v-text-field>
        </validation-provider>

        <v-btn
          color="info"
          type="submit"
          :disabled="invalid"
        >
          Register
        </v-btn>
        <FlashMessage :error="error" />
      </v-form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

setInteractionMode('eager');

declare interface BaseComponentData {
  mdiIcons: Record<string, string>,
  showPass: boolean,
  name: string | null,
  email: string | null,
  password: string | null,
  passwordConfirm: string | null,
  nameRules: string,
  emailRules: string,
  passwordRules: string,
  passwordConfirmRules: string,
  error?: Error | string | string[] | null
}

export default Vue.extend({
  name: 'RegisterForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      mdiIcons: {
        mdiEye,
        mdiEyeOff
      },
      showPass: false,
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      nameRules: 'required',
      emailRules: 'required|email',
      passwordRules: 'required',
      passwordConfirmRules: 'required|password:@password',
      error: null
    };
  },
  methods: {
    registerUser() {
      this.error = null;
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      };
      AuthService.registerUser(payload)
        .then(() => this.$router.push('/dashboard'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
