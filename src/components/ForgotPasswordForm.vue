<template>
  <div>
    <Form
      as="v-form"
      ref="form"
      lazy-validation
      @submit="forgotPassword"
      v-slot="{ meta }"
    >
        <Field
          v-model="email"
          name="email"
          rules="required|email"
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

        <div class="d-flex flex-row-reverse">
          <v-btn
            color="info"
            type="submit"
            :disabled="!meta.valid"
          >
            Send
          </v-btn>

        </div>

        <FlashMessage :message="message" :error="error" />
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

export default defineComponent({
  name: 'ForgotPasswordForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup() {
    const email = ref('');

    const error: Ref<Error | string | string[] | null> = ref(null);
    const message: Ref<string | null> = ref(null);

    const form: Ref<HTMLFormElement | null> = ref(null);

    async function forgotPassword(): Promise<void> {
      error.value = null;
      message.value = null;
      const payload = {
        email: email.value
      };

      try {
        await AuthService.forgotPassword(payload);
        message.value = 'Reset password email sent.';
      } catch (e) {
        console.log(e);

        if (e.response.data.errors && form.value !== null) {
          form.value.setErrors(e.response.data.errors);
        } else {
          error.value = getError(e);
        }
      }
      /*
      AuthService.forgotPassword(payload)
        .then(() => (this.message = 'Reset password email sent.'))
        .catch((error) => (this.error = getError(error)));
       */
    }

    return {
      email,
      error,
      message,
      forgotPassword
    };
  },
  methods: {
  }
});
</script>

<style scoped>

</style>
