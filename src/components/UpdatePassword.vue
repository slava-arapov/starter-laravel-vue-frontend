<template>
  <v-card
    class="ma-3"
  >
    <v-form
      @submit.prevent="updatePassword"
    >
      <v-text-field
        v-model="currentPassword"
        :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
        label="Current Password"
        :type="showPass ? 'text' : 'password'"
        name="current-password"
        :error-messages="currentPasswordErrors"
        required
        @click:append="showPass = !showPass"
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
        size="small"
      >
        Update
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
import { getErrorDictionary } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useFlashMessage } from '@/composables/useFlashMessage';

const mdiIcons = {
  mdiEye,
  mdiEyeOff
};

const showPass = ref(false);

const form = reactive(useForm());

const { value: currentPassword, errors: currentPasswordErrors } = useField('current-password', 'required', {
  initialValue: ''
});
const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});
const { value: confirmPassword, errors: confirmPasswordErrors } = useField('confirm-password', 'required|confirmed:@password', {
  initialValue: ''
});

const { message, error } = useFlashMessage();

function updatePassword() {
  error.value = null;
  message.value = null;
  const payload = {
    current_password: currentPassword.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  };
  AuthService.updatePassword(payload)
    .then(() => (message.value = 'Password updated.'))
    .catch((e) => (error.value = getErrorDictionary(e)));
}

</script>
