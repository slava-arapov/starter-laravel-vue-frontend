<template>
  <div
    v-if="meta !== null"
    aria-label="Pagination"
  >
    <p class="text-sm text-gray-500">
      Page {{ meta.current_page }} of {{ meta.last_page }}
    </p>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="meta.last_page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { Meta } from '@/interfaces/Meta';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { Links } from '@/interfaces/Links';

interface Props {
  action: string,
  path?: string,
  modelValue: number,
  meta: Meta | null,
  links: Links | null
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

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
