<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="4" lg="3">
      <AuthUser class="ma-3 pa-5" />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3">
      <AuthUserForm class="ma-3 pa-5" />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3">
      <UpdatePassword class="ma-3 pa-5" />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3">
      <FileUpload
        label="Upload Avatar"
        :icon="mdiIcons.mdiCamera"
        :fileTypes="['image/*']"
        endpoint="/users/auth/avatar"
        @fileUploaded="updateUser"
        class="ma-3 pa-5"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import AuthUser from '@/components/AuthUser.vue';
import FileUpload from '@/components/FileUpload.vue';
import AuthUserForm from '@/components/AuthUserForm.vue';
import UpdatePassword from '@/components/UpdatePassword.vue';
import { mdiCamera } from '@mdi/js';
import Vue from 'vue';

declare interface BaseComponentData {
  mdiIcons: Record<string, string>
}

export default Vue.extend({
  name: 'UserView',
  components: {
    AuthUser,
    FileUpload,
    AuthUserForm,
    UpdatePassword
  },
  data(): BaseComponentData {
    return {
      mdiIcons: {
        mdiCamera
      }
    };
  },
  methods: {
    updateUser() {
      this.$store.dispatch('auth/getAuthUser');
    }
  }
});
</script>
