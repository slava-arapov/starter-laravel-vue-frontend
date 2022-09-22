<template>
  <v-card
    class="ma-3"
  >
      <Form
        as="v-form"
        ref="form"
        lazy-validation
        @submit="updatePassword"
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
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default defineComponent({
  name: 'UpdatePassword',
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup() {
    const mdiIcons = {
      mdiEye,
      mdiEyeOff
    };

    const showPass = ref(false);
    const currentPassword: Ref<string | null> = ref(null);
    const password: Ref<string | null> = ref(null);
    const passwordConfirm: Ref<string | null> = ref(null);

    const passwordRules = 'required';

    const error: Ref<Error | string | string[] | null> = ref(null);
    const message: Ref<string | null> = ref(null);

    function updatePassword() {
      error.value = null;
      message.value = null;
      const payload = {
        current_password: currentPassword.value,
        password: password.value,
        password_confirmation: passwordConfirm.value
      };
      AuthService.updatePassword(payload)
        .then(() => (message.value = 'Password updated.'))
        .catch((e) => (error.value = getError(e)));
    }

    return {
      mdiIcons,
      showPass,
      currentPassword,
      password,
      passwordConfirm,
      passwordRules,
      error,
      message,
      updatePassword
    };
  }
});
</script>
