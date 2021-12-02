<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="forgotPassword"
      >

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

        <div class="d-flex flex-row-reverse">
          <v-btn
            color="info"
            type="submit"
            :disabled="invalid"
          >
            Send
          </v-btn>

        </div>

        <FlashMessage :message="message" :error="error" />
      </v-form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

declare interface BaseComponentData {
  email: string | null,
  emailRules: string,
  error?: Error | string | string[] | null,
  message: string | null
}

export default (Vue as VueConstructor<
  Vue & {
  $refs: {
    observer: InstanceType<typeof ValidationObserver>;
  };
}>).extend({
  name: 'ForgotPasswordForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      email: '',
      emailRules: 'required|email',
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
          this.$refs.observer.setErrors(error.response.data.errors);
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
