<template>
  <div aria-label="Pagination">
    <p class="text-sm text-gray-500">
      Page {{ meta.current_page }} of {{ meta.last_page }}
    </p>
    <div class="text-center">
      <v-pagination
        v-model="meta.current_page"
        :length="meta.last_page"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @typedef {Object} meta
 * @property {string} current_page
 * @property {string} last_page
 *
 */
export default Vue.extend({
  props: {
    action: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: null
    },
    meta: {
      type: Object,
      required: true
    },
    links: {
      type: Object,
      required: true
    }
  },
  watch: {
    'meta.current_page': function() {
      this.$store.dispatch(this.action, this.meta.path + '/?page=' + (this.meta.current_page).toString()).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: (this.meta.current_page).toString() }
          });
        }
      });
    }
  }
});
</script>
