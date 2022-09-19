<template>
    <v-card
      elevation="2"
      width="20rem"
    >
      <v-card-title>Reset Password</v-card-title>
        <Form
          as="v-form"
          ref="form"
          class="px-5 pb-5"
          lazy-validation
          @submit.prevent="resetPassword"
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
              :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
              label="Password"
              :type="showPass ? 'text' : 'password'"
              name="password"
              :error-messages="errors"
              required
              @click:append="showPass = !showPass"
            ></v-text-field>
          </Field>

          <Field
            v-model="passwordConfirm"
            name="confirm-password"
            :rules="passwordConfirmRules"
            v-slot="{ field, errors }"
          >
            <v-text-field
              v-bind="field"
              :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
              label="Confirm Password"
              :type="showPass ? 'text' : 'password'"
              name="confirm-password"
              :error-messages="errors"
              required
              @click:append="showPass = !showPass"
            ></v-text-field>
          </Field>

          <v-btn
            color="info"
            type="submit"
            :disabled="!meta.valid"
          >
            Reset Password
          </v-btn>
          <FlashMessage :message="message" :error="error" />
        </Form>
    </v-card>
</template>

<script>
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { defineComponent, ref } from 'vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ResetPassword',
  setup () {
    const route = useRoute();

    const mdiIcons = {
      mdiEye,
      mdiEyeOff
    };

    const email = ref(null);
    const password = ref(null);
    const passwordConfirm = ref(null);
    const showPass = ref(false);

    const emailRules = 'required|email';
    const passwordRules = 'required';
    const passwordConfirmRules = 'required|password:@password';
    const error = ref(null);
    const message = ref(null);

    function resetPassword() {
      error.value = null;
      message.value = null;
      const payload = {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirm.value,
        token: route?.query?.token
      };
      AuthService.resetPassword(payload)
        .then(() => (message.value = 'Password reset.'))
        .catch((error) => (error.value = getError(error)));
    }

    return {
      mdiIcons,
      email,
      password,
      passwordConfirm,
      showPass,
      emailRules,
      passwordRules,
      passwordConfirmRules,
      error,
      message,
      resetPassword
    };
  },
  components: {
    Form,
    Field,
    FlashMessage
  }
});
</script>