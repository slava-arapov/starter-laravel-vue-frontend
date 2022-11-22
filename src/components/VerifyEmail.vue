<template>
  <div>
    <form @submit.prevent="sendVerification">
      <v-btn
        color="info"
        type="submit"
        class="ml-2"
        outlined
        size="small"
      >
        Verify Email
      </v-btn>
    </form>
    <FlashMessage
      :message="message"
      :error="error"
      class="ml-2"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { getErrorDictionary } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useFlashMessage } from '@/composables/useFlashMessage';

const store = useStore();

const { message, error } = useFlashMessage();

const authUser = computed(() => store.getters['auth/authUser']);

function sendVerification() {
  error.value = null;
  message.value = null;
  const payload = {
    user: authUser.value.id
  };
  AuthService.sendVerification(payload)
    .then(() => (message.value = 'Verification email sent.'))
    .catch((e) => (error.value = getErrorDictionary(e)));
}

</script>
