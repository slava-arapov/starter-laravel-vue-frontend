<template>
  <v-card>
    <Form
      as="v-form"
      ref="form"
      lazy-validation
      @submit="updateUser"
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
import { mapGetters } from 'vuex';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

declare interface BaseComponentData {
  name: string | null,
  email: string | null,
  nameRules: string,
  emailRules: string,
  error?: Error | string | string[] | null,
  message: string | null
}

export default defineComponent({
  name: 'AuthUserForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      name: null,
      email: null,
      nameRules: 'required',
      emailRules: 'required|email',
      error: null,
      message: null
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  methods: {
    updateUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: this.name,
        email: this.email
      };
      AuthService.updateUser(payload)
        .then(() => this.$store.dispatch('auth/getAuthUser'))
        .then(() => (this.message = 'User updated.'))
        .catch((error) => (this.error = getError(error)));
    }
  },
  mounted() {
    this.name = this.authUser.name;
    this.email = this.authUser.email;
  }
});
</script>
