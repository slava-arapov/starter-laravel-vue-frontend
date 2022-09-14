<template>
  <v-card
    class="ma-3"
  >
      <Form
        as="v-form"
        ref="form"
        lazy-validation
        @submit.prevent="updatePassword"
        v-slot="{ meta }"
      >

          <Field
            v-model="currentPassword"
            name="current-password"
            :rules="passwordRules"
            v-slot="{ field, errors }"
          >
            <v-text-field
              v-bind="field"
              :append-icon="showPass ? mdiIcons.mdiEye : mdiIcons.mdiEyeOff"
              label="Current Password"
              :type="showPass ? 'text' : 'password'"
              name="current-password"
              :error-messages="errors"
              required
              @click:append="showPass = !showPass"
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
            :rules="passwordRules"
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
            small
          >
            Update
          </v-btn>
        <FlashMessage :message="message" :error="error" />
      </Form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

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

export default defineComponent({
  name: 'UpdatePassword',
  components: {
    Form,
    Field,
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
