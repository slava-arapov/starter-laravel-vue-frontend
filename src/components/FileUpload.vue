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
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';
import FileService from '@/services/FileService';
import FlashMessage from '@/components/FlashMessage.vue';
import { Field, Form } from 'vee-validate';

// setInteractionMode('eager');

declare interface BaseComponentData {
  file: Blob | null,
  fileRules: string,
  message: string | null,
  error?: Error | string | string[] | null
}

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
  components: {
    Form,
    Field,
    FlashMessage
  },
  data(): BaseComponentData {
    return {
      file: null,
      fileRules: 'required|image',
      message: null,
      error: null
    };
  },
  methods: {
    clearMessage() {
      this.error = null;
      this.message = null;
    },
    async fileChange(e: File) {
      this.clearMessage();

      const { valid } = await (this.$refs.input as HTMLFormElement).validate(e);

      if (e && valid) {
        this.file = (e);
      }
    },
    uploadFile() {
      const payload = {} as {'file': FormData | null, 'endpoint': string};
      const formData = new FormData();
      if (this.file) {
        formData.append('file', this.file);
      }
      payload.file = formData;
      payload.endpoint = this.endpoint;
      this.clearMessage();
      FileService.uploadFile(payload)
        .then(() => {
          this.message = 'File uploaded.';
          this.$emit('fileUploaded');
        })
        .catch((error) => (this.error = getError(error)));
    }
  }
});
</script>
