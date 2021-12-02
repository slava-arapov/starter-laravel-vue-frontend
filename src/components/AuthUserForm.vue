<template>
  <v-card>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="updateUser"
      >
        <validation-provider
          v-slot="{ errors }"
          name="name"
          :rules="nameRules"
        >
          <v-text-field
            v-model="name"
            label="Name"
            type="text"
            name="name"
            autocomplete="name"
            :error-messages="errors"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="emailRules"
        >
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            :error-messages="errors"
            required
          ></v-text-field>
        </validation-provider>
        <v-btn
          color="info"
          type="submit"
          :disabled="invalid"
          small
        >
          Update
        </v-btn>
        <FlashMessage :message="message" :error="error" />
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

declare interface BaseComponentData {
  name: string | null,
  email: string | null,
  nameRules: string,
  emailRules: string,
  error?: Error | string | string[] | null,
  message: string | null
}

export default Vue.extend({
  name: 'AuthUserForm',
  components: {
    ValidationProvider,
    ValidationObserver,
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
