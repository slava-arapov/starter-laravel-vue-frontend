<template>
<v-dialog
  v-model="dialog"
  width="unset"
>
  <template v-slot:activator="{ props }">
    <v-btn
      color="success"
      v-bind="props"
    >
      Create User
    </v-btn>
  </template>

  <v-card
    width="unset"
  >
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-form
              @submit.prevent="createUser"
            >
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                name="name"
                autocomplete="name"
                :error-messages="nameErrors"
                required
              />

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                name="email"
                autocomplete="email"
                :error-messages="emailErrors"
                required
              />

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                name="password"
                :error-messages="passwordErrors"
                required
              />

              <FlashMessage :error="error" />
              <v-card-actions>
                <v-btn
                  color="success"
                  type="submit"
                  :disabled="!form.meta.valid"
                >
                  Create
                </v-btn>
                <v-btn
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
        </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import FlashMessage from '@/components/FlashMessage.vue';
import { useFlashMessage } from '@/composables/useFlashMessage';
import { getErrorDictionary } from '@/utils/helpers';
import UserService from '@/services/UserService';
import axios from 'axios';

interface Emits {
  (e: 'userCreated'): void
}

const emit = defineEmits<Emits>();

const dialog = ref(false);

const form = reactive(useForm());

const { value: name, errors: nameErrors } = useField('name', 'required', {
  initialValue: ''
});

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});

const { value: password, errors: passwordErrors } = useField('password', 'required', {
  initialValue: ''
});

const { error } = useFlashMessage();

function createUser() {
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  UserService.createUser(payload)
    .then(() => {
      dialog.value = false;
      name.value = '';
      email.value = '';
      password.value = '';
      emit('userCreated');
    })
    .catch((e) => {
      if (axios.isAxiosError(e) && e.response?.data?.errors) {
        form.setErrors(e.response.data.errors);
      } else if (e instanceof Error) {
        error.value = getErrorDictionary(e);
      }
    });
}

</script>
