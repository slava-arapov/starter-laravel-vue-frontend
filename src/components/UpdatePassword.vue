<template>
  <v-card
    class="ma-3"
  >
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="updatePassword">

          <validation-provider
            v-slot="{ errors }"
            name="current-password"
            :rules="passwordRules"
          >
            <v-text-field
              v-model="currentPassword"
              :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
              label="Current Password"
              :type="showPass ? 'text' : 'password'"
              name="current-password"
              :error-messages="errors"
              required
              @click:append="showPass = !showPass"
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
            :rules="passwordRules"
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
            small
          >
            Update
          </v-btn>
        <FlashMessage :message="message" :error="error" />
      </v-form>
    </validation-observer>
  </v-card>
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
  currentPassword: string | null,
  password: string | null,
  passwordRules: string,
  passwordConfirm: string | null,
  error?: Error | string | string[] | null,
  message: string | null
}

export default Vue.extend({
  name: 'UpdatePassword',
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
      currentPassword: null,
      password: null,
      passwordConfirm: null,
      passwordRules: 'required',
      error: null,
      message: null
    };
  },
  methods: {
    updatePassword() {
      this.error = null;
      this.message = null;
      const payload = {
        current_password: this.currentPassword,
        password: this.password,
        password_confirmation: this.passwordConfirm
      };
      AuthService.updatePassword(payload)
        .then(() => (this.message = 'Password updated.'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
