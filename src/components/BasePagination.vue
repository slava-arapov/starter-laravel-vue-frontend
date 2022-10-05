<template>
  <div aria-label="Pagination" v-if="meta !== null">
    <p class="text-sm text-gray-500">
      Page {{ meta.current_page }} of {{ meta.last_page }}
    </p>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="meta.last_page"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, watch } from 'vue';
import { Meta } from '@/interfaces/Meta';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  action: {
    type: String,
    required: true
  },
  path: {
    type: String,
    default: null
  },
  modelValue: {
    type: Number,
    required: true
  },
  meta: {
    type: Object as PropType<Meta | null>,
    required: true
  },
  links: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);
const store = useStore();
const router = useRouter();

const currentPage = computed({
  get(): number {
    return props.modelValue;
  },
  set(value: number) {
    emit('update:modelValue', value);
  }
});

watch(() => props.meta?.current_page, () => {
  if (props.meta) {
    store.dispatch(props.action, props.meta.path + '/?page=' + (props.meta.current_page).toString()).then(() => {
      if (props.path && props.meta) {
        router.push({
          path: props.path,
          query: { page: (props.meta.current_page).toString() }
        });
      }
    });
  }
});

</script>
