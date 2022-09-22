<template>
  <v-footer class="flex-grow-0">
    <v-container>
      <div class="d-flex flex-wrap align-center justify-space-around">
        <ThemeControl />
        <div>
          Created by <a href="https://github.com/slava-arapov" class="base-link" target="_blank">@slava-arapov</a>
        </div>
        <div>
          Based on <a href="https://laravelvuespa.com/" class="base-link" target="_blank">@garethredfern</a> template
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import ThemeControl from '@/components/ThemeControl.vue';

export default defineComponent({
  name: 'Footer',
  components: { ThemeControl },
  setup() {
    const store = useStore();

    const authUser = computed(() => store.getters['auth/authUser']);
    const isAdmin = computed(() => store.getters['auth/isAdmin']);

    function logout() {
      store.dispatch('auth/logout');
    }

    return {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      authUser,
      isAdmin,
      logout
    };
  }
});
</script>
