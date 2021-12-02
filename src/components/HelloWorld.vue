<template>
  <v-row align="center">
    <v-col class="mb-4">
      <h1 class="text-h1 font-weight-black mt-3 mb-6 info--text">
        Laravel + Vue&nbsp;2<br>Starter
      </h1>
      <p class="subheading font-weight-regular">
        Laravel ◦ Sanctum ◦ Fortify ◦ Telescope
      <br>
        Vue&nbsp;2 ◦ Typescript ◦ Vuetify
      </p>
      <p v-if="msg">
        {{ msg }}
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>
