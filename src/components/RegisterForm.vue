<template>
  <div>
    <Form
      as="v-form"
      ref="form"
      lazy-validation
      @submit="registerUser"
      v-slot="{ meta }"
    >
        <Field
          v-model="name"
          name="name"
          :rules="nameRules"
          v-slot="{ field, errors }"
        >
          <v-text-field
            v-bind="field"
            label="Name"
            type="text"
            name="name"
            autocomplete="name"
            :error-messages="errors"
            required
          ></v-text-field>
        </Field>
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
          Register
        </v-btn>
        <FlashMessage :error="error" />
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup() {
    const router = useRouter();

    const mdiIcons = {
      mdiEye,
      mdiEyeOff
    };
    const showPass = ref(false);
    const name: Ref<string | null> = ref(null);
    const email: Ref<string | null> = ref(null);
    const password: Ref<string | null> = ref(null);
    const passwordConfirm: Ref<string | null> = ref(null);
    const nameRules = 'required';
    const emailRules = 'required|email';
    const passwordRules = 'required';
    const passwordConfirmRules = 'required|password:@password';
    const error: Ref<Error | string | string[] | null> = ref(null);

    function registerUser() {
      error.value = null;
      const payload = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirm.value
      };
      AuthService.registerUser(payload)
        .then(() => router.push('/dashboard'))
        .catch((e) => (error.value = getError(e)));
    }

    return {
      mdiIcons,
      showPass,
      name,
      email,
      password,
      passwordConfirm,
      nameRules,
      emailRules,
      passwordRules,
      passwordConfirmRules,
      error,
      registerUser
    };
  }
});
</script>
