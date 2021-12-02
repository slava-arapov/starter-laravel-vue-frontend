<template>
  <div>
    <form @submit.prevent="sendVerification">
      <v-btn
        color="info"
        type="submit"
        class="ml-2"
        outlined
        small
      >
        Verify Email
      </v-btn>
    </form>
    <FlashMessage :message="message" :error="error" class="ml-2"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';

declare interface BaseComponentData {
  error?: Error | string | string[] | null,
  message: string | null
}

export default Vue.extend({
  name: 'VerifyEmail',
  components: {
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      error: null,
      message: null
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  methods: {
    sendVerification() {
      this.error = null;
      this.message = null;
      const payload = {
        user: this.authUser.id
      };
      AuthService.sendVerification(payload)
        .then(() => (this.message = 'Verification email sent.'))
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
