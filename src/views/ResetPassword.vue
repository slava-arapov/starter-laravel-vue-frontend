<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <v-card
      elevation="2"
      width="20rem"
    >
      <v-card-title>Reset Password</v-card-title>
        <v-form
          ref="form"
          class="px-5 pb-5"
          lazy-validation
          @submit.prevent="resetPassword"
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
            Reset Password
          </v-btn>
          <FlashMessage :message="message" :error="error" />
        </v-form>
    </v-card>
  </validation-observer>
</template>

<script>
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import Vue from 'vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

setInteractionMode('eager');

export default Vue.extend({
  name: 'ResetPassword',
  components: {
    ValidationProvider,
    ValidationObserver,
    FlashMessage
  },
  data() {
    return {
      mdiIcons: {
        mdiEye,
        mdiEyeOff
      },
      email: null,
      password: null,
      passwordConfirm: null,
      emailRules: 'required|email',
      passwordRules: 'required',
      passwordConfirmRules: 'required|password:@password',
      error: null,
      message: null
    };
  },
  methods: {
    resetPassword() {
      this.error = null;
      this.message = null;
      const payload = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm,
        token: this.$route.query.token
      };
      AuthService.resetPassword(payload)
        .then(() => (this.message = 'Password reset.'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
