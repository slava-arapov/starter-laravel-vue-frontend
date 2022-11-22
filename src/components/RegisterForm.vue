<template>
  <div>
    <v-form
      @submit.prevent="registerUser"
    >
      <v-text-field
        v-model="name"
        label="Name"
        type="text"
        name="name"
        autocomplete="name"
        :error-messages="nameErrors"
        required
      />
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
        Register
      </v-btn>
      <FlashMessage :error="error" />
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getErrorDictionary } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useForm, useField } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useRouter } from 'vue-router';
import { useFlashMessage } from '@/composables/useFlashMessage';

const router = useRouter();

const mdiIcons = {
  mdiEye,
  mdiEyeOff
};

const showPass = ref(false);

const form = reactive(useForm());

const { value: name, errors: nameErrors } = useField('name', 'required', {
  initialValue: ''
});
const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});
const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});
const { value: confirmPassword, errors: confirmPasswordErrors } = useField('confirm-password', 'required|confirmed:@password', {
  initialValue: ''
});

const { error } = useFlashMessage();

function registerUser() {
  error.value = null;
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  };
  AuthService.registerUser(payload)
    .then(() => router.push('/dashboard'))
    .catch((e) => (error.value = getErrorDictionary(e)));
}

</script>
