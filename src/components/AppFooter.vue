<template>
  <v-footer class="flex-grow-0">
    <v-container>
      <div class="d-flex flex-wrap align-center justify-space-around">
        <ThemeControl />
        <div>
          Created by <a
            href="https://github.com/slava-arapov"
            class="base-link"
            target="_blank"
          >@slava-arapov</a>
        </div>
        <div>
          Based on <a
            href="https://laravelvuespa.com/"
            class="base-link"
            target="_blank"
          >@garethredfern</a> template
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import ThemeControl from '@/components/ThemeControl.vue';

</script>
