<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: { Header, Footer }
});
</script>
