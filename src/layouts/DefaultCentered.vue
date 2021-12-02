<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container fill-height class="d-flex justify-center">
        <slot />
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
  components: { Header, Footer }
});
</script>
