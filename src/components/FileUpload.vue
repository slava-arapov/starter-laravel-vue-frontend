<template>
  <v-card>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form
        ref="form"
        @submit.prevent="uploadFile"
      >
        <validation-provider
          v-slot="{ errors }"
          ref="provider"
          name="file"
          :rules="fileRules"
        >
          <v-file-input
            :error-messages="errors"
            :accept="fileTypes"
            @change="fileChange"
            id="file"
            :prependIcon="icon"
            :label="label"
          ></v-file-input>
        </validation-provider>
        <v-btn
          color="info"
          type="submit"
          :disabled="!file || invalid"
          small
        >
          Upload
        </v-btn>
        <FlashMessage :message="message" :error="error" />
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { getError } from '@/utils/helpers';
import FileService from '@/services/FileService';
import FlashMessage from '@/components/FlashMessage.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

declare interface BaseComponentData {
  file: Blob | null,
  fileRules: string,
  message: string | null,
  error?: Error | string | string[] | null
}

export default (Vue as VueConstructor<
  Vue & {
  $refs: {
    provider: InstanceType<typeof ValidationProvider>;
  };
}>).extend({
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
    ValidationProvider,
    ValidationObserver,
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

      const { valid } = await this.$refs.provider.validate(e);

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
