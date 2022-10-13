<template>
  <div>
    <transition-group name="fade">
      <p v-if="message" class="ma-0 mt-2 text-sm success--text" key="message">
        {{ message }}
      </p>
      <p
        v-if="error && getType(error) === 'string'"
        key="error"
        class="mt-2 text-sm text-red-500"
      >
        {{ error }}
      </p>
      <ul
        v-if="getType(error) === 'object'"
        class="mt-2 text-sm text-red-500"
        key="error-list"
      >
        <li v-for="key in errorKeys" :key="key">
          <b class="font-bold capitalize">{{ titleCase(key) }}</b>
          <ul class="ml-2">
            <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  message?: string | null,
  error?: object | string | string[] | Error | null
}

const props = defineProps<Props>();

// eslint-disable-next-line
function getType(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function getErrors (key: string | number) {
  if (props.error && getType(props.error) === 'object') {
    return (props.error as Record<string | number, string>)[key];
  }
  return null;
}

const errorKeys = computed(() => {
  if (!props.error || getType(props.error) === 'string') {
    return null;
  }
  return Object.keys(props.error);
});

function titleCase(value: string) {
  return value.replace('_', ' ');
}

</script>
