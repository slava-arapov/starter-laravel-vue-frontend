<template>
  <v-card>
      <v-form
        @submit.prevent="uploadFile"
      >
        <v-file-input
          id="file"
          name="file"
          ref="input"
          :label="label"
          :accept="fileTypes"
          @change="handleChange"
          @blur="handleBlur"
          @update="fileChange"
          :on-click:clear="handleChange"
          mode="aggressive"
          :prependIcon="icon"
          :error-messages="fileErrors"
        ></v-file-input>
        <v-btn
          color="info"
          type="submit"
          :disabled="!file || !form.meta.valid"
          small
        >
          Upload
        </v-btn>
        <FlashMessage :message="message" :error="error" />
      </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import FileService from '@/services/FileService';
import FlashMessage from '@/components/FlashMessage.vue';
import { useField, useForm } from 'vee-validate';

interface Props {
  fileTypes?: Array<string>,
  endpoint: string,
  label: string,
  icon: string
}

interface Emits {
  (e: 'fileUploaded'): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  icon: undefined
});
const emit = defineEmits<Emits>();

const form = reactive(useForm());

const { value: file, errors: fileErrors, handleChange, handleBlur } = useField<Blob | null>('file', 'required|image', {
  initialValue: null
});

const message: Ref<string | null> = ref(null);
const error: Ref<Error | string | string[] | null> = ref(null);

const input: Ref<HTMLFormElement | null> = ref(null);

function clearMessage() {
  error.value = null;
  message.value = null;
}

async function fileChange(e: File) {
  clearMessage();

  if (input.value) {
    const { valid } = await input.value.validate(e);

    if (e && valid) {
      file.value = (e);
    }
  }
}

function uploadFile() {
  const payload = {} as {'file': FormData | null, 'endpoint': string};
  const formData = new FormData();
  if (file.value) {
    formData.append('file', file.value);
  }
  payload.file = formData;
  payload.endpoint = props.endpoint;
  clearMessage();
  FileService.uploadFile(payload)
    .then(() => {
      message.value = 'File uploaded.';
      emit('fileUploaded');
    })
    .catch((e) => (error.value = getError(e)));
}

</script>
