<template>
  <div aria-label="Pagination">
    <p class="text-sm text-gray-500">
      Page {{ value.current_page }} of {{ value.last_page }}
    </p>
    <div class="text-center">
      <v-pagination
        v-model="value.current_page"
        :length="value.last_page"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

/**
 * @typedef {Meta} modelValue
 * @property {string} current_page
 * @property {string} last_page
 *
 */
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: null
    },
    modelValue: {
      type: Object,
      required: true
    },
    links: {
      type: Object,
      required: true
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        context.emit('update:modelValue', value);
      }
    });

    watch(() => props.modelValue.current_page, () => {
      store.dispatch(props.action, props.modelValue.path + '/?page=' + (props.modelValue.current_page).toString()).then(() => {
        if (props.path) {
          router.push({
            path: props.path,
            query: { page: (props.modelValue.current_page).toString() }
          });
        }
      });
    });

    return {
      value
    };
  }
});
</script>
