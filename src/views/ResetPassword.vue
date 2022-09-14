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
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default defineComponent({
  name: 'ResetPassword',
  components: {
    Form,
    Field,
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
      showPass: false,
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
        token: this.$route?.query?.token
      };
      AuthService.resetPassword(payload)
        .then(() => (this.message = 'Password reset.'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
