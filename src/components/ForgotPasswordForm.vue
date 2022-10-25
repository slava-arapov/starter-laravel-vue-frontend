<template>
  <div>
    <v-form
      @submit.prevent="forgotPassword"
    >
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          name="email"
          autocomplete="email"
          :error-messages="emailErrors"
          required
        ></v-text-field>

        <div class="d-flex flex-row-reverse">
          <v-btn
            color="info"
            type="submit"
            :disabled="!form.meta.valid"
          >
            Send
          </v-btn>

        </div>

        <FlashMessage :message="message" :error="error" />
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { getErrorDictionary } from '@/utils/helpers';
import { ErrorDictionary } from '@/interfaces/ErrorDictionary';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';

const form = reactive(useForm());

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});

const error: Ref<ErrorDictionary | null> = ref(null);
const message: Ref<string | null> = ref(null);

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

    if (e.response.data.errors) {
      form.setErrors(e.response.data.errors);
    } else {
      error.value = getErrorDictionary(e);
    }
  }
}

</script>
