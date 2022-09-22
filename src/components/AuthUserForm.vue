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
import { computed, defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useStore } from 'vuex';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

export default defineComponent({
  name: 'AuthUserForm',
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup() {
    const store = useStore();

    const name: Ref<string | null> = ref(null);
    const email: Ref<string | null> = ref(null);

    const nameRules = 'required';
    const emailRules = 'required|email';

    const error: Ref<Error | string | string[] | null> = ref(null);
    const message: Ref<string | null> = ref(null);

    const authUser = computed(() => store.getters['auth/authUser']);

    function updateUser() {
      error.value = null;
      message.value = null;

      const payload = {
        name: name.value,
        email: email.value
      };

      AuthService.updateUser(payload)
        .then(() => store.dispatch('auth/getAuthUser'))
        .then(() => (message.value = 'User updated.'))
        .catch((error) => (error.value = getError(error)));
    }

    onMounted(() => {
      name.value = authUser.value.name;
      email.value = authUser.value.email;
    });

    return {
      name,
      email,
      nameRules,
      emailRules,
      error,
      message,
      authUser,
      updateUser
    };
  }
});
</script>
