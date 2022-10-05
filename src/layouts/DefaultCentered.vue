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

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>
