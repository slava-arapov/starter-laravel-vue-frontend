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
    <FlashMessage
      :message="message"
      :error="error"
      class="ml-2"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { useStore } from '@/store';
import { getErrorDictionary } from '@/utils/helpers';
import { ErrorDictionary } from '@/interfaces/ErrorDictionary';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';

const store = useStore();

const error: Ref<ErrorDictionary | null> = ref(null);
const message: Ref<string | null> = ref(null);

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
