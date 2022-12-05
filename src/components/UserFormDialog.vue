<template>
<v-dialog
  v-model="dialog"
  width="unset"
>
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      color="success"
      v-bind="activatorProps"
      :size="props.buttonSize"
    >
      {{ props.action === 'create' ? 'Create' : 'Update' }}
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
              @submit.prevent="handleSubmit"
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

              <v-checkbox
                v-model="isAdmin"
                label="Is Admin"
                name="is_admin"
              />

              <FlashMessage :error="error" />
              <v-card-actions>
                <v-btn
                  color="success"
                  type="submit"
                  :disabled="!form.meta.valid"
                >
                  {{ props.action === 'create' ? 'Create' : 'Update' }}
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
import { reactive, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import FlashMessage from '@/components/FlashMessage.vue';
import { useFlashMessage } from '@/composables/useFlashMessage';
import { getErrorDictionary } from '@/utils/helpers';
import UserService from '@/services/UserService';
import axios from 'axios';
import { User } from '@/interfaces/User';

interface Props {
  action: string,
  buttonSize?: string,
  user?: User | null,
}

interface Emits {
  (e: 'userCreated'): void,
  (e: 'userUpdated'): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const dialog = ref(false);

watch(dialog, () => {
  resetFields();
});

const form = reactive(useForm());

const { value: name, errors: nameErrors } = useField('name', 'required', {
  initialValue: ''
});

const { value: email, errors: emailErrors } = useField('email', 'required|email', {
  initialValue: ''
});

const passwordRules = props.action === 'create' ? 'required' : '';

const { value: password, errors: passwordErrors } = useField('password', passwordRules, {
  initialValue: ''
});

const isAdmin = ref(false);

resetFields();

const { error } = useFlashMessage();

function handleSubmit() {
  props.action === 'create' ? createUser() : updateUser();
}

function createUser() {
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    isAdmin: isAdmin.value
  };

  UserService.createUser(payload)
    .then(() => {
      dialog.value = false;
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

function updateUser() {
  if (!props.user?.id) {
    return;
  }

  const payload = {
    id: props.user.id,
    name: name.value,
    email: email.value,
    password: password.value,
    isAdmin: isAdmin.value
  };

  UserService.updateUser(payload)
    .then(() => {
      dialog.value = false;
      emit('userUpdated');
    })
    .catch((e) => {
      if (axios.isAxiosError(e) && e.response?.data?.errors) {
        form.setErrors(e.response.data.errors);
      } else if (e instanceof Error) {
        error.value = getErrorDictionary(e);
      }
    });
}

function resetFields() {
  name.value = props.user?.name ?? '';
  email.value = props.user?.email ?? '';
  password.value = '';
  isAdmin.value = props.user?.isAdmin ?? false;

  form.setErrors({});
}

</script>
