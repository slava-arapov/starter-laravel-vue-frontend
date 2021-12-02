<template>
  <v-footer>
    <div class="container">
      <div class="d-flex flex-wrap align-center justify-space-around">
        <ThemeControl />
        <div>
          Created by <a href="https://github.com/slava-arapov" class="base-link" target="_blank">@slava-arapov</a>
        </div>
        <div>
          Based on <a href="https://laravelvuespa.com/" class="base-link" target="_blank">@garethredfern</a> template
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ThemeControl from '@/components/ThemeControl.vue';

export default Vue.extend({
  name: 'Footer',
  components: { ThemeControl },
  data: function () {
    return {
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser', 'isAdmin'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
});
</script>
