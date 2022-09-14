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
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Form, Field } from 'vee-validate';
import { mdiEye, mdiEyeOff } from '@mdi/js';

declare interface BaseComponentData {
  mdiIcons: Record<string, string>,
  showPass: boolean,
  name: string | null,
  email: string | null,
  password: string | null,
  passwordConfirm: string | null,
  nameRules: string,
  emailRules: string,
  passwordRules: string,
  passwordConfirmRules: string,
  error?: Error | string | string[] | null
}

export default defineComponent({
  name: 'RegisterForm',
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
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      nameRules: 'required',
      emailRules: 'required|email',
      passwordRules: 'required',
      passwordConfirmRules: 'required|password:@password',
      error: null
    };
  },
  methods: {
    registerUser() {
      this.error = null;
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      };
      AuthService.registerUser(payload)
        .then(() => this.$router.push('/dashboard'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
