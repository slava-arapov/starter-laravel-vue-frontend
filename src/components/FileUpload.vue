<template>
  <v-card>
      <Form
        as="v-form"
        ref="form"
        lazy-validation
        @submit="uploadFile"
        v-slot="{ meta }"
      >
        <Field
          name="file"
          ref="input"
          rules="required|image"
          @update:modelValue="fileChange"
          v-slot="{ handleChange, handleBlur, errors }"
        >
          <v-file-input
            :error-messages="errors"
            :accept="fileTypes"
            @change="handleChange"
            @blur="handleBlur"
            :on-click:clear="handleChange"
            mode="aggressive"
            id="file"
            :prependIcon="icon"
            :label="label"
          ></v-file-input>
        </Field>
        <v-btn
          color="info"
          type="submit"
          :disabled="!file || !meta.valid"
          small
        >
          Upload
        </v-btn>
        <FlashMessage :message="message" :error="error" />
      </Form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { getError } from '@/utils/helpers';
import FileService from '@/services/FileService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

// setInteractionMode('eager');

export default defineComponent({
  name: 'FileUpload',
  props: {
    fileTypes: {
      type: Array,
      default: null
    },
    endpoint: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  emits: [
    'fileUploaded'
  ],
  components: {
    Form,
    Field,
    FlashMessage
  },
  setup(props, context) {
    const file: Ref<Blob | null> = ref(null);
    const fileRules = 'required|image';

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
          context.emit('fileUploaded');
        })
        .catch((e) => (error.value = getError(e)));
    }

    return {
      file,
      fileRules,
      message,
      error,
      fileChange,
      uploadFile
    };
  }
});
</script>
