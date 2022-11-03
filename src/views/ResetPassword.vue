<template>
  <v-card
    elevation="2"
    width="20rem"
  >
    <v-card-title>Reset Password</v-card-title>
    <v-form
      class="px-5 pb-5"
      @submit.prevent="resetPassword"
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
        :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
        label="Password"
        :type="showPass ? 'text' : 'password'"
        name="password"
        :error-messages="passwordErrors"
        required
        @click:append="showPass = !showPass"
      />

      <v-text-field
        v-model="confirmPassword"
        :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
        label="Confirm Password"
        :type="showPass ? 'text' : 'password'"
        name="confirm-password"
        :error-messages="confirmPasswordErrors"
        required
        @click:append="showPass = !showPass"
      />

      <v-btn
        color="info"
        type="submit"
        :disabled="!form.meta.valid"
      >
        Reset Password
      </v-btn>
      <FlashMessage
        :message="message"
        :error="error"
      />
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { getErrorDictionary } from '@/utils/helpers';
import { ErrorDictionary } from '@/interfaces/ErrorDictionary';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useRoute } from 'vue-router';

const route = useRoute();

const mdiIcons = {
  mdiEye,
  mdiEyeOff
};

const showPass = ref(false);

const form = reactive(useForm());

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});
const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});
const { value: confirmPassword, errors: confirmPasswordErrors } = useField('confirm-password', 'required|confirmed:@password', {
  initialValue: ''
});

const error: Ref<ErrorDictionary | null> = ref(null);
const message: Ref<string | null> = ref(null);

function resetPassword() {
  error.value = null;
  message.value = null;
  const payload = {
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
    token: (typeof route.query.token === 'string') ? route.query.token : ''
  };
  AuthService.resetPassword(payload)
    .then(() => (message.value = 'Password reset.'))
    .catch((e) => (error.value = getErrorDictionary(e)));
}
</script>
