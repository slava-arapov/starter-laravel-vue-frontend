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
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

declare interface BaseComponentData {
  email: string | null,
  error?: Error | string | string[] | null,
  message: string | null
}

export default defineComponent({
  name: 'ForgotPasswordForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      email: '',
      error: null,
      message: null
    };
  },
  methods: {
    async forgotPassword(): Promise<void> {
      this.error = null;
      this.message = null;
      const payload = {
        email: this.email
      };

      try {
        await AuthService.forgotPassword(payload);
        this.message = 'Reset password email sent.';
      } catch (error) {
        console.log(error);

        if (error.response.data.errors) {
          (this.$refs.form as HTMLFormElement).setErrors(error.response.data.errors);
        } else {
          this.error = getError(error);
        }
      }
      /*
      AuthService.forgotPassword(payload)
        .then(() => (this.message = 'Reset password email sent.'))
        .catch((error) => (this.error = getError(error)));
       */
    }
  }
});
</script>

<style scoped>

</style>
